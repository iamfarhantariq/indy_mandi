import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import HeadingAndDescription from './HeadingAndDescription'
import InputField from '../Input/InputField'
import { useState } from 'react'

const PolicySectionStore = () => {
    const [search, setSearch] = useState('');

    return (
        <View style={{ marginVertical: 16 }}>
            <InputField value={search} onTextChange={(t) => setSearch(t)} placeholder={'Search'} />
            <View style={{ marginVertical: 16, marginHorizontal: -16 }}>
                <HeadingAndDescription
                    heading={'Shipping and Delivery'}
                    description={'A South Asian pickle, also known as Avalehikā, Pachchadi, Achaar, Athaanu, Loncha, Oorugaai, or Aavakaai is a pickled food, native to the Indian subcontinent, made from a variety of vegetables and fruits, preserved in brine, vinegar, or edible oils along with various Indian spices.'} />
            </View>
        </View>
    )
}

export default PolicySectionStore

const styles = StyleSheet.create({})