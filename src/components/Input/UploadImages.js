import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import AppStyle from '../../assets/styles/AppStyle';
import UploadIcon from '../../assets/images/add-images.svg';
import { commonStyle } from '../../helpers/common';
import { useNavigation } from '@react-navigation/native';
import ImagePicker from 'react-native-image-crop-picker';

const UploadImages = ({ getImage = null }) => {
    const navigation = useNavigation();
    const [cropedImage, setCropedImage] = useState(null);

    const openGallery = async () => {
        ImagePicker.openPicker({
            width: 400,
            height: 400,
            cropping: true,
            mediaType: 'photo',
        }).then(async image => {
            console.log(image);
            setCropedImage(image);
            const blobfile = await (await fetch(image?.sourceURL)).blob()
            getImage(blobfile);
        });
    }

    return (
        <>
            {cropedImage ? <Image source={{ uri: cropedImage.sourceURL }} style={styles.container} resizeMode={'cover'} /> :
                <TouchableOpacity style={styles.container} onPress={openGallery}>
                    <UploadIcon style={{ color: '#713A74' }} />
                    <Text style={styles.text}>Upload image</Text>
                </TouchableOpacity>
            }
        </>
    )
}

export default UploadImages

const styles = StyleSheet.create({
    container: {
        flex: 1,
        height: 176,
        borderRadius: 22,
        borderColor: AppStyle.colorSet.borderLightGrayColor,
        backgroundColor: AppStyle.colorSet.borderLightGrayColor + '70',
        borderWidth: 2,
        justifyContent: 'center',
        alignItems: 'center'
    },
    text: {
        ...commonStyle('400', 14, 'primaryColorB'),
        marginTop: 12
    }
})