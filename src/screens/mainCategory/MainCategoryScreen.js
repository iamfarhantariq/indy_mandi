import { StyleSheet, ScrollView, View, FlatList } from 'react-native'
import React, { useState } from 'react'
import AppStyle from '../../assets/styles/AppStyle';
import HomeHeader from '../../components/Headers/HomeHeader';
import InputField from '../../components/Input/InputField';
import GeneralProduct from '../../components/Products/GeneralProduct';

const MainCategoryScreen = ({ route }) => {
    const [search, setSearch] = useState('');

    const items = [
        { name: 'New Nike girl shoe', price: '$80.77', imageSource: require('../../assets/images/demo-category-image.jpeg') },
        { name: 'New Nike girl shoe', price: '$80.77', imageSource: require('../../assets/images/demo-category-image.jpeg') },
        { name: 'New Nike girl shoe', price: '$80.77', imageSource: require('../../assets/images/demo-category-image.jpeg') },
        { name: 'New Nike girl shoe', price: '$80.77', imageSource: require('../../assets/images/demo-category-image.jpeg') },
        { name: 'New Nike girl shoe', price: '$80.77', imageSource: require('../../assets/images/demo-category-image.jpeg') },
        { name: 'New Nike girl shoe', price: '$80.77', imageSource: require('../../assets/images/demo-category-image.jpeg') },
    ]


    const _renderItem = ({ item, index }) => {
        return (
            <View style={{ marginBottom: 16, paddingRight: index % 2 == 0 ? 8 : 0, paddingLeft: index % 2 == 0 ? 0 : 8 }}>
                <GeneralProduct item={item} index={index} flex={true} />
            </View>
        )
    }

    return (
        <View style={{ flex: 1, backgroundColor: AppStyle.colorSet.BGColor }}>
            <HomeHeader route={route} />
            <View style={{ marginHorizontal: 16, marginVertical: 18 }}>
                <InputField value={search} onTextChange={(t) => setSearch(t)} filterIcon={true} />
            </View>

            <FlatList
                data={items}
                key={index => 'category' + index + 'main-product'}
                renderItem={_renderItem}
                
                horizontal={false}
                numColumns={2}
                showsVerticalScrollIndicator={false}
                style={{ marginHorizontal: 16 }}
            />
        </View>
    )
}

export default MainCategoryScreen;

const styles = StyleSheet.create({
    productsContainer: {
        flexWrap: 'wrap',
        flexDirection: 'row',
        marginHorizontal: 16
    }
})