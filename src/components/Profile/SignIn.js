import { Platform, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import CheckBox from '@react-native-community/checkbox';
import React from 'react';
import GoogleIcon from '../../assets/images/google-icon.svg';
import FacebookIcon from '../../assets/images/fb-icon.svg';
import AppStyle from '../../assets/styles/AppStyle';
import { commonStyle } from '../../helpers/common';
import InputFieldBase from '../Input/InputFieldBase';
import { useState } from 'react';
import Button from '../Button';
import { useNavigation } from '@react-navigation/native';
import { useFormik } from "formik";
import DeviceInfo from 'react-native-device-info';
import { ServiceLoginUser } from '../../services/AuthServices';
import Toast from 'react-native-toast-message';
import { loginFormSchema } from '../../validation';
import { useDispatch } from 'react-redux';
import { setActivityIndicator } from '../../store/slices/appConfigSlice';
import { setIsAuthorized, setIsLogin, setUser } from '../../store/slices/loginConfigSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AppConfig from '../../helpers/config';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { useEffect } from 'react';

const SignIn = ({ setView }) => {
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const [staySigned, setStaySigned] = useState(true);

    useEffect(() => {
        GoogleSignin.configure({
          scopes: ['email', 'profile'],
          webClientId: AppConfig.googleWebClient,
          offlineAccess: true, // if you want to access user data while offline
        });
      }, []);
    
      const signIn = async () => {
        try {
            await GoogleSignin.hasPlayServices();
            const userInfo = await GoogleSignin.signIn();
            console.log({ userInfo });
            Toast.show({
                type: 'success',
                text1: userInfo?.user?.name,
                text2: userInfo?.user?.email,
            });
          } catch (error) {
            console.log({error});
            Toast.show({
                type: 'error',
                text1: 'Google sign in error',
                text2: 'Something happened while, signing you up.',
            });
          }
      };

    const {
        errors,
        touched,
        values,
        setFieldValue,
        setFieldTouched,
        handleBlur,
        handleSubmit,
        handleReset,
    } = useFormik({
        initialValues: { email: "", password: "", device_name: DeviceInfo.getBrand() },
        onSubmit: (values) => {
            console.log({ values });
            dispatch(setActivityIndicator(true));
            ServiceLoginUser(values).then(async (response) => {
                console.log({ response });
                dispatch(setActivityIndicator(false));
                await AsyncStorage.setItem("auth_token", response?.data?.token);
                dispatch(setUser(response?.data));
                dispatch(setIsLogin(true));
                dispatch(setIsAuthorized(response?.data?.is_verified === 1));
                navigation.reset({
                    index: 0,
                    routes: [{ name: 'UserScreen' }]
                });
                handleReset();
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
        },
        validationSchema: loginFormSchema,
    });

    const otherProps = { values, errors, touched, setFieldValue, setFieldTouched, handleBlur };

    return (
        <View style={{ marginHorizontal: 16, flex: 1 }}>
            <ScrollView showsVerticalScrollIndicator={false}>

                <View style={{ marginVertical: 26 }}>
                    <TouchableOpacity style={{ ...styles.socialContainer, marginBottom: 8 }} onPress={signIn}>
                        <GoogleIcon />
                        <Text style={styles.socialText}>Continue with google</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.socialContainer}>
                        <FacebookIcon />
                        <Text style={styles.socialText}>Continue with Facebook</Text>
                    </TouchableOpacity>
                </View>

                <InputFieldBase
                    otherProps={otherProps}
                    title={'Email'}
                    name={'email'}
                    inputMode={'email'} // email, text, none, decimal, numeric, tel, search, url
                    keyboardType={'email-address'} // default - numeric - email-address - phone-pad
                    placeholder={'Email'}
                />
                <InputFieldBase
                    otherProps={otherProps}
                    title={'Password'}
                    name={'password'}
                    placeholder={'Password'}
                    secure={true}
                />

                <TouchableOpacity onPress={()=> navigation.navigate('ForgotPassword')}>
                    <Text style={styles.forgotText}>Forgot your password?</Text>
                </TouchableOpacity>

                <View style={styles.checkboxContainer}>
                    <CheckBox
                        value={staySigned}
                        onValueChange={() => setStaySigned(!staySigned)}
                        boxType='square'
                        onFillColor={AppStyle.colorSet.primaryColorB} // IOS
                        onTintColor={AppStyle.colorSet.whiteColor} // IOS
                        onCheckColor={AppStyle.colorSet.whiteColor} // IOS
                        tintColors={{ true: '#713A74', false: '#713A74' }} // Android
                        style={{ transform: Platform.OS === 'ios' ? [{ scaleX: 0.7 }, { scaleY: 0.7 }] : [{ scaleX: 1.1 }, { scaleY: 1.1 }] }}
                    />
                    <Text style={styles.label}>Stay signed in</Text>
                </View>

                <View style={{ marginVertical: 16 }}>
                    <Button text={'Sign In'} handleClick={handleSubmit} fill={true} />
                </View>

                <View style={{ marginVertical: 16 }}>
                    <Button text={'Register new account'} handleClick={() => setView('register')} />
                </View>

                <TouchableOpacity>
                    <Text style={{ ...styles.forgotText, textAlign: 'center', marginVertical: 16 }}>Trouble logging in?</Text>
                </TouchableOpacity>

                <Text style={styles.description}>
                    By clicking Sign in or Continue with Google, Facebook, you agree to Indymandi's{" "}
                    <Text style={{ fontWeight: '700' }}>Terms of Use</Text>{" "}
                    and{" "}
                    <Text style={{ fontWeight: '700' }}>Privacy Policy</Text>.{" "}
                    Indymandi may send you communications; you may change your preferences in your account settings. We'll never post without your permission.
                </Text>

            </ScrollView>
        </View>
    )
}

export default SignIn

const styles = StyleSheet.create({
    socialContainer: {
        borderColor: AppStyle.colorSet.primaryColorB,
        borderWidth: 1,
        borderRadius: 99,
        paddingHorizontal: 16,
        paddingVertical: 10,
        flexDirection: 'row',
        alignItems: 'center'
    },
    socialText: {
        ...commonStyle('500', 16, 'primaryColorB'),
        textAlign: 'center',
        flex: 1,
    },
    forgotText: {
        ...commonStyle('600', 14, 'primaryColorB'),
        marginBottom: 19
    },
    checkboxContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        height: 18
    },
    label: {
        ...commonStyle('600', 14, 'primaryColorA'),
        marginLeft: 15
    },
    description: {
        ...commonStyle('400', 11, 'textSecondary'),
        lineHeight: 14.98,
        marginBottom: 32
    }
})