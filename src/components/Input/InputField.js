import React, { useState } from 'react';
import {
    StyleSheet,
    View,
    TextInput,
    TouchableOpacity,
    Keyboard,
    Text,
} from 'react-native';
import AppStyle from '../../assets/styles/AppStyle';
import ClearAll from '../../assets/images/clear-all-icon.svg';
import SortIcon from '../../assets/images/sort-icon.svg'
import SmallButton from '../SmallButton';
import { commonStyle } from '../../helpers/common';

function InputField({
    otherProps = null,
    value = '',
    name = '',
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
    numberOfLines = 1,
    inputMode = 'text',
    keyboardType = 'default',
    editable = true,
}) {
    // const { values, errors, touched, setFieldTouched, setFieldValue, handleBlur } = otherProps;
    const [openFilters, setOpenFilters] = useState(false);

    console.log(otherProps, name);

    return (
        <View>
            <View style={styles.container}>
                <View style={{
                    ...styles.inputView, height: numberOfLines > 1 ? 44 * numberOfLines : dark ? 44 : 40,
                    paddingVertical: numberOfLines > 1 ? 8 : 0,
                    borderColor: solidBorder ?
                        otherProps && otherProps?.errors[name] && otherProps?.touched[name] ?
                            '#E67F7F' : AppStyle.colorSet.primaryColorB :
                        AppStyle.colorSet.borderLightGrayColor
                }}>
                    <TextInput style={styles.input}
                        secureTextEntry={secure}
                        value={otherProps ? otherProps?.values[name] : value}
                        placeholder={placeholder}
                        placeholderTextColor={otherProps &&
                             otherProps?.errors[name] && otherProps?.touched[name] ?
                            '#E67F7F' : AppStyle.colorSet.textPlaceholderColor}
                        numberOfLines={numberOfLines}
                        multiline={numberOfLines > 1}
                        inputMode={inputMode}
                        keyboardType={keyboardType}
                        editable={editable}
                        autoCorrect={false}
                        autoComplete={'off'}
                        onSubmitEditing={(i) => {
                            Keyboard.dismiss();
                            if (handleDone) {
                                handleDone(value);
                            }
                        }}
                        onChangeText={(it) => {
                            if (otherProps) {
                                otherProps.setFieldValue(name, it, true);
                                otherProps.setFieldTouched(name, true, true);
                            } else {
                                onTextChange(it);
                            }
                        }} />
                    {(otherProps && otherProps?.values[name]?.length) || (value && editable) ?
                        <TouchableOpacity style={{ padding: 10 }}
                            onPress={() => {
                                if (otherProps) {
                                    otherProps.setFieldValue(name, '', true);
                                    otherProps.setFieldTouched(name, true, true);
                                } else {
                                    onTextChange('');
                                }
                            }}>
                            <ClearAll />
                        </TouchableOpacity> : null}
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
            {otherProps && otherProps?.errors[name] && otherProps?.touched[name] ?
                <Text style={styles.errorText}>{otherProps?.errors[name]}</Text> : null}
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
        lineHeight: 16.34,
        fontWeight: '400',
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
    errorText: {
        ...commonStyle('400', 11, 'primaryColorA'),
        color: '#E67F7F',
        textAlign: 'right',
        marginTop: 4,
    }
});

export default InputField;
