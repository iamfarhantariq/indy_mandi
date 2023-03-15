import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import Sort from '../../assets/images/sort-icon.svg';
import { commonStyle } from '../../helpers/common';
import { SheetManager } from 'react-native-actions-sheet';

const ExploreHeading = ({ title, isFilter = true, filterHandler = null }) => {
    const filters = [
        { title: 'Relevancy', value: 'relevancy' },
        { title: 'Asc', value: 'asc' },
        { title: 'Desc', value: 'desc' },
    ]

    return (
        <View style={styles.container}>
            <Text style={styles.heading}>{title}</Text>
            {isFilter && <TouchableOpacity onPress={() => {
                SheetManager.show('example-two', {
                    payload: { header: 'Sort by', actions: filters, filterHandler }
                });
            }}>
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