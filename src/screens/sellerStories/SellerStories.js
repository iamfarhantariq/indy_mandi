import { ScrollView, StyleSheet, Image, View, Text, TouchableOpacity } from 'react-native'
import React, { useState, useEffect } from 'react'
import AppStyle from '../../assets/styles/AppStyle';
import HeaderWithBack from '../../components/Headers/HeaderWithBack'
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux'
import SellerStory from '../../components/SellerStory';
import SellerStoryTwo from '../../components/SellerStoryTwo';
import { ServiceGetAllSellerStories } from '../../services/AppService';
import { showToastHandler } from '../../helpers/common';
import { getLoginConfig } from '../../store/slices/loginConfigSlice';

const SellerStories = () => {
    const dispatch = useDispatch();
    const navigation = useNavigation();
    const loginConfig = useSelector(getLoginConfig);
    const [page, setPage] = useState(1);
    const [lastPage, setLastPage] = useState(2);
    const [loading, setLoading] = useState(false);
    const [isEndReached, setIsEndReached] = useState(false);
    const [sellerStoryData, setsellerStoryData] = useState(null);
    const [stories, setStories] = useState([]);

    useEffect(() => {
        getSellerStories();
    }, [page]);

    useEffect(() => {
        if (isEndReached) {
            if (page > lastPage) return;
            setPage(page + 1);
        }
    }, [isEndReached]);

    const getSellerStories = () => {
        setLoading(true);
        ServiceGetAllSellerStories(page).then(response => {
            console.log({ response });
            setsellerStoryData(response?.data?.data?.feature_seller_story);
            if (page === 1) {
                setStories(response?.data?.data?.seller_stories?.data);
            } else {
                setStories([...stories, ...response?.data?.data?.seller_stories?.data]);
            }
            setLoading(false);
            setLastPage(response?.data?.meta?.last_page);
        }).catch(e => {
            setLoading(false);
            showToastHandler(e);
        });
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
                    {loginConfig?.user?.role === 'u' &&
                        <TouchableOpacity onPress={() => navigation.navigate('BecomeSeller', { sellerData: null })} style={styles.button}>
                            <Text style={styles.whiteText}>Become a Seller</Text>
                        </TouchableOpacity>}
                </View>
            </View>
        )
    }

    const isCloseToBottom = ({ layoutMeasurement, contentOffset, contentSize }) => {
        const paddingToBottom = 20;
        return layoutMeasurement.height + contentOffset.y >=
            contentSize.height - paddingToBottom;
    };

    return (
        <View style={{ backgroundColor: AppStyle.colorSet.BGColor, flex: 1 }}>
            <HeaderWithBack title={'Seller Stories'} />
            <ScrollView showsVerticalScrollIndicator={false}
                style={{ marginHorizontal: 16, marginTop: 16 }}>
                <TopConatiner />

                <Text style={styles.heading}>Featured</Text>
                <SellerStory item={sellerStoryData} />

                <ScrollView
                    onScroll={({ nativeEvent }) => {
                        setIsEndReached(isCloseToBottom(nativeEvent));
                    }}
                    scrollEventThrottle={400}
                    showsVerticalScrollIndicator={false}>
                    <View style={{ marginTop: 16, marginBottom: 16, flexDirection: 'row', flexWrap: 'wrap' }}>
                        {stories?.map((item, index) => {
                            return (
                                <View key={'seller' + index + 'story2'} style={{
                                    paddingRight: index % 2 == 0 ? 8 : 0,
                                    paddingLeft: index % 2 == 0 ? 0 : 8,
                                    marginBottom: 16
                                }}>
                                    <SellerStoryTwo item={item} />
                                </View>
                            )
                        })}
                    </View>
                </ScrollView>
            </ScrollView>
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