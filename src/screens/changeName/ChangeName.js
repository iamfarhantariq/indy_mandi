import { StyleSheet, View } from 'react-native'
import React from 'react'
import HeaderWithBack from '../../components/Headers/HeaderWithBack';
import AppStyle from '../../assets/styles/AppStyle';
import InputFieldBase from '../../components/Input/InputFieldBase';
import Button from '../../components/Button';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { getLoginConfig } from '../../store/slices/loginConfigSlice';
import { useFormik } from 'formik';
import { setActivityIndicator } from '../../store/slices/appConfigSlice';
import { ServiceUserChangeName } from '../../services/AuthServices';
import { showToastHandler, UpdatedUserInTheApp } from '../../helpers/common';
import { updateUserNameFormSchema } from '../../validation';
import Toast from 'react-native-toast-message';

const ChangeName = () => {
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
        initialValues: { name: user?.name || "", mobile: user?.mobile || "" },
        onSubmit: (values) => {
            console.log({ values });
            dispatch(setActivityIndicator(true));
            ServiceUserChangeName(values).then(async (response) => {
                console.log({ response });
                dispatch(setActivityIndicator(false));
                await UpdatedUserInTheApp(dispatch);
                handleReset();
                Toast.show({
                    type: 'success',
                    text1: 'Success',
                    text2: 'Updated',
                });
                navigation.pop();
            }).catch(e => {
                showToastHandler(e, dispatch);
            });
        },
        validationSchema: updateUserNameFormSchema,
    });

    const otherProps = { values, errors, touched, setFieldValue, setFieldTouched, handleBlur };

    return (
        <View style={{ flex: 1, backgroundColor: AppStyle.colorSet.BGColor }}>
            <HeaderWithBack title={'Update Profile'} />

            <View style={{ marginHorizontal: 16, marginVertical: 16 }}>
                <InputFieldBase
                    otherProps={otherProps}
                    title={'Name'}
                    placeholder={'Customer'}
                    name='name'
                />
                <InputFieldBase
                    otherProps={otherProps}
                    title={'Mobile'}
                    placeholder={'Mobile'}
                    name='mobile'
                />
            </View>

            <View style={AppStyle.buttonContainerBottom}>
                <Button text={'Save'} fill={true} handleClick={handleSubmit} />
            </View>
        </View>
    )
}

export default ChangeName

const styles = StyleSheet.create({})