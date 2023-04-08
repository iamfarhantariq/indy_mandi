import { FlatList, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import HeaderWithBack from '../../components/Headers/HeaderWithBack'
import InputField from '../../components/Input/InputField'
import AppStyle from '../../assets/styles/AppStyle'
import { useNavigation } from '@react-navigation/native'
import CoverFrame from '../../components/Products/CoverFrame'

const Blogs = () => {
    const navigation = useNavigation();
    const [search, setSearch] = useState('');

    const items = [
        { name: 'All', color: '#C5F1C4' },
        { name: 'Fashion', color: '#CCDFD6' },
        { name: 'Article', color: '#E8CDDE' },
    ]

    const coverItems = [
        { name: 'The secrets of not tired of wearing shoe', imageSource: require('../../assets/images/demo-cover-bg.png') },
        { name: 'The secrets of not tired of wearing shoe', imageSource: require('../../assets/images/demo-cover-bg.png') },
        { name: 'The secrets of not tired of wearing shoe', imageSource: require('../../assets/images/demo-cover-bg.png') },
        { name: 'The secrets of not tired of wearing shoe', imageSource: require('../../assets/images/demo-cover-bg.png') },
    ]

    const _renderItem = ({ item, index }) => {
        return (
            <TouchableOpacity onPress={() => navigation.navigate('MainCategoryScreen')}>
                <View style={{ ...styles.chipContainer, backgroundColor: item?.color, marginLeft: index === 0 ? 16 : 0 }}>
                    <Text style={styles.chipText}>{item?.name}</Text>
                </View>
            </TouchableOpacity>
        )
    }

    return (
        <View style={{ backgroundColor: AppStyle.colorSet.BGColor, flex: 1 }}>
            <HeaderWithBack title={'Blogs'} cross={true}/>
            <View style={{ marginHorizontal: 16, marginVertical: 18 }}>
                <InputField value={search} onTextChange={(t) => setSearch(t)} filterIcon={true} />
            </View>
            <View style={{ marginBottom: 16 }}>
                <FlatList
                    horizontal
                    data={items}
                    
                    key={(index) => 'header' + index + 'chip'}
                    renderItem={_renderItem}
                    showsHorizontalScrollIndicator={false}
                />
            </View>
            <ScrollView showsVerticalScrollIndicator={false} style={{ marginHorizontal: 16 }}>
                {coverItems?.map((item, index) => {
                    return (
                        <TouchableOpacity onPress={() => navigation.navigate('BlogContentScreen')} key={index} style={{ marginBottom: 16 }}>
                            <CoverFrame item={item} key={index} index={index} detailed={false} flex={true} />
                        </TouchableOpacity>
                    )
                })}
            </ScrollView>
        </View>
    )
}

export default Blogs;

const styles = StyleSheet.create({
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