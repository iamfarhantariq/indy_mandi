import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import HeaderWithBack from '../../components/Headers/HeaderWithBack'
import AppStyle from '../../assets/styles/AppStyle'
import { commonStyle } from '../../helpers/common'
import Tick from '../../assets/images/green-tick.svg';
import Button from '../../components/Button'
import { useNavigation } from '@react-navigation/native'

const BuyPlan = () => {
    const navigation = useNavigation();

    const plans = [
        {
            title: 'IndyMandi+', description: 'One-time set up cost to start selling',
            features: [
                'One-time set up cost to start selling',
                'Search discovery', 'Seller handbook', 'Chat 1-on-1 with customers',
                'Accept Payments Directly'
            ],
            subscription: { price: 450, tenure: 'month' },
            colors: {
                bg: AppStyle.colorSet.primaryColorC,
                title: AppStyle.colorSet.primaryColorB,
                features: AppStyle.colorSet.primaryColorA,
                price: AppStyle.colorSet.primaryColorB
            }
        },
        {
            title: 'Standard', description: 'One-time set up cost to start selling',
            features: [
                'One-time set up cost to start selling',
                'Search discovery', 'Seller handbook', 'Chat 1-on-1 with customers',
                'Accept Payments Directly'
            ],
            subscription: { price: 300, tenure: 'month' },
            colors: {
                bg: AppStyle.colorSet.primaryColorB,
                title: AppStyle.colorSet.primaryColorC,
                features: AppStyle.colorSet.whiteColor,
                price: AppStyle.colorSet.primaryColorC
            }
        }
    ]

    return (
        <View style={{ flex: 1, backgroundColor: AppStyle.colorSet.BGColor }}>
            <HeaderWithBack title={'Buy the plan'} />
            <ScrollView>
                <View style={{ flex: 1, marginHorizontal: 16, paddingVertical: 16 }}>
                    {plans.map((plan, index) => {
                        return (
                            <View key={index} style={{ ...styles.container, backgroundColor: plan.colors.bg }}>
                                <Text style={{ ...styles.titleText, color: plan.colors.title }}>{plan.title}</Text>
                                <Text style={{ ...styles.dText, color: plan.colors.title }}>{plan.description}</Text>

                                <View style={{ marginVertical: 32 }}>
                                    {plan.features.map((f, i) => (
                                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                            <Tick height={20} width={20} style={{ color: plan.colors.features }} />
                                            <Text style={{ ...styles.featureText, color: plan.colors.features }}>{f}</Text>
                                        </View>
                                    ))}
                                </View>

                                <Text style={{ ...styles.priceText, color: plan.colors.price, marginBottom: 33 }}>
                                    ₹ {plan.subscription.price}
                                    <Text style={{ fontSize: 16 }}>
                                        /{plan.subscription.tenure}
                                    </Text>
                                </Text>

                                <Button text={'Buy membership'} fill={true} bg={plan.colors.price} handleClick={() => navigation.navigate('PaymentSubscription')} />
                            </View>
                        )
                    })}
                </View>
            </ScrollView>
        </View>
    )
}

export default BuyPlan

const styles = StyleSheet.create({
    container: {
        borderRadius: 16,
        padding: 16,
        marginBottom: 16
    },
    titleText: {
        ...commonStyle('600', 24, 'whiteColor'),
        lineHeight: 32.69
    },
    dText: {
        ...commonStyle('400', 14, 'whiteColor'),
        lineHeight: 19.07
    },
    featureText: {
        ...commonStyle('400', 14, 'whiteColor'),
        lineHeight: 19.07,
        marginLeft: 8,
    },
    priceText: {
        ...commonStyle('600', 56, 'whiteColor'),
        lineHeight: 76.86,
    }
})