import { ActivityIndicator, FlatList, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import ExploreHeading from './ExploreHeading'
import GeneralProduct from '../Products/GeneralProduct'
import { ServiceExploreData } from '../../services/ExploreService'
import { showToastHandler } from '../../helpers/common'

const ProductSectionExplore = ({ searchType, search }) => {
    const [page, setPage] = useState(1);
    const [lastPage, setLastPage] = useState(2);
    const [sortBy, setSortBy] = useState('relevancy');
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const payload = { type: searchType, sort_by: sortBy, search_keywords: search }
        ExploreSearch(payload);
    }, [page]);

    const ExploreSearch = (payload, _page = null) => {
        const __page = _page ? _page : page;
        setLoading(true);
        ServiceExploreData(payload, __page).then((response) => {
            console.log({ response });
            if (__page === 1) {
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

    const filterHandler = (value) => {
        setSortBy(value);
        setPage(1);
        setItems([]);
        const payload = { type: searchType, sort_by: value, search_keywords: search }
        ExploreSearch(payload, 1);
    }

    const _renderItem = ({ item, index }) => {
        return (
            <View style={{ marginBottom: 16, paddingRight: index % 2 == 0 ? 8 : 0, paddingLeft: index % 2 == 0 ? 0 : 8 }}>
                <GeneralProduct item={item} index={index} flex={true} />
            </View>
        )
    }

    return (
        <View style={{ flex: 1 }}>
            <ExploreHeading title={'Products'} filterHandler={filterHandler} />
            <View style={{ flex: 1 }}>
                <FlatList
                    data={items}
                    key={index => 'category' + index + 'main-product'}
                    renderItem={_renderItem}
                    horizontal={false}
                    numColumns={2}
                    scrollEnabled
                    showsVerticalScrollIndicator={false}
                    onEndReached={info => {
                        if (page > lastPage) return;
                        setPage(page + 1);
                    }}
                />
            </View>
            {loading &&
                <View style={{ marginBottom: 20 }}>
                    <ActivityIndicator size={'large'} />
                </View>
            }
        </View>
    )
}

export default ProductSectionExplore;

const styles = StyleSheet.create({})