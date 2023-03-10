import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { TabView, SceneMap } from 'react-native-tab-view';
import TabBar from 'react-native-tab-view/src/TabBar';
import AppStyle from '../../assets/styles/AppStyle';
import { commonStyle } from '../../helpers/common';
import AppConfig from '../../helpers/config';
import ProductSectionExplore from './ProductSectionExplore';
import BlogExplore from './BlogExplore';
import StoresExplore from './StoresExplore';

const TabViewExplore = () => {
    const [index, setIndex] = React.useState(0);
    const [routes] = React.useState([
        { key: 'first', title: 'Products' },
        { key: 'second', title: 'Blogs' },
        { key: 'third', title: 'Stores' },
    ]);

    const FirstRoute = () => (
        <View style={{ flex: 1, backgroundColor: AppStyle.colorSet.BGColor }} >
            <ProductSectionExplore />
        </View>
    );

    const SecondRoute = () => (
        <View style={{ flex: 1, backgroundColor: AppStyle.colorSet.BGColor }} >
            <BlogExplore />
        </View>
    );

    const ThirdRoute = () => (
        <View style={{ flex: 1, backgroundColor: AppStyle.colorSet.BGColor }} >
            <StoresExplore />
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