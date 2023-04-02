import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';
import AppStyle from '../../assets/styles/AppStyle';
import HeaderWithBack from '../../components/Headers/HeaderWithBack';
import InputFieldBase from '../../components/Input/InputFieldBase';
import Button from '../../components/Button';
import { commonStyle, showToastHandler } from '../../helpers/common';
import { useDispatch, useSelector } from 'react-redux';
import { getLoginConfig } from '../../store/slices/loginConfigSlice';
import { useFormik } from 'formik';
import { setActivityIndicator } from '../../store/slices/appConfigSlice';
import { ServiceUserEmailChange } from '../../services/AuthServices';
import { forgotFormSchema } from '../../validation';
import Toast from 'react-native-toast-message';

const ChangeEmail = () => {
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const { user } = useSelector(getLoginConfig);

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
        initialValues: { email: "" },
        onSubmit: (values) => {
            console.log({ values });
            dispatch(setActivityIndicator(true));
            ServiceUserEmailChange(values).then(async (response) => {
                console.log({ response });
                dispatch(setActivityIndicator(false));
                Toast.show({
                    type: 'success',
                    text1: 'Success',
                    text2: response?.message,
                  });
                navigation.navigate('VerifyEmailLoggedUser', { email: values?.email });
                handleReset();
            }).catch(e => {
                showToastHandler(e, dispatch);
            });
        },
        validationSchema: forgotFormSchema,
    });

    const otherProps = { values, errors, touched, setFieldValue, setFieldTouched, handleBlur };

    return (
        <View style={{ flex: 1, backgroundColor: AppStyle.colorSet.BGColor }}>
            <HeaderWithBack title={'Update Profile'} />

            <View style={{ marginHorizontal: 16, marginVertical: 16 }}>
                <View style={{ flexDirection: 'row', marginBottom: 16 }}>
                    <View style={{ width: '40%' }}>
                        <Text style={styles.itemDetailText}>
                            Current email
                        </Text>
                    </View>
                    <View style={{ width: '60%' }}>
                        <Text style={styles.itemDetailTextR}>
                            {user?.email}
                        </Text>
                    </View>
                </View>

                <InputFieldBase
                    otherProps={otherProps}
                    title={'New email'}
                    placeholder={'Info@example.com'}
                    name='email'
                />
            </View>

            <View style={AppStyle.buttonContainerBottom}>
                <Button text={'Update'} fill={true} handleClick={handleSubmit} />
            </View>
        </View>
    )
}

export default ChangeEmail

const styles = StyleSheet.create({
    itemDetailText: {
        ...commonStyle('400', 14, 'textSecondary'),
        marginTop: 8,
    },
    itemDetailTextR: {
        ...commonStyle('400', 14, 'primaryColorA'),
        marginTop: 8,
    }
})