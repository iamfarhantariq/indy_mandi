import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import AppStyle from '../../assets/styles/AppStyle';
import UploadIcon from '../../assets/images/add-images.svg';
import { commonStyle } from '../../helpers/common';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';

const UploadImages = () => {

    const openGallery = async () => {
        const options = {}
        const result = await launchImageLibrary(options);
        console.log({ result });
    }

    return (
        <TouchableOpacity style={styles.container} onPress={openGallery}>
            <UploadIcon style={{ color: '#713A74' }} />
            <Text style={styles.text}>Upload image</Text>
        </TouchableOpacity>
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