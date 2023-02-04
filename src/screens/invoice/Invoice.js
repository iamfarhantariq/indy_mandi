import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import AppStyle from '../../assets/styles/AppStyle'
import HeaderWithBack from '../../components/Headers/HeaderWithBack'
import { commonStyle } from '../../helpers/common'
import AppLogo from '../../assets/images/app-logo.svg';

const Invoice = () => {
    return (
        <View style={{ flex: 1, backgroundColor: AppStyle.colorSet.BGColor }}>
            <HeaderWithBack title={'Payment history'} />

            <View style={{ flex: 1, marginHorizontal: 16, marginTop: 16 }}>
                <View style={{ marginBottom: 16 }}>
                    <AppLogo />
                </View>

                <Text style={styles.iTitle}>Vruksha Marketplace Services Private Limited</Text>
                <Text style={styles.aTitle}>N-705, North Block, 7th floor, Manipal Centre, 47, Dickenson Road, Bangalore 560042</Text>

                <View style={{ flexDirection: 'row' }}>
                    <View style={{ width: '40%' }}>
                        {['Invoice Id', 'Date', 'GSTIN', 'CIN', 'SAC'].map((_item, _index) => (
                            <Text key={_index + _item} style={styles.itemDetailText}>
                                {_item}
                            </Text>
                        ))}
                    </View>
                    <View style={{ width: '60%' }}>
                        {['INDY06', '03 Jan, 2023', '29AAICV8975A1ZT', 'US2100KA2022PTC164355', '998315'].map((_item, _index) => (
                            <Text key={_index} style={styles.itemDetailTextR}>
                                {_item}
                            </Text>
                        ))}
                    </View>
                </View>

                <Text style={{ ...styles.iTitle, marginTop: 8 }}>Billing to </Text>

                <View style={{ flexDirection: 'row' }}>
                    <View style={{ width: '40%' }}>
                        {['Name', 'Address', 'State'].map((_item, _index) => (
                            <Text key={_index + _item} style={styles.itemDetailText}>
                                {_item}
                            </Text>
                        ))}
                    </View>
                    <View style={{ width: '60%' }}>
                        {['Ahtisham', 'Lahore', 'Himachal Pradesh'].map((_item, _index) => (
                            <Text key={_index} style={styles.itemDetailTextR}>
                                {_item}
                            </Text>
                        ))}
                    </View>
                </View>

            </View>
        </View>
    )
}

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