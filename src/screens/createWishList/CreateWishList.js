import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import AppStyle from '../../assets/styles/AppStyle'
import HeaderWithBack from '../../components/Headers/HeaderWithBack'
import InputFieldBase from '../../components/Input/InputFieldBase'
import { useState } from 'react'
import Button from '../../components/Button'
import { useNavigation } from '@react-navigation/native'
import { useDispatch } from 'react-redux'
import { useFormik } from 'formik'
import { setActivityIndicator } from '../../store/slices/appConfigSlice'
import { ServicePostPutWishList } from '../../services/AppService'
import Toast from 'react-native-toast-message';
import { storeWishListSchema } from '../../validation'
import { showToastHandler } from '../../helpers/common'

const CreateWishList = ({ route }) => {
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
            type: params?.wishListData?.name || ''
        },
        onSubmit: (values) => {
            dispatch(setActivityIndicator(true));
            ServicePostPutWishList(values, params?.wishListData?.id).then(async (response) => {
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
        validationSchema: storeWishListSchema,
    });

    const otherProps = { values, errors, touched, setFieldValue, setFieldTouched, handleBlur };

    return (
        <View style={{ flex: 1, backgroundColor: AppStyle.colorSet.BGColor }}>
            <HeaderWithBack title={'Create wish list'} cross={true} />
            <View style={{ marginHorizontal: 16, marginVertical: 16 }}>
                <InputFieldBase
                    otherProps={otherProps}
                    title={'Name'}
                    placeholder={'Name'}
                    name='name'
                />
            </View>

            <View style={AppStyle.buttonContainerBottom}>
                <Button text={'Save'} fill={true} handleClick={handleSubmit} />
            </View>
        </View>
    )
}

export default CreateWishList

const styles = StyleSheet.create({})