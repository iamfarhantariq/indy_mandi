import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import InputFieldBase from '../Input/InputFieldBase'
import { useState } from 'react';
import Button from '../Button';
import { useNavigation } from '@react-navigation/native';

const Register = ({ setView }) => {
  const navigation = useNavigation();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [cPassword, setCPassword] = useState('');

  return (
    <View style={{ flex: 1, marginTop: 26, marginHorizontal: 16 }}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <InputFieldBase
          title={'Name'}
          placeholder={'Name'}
          value={name}
          onTextChange={(t) => setName(t)}
        />
        <InputFieldBase
          title={'Email'}
          placeholder={'Email'}
          value={email}
          onTextChange={(t) => setEmail(t)}
        />
        <InputFieldBase
          title={'Phone'}
          placeholder={'Phone'}
          value={phone}
          onTextChange={(t) => setPhone(t)}
        />
        <InputFieldBase
          title={'Password'}
          placeholder={'Password'}
          value={password}
          onTextChange={(t) => setPassword(t)}
          secure={true}
        />
        <InputFieldBase
          title={'Confirm Password'}
          placeholder={'Confirm Password'}
          value={cPassword}
          onTextChange={(t) => setCPassword(t)}
          secure={true}
        />

        <View style={{ marginVertical: 16 }}>
          <Button text={'Register new account'} handleClick={() => null} fill={true} />
        </View>

        <View style={{ marginVertical: 16 }}>
          <Button text={'Sign In'} handleClick={() => setView('login')} />
        </View>

        <View style={{ marginVertical: 16 }}>
          <Button text={'Demo Contact US'} handleClick={() => navigation.navigate('ContactUs')} />
        </View>

        <View style={{ marginVertical: 16 }}>
          <Button text={'About, Careers, Terms, Privacy'} handleClick={() => navigation.navigate('RenderContentScreen')} />
        </View>

      </ScrollView>
    </View>
  )
}

export default Register

const styles = StyleSheet.create({})