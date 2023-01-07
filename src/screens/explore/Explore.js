import { useNavigation } from '@react-navigation/native';
import React from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
import AppConfig from '../../helpers/config';

const Explore = () => {
  const navigation = useNavigation();
  return (
    <View style={{ marginTop: AppConfig.statusBarHeight }}>
      <Text>Hello Explore Here</Text>
      <TouchableOpacity onPress={()=> navigation.navigate('BlogsScreen')}>
        <Text>Click here for blogs</Text>
      </TouchableOpacity>
    </View>
  )
}

export default Explore;