import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useState } from 'react';
import AppStyle from '../../assets/styles/AppStyle';
import HeaderWithBack from '../../components/Headers/HeaderWithBack';
import HeadingAndDescription from '../../components/Store/HeadingAndDescription';
import InputFieldBase from '../../components/Input/InputFieldBase';
import Button from '../../components/Button';
import UploadImages from '../../components/Input/UploadImages';

const RaiseDispute = () => {
  const [phone, setPhone] = useState('');
  const [description, setDescription] = useState('');

  return (
    <View style={{ flex: 1, backgroundColor: AppStyle.colorSet.BGColor }}>
      <HeaderWithBack title={'Raise a dispute'} />
      <View style={{ marginTop: 16 }}>
        <HeadingAndDescription heading={'Need Help? Get in touch with us'} />
      </View>

      <ScrollView style={{ marginHorizontal: 16 }} showsVerticalScrollIndicator={false}>
        <InputFieldBase
          title={'Phone'}
          placeholder={'Phone'}
          value={phone}
          onTextChange={(t) => setPhone(t)}
        />

        <View style={{ marginVertical: 16 }}>
          <UploadImages />
        </View>

        <InputFieldBase
          title={'Write description'}
          placeholder={'Write description'}
          value={description}
          numberOfLines={4}
          onTextChange={(t) => setDescription(t)}
        />
        <View style={{ marginVertical: 16 }}>
          <Button text={'Submit'} handleClick={() => null} fill={true} />
        </View>
      </ScrollView>
    </View>
  )
}

export default RaiseDispute

const styles = StyleSheet.create({})