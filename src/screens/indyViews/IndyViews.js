import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import HeaderWithBack from '../../components/Headers/HeaderWithBack'
import AppStyle from '../../assets/styles/AppStyle'
import { commonStyle } from '../../helpers/common'
import { useState } from 'react'
import Button from '../../components/Button'
import { useNavigation } from '@react-navigation/native'

const IndyViews = () => {
    const navigation = useNavigation();

    const items = [
        { text: 'Dec - Week ', period: { startDate: '16 Dec', startDay: 'Friday', endDate: '22 Dec', endDay: 'Thursday' }, isSelected: false, disabled: false },
        { text: 'Dec - Week ', period: { startDate: '16 Dec', startDay: 'Friday', endDate: '22 Dec', endDay: 'Thursday' }, isSelected: true, disabled: false },
        { text: 'Dec - Week ', period: { startDate: '16 Dec', startDay: 'Friday', endDate: '22 Dec', endDay: 'Thursday' }, isSelected: false, disabled: false },
        { text: 'Dec - Week ', period: { startDate: '16 Dec', startDay: 'Friday', endDate: '22 Dec', endDay: 'Thursday' }, isSelected: false, disabled: true },
        { text: 'Dec - Week ', period: { startDate: '16 Dec', startDay: 'Friday', endDate: '22 Dec', endDay: 'Thursday' }, isSelected: false, disabled: false },
    ];

    const [daysPeriod, setDaysPeriod] = useState(items);

    const _renderItem = ({ item, index }) => {

        const getStyles = () => {
            if (item.isSelected) {
                return {
                    outerContainer: { backgroundColor: AppStyle.colorSet.primaryColorA },
                    innerText: { color: AppStyle.colorSet.primaryColorC }
                }
            } else if (!item.isSelected && !item.disabled) {
                return {
                    outerContainer: { borderColor: AppStyle.colorSet.borderLightGrayColor, borderWidth: 1, backgroundColor: AppStyle.colorSet.textSecondary + '05' },
                    innerText: { color: AppStyle.colorSet.primaryColorA }
                }
            } else if (!item.isSelected && item.disabled) {
                return {
                    outerContainer: { borderColor: AppStyle.colorSet.borderLightGrayColor, borderWidth: 1, opacity: 0.5, backgroundColor: AppStyle.colorSet.textSecondary + '05' },
                    innerText: { color: AppStyle.colorSet.primaryColorA }
                }
            }
        }

        return (
            <View style={styles.itemContainer}>
                <View>
                    <Text style={styles.wText}>{item.text} {index}</Text>
                    {item.isSelected && <Text style={styles.wDescription}>(3 days left)</Text>}
                </View>
                <TouchableOpacity
                    onPress={() => {
                        if (!item.disabled) {
                            let _items = [...items].map(f => ({...f, isSelected: false}));
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
                        <Text style={{ ...styles.sDate, ...getStyles().innerText }}>{item.period.startDate}</Text>
                        <Text style={{ ...styles.sDay, ...getStyles().innerText }}>{item.period.startDay}</Text>
                    </View>
                    <View style={{ width: 80, ...styles.dateSContainer }}>
                        <Text style={{ ...styles.sDate, ...getStyles().innerText }}>{item.period.endDate}</Text>
                        <Text style={{ ...styles.sDay, ...getStyles().innerText }}>{item.period.endDay}</Text>
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
                        horizontal={false}
                        showsHorizontalScrollIndicator={false}
                    />
                </View>
            </View>
            <View style={AppStyle.buttonContainerBottom}>
                <Button text={'Next'} fill={true} handleClick={() => navigation.navigate('UploadAd')} />
            </View>
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