import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import AppStyle from '../../assets/styles/AppStyle'
import HeaderWithBack from '../../components/Headers/HeaderWithBack'
import InputFieldBase from '../../components/Input/InputFieldBase'
import { useNavigation } from '@react-navigation/native'
import { useDispatch } from 'react-redux'
import { useFormik } from "formik";
import { setActivityIndicator } from '../../store/slices/appConfigSlice'
import { ServiceVerifyEmail } from '../../services/AuthServices'
import { verifyEmailSchema } from '../../validation'
import Button from '../../components/Button'
import Toast from 'react-native-toast-message';
import { setIsAuthorized, setIsLogin } from '../../store/slices/loginConfigSlice'

const VerifyEmail = ({ route }) => {
    const { user } = route.params;
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
        initialValues: { email: user?.email, pincode: "" },
        onSubmit: (values) => {
            console.log({ values });
            dispatch(setActivityIndicator(true));
            ServiceVerifyEmail(values).then(response => {
                console.log({ response });
                dispatch(setActivityIndicator(false));
                dispatch(setIsLogin(true));
                dispatch(setIsAuthorized(true));
                navigation.reset({
                    index: 0,
                    routes: [{ name: 'UserScreen' }]
                });
                navigation.navigate('HomeScreen');
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
        validationSchema: verifyEmailSchema,
    });

    const otherProps = { values, errors, touched, setFieldValue, setFieldTouched, handleBlur };

    return (
        <View style={{ flex: 1, backgroundColor: AppStyle.colorSet.BGColor }}>
            <HeaderWithBack title={'Verify Email'} shouldBack={false} />

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
                    name={'pincode'}
                    placeholder={'Pin Code'}
                />
            </View>

            <View style={AppStyle.buttonContainerBottom}>
                <Button text={'Save'} fill={true} handleClick={handleSubmit} />
            </View>
        </View>
    )
}

export default VerifyEmail

const styles = StyleSheet.create({})