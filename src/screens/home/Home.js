import React from 'react';
import { View } from 'react-native';
import AppStyle from '../../assets/styles/AppStyle';
import HomeHeader from '../../components/Headers/HomeHeader';
import ProductCategories from '../../components/ProductCategories';

const Home = () => {
  return (
    <View style={{ flex: 1, backgroundColor: AppStyle.colorSet.BGColor }}>
      <HomeHeader />
      <View style={{ marginTop: 16, marginBottom: 24 }}>
        <ProductCategories />
      </View>
    </View>
  )
}

export default Home