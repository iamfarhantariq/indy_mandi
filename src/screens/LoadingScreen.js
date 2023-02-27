import { ActivityIndicator, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { getAppConfig } from '../store/slices/appConfigSlice';
import AppStyle from '../assets/styles/AppStyle';
import { useSelector } from 'react-redux';

const LoadingScreen = () => {
    const appConfig = useSelector(getAppConfig);

    return (
        appConfig?.loadingScreen && <View style={styles.container}>
            <View style={styles.acitivityIndicator}>
                <ActivityIndicator size={'large'} />
                <Text style={styles.text}>Loading...</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        zIndex: 9999,
        backgroundColor: AppStyle.colorSet.blackColor,
        opacity: 0.8,
        justifyContent: 'center',
        alignItems: 'center'
    },
    acitivityIndicator: {
        borderRadius: 15,
        height: 150,
        width: 150,
        justifyContent: 'center',
        alignItems: 'center'
    },
    text: {
        fontSize: 16,
        color: AppStyle.colorSet.whiteColor,
        textAlign: 'center',
        marginTop: 16,
        textAlignVertical: 'bottom'
    },
});

export default LoadingScreen;