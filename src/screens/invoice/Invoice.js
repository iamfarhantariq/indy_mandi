import { Image, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import AppStyle from '../../assets/styles/AppStyle'
import HeaderWithBack from '../../components/Headers/HeaderWithBack'
import { commonStyle, showToastHandler } from '../../helpers/common'
import AppLogo from '../../assets/images/app-logo.svg';
import { useDispatch } from 'react-redux'
import { useNavigation } from '@react-navigation/native'
import { ServiceGetUserPaymentsInvoice } from '../../services/AppService'
import { setActivityIndicator } from '../../store/slices/appConfigSlice'

const Invoice = ({ route }) => {
    const params = route?.params;
    const dispatch = useDispatch();
    const navigation = useNavigation();
    const [invoice, setInvoice] = useState(null);

    // let data = {
    //     "company_logo": "http://indymandi-laravel-new-installation.test/images/defaults/indymandi.svg",
    //     "company_name": "Vruksha Marketplace Services Private Limited",
    //     "company_address": "N-705, North Block, 7th floor, Manipal Centre, 47, Dickenson Road, Bangalore 560042",
    //     "company_gstin": "29AAICV8975A1ZT",
    //     "company_cin": "US2100KA2022PTC164355",
    //     "company_sac": "998316",
    //     "invoice_id": "INDY021",
    //     "invoice_date": "18-Mar-2023",
    //     "customer_name": "Rashid Ali",
    //     "customer_address": "aljannat street village kamaha post",
    //     "customer_state": "Manipur",
    //     "customer_gstin": "11111",
    //     "product_description": "Standard Membership",
    //     "product_unit_price": "₹ 300",
    //     "product_quantity": "1",
    //     "product_rate": "54(18% igst)",
    //     "product_amount": "₹354",
    //     "product_total_amount": "₹354"
    // }

    useEffect(() => {
        if (params?.id) {
            getPaymentHistoryInvoice();
            // setInvoice(data);
        } else {
            navigation.pop();
        }
    }, []);

    const getPaymentHistoryInvoice = () => {
        dispatch(setActivityIndicator(true));
        ServiceGetUserPaymentsInvoice(params?.id).then(response => {
            console.log({ response });
            setInvoice(response?.data?.data);
            dispatch(setActivityIndicator(false));
        }).catch(e => {
            showToastHandler(e, dispatch);
        })
    }

    const getHeaders = (from, to) => {
        return valuesVSHeaders.slice(from, to)?.map(h => h.headerName);
    }

    const getValues = (from, to) => {
        return valuesVSHeaders.slice(from, to)?.map(h => invoice[h.dbName])
    }

    return (
        <View style={{ flex: 1, backgroundColor: AppStyle.colorSet.BGColor }}>
            <HeaderWithBack title={'Invoice'} />

            <View style={{ flex: 1, marginHorizontal: 16, marginTop: 16 }}>
                <View style={{ marginBottom: 16 }}>
                    <Image source={{ uri: invoice?.company_logo }} resizeMode='cover'
                        style={{ height: 40, width: 40 }} />
                </View>

                <Text style={styles.iTitle}>{invoice?.company_name}</Text>
                <Text style={styles.aTitle}>{invoice?.company_address}</Text>

                <View style={{ flexDirection: 'row' }}>
                    <View style={{ width: '40%' }}>
                        {getHeaders(0, 5).map((_item, _index) => (
                            <Text key={_index + _item} style={styles.itemDetailText}>
                                {_item}
                            </Text>
                        ))}
                    </View>
                    <View style={{ width: '60%' }}>
                        {getValues(0, 5).map((_item, _index) => (
                            <Text numberOfLines={1} lineBreakMode='tail' key={_index} style={styles.itemDetailTextR}>
                                {_item}
                            </Text>
                        ))}
                    </View>
                </View>

                <Text style={{ ...styles.iTitle, marginTop: 8 }}>Billing to </Text>

                <View style={{ flexDirection: 'row' }}>
                    <View style={{ width: '40%' }}>
                        {getHeaders(5, 8).map((_item, _index) => (
                            <Text key={_index + _item} style={styles.itemDetailText}>
                                {_item}
                            </Text>
                        ))}
                    </View>
                    <View style={{ width: '60%' }}>
                        {getValues(5, 8).map((_item, _index) => (
                            <Text numberOfLines={1} lineBreakMode='tail' key={_index} style={styles.itemDetailTextR}>
                                {_item}
                            </Text>
                        ))}
                    </View>
                </View>

            </View>
        </View>
    )
}

const valuesVSHeaders = [
    { dbName: 'invoice_id', headerName: 'Invoice Id' },
    { dbName: 'invoice_date', headerName: 'Date' },
    { dbName: 'company_gstin', headerName: 'GSTIN' },
    { dbName: 'company_cin', headerName: 'CIN' },
    { dbName: 'company_sac', headerName: 'SAC' },

    { dbName: 'customer_name', headerName: 'Name' },
    { dbName: 'customer_address', headerName: 'Address' },
    { dbName: 'customer_state', headerName: 'State' },
]

export default Invoice

const styles = StyleSheet.create({
    iTitle: {
        ...commonStyle('500', 16, 'primaryColorA'),
        lineHeight: 21.79,
        marginBottom: 8
    },
    aTitle: {
        ...commonStyle('400', 14, 'primaryColorA'),
        lineHeight: 21.79
    },
    itemDetailText: {
        ...commonStyle('400', 14, 'textSecondary'),
        marginTop: 8,
    },
    itemDetailTextR: {
        ...commonStyle('400', 14, 'primaryColorA'),
        marginTop: 8,
    }
})