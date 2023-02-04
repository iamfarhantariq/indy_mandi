import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import AppStyle from '../../assets/styles/AppStyle'
import HeaderWithBack from '../../components/Headers/HeaderWithBack'
import InputFieldBase from '../../components/Input/InputFieldBase'
import { useState } from 'react'
import Button from '../../components/Button'
import { useNavigation } from '@react-navigation/native'

const CreateWishList = () => {
    const navigation = useNavigation();
    const [name, setName] = useState('');

    return (
        <View style={{ flex: 1, backgroundColor: AppStyle.colorSet.BGColor }}>
            <HeaderWithBack title={'Create wish list'} cross={true} />
            <View style={{ marginHorizontal: 16, marginVertical: 16 }}>
                <InputFieldBase
                    title={'Name'}
                    placeholder={'Name'}
                    value={name}
                    onTextChange={(t) => setName(t)}
                />
            </View>

            <View style={AppStyle.buttonContainerBottom}>
                <Button text={'Save'} fill={true} handleClick={() => navigation.pop()} />
            </View>
        </View>
    )
}

export default CreateWishList

const styles = StyleSheet.create({})