import { ScrollView, StyleSheet, Image, View, Text, TouchableOpacity, FlatList } from 'react-native'
import React from 'react'
import AppStyle from '../../assets/styles/AppStyle';
import HeaderWithBack from '../../components/Headers/HeaderWithBack'
import { useNavigation } from '@react-navigation/native';
import SellerStory from '../../components/SellerStory';
import SellerStoryTwo from '../../components/SellerStoryTwo';

const SellerStories = () => {
    const navigation = useNavigation();

    const items = [1, 2, 3, 4, 5, 6];

    return (
        <View style={{ backgroundColor: AppStyle.colorSet.BGColor, flex: 1 }}>
            <HeaderWithBack title={'Seller Stories'} />
            <ScrollView showsVerticalScrollIndicator={false}
                style={{ marginHorizontal: 16, marginTop: 16 }}>
                <TopConatiner />

                <Text style={styles.heading}>Featured</Text>
                <SellerStory />

                <View style={{ marginTop: 16, marginBottom: 16, flexDirection: 'row', flexWrap: 'wrap' }}>
                    {items?.map((item, index) => {
                        return (
                            <View key={'seller' + index + 'story2'} style={{
                                paddingRight: index % 2 == 0 ? 8 : 0,
                                paddingLeft: index % 2 == 0 ? 0 : 8,
                                marginBottom: 16
                            }}>
                                <SellerStoryTwo />
                            </View>
                        )
                    })}
                </View>
            </ScrollView>
        </View>
    )
}

const TopConatiner = () => {
    return (
        <View style={styles.topConatiner}>
            <Image resizeMode='cover'
                style={{ height: 128, width: 128 }}
                source={require('../../assets/images/seller-story-top-image.png')} />
            <View style={styles.topTextContainer}>
                <Text style={styles.topHeading}>
                    Meet the Sellers of IndyMandi
                </Text>
                <Text style={styles.topDescription}>
                    Meet the Sellers of IndyMandi
                </Text>
                <TouchableOpacity onPress={() => null} style={styles.button}>
                    <Text style={styles.whiteText}>Become a Seller</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default SellerStories;

const styles = StyleSheet.create({
    topConatiner: {
        height: 120,
        flex: 1,
        flexDirection: 'row',
        backgroundColor: AppStyle.colorSet.primaryColorC,
        borderRadius: 8,
        overflow: 'hidden',
        marginBottom: 8
    },
    topTextContainer: {
        flex: 1,
        paddingHorizontal: 16,
        justifyContent: 'center'
    },
    topHeading: {
        fontWeight: '700',
        fontSize: 14,
        color: AppStyle.colorSet.primaryColorA,
        lineHeight: 19.07
    },
    topDescription: {
        fontWeight: '400',
        fontSize: 12,
        color: AppStyle.colorSet.primaryColorB,
        marginVertical: 8
    },
    whiteText: {
        fontWeight: '600',
        fontSize: 12,
        color: AppStyle.colorSet.whiteColor
    },
    button: {
        backgroundColor: AppStyle.colorSet.primaryColorB,
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 25,
        alignItems: 'center',
        justifyContent: 'center',
        width: 114,
        height: 24
    },
    heading: {
        fontSize: 16,
        fontWeight: '600',
        color: AppStyle.colorSet.blackColor,
        marginBottom: 8
    },
})