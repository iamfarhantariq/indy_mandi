import { ActivityIndicator, FlatList, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import ExploreHeading from './ExploreHeading'
import GeneralProduct from '../Products/GeneralProduct'
import { ServiceExploreData } from '../../services/ExploreService'
import { showToastHandler } from '../../helpers/common'

const ProductSectionExplore = ({ searchType, search }) => {
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
            <View style={{ marginBottom: 16, paddingRight: index % 2 == 0 ? 8 : 0, paddingLeft: index % 2 == 0 ? 0 : 8 }}>
                <GeneralProduct item={item} index={index} flex={true} />
            </View>
        )
    }

    return (
        <View style={{ flex: 1 }}>
            <ExploreHeading title={'Products'} />
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