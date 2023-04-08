import { FlatList, Platform, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { useNavigation } from '@react-navigation/native';
import AppConfig from '../../helpers/config';
import BackLarge from '../../assets/images/back-large.svg';
import AppStyle from '../../assets/styles/AppStyle';
import GeneralProduct from '../../components/Products/GeneralProduct';
import InputField from '../../components/Input/InputField';

const EditorChoiceScreen = () => {
  const navigation = useNavigation();
  const [search, setSearch] = useState('');

  const items = [
    { name: 'New Nike girl shoe', price: '$80.77', imageSource: require('../../assets/images/demo-category-image.jpeg') },
    { name: 'New Nike girl shoe', price: '$80.77', imageSource: require('../../assets/images/demo-category-image.jpeg') },
    { name: 'New Nike girl shoe', price: '$80.77', imageSource: require('../../assets/images/demo-category-image.jpeg') },
    { name: 'New Nike girl shoe', price: '$80.77', imageSource: require('../../assets/images/demo-category-image.jpeg') },
    { name: 'New Nike girl shoe', price: '$80.77', imageSource: require('../../assets/images/demo-category-image.jpeg') },
    { name: 'New Nike girl shoe', price: '$80.77', imageSource: require('../../assets/images/demo-category-image.jpeg') },
  ]


  const _renderItem = ({ item, index }) => {
    return (
      <View style={{ marginBottom: 16, paddingRight: index % 2 == 0 ? 8 : 0, paddingLeft: index % 2 == 0 ? 0 : 8 }}>
        <GeneralProduct item={item} index={index} flex={true} />
      </View>
    )
  }

  const Header = () => {
    return (
      <View style={styles.headerContainer}>
        <TouchableOpacity style={styles.buttonContainer} onPress={() => navigation.pop()}>
          <BackLarge />
        </TouchableOpacity>

        <Text style={styles.nameText}>
          Curated Picks by our experts, locally & globally
        </Text>

        <View style={styles.floatingContainer}>
          <Text style={styles.floatingHeading}>
            Editor’s choice
          </Text>
          <Text style={styles.floatingDescription}>
            Curated Picks by our experts, locally & globally
          </Text>
        </View>
      </View>
    )
  }

  return (
    <View style={{ flex: 1, flexDirection: 'column' }}>
      <Header />
      <View style={{ flex: 1, marginTop: 121 / 2, paddingBottom: Platform.OS === 'ios' ? 10 : 0, backgroundColor: AppStyle.colorSet.BGColor }}>
        <View style={{ marginHorizontal: 16, marginVertical: 18 }}>
          <InputField value={search} onTextChange={(t) => setSearch(t)} filterIcon={true} />
        </View>

        <FlatList
          data={items}
          key={index => 'category' + index + 'main-product'}
          renderItem={_renderItem}
          horizontal={false}
          numColumns={2}
          
          showsVerticalScrollIndicator={false}
          style={{ marginHorizontal: 16 }}
        />
      </View>
    </View>
  )
}

export default EditorChoiceScreen;

const styles = StyleSheet.create({
  headerContainer: {
    width: AppConfig.screenWidth,
    height: 247,
    backgroundColor: AppStyle.colorSet.primaryColorC,
  },
  buttonContainer: {
    position: 'absolute',
    left: 16,
    top: AppConfig.statusBarHeight
  },
  nameText: {
    fontWeight: '600',
    fontSize: 20,
    color: AppStyle.colorSet.primaryColorA,
    zIndex: -1,
    lineHeight: 27.24,
    textAlignVertical: 'center',
    textAlign: 'center',
    top: '45%',
    left: '15%',
    right: '15%',
    width: '70%',
  },
  floatingContainer: {
    height: 121,
    width: '80%',
    position: 'absolute',
    top: 247 - (121 / 2),
    left: '10%',
    right: '10%',
    marginHorizontal: 'auto',
    zIndex: 1,
    borderRadius: 8,
    backgroundColor: AppStyle.colorSet.primaryColorA,
    paddingVertical: 24,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: '15%',
  },
  floatingHeading: {
    fontWeight: '600',
    fontSize: 20,
    color: AppStyle.colorSet.primaryColorC
  },
  floatingDescription: {
    fontWeight: '400',
    fontSize: 14,
    color: AppStyle.colorSet.whiteColor,
    textAlign: 'center',
    lineHeight: 19.07,
    marginTop: 8
  }
})