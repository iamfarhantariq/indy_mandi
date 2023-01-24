import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import ImagesSlider from '../../components/Store/ImagesSlider'
import ProductName from '../../components/Store/ProductName';
import SellerDetails from '../../components/Store/SellerDetails';
import AppStyle from '../../assets/styles/AppStyle';
import Button from '../../components/Button';
import DeliveryDetails from '../../components/Store/DeliveryDetails';
import HeadingAndDescription from '../../components/Store/HeadingAndDescription';
import AddToCart from '../../components/Store/AddToCart';
import Reviews from '../../components/Store/Reviews';
import ProductSection from '../../components/Products/ProductSection';

const ProductDetail = () => {
    const d1 = 'This Straw Backpack is handwoven in the Marrakech of Morocco, from a palm leaf. It is a "Slow Fashion" product representing everything that is eco, more'
    const d2 = 'Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet.'

    const items = [
        { name: 'New Nike girl shoe', price: '$80.77', imageSource: require('../../assets/images/demo-category-image.jpeg') },
        { name: 'New Nike girl shoe', price: '$80.77', imageSource: require('../../assets/images/demo-category-image.jpeg') },
        { name: 'New Nike girl shoe', price: '$80.77', imageSource: require('../../assets/images/demo-category-image.jpeg') },
        { name: 'New Nike girl shoe', price: '$80.77', imageSource: require('../../assets/images/demo-category-image.jpeg') },
        { name: 'New Nike girl shoe', price: '$80.77', imageSource: require('../../assets/images/demo-category-image.jpeg') },
        { name: 'New Nike girl shoe', price: '$80.77', imageSource: require('../../assets/images/demo-category-image.jpeg') },
      ];

    return (
        <View style={{ flex: 1, backgroundColor: AppStyle.colorSet.BGColor }}>
            <ScrollView nestedScrollEnabled showsVerticalScrollIndicator={false}>
                <ImagesSlider />
                <ProductName />
                <View style={{ marginHorizontal: 16 }}>
                    <Button text={'Buy it now'} handleClick={() => null} />
                </View>
                <SellerDetails />
                <DeliveryDetails />
                <HeadingAndDescription heading={'Product details'} description={d1} />
                <HeadingAndDescription heading={'About the brand '} description={d2} />
                <Reviews />
                <View style={{ marginVertical: 25.5 }}>
                    <ProductSection items={items} title={'More products from this shop'} />
                </View>
                <View style={{ marginBottom: 25.5 }}>
                    <ProductSection items={items} title={'Similar Brands in this category'} />
                </View>
            </ScrollView>
            <AddToCart />
        </View>
    )
}

export default ProductDetail
