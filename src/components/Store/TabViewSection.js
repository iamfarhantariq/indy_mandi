import { StyleSheet, Text, useWindowDimensions, View } from 'react-native'
import React from 'react'
import { TabView, SceneMap } from 'react-native-tab-view';

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
        <View style={{ flex: 1, backgroundColor: '#ff4081' }} />
    );

    const SecondRoute = () => (
        <View style={{ flex: 1, backgroundColor: '#673ab7' }} />
    );

    const ThirdRoute = () => (
        <View style={{ flex: 1, backgroundColor: '#673ab7' }} />
    );

    const FourthRoute = () => (
        <View style={{ flex: 1, backgroundColor: '#673ab7' }} />
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
            style={{marginTop: 20}}
        />
    )
}

export default TabViewSection

const styles = StyleSheet.create({})