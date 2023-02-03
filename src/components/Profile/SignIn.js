import { Platform, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import CheckBox from '@react-native-community/checkbox';
import React from 'react';
import GoogleIcon from '../../assets/images/google-icon.svg';
import FacebookIcon from '../../assets/images/fb-icon.svg';
import AppStyle from '../../assets/styles/AppStyle';
import { commonStyle } from '../../helpers/common';
import InputFieldBase from '../Input/InputFieldBase';
import { useState } from 'react';
import Button from '../Button';
import { useNavigation } from '@react-navigation/native';

const SignIn = ({ setView }) => {
    const navigation = useNavigation();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [staySigned, setStaySigned] = useState(true);

    return (
        <View style={{ marginHorizontal: 16, flex: 1 }}>
            <ScrollView showsVerticalScrollIndicator={false}>

                <View style={{ marginVertical: 26 }}>
                    <TouchableOpacity style={{ ...styles.socialContainer, marginBottom: 8 }}>
                        <GoogleIcon />
                        <Text style={styles.socialText}>Continue with google</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.socialContainer}>
                        <FacebookIcon />
                        <Text style={styles.socialText}>Continue with Facebook</Text>
                    </TouchableOpacity>
                </View>

                <InputFieldBase
                    title={'Email'}
                    placeholder={'Email'}
                    value={email}
                    onTextChange={(t) => setEmail(t)}
                />
                <InputFieldBase
                    title={'Password'}
                    placeholder={'Password'}
                    value={password}
                    onTextChange={(t) => setPassword(t)}
                    secure={true}
                />

                <TouchableOpacity>
                    <Text style={styles.forgotText}>Forgot your password?</Text>
                </TouchableOpacity>

                <View style={styles.checkboxContainer}>
                    <CheckBox
                        value={staySigned}
                        onValueChange={() => setStaySigned(!staySigned)}
                        boxType='square'
                        onFillColor={AppStyle.colorSet.primaryColorB} // IOS
                        onTintColor={AppStyle.colorSet.whiteColor} // IOS
                        onCheckColor={AppStyle.colorSet.whiteColor} // IOS
                        tintColors={{ true: '#713A74', false: '#713A74' }} // Android
                        style={{ transform: Platform.OS === 'ios' ? [{ scaleX: 0.7 }, { scaleY: 0.7 }] : [{ scaleX: 1.1 }, { scaleY: 1.1 }] }}
                    />
                    <Text style={styles.label}>Stay signed in</Text>
                </View>

                <View style={{ marginVertical: 16 }}>
                    <Button text={'Sign In'} handleClick={() => navigation.navigate('UserScreen')} fill={true} />
                </View>

                <View style={{ marginVertical: 16 }}>
                    <Button text={'Register new account'} handleClick={() => setView('register')} />
                </View>

                <TouchableOpacity>
                    <Text style={{ ...styles.forgotText, textAlign: 'center', marginVertical: 16 }}>Trouble logging in?</Text>
                </TouchableOpacity>

                <Text style={styles.description}>
                    By clicking Sign in or Continue with Google, Facebook, you agree to Indymandi's{" "}
                    <Text style={{ fontWeight: '700' }}>Terms of Use</Text>{" "}
                    and{" "}
                    <Text style={{ fontWeight: '700' }}>Privacy Policy</Text>.{" "}
                    Indymandi may send you communications; you may change your preferences in your account settings. We'll never post without your permission.
                </Text>

            </ScrollView>
        </View>
    )
}

export default SignIn

const styles = StyleSheet.create({
    socialContainer: {
        borderColor: AppStyle.colorSet.primaryColorB,
        borderWidth: 1,
        borderRadius: 99,
        paddingHorizontal: 16,
        paddingVertical: 10,
        flexDirection: 'row',
        alignItems: 'center'
    },
    socialText: {
        ...commonStyle('500', 16, 'primaryColorB'),
        textAlign: 'center',
        flex: 1,
    },
    forgotText: {
        ...commonStyle('600', 14, 'primaryColorB'),
        marginBottom: 19
    },
    checkboxContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        height: 18
    },
    label: {
        ...commonStyle('600', 14, 'primaryColorA'),
        marginLeft: 15
    },
    description: {
        ...commonStyle('400', 11, 'textSecondary'),
        lineHeight: 14.98,
        marginBottom: 32
    }
})