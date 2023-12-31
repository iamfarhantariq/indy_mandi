import { ImageBackground, Platform, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import AppStyle from '../../assets/styles/AppStyle'
import HeaderWithBack from '../../components/Headers/HeaderWithBack'
import Button from '../../components/Button'
import { commonStyle, convertToFormDataObject, showToastHandler } from '../../helpers/common'
import InputFieldBase from '../../components/Input/InputFieldBase'
import AppConfig from '../../helpers/config'
import HeadingAndDescription from '../../components/Store/HeadingAndDescription'
import UploadIcon from '../../assets/images/add-images.svg';
import { useNavigation } from '@react-navigation/native'
import { useFormik } from 'formik';
import Toast from 'react-native-toast-message';
import GetCategories from '../../components/Store/GetCategories'
import { useDispatch, useSelector } from 'react-redux'
import { getProducts } from '../../store/slices/productsSlice'
import { getLoginConfig } from '../../store/slices/loginConfigSlice';
import ImagePicker from 'react-native-image-crop-picker';
import { ServiceCreateProductToStore, ServiceUpdateProductToStore, ServiceUploadImageForStore } from '../../services/ProductService'
import { setActivityIndicator } from '../../store/slices/appConfigSlice'
import NoOfDaysDropDown from '../../components/Store/NoOfDaysDropDown'
import { useEffect } from 'react'
import { DeleteProductImage, GetProductToEdit } from '../../services/AppService'
import ClearMedia from '../../assets/images/clear-all-icon.svg';

const AddProduct = ({ route }) => {
    const params = route?.params;
    const dispatch = useDispatch();
    const navigation = useNavigation();
    const { categories } = useSelector(getProducts);
    const { user } = useSelector(getLoginConfig);
    const { other_detail } = user;
    const front_image_dimension = other_detail?.crop_dimension?.product_front_image;
    const side_image_dimension = other_detail?.crop_dimension?.product_side_image;
    const [category] = useState(categories);
    const [subCategory, setSubCategory] = useState([]);
    const [grandCategory, setGrandCategory] = useState([]);
    const [childCategory, setChildCategory] = useState([]);
    const [isReturnable, setIsReturnable] = useState(true);
    const [images, setImages] = useState([...Array(other_detail?.product_no_of_side_images + 1).keys()].map(i => ({ serverName: '', localImage: null })));
    const [videos, setVideos] = useState([...Array(other_detail?.product_no_of_vedios).keys()].map(i => ({ localPath: null, mimeVideo: null })));

    useEffect(() => {
        if (params?.product) {
            getProduct();
        }
    }, []);

    const getProduct = () => {
        dispatch(setActivityIndicator(true));
        GetProductToEdit(params?.product?.id).then(response => {
            const prevProduct = response?.data?.data;
            console.log({ prevProduct });
            setFieldValue('product_name', prevProduct?.product_name, true);
            setFieldValue('product_tags', prevProduct?.product_tags, true);
            setFieldValue('price', prevProduct?.price?.toString(), true);
            setFieldValue('offer_price', prevProduct?.offer_price?.toString(), true);
            setFieldValue('product_detail', prevProduct?.product_detail, true);
            const _images = [];
            _images[0] = { image: prevProduct?.front_image, delete_name: prevProduct?.delete_front_image_name };

            [...Array(other_detail?.product_no_of_side_images + 1).keys()].forEach((f, i) => {
                if (prevProduct?.side_images[i] && prevProduct?.side_images[i]?.image) {
                    _images.push({
                        image: prevProduct?.side_images[i]?.image,
                        delete_name: prevProduct?.side_images[i]?.delete_side_image_name
                    });
                } else {
                    _images.push({ serverName: '', localImage: null });
                }
            })
            // prevProduct?.side_images?.forEach(element => {
            //     _images.push({ image: element?.image, delete_name: element?.delete_side_image_name });
            // });
            setImages(_images);

            const _videos = [];
            [...Array(other_detail?.product_no_of_vedios).keys()].forEach((f, i) => {
                if (prevProduct?.videos[i]) {
                    _videos.push({
                        video: prevProduct?.videos[i],
                    });
                } else {
                    _videos.push({ localPath: null, mimeVideo: null });
                }
            })

            // prevProduct?.videos?.forEach(element => {
            //     _videos.push({ video: element });
            // });
            setVideos(_videos);
            console.log({ _images }, { _videos });

            setIsReturnable(prevProduct?.is_returnable === "1");
            setFieldValue('is_returnable', prevProduct?.is_returnable, true);
            setFieldValue('return_codition', prevProduct?.return_codition, true);
            setFieldValue('no_of_days', prevProduct?.no_of_days, true);

            dispatch(setActivityIndicator(false));
        }).catch(e => {
            console.log({ e });
            Toast.show({
                type: 'error',
                text1: e?.response?.data?.message,
                text2: e?.response?.data?.message,
            });
            dispatch(setActivityIndicator(false));
        })
    }

    const _initialValues = {
        product_name: '', category_id: '', subcategory_id: '', grandcategory_id: '', childcategory_id: '', product_tags: '', price: '', offer_price: '', product_detail: '', front_image: '', is_returnable: 1, no_of_days: '', return_codition: '',
    }

    const { errors, touched, values, setFieldValue, setFieldTouched, handleBlur, handleSubmit, handleReset } = useFormik({
        initialValues: _initialValues,
        onSubmit: (values) => {
            console.log({ values });

            if (params?.product) {
                values['product_id'] = params?.product?.id;
            }

            const formData = convertToFormDataObject(values);

            videos.forEach((videoPath) => {
                if (videoPath?.mimeVideo) {
                    formData.append(`vedios[]`, videoPath?.mimeVideo);
                }
                if (videoPath?.video) {
                    formData.append(`vedios[]`, videoPath?.video);
                }
            });
            images.forEach((imagePath, index) => {
                if (imagePath?.serverName && index !== 0) {
                    formData.append(`side_image[]`, imagePath?.serverName);
                }
                if (imagePath?.image && index !== 0) {
                    formData.append(`side_image[]`, imagePath?.delete_name);
                }
            });
            console.log({ formData });

            dispatch(setActivityIndicator(true));

            if (params?.product) {
                ServiceUpdateProductToStore(formData).then(async (response) => {
                    console.log({ response });
                    dispatch(setActivityIndicator(false));
                    Toast.show({
                        type: 'success',
                        text1: 'Success',
                        text2: 'Success',
                    });
                    handleReset();
                    navigation.pop();
                }).catch(e => {
                    showToastHandler(e, dispatch);
                });
            } else {
                ServiceCreateProductToStore(formData).then(async (response) => {
                    console.log({ response });
                    dispatch(setActivityIndicator(false));
                    Toast.show({
                        type: 'success',
                        text1: 'Success',
                        text2: 'Success',
                    });
                    handleReset();
                    navigation.pop();
                }).catch(e => {
                    showToastHandler(e, dispatch);
                });
            }
        },
        validationSchema: null,
    });

    const otherProps = { values, errors, touched, setFieldValue, setFieldTouched, handleBlur };

    // This handles categories childs.
    const handleOnSelect = (item, name) => {
        if (name === 'category_id' && item?.subTypes?.length) {
            setFieldValue('subcategory_id', '', true);
            setFieldValue('grandcategory_id', '', true);
            setFieldValue('childcategory_id', '', true);
            setSubCategory(item?.subTypes);
            setGrandCategory([]);
            setChildCategory([]);
        } else if (name === 'subcategory_id' && item?.subTypes?.length) {
            setFieldValue('grandcategory_id', '', true);
            setFieldValue('childcategory_id', '', true);
            setGrandCategory(item?.subTypes);
            setChildCategory([]);
        } else if (name === 'grandcategory_id' && item?.subTypes?.length) {
            setFieldValue('childcategory_id', '', true);
            setChildCategory(item?.subTypes);
        }
    }

    const ProductMedia = () => {

        const openGallery = async (_index) => {
            ImagePicker.openPicker({
                width: (_index === -1 ? front_image_dimension?.width : side_image_dimension?.width) || 400,
                height: (_index === -1 ? front_image_dimension?.height : side_image_dimension?.height) || 400,
                cropping: true,
                mediaType: 'photo',
            }).then(async image => {
                console.log(image);
                const imageUri = Platform.OS === 'ios' ? image?.sourceURL : image?.path
                const mimeImage = {
                    uri: imageUri,
                    type: image?.mime,
                    name: imageUri.split("/").pop(),
                }
                let _images = [...images];
                _images[_index].localImage = imageUri;

                const payload = {
                    type: _index === 0 ? 'product_front_image' : 'product_side_image',
                    image: mimeImage,
                };

                console.log({ payload });

                const formData = convertToFormDataObject(payload);
                console.log({ formData });

                dispatch(setActivityIndicator(true));
                ServiceUploadImageForStore(formData).then(response => {
                    console.log({ response });
                    _images[_index].serverName = response?.data?.image_name;
                    setImages(_images);
                    dispatch(setActivityIndicator(false));
                }).catch(e => {
                    showToastHandler(e, dispatch);
                });
            }).catch(e => {
                console.log({ e });
            });
        }

        const openGalleryVideos = async (_index) => {
            ImagePicker.openPicker({
                mediaType: "video",
            }).then(async video => {
                console.log(video);
                const videoUri = Platform.OS === 'ios' ? video?.sourceURL : video?.path
                const mimeVideo = {
                    uri: videoUri,
                    type: video?.mime,
                    name: videoUri.split("/").pop(),
                }
                let _vidoes = [...videos];
                _vidoes[_index].localPath = videoUri;
                _vidoes[_index].mimeVideo = mimeVideo;
                setVideos(_vidoes);
            }).catch(e => {
                console.log({ e });
            });
        }

        const MediaContainer = ({ _index, type }) => {
            const onDeleteMedia = async () => {
                if (type === 'image') {
                    const _images = [...images];
                    if (_images[_index]?.delete_name) {
                        const response = await DeleteProductImage(_images[_index]?.delete_name);
                        console.log({ response });
                    }
                    _images[_index] = { serverName: '', localImage: null };
                    setImages(_images);
                } else {
                    const _videos = [...videos];
                    _videos[_index] = { localPath: null, mimeVideo: null };
                    setVideos(_videos);
                }
            }

            return (
                <View style={{ marginTop: 3 }}>
                    {type === 'image' ?
                        <>
                            {(images[_index]?.localImage && images[_index]?.serverName) || images[_index]?.image ?
                                <ImageBackground
                                    source={{ uri: images[_index]?.localImage || images[_index]?.image }}
                                    style={styles.mediaContainerServer}
                                    imageStyle={{ borderRadius: 8, opacity: 0.7 }}
                                    resizeMode={'cover'}>
                                    <TouchableOpacity onPress={() => openGallery(_index)}>
                                        <Text style={{ ...styles.imageNameText, color: AppStyle.colorSet.primaryColorA }}>X Change</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={onDeleteMedia} style={{ position: 'absolute', top: -3, right: -3 }}>
                                        <ClearMedia />
                                    </TouchableOpacity>
                                </ImageBackground> :
                                <TouchableOpacity onPress={() => openGallery(_index)} style={styles.mediaContainer}>
                                    <UploadIcon style={{ color: 'white' }} />
                                    <Text style={styles.text}>{_index === 0 ? `Front image` : `Side image ${_index}`}</Text>
                                </TouchableOpacity>
                            }
                        </> :
                        <>
                            {videos[_index]?.localPath || videos[_index]?.video ?
                                <ImageBackground
                                    source={require('../../assets/images/play_button.jpg')}
                                    style={{ ...styles.mediaContainerServer }}
                                    imageStyle={{ borderRadius: 8, opacity: 0.7 }}
                                    resizeMode={'cover'}>
                                    <TouchableOpacity onPress={() => openGalleryVideos(_index)}>
                                        <Text style={{ ...styles.imageNameText, color: AppStyle.colorSet.primaryColorA }}>X Change</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={onDeleteMedia} style={{ position: 'absolute', top: -3, right: -3 }}>
                                        <ClearMedia />
                                    </TouchableOpacity>
                                </ImageBackground> :
                                <TouchableOpacity onPress={() => openGalleryVideos(_index)} style={styles.mediaContainer}>
                                    <UploadIcon style={{ color: 'white' }} />
                                    <Text style={styles.text}>{`Video ${_index + 1}`}</Text>
                                </TouchableOpacity>
                            }
                        </>
                    }
                </View>
            )
        }

        return (
            <View>
                <View style={{ marginTop: 33 }}>
                    <HeadingAndDescription
                        heading={'Product media'}
                        description={`You can add upto ${other_detail?.product_no_of_side_images + 1} photos & videos of the product. It is suggested to show different angles of photos to show your item's most important qualities. The video won't feature sound, so let your product do the talking!`}
                        marginHorizontal={0}
                        textAlign='center'
                    />
                </View>

                <Text style={{ ...commonStyle('600', 14, 'primaryColorA'), marginBottom: 8 }}>Images</Text>
                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                    <View style={{ flexDirection: 'row' }}>
                        <MediaContainer _image={null} _index={0} type='image' />
                        {[...Array(other_detail?.product_no_of_side_images).keys()].map((_image, _index) => (
                            <MediaContainer key={_index + 'Image'} _index={_index + 1} type='image' />
                        ))}
                    </View>
                </ScrollView>

                <Text style={{ ...commonStyle('600', 14, 'primaryColorA'), marginVertical: 8 }}>Videos</Text>
                <View style={{ flexDirection: 'row', marginBottom: 33 }}>
                    {[...Array(other_detail?.product_no_of_vedios).keys()].map((_image, _index) => (
                        <MediaContainer key={_index + 'Video'} _index={_index} type='video' />
                    ))}
                </View>

            </View>
        )
    }

    return (
        <View style={{ flex: 1, backgroundColor: AppStyle.colorSet.BGColor }}>
            <HeaderWithBack title={params?.product ? 'Edit Product' : 'Add Product'} cross={true} />

            <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
                <View style={{ marginHorizontal: 16, flex: 1, paddingBottom: 108 }}>

                    <View style={{ width: '100%', marginVertical: 16 }}>
                        <Text style={styles.middleText}>Store Details</Text>
                    </View>

                    <InputFieldBase otherProps={otherProps} title={'Title'} placeholder={'Title'} name='product_name' />
                    <GetCategories onSelect={handleOnSelect} otherProps={otherProps} placeholder={'Category-Level-1'} name='category_id' categories={category} />
                    {category?.length && subCategory?.length ?
                        <GetCategories onSelect={handleOnSelect} otherProps={otherProps} placeholder={'Category-Level-2'} name='subcategory_id' categories={subCategory} /> : null
                    }
                    {subCategory?.length && grandCategory?.length ?
                        <GetCategories onSelect={handleOnSelect} otherProps={otherProps} placeholder={'Category-Level-3'} name='grandcategory_id' categories={grandCategory} /> : null
                    }
                    {grandCategory?.length && childCategory?.length ?
                        <GetCategories onSelect={handleOnSelect} otherProps={otherProps} placeholder={'Category-Level-4'} name='childcategory_id' categories={childCategory} /> : null
                    }
                    <InputFieldBase otherProps={otherProps} title={'Meta tags'} placeholder={'season, dress, shoe'} name='product_tags' />

                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <View style={{ width: '49%' }}>
                            <InputFieldBase otherProps={otherProps} title={'Price'} placeholder={'Price'} name='price' />
                        </View>
                        <View style={{ width: '49%' }}>
                            <InputFieldBase otherProps={otherProps} title={'Discounted price'} placeholder={'Discounted price'} name='offer_price' />
                        </View>
                    </View>

                    <InputFieldBase otherProps={otherProps} title={'Description'} placeholder={'Description'} numberOfLines={2} name='product_detail' />

                    {/* <TouchableOpacity onPress={() => setOpened(!opened)} style={styles.headerContainer}>
                        <Text style={styles.headerHeading}>
                            Additional Information
                        </Text>
                        <View style={{ margin: 8 }}>
                            {opened ? <ArrowUp /> : <ArrowDown />}
                        </View>
                    </TouchableOpacity>

                    <InputFieldBase
                        otherProps={otherProps}
                        title={'Fabric'}
                        placeholder={'Fabric'}
                        value={fabric}
                        onTextChange={(t) => setFabric(t)}
                    />

                    <Text style={{ ...commonStyle('600', 14, 'primaryColorA'), marginTop: 16, marginBottom: 8 }}>Size</Text>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 16 }}>
                        {['xs', 's', 'm', 'l', 'xl', '2xl'].map((s, i) => (
                            <TouchableOpacity
                                key={i + s} onPress={() => {
                                    let _sizes = [...sizes];
                                    if (_sizes.includes(s)) {
                                        _sizes = _sizes.filter(_s => _s !== s);
                                    } else {
                                        _sizes.push(s);
                                    }
                                    setSizes(_sizes);
                                }}
                                style={{
                                    ...styles.sizeContainer,
                                    borderColor: sizes.includes(s) ? AppStyle.colorSet.primaryColorB : AppStyle.colorSet.borderLightGrayColor
                                }}>
                                <Text style={styles.sText}>{s}</Text>
                            </TouchableOpacity>
                        ))}
                    </View>

                    <InputFieldBase
                        otherProps={otherProps}
                        title={'Pattern'}
                        placeholder={'Pattern'}
                        value={pattern}
                        onTextChange={(t) => setPattern(t)}
                    />

                    <InputFieldBase
                        otherProps={otherProps}
                        title={'Neck Type'}
                        placeholder={'Neck Type'}
                        value={neckType}
                        onTextChange={(t) => setNeckType(t)}
                    />

                    <InputFieldBase
                        otherProps={otherProps}
                        title={'Sleeve length'}
                        placeholder={'Sleeve length'}
                        value={sleeveLength}
                        onTextChange={(t) => setSleeveLength(t)}
                    />

                    <InputFieldBase
                        otherProps={otherProps}
                        title={'Fit Type'}
                        placeholder={'Fit Type'}
                        value={fitType}
                        onTextChange={(t) => setFitType(t)}
                    />

                    <InputFieldBase
                        otherProps={otherProps}
                        title={'Item Weight'}
                        placeholder={'Item Weight'}
                        value={itemWeight}
                        onTextChange={(t) => setItemWeight(t)}
                    />

                    <InputFieldBase
                        otherProps={otherProps}
                        title={'Care'}
                        placeholder={'Care'}
                        value={care}
                        onTextChange={(t) => setCare(t)}
                    /> */}

                    <ProductMedia />

                    <View style={{ width: '100%', marginVertical: 16 }}>
                        <Text style={styles.middleText}>Shipping & return policy</Text>
                    </View>

                    {/* <InputFieldBase
                        otherProps={otherProps}
                        title={'Where do you ship to?*'}
                        placeholder={'All India'}
                        value={shipTo}
                        onTextChange={(t) => setShipTo(t)}
                    /> */}

                    <Text style={{ ...commonStyle('600', 14, 'primaryColorA'), marginBottom: 8 }}>Is this item returnable?</Text>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 16 }}>
                        <TouchableOpacity onPress={() => {
                            setIsReturnable(true);
                            setFieldValue('is_returnable', 1, true);
                        }}
                            style={{
                                ...styles.returnContainer,
                                borderColor: isReturnable ? AppStyle.colorSet.primaryColorB : AppStyle.colorSet.borderLightGrayColor
                            }}>
                            <Text style={styles.sText}>Yes</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => {
                            setIsReturnable(false);
                            setFieldValue('is_returnable', 0, true);
                        }}
                            style={{
                                ...styles.returnContainer,
                                borderColor: !isReturnable ? AppStyle.colorSet.primaryColorB : AppStyle.colorSet.borderLightGrayColor
                            }}>
                            <Text style={styles.sText}>No</Text>
                        </TouchableOpacity>
                    </View>

                    {isReturnable && <>
                        <NoOfDaysDropDown
                            otherProps={otherProps}
                            placeholder={'Within how many days'}
                            name='no_of_days'
                        />

                        <InputFieldBase
                            otherProps={otherProps}
                            title={'Conditions for Return'}
                            placeholder={'Conditions for Return'}
                            name='return_codition'
                        />
                    </>}

                </View>
            </ScrollView>
            <View style={AppStyle.buttonContainerBottom}>
                <Button text={params?.product ? 'Update' : 'Create'} fill={true} handleClick={() => {
                    if (images.length && images[0]?.serverName) {
                        setFieldValue('front_image', images[0]?.serverName, true);
                    }
                    if (images.length && images[0]?.image) {
                        setFieldValue('front_image', images[0]?.delete_name, true);
                    }

                    handleSubmit();
                }} />
            </View>
        </View>
    )
}

