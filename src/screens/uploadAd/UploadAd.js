import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import AppStyle from '../../assets/styles/AppStyle'
import HeaderWithBack from '../../components/Headers/HeaderWithBack'
import UploadImages from '../../components/Input/UploadImages'
import InputFieldBase from '../../components/Input/InputFieldBase'
import Button from '../../components/Button'
import { useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import { useFormik } from 'formik'
import { useDispatch, useSelector } from 'react-redux'
import { getLoginConfig } from '../../store/slices/loginConfigSlice'
import { createIndyViewFormSchema } from '../../validation'
import { ServiceStoreIndyView } from '../../services/IndyViewService'
import Toast from 'react-native-toast-message';
import { convertToFormDataObject, showToastHandler } from '../../helpers/common'
import { setActivityIndicator, setCountryStates } from '../../store/slices/appConfigSlice'
import { GetCountryStates } from '../../services/AppService'
import GetCountryState from '../../components/GetCountryState'

const UploadAd = ({ route }) => {
    const { slot } = route.params;
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const loginConfig = useSelector(getLoginConfig);

    useEffect(() => {
        getCountryStates();
    }, []);

    const getCountryStates = () => {
        GetCountryStates().then((response) => {
            console.log({ response });
            dispatch(setCountryStates(response?.data));
        }).catch(e => {
            showToastHandler(e);
        });
    }

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
            start_date: slot?.submit_start_date,
            end_date: slot?.submit_end_date,
            image: null,
            name: loginConfig?.user?.name,
            gstin: '',
            coupon: '64079d4eb92cf',
            address: '',
            state: '',
            store_name: '',
            redirect_url: '',
        },
        onSubmit: (values) => {
            console.log({ values });

            if (!values.image) {
                return Toast.show({
                    type: 'error',
                    text1: 'Required',
                    text2: 'Image required',
                });
            }

            const formData = convertToFormDataObject(values);
            console.log({ formData });
            dispatch(setActivityIndicator(true));
            ServiceStoreIndyView(formData).then(async (response) => {
                console.log({ response });
                dispatch(setActivityIndicator(false));
                Toast.show({
                    type: 'success',
                    text1: 'Success',
                    text2: response?.message,
                });
                handleReset();
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
        validationSchema: createIndyViewFormSchema,
    });

    const otherProps = { values, errors, touched, setFieldValue, setFieldTouched, handleBlur };

    return (
        <View style={{ flex: 1, backgroundColor: AppStyle.colorSet.BGColor }}>
            <HeaderWithBack title={'Upload your ad'} cross={true} />

            <ScrollView style={{ flex: 1 }} nestedScrollEnabled showsVerticalScrollIndicator={false}>
                <View style={{ flex: 1, marginHorizontal: 16, paddingBottom: 108 }}>
                    <View style={{ marginVertical: 16, height: 176 }}>
                        <UploadImages getImage={(blobfile) => setFieldValue('image', blobfile)} />
                    </View>

                    <InputFieldBase
                        otherProps={otherProps}
                        title={'GSTIN (Optional)'}
                        placeholder={'GSTIN (Optional)'}
                        name='gstin'
                    />
                    <InputFieldBase
                        otherProps={otherProps}
                        title={'Coupon'}
                        placeholder={'Coupon'}
                        name='coupon'
                    />
                    <InputFieldBase
                        otherProps={otherProps}
                        title={'Address'}
                        placeholder={'Address'}
                        name='address'
                    />
                    <GetCountryState
                        otherProps={otherProps}
                        placeholder={'State'}
                        name='state'
                    />
                    <InputFieldBase
                        otherProps={otherProps}
                        title={'Store Name'}
                        placeholder={'Store Name'}
                        name='store_name'
                    />
                    <InputFieldBase
                        otherProps={otherProps}
                        title={'Redirect Url'}
                        placeholder={'Redirect Url'}
                        name='redirect_url'
                    />

                </View>
            </ScrollView>

            <View style={AppStyle.buttonContainerBottom}>
                <Button text={'Next'} fill={true} handleClick={handleSubmit} />
            </View>
        </View>
    )
}

export default UploadAd

const styles = StyleSheet.create({})