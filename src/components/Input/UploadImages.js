import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import AppStyle from '../../assets/styles/AppStyle';
import UploadIcon from '../../assets/images/add-images.svg';
import { commonStyle } from '../../helpers/common';

const UploadImages = () => {
    return (
        <TouchableOpacity style={styles.container}>
            <UploadIcon />
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