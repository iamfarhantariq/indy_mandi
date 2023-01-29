import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { commonPageStyle, commonStyle } from '../../helpers/common'
import AppStyle from '../../assets/styles/AppStyle';
import SettingIcon from '../../assets/images/setting-icon.svg';
import InputField from '../../components/Input/InputField';
import { useState } from 'react';
import { useNavigation } from '@react-navigation/native';

const ChatScreen = () => {
    const navigation = useNavigation();
    const [search, setSearch] = useState('');
    const items = [
        { name: 'Emma Mayers', message: 'Thank you very much! Your response is appreciated and acknowledged', imageSource: require('../../assets/images/demo-category-image.jpeg') },
        { name: 'Emma Mayers', message: 'Thank you very much! Your response is appreciated and acknowledged', imageSource: require('../../assets/images/demo-category-image.jpeg') },
        { name: 'Emma Mayers', message: 'Thank you very much! Your response is appreciated and acknowledged', imageSource: require('../../assets/images/demo-category-image.jpeg') },
        { name: 'Emma Mayers', message: 'Thank you very much! Your response is appreciated and acknowledged', imageSource: require('../../assets/images/demo-category-image.jpeg') },
        { name: 'Emma Mayers', message: 'Thank you very much! Your response is appreciated and acknowledged', imageSource: require('../../assets/images/demo-category-image.jpeg') },
        { name: 'Emma Mayers', message: 'Thank you very much! Your response is appreciated and acknowledged', imageSource: require('../../assets/images/demo-category-image.jpeg') },
        { name: 'Emma Mayers', message: 'Thank you very much! Your response is appreciated and acknowledged', imageSource: require('../../assets/images/demo-category-image.jpeg') },
        { name: 'Emma Mayers', message: 'Thank you very much! Your response is appreciated and acknowledged', imageSource: require('../../assets/images/demo-category-image.jpeg') },
        { name: 'Emma Mayers', message: 'Thank you very much! Your response is appreciated and acknowledged', imageSource: require('../../assets/images/demo-category-image.jpeg') },
        { name: 'Emma Mayers', message: 'Thank you very much! Your response is appreciated and acknowledged', imageSource: require('../../assets/images/demo-category-image.jpeg') },
        { name: 'Emma Mayers', message: 'Thank you very much! Your response is appreciated and acknowledged', imageSource: require('../../assets/images/demo-category-image.jpeg') },
    ]

    const _renderItem = ({ item, index }) => (
        <TouchableOpacity onPress={() => navigation.navigate('ChatDetail')} style={styles.chatItemContainer}>
            <Image resizeMode='cover' source={item.imageSource}
                style={styles.imageStyle} />
            <View style={{ marginLeft: 12 }}>
                <Text style={styles.name} numberOfLines={1} lineBreakMode='tail'>{item.name}</Text>
                <Text style={styles.message} numberOfLines={1} lineBreakMode='tail'>{item.message}</Text>
            </View>
        </TouchableOpacity>
    )

    return (
        <View style={commonPageStyle}>
            <View style={styles.headingContainer}>
                <Text style={styles.headerText}>Chat</Text>
                <SettingIcon />
            </View>
            <View style={{ marginHorizontal: 16, marginVertical: 16 }}>
                <InputField value={search} onTextChange={(t) => setSearch(t)} placeholder={'Search'} />
            </View>
            <View style={{ marginHorizontal: 16, flex: 1 }}>
                <FlatList
                    data={items}
                    nestedScrollEnabled
                    key={index => 'chat' + index + 'item'}
                    renderItem={_renderItem}
                    showsVerticalScrollIndicator={false}
                />
            </View>
        </View>
    )
}

export default ChatScreen

const styles = StyleSheet.create({
    headingContainer: {
        paddingHorizontal: 16,
        borderBottomColor: AppStyle.colorSet.borderLightGrayColor,
        borderBottomWidth: 1,
        paddingVertical: 8,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    headerText: {
        ...commonStyle('500', 20, 'primaryColorA')
    },
    chatItemContainer: {
        flexDirection: 'row',
        borderBottomColor: AppStyle.colorSet.borderLightGrayColor,
        borderBottomWidth: 1,
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 8,
    },
    imageStyle: {
        borderRadius: 8,
        height: 40,
        width: 40,
    },
    name: {
        ...commonStyle('400', 14, 'primaryColorA'),
        lineHeight: 21.79
    },
    message: {
        ...commonStyle('400', 12, 'textSecondary'),
        lineHeight: 16.34
    }
})