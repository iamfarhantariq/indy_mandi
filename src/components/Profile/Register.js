import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import InputFieldBase from '../Input/InputFieldBase'
import Button from '../Button';
import { useFormik } from "formik";
import { useNavigation } from '@react-navigation/native';
import { registerFormSchema } from '../../validation';
import DeviceInfo from 'react-native-device-info';
import GoogleIcon from '../../assets/images/google-icon.svg';
import FacebookIcon from '../../assets/images/fb-icon.svg';
import { ServiceRegisterUser } from '../../services/AuthServices';
import { useDispatch } from 'react-redux';
import { setActivityIndicator } from '../../store/slices/appConfigSlice';
import Toast from 'react-native-toast-message';
import { setUser } from '../../store/slices/loginConfigSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { useEffect } from 'react';
import AppConfig from '../../helpers/config';
import AppStyle from '../../assets/styles/AppStyle';
import { commonStyle } from '../../helpers/common';

const Register = ({ setView }) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  useEffect(async () => {
    GoogleSignin.configure({
      scopes: ['email', 'profile'],
      webClientId: AppConfig.googleWebClient,
      offlineAccess: true, // if you want to access user data while offline
    });
    const fcmToken = await AsyncStorage.getItem('fcmToken')
    setFieldValue('fcm_token', fcmToken);
  }, []);

  const googleSignIn = async () => {
    try {
      dispatch(setActivityIndicator(true));
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      console.log(JSON.stringify(userInfo));
      console.log({ userInfo });
      ServiceVerifySocialAuth(userInfo).then(response => {
        dispatch(setActivityIndicator(false));
        Toast.show({
          type: 'success',
          text1: userInfo?.user?.name,
          text2: userInfo?.user?.email,
        });
        console.log({ response });
      }).catch(e => {
        dispatch(setActivityIndicator(false));
        console.log({ e });
      });
    } catch (error) {
      console.log({ error });
      dispatch(setActivityIndicator(false));
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
    initialValues: { name: "", email: "", mobile: "", password: "", password_confirmation: "", device_name: DeviceInfo.getBrand(), fcm_token: "" },
    onSubmit: (values) => {
      console.log({ values });
      dispatch(setActivityIndicator(true));
      ServiceRegisterUser(values).then(async (response) => {
        console.log({ response });
        dispatch(setActivityIndicator(false));
        await AsyncStorage.setItem("auth_token", response?.data?.token);
        dispatch(setUser(response?.data));
        navigation.navigate('VerifyEmail', { user: response?.data });
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
    // validationSchema: registerFormSchema,
  });

  const otherProps = { values, errors, touched, setFieldValue, setFieldTouched, handleBlur };

  return (
    <View style={{ flex: 1, marginTop: 26, marginHorizontal: 16 }}>
      <ScrollView showsVerticalScrollIndicator={false}>

        <View style={{ marginBottom: 26 }}>
          <TouchableOpacity style={{ ...styles.socialContainer, marginBottom: 8 }} onPress={googleSignIn}>
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
          title={'Name'}
          name={'name'}
          placeholder={'Name'}
        />
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
          title={'Phone'}
          name={'mobile'}
          inputMode={'tel'} // email, text, none, decimal, numeric, tel, search, url
          keyboardType={'phone-pad'} // default - numeric - email-address - phone-pad
          placeholder={'Phone'}
        />
        <InputFieldBase
          otherProps={otherProps}
          title={'Password'}
          name={'password'}
          placeholder={'Password'}
          secure={true}
        />
        <InputFieldBase
          otherProps={otherProps}
          title={'Confirm Password'}
          name={'password_confirmation'}
          placeholder={'Confirm Password'}
          secure={true}
        />

        <View style={{ marginVertical: 16 }}>
          <Button text={'Register new account'} handleClick={handleSubmit} fill={true} />
        </View>

        <View style={{ marginVertical: 16 }}>
          <Button text={'Sign In'} handleClick={() => setView('login')} />
        </View>

        {/* <View style={{ marginVertical: 16 }}>
          <Button text={'Demo Contact US'} handleClick={() => navigation.navigate('ContactUs')} />
        </View>

        <View style={{ marginVertical: 16 }}>
          <Button text={'About, Careers, Terms, Privacy'} handleClick={() => navigation.navigate('RenderContentScreen')} />
        </View> */}

      </ScrollView>
    </View>
  )
}

export default Register

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
})