import { FlatList, ImageBackground, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import AppStyle from '../../assets/styles/AppStyle'
import CoverFrame from './CoverFrame'
import { useNavigation } from '@react-navigation/native'
import RedirectImage from '../../assets/images/redirect-with-indyviews.svg';
import AppConfig from '../../helpers/config'

const CoverSection = ({ title, items = [], detailed = true, discoverOption }) => {
    const navigation = useNavigation();

    let itemsToShow = [
        ...items
    ]
    if (title !== 'Blogs') {
        itemsToShow.push({ view: true })
    }

    const _renderItem = ({ item, index }) => {
        return (
            <>
                {item?.view ?
                    <TouchableOpacity onPress={() => navigation.navigate('IndyViews')}>
                        <RedirectImage height={303} width={303} />
                    </TouchableOpacity> :
                    <TouchableOpacity onPress={() => navigation.navigate('BlogContentScreen')}>
                        <CoverFrame item={item} index={index} detailed={detailed} />
                    </TouchableOpacity>}
            </>
        )
    }

    return (
        <View>
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                <Text style={styles.heading}>{title}</Text>
                {discoverOption &&
                    <TouchableOpacity onPress={() => navigation.navigate('BlogsScreen')}>
                        <Text style={styles.discoverText}>Discover</Text>
                    </TouchableOpacity>
                }
            </View>
            <FlatList
                horizontal
                data={itemsToShow}
                key={(index) => 'Indyview' + index + 'cover'}
                renderItem={_renderItem}
                showsHorizontalScrollIndicator={false}
            />
        </View>
    )
}

export default CoverSection;

const styles = StyleSheet.create({
    heading: {
        fontSize: 16,
        fontWeight: '600',
        color: AppStyle.colorSet.blackColor,
        marginBottom: 8
    },
    discoverText: {
        fontSize: 12,
        fontWeight: '400',
        color: AppStyle.colorSet.blackColor,
    }
})