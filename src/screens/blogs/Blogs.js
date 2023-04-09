import { ActivityIndicator, FlatList, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import HeaderWithBack from '../../components/Headers/HeaderWithBack'
import InputField from '../../components/Input/InputField'
import AppStyle from '../../assets/styles/AppStyle'
import { useNavigation } from '@react-navigation/native'
import CoverFrame from '../../components/Products/CoverFrame'
import { useEffect } from 'react'
import { ServiceGetBlogsCategories, ServiceGetBlogsToExplore } from '../../services/AppService'
import { useDispatch } from 'react-redux'
import { setActivityIndicator } from '../../store/slices/appConfigSlice'
import { showToastHandler } from '../../helpers/common'

const Blogs = () => {
    const colors = ['#C5F1C4', '#CCDFD6', '#E8CDDE', '#E9DBD7', '#D3E8EB']
    const dispatch = useDispatch();
    const navigation = useNavigation();
    const [page, setPage] = useState(1);
    const [lastPage, setLastPage] = useState(2);
    const [loading, setLoading] = useState(false);
    const [firstLanded, setFirstLanded] = useState(true);
    const [search, setSearch] = useState('');
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [blogs, setBlogs] = useState([]);
    const [isEndReached, setIsEndReached] = useState(false);

    useEffect(() => {
        getBlogs();
    }, []);

    useEffect(() => {
        if (selectedCategory) {
            getBlogsForCategory();
        }
    }, [selectedCategory, search, page]);

    useEffect(() => {
        if (!firstLanded) {
            setPage(1);
        } else {
            setFirstLanded(false);
        }
    }, [search]);

    useEffect(() => {
        if (!firstLanded && isEndReached) {
            if (page > lastPage) return;
            setPage(page + 1);
        }
    }, [isEndReached]);

    const isCloseToBottom = ({ layoutMeasurement, contentOffset, contentSize }) => {
        const paddingToBottom = 20;
        return layoutMeasurement.height + contentOffset.y >=
            contentSize.height - paddingToBottom;
    };

    const getBlogs = () => {
        dispatch(setActivityIndicator(true));
        ServiceGetBlogsCategories().then(response => {
            console.log({ response });
            let _items = [];
            let colorIndex = 0;
            response?.data?.data?.forEach((_item, index) => {
                _items.push({ name: _item?.name, color: colors[colorIndex] });
                colorIndex < 4 ? colorIndex++ : colorIndex = 0;
            })
            setSelectedCategory(_items[0]);
            setCategories(_items);
            dispatch(setActivityIndicator(false));
        }).catch(e => {
            showToastHandler(e, dispatch);
        });
    }

    const getBlogsForCategory = () => {
        setLoading(true);
        const payload = { type: 'blogs', search_keywords: search, category: selectedCategory };
        ServiceGetBlogsToExplore(payload, page).then(response => {
            console.log({ response });
            if (page === 1) {
                setBlogs(response?.data?.data);
            } else {
                setBlogs([...blogs, ...response?.data?.data]);
            }
            setLoading(false);
            setLastPage(response?.meta?.last_page);
            dispatch(setActivityIndicator(false));
        }).catch(e => {
            setLoading(false);
            showToastHandler(e, dispatch);
        });
    }

    const _renderItem = ({ item, index }) => {
        const selectedStyle = selectedCategory?.name === item?.name ? { borderColor: AppStyle.colorSet.primaryColorB, borderWidth: 1 } : {}
        return (
            <TouchableOpacity onPress={() => setSelectedCategory(item)}>
                <View style={{
                    ...selectedStyle,
                    ...styles.chipContainer, backgroundColor: item?.color, marginLeft: index === 0 ? 16 : 0
                }}>
                    <Text style={styles.chipText}>{item?.name}</Text>
                </View>
            </TouchableOpacity>
        )
    }

    return (
        <View style={{ backgroundColor: AppStyle.colorSet.BGColor, flex: 1 }}>
            <HeaderWithBack title={'Blogs'} cross={true} />
            <View style={{ marginHorizontal: 16, marginVertical: 18 }}>
                <InputField value={search} onTextChange={(t) => setSearch(t)} />
            </View>
            <View style={{ marginBottom: 16 }}>
                <FlatList
                    horizontal
                    data={categories}
                    key={(index) => 'header' + index + 'chip'}
                    renderItem={_renderItem}
                    showsHorizontalScrollIndicator={false}
                />
            </View>
            <ScrollView
                onScroll={({ nativeEvent }) => {
                    setIsEndReached(isCloseToBottom(nativeEvent));
                }}
                scrollEventThrottle={400}
                showsVerticalScrollIndicator={false} style={{ marginHorizontal: 16 }}>
                {blogs?.map((item, index) => {
                    return (
                        <TouchableOpacity onPress={() => navigation.navigate('BlogContentScreen')} key={index} style={{ marginBottom: 16 }}>
                            <CoverFrame item={item} key={index} index={index} detailed={false} flex={true} />
                        </TouchableOpacity>
                    )
                })}
            </ScrollView>
            {loading &&
                <View style={{ marginBottom: 20 }}>
                    <ActivityIndicator size={'large'} />
                </View>
            }
        </View>
    )
}

export default Blogs;

const styles = StyleSheet.create({
    chipContainer: {
        paddingHorizontal: 12,
        paddingVertical: 8,
        marginRight: 8,
        borderRadius: 20
    },
    chipText: {
        fontSize: 14,
        color: AppStyle.colorSet.blackColor + '60',
        letterSpacing: -0.5,
        fontWeight: '500'
    }
})