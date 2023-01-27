import { StyleSheet, Text, useWindowDimensions, View } from 'react-native'
import React from 'react'
import { TabView, SceneMap } from 'react-native-tab-view';
import TabBar from 'react-native-tab-view/src/TabBar';
import AppStyle from '../../assets/styles/AppStyle';
import { commonStyle } from '../../helpers/common';
import ProductSectionStore from './ProductSectionStore';
import ReviewSectionStore from './ReviewSectionStore';
import AboutSectionStore from './AboutSectionStore';
import PolicySectionStore from './PolicySectionStore';

const TabViewSection = () => {
    const layout = useWindowDimensions();

    const [index, setIndex] = React.useState(0);
    const [routes] = React.useState([
        { key: 'first', title: 'Products' },
        { key: 'second', title: 'Reviews' },
        { key: 'third', title: 'About' },
        { key: 'fourth', title: 'Policies' },
    ]);

    const FirstRoute = () => (
        <View style={{ flex: 1, backgroundColor: AppStyle.colorSet.BGColor }} >
            <ProductSectionStore />
        </View>
    );

    const SecondRoute = () => (
        <View style={{ flex: 1, backgroundColor: AppStyle.colorSet.BGColor }} >
            <ReviewSectionStore />
        </View>
    );

    const ThirdRoute = () => (
        <View style={{ flex: 1, backgroundColor: AppStyle.colorSet.BGColor }} >
            <AboutSectionStore />
        </View>
    );

    const FourthRoute = () => (
        <View style={{ flex: 1, backgroundColor: AppStyle.colorSet.BGColor }} >
            <PolicySectionStore />
        </View>
    );

    const renderScene = SceneMap({
        first: FirstRoute,
        second: SecondRoute,
        third: ThirdRoute,
        fourth: FourthRoute,
    });

    return (
        <TabView
            navigationState={{ index, routes }}
            renderScene={renderScene}
            onIndexChange={setIndex}
            initialLayout={{ width: layout.width }}
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
    )
}

export default TabViewSection

const styles = StyleSheet.create({
    tabBarStyle: {
        backgroundColor: AppStyle.colorSet.BGColor,
        // flex: 1, 
        // borderColor: 'red', 
        // borderWidth: 1
    },
    tabBarLabel: {
        ...commonStyle('500', 12, 'blackColor')
    }
})