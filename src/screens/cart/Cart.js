import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { commonPageStyle, commonStyle } from '../../helpers/common'
import AppStyle from '../../assets/styles/AppStyle'
import Minus from '../../assets/images/minus-btn-icon.svg'
import Plus from '../../assets/images/plus-btn-icon.svg'
import More from '../../assets/images/more-icon.svg'
import InputFieldBase from '../../components/Input/InputFieldBase'

const Cart = () => {

  const items = [
    {
      products: [
        {
          imageSource: require('../../assets/images/demo-category-image.jpeg'),
          name: 'New Nike girl shoe', price: '$80.77', totalPrice: '$400'
        },
        {
          imageSource: require('../../assets/images/demo-category-image.jpeg'),
          name: 'New Nike girl shoe', price: '$80.77', totalPrice: '$400'
        },
      ],
      seller: { name: 'Vedaka' }
    },
    {
      products: [
        {
          imageSource: require('../../assets/images/demo-category-image.jpeg'),
          name: 'New Nike girl shoe', price: '$80.77', totalPrice: '$400'
        }
      ],
      seller: { name: 'Vedaka' }
    },
    {
      products: [
        {
          imageSource: require('../../assets/images/demo-category-image.jpeg'),
          name: 'New Nike girl shoe', price: '$80.77', totalPrice: '$400'
        }
      ],
      seller: { name: 'Vedaka' }
    }
  ];

  const ProductItem = ({ item, index }) => (
    <View style={{ flexDirection: 'row', marginTop: 16 }}>
      <View style={{ width: '70%', flexDirection: 'row' }}>
        <Image source={item.imageSource} resizeMode='cover'
          style={styles.imageStyle} />
        <View>
          <Text style={styles.pIHeading}>{item.name}</Text>
          <Text style={styles.pIPrice}>{item.price}</Text>
          <Text style={styles.pIPrice}>Total: {item.totalPrice}</Text>
        </View>
      </View>
      <View style={{ width: '30%', flexDirection: 'row', justifyContent: 'space-between' }}>
        <TouchableOpacity onPress={() => null}>
          <Minus />
        </TouchableOpacity>
        <Text style={styles.counter}>5</Text>
        <TouchableOpacity onPress={() => null}>
          <Plus />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => null}>
          <More />
        </TouchableOpacity>
      </View>
    </View>
  )

  const ProductContainer = ({ item, index }) => {

    return (
      <View style={styles.productContainer}>

        <View>
          <FlatList
            data={item?.products}
            horizontal={false}
            renderItem={ProductItem}
            key={index => 'item' + index + 'category'}
            showsVerticalScrollIndicator={false}
            nestedScrollEnabled
          />
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
        <Text style={styles.pHeading}>Total price of 4 products</Text>
        <Text style={styles.pPrice}>$3000.22</Text>
      </View>

      <View style={{ marginHorizontal: 16, flex: 1 }}>
        <FlatList
          data={items}
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