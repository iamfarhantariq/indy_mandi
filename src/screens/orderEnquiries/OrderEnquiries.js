import { ActivityIndicator, FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect } from 'react'
import HeaderWithBack from '../../components/Headers/HeaderWithBack'
import AppStyle from '../../assets/styles/AppStyle'
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import AppConfig from '../../helpers/config'
import { commonStyle, showToastHandler } from '../../helpers/common';
import { ServiceGetOrders } from '../../services/AppService';
import { useSelector } from 'react-redux';
import { getLoginConfig } from '../../store/slices/loginConfigSlice';
import { useState } from 'react';

const OrderEnquiries = () => {
    const loginConfig = useSelector(getLoginConfig);
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(1);
    const [lastPage, setLastPage] = useState(2);
    const [index, setIndex] = useState(0);
    const [orders, setOrders] = useState([]);
    const [routes] = useState([
        { key: 'first', title: 'Enquired', type: 'enquired' },
        { key: 'second', title: 'Payment Pending', type: 'payment_pending', },
        { key: 'third', title: 'Confirmed', type: 'confirmed', },
        { key: 'fourth', title: 'Shipped', type: 'shipped' },
    ]);
    const [justCame, setJustCame] = useState(true);

    useEffect(() => {
        getAllOrders();
    }, [page]);

    useEffect(() => {
        if (!justCame) {
            setOrders([]);
            setPage(1);
            getAllOrders(1);
        } else {
            setJustCame(false);
        }
    }, [index]);

    const getAllOrders = (_page = null) => {
        setLoading(true);
        ServiceGetOrders(
            loginConfig?.user?.role === 'u' ? 'customer' : 'vendor',
            routes[index].type,
            _page ? _page : page
        ).then(response => {
            console.log({ response });
            if (page === 1) {
                setOrders(response?.data?.data);
            } else {
                setOrders([...orders, ...response?.data?.data])
            }
            setLoading(false);
            setLastPage(response?.data?.meta?.last_page);
        }).catch(e => {
            setLoading(false);
            showToastHandler(e);
        });
    }

    const FirstRoute = () => (
        <View style={{ flex: 1, backgroundColor: AppStyle.colorSet.BGColor }} >
            <OrderItems />
        </View>
    );

    const SecondRoute = () => (
        <View style={{ flex: 1, backgroundColor: AppStyle.colorSet.BGColor }} >
            <OrderItems />
        </View>
    );

    const ThirdRoute = () => (
        <View style={{ flex: 1, backgroundColor: AppStyle.colorSet.BGColor }} >
            <OrderItems />
        </View>
    );

    const FourthRoute = () => (
        <View style={{ flex: 1, backgroundColor: AppStyle.colorSet.BGColor }} >
            <OrderItems />
        </View>
    );

    const renderScene = SceneMap({
        first: FirstRoute,
        second: SecondRoute,
        third: ThirdRoute,
        fourth: FourthRoute,
    });

    const OrderItems = () => {
        return (
            <View style={{ flex: 1 }}>
                <View style={styles.priceContainer}>
                    <Text style={styles.pHeading}>{`Total orders ${routes[index]?.title?.toLocaleLowerCase()}`}</Text>
                    <Text style={styles.pPrice}>{orders?.length || 0}</Text>
                </View>
                <View style={{ marginVertical: 8, flex: 1 }}>
                    <FlatList
                        data={orders}
                        horizontal={false}
                        renderItem={SingleOrder}
                        key={index => 'item' + index + 'order'}
                        showsVerticalScrollIndicator={false}
                        nestedScrollEnabled
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

    const SingleOrder = ({ item, index }) => (
        <View style={{ marginBottom: 16 }}>
            <View style={styles.storeContainer}>
                <Text style={styles.sTitle}>Nike</Text>
                <TouchableOpacity style={styles.sButtonContainer}>
                    <Text style={styles.sButtonText}>Contact Seller</Text>
                </TouchableOpacity>
            </View>

            <View style={{ flexDirection: 'row' }}>
                <View style={{ width: '40%' }}>
                    <Text style={styles.itemDetailText}>
                        Order placed
                    </Text>
                    <Text style={styles.itemDetailText}>
                        Total price
                    </Text>
                    <Text style={styles.itemDetailText}>
                        Order no.
                    </Text>
                </View>
                <View style={{ width: '60%' }}>
                    <Text style={styles.itemDetailTextR}>
                        {item?.order_placed}
                    </Text>
                    <Text style={styles.itemDetailTextR}>
                        {item?.total}
                    </Text>
                    <Text style={styles.itemDetailTextR}>
                        {item?.order_no}
                    </Text>
                </View>
            </View>

            <View style={{ flex: 1 }}>
                <FlatList
                    data={item?.order_detail || []}
                    horizontal={false}
                    renderItem={ProductItem}
                    key={index => 'item' + index + 'category'}
                    showsVerticalScrollIndicator={false}
                    nestedScrollEnabled
                />
            </View>

        </View>
    )

    const ProductItem = ({ item, index }) => (
        <View style={styles.pIContainer}>
            <View style={{ width: '70%', flexDirection: 'row' }}>
                <Image source={item?.image} resizeMode='cover'
                    style={styles.imageStyle} />
                <View>
                    <Text style={styles.pIHeading}>{item?.id}</Text>
                    <Text style={styles.pIPrice}>{item?.price}</Text>
                    <Text style={styles.pIPrice}>Quantity: {item?.quantity}</Text>
                </View>
            </View>
        </View>
    )

    return (
        <View style={{ flex: 1, backgroundColor: AppStyle.colorSet.BGColor }}>
            <HeaderWithBack title={'Order enquiries'} />
            <View style={{ flex: 1 }}>
                <TabView
                    navigationState={{ index, routes }}
                    renderScene={renderScene}
                    onIndexChange={setIndex}
                    initialLayout={{ width: AppConfig.screenWidth, flex: 1 }}
                    renderTabBar={props => (
                        <TabBar
                            {...props} style={styles.tabBarStyle}
                            indicatorStyle={{
                                backgroundColor: AppStyle.colorSet.blackColor,
                            }}
                            renderLabel={({ focused, route }) => (
                                <Text
                                    style={{
                                        ...styles.tabBarLabel,
                                        opacity: focused ? 1 : 0.5
                                    }}>
                                    {route.title}
                                </Text>
                            )}
                        />
                    )}
                    style={{ marginTop: 20, marginHorizontal: 16 }}
                />
            </View>
        </View>
    )
}

export default OrderEnquiries

const styles = StyleSheet.create({
    tabBarStyle: {
        backgroundColor: AppStyle.colorSet.BGColor,
    },
    tabBarLabel: {
        ...commonStyle('500', 12, 'blackColor'),
    },
    priceContainer: {
        marginTop: 16,
        height: 84,
        padding: 16,
        borderRadius: 8,
        backgroundColor: AppStyle.colorSet.borderLightGrayColor
    },
    pHeading: {
        ...commonStyle('700', 12, 'primaryColorA'),
        marginBottom: 8,
    },
    pPrice: {
        ...commonStyle('600', 32, 'primaryColorA'),
        lineHeight: 43.53
    },
    storeContainer: {
        height: 40,
        borderRadius: 8,
        backgroundColor: AppStyle.colorSet.primaryColorA,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 8
    },
    sTitle: {
        ...commonStyle('600', 16, 'whiteColor'),
    },
    sButtonContainer: {
        backgroundColor: AppStyle.colorSet.whiteColor,
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 99
    },
    sButtonText: {
        ...commonStyle('500', 12, 'primaryColorB'),
    },
    imageStyle: {
        width: 56,
        height: 56,
        borderRadius: 8,
        marginRight: 12
    },
    pIHeading: {
        ...commonStyle('400', 16, 'primaryColorA'),
        lineHeight: 21.78,
        marginBottom: 4
    },
    pIPrice: {
        ...commonStyle('600', 14, 'primaryColorA'),
        lineHeight: 19.07,
        marginBottom: 4
    },
    pIContainer: {
        borderBottomColor: AppStyle.colorSet.borderLightGrayColor,
        borderBottomWidth: 1,
        paddingBottom: 8,
        flexDirection: 'row', marginTop: 16
    },
    itemDetailText: {
        ...commonStyle('400', 14, 'textSecondary'),
        marginTop: 8,
    },
    itemDetailTextR: {
        ...commonStyle('400', 14, 'primaryColorA'),
        marginTop: 8,
    }
})