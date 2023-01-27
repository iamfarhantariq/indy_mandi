import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import InputField from '../Input/InputField'
import { useState } from 'react';
import HeadingAndDescription from './HeadingAndDescription';
import Tag from '../../assets/images/tag-icon.svg';
import Calendar from '../../assets/images/calendar-icon.svg';
import AppStyle from '../../assets/styles/AppStyle';
import { commonStyle } from '../../helpers/common';

const AboutSectionStore = () => {
    const [search, setSearch] = useState('');

    const data = [
        { Icon: <Tag />, title: '500 sales' },
        { Icon: <Calendar />, title: 'Member since AUG 2022' },
    ]

    return (
        <View style={{ marginVertical: 16 }}>
            <InputField value={search} onTextChange={(t) => setSearch(t)} placeholder={'Search'} />
            <View style={{ marginVertical: 16, marginHorizontal: -16 }}>
                <HeadingAndDescription
                    heading={'About our shop'}
                    description={'A South Asian pickle, also known as Avalehikā, Pachchadi, Achaar, Athaanu, Loncha, Oorugaai, or Aavakaai is a pickled food, native to the Indian subcontinent, made from a variety of vegetables and fruits, preserved in brine, vinegar, or edible oils along with various Indian spices.'} />
            </View>
            <View style={{ flexDirection: 'row' }}>
                {
                    data.map((item, i) => (
                        <View key={i} style={{ ...styles.container, marginRight: i === 0 ? 8 : 0 }}>
                            {item.Icon}
                            <Text style={styles.text}>{item.title}</Text>
                        </View>
                    ))
                }
            </View>
        </View>
    )
}

export default AboutSectionStore

const styles = StyleSheet.create({
    container: {
        height: 40,
        borderWidth: 1,
        borderRadius: 8,
        borderColor: '#EEEEEE',
        flexDirection: 'row',
        padding: 11,
        backgroundColor: AppStyle.colorSet.BGColor,
        alignContent: 'center'
    },
    text: {
        ...commonStyle('600', 14, 'primaryColorB'),
        marginLeft: 10.99
    }
})