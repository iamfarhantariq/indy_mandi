import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import AppConfig from '../../helpers/config';
import Back from '../../assets/images/back-icon.svg';
import Cross from '../../assets/images/cross-icon.svg';
import AppStyle from '../../assets/styles/AppStyle';
import { useNavigation } from '@react-navigation/native';
import { commonStyle } from '../../helpers/common';
import Add from '../../assets/images/add-icon.svg';
import Option from '../../assets/images/options-icon.svg';

const HeaderWithBack = ({ title, cross = false, iconType = '', route = '', shouldBack = true, handleOptions = null }) => {
    const navigation = useNavigation();

    const icons = [
        { name: 'add', icon: <Add />, func: () => navigation.navigate(route) },
        { name: 'options', icon: <Option />, func: () => handleOptions() },
        {
            name: 'manageProducts',
            icon: <View style={{ flexDirection: 'row', width: 70, justifyContent: 'space-between' }}>
                <TouchableOpacity onPress={() => navigation.navigate('AddProduct')}>
                    <Add />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate('ManageCollection')}>
                    <Option />
                </TouchableOpacity>
            </View>,
            func: () => null
        },
    ]

    const GetIcon = () => {
        const item = icons.find(i => i.name === iconType)
        return (
            <TouchableOpacity onPress={item.func}>
                {item.icon}
            </TouchableOpacity>
        )
    };

    return (
        <View style={styles.headerContainer}>
            {shouldBack &&
                <TouchableOpacity onPress={() => navigation.pop()}>
                    {cross ? <Cross /> : <Back />}
                </TouchableOpacity>}
            <Text style={styles.title}>{title}</Text>
            {iconType && <GetIcon />}
        </View>
    )
}

export default HeaderWithBack

const styles = StyleSheet.create({
    headerContainer: {
        marginTop: AppConfig.statusBarHeight,
        flexDirection: 'row',
        height: 44,
        backgroundColor: AppStyle.colorSet.BGColor,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 16,
        borderBottomColor: AppStyle.colorSet.borderLightGrayColor,
        borderBottomWidth: 1
    },
    title: {
        ...commonStyle('500', 20, 'primaryColorA'),
        color: '#003166',
        textAlign: 'center',
        flex: 1
    }
})