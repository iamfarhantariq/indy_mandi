import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { commonStyle } from '../../helpers/common'
import InputField from '../Input/InputField'

const DeliveryDetails = () => {
    const [search, setSearch] = useState('');

    return (
        <View style={{ marginHorizontal: 16, marginBottom: 24 }}>
            <Text style={styles.title}>Delivery Details</Text>
            <InputField value={search} onTextChange={(t) => setSearch(t)} placeholder={'Enter Pincode'} dark={true}
                leftButton={true} leftButtonText={'Check'} handleLeftButton={() => null} solidBorder={true} />
            <Text style={styles.bottomT}>Please enter pin code to check delivery time</Text>
        </View>
    )
}

export default DeliveryDetails

const styles = StyleSheet.create({
    title: {
        ...commonStyle('600', 14, 'primaryColorA'),
        marginBottom: 8
    },
    bottomT: {
        ...commonStyle('500', 12, 'textSecondary'),
        marginVertical: 4
    }
})