export default AddProduct

const styles = StyleSheet.create({
    middleText: {
        ...commonStyle('600', 16, 'primaryColorA'),
        textAlign: 'center'
    },
    sText: {
        ...commonStyle('400', 14, 'primaryColorA'),
        textAlign: 'center',
        textTransform: 'uppercase'
    },
    headerContainer: {
        flex: 1,
        height: 38,
        flexDirection: 'row',
        marginBottom: 8,
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    headerHeading: {
        ...commonStyle('600', 16, 'primaryColorA'),
        width: '90%',
        textAlign: 'center'
    },
    sizeContainer: {
        width: (AppConfig.windowWidth / 6) - 12,
        borderWidth: 1,
        height: 32,
        borderRadius: 22,
        justifyContent: 'center',
    },
    mediaContainer: {
        height: 88,
        width: 88,
        borderRadius: 8,
        backgroundColor: AppStyle.colorSet.primaryColorB,
        marginRight: 8,
        justifyContent: 'center',
        alignItems: 'center'
    },
    mediaContainerServer: {
        height: 88,
        width: 88,
        borderRadius: 8,
        marginRight: 8,
        justifyContent: 'center',
        alignItems: 'center'
    },
    text: {
        ...commonStyle('400', 10, 'whiteColor'),
        marginTop: 8
    },
    returnContainer: {
        width: '49%',
        borderWidth: 1,
        height: 32,
        borderRadius: 22,
        justifyContent: 'center',
    },
    imageNameText: {
        ...commonStyle('600', 12, 'primaryColorB'),
    }
})