import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import AppStyle from '../../assets/styles/AppStyle'
import InputFieldBase from '../../components/Input/InputFieldBase'
import { useNavigation } from '@react-navigation/native'
import { useState } from 'react'
import Button from '../../components/Button'
import HeaderWithBack from '../../components/Headers/HeaderWithBack'
import { useDispatch } from 'react-redux'
import { useFormik } from 'formik'
import { ServiceUserChangePassword } from '../../services/AuthServices'
import { setActivityIndicator } from '../../store/slices/appConfigSlice';
import Toast from 'react-native-toast-message';
import { showToastHandler } from '../../helpers/common'
import { updatePasswordFormSchema } from '../../validation'

const ResetPassword = () => {
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
        initialValues: { new_password: '', new_confirm_password: '', current_password: '' },
        onSubmit: (values) => {
            console.log({ values });
            dispatch(setActivityIndicator(true));
            ServiceUserChangePassword(values).then(response => {
                console.log({ response });
                dispatch(setActivityIndicator(false));
                Toast.show({
                    type: 'info',
                    text1: 'Success',
                    text2: response?.message,
                });
                handleReset();
                navigation.pop();
            }).catch(e => {
                showToastHandler(e, dispatch);
            });
        },
        validationSchema: updatePasswordFormSchema,
    });

    const otherProps = { values, errors, touched, setFieldValue, setFieldTouched, handleBlur };

    return (
        <View style={{ flex: 1, backgroundColor: AppStyle.colorSet.BGColor }}>
            <HeaderWithBack title={'Reset Password'} />

            <View style={{ marginHorizontal: 16, marginVertical: 16 }}>
                <InputFieldBase
                    otherProps={otherProps}
                    title={'New Password'}
                    placeholder={'New Password'}
                    name='new_password'
                    secure={true}
                />
                <InputFieldBase
                    otherProps={otherProps}
                    title={'Confirm Password'}
                    placeholder={'Confirm Password'}
                    name='new_confirm_password'
                    secure={true}
                />
                <InputFieldBase
                    otherProps={otherProps}
                    title={'Current Password'}
                    placeholder={'Current Password'}
                    name='current_password'
                    secure={true}
                />
            </View>

            <View style={AppStyle.buttonContainerBottom}>
                <Button text={'Save'} fill={true} handleClick={handleSubmit} />
            </View>
        </View>
    )
}

export default ResetPassword

const styles = StyleSheet.create({})