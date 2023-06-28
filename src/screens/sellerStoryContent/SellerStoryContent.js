import { ScrollView, StyleSheet, Text, useWindowDimensions, View } from 'react-native'
import React, { useState, useEffect } from 'react'
import AppStyle from '../../assets/styles/AppStyle'
import ImageHeader from '../../components/Headers/ImageHeader'
import { useDispatch } from 'react-redux'
import { useNavigation } from '@react-navigation/native'
import { setActivityIndicator } from '../../store/slices/appConfigSlice'
import { commonStyle, showToastHandler } from '../../helpers/common'
import { ServiceGetSingleStory } from '../../services/AppService';
import RenderHtml from 'react-native-render-html';

const SellerStoryContent = ({ route }) => {
    const { slug } = route?.params;
    const dispatch = useDispatch();
    const navigation = useNavigation();
    const { width } = useWindowDimensions();
    const [story, setStory] = useState(null);

    useEffect(() => {
        if (slug) {
            getSellerStory();
        } else {
            navigation.pop();
        }
    }, []);

    const getSellerStory = () => {
        dispatch(setActivityIndicator(true));
        ServiceGetSingleStory(slug).then(response => {
            console.log({ response });
            setStory(response?.data?.data);
            dispatch(setActivityIndicator(false));
        }).catch(e => {
            showToastHandler(e, dispatch);
        });
    }

    return (
        <View style={{ backgroundColor: AppStyle.colorSet.BGColor, flex: 1 }}>
            <ImageHeader image={story?.image} description={story?.title} />
            <ScrollView showsVerticalScrollIndicator={false}>
                <Text style={styles.timeText}>{story?.publish_time}</Text>
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <RenderHtml
                        tagsStyles={styles.htmlBody}
                        contentWidth={width}
                        source={{ html: story?.content }}
                    />
                </View>
            </ScrollView>
        </View>
    )
}

export default SellerStoryContent

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
    },
    timeText: {
        ...commonStyle('400', 12, 'textSecondary'),
        marginHorizontal: 16,
        marginTop: 8,
        textAlign: 'right'
    },
})