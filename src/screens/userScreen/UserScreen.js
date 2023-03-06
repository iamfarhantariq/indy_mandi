import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import AppStyle from '../../assets/styles/AppStyle'
import { commonPageStyle, commonStyle } from '../../helpers/common'
import AppConfig from '../../helpers/config'
import UserAvatar from '../../assets/images/user-avatar.svg';
import { useNavigation } from '@react-navigation/native'
import { useDispatch, useSelector } from 'react-redux'
import { getLoginConfig, setLogout } from '../../store/slices/loginConfigSlice'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { setActivityIndicator } from '../../store/slices/appConfigSlice'
import { ServiceLogout } from '../../services/AuthServices'
import Toast from 'react-native-toast-message';

const UserScreen = () => {
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const loginConfig = useSelector(getLoginConfig);

    const items = [
        { title: 'Order enquiries', func: () => navigation.navigate('OrderEnquiries') },
        { title: 'Indyviews payments', func: () => navigation.navigate('PaymentHistory') },
        { title: 'Wishlist', func: () => navigation.navigate('WishList') },
        { title: 'Addresses', func: () => navigation.navigate('Addresses') },
        { title: 'Account settings', func: () => navigation.navigate('AccountSettings') },
        { title: 'Become a seller', func: () => navigation.navigate('BecomeSeller') },
        { title: 'Raise a dispute', func: () => navigation.navigate('RaiseDispute') },
        {
            title: 'Logout', func: () => {
                dispatch(setActivityIndicator(true));
                ServiceLogout({ email: loginConfig?.user?.email }).then(async response => {
                    console.log({ response });
                    Toast.show({
                        type: 'info',
                        text1: 'Success',
                        text2: 'You have been logged out!',
                    });
                    dispatch(setLogout());
                    await AsyncStorage.removeItem("auth_token");
                    navigation.reset({
                        index: 0,
                        routes: [{ name: 'ProfileScreen' }]
                    });
                    dispatch(setActivityIndicator(false));
                }).catch(e => {
                    dispatch(setActivityIndicator(false));
                    console.log(e);
                    const errors = e?.response?.data?.errors;
                    Toast.show({
                        type: 'error',
                        text1: e?.response?.data?.message || e?.message,
                        text2: errors ? errors[Object.keys(errors)[0]][0] : '',
                    });
                });
            }
        },
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