import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import AppStyle from '../../assets/styles/AppStyle'
import HomeHeader from '../../components/Headers/HomeHeader'
import { commonStyle, showToastHandler } from '../../helpers/common'
import { useState } from 'react';
import InfoIcon from '../../assets/images/info-icon.svg';
import UpSell from '../../assets/images/up-sell.svg';
import DownSell from '../../assets/images/down-sell.svg';
import { useEffect } from 'react'
import { ServiceGetStats } from '../../services/AppService'

const AnalyticsPage = ({ route }) => {
  const [analytics, setAnalytics] = useState({
    headings: ['Total Sales', 'Total traffic', 'Total orders', 'Total Products Sold'],
    values: ['0', '0', '0', '0'],
    descriptions: ['12% than last week', '3% than last week', '80% than last week', '3.89% than last week']
  });

  useEffect(() => {
    getStatistics();
  }, []);

  const getStatistics = () => {
    ServiceGetStats().then(response => {
      console.log({ response });
      let _analytics = { ...analytics };
      _analytics.values[2] = response?.data?.data?.total_orders;
      _analytics.values[3] = response?.data?.data?.total_products;
      setAnalytics(_analytics);
    }).catch(e => {
      showToastHandler(e);
    })
  }

  const StatisticCard = ({ headings, values, descriptions }) => {
    return (
      <View style={styles.containerCard}>
        <View style={{ ...styles.childContainer }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
            <Text>{headings[0]}</Text>
            <InfoIcon />
          </View>
          <Text style={styles.priceText}>{values[0]}</Text>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <UpSell />
            <Text style={styles.descriptionText}>{descriptions[0]}</Text>
          </View>
        </View>
        <View style={{ ...styles.childContainer, borderLeftColor: AppStyle.colorSet.borderLightGrayColor, borderLeftWidth: 2 }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
            <Text>{headings[1]}</Text>
            <InfoIcon />
          </View>
          <Text style={styles.priceText}>{values[1]}</Text>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <UpSell />
            <Text style={styles.descriptionText}>{descriptions[1]}</Text>
          </View>
        </View>
      </View>
    )
  }

  return (
    <View style={{ flex: 1, backgroundColor: AppStyle.colorSet.BGColor }}>
      <HomeHeader filters={false} />
      <View style={{ marginHorizontal: 16, flex: 1 }}>
        <Text style={styles.headingText}>Analytics</Text>

        {/* <StatisticCard
          headings={[analytics.headings[0], analytics.headings[1]]}
          values={[analytics.values[0], analytics.values[1]]}
          descriptions={[analytics.descriptions[0], analytics.descriptions[1]]}
        /> */}

        <StatisticCard
          headings={[analytics.headings[2], analytics.headings[3]]}
          values={[analytics.values[2], analytics.values[3]]}
          descriptions={[analytics.descriptions[2], analytics.descriptions[3]]}
        />

      </View>
    </View>
  )
}

export default AnalyticsPage

const styles = StyleSheet.create({
  headingText: {
    ...commonStyle('600', 16, 'blackColor'),
    marginVertical: 16
  },
  containerCard: {
    width: '100%',
    height: 98,
    borderColor: AppStyle.colorSet.borderLightGrayColor,
    borderWidth: 2,
    borderRadius: 8,
    marginBottom: 16,
    flexDirection: 'row',
  },
  childContainer: {
    width: '50%',
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 8,
    justifyContent: 'space-between'
  },
  priceText: {
    ...commonStyle('500', 32, 'primaryColorB'),
  },
  descriptionText: {
    ...commonStyle('400', 11, 'primaryColorB'),
    color: '#50CD8D',
    marginLeft: 4
  }
})