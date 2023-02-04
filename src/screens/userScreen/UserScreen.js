import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import AppStyle from '../../assets/styles/AppStyle'
import { commonPageStyle, commonStyle } from '../../helpers/common'
import AppConfig from '../../helpers/config'
import UserAvatar from '../../assets/images/user-avatar.svg';
import { useNavigation } from '@react-navigation/native'

const UserScreen = () => {
    const navigation = useNavigation();
    const items = [
        { title: 'Order enquiries', func: () => navigation.navigate('OrderEnquiries') },
        { title: 'Indyviews payments', func: () => navigation.navigate('PaymentHistory') },
        { title: 'Wishlist', func: () => navigation.navigate('WishList') },
        { title: 'Addresses', func: () => navigation.navigate('Addresses') },
        { title: 'Account settings', func: () => navigation.navigate('AccountSettings') },
        { title: 'Become a seller', func: () => navigation.navigate('BecomeSeller') },
        { title: 'Raise a dispute', func: () => navigation.navigate('RaiseDispute') },
        { title: 'Logout', func: () => navigation.navigate('ProfileScreen') },
    ]

    const Option = ({ item, index }) => (
        <TouchableOpacity onPress={item.func}>
            <Text style={styles.action}>{item.title}</Text>
        </TouchableOpacity>
    )

    return (
        <View style={{ flex: 1, backgroundColor: AppStyle.colorSet.BGColor }}>
            <View style={styles.headingContainer}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <UserAvatar />
                    <Text style={styles.headerText}>Customer</Text>
                </View>
            </View>
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

export default UserScreen

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