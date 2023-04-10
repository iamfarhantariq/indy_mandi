import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import HeaderWithBack from '../../components/Headers/HeaderWithBack'
import AppStyle from '../../assets/styles/AppStyle'
import { useIsFocused, useNavigation } from '@react-navigation/native'
import AppConfig from '../../helpers/config'
import { useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { ServiceGetStoreFirstCollection, ServiceGetStoreOtherCollection } from '../../services/ProductService'
import { showToastHandler } from '../../helpers/common'
import { useState } from 'react'
import { setActivityIndicator } from '../../store/slices/appConfigSlice'
import MoreOption from '../../assets/images/more-option-icon.svg';
import { SheetManager } from 'react-native-actions-sheet';
import { ServiceDeleteCollection, ServiceUpdateCollection } from '../../services/AppService';
import Toast from 'react-native-toast-message';

const ManageCollection = ({ route }) => {
    const { storeId } = route?.params;
    const isFocus = useIsFocused();
    const dispatch = useDispatch();
    const navigation = useNavigation();
    const [collections, setCollections] = useState([]);

    useEffect(() => {
        if (storeId) {
            getStoreCollection();
        } else {
            navigation.pop();
        }
    }, [isFocus]);

    const getStoreCollection = () => {
        dispatch(setActivityIndicator(true));
        ServiceGetStoreFirstCollection(storeId).then(response => {
            ServiceGetStoreOtherCollection(storeId).then(_response => {
                const combinedCollection = [response?.data, ..._response?.data];
                setCollections(combinedCollection);
                console.log({combinedCollection});
                dispatch(setActivityIndicator(false));
            }).catch(e => {
                showToastHandler(e, dispatch);
            });
        }).catch(e => {
            showToastHandler(e, dispatch);
        });
    }

    const filterHandler = (action, item) => {
        if (action === 'remove') {
            ServiceDeleteCollection(item?.id).then(async (response) => {
                console.log({ response });
                getStoreCollection();
                dispatch(setActivityIndicator(false));
                Toast.show({
                    type: 'success',
                    text1: 'Success',
                    text2: 'Success',
                });
            }).catch(e => {
                showToastHandler(e, dispatch);
            });
        }
        if (action === 'edit') {
            navigation.navigate('CreateCollection', { collection: item });
        }
    }

    const _renderItem = ({ item, index }) => {
        return (
            <View style={{ marginRight: index % 2 === 0 ? 16 : 0, marginBottom: 16 }}>
                <Image
                    resizeMode='cover'
                    source={{ uri: item?.image }}
                    style={styles.flexImageContainer}
                    imageStyle={{ borderRadius: 8 }}
                />
                <Text style={styles.name}>
                    {item?.name}
                </Text>
                <TouchableOpacity onPress={() => {
                    SheetManager.show('example-two', {
                        payload: {
                            header: 'Choose your action',
                            actions: [
                                { title: 'Edit collection', value: 'edit' },
                                { title: 'Delete collection', value: 'remove' },
                            ],
                            filterHandler: (_action) => filterHandler(_action, item)
                        }
                    });
                }} style={{ position: 'absolute', top: 4, right: 4 }}>
                    <MoreOption />
                </TouchableOpacity>
            </View>
        )
    }

    return (
        <View style={{ flex: 1, backgroundColor: AppStyle.colorSet.BGColor }}>
            <HeaderWithBack title={'Manage Collection'} iconType='add' route='CreateCollection' />
            <View style={{ flex: 1, marginHorizontal: 16, marginTop: 16 }}>
                <FlatList
                    horizontal={false}
                    data={collections}
                    numColumns={2}
                    key={(index) => 'collection' + index + 'product'}
                    renderItem={_renderItem}
                    showsVerticalScrollIndicator={false}
                />
            </View>
        </View>
    )
}

export default ManageCollection

const styles = StyleSheet.create({
    imageContainer: {
        height: 136,
        width: 136,
        marginRight: 12,
        marginBottom: 2
    },
    flexImageContainer: {
        height: (AppConfig.windowWidth / 2) - 24,
        width: (AppConfig.windowWidth / 2) - 24,
        borderRadius: 8
    },
    name: {
        fontSize: 12,
        fontWeight: '400',
        color: AppStyle.colorSet.primaryColorA,
        marginTop: 2,
    }
})