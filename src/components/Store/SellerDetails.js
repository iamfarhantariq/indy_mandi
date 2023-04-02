import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { commonStyle } from '../../helpers/common'
import Box from '../../assets/images/box-icon.svg';
import Coment from '../../assets/images/coment-icon.svg';
// import Van from '../../assets/images/van-icon.svg';
import AppStyle from '../../assets/styles/AppStyle';
import StarRating from './StarRating';
import SmallButton from '../SmallButton';
import { useNavigation } from '@react-navigation/native';

const SellerDetails = ({ productDetail }) => {
  const navigation = useNavigation();

  const data = [
    { Icon: <Box />, text: productDetail?.seller_detail_first_line },
    { Icon: <Coment />, text: productDetail?.seller_detail_second_line },
    // { Icon: <Van />, text: 'Easy return & exchange within 15 days' },
  ]

  return (
    <View style={{ marginHorizontal: 16, marginVertical: 24 }}>
      <Text style={styles.title}>Seller details</Text>
      {data.map((item, index) => {
        const Icon = () => item.Icon;
        return (
          <View key={index + 'detail'} style={styles.textContainer}>
            <Icon />
            <Text style={styles.description}>{item.text}</Text>
          </View>
        )
      })}
      <View style={styles.profileConatiner}>
        <View style={{ flex: 1 }}>
          <View style={{ width: '100%', flexDirection: 'row', alignItems: 'center' }}>
            <Text style={{ ...styles.name, maxWidth: '58%' }}>{productDetail?.seller_name}</Text>
            <View style={{ width: '42%', height: 16, width: 90, marginLeft: 8 }}>
              <StarRating rating={3} />
            </View>
          </View>
          <Text style={styles.address}>{productDetail?.store_name}</Text>
        </View>
        <SmallButton text={'View profile'} large={false} handleClick={() => navigation.navigate('StoreScreen', { storeId: productDetail?.store_id })} />
      </View>
    </View>
  )
}

export default SellerDetails

const styles = StyleSheet.create({
  title: {
    ...commonStyle('600', 14, 'primaryColorA')
  },
  textContainer: {
    flexDirection: 'row',
    marginTop: 12,
    alignItems: 'center'
  },
  description: {
    ...commonStyle('400', 12, 'primaryColorA'),
    marginLeft: 11.13
  },
  profileConatiner: {
    flexDirection: 'row',
    marginTop: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    // height: 67,
    backgroundColor: AppStyle.colorSet.borderLightGrayColor,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  name: {
    ...commonStyle('400', 20, 'primaryColorA'),
  },
  address: {
    ...commonStyle('400', 12, 'textSecondary'),
  },
})