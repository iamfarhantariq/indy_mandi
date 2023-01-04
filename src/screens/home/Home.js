import React from 'react';
import { ScrollView, View } from 'react-native';
import AppStyle from '../../assets/styles/AppStyle';
import HomeHeader from '../../components/Headers/HomeHeader';
import ProductCategories from '../../components/ProductCategories';
import CoverSection from '../../components/Products/CoverSection';
import ProductSection from '../../components/Products/ProductSection';

const Home = () => {

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
      <HomeHeader />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{ marginTop: 16, marginBottom: 24 }}>
          <ProductCategories />
        </View>

        <View style={{ marginBottom: 25.5 }}>
          <ProductSection items={items} title={'Trending Now'} />
        </View>

        <View style={{ marginBottom: 25.5 }}>
          <ProductSection items={items} title={'Curated for you'} />
        </View>

        <View style={{ marginBottom: 25.5, marginHorizontal: 16 }}>
          <CoverSection />
        </View>

        <View style={{ marginBottom: 25.5 }}>
          <ProductSection items={items} title={"Best of Editor's Pick"}
            BG={require('../../assets/images/product-section-bg.png')} />
        </View>
      </ScrollView>
    </View>
  )
}

export default Home