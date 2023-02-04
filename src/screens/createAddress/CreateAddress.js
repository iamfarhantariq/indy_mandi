import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import AppStyle from '../../assets/styles/AppStyle'
import Button from '../../components/Button'
import { useNavigation } from '@react-navigation/native'
import HeaderWithBack from '../../components/Headers/HeaderWithBack'
import InputFieldBase from '../../components/Input/InputFieldBase'
import { useState } from 'react'

const CreateAddress = () => {
    const navigation = useNavigation();
    const [type, setType] = useState('');
    const [address, setAddress] = useState('')

    return (
        <View style={{ flex: 1, backgroundColor: AppStyle.colorSet.BGColor }}>
            <HeaderWithBack title={'Create address'} cross={true} />

            <View style={{ marginHorizontal: 16, marginTop: 16 }}>
                <InputFieldBase
                    title={'Type'}
                    placeholder={'Home, Office'}
                    value={type}
                    onTextChange={(t) => setType(t)}
                />

                <InputFieldBase
                    title={'Address'}
                    placeholder={'123/A, Street ...'}
                    value={address}
                    numberOfLines={4}
                    onTextChange={(t) => setAddress(t)}
                />
            </View>

            <View style={AppStyle.buttonContainerBottom}>
                <Button text={'Save'} fill={true} handleClick={() => navigation.pop()} />
            </View>
        </View>
    )
}

export default CreateAddress

const styles = StyleSheet.create({})