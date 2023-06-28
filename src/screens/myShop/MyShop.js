import { Image, ImageBackground, Platform, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import AppStyle from '../../assets/styles/AppStyle'
import BackLarge from '../../assets/images/back-large.svg';
import AppConfig from '../../helpers/config';
import { commonStyle, showToastHandler, UpdatedUserInTheApp } from '../../helpers/common';
import StarRating from '../../components/Store/StarRating';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import Van from '../../assets/images/store-van.svg';
import Response from '../../assets/images/store-response.svg';
import Button from '../../components/Button';
import { useDispatch, useSelector } from 'react-redux';
import { setActivityIndicator } from '../../store/slices/appConfigSlice';
import { ServiceGetStoreDetail, ServiceGetStoreFirstCollection, ServiceGetStoreOtherCollection, ServiceGetStoreProducts } from '../../services/ProductService';
import ProductSectionStore from '../../components/Store/ProductSectionStore';
import ReviewSectionStore from '../../components/Store/ReviewSectionStore';
import AboutSectionStore from '../../components/Store/AboutSectionStore';
import PolicySectionStore from '../../components/Store/PolicySectionStore';
import { SceneMap, TabBar, TabView } from 'react-native-tab-view';
import InputField from '../../components/Input/InputField';
import { getLoginConfig } from '../../store/slices/loginConfigSlice';
import { SheetManager } from 'react-native-actions-sheet';
import { ServiceDeleteStoreImage } from '../../services/AuthServices';
import Toast from 'react-native-toast-message';

const MyShop = () => {
  const dispatch = useDispatch();
  const isFocus = useIsFocused();
  const navigation = useNavigation();
  const loginConfig = useSelector(getLoginConfig);
  const [storeId] = useState(loginConfig?.user?.store?.id);
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 'first', title: 'Products' },
    { key: 'second', title: 'Reviews' },
    { key: 'third', title: 'About' },
    { key: 'fourth', title: 'Policies' },
  ]);
  const [storeData, setStoreData] = useState(null);
  const [search, setSearch] = useState('');
  const [collections, setCollections] = useState([]);
  const [selectedCollection, setSelectedCollection] = useState(null);
  const [products, setProducts] = useState([]);
  let searchValue = ''

  useEffect(() => {
    if (storeId) {
      getStoreDetail();
      getStoreCollection();
    } else {
      navigation.pop();
    }
  }, [isFocus]);

  useEffect(() => {
    if (selectedCollection) {
      getCollectionProducts();
    }
  }, [selectedCollection, search]);

  const getStoreCollection = () => {
    ServiceGetStoreFirstCollection(storeId).then(response => {
      ServiceGetStoreOtherCollection(storeId).then(_response => {
        const combinedCollection = [response?.data, ..._response?.data];
        setCollections(combinedCollection);
        if (!selectedCollection) {
          setSelectedCollection(combinedCollection[0]);
        }
        console.log(combinedCollection[0]);
      }).catch(e => {
        showToastHandler(e, dispatch);
      });
    }).catch(e => {
      showToastHandler(e, dispatch);
    });
  }

  const getStoreDetail = () => {
    dispatch(setActivityIndicator(true));
    ServiceGetStoreDetail(storeId).then(response => {
      console.log({ response });
      dispatch(setActivityIndicator(false));
      setStoreData(response?.data);
    }).catch(e => {
      showToastHandler(e, dispatch);
    });
  }

  const getCollectionProducts = () => {
    const payload = { store_id: storeId, search_keywords: search };
    if (selectedCollection && selectedCollection?.id) {
      payload.collection_id = selectedCollection?.id;
    }
    console.log({ payload });
    ServiceGetStoreProducts(payload).then(response => {
      console.log({ response });
      setProducts(response?.data);
    }).catch(e => {
      showToastHandler(e);
    })
  }

  const FirstRoute = () => (
    <View style={{ flex: 1, backgroundColor: AppStyle.colorSet.BGColor, paddingTop: 18 }} >
      <InputField defaultValue={search} onTextChange={(t) => searchValue = t} placeholder={'Search'} onEndEditing={() => setSearch(searchValue)} />
      <ProductSectionStore
        collections={collections}
        selectedCollection={selectedCollection}
        products={products}
        setSelectedCollection={setSelectedCollection}
        storeId={storeId}
        search={search}
      />
    </View>
  );

  const SecondRoute = () => (
    <View style={{ flex: 1, backgroundColor: AppStyle.colorSet.BGColor }} >
      <ReviewSectionStore />
    </View>
  );

  const ThirdRoute = () => (
    <View style={{ flex: 1, backgroundColor: AppStyle.colorSet.BGColor }} >
      <AboutSectionStore storeData={storeData} />
    </View>
  );

  const FourthRoute = () => (
    <View style={{ flex: 1, backgroundColor: AppStyle.colorSet.BGColor }} >
      <PolicySectionStore policies={storeData?.return_policy} />
    </View>
  );

  const renderScene = SceneMap({
    first: FirstRoute,
    second: SecondRoute,
    third: ThirdRoute,
    fourth: FourthRoute,
  });

  const onImageClick = () => {
    SheetManager.show('example-two', {
      payload: {
        header: 'Choose your action',
        actions: [
          { title: 'Delete photo', value: 'delete' },
          { title: 'Upload photo', value: 'edit' }
        ],
        filterHandler: (_action) => {
          if (_action === 'delete') {
            dispatch(setActivityIndicator(true));
            ServiceDeleteStoreImage().then(async (response) => {
              console.log({ response });
              await UpdatedUserInTheApp(dispatch);
              dispatch(setActivityIndicator(false));
              Toast.show({
                type: 'success',
                text1: 'Success',
                text2: response?.data?.message,
              });
              getStoreDetail();
            }).catch(e => {
              showToastHandler(e, dispatch);
            });
          } else {
            navigation.navigate('UserImage', { action: _action, prevRoute: 'store' });
          }
        }
      }
    });
  }

  return (
    <View style={{ flex: 1, backgroundColor: AppStyle.colorSet.BGColor }}>
      <ScrollView
        showsVerticalScrollIndicator={false}>
        <TouchableOpacity onPress={onImageClick}>
          <ImageBackground
            resizeMode='cover'
            source={{ uri: storeData?.store_banner_image }}
            style={styles.imageContainer}
          >
            <View style={styles.profileContainer}>
              <Image
                source={{ uri: storeData?.store_image }}
                resizeMode='cover'
                style={styles.imageStyle}
              />
            </View>
          </ImageBackground>
        </TouchableOpacity>
        <View style={{ marginHorizontal: 16, marginBottom: 16 }}>
          <Text style={styles.name}>{storeData?.store_name}</Text>
          <Text style={styles.description}>{storeData?.seller_name}</Text>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <View style={{ height: 20, width: 90 }}>
              <StarRating rating={4} />
            </View>
          </View>
        </View>
        <View style={{ flexDirection: 'row', marginHorizontal: 16, justifyContent: 'space-between', marginBottom: 16 }}>
          <View style={{ width: '49%' }}>
            <Button text={'Manage products'} handleClick={() => navigation.navigate('ManageProducts', { storeId })} />
          </View>
          <View style={{ width: '49%' }}>
            <Button text={'Edit profile'} handleClick={() => navigation.navigate('BecomeSeller', { sellerData: loginConfig?.user?.store })} />
          </View>
        </View>
        <View style={{ marginHorizontal: 16, flexDirection: 'row', justifyContent: 'space-between' }}>
          <StoreDetail Icon={<Van />} text={'Smooth Dispatcher'} description='Has a history of dispatching orders on time' />
          <StoreDetail Icon={<Response />} text={'Speedy Replies'} description='Has a history of dispatching orders on time' />
        </View>
        <View style={{
          height: AppConfig.screenHeight - (Platform.OS === 'ios' ? 130 : 150)
        }}>
          <TabView
            navigationState={{ index, routes }}
            renderScene={renderScene}
            onIndexChange={setIndex}
            initialLayout={{ width: AppConfig.screenWidth, flex: 1 }}
            renderTabBar={props => (
              <TabBar
                {...props} style={styles.tabBarStyle}
                indicatorStyle={{
                  backgroundColor: AppStyle.colorSet.blackColor,
                }}
                renderLabel={({ focused, route }) => (
                  <Text
                    style={{
                      ...styles.tabBarLabel,
                      opacity: focused ? 1 : 0.5
                    }}>
                    {route.title}
                  </Text>
                )}
              />
            )}
            style={{ marginTop: 20, marginHorizontal: 16 }}
          />
        </View>
      </ScrollView>
    </View>
  )
}

