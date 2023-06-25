import { FlatList, Image, Keyboard, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import AppStyle from '../../assets/styles/AppStyle'
import HeaderWithBack from '../../components/Headers/HeaderWithBack'
import { useState } from 'react'
import InputField from '../../components/Input/InputField'
import Attachment from '../../assets/images/attachment.svg'
import SendButton from '../../assets/images/send-btn.svg'
import AppConfig from '../../helpers/config'
import { commonStyle, convertToFormDataObject, showToastHandler } from '../../helpers/common'
import { useRef } from 'react'
import { useEffect } from 'react'
import { useNavigation } from '@react-navigation/native'
import { ServiceGetAllChatMessages, ServicePostReadMessageByReceiver, ServicePostSendMessage } from '../../services/AppService'
import { useDispatch, useSelector } from 'react-redux'
import { setActivityIndicator } from '../../store/slices/appConfigSlice'
import { getLoginConfig } from '../../store/slices/loginConfigSlice'
import { Pusher } from '@pusher/pusher-websocket-react-native';
import ImagePicker from 'react-native-image-crop-picker';

const ChatDetail = ({ route }) => {
    const { conversation } = route.params;
    const flatListRef = useRef();
    const dispatch = useDispatch();
    const navigation = useNavigation();
    const pusher = Pusher.getInstance();
    const [message, setMessage] = useState('');
    const [chatData, setChatData] = useState(null);
    const [messages, setMessages] = useState([]);
    const loginConfig = useSelector(getLoginConfig);

    useEffect(() => {
        const keyboardDidShowListener = Keyboard.addListener(
            'keyboardDidShow', () => {
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

    useEffect(() => {
        if (conversation) {
            getMessages();
            initializeOwnChatPusher();
        } else {
            navigation.pop();
        }
        return async () => {
            await pusher.unsubscribe({ channelName: 'chat-msg-own' });
        }
    }, []);

    const getMessages = () => {
        dispatch(setActivityIndicator(true))
        ServiceGetAllChatMessages({ conv_id: conversation?.conv_id }).then(response => {
            console.log({ response });
            setChatData(response?.data);
            setMessages(response?.data?.conversation?.chat)
            if (conversation?.chat_count > 0) {
                ServicePostReadMessageByReceiver({ chat_id: conversation?.last_chat[0]?.id }).then(readResponse => {
                    console.log({ readResponse });
                }).catch(e => {
                    console.log(e);
                });
            }
            dispatch(setActivityIndicator(false));
        }).catch(e => {
            showToastHandler(e, dispatch);
        })
    }

    const initializeOwnChatPusher = async () => {
        const myChannel = await pusher.subscribe({
            channelName: 'chat-msg-own',
            onSubscriptionSucceeded: (channelName, data) => {
                console.log(`Subscribed to ${{ channelName }}`);
            },
            onEvent: (event) => {
                console.log(`Got channel event: ${event}`);
                const messageData = JSON.parse(event?.data)
                console.log({ messageData });
                const payload = {
                    message: messageData?.data?.message,
                    type: messageData?.data?.type,
                    media: messageData?.data?.media,
                    time: messageData?.data?.time,
                }
                //Self chat
                if (Number(event?.eventName?.split('_user_')[1]) === chatData?.authUser?.id) {
                    setMessages(messages => [...messages, { ...payload, user_id: chatData?.authUser?.id }])
                } else {
                    setMessages(messages => [...messages, { ...payload, user_id: messageData?.sender_id }])
                }
            }
        });
    }

    const handleOnSend = () => {
        if (!message) return;
        const payload = {
            message,
            media: null,
            rec_id: chatData?.authUser?.role_id === 'u' ?
                chatData?.conversation?.reciever?.id :
                chatData?.conversation?.sender?.id
        }
        const formData = convertToFormDataObject(payload);
        console.log({ formData });
        ServicePostSendMessage(chatData?.conversation?.id, formData).then(response => {
            console.log({ response });
            setMessage('');
        }).catch(e => {
            console.log(e);
        })
    }

    const openGallery = async () => {
        ImagePicker.openPicker({
            mediaType: 'photo',
        }).then(async image => {
            console.log(image);
            const imageUri = Platform.OS === 'ios' ? image?.sourceURL : image?.path
            const mimeImage = {
                uri: imageUri,
                type: image?.mime,
                name: imageUri.split("/").pop(),
            }
            const payload = {
                message: '',
                media: mimeImage,
                rec_id: chatData?.authUser?.role_id === 'u' ?
                    chatData?.conversation?.reciever?.id :
                    chatData?.conversation?.sender?.id
            }
            const formData = convertToFormDataObject(payload);
            console.log({ formData });
            dispatch(setActivityIndicator(true));
            ServicePostSendMessage(chatData?.conversation?.id, formData).then(response => {
                console.log({ response });
                dispatch(setActivityIndicator(false));
            }).catch(e => {
                console.log(e);
                dispatch(setActivityIndicator(false));
            })
        }).catch(e => {
            console.log({ e });
        });
    }

    const MessageTypeBlock = ({ item, index }) => {
        const getChatThumb = (sameUser) => {
            if (sameUser) {
                if (chatData?.authUser?.role_id === 'u') {
                    return loginConfig?.user?.profile_image ?
                        loginConfig?.user?.profile_image :
                        'https://img.icons8.com/bubbles/344/user.png'
                } else {
                    return chatData?.conversation?.reciever?.store?.image ?
                        `${chatData?.mediaPath}/${chatData?.conversation.reciever.store.image}` :
                        'https://img.icons8.com/bubbles/344/user.png'
                }
            } else {
                if (chatData?.authUser?.role_id === 'u') {
                    return chatData?.conversation?.reciever?.store?.image ?
                        `${chatData?.mediaPath}/${chatData?.conversation.reciever.store.image}` :
                        'https://img.icons8.com/bubbles/344/user.png'
                } else {
                    return chatData?.conversation?.sender?.image ?
                        `${chatData?.UmediaPath}/${chatData?.conversation.sender.image}` :
                        'https://img.icons8.com/bubbles/344/user.png'
                }
            }
        }

        return (
            <View style={{
                ...styles.messageContainer,
                backgroundColor: AppStyle.colorSet[item?.user_id !== chatData?.authUser?.id ? 'primaryColorA' : 'primaryColorC'],
                alignSelf: item?.user_id !== chatData?.authUser?.id ? 'flex-start' : 'flex-end'
            }}>
                {item?.media ?
                    <Image resizeMode='cover'
                        source={{
                            uri: item?.media?.includes('https://staging.indymandi.com/images/conversations/')
                                ? item?.media :
                                `${chatData?.messageFilePath}/${item?.media}`
                        }}
                        style={styles.mediaImageStyle} /> :
                    <>
                        <Image resizeMode='cover' source={{ uri: getChatThumb(item?.user_id === chatData?.authUser?.id) }}
                            style={styles.imageStyle} />
                        <Text style={styles.message}>{item?.message}</Text>
                    </>}
            </View>
        )
    }

    return (
        <View style={{ flex: 1, backgroundColor: AppStyle.colorSet.BGColor }}>
            <HeaderWithBack title={chatData?.friendName} />

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
                <TouchableOpacity style={{ marginHorizontal: 8 }} onPress={openGallery}>
                    <Attachment />
                </TouchableOpacity>
                <TouchableOpacity onPress={handleOnSend}>
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
        marginVertical: 8,
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
    mediaImageStyle: {
        height: 120,
        width: 120,
    },
    message: {
        ...commonStyle('500', 14, 'whiteColor'),
        lineHeight: 19.07,
        marginLeft: 16,
        paddingRight: 8,
        flex: 1,
    }
})