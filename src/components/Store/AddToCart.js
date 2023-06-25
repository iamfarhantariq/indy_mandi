import { Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import AppStyle from '../../assets/styles/AppStyle'
import { commonStyle } from '../../helpers/common'
import Minus from '../../assets/images/minus-btn-icon.svg'
import Plus from '../../assets/images/plus-btn-icon.svg'
import Button from '../Button'
import { useDispatch, useSelector } from 'react-redux'
import { getLoginConfig, setAddToCart, updateCounter } from '../../store/slices/loginConfigSlice'

const AddToCart = ({ productDetail }) => {
    const dispatch = useDispatch();
    const [counter, setCounter] = useState(1);
    const { cart } = useSelector(getLoginConfig);

    const getCount = () => cart?.find(c => c?.id === productDetail?.id)?.count || counter;

    const updateCount = (type, value) => {
        if (cart.find(c => c?.id === productDetail?.id)) {
            dispatch(updateCounter({ id: productDetail?.id, action: type }))
        }
        setCounter(counter + value);
    }

    return (
        <View style={styles.container}>
            <View style={styles.leftContainer}>
                <Text style={styles.title}>Quantity</Text>
                <TouchableOpacity onPress={() => counter > 1 && updateCount('decrement', -1)}>
                    <Minus />
                </TouchableOpacity>
                <Text style={styles.counter}>{getCount()}</Text>
                <TouchableOpacity onPress={() => updateCount('increment', +1)}>
                    <Plus />
                </TouchableOpacity>
            </View>
            <View style={{ width: 163.5 }}>
                <Button fill={true}
                    text={cart?.find(c => c?.id === productDetail?.id) ? "Added" : "Add to cart"}
                    handleClick={() => {
                        dispatch(setAddToCart({ ...productDetail, count: counter }));
                    }} />
            </View>
        </View>
    )
}

export default AddToCart

const styles = StyleSheet.create({
    container: {
        backgroundColor: AppStyle.colorSet.BGColor,
        borderColor: AppStyle.colorSet.borderLightGrayColor,
        borderWidth: 1,
        height: 82,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        paddingTop: 8.5
    },
    leftContainer: {
        flexDirection: 'row',
        height: 44,
        alignItems: 'center'
    },
    title: {
        ...commonStyle('400', 16, 'primaryColorA'),
        marginRight: 12,
    },
    counter: {
        ...commonStyle('600', 16, 'primaryColorA'),
        marginHorizontal: 12
    }
})