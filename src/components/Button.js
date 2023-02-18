import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import AppStyle from '../assets/styles/AppStyle'
import { commonStyle } from '../helpers/common'

const Button = ({ fill = false, text, handleClick = null,
    height = 44, bg = AppStyle.colorSet.primaryColorB,
    textColor = AppStyle.colorSet.whiteColor }) => {
    return (
        <TouchableOpacity
            onPress={() => handleClick && handleClick()}
            style={{
                ...styles.container,
                height,
                backgroundColor: fill ? bg : 'transparent',
            }}>
            <Text style={{
                ...styles.buttonText,
                color: fill ? textColor : AppStyle.colorSet.primaryColorB,
            }}>{text}</Text>
        </TouchableOpacity>
    )
}

export default Button;

const styles = StyleSheet.create({
    container: {
        borderColor: AppStyle.colorSet.primaryColorB,
        borderWidth: 1,
        borderRadius: 50,
        justifyContent: 'center',
    },
    buttonText: {
        ...commonStyle('500', 16, 'primaryColorB'),
        textAlign: 'center',
    }
})