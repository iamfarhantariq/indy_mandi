import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect } from 'react'
import { commonPageStyle, commonStyle } from '../../helpers/common'
import AppStyle from '../../assets/styles/AppStyle';
import SettingIcon from '../../assets/images/setting-icon.svg';
import InputField from '../../components/Input/InputField';
import { useState } from 'react';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { getAppConfig, setConversationsData } from '../../store/slices/appConfigSlice';
import { Pusher } from '@pusher/pusher-websocket-react-native';
import { ServiceGetAllConversations } from '../../services/AppService';

const ChatScreen = () => {
    const navigation = useNavigation();
    const pusher = Pusher.getInstance();
    const dispatch = useDispatch();
    const isFocused = useIsFocused();
    const { conversationsData } = useSelector(getAppConfig);
    const [justCame, setJustCame] = useState(true)
    const [chats, setChats] = useState([]);
    const [search, setSearch] = useState('');

    useEffect(() => {
        initializeChatsPusher();
        return async () => {
            await pusher.unsubscribe({ channelName: 'chat-message' });
        }
    }, []);

    useEffect(() => {
        if (conversationsData?.conversations?.length) {
            setChats(
                [...conversationsData?.conversations].filter(f =>
                    f?.sender?.name?.toLowerCase()?.includes(search) ||
                    f?.last_message?.toLowerCase()?.includes(search)))
        }
    }, [search, conversationsData]);

    useEffect(() => {
        if (!justCame && isFocused) {
            getChats();
        } else {
            setJustCame(false);
        }
    }, [isFocused]);

    const getChats = () => {
        ServiceGetAllConversations().then(response => {
            console.log({ response });
            dispatch(setConversationsData(response?.data));
        }).catch(e => {
            console.log(e);
        });
    }

    const initializeChatsPusher = async () => {
        const myChannel = await pusher.subscribe({
            channelName: 'chat-message',
            onSubscriptionSucceeded: (channelName, data) => {
                console.log(`Subscribed to ${{ channelName }}`);
            },
            onEvent: (event) => {
                console.log(`Got channel event: ${event}`);
                getChats();
            }
        });
    }

    const _renderItem = ({ item, index }) => {
        const getChatThumb = () => {
            if (conversationsData?.userRole === 'u') {
                return item?.reciever?.store?.image ?
                    `${conversationsData?.mediaPath}/${item.reciever.store.image}` :
                    'https://img.icons8.com/bubbles/344/user.png'
            } else {
                return item?.sender?.image ?
                    `${conversationsData?.UmediaPath}/${item.sender.image}` :
                    'https://img.icons8.com/bubbles/344/user.png'
            }
        }

        const getChatName = () => {
            if (conversationsData?.userRole === 'u') {
                return item?.reciever?.store?.name;
            } else {
                return item?.sender?.name;
            }
        }

        return (
            <TouchableOpacity onPress={() => navigation.navigate('ChatDetail', { conversation: item })} style={styles.chatItemContainer}>
                <Image resizeMode='cover'
                    source={{ uri: getChatThumb() }}
                    style={styles.imageStyle} />
                <View style={{ marginLeft: 12 }}>
                    <Text style={styles.name} numberOfLines={1} lineBreakMode='tail'>
                        {getChatName()}
                        {item?.chat_count > 0 &&
                            <Text style={{ fontWeight: '600', color: AppStyle.colorSet.primaryColorB }}>
                                {" "}{item?.chat_count}
                            </Text>}
                    </Text>
                    <Text style={styles.message} numberOfLines={1} lineBreakMode='tail'>
                        {item?.last_message ? item?.last_message : 'media'}
                    </Text>
                </View>
            </TouchableOpacity>
        )
    }

    return (
        <View style={commonPageStyle}>
            <View style={styles.headingContainer}>
                <Text style={styles.headerText}>Chat</Text>
                <SettingIcon />
            </View>
            <View style={{ marginHorizontal: 16, marginVertical: 16 }}>
                <InputField value={search} onTextChange={(t) => setSearch(t?.toLowerCase())} placeholder={'Search'} />
            </View>
            <View style={{ marginHorizontal: 16, flex: 1 }}>
                <FlatList
                    data={chats}
                    nestedScrollEnabled
                    key={index => 'chat' + index + 'item'}
                    renderItem={_renderItem}
                    showsVerticalScrollIndicator={false}
                />
            </View>
        </View>
    )
}

export default ChatScreen

const styles = StyleSheet.create({
    headingContainer: {
        paddingHorizontal: 16,
        borderBottomColor: AppStyle.colorSet.borderLightGrayColor,
        borderBottomWidth: 1,
        paddingVertical: 8,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    headerText: {
        ...commonStyle('500', 20, 'primaryColorA')
    },
    chatItemContainer: {
        flexDirection: 'row',
        borderBottomColor: AppStyle.colorSet.borderLightGrayColor,
        borderBottomWidth: 1,
        // justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 8,
    },
    imageStyle: {
        borderRadius: 8,
        height: 40,
        width: 40,
    },
    name: {
        ...commonStyle('400', 14, 'primaryColorA'),
        lineHeight: 21.79
    },
    message: {
        ...commonStyle('400', 12, 'textSecondary'),
        lineHeight: 16.34
    }
})