import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import AppStyle from '../../assets/styles/AppStyle'
import HeaderWithBack from '../../components/Headers/HeaderWithBack'
import InputFieldBase from '../../components/Input/InputFieldBase'
import { useNavigation } from '@react-navigation/native'
import { useDispatch } from 'react-redux'
import { useFormik } from "formik";
import { setActivityIndicator } from '../../store/slices/appConfigSlice'
import { ServiceResetPasswordWithCode } from '../../services/AuthServices'
import { resetPasswordWithCodeFormSchema } from '../../validation'
import Button from '../../components/Button'
import Toast from 'react-native-toast-message';

const ResetPasswordWithCode = ({ route }) => {
    const { email } = route.params;
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
        initialValues: { email, token: '', password: '', password_confirmation: '' },
        onSubmit: (values) => {
            console.log({ values });
            dispatch(setActivityIndicator(true));
            ServiceResetPasswordWithCode(values).then(response => {
                console.log({ response });
                dispatch(setActivityIndicator(false));
                Toast.show({
                    type: 'info',
                    text1: 'Success',
                    text2: response?.message,
                });
                navigation.pop(2);
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
        validationSchema: resetPasswordWithCodeFormSchema,
    });

    const otherProps = { values, errors, touched, setFieldValue, setFieldTouched, handleBlur };

    return (
        <View style={{ flex: 1, backgroundColor: AppStyle.colorSet.BGColor }}>
            <HeaderWithBack title={'New Password'} />

            <View style={{ marginHorizontal: 16, marginVertical: 16 }}>
                <InputFieldBase
                    otherProps={otherProps}
                    title={'Email'}
                    name={'email'}
                    editable={false}
                    placeholder={'Email'}
                />
                <InputFieldBase
                    otherProps={otherProps}
                    title={'Pin Code'}
                    name={'token'}
                    placeholder={'Pin Code'}
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
            </View>

            <View style={AppStyle.buttonContainerBottom}>
                <Button text={'Change'} fill={true} handleClick={handleSubmit} />
            </View>
        </View>
    )
}

export default ResetPasswordWithCode

const styles = StyleSheet.create({})