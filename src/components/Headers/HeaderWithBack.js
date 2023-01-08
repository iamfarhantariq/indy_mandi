import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import AppConfig from '../../helpers/config';
import Back from '../../assets/images/back-icon.svg';
import Cross from '../../assets/images/cross-icon.svg';
import AppStyle from '../../assets/styles/AppStyle';
import { useNavigation } from '@react-navigation/native';

const HeaderWithBack = ({ title, cross = false }) => {
    const navigation = useNavigation();
    return (
        <View style={styles.headerContainer}>
            <TouchableOpacity onPress={() => navigation.pop()}>
                {cross ? <Cross /> : <Back />}
            </TouchableOpacity>
            <Text style={styles.title}>{title}</Text>
        </View>
    )
}

export default HeaderWithBack

const styles = StyleSheet.create({
    headerContainer: {
        marginTop: AppConfig.statusBarHeight,
        flexDirection: 'row',
        height: 44,
        backgroundColor: AppStyle.colorSet.BGColor,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 16,
        borderBottomColor: AppStyle.colorSet.borderLightGrayColor,
        borderBottomWidth: 1
    },
    title: {
        fontWeight: '500',
        fontSize: 20,
        textAlign: 'center',
        flex: 1
    }
})