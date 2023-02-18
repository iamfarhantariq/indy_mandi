import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { useNavigation } from '@react-navigation/native';
import AppStyle from '../../assets/styles/AppStyle';
import HeaderWithBack from '../../components/Headers/HeaderWithBack';
import InputFieldBase from '../../components/Input/InputFieldBase';
import UploadImages from '../../components/Input/UploadImages';
import Button from '../../components/Button';

const CreateCollection = () => {
    const navigation = useNavigation();
    const [name, setName] = useState('');
    return (
        <View style={{ flex: 1, backgroundColor: AppStyle.colorSet.BGColor }}>
            <HeaderWithBack title={'Create Collection'} />
            <View style={{ marginHorizontal: 16, marginVertical: 16 }}>

                <View style={{ height: 343, marginBottom: 16 }}>
                    <UploadImages />
                </View>

                <InputFieldBase
                    title={'Collection name'}
                    placeholder={'Collection name'}
                    value={name}
                    onTextChange={(t) => setName(t)}
                />
            </View>

            <View style={AppStyle.buttonContainerBottom}>
                <Button text={'Save'} fill={true} handleClick={() => navigation.pop()} />
            </View>
        </View>
    )
}

export default CreateCollection

const styles = StyleSheet.create({})