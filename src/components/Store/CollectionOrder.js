import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import DropDownPicker from 'react-native-dropdown-picker';
import DownArrow from '../../assets/images/d-a.svg';
import UpArrow from '../../assets/images/u-a.svg';
import AppStyle from '../../assets/styles/AppStyle';
import { commonStyle } from '../../helpers/common';

const CollectionOrder = ({ handleChange, collectionOrder }) => {
    const [open, setOpen] = useState(false);
    const [items, setItems] = useState([
        { label: 'Low to high price', value: 'lthp' },
        { label: 'High to low price', value: 'htlp' },
        { label: 'Newest first', value: 'nf' },
        { label: 'Oldest first', value: 'of' },
    ]);
    const [pickerValue, setPickerValue] = useState(collectionOrder);

    return (
        <View>
            <DropDownPicker
                open={open}
                value={pickerValue}
                items={items}
                setOpen={setOpen}
                setValue={setPickerValue}
                setItems={setItems}
                listMode={'SCROLLVIEW'}
                closeAfterSelecting={true}
                placeholder={'Order of collection for customer'}
                itemSeparator={true}
                showTickIcon={true}
                dropDownStyle={{ backgroundColor: AppStyle.colorSet.BGColor }}
                closeOnBackPressed={true}
                itemSeparatorStyle={{ opacity: 0.1 }}
                ArrowDownIconComponent={() => <DownArrow />}
                ArrowUpIconComponent={() => <UpArrow />}
                onChangeValue={(v) => {
                    handleChange(v)
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
                    borderColor: AppStyle.colorSet.primaryColorB,
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

export default CollectionOrder

const styles = StyleSheet.create({})