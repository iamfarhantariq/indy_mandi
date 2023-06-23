import { Image, ScrollView, StyleSheet, Text, useWindowDimensions, View } from 'react-native'
import React from 'react'
import ImageHeader from '../../components/Headers/ImageHeader'
import AppStyle from '../../assets/styles/AppStyle';
import Share from '../../assets/images/share-icon.svg';
import { ServiceGetSingleBlog } from '../../services/AppService';
import { useState } from 'react';
import { useEffect } from 'react';
import RenderHTML from 'react-native-render-html';

const BlogContent = ({ route }) => {
    const params = route.params;
    const { width } = useWindowDimensions();
    const [blog, setBlog] = useState(null);

    useEffect(() => {
        if (params?.slug) {
            getBlogPage();
        }
    }, []);

    const getBlogPage = () => {
        ServiceGetSingleBlog(params?.slug).then(response => {
            console.log({ response });
            setBlog(response?.data?.data)
        }).catch(error => {
            console.log({ error });
        })
    }


    return (
        <View style={{ backgroundColor: AppStyle.colorSet.BGColor, flex: 1 }}>
            <ImageHeader image={blog?.image} description={blog?.slug} blog={true}/>
            <View style={{ marginHorizontal: 16, marginVertical: 18.5 }}>
                <ProfileSection blog={blog} />
            </View>
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <RenderHTML
                        tagsStyles={styles.htmlBody}
                        contentWidth={width}
                        source={{ html: blog?.content }}
                    />
                </View>
            </ScrollView>
        </View>
    )
}

const ProfileSection = ({ blog }) => {
    return (
        <View style={styles.profileContainer}>
            <Image style={{ height: 40, width: 40, borderRadius: 8 }} source={{ uri: blog?.image }} />
            <View style={{ marginHorizontal: 16, flex: 1 }}>
                <Text style={styles.name}>
                    {blog?.title}
                </Text>
                <Text style={styles.subText}>
                    {blog?.publish_time}
                    {/* 3 mins read {"    "}
                    <Text style={styles.subText}>38k Views</Text> */}
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
    },
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