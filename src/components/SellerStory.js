import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import AppStyle from '../assets/styles/AppStyle'
import { useNavigation } from '@react-navigation/native'

const SellerStory = ({ title = null, item }) => {
    const navigation = useNavigation();
    return (
        <View>
            {title &&
                <TouchableOpacity onPress={() => navigation.navigate('SellerStoriesScreen')}>
                    <Text style={styles.heading}>{title}</Text>
                </TouchableOpacity>

            }
            <View style={styles.container}>
                <View style={styles.imageContainer}>
                    <Image resizeMode='contain'
                        style={{ height: 200, flex: 1 }}
                        source={{ uri: item?.image }} />
                </View>
                <View style={styles.textContainer}>
                    <Text style={styles.whiteText}>
                        {item?.title}
                    </Text>
                    <Text style={styles.coloredText}>
                        {item?.first_line}
                    </Text>
                    <TouchableOpacity onPress={() => navigation.navigate('SellerStoryContentScreen', { slug: item?.slug })}>
                        <Text style={styles.whiteText}>
                            {"Read story >"}
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => navigation.navigate('BecomeSeller')} style={styles.button}>
                        <Text style={styles.whiteText}>Become a Seller</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}

export default SellerStory

const styles = StyleSheet.create({
    heading: {
        fontSize: 16,
        fontWeight: '600',
        color: AppStyle.colorSet.blackColor,
        marginBottom: 8
    },
    container: {
        height: 200,
        flex: 1,
        backgroundColor: AppStyle.colorSet.primaryColorC,
        borderRadius: 8,
        flexDirection: 'row',
    },
    imageContainer: {
        flex: 0.37,
        flexDirection: 'row',
        borderBottomLeftRadius: 8,
        borderTopLeftRadius: 8,
        overflow: 'hidden'
    },
    textContainer: {
        flex: 0.63,
        marginHorizontal: 16,
        justifyContent: 'center'
    },
    whiteText: {
        fontWeight: '600',
        fontSize: 12,
        color: AppStyle.colorSet.whiteColor
    },
    coloredText: {
        fontWeight: '600',
        fontSize: 12,
        color: AppStyle.colorSet.primaryColorB,
        marginVertical: 8
    },
    button: {
        backgroundColor: AppStyle.colorSet.primaryColorB,
        paddingHorizontal: 8,
        paddingVertical: 4,
        marginTop: 13,
        borderRadius: 25,
        alignItems: 'center',
        justifyContent: 'center',
        width: 114,
        height: 24
    }
})