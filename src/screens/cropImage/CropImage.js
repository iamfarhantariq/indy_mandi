import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import AppStyle from '../../assets/styles/AppStyle'
import HeaderWithBack from '../../components/Headers/HeaderWithBack'
import Button from '../../components/Button'
import { useNavigation } from '@react-navigation/native'

const CropImage = () => {
    const navigation = useNavigation();

    return (
        <View style={{ flex: 1, backgroundColor: AppStyle.colorSet.BGColor }}>
            <HeaderWithBack title={'Crop Image'} cross={true} />

            <View style={AppStyle.buttonContainerBottom}>
                <Button text={'Crop'} fill={true} handleClick={() => navigation.navigate('PaymentScreen')} />
            </View>
        </View>
    )
}

export default CropImage

const styles = StyleSheet.create({})