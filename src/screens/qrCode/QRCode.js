import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import AppStyle from '../../assets/styles/AppStyle'
import HeaderWithBack from '../../components/Headers/HeaderWithBack'
import AppConfig from '../../helpers/config'

const QRCode = ({ route }) => {
    const params = route?.params;

    console.log(params?.QR_Code);
    return (
        <View style={{ backgroundColor: AppStyle.colorSet.BGColor, flex: 1 }}>
            <HeaderWithBack title={'QR Code'} />

            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Image
                    source={{ uri: params?.QR_Code }}
                    resizeMode='cover'
                    style={{ height: AppConfig.screenWidth - 40, width: AppConfig.screenWidth - 40 }} />
            </View>
        </View>
    )
}

export default QRCode;

const styles = StyleSheet.create({})