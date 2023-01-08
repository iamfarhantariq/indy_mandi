import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'
import AppStyle from '../assets/styles/AppStyle';
import AppConfig from '../helpers/config';

const SellerStoryTwo = () => {
    const navigation = useNavigation();
    return (
        <View style={styles.topConatiner}>
            <Image resizeMode='cover'
                style={styles.imageStyle}
                source={require('../assets/images/demo-seller-story-user.png')} />
            <Text style={styles.name}>
                Sandhya
            </Text>
            <View style={{ margin: 8 }}>
                <Text numberOfLines={3}
                    style={{ ...styles.description, color: AppStyle.colorSet.whiteColor, marginBottom: 8 }}>
                    A crafts hobby led to Sandhya starting a women-run business enterprise.
                </Text>
                <TouchableOpacity onPress={() => navigation.navigate('SellerStoryContentScreen')}>
                    <Text style={styles.description}>
                        {'Read Sandhya story >'}
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default SellerStoryTwo

const styles = StyleSheet.create({
    topConatiner: {
        backgroundColor: AppStyle.colorSet.primaryColorC,
        borderRadius: 8,
        overflow: 'hidden',
        // marginRight: 8,
        width: (AppConfig.screenWidth / 2) - 24,
    },
    imageStyle: {
        width: (AppConfig.screenWidth / 2) - 24,
        height: (AppConfig.screenWidth / 2) - 24,

    },
    name: {
        flex: 1,
        fontWeight: '600',
        fontSize: 12,
        color: AppStyle.colorSet.BGColor,
        textAlign: 'center',
        paddingVertical: 4,
        backgroundColor: AppStyle.colorSet.primaryColorB
    },
    description: {
        fontWeight: '400',
        fontSize: 11,
        color: AppStyle.colorSet.primaryColorB,
    },
})