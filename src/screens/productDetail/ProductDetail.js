import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
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
import { useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import { ServiceGetProductDetail } from '../../services/ProductService';
import { showToastHandler } from '../../helpers/common';
import { setActivityIndicator } from '../../store/slices/appConfigSlice';
import OrientationLocker from 'react-native-orientation-locker';
import VideoPlayer from 'react-native-video-controls';

const ProductDetail = ({ route }) => {
    const { productId } = route?.params;
    const dispatch = useDispatch();
    const navigation = useNavigation();
    const [productDetail, setProductDetail] = useState(null);
    const [moreProducts, setMoreProducts] = useState([]);
    const [similarProducts, setSimilarProducts] = useState([]);
    const [videoLink, setVideoLink] = useState('');

    useEffect(() => {
        if (videoLink) {
            OrientationLocker.unlockAllOrientations();
            OrientationLocker.lockToLandscape();
        } else {
            OrientationLocker.lockToPortrait();
        }

        return () => {
            OrientationLocker.lockToPortrait();
        }
    }, [videoLink]);

    useEffect(() => {
        if (productId) {
            getProductDetails();
        } else {
            navigation.pop();
        }
    }, [productId]);

    const getProductDetails = () => {
        dispatch(setActivityIndicator(true));
        ServiceGetProductDetail(productId).then(response => {
            // ServiceGetProductDetail(160).then(response => {
            console.log({ response });
            dispatch(setActivityIndicator(false));
            setProductDetail(response?.data?.product);
            setMoreProducts(response?.data?.more_products);
            setSimilarProducts(response.data.similar_products);
        }).catch(e => {
            showToastHandler(e, dispatch);
        });
    }

    const getLinks = () => {
        let links = [];

        if (productDetail?.side_images) {
            productDetail?.side_images?.forEach(element => {
                links.push(element?.image);
            });
        }
        if (productDetail?.videos) {
            productDetail?.videos.forEach(element => {
                links.push(element);
            });
        }

        return links;
    }

    return (
        <View style={{ flex: 1, backgroundColor: AppStyle.colorSet.BGColor }}>
            <ScrollView style={{ flex: 1 }} horizontal={false} nestedScrollEnabled showsVerticalScrollIndicator={false}>
                <ImagesSlider images={getLinks()} setVideoLink={setVideoLink} />
                <ProductName productDetail={productDetail} />
                <View style={{ marginHorizontal: 16 }}>
                    <Button text={'Buy it now'} handleClick={() => null} />
                </View>
                <SellerDetails productDetail={productDetail} />
                <HeadingAndDescription heading={'Product details'} description={productDetail?.product_detail} />
                <HeadingAndDescription heading={'About the brand '} description={productDetail?.about_brand} />
                <Reviews />
                <View style={{ marginVertical: 25.5, minHeight: 190 }}>
                    <ProductSection items={moreProducts} title={'More products from this shop'} />
                </View>
                <View style={{ marginBottom: 25.5, minHeight: 190 }}>
                    <ProductSection items={similarProducts} title={'Similar Brands in this category'} />
                </View>
            </ScrollView>
            <AddToCart productDetail={productDetail} />
            {videoLink && (
                <VideoPlayer
                    source={{ uri: videoLink }}
                    resizeMode={'contain'}
                    tapAnywhereToPause={true}
                    playInBackground={false}
                    onBack={() => {
                        setVideoLink('')
                    }}
                    style={{
                        flex: 1,
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        bottom: 0,
                        right: 0,
                        zIndex: 100,
                    }}
                />
            )}
        </View>
    )
}

export default ProductDetail
