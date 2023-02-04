import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import AppStyle from '../../assets/styles/AppStyle'
import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';
import HeaderWithBack from '../../components/Headers/HeaderWithBack';
import InputFieldBase from '../../components/Input/InputFieldBase';
import { commonStyle } from '../../helpers/common';
import Button from '../../components/Button';

const ProfileSettings = () => {
    const navigation = useNavigation();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [currentPassword, setCurrentPassword] = useState('');

    return (
        <View style={{ flex: 1, backgroundColor: AppStyle.colorSet.BGColor }}>
            <HeaderWithBack title={'Update Profile'} />

            <View style={{ marginHorizontal: 16, marginVertical: 16 }}>
                <InputFieldBase
                    title={'Name'}
                    placeholder={'Customer'}
                    value={name}
                    onTextChange={(t) => setName(t)}
                />

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
                <InputFieldBase
                    title={'Current Password'}
                    placeholder={'Current Password'}
                    value={currentPassword}
                    onTextChange={(t) => setCurrentPassword(t)}
                    secure={true}
                />
            </View>

            <View style={AppStyle.buttonContainerBottom}>
                <Button text={'Save'} fill={true} handleClick={() => navigation.pop()} />
            </View>
        </View>
    )
}

export default ProfileSettings

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