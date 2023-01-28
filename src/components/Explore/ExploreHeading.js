import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import Sort from '../../assets/images/sort-icon.svg';
import { commonStyle } from '../../helpers/common';

const ExploreHeading = ({ title, isFilter = true, filterHandler = null }) => {
    return (
        <View style={styles.container}>
            <Text style={styles.heading}>{title}</Text>
            {isFilter && <TouchableOpacity onPress={filterHandler}>
                <Sort />
            </TouchableOpacity>}
        </View>
    )
}

export default ExploreHeading

const styles = StyleSheet.create({
    container: {
        marginVertical: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    heading: {
        ...commonStyle('500', 20, 'primaryColorA'),
        color: '#003166'
    }
})