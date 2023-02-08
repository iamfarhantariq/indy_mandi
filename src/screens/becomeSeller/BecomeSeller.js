import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import AppStyle from '../../assets/styles/AppStyle'
import InputFieldBase from '../../components/Input/InputFieldBase'
import HeaderWithBack from '../../components/Headers/HeaderWithBack'
import Button from '../../components/Button'
import { useNavigation } from '@react-navigation/native'
import { useState } from 'react'

const BecomeSeller = () => {
    const navigation = useNavigation();
const [storeName, setStoreName] = useState('');
    return (
        <View style={{ flex: 1, backgroundColor: AppStyle.colorSet.BGColor }}>
            <HeaderWithBack title={'Become a seller'} cross={true} />
            <View style={{ marginHorizontal: 16, marginVertical: 16 }}>
                <InputFieldBase
                    title={'Store Name'}
                    placeholder={'Store Name'}
                    value={storeName}
                    onTextChange={(t) => setStoreName(t)}
                />
            </View>

            <View style={AppStyle.buttonContainerBottom}>
                <Button text={'Next'} fill={true} handleClick={() => navigation.pop()} />
            </View>
        </View>
    )
}

export default BecomeSeller

const styles = StyleSheet.create({})