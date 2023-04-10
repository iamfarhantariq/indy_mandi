import { LayoutAnimation, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect } from 'react'
import { useState } from 'react';
import AppStyle from '../../assets/styles/AppStyle'
import HeaderWithBack from '../../components/Headers/HeaderWithBack';
import ArrowDown from '../../assets/images/arrow-down.svg';
import ArrowUp from '../../assets/images/arrow-up.svg';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { getProducts } from '../../store/slices/productsSlice';

const NestedCategoryScreen = () => {
    const navigation = useNavigation();
    const products = useSelector(getProducts);
    const [data, setData] = useState([]);
    const [active, setActive] = useState(null);

    useEffect(() => {
        setData(products?.categories);
    }, [products?.categories])

    const Header = ({ i, active, setActive, subTypes, category }) => {
        const onPress = () => {
            LayoutAnimation.easeInEaseOut();
            setActive(i == active ? null : i);
        };
        const [subTypeActive, setSubTypeActive] = useState(null);
        const open = active == i;
        return (
            <TouchableOpacity onPress={onPress} activeOpacity={1} style={{
                ...styles.headerContainer,
                backgroundColor: category?.level === "1" ? AppStyle.colorSet.borderLightGrayColor : 'transparent'
            }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Text style={{
                        ...styles.headerHeading, fontWeight: category?.level !== "1" ? '400' : '600',
                        marginLeft: isNaN((Number(category?.level) * 10)) ? 0 : Number(category?.level) * 10
                    }}>
                        {category?.name}
                    </Text>
                    {subTypes?.length > 0 ? <View style={{ margin: 8 }}>{open ? <ArrowUp /> : <ArrowDown />}</View> : null}
                </View>
                {open &&
                    subTypes?.map((item, index) => {
                        if (item?.subTypes?.length) {
                            return (
                                <Header
                                    key={item?.name}
                                    active={subTypeActive}
                                    i={index}
                                    setActive={setSubTypeActive}
                                    subTypes={item?.subTypes}
                                    category={item}
                                />
                            );
                        }
                        return (
                            <TouchableOpacity key={item?.name} onPress={() => {
                                navigation.navigate('MainCategoryScreen', { category: item });
                            }}>
                                <Text key={item?.name} style={{
                                    ...styles.headerHeading, fontWeight: item?.level !== "1" ? '400' : '600',
                                    marginLeft: isNaN((Number(item?.level) * 10)) ? 0 : Number(item?.level) * 10
                                }}>
                                    {item?.name}
                                </Text>
                            </TouchableOpacity>
                        );
                    })}
            </TouchableOpacity>
        )
    }

    return (
        <View style={{ backgroundColor: AppStyle.colorSet.BGColor, flex: 1 }}>
            <HeaderWithBack title={'Clothing categories'} cross={true} />
            <ScrollView showsVerticalScrollIndicator={false} style={{ marginHorizontal: 16, marginVertical: 24 }}>
                {data?.length ?
                    data?.map((item, index) => {
                        return (
                            <Header
                                key={item?.name}
                                active={active}
                                i={index}
                                setActive={setActive}
                                subTypes={item?.subTypes}
                                category={item}
                            />
                        )
                    })
                    : null}
            </ScrollView>
        </View>
    )
}

export default NestedCategoryScreen

const styles = StyleSheet.create({
    headerContainer: {
        minHeight: 38,
        marginBottom: 8,
        borderRadius: 8,
        width: '100%',
        overflow: 'hidden',
    },
    headerHeading: {
        padding: 8,
        fontSize: 16,
        color: AppStyle.colorSet.primaryColorA,
        flex: 1
    }
})