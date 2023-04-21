import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import DropDownPicker from 'react-native-dropdown-picker';
import DownArrow from '../../assets/images/d-a.svg';
import UpArrow from '../../assets/images/u-a.svg';
import AppStyle from '../../assets/styles/AppStyle';
import { commonStyle } from '../../helpers/common';

DropDownPicker.setListMode("MODAL");

const NoOfDaysDropDown = ({ otherProps = null, value = '', name = '' }) => {
    const [open, setOpen] = useState(false);
    const [items, setItems] = useState([]);
    const [pickerValue, setPickerValue] = useState(otherProps.values[name]);

    useEffect(() => {
        setItems([1, 2, 3, 4, 5]?.map(p => ({
            label: p, value: p
        })))
    }, []);

    return (
        <View style={{ marginBottom: 16, zIndex: 1 }}>
            <Text style={styles.textStyle}>Within how many days?</Text>
            <DropDownPicker
                open={open}
                value={pickerValue}
                items={items}
                setOpen={setOpen}
                setValue={setPickerValue}
                setItems={setItems}
                closeAfterSelecting={true}
                placeholder={'Within how many days?'}
                itemSeparator={true}
                showTickIcon={true}
                dropDownStyle={{ backgroundColor: AppStyle.colorSet.BGColor }}
                closeOnBackPressed={true}
                itemSeparatorStyle={{ opacity: 0.1 }}
                ArrowDownIconComponent={() => <DownArrow />}
                ArrowUpIconComponent={() => <UpArrow />}
                onChangeValue={(v) => {
                    otherProps.setFieldValue(name, v, true);
                    otherProps.setFieldTouched(name, true, true);
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

export default NoOfDaysDropDown;

const styles = StyleSheet.create({
    textStyle: {
        ...commonStyle('600', 14, 'primaryColorA'),
        marginBottom: 8,
    }
})