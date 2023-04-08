import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import HeaderWithBack from '../../components/Headers/HeaderWithBack'
import AppStyle from '../../assets/styles/AppStyle'
import { useNavigation } from '@react-navigation/native'
import AppConfig from '../../helpers/config'
import { useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { ServiceGetStoreFirstCollection, ServiceGetStoreOtherCollection } from '../../services/ProductService'
import { showToastHandler } from '../../helpers/common'
import { useState } from 'react'
import { setActivityIndicator } from '../../store/slices/appConfigSlice'

const ManageCollection = ({ route }) => {
    const { storeId } = route?.params;
    const dispatch = useDispatch();
    const navigation = useNavigation();
    const [collections, setCollections] = useState([]);

    useEffect(() => {
        if (storeId) {
            getStoreCollection();
        } else {
            navigation.pop();
        }
    }, []);

    const getStoreCollection = () => {
        dispatch(setActivityIndicator(true));
        ServiceGetStoreFirstCollection(storeId).then(response => {
            ServiceGetStoreOtherCollection(storeId).then(_response => {
                const combinedCollection = [response?.data, ..._response?.data];
                setCollections(combinedCollection);
                dispatch(setActivityIndicator(false));
            }).catch(e => {
                showToastHandler(e, dispatch);
            });
        }).catch(e => {
            showToastHandler(e, dispatch);
        });
    }

    const _renderItem = ({ item, index }) => {
        return (
            <TouchableOpacity onPress={() => null}
                style={{ marginRight: index % 2 === 0 ? 16 : 0, marginBottom: 16 }}>
                <Image
                    resizeMode='cover'
                    source={{ uri: item?.image }}
                    style={styles.flexImageContainer}
                    imageStyle={{ borderRadius: 8 }}
                />
                <Text style={styles.name}>
                    {item?.name}
                </Text>
            </TouchableOpacity>
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