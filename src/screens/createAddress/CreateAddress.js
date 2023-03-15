import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import AppStyle from '../../assets/styles/AppStyle'
import Button from '../../components/Button'
import { useNavigation } from '@react-navigation/native'
import HeaderWithBack from '../../components/Headers/HeaderWithBack'
import InputFieldBase from '../../components/Input/InputFieldBase'
import { useFormik } from 'formik'
import { PostPutStoreAddress } from '../../services/AppService'
import { setActivityIndicator } from '../../store/slices/appConfigSlice'
import { useDispatch } from 'react-redux'
import Toast from 'react-native-toast-message';
import { showToastHandler } from '../../helpers/common'
import { storeAddressSchema } from '../../validation'

const CreateAddress = ({ route }) => {
    const params = route?.params;
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
        initialValues: {
            type: params?.addressData?.type || '',
            address: params?.addressData?.address || '',
        },
        onSubmit: (values) => {
            dispatch(setActivityIndicator(true));
            PostPutStoreAddress(values, params?.addressData?.id).then(async (response) => {
                console.log({ response });
                dispatch(setActivityIndicator(false));
                Toast.show({
                    type: 'success',
                    text1: 'Success',
                    text2: response?.message,
                });
                handleReset();
                navigation.pop();
            }).catch(e => {
                showToastHandler(e, dispatch);
            });
        },
        validationSchema: storeAddressSchema,
    });

    const otherProps = { values, errors, touched, setFieldValue, setFieldTouched, handleBlur };


    return (
        <View style={{ flex: 1, backgroundColor: AppStyle.colorSet.BGColor }}>
            <HeaderWithBack title={params?.addressData ? 'Edit address' : 'Create address'} cross={true} />

            <View style={{ marginHorizontal: 16, marginTop: 16 }}>
                <InputFieldBase
                    otherProps={otherProps}
                    title={'Type'}
                    placeholder={'Home, Office'}
                    name='type'
                />

                <InputFieldBase
                    otherProps={otherProps}
                    title={'Address'}
                    placeholder={'123/A, Street ...'}
                    numberOfLines={4}
                    name='address'
                />
            </View>

            <View style={AppStyle.buttonContainerBottom}>
                <Button text={'Save'} fill={true} handleClick={handleSubmit} />
            </View>
        </View>
    )
}

export default CreateAddress

const styles = StyleSheet.create({})