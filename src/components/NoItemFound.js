import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { commonStyle } from '../helpers/common'
import AppStyle from '../assets/styles/AppStyle'

const NoItemFound = () => {
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text style={{ ...commonStyle('500', 14, AppStyle.colorSet.primaryColorB) }}>
                No item found!
            </Text>
        </View>
    )
}

export default NoItemFound

const styles = StyleSheet.create({})