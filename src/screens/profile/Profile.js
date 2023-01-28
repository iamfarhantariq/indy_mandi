import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import AppStyle from '../../assets/styles/AppStyle'
import { commonPageStyle, commonStyle } from '../../helpers/common'
import { useState } from 'react'
import SignIn from '../../components/Profile/SignIn'
import Register from '../../components/Profile/Register'

const Profile = () => {
  const [view, setView] = useState('login');

  return (
    <View style={commonPageStyle}>
      <View style={styles.headingContainer}>
        <Text style={styles.headerText}>Profile</Text>
      </View>
      {view === 'login' ? (
        <SignIn setView={setView} />
      ) : (
        <Register setView={setView} />
      )}
    </View>
  )
}

export default Profile

const styles = StyleSheet.create({
  headingContainer: {
    paddingHorizontal: 16,
    borderBottomColor: AppStyle.colorSet.borderLightGrayColor,
    borderBottomWidth: 1,
    paddingVertical: 8
  },
  headerText: {
    ...commonStyle('500', 20, 'primaryColorA')
  }
})