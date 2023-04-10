import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { useNavigation } from '@react-navigation/native';
import AppStyle from '../../assets/styles/AppStyle';
import HeaderWithBack from '../../components/Headers/HeaderWithBack';
import InputFieldBase from '../../components/Input/InputFieldBase';
import UploadImages from '../../components/Input/UploadImages';
import Button from '../../components/Button';
import { useDispatch } from 'react-redux';
import { useFormik } from 'formik';
import Toast from 'react-native-toast-message';
import { convertToFormDataObject, showToastHandler } from '../../helpers/common';
import { setActivityIndicator } from '../../store/slices/appConfigSlice';
import { ServiceCreateCollection, ServiceUpdateCollection } from '../../services/AppService';
import { createCollectionSchema } from '../../validation';

const CreateCollection = ({ route }) => {
    const params = route?.params;
    const dispatch = useDispatch();
    const navigation = useNavigation();
    const [collection, setCollection] = useState(params?.collection);

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
            name: collection?.name || '',
            image: collection?.image || '',
        },
        onSubmit: (values) => {
            console.log({ values });

            // if (!values.image) {
            //     return Toast.show({
            //         type: 'error',
            //         text1: 'Required',
            //         text2: 'Image required',
            //     });
            // }

            // if (typeof values?.image === 'string' && values?.image?.includes('https://')) {
            //     delete values.image;
            // }

            const formData = convertToFormDataObject(values);
            console.log({ formData });
            dispatch(setActivityIndicator(true));
            if (params?.collection) {
                ServiceUpdateCollection(collection?.id, formData).then(async (response) => {
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
            } else {
                ServiceCreateCollection(formData).then(async (response) => {
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
            }
        },
        validationSchema: createCollectionSchema,
    });

    const otherProps = { values, errors, touched, setFieldValue, setFieldTouched, handleBlur };

    return (
        <View style={{ flex: 1, backgroundColor: AppStyle.colorSet.BGColor }}>
            <HeaderWithBack title={params?.collection ? 'Edit Collection' : 'Create Collection'} />
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={{ marginHorizontal: 16, marginVertical: 16 }}>

                    <View style={{ height: 343, marginBottom: 16 }}>
                        <UploadImages imageUrl={collection?.image} getImage={(blobfile) => {
                            if (blobfile) {
                                setFieldValue('image', blobfile);
                            } else {
                                setFieldValue('image', '');
                            }
                            if (collection) {
                                setCollection({ ...collection, image: '' });
                            }
                        }} />
                    </View>

                    <InputFieldBase
                        otherProps={otherProps}
                        title={'Collection name'}
                        placeholder={'Collection name'}
                        name='name'
                    />
                </View>
            </ScrollView>

            <View style={AppStyle.buttonContainerBottom}>
                <Button text={params?.collection ? 'Update' : 'Create'} fill={true} handleClick={handleSubmit} />
            </View>
        </View>
    )
}

export default CreateCollection

const styles = StyleSheet.create({})