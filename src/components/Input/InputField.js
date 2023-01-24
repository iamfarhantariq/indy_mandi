import React, { useState } from 'react';
import {
    StyleSheet,
    Image,
    View,
    TextInput,
    TouchableOpacity,
    Keyboard,
} from 'react-native';
import AppStyle from '../../assets/styles/AppStyle';
import ClearAll from '../../assets/images/clear-all-icon.svg';
import SortIcon from '../../assets/images/sort-icon.svg'
import SmallButton from '../SmallButton';

function InputField({
    value = '',
    placeholder = 'Search',
    filterIcon = false,
    filterHandler = null,
    onTextChange,
    secure = false,
    dark = false,
    handleDone = null,
    leftButton = false,
    leftButtonText = '',
    handleLeftButton = null,
    solidBorder = false,
}) {
    const [openFilters, setOpenFilters] = useState(false);

    return (
        <View style={styles.container}>
            <View style={{
                ...styles.inputView, height: dark ? 44 : 40,
                borderColor: solidBorder ? AppStyle.colorSet.primaryColorB : AppStyle.colorSet.borderLightGrayColor
            }}>
                <TextInput style={styles.input} secureTextEntry={secure} value={value} placeholder={placeholder}
                    placeholderTextColor={AppStyle.colorSet.textPlaceholderColor}
                    onSubmitEditing={(i) => {
                        Keyboard.dismiss();
                        if (handleDone) {
                            handleDone(value);
                        }
                    }}
                    onChangeText={(it) => {
                        onTextChange(it);
                    }} />
                {value &&
                    <TouchableOpacity style={{ padding: 10 }} onPress={() => onTextChange('')}>
                        <ClearAll />
                    </TouchableOpacity>}
                {leftButton &&
                    <View style={{ marginRight: 10 }}>
                        <SmallButton text={leftButtonText} fill={true} handleClick={handleLeftButton} />
                    </View>}
            </View>
            {filterIcon &&
                <TouchableOpacity onPress={() => setOpenFilters(true)} style={{ marginLeft: 8 }}>
                    <SortIcon />
                </TouchableOpacity>
            }
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    inputView: {
        flex: 1,
        borderWidth: 1,
        borderRadius: 20,
        backgroundColor: AppStyle.colorSet.BGColor,
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'row',
    },
    input: {
        flex: 1,
        overflow: 'hidden',
        paddingVertical: 10.5,
        paddingHorizontal: 16,
        color: AppStyle.colorSet.primaryColorA,
        fontSize: 14,
        fontWeight: '400'
    },
    rightIconContainer: {
        backgroundColor: '#fff',
        flex: 1,
        right: 5,
        justifyContent: 'center',
        alignItems: 'center',
    },
    leftIconContainer: {
        backgroundColor: '#fff',
        flex: 1,
        left: 5,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default InputField;
