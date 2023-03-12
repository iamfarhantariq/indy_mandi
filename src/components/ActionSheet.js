import React, { useRef } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import ActionSheet, { SheetManager } from 'react-native-actions-sheet';
import AppStyle from '../assets/styles/AppStyle';
import { commonStyle } from '../helpers/common';

const ExampleTwo = ({ sheetId, payload }) => {
    const actionSheetRef = useRef(null);

    return (
        <ActionSheet
            id={sheetId}
            ref={actionSheetRef}
            containerStyle={{ borderTopLeftRadius: 25, borderTopRightRadius: 25 }}
            indicatorStyle={{ width: 100 }}
            gestureEnabled={true}>
            <View style={{ padding: 20, width: '100%' }}>
                <Text style={{ ...commonStyle('600', 18, 'primaryColorB'), marginBottom: 8 }}>{payload?.header}</Text>
                {payload && payload?.actions?.length && (
                    payload?.actions?.map((item, index) => (
                        <TouchableOpacity key={item?.value + index} onPress={() => {
                            payload?.filterHandler(item?.value);
                            actionSheetRef.current?.hide();
                        }}
                            style={{ borderBottomColor: AppStyle.colorSet.primaryColorA + '60', borderBottomWidth: 1, paddingVertical: 8 }}>
                            <Text style={{ ...commonStyle('600', 16, 'primaryColorA') }}>{item?.title}</Text>
                        </TouchableOpacity>
                    )))}
            </View>
        </ActionSheet>
    );
}

export default ExampleTwo;