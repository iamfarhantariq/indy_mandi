import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import AppStyle from '../../assets/styles/AppStyle'
import InputFieldBase from '../../components/Input/InputFieldBase'
import HeaderWithBack from '../../components/Headers/HeaderWithBack'
import Button from '../../components/Button'
import { useNavigation } from '@react-navigation/native'
import { useState } from 'react'
import { commonStyle } from '../../helpers/common'
import GreenTick from '../../assets/images/green-tick.svg';
import UploadImages from '../../components/Input/UploadImages'
import UploadIcon from '../../assets/images/add-images.svg';

const BecomeSeller = () => {
    const navigation = useNavigation();
    const [storeName, setStoreName] = useState('');
    const [description, setDescription] = useState('');
    const [address, setAddress] = useState('');
    const [stateText, setStateText] = useState('');
    const [GSTIN, setGSTIN] = useState('');
    const [coupon, setCoupon] = useState('');
    const [sellerName, setSellerName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [contact, setContact] = useState('');
    const [couponCode, setCouponCode] = useState('');

    return (
        <View style={{ flex: 1, backgroundColor: AppStyle.colorSet.BGColor }}>
            <HeaderWithBack title={'Become a seller'} cross={true} />
            <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
                <View style={{ marginHorizontal: 16, flex: 1, paddingBottom: 108 }}>

                    <View style={{ width: '100%', marginVertical: 16 }}>
                        <Text style={styles.middleText}>Store Details</Text>
                    </View>

                    <InputFieldBase
                        title={'Store Name'}
                        placeholder={'Store Name'}
                        value={storeName}
                        onTextChange={(t) => setStoreName(t)}
                    />

                    {['Between 4-20 characters', 'No special characters, spaces, or accented letters'].map((item, index) => {
                        return (
                            <View key={index} style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <GreenTick height={16} width={16} style={{ color: '#50CD8D' }} />
                                <Text style={styles.validateText}>{item}</Text>
                            </View>
                        )
                    })}

                    <View style={{ marginVertical: 16, height: 176 }}>
                        <UploadImages />
                    </View>

                    <InputFieldBase
                        title={'Description'}
                        placeholder={'Description'}
                        value={description}
                        numberOfLines={3}
                        onTextChange={(t) => setDescription(t)}
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
                        value={stateText}
                        onTextChange={(t) => setStateText(t)}
                    />

                    <InputFieldBase
                        title={'GSTIN (Optional)'}
                        placeholder={'GSTIN (Optional)'}
                        value={GSTIN}
                        onTextChange={(t) => setGSTIN(t)}
                    />

                    <InputFieldBase
                        title={'Coupon (Optional)'}
                        placeholder={'Coupon (Optional)'}
                        value={coupon}
                        onTextChange={(t) => setCoupon(t)}
                    />

                    <View style={{ width: '100%', marginTop: 24, marginBottom: 16 }}>
                        <Text style={styles.middleText}>Seller details</Text>
                    </View>

                    <InputFieldBase
                        title={'Seller name'}
                        placeholder={'Seller name'}
                        value={sellerName}
                        onTextChange={(t) => setSellerName(t)}
                    />

                    <InputFieldBase
                        title={'Email'}
                        placeholder={'Email'}
                        value={email}
                        onTextChange={(t) => setEmail(t)}
                    />

                    <InputFieldBase
                        title={'Password'}
                        placeholder={'Password'}
                        value={password}
                        secure={true}
                        onTextChange={(t) => setPassword(t)}
                    />

                    <InputFieldBase
                        title={'Contact'}
                        placeholder={'Contact'}
                        value={contact}
                        onTextChange={(t) => setContact(t)}
                    />

                    <View style={styles.idContainer}>
                        <UploadIcon />
                        <View>
                            <Text style={styles.proofText}>
                                Upload ID Proof (Driver's License, PAN card, Aadhar, Voter's ID)
                            </Text>
                        </View>
                    </View>

                    <InputFieldBase
                        title={'Coupon code'}
                        placeholder={'Have a coupon code? Apply here'}
                        value={couponCode}
                        onTextChange={(t) => setCouponCode(t)}
                    />

                </View>
            </ScrollView>

            <View style={AppStyle.buttonContainerBottom}>
                <Button text={'Next'} fill={true} handleClick={() => navigation.navigate('BuyPlan')} />
            </View>
        </View>
    )
}

export default BecomeSeller

const styles = StyleSheet.create({
    middleText: {
        ...commonStyle('600', 16, 'primaryColorA'),
        textAlign: 'center'
    },
    validateText: {
        ...commonStyle('300', 12, 'blackColor'),
        marginLeft: 8
    },
    idContainer: {
        borderRadius: 22,
        borderColor: AppStyle.colorSet.borderLightGrayColor,
        backgroundColor: AppStyle.colorSet.borderLightGrayColor + '70',
        borderWidth: 1,
        alignItems: 'center',
        marginBottom: 16,
        flexDirection: 'row',
        paddingVertical: 12,
        paddingLeft: 18.67,
    },
    proofText: {
        ...commonStyle('400', 14, 'primaryColorB'),
        paddingHorizontal: 18.67,
    }
})