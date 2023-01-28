import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import AppStyle from '../../assets/styles/AppStyle'
import HeaderWithBack from '../../components/Headers/HeaderWithBack'
import TabViewContent from '../../components/TabViewContent'

const RenderContentScreen = () => {
    return (
        <View style={{ flex: 1, backgroundColor: AppStyle.colorSet.BGColor }}>
            <HeaderWithBack title={'About, Careers, Terms, Privacy'} />

            <TabViewContent />

            <ScrollView style={{ marginHorizontal: 16 }} showsVerticalScrollIndicator={false}>
                <Text>Content will reander here from API</Text>
            </ScrollView>
        </View>
    )
}

export default RenderContentScreen

const styles = StyleSheet.create({})