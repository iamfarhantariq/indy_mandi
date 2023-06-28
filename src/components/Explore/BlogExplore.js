import { ActivityIndicator, FlatList, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import ExploreHeading from './ExploreHeading'
import { useNavigation } from '@react-navigation/native'
import AppStyle from '../../assets/styles/AppStyle'
import CoverFrame from '../Products/CoverFrame'
import { ServiceExploreData } from '../../services/ExploreService'
import { showToastHandler } from '../../helpers/common'
import { ServiceGetBlogsCategories } from '../../services/AppService'

const BlogExplore = ({ searchType, search }) => {
    const colors = ['#C5F1C4', '#CCDFD6', '#E8CDDE', '#E9DBD7', '#D3E8EB']
    const navigation = useNavigation();
    // const categories = [
    //     { name: 'All', color: '#C5F1C4', value: '' },
    //     { name: 'Fashion', color: '#CCDFD6', value: 'Fashion' },
    //     { name: 'Article', color: '#E8CDDE', value: 'Article' },
    // ]

    const [page, setPage] = useState(1);
    const [lastPage, setLastPage] = useState(2);
    // const [category, setCategory] = useState('');
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(false);
    const [categories, setCategories] = useState([])
    const [selectedCategory, setSelectedCategory] = useState(null);

    useEffect(() => {
        GetCategoriesList();
    }, []);

    useEffect(() => {
        if (selectedCategory) {
            ExploreSearch();
        }
    }, [page, selectedCategory]);

    const GetCategoriesList = () => {
        ServiceGetBlogsCategories().then(response => {
            console.log({ response });
            let _items = [{ name: 'All', color: colors[0], value: '' }];
            let colorIndex = 1;
            response?.data?.data?.forEach((_item, index) => {
                _items.push({ name: _item?.name, color: colors[colorIndex], value: _item?.name });
                colorIndex < 4 ? colorIndex++ : colorIndex = 0;
            })
            setSelectedCategory(_items[0]);
            setCategories(_items);
        }).catch(e => {
            showToastHandler(e);
        });
    }

    const ExploreSearch = () => {
        setLoading(true);
        const payload = { type: searchType, category: selectedCategory?.value, search_keywords: search };
        console.log({ payload });
        ServiceExploreData(payload, page).then((response) => {
            console.log({ response });
            if (page === 1) {
                setItems(response?.data);
            } else {
                setItems([...items, ...response?.data])
            }
            setLoading(false);
            setLastPage(response?.meta?.last_page);
        }).catch(e => {
            setLoading(false);
            showToastHandler(e);
        });
    }

    const _renderItem = ({ item, index }) => {
        const selectedStyle = selectedCategory?.name === item?.name ? { borderColor: AppStyle.colorSet.primaryColorB, borderWidth: 1 } : {}
        return (
            <TouchableOpacity onPress={() => setSelectedCategory(item)}>
                <View style={{ ...selectedStyle, ...styles.chipContainer, backgroundColor: item?.color, marginLeft: index === 0 ? 16 : 0 }}>
                    <Text style={styles.chipText}>{item?.name}</Text>
                </View>
            </TouchableOpacity>
        )
    }

    const isCloseToBottom = ({ layoutMeasurement, contentOffset, contentSize }) => {
        const paddingToBottom = 20;
        return layoutMeasurement.height + contentOffset.y >=
            contentSize.height - paddingToBottom;
    };

    return (
        <View style={{ flex: 1 }}>
            <ExploreHeading title={'Blogs'} isFilter={false} />
            <View style={{ flex: 1, marginHorizontal: -16 }}>
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
                        if (isCloseToBottom(nativeEvent)) {
                            if (page > lastPage) return;
                            setPage(page + 1);
                        }
                    }}
                    scrollEventThrottle={400} showsVerticalScrollIndicator={false} style={{ marginHorizontal: 16 }}>
                    {items?.map((item, index) => {
                        return (
                            <TouchableOpacity onPress={() => navigation.navigate('BlogContentScreen', { slug: item?.slug })} key={index} style={{ marginBottom: 16 }}>
                                <CoverFrame item={item} key={index} index={index} detailed={false} flex={true} />
                            </TouchableOpacity>
                        )
                    })}
                </ScrollView>
            </View>
            {loading &&
                <View style={{ marginBottom: 20 }}>
                    <ActivityIndicator size={'large'} />
                </View>
            }
        </View>
    )
}

export default BlogExplore

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