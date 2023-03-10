import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import AppStyle from '../../assets/styles/AppStyle';
import { commonStyle } from '../../helpers/common';
import AppConfig from '../../helpers/config';
import ProductSectionExplore from './ProductSectionExplore';
import BlogExplore from './BlogExplore';
import StoresExplore from './StoresExplore';

const TabViewExplore = ({ setSearchType, data = [] }) => {
    const [index, setIndex] = React.useState(0);
    const [routes] = React.useState([
        { key: 'first', title: 'Products', type: 'products' },
        { key: 'second', title: 'Blogs', type: 'blogs' },
        { key: 'third', title: 'Stores', type: 'stores' },
    ]);

    useEffect(() => {
        setSearchType(routes[index].type);
    }, [index]);

    const getItemsToShow = (i) => i === index ? data : [];

    const FirstRoute = () => (
        <View style={{ flex: 1, backgroundColor: AppStyle.colorSet.BGColor }} >
            <ProductSectionExplore items={getItemsToShow(0)} />
        </View>
    );

    const SecondRoute = () => (
        <View style={{ flex: 1, backgroundColor: AppStyle.colorSet.BGColor }} >
            <BlogExplore items={getItemsToShow(1)} />
        </View>
    );

    const ThirdRoute = () => (
        <View style={{ flex: 1, backgroundColor: AppStyle.colorSet.BGColor }} >
            <StoresExplore items={getItemsToShow(2)} />
        </View>
    );

    const renderScene = SceneMap({
        first: FirstRoute,
        second: SecondRoute,
        third: ThirdRoute,
    });

    return (
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