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
import { GetPaymentModes, GetUserAddresses, ServiceGetAllChatMessages, ServicePostReadMessageByReceiver, ServicePostSendMessage } from '../../services/AppService'
import { useDispatch, useSelector } from 'react-redux'
import { setActivityIndicator } from '../../store/slices/appConfigSlice'
import { getLoginConfig } from '../../store/slices/loginConfigSlice'
import { Pusher } from '@pusher/pusher-websocket-react-native';
import ImagePicker from 'react-native-image-crop-picker';
import SmallButton from '../../components/SmallButton'
import moment from 'moment'

const ChatDetail = ({ route }) => {
    const { conversation } = route.params;
    const flatListRef = useRef();
    const dispatch = useDispatch();
    const navigation = useNavigation();
    const pusher = Pusher.getInstance();
    const [message, setMessage] = useState('');
    const [chatData, setChatData] = useState(null);
    const [messages, setMessages] = useState([]);
    const [addresses, setAddresses] = useState([]);
    const [payments, setPayments] = useState([]);
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
            getAddresses();
            getPaymentTypes();
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

    const getAddresses = () => {
        GetUserAddresses().then((response) => {
            console.log({ response });
            setAddresses(response?.data?.data);
        }).catch(e => {
            console.log({ e });
        });
    }

    const getPaymentTypes = () => {
        GetPaymentModes().then((response) => {
            console.log({ response });
            setPayments(response?.data?.data);
        }).catch(e => {
            console.log({ e });
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

    const MessageTypeBlock = ({ item, index }) => {
        return (
            <View style={{
                ...styles.messageContainer,
                backgroundColor: AppStyle.colorSet[item?.user_id !== chatData?.authUser?.id ? 'primaryColorA' : 'primaryColorC'],
                alignSelf: item?.user_id !== chatData?.authUser?.id ? 'flex-start' : 'flex-end'
            }}>
                <View>
                    <Image resizeMode='cover' source={{ uri: getChatThumb(item?.user_id === chatData?.authUser?.id) }}
                        style={styles.imageStyle} />
                    {/* <Text style={styles.timeText}>{moment(item?.created_at).fromNow()}</Text> */}
                </View>
                {item?.type === 'media' && <MediaSection item={item} />}
                {item?.type === 'text' && <MessageSection item={item} />}
                {item?.type === 'prompt' && <PromptSection item={item} />}
            </View>
        )
    }

    const MessageSection = ({ item }) => <Text style={styles.message}>{item?.message}</Text>

    const MediaSection = ({ item }) => <Image resizeMode='cover'
        source={{
            uri: item?.media?.includes('https://staging.indymandi.com/images/conversations/')
                ? item?.media :
                `${chatData?.messageFilePath}/${item?.media}`
        }}
        style={styles.mediaImageStyle} />

    const PromptSection = ({ item }) => {
        if (item?.prompt?.prompt_type == 'order_summary_overview') {
            return <OrderSummaryOverviewPrompt data={item} />;
        } else if (item?.prompt?.prompt_type == 'order_summary_address') {
            return <OrderSummaryAddressPrompt data={item} />
        } else if (item?.prompt?.prompt_type == 'order_summary_address_confirmed') {
            return <OrderSummaryAddressConfirmedPrompt data={item} />
        } else if (item?.prompt?.prompt_type == 'can_fulfill_inform') {
            return <CanFulFillInformPrompt data={item} />
        } else if (item?.prompt?.prompt_type == 'can_fulfill_overview') {
            return <CanFulFillOverviewPrompt data={item} />
        } else if (item?.prompt?.prompt_type == 'can_fulfill_choose') {
            return <CanFulFillChoosePrompt data={item} />
        } else if (item?.prompt?.prompt_type == 'can_fulfill_shippingfee') {
            return <CanFulFillShippingfeePrompt data={item} />
        } else if (item?.prompt?.prompt_type == 'can_fulfill_update') {
            return <CanFulFillUpdatePrompt data={item} />
        } else if (item?.prompt?.prompt_type == 'can_fulfill_sure') {
            return <CanFulFillSurePrompt data={item} />
        } else if (item?.prompt?.prompt_type == 'can_fulfill_payment') {
            return <CanFulFillPaymentPrompt data={item} />
        } else if (item?.prompt?.prompt_type == 'can_fulfill_payment_confirmed') {
            return <CanFulFillPaymentConfirmedPrompt data={item} />
        } else if (item?.prompt?.prompt_type == 'upload_payment_ss_overview') {
            return <UploadPaymentSsOverviewPrompt data={item} />
        } else if (item?.prompt?.prompt_type == 'upload_payment_ss_perform') {
            return <UploadPaymentSsPerformPrompt data={item} />
        } else if (item?.prompt?.prompt_type == 'upload_payment_ss_perform_confirmed') {
            return <UploadPaymentSsPerformConfirmedPrompt data={item} />
        } else if (item?.prompt?.prompt_type == 'confirm_payment') {
            return <ConfirmPaymentPrompt data={item} />
        } else if (item?.prompt?.prompt_type == 'confirm_order') {
            return <ConfirmOrderPrompt data={item} />
        } else if (item?.prompt?.prompt_type == 'enter_shipping') {
            return <EnterShippingPrompt data={item} />
        } else if (item?.prompt?.prompt_type == 'confirm_shipping') {
            return <ConfirmShippingPrompt data={item} />
        }
    }

    const OrderSummaryOverviewPrompt = ({ data }) => {
        return (
            <View style={{ flex: 1 }}>
                <Text style={{ ...styles.message, marginBottom: 10 }}>
                    Hi there! We see that you'd like to buy the following from {data?.prompt?.data?.store_name}:
                </Text>
                {data?.prompt?.data?.order_detail?.map((element, index) => (
                    <View key={'product' + index} style={styles.canFulFillOverviewPrompt}>
                        <Text style={styles.message}>
                            {element?.product_name} x ({element.product_quantity}) = ₹ {element.product_price}
                        </Text>
                    </View>
                ))}
                <View style={styles.totalOverviewPrompt}>
                    <Text style={styles.headingMessage}>Total:</Text>
                    <Text style={styles.normalMessageText}>
                        ₹ {data?.prompt?.data?.shipping_fee ?
                            (Number(data?.prompt?.data?.order_total_price) +
                                Number(data?.prompt?.data?.shipping_fee)) :
                            Number(data?.prompt?.data?.order_total_price)} + shipping
                    </Text>
                </View>
            </View>
        )
    }

    const OrderSummaryAddressPrompt = ({ data }) => {
        const [value, setValue] = useState('');

        return (
            <View style={{ flex: 1 }}>
                <Text style={{ ...styles.message, marginBottom: 10 }}>
                    Please add your shipping address below to confirm your order enquiry
                </Text>
                <View style={{ flexDirection: 'row' }}>
                    {addresses?.map((address, index) => (
                        <View key={'address' + index} style={{ marginRight: 5 }}>
                            <SmallButton isPrompt={true} fill={false} text={address?.type}
                                handleClick={() => null} isDisable={data?.prompt?.is_active === 1} />
                        </View>
                    ))}
                </View>
                <Text style={{ ...styles.message, textAlign: 'center', marginVertical: 5 }}>Or</Text>
                <InputField
                    title={'Type shipping address'}
                    placeholder={'Type shipping address'}
                    value={value}
                    editable={data?.prompt?.is_active === 1}
                    leftButtonText={'Submit'}
                    onTextChange={(t) => setValue(t)}
                    leftButton={true}
                    solidBorder={true}
                />
            </View>
        )
    }

    const OrderSummaryAddressConfirmedPrompt = ({ data }) => {
        return <Text style={styles.message}>Thanks for your confirmation, we have placed your order with the seller. Please await their payment details. Please note, a shipping fee may be added.</Text>
    }

    const CanFulFillInformPrompt = ({ data }) => {
        return (
            <Text style={styles.message}>{'Hello! You have a new order enquiry. Please check the products, quantity and shipping address'}</Text>
        )
    }

    const CanFulFillOverviewPrompt = ({ data }) => {
        return (
            <View style={{ flex: 1 }}>
                <Text style={styles.headingMessage}>Address:</Text>
                <Text style={styles.message}>{data?.prompt?.data?.shipping_address}</Text>
                <Text style={styles.headingMessage}>Overview:</Text>
                {data?.prompt?.data?.order_detail?.map((element, index) => (
                    <View key={'product' + index} style={styles.canFulFillOverviewPrompt}>
                        <Text style={styles.message}>
                            {element?.product_name} x ({element.product_quantity}) = ₹ {element.product_price}
                        </Text>
                    </View>
                ))}
                <View style={styles.totalOverviewPrompt}>
                    <Text style={styles.headingMessage}>Total:</Text>
                    <Text style={styles.normalMessageText}>
                        ₹ {data?.prompt?.data?.shipping_fee ?
                            (Number(data?.prompt?.data?.order_total_price) +
                                Number(data?.prompt?.data?.shipping_fee || 0)) :
                            Number(data?.prompt?.data?.order_total_price)} + shipping
                    </Text>
                </View>
            </View>
        )
    }

    const CanFulFillChoosePrompt = ({ data }) => {
        return (
            <View style={{ flex: 1 }}>
                <Text style={styles.headingMessage}>How would you like to proceed?</Text>

                <SmallButton isPrompt={true} fill={false} text={'Yes I can fulfill this order'}
                    handleClick={() => null} isDisable={data?.prompt?.is_active === 1} />

                {(Object.keys(data?.prompt?.data?.order_detail)?.length === 1 &&
                    data?.prompt?.data?.order_detail[0]?.product_quantity === 1) ? null :
                    <SmallButton isPrompt={true} fill={false} text={'I can partially fulfill this order'}
                        handleClick={() => null} isDisable={data?.prompt?.is_active === 1} />
                }

                <SmallButton isPrompt={true} fill={false} text={'No, I cannot fulfill this order'}
                    handleClick={() => null} isDisable={data?.prompt?.is_active === 1} />
            </View>
        )
    }

    const CanFulFillShippingfeePrompt = ({ data }) => {
        const [value, setValue] = useState(data?.prompt?.data?.shipping_fee || 0);
        return (
            <View style={{ flex: 1 }}>
                <Text style={styles.headingMessage}>What is the shipping fee for this order?</Text>

                <InputField
                    title={'Shipment fee'}
                    placeholder={'Shipment fee'}
                    value={value}
                    editable={data?.prompt?.is_active === 1}
                    leftButtonText={'Submit'}
                    onTextChange={(t) => setValue(t)}
                    leftButton={true}
                    solidBorder={true}
                />
            </View>
        )
    }

    const CanFulFillUpdatePrompt = ({ data }) => {
        return (
            <View>
                <Text style={styles.message}>{data?.prompt?.prompt_type}</Text>
            </View>
        )
    }

    const CanFulFillSurePrompt = ({ data }) => {
        return (
            <View style={{ flex: 1 }}>
                <Text style={styles.headingMessage}>
                    Are you sure you want to reject this order?
                </Text>
                <View style={{ flexDirection: 'row' }}>
                    <View style={{ marginRight: 5 }}>
                        <SmallButton isPrompt={true} fill={false} text={'Yes'}
                            handleClick={() => null} isDisable={data?.prompt?.is_active === 1} />
                    </View>
                    <View style={{ marginRight: 5 }}>
                        <SmallButton isPrompt={true} fill={false} text={'No'}
                            handleClick={() => null} isDisable={data?.prompt?.is_active === 1} />
                    </View>
                </View>
            </View>
        )
    }

    const CanFulFillPaymentPrompt = ({ data }) => {
        const [value, setValue] = useState(data?.prompt?.data?.shipping_fee || 0);

        return (
            <View style={{ flex: 1 }}>
                <Text style={styles.headingMessage}>
                    How would you like to receive payment of ₹ {data?.prompt?.data?.order_total_price}?
                </Text>
                <View style={{ flexDirection: 'row' }}>
                    {payments?.map((payment, index) => (
                        <View key={'payment' + index} style={{ marginRight: 5 }}>
                            <SmallButton isPrompt={true} fill={false} text={payment?.type}
                                handleClick={() => null} isDisable={data?.prompt?.is_active === 1} />
                        </View>
                    ))}
                </View>
                <Text style={{ ...styles.message, textAlign: 'center', marginVertical: 5 }}>Or</Text>
                <InputField
                    title={'Type here'}
                    placeholder={'Type here'}
                    value={value}
                    editable={data?.prompt?.is_active === 1}
                    leftButtonText={'Submit'}
                    onTextChange={(t) => setValue(t)}
                    leftButton={true}
                    solidBorder={true}
                />
                <View style={{ marginTop: 10 }}>
                    <UploadFile data={data} />
                </View>
            </View>
        )
    }

    const CanFulFillPaymentConfirmedPrompt = ({ data }) => {
        let message = '';
        if (data?.prompt?.data?.order_status == 'reject') {
            message = "We've informed the customer about the unavailability of the products.";
        } else {
            message = 'Thanks for submitting the order and payment information. The customer will get back to you with a screenshot of the payment.';
        }

        return <Text style={styles.message}>{message}</Text>
    }

    const UploadPaymentSsOverviewPrompt = ({ data }) => {
        let order_status = data?.prompt?.data?.order_status;
        let store_name = data?.prompt?.data?.store_name;
        let message, payment_selected_type = '';

        if (order_status !== 'reject') {
            if (data?.prompt?.data?.payment_method?.type !== 'Custom') {
                payment_selected_type = data?.prompt?.data?.payment_method?.type + ': ';
            }
        }
        if (order_status === 'complete') {
            message = 'Congratulations! ' + store_name + ' would love to fulfill your order. Please find the details below';
        } else if (order_status === 'partial') {
            message = store_name + ' can only partially fulfill your order. Check the details below';
        } else if (order_status === 'reject') {
            message = 'We’re sorry,' + store_name + ' cannot fulfill this order at the moment.';
        }

        return (
            <View style={{ flex: 1 }}>
                <Text style={{ ...styles.message, marginBottom: 10 }}>{message}</Text>

                <Text style={{ ...styles.message, marginBottom: 10 }}>#{data?.prompt?.order_id}</Text>

                {order_status === 'partial' &&
                    <Text style={{ ...styles.message, marginBottom: 10 }}>
                        {`If you would like to proceed with the order, please make a payment of ₹
                ${parseInt(data.prompt.data.order_total_price) + parseInt(data.prompt.data.shipping_fee)} .Find the details below :`}
                    </Text>}

                <Text style={{ ...styles.message, marginBottom: 10 }}>
                    Total Amount: {"\n"} ₹ {parseInt(data?.prompt?.data?.order_total_price) + parseInt(data?.prompt?.data?.shipping_fee || 0)} {" "}
                    ({`${data?.prompt?.data?.order_total_price} + ${data?.prompt?.data?.shipping_fee || 0}`} Shipping fee)
                </Text>

                <Text style={{ ...styles.message, marginBottom: 10 }}>
                    Payment Method: {"\n"}
                    {payment_selected_type} {data.prompt.data.payment_method.text ?? ''}
                </Text>

                {data?.prompt?.data?.payment_method?.image &&
                    <Image resizeMode='cover'
                        source={{ uri: data?.prompt?.data?.payment_method?.image }}
                        style={styles.mediaImageStyle} />
                }
            </View>
        )
    }

    const UploadPaymentSsPerformPrompt = ({ data }) => {
        return (
            <View style={{ flex: 1 }}>
                <Text style={{ ...styles.message, marginBottom: 10 }}>
                    Kindly attach a screenshot of your payment so the seller can start working on the order
                </Text>
                <UploadFile data={data} />
            </View>
        )
    }

    const UploadPaymentSsPerformConfirmedPrompt = ({ data }) => (
        <Text style={styles.message}>We've sent your payment details to the seller</Text>
    )

    const ConfirmPaymentPrompt = ({ data }) => {
        return (
            <View style={{ flex: 1 }}>
                <Text style={styles.headingMessage}>
                    Did you receive this payment?
                </Text>
                <Image resizeMode='cover'
                    source={{ uri: data?.prompt?.data?.payment_ss }}
                    style={styles.mediaImageStyle} />
                <View style={{ flexDirection: 'row' }}>
                    <View style={{ marginRight: 5 }}>
                        <SmallButton isPrompt={true} fill={false} text={'Yes'}
                            handleClick={() => null} isDisable={data?.prompt?.is_active === 1} />
                    </View>
                    <View style={{ marginRight: 5 }}>
                        <SmallButton isPrompt={true} fill={false} text={'No'}
                            handleClick={() => null} isDisable={data?.prompt?.is_active === 1} />
                    </View>
                </View>
            </View>
        )
    }

    const ConfirmOrderPrompt = ({ data }) => {
        if (data?.prompt?.data?.confirm_payment == 1) {
            return <Text style={styles.message}>{`Congratulations! ${data?.prompt?.data?.store_name} is working on your order and will ship it soon.`}</Text>
        } else {
            <View>
                <Text style={styles.message}>{`${data?.prompt?.data?.store_name} has not received your payment, please retry/reupload your payment or contact IndyMandi support`}</Text>
                <UploadFile data={data} />
            </View>
        }
    }

    const EnterShippingPrompt = ({ data }) => {
        const [value, setValue] = useState('');
        return (
            <View style={{ flex: 1 }}>
                <Text style={{ ...styles.message, marginBottom: 10 }}>
                    Great to see you working on the order! Once done, please update the shipping details below. Remember to include a tracking link or a tracking number along with the carrier :
                </Text>
                <InputField
                    title={'Type here'}
                    placeholder={'Type here'}
                    value={value}
                    editable={data?.prompt?.is_active === 1}
                    leftButtonText={'Submit'}
                    onTextChange={(t) => setValue(t)}
                    leftButton={true}
                    solidBorder={true}
                />
            </View>
        )
    }

    const ConfirmShippingPrompt = ({ data }) => (
        <Text style={styles.message}>{`Yay! Your order #${data?.prompt?.order_id} from ${data?.prompt?.data?.seller_name} has been shipped! Details below: \n${data?.prompt?.data?.shipping_id}`}</Text>
    )
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

const UploadFile = ({ data }) => {
    return (
        <View>
            <View style={styles.container}>
                <View style={styles.inputView}>
                    <Text style={{ ...styles.headingMessage, marginLeft: 8, color: 'white' }}>No file selected</Text>
                    <View style={{ marginRight: 10 }}>
                        <SmallButton text={'Choose file'} fill={false} handleClick={() => null} />
                    </View>
                </View>
            </View>
            <SmallButton isPrompt={true} fill={true} text={'Submit file'}
                handleClick={() => null} isDisable={data?.prompt?.is_active === 1} />
        </View>
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
        marginRight: 16
    },
    mediaImageStyle: {
        height: 120,
        width: 120,
    },
    message: {
        ...commonStyle('400', 14, 'whiteColor'),
        lineHeight: 19.07,
        paddingRight: 8,
        flex: 1,
    },
    headingMessage: {
        ...commonStyle('600', 15, 'primaryColorB'),
        lineHeight: 19.07,
        paddingRight: 8,
        flex: 1
    },
    canFulFillOverviewPrompt: {
        borderBottomColor: AppStyle.colorSet.borderLightGrayColor,
        borderBottomWidth: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        flexDirection: 'row',
        maxWidth: AppConfig.windowWidth,
        paddingRight: 8
    },
    totalOverviewPrompt: {
        flexDirection: 'row',
        flex: 1,
        paddingRight: 8
    },
    normalMessageText: {
        ...commonStyle('500', 14, 'whiteColor'),
        lineHeight: 19.07,
        paddingRight: 8,
    },
    container: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    inputView: {
        flex: 1,
        borderWidth: 1,
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'row',
        height: 34,
        marginBottom: 10,
        borderColor: AppStyle.colorSet.borderLightGrayColor,
        backgroundColor: 'transparent'
    },
    timeText: {
        ...commonStyle('400', 9, AppStyle.colorSet.whiteColor + '50'),
        paddingRight: 8,
    }
})