import { ActivityIndicator, FlatList, Image, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import ExploreHeading from './ExploreHeading'
import { commonStyle, showToastHandler } from '../../helpers/common'
import AppStyle from '../../assets/styles/AppStyle'
import { ServiceExploreData } from '../../services/ExploreService'

const StoresExplore = ({ searchType, search }) => {
    const [page, setPage] = useState(1);
    const [lastPage, setLastPage] = useState(2);
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
            setLastPage(response?.meta?.last_page);
        }).catch(e => {
            setLoading(false);
            showToastHandler(e);
        });
    }

    const _renderItem = ({ item, index }) => (
        <View style={styles.itemContainer}>
            <Image resizeMode='cover' source={{ uri: item?.image }}
                style={styles.imageStyle} />
            <Text style={styles.text}>{item?.name}</Text>
        </View>
    )

    return (
        <View style={{ flex: 1 }}>
            <ExploreHeading title={'Stores'} isFilter={false} />
            <FlatList
                data={items}
                key={index => 'category' + index + 'store'}
                renderItem={_renderItem}
                horizontal={false}
                removeClippedSubviews={true}
                showsVerticalScrollIndicator={false}
                onEndReached={info => {
                    if (page > lastPage) return;
                    setPage(page + 1);
                }}
            />
            {loading &&
                <View style={{ marginBottom: 20 }}>
                    <ActivityIndicator size={'large'} />
                </View>
            }
        </View>
    )
}

export default StoresExplore

const styles = StyleSheet.create({
    itemContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 8,
        borderBottomColor: AppStyle.colorSet.borderLightGrayColor,
        borderBottomWidth: 1
    },
    imageStyle: {
        height: 40,
        width: 40,
        borderRadius: 8
    },
    text: {
        ...commonStyle('400', 16, 'primaryColorA'),
        marginLeft: 12
    }
})