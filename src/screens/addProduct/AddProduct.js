import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import AppStyle from '../../assets/styles/AppStyle'
import HeaderWithBack from '../../components/Headers/HeaderWithBack'
import Button from '../../components/Button'
import { commonStyle } from '../../helpers/common'
import InputFieldBase from '../../components/Input/InputFieldBase'
import AppConfig from '../../helpers/config'
import ArrowDown from '../../assets/images/arrow-down.svg';
import ArrowUp from '../../assets/images/arrow-up.svg';
import HeadingAndDescription from '../../components/Store/HeadingAndDescription'
import UploadIcon from '../../assets/images/add-images.svg';
import { useNavigation } from '@react-navigation/native'

const AddProduct = ({ route }) => {
    const params = route?.params;
    const navigation = useNavigation();
    const [opened, setOpened] = useState(false);
    const [title, setTitle] = useState('');
    const [category, setCategory] = useState('');
    const [metaTags, setMetaTags] = useState('');
    const [price, setPrice] = useState('');
    const [discount, setDiscount] = useState('');
    const [description, setDescription] = useState('');
    const [fabric, setFabric] = useState('');
    const [sizes, setSizes] = useState([]);
    const [pattern, setPattern] = useState('');
    const [neckType, setNeckType] = useState('');
    const [sleeveLength, setSleeveLength] = useState('');
    const [fitType, setFitType] = useState('');
    const [itemWeight, setItemWeight] = useState('');
    const [care, setCare] = useState('');
    const [shipTo, setShipTo] = useState('');
    const [isReturnable, setIsReturnable] = useState(true);
    const [days, setDays] = useState('');
    const [condition, setCondition] = useState('');

    const GeneralInfo = () => (
        <View>
            <InputFieldBase
                title={'Title'}
                placeholder={'Title'}
                value={title}
                onTextChange={(t) => setTitle(t)}
            />
            <InputFieldBase
                title={'Category'}
                placeholder={'Category'}
                value={category}
                onTextChange={(t) => setCategory(t)}
            />
            <InputFieldBase
                title={'Meta tags'}
                placeholder={'Meta tags'}
                value={metaTags}
                onTextChange={(t) => setMetaTags(t)}
            />

            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <View style={{ width: '49%' }}>
                    <InputFieldBase
                        title={'Price'}
                        placeholder={'Price'}
                        value={price}
                        onTextChange={(t) => setPrice(t)}
                    />
                </View>
                <View style={{ width: '49%' }}>
                    <InputFieldBase
                        title={'Discounted price'}
                        placeholder={'Discounted price'}
                        value={discount}
                        onTextChange={(t) => setDiscount(t)}
                    />
                </View>
            </View>

            <InputFieldBase
                title={'Description'}
                placeholder={'Description'}
                value={description}
                numberOfLines={2}
                onTextChange={(t) => setDescription(t)}
            />
        </View>
    )

    const SubTypes = () => opened && (
        <View>
            <InputFieldBase
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
                title={'Pattern'}
                placeholder={'Pattern'}
                value={pattern}
                onTextChange={(t) => setPattern(t)}
            />

            <InputFieldBase
                title={'Neck Type'}
                placeholder={'Neck Type'}
                value={neckType}
                onTextChange={(t) => setNeckType(t)}
            />

            <InputFieldBase
                title={'Sleeve length'}
                placeholder={'Sleeve length'}
                value={sleeveLength}
                onTextChange={(t) => setSleeveLength(t)}
            />

            <InputFieldBase
                title={'Fit Type'}
                placeholder={'Fit Type'}
                value={fitType}
                onTextChange={(t) => setFitType(t)}
            />

            <InputFieldBase
                title={'Item Weight'}
                placeholder={'Item Weight'}
                value={itemWeight}
                onTextChange={(t) => setItemWeight(t)}
            />

            <InputFieldBase
                title={'Care'}
                placeholder={'Care'}
                value={care}
                onTextChange={(t) => setCare(t)}
            />

        </View>
    );

    const ProductMedia = (props) => {
        const MediaContainer = () => (
            <TouchableOpacity onPress={() => navigation.navigate('CropImage')} style={styles.mediaContainer}>
                <UploadIcon style={{ color: 'white' }} />
                <Text style={styles.text}>Side image {props._index}</Text>
            </TouchableOpacity>
        )

        return (
            <View>
                <View style={{ marginTop: 33 }}>
                    <HeadingAndDescription
                        heading={'Product media'}
                        description={"You can add upto 5 photos & videos of the product. It is suggested to show different angles of photos to show your item's most important qualities. The video won't feature sound, so let your product do the talking!"}
                        marginHorizontal={0}
                        textAlign='center'
                    />
                </View>

                <Text style={{ ...commonStyle('600', 14, 'primaryColorA'), marginBottom: 8 }}>Images</Text>
                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                    <View style={{ flexDirection: 'row' }}>
                        {[1, 2, 3, 4, 5].map((_image, _index) => (
                            <MediaContainer _image={_image} _index={_index} />
                        ))}
                    </View>
                </ScrollView>

                <Text style={{ ...commonStyle('600', 14, 'primaryColorA'), marginVertical: 8 }}>Videos</Text>
                <View style={{ flexDirection: 'row', marginBottom: 33 }}>
                    {[1, 2].map((_image, _index) => (
                        <MediaContainer _image={_image} _index={_index} />
                    ))}
                </View>

            </View>
        )
    }

    const ShipReturnPolicy = () => (
        <View>
            <InputFieldBase
                title={'Where do you ship to?*'}
                placeholder={'All India'}
                value={shipTo}
                onTextChange={(t) => setShipTo(t)}
            />

            <Text style={{ ...commonStyle('600', 14, 'primaryColorA'), marginBottom: 8 }}>Is this item returnable?</Text>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 16 }}>
                <TouchableOpacity onPress={() => setIsReturnable(true)}
                    style={{
                        ...styles.returnContainer,
                        borderColor: isReturnable ? AppStyle.colorSet.primaryColorB : AppStyle.colorSet.borderLightGrayColor
                    }}>
                    <Text style={styles.sText}>Yes</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setIsReturnable(false)}
                    style={{
                        ...styles.returnContainer,
                        borderColor: !isReturnable ? AppStyle.colorSet.primaryColorB : AppStyle.colorSet.borderLightGrayColor
                    }}>
                    <Text style={styles.sText}>No</Text>
                </TouchableOpacity>
            </View>

            {isReturnable && <>
                <InputFieldBase
                    title={'Within how many days?'}
                    placeholder={'Within how many days'}
                    value={days}
                    onTextChange={(t) => setDays(t)}
                />

                <InputFieldBase
                    title={'Conditions for Return'}
                    placeholder={'Conditions for Return'}
                    value={condition}
                    onTextChange={(t) => setCondition(t)}
                />
            </>}
        </View>
    )

    return (
        <View style={{ flex: 1, backgroundColor: AppStyle.colorSet.BGColor }}>
            <HeaderWithBack title={params?.product ? 'Edit Product' : 'Add Product'} cross={true} />

            <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
                <View style={{ marginHorizontal: 16, flex: 1, paddingBottom: 108 }}>

                    <View style={{ width: '100%', marginVertical: 16 }}>
                        <Text style={styles.middleText}>Store Details</Text>
                    </View>

                    <GeneralInfo />

                    <TouchableOpacity onPress={() => setOpened(!opened)} style={styles.headerContainer}>
                        <Text style={styles.headerHeading}>
                            Additional Information
                        </Text>
                        <View style={{ margin: 8 }}>
                            {opened ? <ArrowUp /> : <ArrowDown />}
                        </View>
                    </TouchableOpacity>

                    <SubTypes />

                    <ProductMedia />

                    <View style={{ width: '100%', marginVertical: 16 }}>
                        <Text style={styles.middleText}>Shipping & return policy</Text>
                    </View>

                    <ShipReturnPolicy />

                </View>
            </ScrollView>
            <View style={{ ...AppStyle.buttonContainerBottom, flexDirection: 'row', justifyContent: 'space-between' }}>
                <View style={{ width: '49%' }}>
                    <Button text={'Preview'} handleClick={() => navigation.navigate('BuyPlan')} />
                </View>
                <View style={{ width: '49%' }}>
                    <Button text={'Save'} fill={true} handleClick={() => navigation.navigate('BuyPlan')} />
                </View>
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
    }
})