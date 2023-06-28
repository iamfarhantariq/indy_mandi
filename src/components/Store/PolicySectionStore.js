import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import HeadingAndDescription from './HeadingAndDescription'
import InputField from '../Input/InputField'
import { useState } from 'react'

const PolicySectionStore = ({policies}) => {
    // const [search, setSearch] = useState('');

    return (
        <View style={{ marginVertical: 16 }}>
            {/* <InputField value={search} onTextChange={(t) => setSearch(t)} placeholder={'Search'} /> */}
            <View style={{ marginVertical: 16, marginHorizontal: -16 }}>
                <HeadingAndDescription
                    heading={'Shipping and Delivery'}
                    description={policies} />
            </View>
        </View>
    )
}

export default PolicySectionStore

const styles = StyleSheet.create({})