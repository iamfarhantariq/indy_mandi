import { ImageBackground, Platform, StyleSheet, Text, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import AppStyle from '../../assets/styles/AppStyle';
import UploadIcon from '../../assets/images/add-images.svg';
import { commonStyle } from '../../helpers/common';
import ImagePicker from 'react-native-image-crop-picker';
import { useSelector } from 'react-redux';
import { getLoginConfig } from '../../store/slices/loginConfigSlice';

const UploadImages = ({ getImage = null, imageUrl = null, isBanner = false }) => {
    const { user } = useSelector(getLoginConfig);
    const { other_detail } = user;
    const banner_image = other_detail?.crop_dimension?.store_banner_image;
    const [cropedImage, setCropedImage] = useState(imageUrl);

    const openGallery = async () => {
        ImagePicker.openPicker({
            width: isBanner ? banner_image?.width : 400,
            height: isBanner ? banner_image?.height : 400,
            cropping: true,
            mediaType: 'photo',
        }).then(async image => {
            console.log(image);
            const imageUri = Platform.OS === 'ios' ? image?.sourceURL : image?.path
            const mimeImage = {
                uri: imageUri,
                type: image?.mime,
                name: imageUri.split("/").pop(),
            }
            setCropedImage(image);
            getImage(mimeImage);
        }).catch(e => {
            console.log({ e });
        });
    }

    return (
        <>
            {cropedImage ? <ImageBackground source={{ uri: imageUrl ? imageUrl : Platform.OS === 'ios' ? cropedImage.sourceURL : cropedImage?.path }}
                style={styles.container}
                imageStyle={{ borderRadius: 22, opacity: 0.7 }}
                resizeMode={'cover'}>
                <TouchableOpacity onPress={() => {
                    setCropedImage(null);
                    getImage(null);
                }} style={{ alignItems: 'center' }}>
                    <Text style={{ ...styles.text, color: AppStyle.colorSet.primaryColorA }}>X Remove image</Text>
                </TouchableOpacity>
            </ImageBackground> :
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
        // height: 176,
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