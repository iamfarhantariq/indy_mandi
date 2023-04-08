import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import HeaderWithBack from '../../components/Headers/HeaderWithBack'
import AppStyle from '../../assets/styles/AppStyle'
import { useNavigation } from '@react-navigation/native'
import AppConfig from '../../helpers/config'

const ManageCollection = () => {
    const navigation = useNavigation();

    const items = [
        { name: 'On-sale', imageSource: require('../../assets/images/demo-category-image.jpeg') },
        { name: 'New year collection', imageSource: require('../../assets/images/demo-category-image.jpeg') },
        { name: 'Mango collection', imageSource: require('../../assets/images/demo-category-image.jpeg') },
    ];

    const _renderItem = ({ item, index }) => {
        return (
            <TouchableOpacity onPress={() => null}
                style={{ marginRight: index % 2 === 0 ? 16 : 0, marginBottom: 16 }}>
                <Image
                    resizeMode='cover'
                    source={item.imageSource}
                    style={styles.flexImageContainer}
                    imageStyle={{ borderRadius: 8 }}
                />
                <Text style={styles.name}>
                    {item?.name}
                </Text>
            </TouchableOpacity>
        )
    }

    return (
        <View style={{ flex: 1, backgroundColor: AppStyle.colorSet.BGColor }}>
            <HeaderWithBack title={'Manage Collection'} iconType='add' route='CreateCollection' />
            <View style={{ flex: 1, marginHorizontal: 16, marginTop: 16 }}>
                <FlatList
                    horizontal={false}
                    data={items}
                    numColumns={2}
                    
                    key={(index) => 'collection' + index + 'product'}
                    renderItem={_renderItem}
                    showsVerticalScrollIndicator={false}
                />
            </View>
        </View>
    )
}

export default ManageCollection

const styles = StyleSheet.create({
    imageContainer: {
        height: 136,
        width: 136,
        marginRight: 12,
        marginBottom: 2
    },
    flexImageContainer: {
        height: (AppConfig.windowWidth / 2) - 24,
        width: (AppConfig.windowWidth / 2) - 24,
        borderRadius: 8
    },
    name: {
        fontSize: 12,
        fontWeight: '400',
        color: AppStyle.colorSet.primaryColorA,
        marginTop: 2,
    }
})