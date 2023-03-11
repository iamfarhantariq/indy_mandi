import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import AppStyle from '../../assets/styles/AppStyle';
import { commonStyle } from '../../helpers/common';
import AppConfig from '../../helpers/config';
import ProductSectionExplore from './ProductSectionExplore';
import BlogExplore from './BlogExplore';
import StoresExplore from './StoresExplore';
import InputField from '../Input/InputField';

const TabViewExplore = () => {
    const [search, setSearch] = useState('');
    const [index, setIndex] = useState(0);
    const [routes] = useState([
        { key: 'first', title: 'Products', type: 'products' },
        { key: 'second', title: 'Blogs', type: 'blogs' },
        { key: 'third', title: 'Stores', type: 'stores' },
    ]);

    const FirstRoute = () => (
        <View style={{ flex: 1, backgroundColor: AppStyle.colorSet.BGColor }} >
            <ProductSectionExplore searchType={routes[index].type} search={search} />
        </View>
    );

    const SecondRoute = () => (
        <View style={{ flex: 1, backgroundColor: AppStyle.colorSet.BGColor }} >
            <BlogExplore searchType={routes[index].type} search={search} />
        </View>
    );

    const ThirdRoute = () => (
        <View style={{ flex: 1, backgroundColor: AppStyle.colorSet.BGColor }} >
            <StoresExplore searchType={routes[index].type} search={search} />
        </View>
    );

    const renderScene = SceneMap({
        first: FirstRoute,
        second: SecondRoute,
        third: ThirdRoute,
    });

    return (
        <View style={{ flex: 1, backgroundColor: AppStyle.colorSet.BGColor, marginTop: AppConfig.statusBarHeight }}>
            <View style={{ marginHorizontal: 16, marginVertical: 8 }}>
                <InputField value={search} onTextChange={(t) => setSearch(t)} placeholder={'Search'} />
            </View>
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
                style={{ marginHorizontal: 16 }}
            />
        </View>
    )
}

export default TabViewExplore

const styles = StyleSheet.create({
    tabBarStyle: {
        backgroundColor: AppStyle.colorSet.BGColor,
    },
    tabBarLabel: {
        ...commonStyle('500', 12, 'blackColor')
    }
})