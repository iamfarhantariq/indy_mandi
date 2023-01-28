import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { commonPageStyle } from '../../helpers/common'
import HeaderWithBack from '../../components/Headers/HeaderWithBack'
import AppStyle from '../../assets/styles/AppStyle'
import HeadingAndDescription from '../../components/Store/HeadingAndDescription'
import InputFieldBase from '../../components/Input/InputFieldBase'
import { useState } from 'react'
import Button from '../../components/Button'

const ContactUs = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [reason, setReason] = useState('');
    const [description, setDescription] = useState('');

    return (
        <View style={{ flex: 1, backgroundColor: AppStyle.colorSet.BGColor }}>
            <HeaderWithBack title={'CONTACT US'} />
            <View style={{ marginVertical: 16 }}>
                <HeadingAndDescription
                    heading={'Hey! Want to chat? Drop us a line here.'}
                    description={'For any reason, please fill in the form on the right so that your message is directed to the right person or team. We read every message that we get and will reply to you as soon as we can.'} />
            </View>

            <ScrollView style={{ marginHorizontal: 16 }} showsVerticalScrollIndicator={false}>
                <InputFieldBase
                    title={'Name'}
                    placeholder={'Name'}
                    value={name}
                    onTextChange={(t) => setName(t)}
                />
                <InputFieldBase
                    title={'Email'}
                    placeholder={'Email'}
                    value={email}
                    onTextChange={(t) => setEmail(t)}
                />
                <InputFieldBase
                    title={'Reason for contact'}
                    placeholder={'Reason for contact'}
                    value={reason}
                    onTextChange={(t) => setReason(t)}
                />
                <InputFieldBase
                    title={'Write description'}
                    placeholder={'Write description'}
                    value={description}
                    numberOfLines={4}
                    onTextChange={(t) => setDescription(t)}
                />
                <View style={{ marginVertical: 16 }}>
                    <Button text={'Send'} handleClick={() => null} fill={true} />
                </View>
            </ScrollView>
        </View>
    )
}

export default ContactUs

const styles = StyleSheet.create({})