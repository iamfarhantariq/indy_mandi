import React from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import AppConfig from '../../helpers/config';
import AppLogo from '../../assets/images/app-logo.svg';
import AppStyle from '../../assets/styles/AppStyle';

const HomeHeader = () => {

    const items = [
        { name: 'Clothing', color: '#C5F1C4' },
        { name: 'Clothing', color: '#CCDFD6' },
        { name: 'Clothing', color: '#E8CDDE' },
        { name: 'Clothing', color: '#E9DBD7' },
        { name: 'Clothing', color: '#D3E8EB' },
        { name: 'Clothing', color: '#C5F1C4' },
        { name: 'Clothing', color: '#CCDFD6' },
        { name: 'Clothing', color: '#E8CDDE' },
    ]

    const _renderItem = ({ item, index }) => {
        return (
            <View style={{ ...styles.chipContainer, backgroundColor: item?.color, marginLeft: index === 0 ? 16 : 0 }}>
                <Text style={styles.chipText}>{item?.name}</Text>
            </View>
        )
    }

    return (
        <View style={styles.container}>
            <View style={{ marginHorizontal: 16, marginTop: 8, marginBottom: 18 }}>
                <AppLogo />
            </View>
            <View style={{ marginBottom: 8 }}>
                <FlatList
                    horizontal
                    data={items}
                    key={(index) => 'header' + index + 'chip'}
                    renderItem={_renderItem}
                    showsHorizontalScrollIndicator={false}
                />
            </View>
        </View>
    )
}

export default HomeHeader;

const styles = StyleSheet.create({
    container: {
        marginTop: AppConfig.statusBarHeight,
        borderBottomColor: AppStyle.colorSet.borderLightGrayColor,
        borderBottomWidth: 1
    },
    chipContainer: {
        paddingHorizontal: 12,
        paddingVertical: 8,
        marginRight: 8,
        borderRadius: 20
    },
    chipText: {
        fontSize: 14,
        color: AppStyle.colorSet.blackColor + '60',
        letterSpacing: -0.5,
        fontWeight: '500'
    }
})