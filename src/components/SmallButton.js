import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import AppStyle from '../assets/styles/AppStyle'
import { commonStyle } from '../helpers/common'

const SmallButton = ({ fill = false, text, handleClick = null }) => {
    return (
        <TouchableOpacity
            onPress={() => handleClick && handleClick()}
            style={{
                ...styles.container,
                backgroundColor: fill ? AppStyle.colorSet.primaryColorB : 'transparent',

            }}>
            <Text style={{
                ...styles.buttonText, color:
                    fill ? AppStyle.colorSet.whiteColor : AppStyle.colorSet.primaryColorB
            }}>{text}</Text>
        </TouchableOpacity>
    )
}

export default SmallButton;

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderColor: AppStyle.colorSet.primaryColorB,
        borderWidth: 1,
        borderRadius: 50,
        alignSelf: 'flex-start',
        // justifyContent: 'center',
        height: 24
    },
    buttonText: {
        ...commonStyle('500', 12, 'primaryColorB'),
        // textAlign: 'center',
    }
})