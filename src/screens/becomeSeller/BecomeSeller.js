import { ImageBackground, Platform, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect } from 'react'
import AppStyle from '../../assets/styles/AppStyle'
import InputFieldBase from '../../components/Input/InputFieldBase'
import HeaderWithBack from '../../components/Headers/HeaderWithBack'
import Button from '../../components/Button'
import { useNavigation } from '@react-navigation/native'
import { useState } from 'react'
import { commonStyle, convertToFormDataObject, showToastHandler } from '../../helpers/common'
import UploadIcon from '../../assets/images/add-images.svg';
import { useFormik } from 'formik'
import Toast from 'react-native-toast-message';
import { useDispatch, useSelector } from 'react-redux'
import { getLoginConfig } from '../../store/slices/loginConfigSlice'
import { becomeASellerAuthorizedFormSchema, becomeASellerGuestFormSchema } from '../../validation'
import { setActivityIndicator, setCountryStates } from '../../store/slices/appConfigSlice'
import { ServicePostBecomeASeller } from '../../services/IndyViewService'
import GetCountryState from '../../components/GetCountryState'
import { GetCountryStates } from '../../services/AppService';
import ImagePicker from 'react-native-image-crop-picker';

const BecomeSeller = () => {
    const dispatch = useDispatch();
    const navigation = useNavigation();
    const loginConfig = useSelector(getLoginConfig);
    const [cropedImage, setCropedImage] = useState(null);

    useEffect(() => {
        getCountryStates();
    }, []);

    const getCountryStates = () => {
        GetCountryStates().then((response) => {
            console.log({ response });
            dispatch(setCountryStates(response?.data));
        }).catch(e => {
            showToastHandler(e);
        });
    }

    const openGallery = async () => {
        ImagePicker.openPicker({
            width: 400,
            height: 400,
            cropping: true,
            mediaType: 'photo',
        }).then(async image => {
            console.log(image);
            const imageUri = Platform.OS === 'ios' ? image?.sourceURL : image?.path
            const mimeImage = {
                uri: imageUri,
                type: image?.mime,
                name: imageUri.split("/").pop(),
            }
            setCropedImage(image);
            setFieldValue('upload_adhar_no', mimeImage)
        }).catch(e => {
            console.log({ e });
        });
    }

    const {
        errors,
        touched,
        values,
        setFieldValue,
        setFieldTouched,
        handleBlur,
        handleSubmit,
        handleReset,
    } = useFormik({
        initialValues: {
            name: '',
            description: '',
            address: '',
            state: '',
            gstn: '',
            coupon: 'INDYEARLYBIRD',
            seller_name: '',
            email: '',
            password: '',
            mobile: '',
            upload_adhar_no: null
        },
        onSubmit: (values) => {
            console.log({ values });

            if (loginConfig?.isLogin) {
                delete values.email;
                delete values.password;
            }

            if (!values.upload_adhar_no) {
                return Toast.show({
                    type: 'error',
                    text1: 'Required',
                    text2: 'Adhar info required',
                });
            }

            const formData = convertToFormDataObject(values);
            console.log({ formData });

            dispatch(setActivityIndicator(true));
            ServicePostBecomeASeller(formData).then(async (response) => {
                console.log({ response });
                dispatch(setActivityIndicator(false));
                Toast.show({
                    type: 'success',
                    text1: 'Success',
                    text2: response?.message,
                });
                handleReset();
                navigation.pop();
            }).catch(e => {
                showToastHandler(e, dispatch);
            });
        },
        validationSchema: loginConfig?.isLogin ? becomeASellerAuthorizedFormSchema : becomeASellerGuestFormSchema,
    });

    const otherProps = { values, errors, touched, setFieldValue, setFieldTouched, handleBlur };


    return (
        <View style={{ flex: 1, backgroundColor: AppStyle.colorSet.BGColor }}>
            <HeaderWithBack title={'Become a seller'} cross={true} />
            <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
                <View style={{ marginHorizontal: 16, flex: 1, paddingBottom: 108 }}>

                    <View style={{ width: '100%', marginVertical: 16 }}>
                        <Text style={styles.middleText}>Store Details</Text>
                    </View>

                    <InputFieldBase
                        otherProps={otherProps}
                        title={'Store Name'}
                        placeholder={'Store Name'}
                        name='name'
                    />

                    {/* {['Between 4-20 characters', 'No special characters, spaces, or accented letters'].map((item, index) => {
                        return (
                            <View key={index} style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <GreenTick height={16} width={16} style={{ color: '#50CD8D' }} />
                                <Text style={styles.validateText}>{item}</Text>
                            </View>
                        )
                    })} */}

                    {/* <View style={{ marginVertical: 16, height: 176 }}>
                        <UploadImages />
                    </View> */}

                    <InputFieldBase
                        otherProps={otherProps}
                        title={'Description'}
                        placeholder={'Description'}
                        numberOfLines={3}
                        name='description'
                    />

                    <InputFieldBase
                        otherProps={otherProps}
                        title={'Address'}
                        placeholder={'Address'}
                        name='address'
                    />

                    <GetCountryState
                        otherProps={otherProps}
                        placeholder={'State'}
                        name='state'
                    />

                    <InputFieldBase
                        otherProps={otherProps}
                        title={'GSTIN (Optional)'}
                        placeholder={'GSTIN (Optional)'}
                        name='gstn'
                    />

                    {/* <InputFieldBase
                        otherProps={otherProps}
                        title={'Coupon (Optional)'}
                        placeholder={'Coupon (Optional)'}
                        name='coupon'
                    /> */}

                    <View style={{ width: '100%', marginTop: 24, marginBottom: 16 }}>
                        <Text style={styles.middleText}>Seller details</Text>
                    </View>

                    <InputFieldBase
                        otherProps={otherProps}
                        title={'Seller name'}
                        placeholder={'Seller name'}
                        name='seller_name'
                    />

                    {!loginConfig?.isLogin &&
                        <>
                            <InputFieldBase
                                otherProps={otherProps}
                                title={'Email'}
                                placeholder={'Email'}
                                name='email'
                            />

                            <InputFieldBase
                                otherProps={otherProps}
                                title={'Password'}
                                placeholder={'Password'}
                                secure={true}
                                name='password'
                            />
                        </>
                    }

                    <InputFieldBase
                        otherProps={otherProps}
                        title={'Contact'}
                        placeholder={'Contact'}
                        name='mobile'
                    />

                    <TouchableOpacity style={styles.idContainer} onPress={openGallery}>
                        {cropedImage ? <ImageBackground source={{ uri: Platform.OS === 'ios' ? cropedImage.sourceURL : cropedImage?.path }}
                            style={styles.container}
                            imageStyle={{ opacity: 0.7 }}
                            resizeMode={'cover'}>
                            <TouchableOpacity onPress={() => setFieldValue('upload_adhar_no', null)} style={{ alignItems: 'center' }}>
                                <Text style={{ ...styles.text, color: AppStyle.colorSet.primaryColorA }}>X</Text>
                            </TouchableOpacity>
                        </ImageBackground> : <UploadIcon />}

                        <View>
                            <Text style={styles.proofText}>
                                {cropedImage ? Platform.OS === 'ios' ? cropedImage?.filename :
                                    cropedImage?.path?.split('/')[cropedImage?.path?.split('/')?.length - 1] :
                                    'Upload ID Proof (Driver\'s License, PAN card, Aadhar, Voter\'s ID)'}
                            </Text>
                        </View>
                    </TouchableOpacity>

                    <InputFieldBase
                        otherProps={otherProps}
                        title={'Coupon code'}
                        placeholder={'Have a coupon code? Apply here'}
                        name='coupon'
                    />

                </View>
            </ScrollView>

            <View style={AppStyle.buttonContainerBottom}>
                {/* <Button text={'Next'} fill={true} handleClick={() => navigation.navigate('BuyPlan')} /> */}
                <Button text={'Next'} fill={true} handleClick={handleSubmit} />
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
        // flex: 1,
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
    },
    container: {
        // flex: 1,
        height: 41,
        width: 41,
        // borderRadius: 22,
        borderColor: AppStyle.colorSet.borderLightGrayColor,
        backgroundColor: AppStyle.colorSet.borderLightGrayColor + '70',
        // borderWidth: 2,
        justifyContent: 'center',
        alignItems: 'center'
    },
})