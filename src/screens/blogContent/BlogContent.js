import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import ImageHeader from '../../components/Headers/ImageHeader'
import AppStyle from '../../assets/styles/AppStyle';
import Share from '../../assets/images/share-icon.svg';

const BlogContent = () => {
    return (
        <View style={{ backgroundColor: AppStyle.colorSet.BGColor, flex: 1 }}>
            <ImageHeader />
            <View style={{ marginHorizontal: 16, marginVertical: 18.5 }}>
                <ProfileSection />
            </View>
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text style={styles.name}>
                    Articles will come from API
                </Text>
            </View>
        </View>
    )
}

const ProfileSection = () => {
    return (
        <View style={styles.profileContainer}>
            <Image style={{ height: 40, width: 40 }} source={require('../../assets/images/demo-profile.png')} />
            <View style={{ marginHorizontal: 16, flex: 1 }}>
                <Text style={styles.name}>
                    Akangsha Singh
                </Text>
                <Text style={styles.subText}>
                    3 mins read {"    "}
                    <Text style={styles.subText}>38k Views</Text>
                </Text>
            </View>
            <Share />
        </View>
    )
}

export default BlogContent;

const styles = StyleSheet.create({
    profileContainer: {
        flexDirection: 'row'
    },
    name: {
        fontWeight: '500',
        fontSize: 16,
        color: AppStyle.colorSet.primaryColorA
    },
    subText: {
        fontWeight: '500',
        fontSize: 14,
        color: AppStyle.colorSet.textSecondary
    }
})