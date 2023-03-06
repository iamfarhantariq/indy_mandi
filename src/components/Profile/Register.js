import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import InputFieldBase from '../Input/InputFieldBase'
import Button from '../Button';
import { useFormik } from "formik";
import { useNavigation } from '@react-navigation/native';
import { registerFormSchema } from '../../validation';
import DeviceInfo from 'react-native-device-info';
import { ServiceRegisterUser } from '../../services/AuthServices';
import { useDispatch } from 'react-redux';
import { setActivityIndicator } from '../../store/slices/appConfigSlice';
import Toast from 'react-native-toast-message';
import { setUser } from '../../store/slices/loginConfigSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Register = ({ setView }) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

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
    initialValues: { name: "", email: "", mobile: "", password: "", password_confirmation: "", device_name: DeviceInfo.getBrand() },
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
    validationSchema: registerFormSchema,
  });

  const otherProps = { values, errors, touched, setFieldValue, setFieldTouched, handleBlur };

  return (
    <View style={{ flex: 1, marginTop: 26, marginHorizontal: 16 }}>
      <ScrollView showsVerticalScrollIndicator={false}>
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

const styles = StyleSheet.create({})