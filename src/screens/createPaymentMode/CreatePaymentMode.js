import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native';
import { useFormik } from 'formik';
import { setActivityIndicator } from '../../store/slices/appConfigSlice';
import { PostPutPaymentMode } from '../../services/AppService';
import Toast from 'react-native-toast-message';
import { commonStyle, convertToFormDataObject, showToastHandler } from '../../helpers/common';
import DropDownPicker from 'react-native-dropdown-picker';
import AppStyle from '../../assets/styles/AppStyle';
import DownArrow from '../../assets/images/d-a.svg';
import UpArrow from '../../assets/images/u-a.svg';
import InputFieldBase from '../../components/Input/InputFieldBase';
import Button from '../../components/Button';
import UploadImages from '../../components/Input/UploadImages';
import { useDispatch } from 'react-redux';
import HeaderWithBack from '../../components/Headers/HeaderWithBack';

const CreatePaymentMode = ({ route }) => {
    const params = route?.params;
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const [open, setOpen] = useState(false);
    const [items, setItems] = useState([
        { label: 'Bank', value: 'Bank' },
        { label: 'UPI ID', value: 'UPI ID' },
        { label: 'QRCode', value: 'QRCode' },
    ]);
    const [pickerValue, setPickerValue] = useState(params?.paymentData?.type);

    useEffect(() => {
        if (pickerValue !== 'QRCode') {
            setFieldValue('qrfile', '');
        }
    }, [pickerValue])


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
            type: params?.paymentData?.type || '',
            detail: params?.paymentData?.detail || '',
            qrfile: params?.paymentData?.qrfile || '',
        },
        onSubmit: (values) => {
            console.log({ values });

            if (values?.type === 'QRCode' && !values.qrfile) {
                return Toast.show({
                    type: 'error',
                    text1: 'Required',
                    text2: 'QRCode image required',
                });
            }

            const formData = convertToFormDataObject(values);
            console.log({ formData });
            dispatch(setActivityIndicator(true));
            PostPutPaymentMode(formData, params?.paymentData?.id).then(async (response) => {
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
    });

    const otherProps = { values, errors, touched, setFieldValue, setFieldTouched, handleBlur };

    return (
        <View style={{ flex: 1, backgroundColor: AppStyle.colorSet.BGColor }}>
            <HeaderWithBack title={params?.addressData ? 'Edit payment mode' : 'Create payment mode'} cross={true} />

            <View style={{ marginHorizontal: 16, marginTop: 16 }}>
                <View style={{ marginBottom: 16, zIndex: 1 }}>
                    <Text style={styles.textStyle}>Type</Text>
                    <DropDownPicker
                        open={open}
                        value={pickerValue}
                        items={items}
                        setOpen={setOpen}
                        setValue={setPickerValue}
                        setItems={setItems}
                        closeAfterSelecting={true}
                        placeholder={'Type'}
                        dropDownDirection={'BOTTOM'}
                        itemKey={'label'}
                        listMode='SCROLLVIEW'
                        itemSeparator={true}
                        showTickIcon={true}
                        dropDownStyle={{ backgroundColor: AppStyle.colorSet.BGColor }}
                        closeOnBackPressed={true}
                        itemSeparatorStyle={{ opacity: 0.1 }}
                        ArrowDownIconComponent={() => <DownArrow />}
                        ArrowUpIconComponent={() => <UpArrow />}
                        onChangeValue={(v) => {
                            otherProps.setFieldValue('type', v, true);
                            otherProps.setFieldTouched('type', true, true);
                        }}
                        placeholderStyle={{
                            fontWeight: '400',
                            fontSize: 14,
                            color: AppStyle.colorSet.textPlaceholderColor,
                            marginLeft: 6,
                            marginEnd: 8,
                        }}
                        labelStyle={commonStyle('400', 14, 'colorPrimaryA')}
                        style={{
                            borderColor: otherProps?.errors['type'] && otherProps?.touched['type'] ?
                                '#E67F7F' : AppStyle.colorSet.primaryColorB,
                            borderWidth: 1,
                            borderRadius: 20,
                            minHeight: 44,
                            backgroundColor: AppStyle.colorSet.BGColor,
                            alignItems: 'center',
                            justifyContent: 'space-between',
                        }}
                    />
                </View>

                {pickerValue !== 'QRCode' ?
                    <InputFieldBase
                        otherProps={otherProps}
                        title={'Detail'}
                        placeholder={'Detail'}
                        name='detail'
                    />
                    :
                    <View style={{ marginVertical: 16, height: 176 }}>
                        <UploadImages getImage={(blobfile) => setFieldValue('qrfile', blobfile)} />
                    </View>
                }
            </View>

            <View style={AppStyle.buttonContainerBottom}>
                <Button text={'Save'} fill={true} handleClick={handleSubmit} />
            </View>
        </View>
    )
}

export default CreatePaymentMode

const styles = StyleSheet.create({
    textStyle: {
        ...commonStyle('600', 14, 'primaryColorA'),
        marginBottom: 8,
    }
})