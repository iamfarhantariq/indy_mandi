import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import AppStyle from '../../assets/styles/AppStyle'
import HeaderWithBack from '../../components/Headers/HeaderWithBack'
import UploadImages from '../../components/Input/UploadImages'
import InputFieldBase from '../../components/Input/InputFieldBase'
import Button from '../../components/Button'
import { useState } from 'react'
import { useNavigation } from '@react-navigation/native'

const UploadAd = () => {
    const navigation = useNavigation();
    const [gstin, setGstin] = useState('');
    const [coupen, setCoupen] = useState('');
    const [address, setAddress] = useState('');
    const [state, setState] = useState('');
    const [storeName, setStoreName] = useState('');
    const [redirectUrl, setRedirectUrl] = useState('');

    return (
        <View style={{ flex: 1, backgroundColor: AppStyle.colorSet.BGColor }}>
            <HeaderWithBack title={'Upload your ad'} cross={true} />

            <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
                <View style={{ flex: 1, marginHorizontal: 16, paddingBottom: 108 }}>
                    <View style={{ marginVertical: 16, height: 176 }}>
                        <UploadImages />
                    </View>

                    <InputFieldBase
                        title={'GSTIN (Optional)'}
                        placeholder={'GSTIN (Optional)'}
                        value={gstin}
                        onTextChange={(t) => setGstin(t)}
                    />
                    <InputFieldBase
                        title={'Coupon'}
                        placeholder={'Coupon'}
                        value={coupen}
                        onTextChange={(t) => setCoupen(t)}
                    />
                    <InputFieldBase
                        title={'Address'}
                        placeholder={'Address'}
                        value={address}
                        onTextChange={(t) => setAddress(t)}
                    />
                    <InputFieldBase
                        title={'State'}
                        placeholder={'State'}
                        value={state}
                        onTextChange={(t) => setState(t)}
                    />
                    <InputFieldBase
                        title={'Store Name'}
                        placeholder={'Store Name'}
                        value={storeName}
                        onTextChange={(t) => setStoreName(t)}
                    />
                    <InputFieldBase
                        title={'Redirect Url'}
                        placeholder={'Redirect Url'}
                        value={redirectUrl}
                        onTextChange={(t) => setRedirectUrl(t)}
                    />

                </View>
            </ScrollView>

            <View style={AppStyle.buttonContainerBottom}>
                <Button text={'Next'} fill={true} handleClick={() => navigation.navigate('CropImage')} />
            </View>
        </View>
    )
}

export default UploadAd

const styles = StyleSheet.create({})