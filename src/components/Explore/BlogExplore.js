import { ActivityIndicator, FlatList, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import ExploreHeading from './ExploreHeading'
import { useNavigation } from '@react-navigation/native'
import AppStyle from '../../assets/styles/AppStyle'
import CoverFrame from '../Products/CoverFrame'
import { ServiceExploreData } from '../../services/ExploreService'
import { showToastHandler } from '../../helpers/common'

const BlogExplore = ({ searchType, search }) => {
    const navigation = useNavigation();
    const categories = [
        { name: 'All', color: '#C5F1C4' },
        { name: 'Fashion', color: '#CCDFD6' },
        { name: 'Article', color: '#E8CDDE' },
    ]

    const [page, setPage] = useState(1);
    const [sortBy, setSortBy] = useState('relevancy'); // relevancy, asc, desc
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        ExploreSearch();
    }, [page]);

    const ExploreSearch = () => {
        setLoading(true);
        const payload = { type: searchType, sort_by: sortBy, search_keywords: search }
        ServiceExploreData(payload, page).then((response) => {
            console.log({ response });
            if (page === 1) {
                setItems(response?.data);
            } else {
                setItems([...items, ...response?.data])
            }
            setLoading(false);
        }).catch(e => {
            setLoading(false);
            showToastHandler(e);
        });
    }

    const _renderItem = ({ item, index }) => {
        return (
            <TouchableOpacity onPress={() => navigation.navigate('MainCategoryScreen')}>
                <View style={{ ...styles.chipContainer, backgroundColor: item?.color, marginLeft: index === 0 ? 16 : 0 }}>
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
                            setPage(page + 1);
                        }
                    }}
                    scrollEventThrottle={400} showsVerticalScrollIndicator={false} style={{ marginHorizontal: 16 }}>
                    {items?.map((item, index) => {
                        return (
                            <TouchableOpacity onPress={() => navigation.navigate('BlogContentScreen')} key={index} style={{ marginBottom: 16 }}>
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