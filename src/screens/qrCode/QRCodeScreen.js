import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import AppStyle from '../../assets/styles/AppStyle'
import HeaderWithBack from '../../components/Headers/HeaderWithBack'
import AppConfig from '../../helpers/config';
import QRCode from 'react-native-qrcode-svg';

const QRCodeScreen = ({ route }) => {
    const params = route?.params;
    
    return (
        <View style={{ backgroundColor: AppStyle.colorSet.BGColor, flex: 1 }}>
            <HeaderWithBack title={'QR Code'} />

            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'flex-start', marginVertical: 16 }}>
                {params?.QR_Code &&
                    <QRCode
                        value={params?.QR_Code}
                        size={AppConfig.screenWidth - 160}
                    />
                }
            </View>
        </View>
    )
}

export default QRCodeScreen;

const styles = StyleSheet.create({})