import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { commonStyle } from '../../helpers/common'
import InputField from './InputField'

const InputFieldBase = (props) => {
    return (
        <View style={{ marginBottom: 16 }}>
            <Text style={styles.textStyle}>{props.title}</Text>
            <InputField {...props} solidBorder={true} />
        </View>
    )
}

export default InputFieldBase;

const styles = StyleSheet.create({
    textStyle: {
        ...commonStyle('600', 14, 'primaryColorA'),
        marginBottom: 8,
    }
})