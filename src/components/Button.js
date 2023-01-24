import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import AppStyle from '../assets/styles/AppStyle'
import { commonStyle } from '../helpers/common'

const Button = ({ fill = false, text, handleClick = null }) => {
    return (
        <TouchableOpacity
            onPress={() => handleClick && handleClick()}
            style={{
                ...styles.container,
                backgroundColor: fill ? AppStyle.colorSet.primaryColorB : 'transparent',

            }}>
            <Text style={{
                ...styles.buttonText,
                color: fill ? AppStyle.colorSet.whiteColor : AppStyle.colorSet.primaryColorB,
            }}>{text}</Text>
        </TouchableOpacity>
    )
}

export default Button;

const styles = StyleSheet.create({
    container: {
        // marginHorizontal: 16,
        borderColor: AppStyle.colorSet.primaryColorB,
        borderWidth: 1,
        borderRadius: 50,
        justifyContent: 'center',
        height: 44
    },
    buttonText: {
        ...commonStyle('500', 16, 'primaryColorB'),
        textAlign: 'center',
    }
})