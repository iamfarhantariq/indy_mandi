import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import AppStyle from '../../assets/styles/AppStyle'
import ImageHeader from '../../components/Headers/ImageHeader'

const SellerStoryContent = () => {
    return (
        <View style={{ backgroundColor: AppStyle.colorSet.BGColor, flex: 1 }}>
            <ImageHeader />
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text style={styles.name}>
                    Stories will come from API
                </Text>
            </View>
        </View>
    )
}

export default SellerStoryContent

const styles = StyleSheet.create({})