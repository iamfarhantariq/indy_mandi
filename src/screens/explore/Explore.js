import { useNavigation } from '@react-navigation/native';
import React, { useEffect } from 'react'
import { useState } from 'react';
import { View } from 'react-native'
import { useDispatch } from 'react-redux';
import AppStyle from '../../assets/styles/AppStyle';
import TabViewExplore from '../../components/Explore/TabViewExplore';
import InputField from '../../components/Input/InputField';
import { showToastHandler } from '../../helpers/common';
import AppConfig from '../../helpers/config';
import { ServiceExploreData } from '../../services/ExploreService';
import { setActivityIndicator } from '../../store/slices/appConfigSlice';

const Explore = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [search, setSearch] = useState('');
  const [sortBy, setSortBy] = useState('relevancy'); // relevancy, asc, desc
  const [searchType, setSearchType] = useState('products');
  const [data, setData] = useState([]);

  useEffect(() => {
    setData([]);
    ExploreSearch();
  }, [search, searchType]);

  const ExploreSearch = () => {
    const payload = { type: searchType, sort_by: sortBy, search_keywords: search }
    ServiceExploreData(payload).then((response) => {
      console.log({ response });
      setData(response?.data);
    }).catch(e => {
      showToastHandler(e);
    });
  }

  return (
    <View style={{ flex: 1, backgroundColor: AppStyle.colorSet.BGColor, marginTop: AppConfig.statusBarHeight }}>
      <View style={{ marginHorizontal: 16, marginVertical: 8 }}>
        <InputField value={search} onTextChange={(t) => setSearch(t)} placeholder={'Search'} />
      </View>
      <TabViewExplore setSearchType={setSearchType} data={data} />
    </View>
  )
}

export default Explore;