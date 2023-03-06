import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import { useFormik } from "formik";
import { ServiceForgotPassword } from '../../services/AuthServices';
import Toast from 'react-native-toast-message';
import { forgotFormSchema } from '../../validation';
import { setActivityIndicator } from '../../store/slices/appConfigSlice';
import AppStyle from '../../assets/styles/AppStyle';
import InputFieldBase from '../../components/Input/InputFieldBase';
import Button from '../../components/Button';
import HeaderWithBack from '../../components/Headers/HeaderWithBack';

const ForgotPassword = () => {
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
        initialValues: { email: '' },
        onSubmit: (values) => {
            console.log({ values });
            dispatch(setActivityIndicator(true));
            ServiceForgotPassword(values).then(response => {
                console.log({ response });
                dispatch(setActivityIndicator(false));
                Toast.show({
                    type: 'info',
                    text1: 'Success',
                    text2: response?.message,
                });
                navigation.navigate('ResetPasswordWithCode', { email: values.email });
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
        validationSchema: forgotFormSchema,
    });

    const otherProps = { values, errors, touched, setFieldValue, setFieldTouched, handleBlur };

    return (
        <View style={{ flex: 1, backgroundColor: AppStyle.colorSet.BGColor }}>
            <HeaderWithBack title={'Verify Email'} />

            <View style={{ marginHorizontal: 16, marginVertical: 16 }}>
                <InputFieldBase
                    otherProps={otherProps}
                    title={'Email'}
                    name={'email'}
                    placeholder={'Email'}
                />
            </View>

            <View style={AppStyle.buttonContainerBottom}>
                <Button text={'Check'} fill={true} handleClick={handleSubmit} />
            </View>
        </View>
    )
}

export default ForgotPassword

const styles = StyleSheet.create({})