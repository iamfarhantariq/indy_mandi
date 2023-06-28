import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useState } from 'react';
import AppStyle from '../../assets/styles/AppStyle';
import HeaderWithBack from '../../components/Headers/HeaderWithBack';
import HeadingAndDescription from '../../components/Store/HeadingAndDescription';
import InputFieldBase from '../../components/Input/InputFieldBase';
import Button from '../../components/Button';
import UploadImages from '../../components/Input/UploadImages';
import { useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { useFormik } from 'formik';
import Toast from 'react-native-toast-message';
import { convertToFormDataObject, showToastHandler } from '../../helpers/common';
import { setActivityIndicator } from '../../store/slices/appConfigSlice';
import { ServicePostRaiseDispute } from '../../services/IndyViewService';
import { storeRaiseDispute } from '../../validation';

const RaiseDispute = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

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
      phone: '',
      description: '',
      disputefile: null,
    },
    onSubmit: (values) => {
      console.log({ values });

      // if (!values.disputefile) {
      //   return Toast.show({
      //     type: 'error',
      //     text1: 'Required',
      //     text2: 'Image required',
      //   });
      // }

      const formData = convertToFormDataObject(values);
      console.log({ formData });
      dispatch(setActivityIndicator(true));
      ServicePostRaiseDispute(formData).then(async (response) => {
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
    validationSchema: storeRaiseDispute,
  });

  const otherProps = { values, errors, touched, setFieldValue, setFieldTouched, handleBlur };

  return (
    <View style={{ flex: 1, backgroundColor: AppStyle.colorSet.BGColor }}>
      <HeaderWithBack title={'Raise a dispute'} />
      <View style={{ marginTop: 16 }}>
        <HeadingAndDescription heading={'Need Help? Get in touch with us'} />
      </View>

      <ScrollView style={{ marginHorizontal: 16 }} showsVerticalScrollIndicator={false}>
        <InputFieldBase
          otherProps={otherProps}
          title={'Phone'}
          placeholder={'Phone'}
          name='phone'
        />

        <View style={{ marginVertical: 16 }}>
          <UploadImages getImage={(blobfile) => setFieldValue('disputefile', blobfile)} />
        </View>

        <InputFieldBase
          otherProps={otherProps}
          title={'Write description'}
          placeholder={'Write description'}
          numberOfLines={4}
          name='description'
        />
        <View style={{ marginVertical: 16 }}>
          <Button text={'Submit'} handleClick={handleSubmit} fill={true} />
        </View>
      </ScrollView>
    </View>
  )
}

export default RaiseDispute

const styles = StyleSheet.create({})