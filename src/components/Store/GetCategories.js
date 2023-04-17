import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import DropDownPicker from 'react-native-dropdown-picker';
import DownArrow from '../../assets/images/d-a.svg';
import UpArrow from '../../assets/images/u-a.svg';
import AppStyle from '../../assets/styles/AppStyle';
import { useEffect } from 'react';
import { commonStyle } from '../../helpers/common';

const GetCategories = ({
    otherProps = null,
    value = '',
    name = '',
    categories,
    placeholder,
    onSelect
}) => {
    const [open, setOpen] = useState(false);
    const [items, setItems] = useState([]);
    const [pickerValue, setPickerValue] = useState(otherProps.values[name]);

    useEffect(() => {
        setItems(categories?.map(p => ({
            label: p?.name, value: p
        })))
    }, [categories]);

    return (
        <View style={{
            marginBottom: 16, zIndex:
                name === 'category_id' ? 5 :
                    name === 'subcategory_id' ? 4 :
                        name === 'grandcategory_id' ? 3 :
                            2
        }}>
            <Text style={styles.textStyle}>{placeholder}</Text>
            <DropDownPicker
                open={open}
                value={pickerValue}
                items={items}
                setOpen={setOpen}
                setValue={setPickerValue}
                setItems={setItems}
                dropDownDirection={'BOTTOM'}
                itemKey={'label'}
                closeAfterSelecting={true}
                placeholder={placeholder}
                maxHeight={2000}
                itemSeparator={true}
                showTickIcon={true}
                dropDownStyle={{ backgroundColor: AppStyle.colorSet.BGColor }}
                closeOnBackPressed={true}
                listMode='SCROLLVIEW'
                itemSeparatorStyle={{ opacity: 0.1 }}
                ArrowDownIconComponent={() => <DownArrow />}
                ArrowUpIconComponent={() => <UpArrow />}
                onChangeValue={(v) => {
                    otherProps.setFieldValue(name, v?.id, true);
                    otherProps.setFieldTouched(name, true, true);
                    onSelect(v, name);
                }}
                placeholderStyle={{
                    fontWeight: '400',
                    fontSize: 14,
                    color: AppStyle.colorSet.textPlaceholderColor,
                    marginLeft: 6,
                    marginEnd: 8,
                }}
                labelStyle={commonStyle('400', 14, 'colorPrimaryA')}
                style={{
                    borderColor: otherProps?.errors[name] && otherProps?.touched[name] ?
                        '#E67F7F' : AppStyle.colorSet.primaryColorB,
                    borderWidth: 1,
                    borderRadius: 20,
                    minHeight: 44,
                    backgroundColor: AppStyle.colorSet.BGColor,
                    alignItems: 'center',
                    justifyContent: 'space-between',
                }}
            />
        </View>
    )
}

export default GetCategories

const styles = StyleSheet.create({
    textStyle: {
        ...commonStyle('600', 14, 'primaryColorA'),
        marginBottom: 8,
    }
})