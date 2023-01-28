import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { commonStyle } from '../../helpers/common'

const HeadingAndDescription = ({ heading, description }) => {
    return (
        <View style={{ marginHorizontal: 16, marginBottom: 24 }}>
            <Text style={styles.title}>{heading}</Text>
            {description && <Text style={styles.bottomT}>{description}</Text>}
        </View>
    )
}

export default HeadingAndDescription

const styles = StyleSheet.create({
    title: {
        ...commonStyle('600', 14, 'primaryColorA'),
        marginBottom: 8
    },
    bottomT: {
        ...commonStyle('400', 12, 'primaryColorA'),
        lineHeight: 16.34,
        marginVertical: 4
    }
})