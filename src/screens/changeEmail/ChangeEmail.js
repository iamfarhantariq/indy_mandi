import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';
import AppStyle from '../../assets/styles/AppStyle';
import HeaderWithBack from '../../components/Headers/HeaderWithBack';
import InputFieldBase from '../../components/Input/InputFieldBase';
import Button from '../../components/Button';
import { commonStyle } from '../../helpers/common';

const ChangeEmail = () => {
    const navigation = useNavigation();
    const [email, setEmail] = useState('');

    return (
        <View style={{ flex: 1, backgroundColor: AppStyle.colorSet.BGColor }}>
            <HeaderWithBack title={'Update Profile'} />

            <View style={{ marginHorizontal: 16, marginVertical: 16 }}>
                <View style={{ flexDirection: 'row', marginBottom: 16 }}>
                    <View style={{ width: '40%' }}>
                        <Text style={styles.itemDetailText}>
                            Current email
                        </Text>
                    </View>
                    <View style={{ width: '60%' }}>
                        <Text style={styles.itemDetailTextR}>
                            Info@example.com
                        </Text>
                    </View>
                </View>

                <InputFieldBase
                    title={'New email'}
                    placeholder={'Info@example.com'}
                    value={email}
                    onTextChange={(t) => setEmail(t)}
                />
            </View>

            <View style={AppStyle.buttonContainerBottom}>
                <Button text={'Save'} fill={true} handleClick={() => navigation.pop()} />
            </View>
        </View>
    )
}

export default ChangeEmail

const styles = StyleSheet.create({
    itemDetailText: {
        ...commonStyle('400', 14, 'textSecondary'),
        marginTop: 8,
    },
    itemDetailTextR: {
        ...commonStyle('400', 14, 'primaryColorA'),
        marginTop: 8,
    }
})