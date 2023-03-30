import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { commonPageStyle, commonStyle } from '../../helpers/common'
import AppStyle from '../../assets/styles/AppStyle'
import Minus from '../../assets/images/minus-btn-icon.svg'
import Plus from '../../assets/images/plus-btn-icon.svg'
import More from '../../assets/images/more-icon.svg'
import InputFieldBase from '../../components/Input/InputFieldBase';
import { useDispatch, useSelector } from 'react-redux'
import { getLoginConfig, updateCounter } from '../../store/slices/loginConfigSlice'

const Cart = () => {
  const { cart } = useSelector(getLoginConfig);
  const dispatch = useDispatch();

  // const items = [
  //   {
  //     products: [
  //       {
  //         imageSource: require('../../assets/images/demo-category-image.jpeg'),
  //         name: 'New Nike girl shoe', price: '$80.77', totalPrice: '$400'
  //       },
  //       {
  //         imageSource: require('../../assets/images/demo-category-image.jpeg'),
  //         name: 'New Nike girl shoe', price: '$80.77', totalPrice: '$400'
  //       },
  //     ],
  //     seller: { name: 'Vedaka' }
  //   },
  //   {
  //     products: [
  //       {
  //         imageSource: require('../../assets/images/demo-category-image.jpeg'),
  //         name: 'New Nike girl shoe', price: '$80.77', totalPrice: '$400'
  //       }
  //     ],
  //     seller: { name: 'Vedaka' }
  //   },
  //   {
  //     products: [
  //       {
  //         imageSource: require('../../assets/images/demo-category-image.jpeg'),
  //         name: 'New Nike girl shoe', price: '$80.77', totalPrice: '$400'
  //       }
  //     ],
  //     seller: { name: 'Vedaka' }
  //   }
  // ];

  const getTotalSumPrice = () => {
    return cart.map(f => (
      (f?.offer_price ? f?.offer_price : f?.price) * f.count
    )).reduce((p, c) => p + c, 0)
  }

  const ProductItem = ({ item, index }) => {
    const priceToShow = item?.offer_price ? item?.offer_price : item?.price;

    return (
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 16 }}>
        <View style={{ width: '70%', flexDirection: 'row' }}>
          <Image source={{ uri: item?.image }} resizeMode='cover'
            style={styles.imageStyle} />
          <View>
            <Text style={{ ...styles.pIHeading, width: '99.8%' }}>{item.name?.trim()}</Text>
            <Text style={styles.pIPrice}>₹{priceToShow}</Text>
            <Text style={styles.pIPrice}>Total: ₹{priceToShow * item?.count}</Text>
          </View>
        </View>
        <View style={{ width: '30%', flexDirection: 'row', justifyContent: 'space-between' }}>
          <TouchableOpacity onPress={() => item?.count > 1 && dispatch(updateCounter({ id: item?.id, action: 'decrement' }))}>
            <Minus />
          </TouchableOpacity>
          <Text style={styles.counter}>{item?.count}</Text>
          <TouchableOpacity onPress={() => dispatch(updateCounter({ id: item?.id, action: 'increment' }))}>
            <Plus />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => null}>
            <More />
          </TouchableOpacity>
        </View>
      </View>
    )
  }

  const ProductContainer = ({ item, index }) => {

    return (
      <View style={styles.productContainer}>

        <View>
          {/* <FlatList
            data={item?.products}
            horizontal={false}
            renderItem={ProductItem}
            key={index => 'item' + index + 'category'}
            showsVerticalScrollIndicator={false}
            nestedScrollEnabled
          /> */}
          <ProductItem item={item} index={index} />
        </View>

        <View style={{ marginVertical: 16 }}>
          <InputFieldBase
            title={'Send a message to seller'}
            placeholder={'Hi Vedaka Is this available?'}
            value={'Hi Vedaka Is this available?'}
            editable={false}
            leftButtonText={'send'}
            leftButton={true}
            solidBorder={true}
          />
        </View>
      </View>
    )
  }

  return (
    <View style={commonPageStyle}>
      <View style={styles.headingContainer}>
        <Text style={styles.headerText}>Shopping Cart</Text>
      </View>

      <View style={styles.priceContainer}>
        <Text style={styles.pHeading}>Total price of {cart?.length} products</Text>
        <Text style={styles.pPrice}>₹{getTotalSumPrice()}</Text>
      </View>

      <View style={{ marginHorizontal: 16, flex: 1 }}>
        <FlatList
          data={cart}
          horizontal={false}
          renderItem={ProductContainer}
          key={index => 'item' + index + 'product'}
          showsVerticalScrollIndicator={false}
          nestedScrollEnabled
        />
      </View>
    </View>
  )
}

export default Cart

const styles = StyleSheet.create({
  headingContainer: {
    paddingHorizontal: 16,
    borderBottomColor: AppStyle.colorSet.borderLightGrayColor,
    borderBottomWidth: 1,
    paddingVertical: 8
  },
  headerText: {
    ...commonStyle('500', 20, 'primaryColorA')
  },
  priceContainer: {
    marginHorizontal: 16,
    marginTop: 26,
    height: 88,
    padding: 16,
    borderRadius: 8,
    backgroundColor: AppStyle.colorSet.borderLightGrayColor
  },
  pHeading: {
    ...commonStyle('700', 12, 'primaryColorA'),
    marginBottom: 8,
  },
  pPrice: {
    ...commonStyle('600', 32, 'primaryColorA'),
    lineHeight: 43.53
  },
  productContainer: {
    borderBottomColor: AppStyle.colorSet.borderLightGrayColor,
    borderBottomWidth: 1,
  },
  imageStyle: {
    width: 56,
    height: 56,
    borderRadius: 8,
    marginRight: 12
  },
  pIHeading: {
    ...commonStyle('400', 16, 'primaryColorA'),
    lineHeight: 21.78,
    marginBottom: 4
  },
  pIPrice: {
    ...commonStyle('600', 14, 'primaryColorA'),
    lineHeight: 19.07,
    marginBottom: 4
  },
  counter: {
    ...commonStyle('600', 16, 'primaryColorA'),
    lineHeight: 24
  }
})