const StoreDetail = ({ Icon, text, description }) => (
  <View style={styles.detailContainer}>
    {Icon}
    <Text style={styles.storeSText}>{text}</Text>
    <Text style={styles.storeDText} lineBreakMode='tail' numberOfLines={2}>{description}</Text>
  </View>
)

export default MyShop

const styles = StyleSheet.create({
  imageContainer: {
    width: AppConfig.screenWidth,
    height: 160,
    backgroundColor: AppStyle.colorSet.primaryColorC
  },
  buttonContainer: {
    position: 'absolute',
    left: 16,
    top: AppConfig.statusBarHeight
  },
  profileContainer: {
    position: 'absolute',
    top: 100,
    width: AppConfig.screenWidth,
    alignItems: 'center',
  },
  imageStyle: {
    width: 112,
    height: 112,
    borderRadius: 99,
    borderWidth: 8,
    borderColor: AppStyle.colorSet.borderLightGrayColor
  },
  name: {
    ...commonStyle('400', 20, 'primaryColorA'),
    marginTop: 60,
    marginBottom: 4
  },
  description: {
    ...commonStyle('400', 12, 'textSecondary'),
    lineHeight: 16.34,
    marginBottom: 4
  },
  ratingText: {
    ...commonStyle('500', 14, 'primaryColorA'),
    marginLeft: 16
  },
  detailContainer: {
    height: 114,
    width: (AppConfig.screenWidth / 2) - 20,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: AppStyle.colorSet.borderLightGrayColor,
    backgroundColor: '#F5F5F5',
    paddingHorizontal: 12,
    paddingVertical: 8
  },
  storeSText: {
    ...commonStyle('500', 14, 'primaryColorC'),
    marginVertical: 4
  },
  storeDText: {
    ...commonStyle('400', 14, 'textSecondary'),
  },
  tabBarStyle: {
    backgroundColor: AppStyle.colorSet.BGColor,
  },
  tabBarLabel: {
    ...commonStyle('500', 12, 'blackColor')
  }
})