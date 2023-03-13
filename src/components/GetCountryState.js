import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import DropDownPicker from 'react-native-dropdown-picker';
import DownArrow from '../assets/images/d-a.svg';
import UpArrow from '../assets/images/u-a.svg';
import { useSelector } from 'react-redux';
import { getAppConfig } from '../store/slices/appConfigSlice';
import AppStyle from '../assets/styles/AppStyle';
import { commonStyle } from '../helpers/common';

const GetCountryState = ({ otherProps = null, value = '', name = '' }) => {
    const appConfig = useSelector(getAppConfig);
    const [open, setOpen] = useState(false);
    const [items, setItems] = useState(appConfig?.countryStates?.map(p => ({
        label: p, value: p
    })));
    const [pickerValue, setPickerValue] = useState('');

    return (
        <View style={{ marginBottom: 16, zIndex: 1 }}>
            <Text style={styles.textStyle}>States</Text>
            <DropDownPicker
                open={open}
                value={pickerValue}
                items={items}
                setOpen={setOpen}
                setValue={setPickerValue}
                setItems={setItems}
                closeAfterSelecting={true}
                zIndex={100}
                listMode={'SCROLLVIEW'}
                maxHeight={170}
                placeholder={'States'}
                itemSeparator={true}
                showTickIcon={true}
                dropDownDirection='BOTTOM'
                dropDownStyle={{ backgroundColor: AppStyle.colorSet.BGColor, }}
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
                    flex: 1,
                    backgroundColor: AppStyle.colorSet.BGColor,
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    flexDirection: 'row',
                }}
            />
        </View>
    )
}

export default GetCountryState

const styles = StyleSheet.create({
    textStyle: {
        ...commonStyle('600', 14, 'primaryColorA'),
        marginBottom: 8,
    }
})