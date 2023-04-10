import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import AppStyle from '../../assets/styles/AppStyle'
import { commonStyle, showToastHandler, UpdatedUserInTheApp } from '../../helpers/common'
import AppConfig from '../../helpers/config'
import UserAvatar from '../../assets/images/user-avatar.svg';
import { useIsFocused, useNavigation } from '@react-navigation/native'
import { useDispatch, useSelector } from 'react-redux'
import { getLoginConfig, setLogout, setUser } from '../../store/slices/loginConfigSlice'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { setActivityIndicator } from '../../store/slices/appConfigSlice'
import { ServiceLogout } from '../../services/AuthServices'
import { ServiceDeleteStore, ServiceGetLogoutText } from '../../services/AppService'
import Toast from 'react-native-toast-message';
import { SheetManager } from 'react-native-actions-sheet';
import { useEffect } from 'react'

const UserScreen = () => {
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const isFocused = useIsFocused();
    const loginConfig = useSelector(getLoginConfig);

    useEffect(() => {
        async function fetchUserDetails() {
            loginConfig?.isLogin && await UpdatedUserInTheApp(dispatch);
        }
        fetchUserDetails();
    }, [isFocused]);

    const logoutFunction = () => {
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

    const customerOptions = [
        { title: 'Order enquiries', func: () => navigation.navigate('OrderEnquiries') },
        { title: 'Indyviews payments', func: () => navigation.navigate('PaymentHistory') },
        { title: 'Wishlist', func: () => navigation.navigate('WishList') },
        { title: 'Addresses', func: () => navigation.navigate('Addresses') },
        { title: 'Account settings', func: () => navigation.navigate('AccountSettings') },
        { title: 'Become a seller', func: () => navigation.navigate('BecomeSeller') },
        { title: 'Raise a dispute', func: () => navigation.navigate('RaiseDispute') },
        { title: 'Logout', func: logoutFunction },
    ]

    const sellerOptions = [
        { title: 'Order enquiries', func: () => navigation.navigate('OrderEnquiries') },
        { title: 'Payments', func: () => navigation.navigate('PaymentHistory') },
        {
            title: 'Delete store', func: async () => {
                const text = await ServiceGetLogoutText();
                console.log({ text });
                SheetManager.show('example-two', {
                    payload: {
                        header: text,
                        actions: [
                            { title: 'Yes! Delete my store', value: 'yes' },
                            { title: 'No!', value: 'no' }
                        ],
                        filterHandler: (_action) => {
                            if (_action === 'yes') {
                                dispatch(setActivityIndicator(true));
                                ServiceDeleteStore().then(response => {
                                    console.log({ response });
                                    dispatch(setUser(response?.data?.data));
                                    dispatch(setActivityIndicator(false));
                                    Toast.show({
                                        type: 'success',
                                        text1: 'Success',
                                        text2: 'Success',
                                    });
                                }).catch(e => {
                                    showToastHandler(e, dispatch);
                                });
                            }
                        }
                    }
                });
            }
        },
        { title: 'Account settings', func: () => navigation.navigate('AccountSettings') },
        { title: 'Seller handbook', func: () => null },
        { title: 'Raise a dispute', func: () => navigation.navigate('RaiseDispute') },
        { title: 'Logout', func: logoutFunction },
    ]

    const Option = ({ item, index }) => (
        <TouchableOpacity onPress={item.func}>
            <Text style={styles.action}>{item.title}</Text>
        </TouchableOpacity>
    )

    const onImageClick = () => {
        SheetManager.show('example-two', {
            payload: {
                header: 'Choose your action',
                actions: [
                    // { title: 'View photo', value: 'view' },
                    { title: 'Upload photo', value: 'edit' }
                ],
                filterHandler: (_action) => navigation.navigate('UserImage', { action: _action })
            }
        });
    }

    return (
        <View style={{ flex: 1, backgroundColor: AppStyle.colorSet.BGColor }}>
            <View style={styles.headingContainer}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <TouchableOpacity onPress={onImageClick}>
                        {loginConfig?.user?.profile_image ?
                            <Image source={{ uri: loginConfig?.user?.profile_image }}
                                resizeMode='cover' style={{ height: 40, width: 40, borderRadius: 50 }} />
                            : <UserAvatar />}
                    </TouchableOpacity>
                    <Text style={styles.headerText}>Customer</Text>
                </View>
            </View>
            <View style={{ flex: 1, marginHorizontal: 16 }}>
                <FlatList
                    horizontal={false}
                    data={loginConfig?.user?.role === 'v' ||
                        loginConfig?.user?.role === 's' ?
                        sellerOptions : loginConfig?.user?.role === 'u' ?
                            customerOptions :
                            [{ title: 'Logout', func: logoutFunction }]}
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