import React, { useEffect, useState } from 'react';
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
import { useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { ServiceGetCategoriesCircle, ServiceGetIndyViewBlogsStories, ServiceGetTrendingCuratedEditorsProducts } from '../../services/ProductService';
import { showToastHandler } from '../../helpers/common';
import { setCircleCategoriesStore, setHomeProducts, setHomeSections } from '../../store/slices/productsSlice';


const Home = ({ route }) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [products, setProducts] = useState(null);
  const [sections, setSections] = useState(null);
  const [circleCategories, setCircleCategories] = useState([]);

  useEffect(() => {
    getHomeSectionProducts();
    getHomeOtherSections();
    getCircleCategories();
  }, []);

  const getHomeSectionProducts = () => {
    ServiceGetTrendingCuratedEditorsProducts().then(response => {
      console.log({ response });
      setProducts(response?.data);
      dispatch(setHomeProducts(response?.data));
    }).catch(e => {
      showToastHandler(e);
    });
  }

  const getHomeOtherSections = () => {
    ServiceGetIndyViewBlogsStories().then(response => {
      console.log({ response });
      setSections(response?.data);
      dispatch(setHomeSections(response?.data));
    }).catch(e => {
      showToastHandler(e);
    });
  }

  const getCircleCategories = () => {
    ServiceGetCategoriesCircle().then(response => {
      console.log({ response });
      setCircleCategories(response?.data);
      dispatch(setCircleCategoriesStore(response?.data));
    }).catch(e => {
      showToastHandler(e);
    });
  }

  return (
    <View style={{ flex: 1, backgroundColor: AppStyle.colorSet.BGColor }}>
      <HomeHeader route={route} />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{ marginTop: 16, marginBottom: 24 }}>
          <ProductCategories data={circleCategories}/>
        </View>

        <View style={{ marginBottom: 25.5 }}>
          <ProductSection items={products?.trending_now || []} title={'Trending Now'} />
        </View>

        <View style={{ marginBottom: 25.5 }}>
          <ProductSection items={products?.curated_for_you || []} title={'Curated for you'} color={AppStyle.colorSet.primaryColorC}
            route={'CuratedForYouScreen'} />
        </View>

        <View style={{ marginBottom: 25.5, marginHorizontal: 16 }}>
          <CoverSection title={'Indyview'} items={sections?.indyviews || []} detailed={true} discoverOption={false} />
        </View>

        <View style={{ marginBottom: 25.5 }}>
          <ProductSection items={products?.editor_picks || []} title={"Best of Editor's Pick"}
            BG={require('../../assets/images/product-section-bg.png')}
            route={'EditorChoiceScreen'} />
        </View>

        <View style={{ marginBottom: 25.5, marginHorizontal: 16 }}>
          <CoverSection title={'Blogs'} items={sections?.blog_posts || []} detailed={false} discoverOption={true} />
        </View>

        <View style={{ marginHorizontal: 16 }}>
          <SellerStory title={'Seller Story'} item={sections?.seller_story}/>
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