import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import AppStyle from '../../assets/styles/AppStyle'
import InputFieldBase from '../../components/Input/InputFieldBase'
import { useNavigation } from '@react-navigation/native'
import { useState } from 'react'
import Button from '../../components/Button'
import HeaderWithBack from '../../components/Headers/HeaderWithBack'

const ResetPassword = () => {
    const navigation = useNavigation();
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('')
    const [currentPassword, setCurrentPassword] = useState('');

    return (
        <View style={{ flex: 1, backgroundColor: AppStyle.colorSet.BGColor }}>
            <HeaderWithBack title={'Reset Password'} />

            <View style={{ marginHorizontal: 16, marginVertical: 16 }}>
                <InputFieldBase
                    title={'New Password'}
                    placeholder={'New Password'}
                    value={newPassword}
                    onTextChange={(t) => setNewPassword(t)}
                    secure={true}
                />
                <InputFieldBase
                    title={'Confirm Password'}
                    placeholder={'Confirm Password'}
                    value={confirmPassword}
                    onTextChange={(t) => setConfirmPassword(t)}
                    secure={true}
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

export default ResetPassword

const styles = StyleSheet.create({})