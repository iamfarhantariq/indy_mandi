import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import HeaderWithBack from '../../components/Headers/HeaderWithBack'
import AppStyle from '../../assets/styles/AppStyle'
import TabBar from 'react-native-tab-view/src/TabBar';
import { TabView, SceneMap } from 'react-native-tab-view';
import AppConfig from '../../helpers/config'
import { commonStyle } from '../../helpers/common';

const items = [
    {
        products: [
            {
                imageSource: require('../../assets/images/demo-category-image.jpeg'),
                name: 'New Nike girl shoe', price: '$80.77', quantity: 5
            },
            {
                imageSource: require('../../assets/images/demo-category-image.jpeg'),
                name: 'New Nike girl shoe', price: '$80.77', quantity: 5
            },
        ],
        orderDate: '2022-12-19 @ 17:51', totalPrice: '$ 660', orderNo: '#97hsSjfks09FkMMn'
    },
    {
        products: [
            {
                imageSource: require('../../assets/images/demo-category-image.jpeg'),
                name: 'New Nike girl shoe', price: '$80.77', quantity: 5
            }
        ],
        orderDate: '2022-12-19 @ 17:51', totalPrice: '$ 660', orderNo: '#97hsSjfks09FkMMn'
    },
    {
        products: [
            {
                imageSource: require('../../assets/images/demo-category-image.jpeg'),
                name: 'New Nike girl shoe', price: '$80.77', quantity: 5
            }
        ],
        orderDate: '2022-12-19 @ 17:51', totalPrice: '$ 660', orderNo: '#97hsSjfks09FkMMn'
    }
];

const OrderEnquiries = () => {
    const [index, setIndex] = React.useState(0);
    const [routes] = React.useState([
        { key: 'first', title: 'Enquired' },
        { key: 'second', title: 'Payment Pending' },
        { key: 'third', title: 'Confirmed' },
        { key: 'fourth', title: 'Shipped' },
    ]);

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
                    <Text style={styles.pHeading}>Total orders enquired</Text>
                    <Text style={styles.pPrice}>500</Text>
                </View>
                <View style={{ marginVertical: 8, flex: 1 }}>
                    <FlatList
                        data={items}
                        horizontal={false}
                        renderItem={SingleOrder}
                        key={index => 'item' + index + 'order'}
                        showsVerticalScrollIndicator={false}
                        nestedScrollEnabled
                    />
                </View>
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
                <View style={{width: '40%'}}>
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
                <View style={{width: '60%'}}>
                    <Text style={styles.itemDetailTextR}>
                        {item.orderDate}
                    </Text>
                    <Text style={styles.itemDetailTextR}>
                        {item.totalPrice}
                    </Text>
                    <Text style={styles.itemDetailTextR}>
                        {item.orderNo}
                    </Text>
                </View>
            </View>

            <View style={{ flex: 1 }}>
                <FlatList
                    data={item?.products}
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
                <Image source={item.imageSource} resizeMode='cover'
                    style={styles.imageStyle} />
                <View>
                    <Text style={styles.pIHeading}>{item.name}</Text>
                    <Text style={styles.pIPrice}>{item.price}</Text>
                    <Text style={styles.pIPrice}>Quantity: {item.quantity}</Text>
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