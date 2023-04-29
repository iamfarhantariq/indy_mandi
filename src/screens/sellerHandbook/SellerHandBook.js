import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import AppStyle from '../../assets/styles/AppStyle';
import HeaderWithBack from '../../components/Headers/HeaderWithBack';
import { useState } from 'react';
import { useEffect } from 'react';
import { ServiceGetBooksOfCategory, ServiceGetFeaturePost, ServiceGetSellerCategories } from '../../services/AppService';
import { commonStyle, showToastHandler } from '../../helpers/common';
import { SceneMap, TabBar, TabView } from 'react-native-tab-view';
import AppConfig from '../../helpers/config';
import { useNavigation } from '@react-navigation/native';

const SellerHandBook = () => {
    const navigation = useNavigation();
    const [featurePost, setFeaturePost] = useState(null);
    const [catgories, setCatgories] = useState([]);
    const [index, setIndex] = React.useState(0);
    const [routes, setRoutes] = useState([]);
    const [books, setBooks] = useState([]);

    useEffect(() => {
        getFeaturePost();
        getCategoriesList();
    }, []);

    useEffect(() => {
        if (catgories?.length && catgories[index]?.id) {
            getBooksForCategory(catgories[index]?.id)
        }
    }, [index, catgories])

    const getFeaturePost = () => {
        ServiceGetFeaturePost().then(response => {
            console.log({ response });
            setFeaturePost(response?.data?.data)
        }).catch(e => { showToastHandler(e) });
    }

    const getCategoriesList = () => {
        ServiceGetSellerCategories().then(response => {
            setCatgories(response?.data?.data);
            setRoutes(response?.data?.data?.map(route => {
                return {
                    key: route?.category_name?.split(' ')[0], title: route?.category_name
                }
            }));
        }).catch(e => { showToastHandler(e) });
    }

    const getBooksForCategory = (id) => {
        ServiceGetBooksOfCategory(id).then(response => {
            console.log(response);
            setBooks(response?.data?.data);
        }).catch(e => { showToastHandler(e) });
    }

    const renderScene = SceneMap({
        ...routes.reduce((scenes, tab) => {
            scenes[tab.key] = () => (
                <SellerBooks />
            );
            return scenes;
        }, {})
    });

    const _renderItem = ({ item, index }) => (
        <TouchableOpacity onPress={() => navigation.navigate('SellerBookContent', {sellerBookId: item?.id})}
            style={{ marginRight: index % 2 === 0 ? 16 : 0, marginBottom: 16 }}>
            <Image resizeMode='cover' source={{ uri: item?.image }}
                style={styles.flexImageContainer}
                imageStyle={{ borderRadius: 8 }} />
            <Text style={styles.typeText}>{item?.title}</Text>
        </TouchableOpacity>
    )

    const SellerBooks = () => {
        return (
            <View style={{ flex: 1 }}>
                <FlatList
                    data={books}
                    key={index => 'books' + index + 'item'}
                    renderItem={_renderItem}
                    horizontal={false}
                    numColumns={2}
                    scrollEnabled
                    showsVerticalScrollIndicator={false}
                    style={{ paddingVertical: 16 }}
                />
            </View>
        )
    }

    return (
        <View style={{ flex: 1, backgroundColor: AppStyle.colorSet.BGColor }}>
            <HeaderWithBack title={'Seller handbook'} />
            <View style={{ marginHorizontal: 16, flex: 1 }}>
                {featurePost && <View style={styles.featureC}>
                    <View style={{ flex: 1, width: '50%' }}>
                        <Image source={{ uri: featurePost?.image }}
                            resizeMode='cover' style={{}} />
                    </View>
                    <View style={styles.featureRC}>
                        <Text style={styles.name}>{featurePost?.title}</Text>
                        <Text style={styles.description}>{'Read more >'}</Text>
                    </View>
                </View>}

                <View style={{ flex: 1 }}>
                    {routes?.length && renderScene ?
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
                                            {route?.title}
                                        </Text>
                                    )}
                                />
                            )}
                        /> : null}
                </View>
            </View>
        </View>
    )
}

export default SellerHandBook

const styles = StyleSheet.create({
    featureC: {
        flexDirection: 'row',
        borderRadius: 8,
        overflow: 'hidden',
        height: 160,
        marginBottom: 16
    },
    featureRC: {
        flex: 1,
        justifyContent: 'space-between',
        width: '50%', padding: 16,
        backgroundColor: AppStyle.colorSet.primaryColorA
    },
    name: {
        ...commonStyle('600', 12, 'whiteColor'),
    },
    description: {
        ...commonStyle('400', 11, 'whiteColor'),
    },
    tabBarStyle: {
        backgroundColor: AppStyle.colorSet.BGColor,
    },
    tabBarLabel: {
        ...commonStyle('500', 12, 'blackColor')
    },
    itemContainer: {
        alignItems: 'center',
        paddingVertical: 8,
        borderBottomColor: AppStyle.colorSet.borderLightGrayColor,
        borderBottomWidth: 1
    },
    flexImageContainer: {
        height: ((AppConfig.windowWidth / 1.08) / 2) - 24,
        width: ((AppConfig.windowWidth / 1.08) / 2) - 24,
        borderRadius: 8
    },
    typeText: {
        ...commonStyle('600', 12, 'primaryColorA'),
        lineHeight: 16.34,
        marginTop: 4,
        width: ((AppConfig.windowWidth / 1.08) / 2) - 24,
    },
})