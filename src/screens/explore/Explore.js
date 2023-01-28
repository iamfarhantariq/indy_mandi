import { useNavigation } from '@react-navigation/native';
import React from 'react'
import { useState } from 'react';
import { View } from 'react-native'
import AppStyle from '../../assets/styles/AppStyle';
import TabViewExplore from '../../components/Explore/TabViewExplore';
import InputField from '../../components/Input/InputField';
import AppConfig from '../../helpers/config';

const Explore = () => {
  const navigation = useNavigation();
  const [search, setSearch] = useState('');

  return (
    <View style={{ flex: 1, backgroundColor: AppStyle.colorSet.BGColor, marginTop: AppConfig.statusBarHeight }}>
      <View style={{ marginHorizontal: 16, marginVertical: 8 }}>
        <InputField value={search} onTextChange={(t) => setSearch(t)} placeholder={'Search'} />
      </View>
      <TabViewExplore />
    </View>
  )
}

export default Explore;