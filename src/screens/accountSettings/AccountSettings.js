import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import AppStyle from '../../assets/styles/AppStyle'
import { commonPageStyle, commonStyle } from '../../helpers/common'
import AppConfig from '../../helpers/config'
import UserAvatar from '../../assets/images/user-avatar.svg';
import { useNavigation } from '@react-navigation/native'
import HeaderWithBack from '../../components/Headers/HeaderWithBack'

const AccountSettings = () => {
    const navigation = useNavigation();
    const items = [
        { title: 'Update profile', func: () => navigation.navigate('ChangeName') },
        { title: 'Update email', func: () => navigation.navigate('ChangeEmail') },
        { title: 'Reset password', func: () => navigation.navigate('ResetPassword') },
    ]

    const Option = ({ item, index }) => (
        <TouchableOpacity onPress={item.func}>
            <Text style={styles.action}>{item.title}</Text>
        </TouchableOpacity>
    )

    return (
        <View style={{ flex: 1, backgroundColor: AppStyle.colorSet.BGColor }}>
            <HeaderWithBack title={'Account settings'} />
            <View style={{ flex: 1, marginHorizontal: 16 }}>
                <FlatList
                    horizontal={false}
                    data={items}
                    key={(index) => 'option' + index + 'action'}
                    renderItem={Option}
                    showsVerticalScrollIndicator={false}
                />
            </View>
        </View>
    )
}

export default AccountSettings

const styles = StyleSheet.create({
    headingContainer: {
        height: 116,
        paddingHorizontal: 16,
        borderBottomColor: AppStyle.colorSet.primaryColorA,
        backgroundColor: AppStyle.colorSet.primaryColorA,
        paddingTop: AppConfig.statusBarHeight,
        paddingBottom: 16,
        justifyContent: 'flex-end'
    },
    headerText: {
        ...commonStyle('400', 24, 'BGColor'),
        marginLeft: 16
    },
    action: {
        ...commonStyle('600', 16, 'primaryColorA'),
        marginTop: 26
    }
})