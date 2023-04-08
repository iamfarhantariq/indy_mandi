import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import HeaderWithBack from '../../components/Headers/HeaderWithBack'
import AppStyle from '../../assets/styles/AppStyle'
import { commonStyle } from '../../helpers/common'
import { useState } from 'react'
import Button from '../../components/Button'
import { useNavigation } from '@react-navigation/native'
import { useDispatch } from 'react-redux'
import { setActivityIndicator } from '../../store/slices/appConfigSlice'
import { ServiceGetDaysSlots } from '../../services/IndyViewService'
import Toast from 'react-native-toast-message';
import { useEffect } from 'react'

const IndyViews = () => {
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const [daysPeriod, setDaysPeriod] = useState([]);

    useEffect(() => {
        GetDaysSlot();
    }, []);

    const GetDaysSlot = () => {
        dispatch(setActivityIndicator(true));
        ServiceGetDaysSlots().then(response => {
            console.log({ response });
            dispatch(setActivityIndicator(false));
            setDaysPeriod(response?.data?.map(f => ({ ...f, isSelected: false })));
        }).catch(e => {
            dispatch(setActivityIndicator(false));
            console.log(e);
            const errors = e?.response?.data?.errors;
            Toast.show({
                type: 'error',
                text1: e?.response?.data?.message || e?.message,
                text2: errors ? errors[Object.keys(errors)[0]][0] : '',
            });
            navigation.pop();
        })
    }


    const _renderItem = ({ item, index }) => {

        const getStyles = () => {
            if (item.isSelected) {
                return {
                    outerContainer: { backgroundColor: AppStyle.colorSet.primaryColorA },
                    innerText: { color: AppStyle.colorSet.primaryColorC }
                }
            } else if (!item.isSelected && !item.is_reserved) {
                return {
                    outerContainer: { borderColor: AppStyle.colorSet.borderLightGrayColor, borderWidth: 1, backgroundColor: AppStyle.colorSet.textSecondary + '05' },
                    innerText: { color: AppStyle.colorSet.primaryColorA }
                }
            } else if (!item.isSelected && item.is_reserved) {
                return {
                    outerContainer: { borderColor: AppStyle.colorSet.borderLightGrayColor, borderWidth: 1, opacity: 0.5, backgroundColor: AppStyle.colorSet.textSecondary + '05' },
                    innerText: { color: AppStyle.colorSet.primaryColorA }
                }
            }
        }

        return (
            <View style={styles.itemContainer}>
                <View>
                    <Text style={styles.wText}>{item?.month} - {item?.week}</Text>
                    <Text style={styles.wDescription}>{item?.leftdays}</Text>
                </View>
                <TouchableOpacity
                    onPress={() => {
                        if (!item.is_reserved) {
                            let _items = [...daysPeriod].map(f => ({ ...f, isSelected: false }));
                            _items[index] = { ...item, isSelected: true };
                            setDaysPeriod(_items);
                        }
                    }}
                    style={{
                        ...styles.dateContainer,
                        ...getStyles().outerContainer
                    }}>
                    <View style={{
                        ...styles.dateSContainer,
                        borderRightColor: AppStyle.colorSet.borderLightGrayColor, borderRightWidth: 1
                    }}>
                        <Text style={{ ...styles.sDate, ...getStyles().innerText }}>{item?.show_start_date}</Text>
                        <Text style={{ ...styles.sDay, ...getStyles().innerText }}>{item?.show_start_day}</Text>
                    </View>
                    <View style={{ width: 80, ...styles.dateSContainer }}>
                        <Text style={{ ...styles.sDate, ...getStyles().innerText }}>{item?.show_end_date}</Text>
                        <Text style={{ ...styles.sDay, ...getStyles().innerText }}>{item?.show_end_day}</Text>
                    </View>
                </TouchableOpacity>
            </View >
        )
    }

    return (
        <View style={{ flex: 1, backgroundColor: AppStyle.colorSet.BGColor }}>
            <HeaderWithBack title={'Indyviews'} />
            <View style={{ margin: 16, flex: 1 }}>
                <Text style={styles.heading}>Select Your Days</Text>
                <View style={{ flex: 1, marginTop: 16 }}>
                    <FlatList
                        data={daysPeriod}
                        nestedScrollEnabled
                        key={index => 'indyview' + index + 'item'}
                        renderItem={_renderItem}
                        removeClippedSubviews={true}
                        horizontal={false}
                        showsHorizontalScrollIndicator={false}
                    />
                </View>
            </View>
            {daysPeriod?.find(f => f.isSelected) &&
                <View style={AppStyle.buttonContainerBottom}>
                    <Button text={'Next'} fill={true} handleClick={() => navigation.navigate('UploadAd', { slot: daysPeriod?.find(f => f.isSelected) })} />
                </View>}
        </View>
    )
}

export default IndyViews

const styles = StyleSheet.create({
    heading: {
        ...commonStyle('600', 16, 'primaryColorA')
    },
    itemContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 16
    },
    dateContainer: {
        borderRadius: 8,
        height: 58,
        paddingHorizontal: 14,
        paddingVertical: 10,
        flexDirection: 'row',
        alignItems: 'center'
    },
    dateSContainer: {
        width: 80,
        alignItems: 'center'
    },
    wText: {
        ...commonStyle('600', 14, 'primaryColorA'),
        lineHeight: 19.07
    },
    wDescription: {
        ...commonStyle('300', 14, 'primaryColorA'),
        lineHeight: 19.07
    },
    sDate: {
        ...commonStyle('700', 16, 'primaryColorA'),
        lineHeight: 21.79
    },
    sDay: {
        ...commonStyle('400', 12, 'primaryColorA'),
        lineHeight: 16.34
    }
})