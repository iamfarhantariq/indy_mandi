import React from 'react';
import { ScrollView, View } from 'react-native';
import AppStyle from '../../assets/styles/AppStyle';
import HomeHeader from '../../components/Headers/HomeHeader';
import ProductCategories from '../../components/ProductCategories';
import CoverSection from '../../components/Products/CoverSection';
import ProductSection from '../../components/Products/ProductSection';
import SellerStory from '../../components/SellerStory';
import Email from '../../assets/images/email-icon.svg';
import Facebook from '../../assets/images/facebook-icon.svg';
import Instagram from '../../assets/images/insta-icon.svg';


const Home = ({ route }) => {
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
      <HomeHeader route={route} />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{ marginTop: 16, marginBottom: 24 }}>
          <ProductCategories />
        </View>

        <View style={{ marginBottom: 25.5 }}>
          <ProductSection items={items} title={'Trending Now'} />
        </View>

        <View style={{ marginBottom: 25.5 }}>
          <ProductSection items={items} title={'Curated for you'} color={AppStyle.colorSet.primaryColorC}
            route={'CuratedForYouScreen'} />
        </View>

        <View style={{ marginBottom: 25.5, marginHorizontal: 16 }}>
          <CoverSection title={'Indyview'} detailed={true} discoverOption={false} />
        </View>

        <View style={{ marginBottom: 25.5 }}>
          <ProductSection items={items} title={"Best of Editor's Pick"}
            BG={require('../../assets/images/product-section-bg.png')}
            route={'EditorChoiceScreen'} />
        </View>

        <View style={{ marginBottom: 25.5, marginHorizontal: 16 }}>
          <CoverSection title={'Blogs'} detailed={false} discoverOption={true} />
        </View>

        <View style={{ marginHorizontal: 16 }}>
          <SellerStory title={'Seller Story'} />
        </View>

        <View style={{ marginVertical: 45, flexDirection: 'row', marginHorizontal: '20%', justifyContent: 'space-evenly' }}>
          <Email />
          <Facebook />
          <Instagram />
        </View>

      </ScrollView>
    </View>
  )
}

export default Home;