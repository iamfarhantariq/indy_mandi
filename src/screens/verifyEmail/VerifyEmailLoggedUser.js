import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import AppStyle from '../../assets/styles/AppStyle'
import HeaderWithBack from '../../components/Headers/HeaderWithBack'
import InputFieldBase from '../../components/Input/InputFieldBase'
import { useNavigation } from '@react-navigation/native'
import { useDispatch } from 'react-redux'
import { useFormik } from "formik";
import { setActivityIndicator } from '../../store/slices/appConfigSlice'
import { ServiceUserEmailVerifyNew } from '../../services/AuthServices'
import { verifyEmailSchema } from '../../validation'
import Button from '../../components/Button'
import Toast from 'react-native-toast-message';
import { showToastHandler, UpdatedUserInTheApp } from '../../helpers/common'

const VerifyEmailLoggedUser = ({ route }) => {
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
        initialValues: { email: email, pincode: "" },
        onSubmit: (values) => {
            console.log({ values });
            dispatch(setActivityIndicator(true));
            ServiceUserEmailVerifyNew(values).then(async response => {
                console.log({ response });
                await UpdatedUserInTheApp(dispatch);
                handleReset();
                Toast.show({
                    type: 'success',
                    text1: 'Success',
                    text2: 'Updated',
                });
                navigation.pop(2);
                dispatch(setActivityIndicator(false));
            }).catch(e => {
                showToastHandler(e, dispatch);
            });
        },
        validationSchema: verifyEmailSchema,
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
                <Button text={'Update'} fill={true} handleClick={handleSubmit} />
            </View>
        </View>
    )
}

export default VerifyEmailLoggedUser

const styles = StyleSheet.create({})