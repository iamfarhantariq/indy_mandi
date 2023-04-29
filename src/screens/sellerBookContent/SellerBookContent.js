import { ScrollView, StyleSheet, Text, useWindowDimensions, View } from 'react-native'
import React from 'react'
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { setActivityIndicator } from '../../store/slices/appConfigSlice';
import { ServiceGetSingleBooksOfCategory } from '../../services/AppService';
import { useState } from 'react';
import AppStyle from '../../assets/styles/AppStyle';
import HeaderWithBack from '../../components/Headers/HeaderWithBack';
import ImageHeader from '../../components/Headers/ImageHeader';
import RenderHTML from 'react-native-render-html';

const SellerBookContent = ({ route }) => {
    const { sellerBookId } = route?.params;
    const dispatch = useDispatch();
    const navigation = useNavigation();
    const { width } = useWindowDimensions();
    const [content, setContent] = useState(null);

    useEffect(() => {
        if (sellerBookId) {
            getBookContent();
        } else {
            navigation.pop();
        }
    }, []);

    const getBookContent = () => {
        dispatch(setActivityIndicator(true));
        ServiceGetSingleBooksOfCategory(sellerBookId).then(response => {
            console.log({ response });
            setContent(response?.data?.data);
            dispatch(setActivityIndicator(false));
        }).catch(e => {
            showToastHandler(e, dispatch);
        })
    }

    return (
        <View style={{ backgroundColor: AppStyle.colorSet.BGColor, flex: 1 }}>
            <HeaderWithBack title='Seller Book Content' />
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', marginHorizontal: 16 }}>
                    <RenderHTML
                        tagsStyles={styles.htmlBody}
                        contentWidth={width}
                        source={{ html: content?.content }}
                    />
                </View>
            </ScrollView>
        </View>
    )
}

export default SellerBookContent

const styles = StyleSheet.create({
    htmlBody: {
        body: {
            marginHorizontal: 16,
            flex: 1,
            fontWeight: '400',
            letterSpacing: '-0.4',
            fontSize: 14,
            lineHeight: 19.07,
            color: AppStyle.colorSet.primaryColorA,
        }
    }
})