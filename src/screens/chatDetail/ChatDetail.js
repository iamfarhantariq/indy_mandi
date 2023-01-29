import { FlatList, Image, Keyboard, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import AppStyle from '../../assets/styles/AppStyle'
import HeaderWithBack from '../../components/Headers/HeaderWithBack'
import { useState } from 'react'
import InputField from '../../components/Input/InputField'
import Attachment from '../../assets/images/attachment.svg'
import SendButton from '../../assets/images/send-btn.svg'
import AppConfig from '../../helpers/config'
import { commonStyle } from '../../helpers/common'
import { useRef } from 'react'
import { useEffect } from 'react'

const _messages = [
    { imageSource: require('../../assets/images/demo-category-image.jpeg'), message: 'Hi!', incoming: true },
    { imageSource: require('../../assets/images/demo-category-image.jpeg'), message: 'Hello!', incoming: false },
    { imageSource: require('../../assets/images/demo-category-image.jpeg'), message: 'Hoe are you?', incoming: false },
    { imageSource: require('../../assets/images/demo-category-image.jpeg'), message: 'I am good, Thanks', incoming: true },
    { imageSource: require('../../assets/images/demo-category-image.jpeg'), message: 'How can i help you?', incoming: false },
    { imageSource: require('../../assets/images/demo-category-image.jpeg'), message: 'Is iPhone available?', incoming: true },
    { imageSource: require('../../assets/images/demo-category-image.jpeg'), message: 'Yes! How much items do you want?', incoming: false },
    { imageSource: require('../../assets/images/demo-category-image.jpeg'), message: 'I want 10 x iPhone at the following address. Address: 67/123-H, K-Block, Islamabad', incoming: true },
    { imageSource: require('../../assets/images/demo-category-image.jpeg'), message: 'Payment will be sent on delivery', incoming: true },
    { imageSource: require('../../assets/images/demo-category-image.jpeg'), message: 'Ok we have processed your booking. Thanks', incoming: false },
    { imageSource: require('../../assets/images/demo-category-image.jpeg'), message: 'Your booking no: 1234455.', incoming: false },
    { imageSource: require('../../assets/images/demo-category-image.jpeg'), message: 'Thank you for purchasing items.', incoming: false },
    { imageSource: require('../../assets/images/demo-category-image.jpeg'), message: 'Welcome', incoming: true },
    { imageSource: require('../../assets/images/demo-category-image.jpeg'), message: 'I will contact again', incoming: true },
]

const ChatDetail = () => {
    const flatListRef = useRef();

    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState(_messages);

    useEffect(() => {
        const keyboardDidShowListener = Keyboard.addListener(
            'keyboardDidShow', () => {
                console.log('Hello');
                flatListRef.current.scrollToEnd();
            },
        );
        const keyboardDidHideListener = Keyboard.addListener(
            'keyboardDidHide', () => {
                flatListRef.current.scrollToEnd()
            },
        );

        return () => {
            keyboardDidHideListener.remove();
            keyboardDidShowListener.remove();
        };
    }, []);

    const MessageTypeBlock = ({ item, index }) => (
        <View style={{
            ...styles.messageContainer,
            backgroundColor: AppStyle.colorSet[item?.incoming ? 'primaryColorA' : 'primaryColorC'],
            alignSelf: item?.incoming ? 'flex-start' : 'flex-end'
        }}>
            <Image resizeMode='cover' source={item.imageSource}
                style={styles.imageStyle} />

            <Text style={styles.message}>{item.message}</Text>
        </View>
    )

    return (
        <View style={{ flex: 1, backgroundColor: AppStyle.colorSet.BGColor }}>
            <HeaderWithBack title={'Emma Mayers'} />

            <View style={{ marginHorizontal: 16, marginBottom: 85, flex: 1 }}>
                <FlatList
                    ref={flatListRef}
                    data={messages}
                    nestedScrollEnabled
                    key={index => 'chat' + index + 'detail'}
                    renderItem={MessageTypeBlock}
                    showsVerticalScrollIndicator={false}
                    onContentSizeChange={() => flatListRef.current && flatListRef.current.scrollToEnd()}
                />
            </View>

            <View style={styles.typeContainer}>
                <View style={{ flex: 1 }}>
                    <InputField value={message} onTextChange={(t) => setMessage(t)} placeholder={'Type message'} />
                </View>
                <TouchableOpacity style={{ marginHorizontal: 8 }}>
                    <Attachment />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => {
                    if (message) {
                        setMessages([...messages,
                        { imageSource: require('../../assets/images/demo-category-image.jpeg'), message: message, incoming: false },
                        ])
                        setMessage('');
                    }
                }}>
                    <SendButton />
                </TouchableOpacity>
            </View>
        </View >
    )
}

export default ChatDetail

const styles = StyleSheet.create({
    typeContainer: {
        width: AppConfig.screenWidth,
        height: 85,
        position: 'absolute',
        bottom: 0,
        flexDirection: 'row',
        borderTopColor: AppStyle.colorSet.borderLightGrayColor,
        backgroundColor: AppStyle.colorSet.BGColor,
        borderTopWidth: 1,
        padding: 16
    },
    messageContainer: {
        width: '80%',
        padding: 8,
        borderRadius: 8,
        flexDirection: 'row',
        marginBottom: 16,
        justifyContent: 'flex-start',
        height: 'auto',
    },
    sender: {
        backgroundColor: AppStyle.colorSet.primaryColorC,
    },
    receiver: {
        backgroundColor: AppStyle.colorSet.primaryColorA,
    },
    imageStyle: {
        borderRadius: 4,
        height: 24,
        width: 24,
    },
    message: {
        ...commonStyle('500', 14, 'whiteColor'),
        lineHeight: 19.07,
        marginLeft: 16,
        paddingRight: 8,
        flex: 1,
    }
})