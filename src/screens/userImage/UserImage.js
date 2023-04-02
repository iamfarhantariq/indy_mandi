import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import AppStyle from '../../assets/styles/AppStyle'
import HeaderWithBack from '../../components/Headers/HeaderWithBack'
import UploadImages from '../../components/Input/UploadImages'
import { useFormik } from 'formik'
import { useNavigation } from '@react-navigation/native'
import { useDispatch } from 'react-redux'
import { ServiceUserChangeImage } from '../../services/AuthServices'
import { convertToFormDataObject, showToastHandler, UpdatedUserInTheApp } from '../../helpers/common';
import Toast from 'react-native-toast-message';
import { setActivityIndicator } from '../../store/slices/appConfigSlice'
import AppConfig from '../../helpers/config'
import Button from '../../components/Button'

const UserImage = ({ route }) => {
    const params = route.params;
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
        initialValues: { image: null },
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
            ServiceUserChangeImage(formData).then(async (response) => {
                console.log({ response });
                await UpdatedUserInTheApp(dispatch);
                dispatch(setActivityIndicator(false));
                Toast.show({
                    type: 'success',
                    text1: 'Success',
                    text2: response?.data?.message,
                });
                navigation.pop();
            }).catch(e => {
                showToastHandler(e, dispatch);
            });
        },
    });

    return (
        <View style={{ flex: 1, backgroundColor: AppStyle.colorSet.BGColor }}>
            <HeaderWithBack title={'Profile Image'} cross={true} />
            <View style={{ margin: 16, height: AppConfig.screenWidth - 32, width: AppConfig.screenWidth - 32 }}>
                <UploadImages getImage={(blobfile) => setFieldValue('image', blobfile)} />
            </View>
            <View style={AppStyle.buttonContainerBottom}>
                <Button text={'Save Changes'} fill={true} handleClick={handleSubmit} />
            </View>
        </View>
    )
}

export default UserImage

const styles = StyleSheet.create({})