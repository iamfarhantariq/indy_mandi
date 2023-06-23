import { StyleSheet, ScrollView, View, FlatList, ActivityIndicator, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import AppStyle from '../../assets/styles/AppStyle';
import HomeHeader from '../../components/Headers/HomeHeader';
import InputField from '../../components/Input/InputField';
import GeneralProduct from '../../components/Products/GeneralProduct';
import { showToastHandler } from '../../helpers/common';
import { ServiceExploreData } from '../../services/ExploreService';
import { SheetManager } from 'react-native-actions-sheet';
import { useIsFocused } from '@react-navigation/native';
import NoItemFound from '../../components/NoItemFound';

const MainCategoryScreen = ({ route }) => {
    const params = route?.params;
    const category = params?.category
    const focus = useIsFocused();
    const [search, setSearch] = useState('');
    const [page, setPage] = useState(1);
    const [lastPage, setLastPage] = useState(2);
    const [sortBy, setSortBy] = useState('relevancy');
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(false);
    const [justCame, setJustCame] = useState(true);

    useEffect(() => {
        const payload = {
            type: 'products',
            sort_by: sortBy,
            search_keywords: search,
            level: category?.level,
            category_id: category?.id,
        }
        getProducts(payload, page);
    }, [focus]);

    useEffect(() => {
        if (!justCame) {
            setPage(1);
            const payload = {
                type: 'products',
                sort_by: sortBy,
                search_keywords: search,
                level: category?.level,
                category_id: category?.id,
            }
            getProducts(payload, 1);
        } else {
            setJustCame(false);
        }
    }, [search, sortBy]);

    const getProducts = (payload, _page = 1) => {
        setLoading(true);
        ServiceExploreData(payload, _page).then((response) => {
            console.log({ response });
            if (_page === 1) {
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

    const filterHandler = () => {
        const filters = [
            { title: 'Relevancy', value: 'relevancy' },
            { title: 'Asc', value: 'asc' },
            { title: 'Desc', value: 'desc' },
        ];
        SheetManager.show('example-two', {
            payload: {
                header: 'Sort by', actions: filters, filterHandler: (_action) => {
                    setSortBy(_action);
                }
            }
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
        <View style={{ flex: 1, backgroundColor: AppStyle.colorSet.BGColor }}>
            <HomeHeader route={route} />
            <View style={{ marginHorizontal: 16, marginVertical: 18 }}>
                <InputField value={search} onTextChange={(t) => setSearch(t)} filterIcon={true} filterHandler={filterHandler} />
            </View>

            {!loading && !items?.length ?
                <NoItemFound /> :
                <FlatList
                    data={items}
                    key={index => 'category' + index + 'main-product'}
                    renderItem={_renderItem}
                    horizontal={false}
                    numColumns={2}
                    showsVerticalScrollIndicator={false}
                    style={{ marginHorizontal: 16 }}
                    onEndReached={info => {
                        if (page > lastPage) return;
                        setPage(page + 1);
                    }}
                />}

            {loading &&
                <View style={{ marginBottom: 20 }}>
                    <ActivityIndicator size={'large'} />
                </View>
            }
        </View>
    )
}

export default MainCategoryScreen;

const styles = StyleSheet.create({
    productsContainer: {
        flexWrap: 'wrap',
        flexDirection: 'row',
        marginHorizontal: 16
    }
})