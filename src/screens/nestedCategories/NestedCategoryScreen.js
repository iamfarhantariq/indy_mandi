import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { useState } from 'react';
import AppStyle from '../../assets/styles/AppStyle'
import HeaderWithBack from '../../components/Headers/HeaderWithBack';
import Accordion from 'react-native-collapsible/Accordion';
import ArrowDown from '../../assets/images/arrow-down.svg';
import ArrowUp from '../../assets/images/arrow-up.svg';
import { useNavigation } from '@react-navigation/native';

const NestedCategoryScreen = () => {
    const navigation = useNavigation();
    const [activeCategories, setActiveCategories] = useState([]);

    const data = [
        {
            type: 'Men', parent: true, subTypes: [
                { type: 'All men', subTypes: [] },
                {
                    type: 'Formal wear', subTypes: [
                        { type: 'Shirt', subTypes: [], lastChild: true, },
                        { type: 'T-Shirt', subTypes: [], lastChild: true, },
                        { type: 'Jeans', subTypes: [], lastChild: true, },
                        { type: 'Jackets', subTypes: [], lastChild: true, },
                    ]
                },
                {
                    type: 'Ethintic wear', subTypes: []
                },
                {
                    type: 'Casual wear', subTypes: [
                        { type: 'Shirt', subTypes: [], lastChild: true, },
                        { type: 'T-Shirt', subTypes: [], lastChild: true, },
                        { type: 'Jeans', subTypes: [], lastChild: true, },
                        { type: 'Jackets', subTypes: [], lastChild: true, },
                    ]
                },
            ]
        },
        {
            type: 'Women', parent: true, subTypes: [
                { type: 'All Women', subTypes: [] },
                {
                    type: 'Formal wear', subTypes: [
                        { type: 'Shirt', subTypes: [], lastChild: true, },
                        { type: 'T-Shirt', subTypes: [], lastChild: true, },
                        { type: 'Jeans', subTypes: [], lastChild: true, },
                        { type: 'Jackets', subTypes: [], lastChild: true, },
                    ]
                },
                {
                    type: 'Ethintic wear', subTypes: []
                },
                {
                    type: 'Casual wear', subTypes: [
                        { type: 'Shirt', subTypes: [], lastChild: true, },
                        { type: 'T-Shirt', subTypes: [], lastChild: true, },
                        { type: 'Jeans', subTypes: [], lastChild: true, },
                        { type: 'Jackets', subTypes: [], lastChild: true, },
                    ]
                },
            ]
        },
        {
            type: 'Children', parent: true, subTypes: [
                { type: 'All Women', subTypes: [] },
                {
                    type: 'Formal wear', subTypes: [
                        { type: 'Shirt', subTypes: [], lastChild: true, },
                        { type: 'T-Shirt', subTypes: [], lastChild: true, },
                        { type: 'Jeans', subTypes: [], lastChild: true, },
                        { type: 'Jackets', subTypes: [], lastChild: true, },
                    ]
                },
                {
                    type: 'Ethintic wear', subTypes: []
                },
                {
                    type: 'Casual wear', subTypes: [
                        { type: 'Shirt', subTypes: [], lastChild: true, },
                        { type: 'T-Shirt', subTypes: [], lastChild: true, },
                        { type: 'Jeans', subTypes: [], lastChild: true, },
                        { type: 'Jackets', subTypes: [], lastChild: true, },
                    ]
                },
            ]
        }
    ]

    const _updateSections = (activeCategories) => {
        setActiveCategories(activeCategories);
    }

    const _renderSectionTitle = (item, index, isActive) => {
        return (
            <Header
                title={item?.type}
                isAccordian={item?.subTypes?.length > 0}
                background={item?.parent ? true : false}
                light={item?.lastChild ? true : false}
                parent={item?.parent ? true : false}
            // opened={isActive}
            />
        )
    }

    const _renderContent = (item) => {
        return <RenderContent item={item} />
    }

    const Header = ({ title, isAccordian = true, parent = false, background = false, opened = false, light = false }) => {
        return (
            <View style={{
                ...styles.headerContainer,
                backgroundColor: background ? AppStyle.colorSet.borderLightGrayColor : 'transparent'
            }}>
                <Text style={{
                    ...styles.headerHeading, fontWeight: light ? '400' : '600',
                    marginLeft: parent ? 0 : 16
                }}>
                    {title}
                </Text>
                {isAccordian &&
                    <View style={{ margin: 8 }}>
                        {opened ? <ArrowUp /> : <ArrowDown />}
                    </View>
                }
                {light && <TouchableOpacity
                    style={{ position: 'absolute', top: 0, bottom: 0, left: 0, right: 0, zIndex: 1 }}
                    onPress={() => navigation.navigate('MainCategoryScreen')}
                />}
            </View>
        )
    }


    const RenderContent = ({ item }) => {
        const [_activeCategories, _setActiveCategories] = useState([]);

        const __updateSections = (__activeCategories) => {
            _setActiveCategories(__activeCategories);
        }

        return (
            <View>
                <Accordion
                    sections={item?.subTypes}
                    activeSections={_activeCategories}
                    renderHeader={_renderSectionTitle}
                    renderContent={_renderContent}
                    onChange={__updateSections}
                    easing={'linear'}
                    duration={400}
                    underlayColor={'transparent'}
                />
            </View>

        )
    }

    return (
        <View style={{ backgroundColor: AppStyle.colorSet.BGColor, flex: 1 }}>
            <HeaderWithBack title={'Clothing categories'} cross={true} />
            <ScrollView showsVerticalScrollIndicator={false} style={{ marginHorizontal: 16, marginVertical: 24 }}>
                <Header title={'All clothing'} isAccordian={false} background={true} parent={true} />
                <Accordion
                    sections={data}
                    activeSections={activeCategories}
                    renderHeader={_renderSectionTitle}
                    renderContent={_renderContent}
                    onChange={_updateSections}
                    duration={400}
                    easing={'linear'}
                    underlayColor={'transparent'}
                />
            </ScrollView>
        </View>
    )
}

export default NestedCategoryScreen

const styles = StyleSheet.create({
    headerContainer: {
        flex: 1,
        height: 38,
        flexDirection: 'row',
        marginBottom: 8,
        borderRadius: 8,
        alignItems: 'center'
    },
    headerHeading: {
        padding: 8,
        fontSize: 16,
        color: AppStyle.colorSet.primaryColorA,
        flex: 1
    }
})