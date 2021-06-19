import moment from 'moment';
import React from 'react';
import {
  FlatList,
  ImageBackground,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  SectionList,
  TouchableOpacity,
  View,
  Dimensions,
} from 'react-native';
import * as R from 'ramda';

const image = {
  uri: 'https://i.pinimg.com/564x/e3/e5/b1/e3e5b121a4a6d008971cccbd3088ef01.jpg',
};

const model = [
  {
    time: '17:00',
    title: 'XRP - Liquadation Challange',
    params: 'XRP CORECTIONS',
    decriptions: 'only XRPUSDT',
    startAt: moment().format('D MMMM YYYY'),
    endAt: moment().add('days', 1).format('D MMMM YYYY'),
  },
  {
    time: '12:00',
    title: 'ADA - Volatillity Select',
    decriptions: 'only ADAUSDT',
    params: 'absolutly grown',
    startAt: moment().format('D MMMM YYYY'),
    endAt: moment().add('days', 1).format('D MMMM YYYY'),
  },
  {
    time: '12:55',
    title: 'BTC - CORRELATION VISION',
    decriptions: 'MAKS PNL TOKENS GROWN IN USDT',
    params: 'ALL TOKENS',
    startAt: moment().format('D MMMM YYYY'),
    endAt: moment().add('days', 1).format('D MMMM YYYY'),
  },
  {
    time: '14:15',
    title: 'COIN ACTIVITY ACTIONS',
    decriptions: 'TOKENS GROWN IN USDT MAKS ENTRY ACTIONS',
    params: 'ALL TOKENS IN PERCENT CHANGE ON START',
    startAt: moment().format('D M YYYY'),
    endAt: moment().add('days', 1).format('D M YYYY'),
  },
];

const DATA = [
  {
    title: null,
    data: [
      [
        'My Account',
        'Conclusion',
        'Marker',
        'Transfer',
        'ChatBlogger',
        'Settings',
      ],
    ],
  },
  // {
  //     title: 'Conclusion',
  //     data: ['Conclusion'],
  // },
  // {
  //     title: 'Marker',
  //     data: ['Marker'],
  // },
  // {
  //     title: 'Transfer',
  //     data: ['Trannsfer'],
  // },
];

const Item = props => {
  console.log(props.section.data);

  return R.cond([
    [
      R.isNil,
      () => (
        <FlatList
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          data={props.section.data[0]}
          renderItem={({item, index}) => {
            console.log({item});

            return R.cond([
              [R.equals('Settings'), () => <Settings />],
              [R.equals('ChatBlogger'), () => <Conclusion />],
              [R.equals('Transfer'), () => <Conclusion />],
              [R.equals('Marker'), () => <Marker />],
              [R.equals('Conclusion'), () => <Conclusion />],
              [R.equals('My Account'), () => <Account />],
              [R.T, () => <View />],
              [R.F, () => <View />],
            ])(item);
          }}
        />
      ),
    ],
    [
      R.equals('Conclusion'),
      () => (
        <FlatList
          contentContainerStyle={{flexGrow: 1, justifyContent: 'flex-end'}}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          data={model}
          renderItem={({item, index}) => (
            <View
              style={{
                flex: 1,
                justifyContent: 'flex-end',
              }}>
              <View style={stylex.cardMessage}>
                <Text style={stylex.title}>
                  #{index + 1 + ' ' + item.title}
                </Text>
                <Text style={[stylex.desc, {color: 'grey', fontSize: 12}]}>
                  {item.params}
                </Text>
                <Text style={[stylex.desc, {color: 'grey', fontSize: 12}]}>
                  {item.decriptions}
                </Text>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
                  <Text style={[stylex.desc, {color: 'grey', fontSize: 12}]}>
                    {R.join('-')([item.startAt, item.endAt])}
                  </Text>
                  <Text style={[stylex.desc, {color: 'grey', fontSize: 12}]}>
                    {item.time}
                  </Text>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
                  <TouchableOpacity style={{justifyContent: 'center', flex: 1}}>
                    <Text
                      style={[
                        stylex.title,
                        {color: 'black', fontSize: 14, textAlign: 'left'},
                      ]}>
                      Register
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={{justifyContent: 'center', flex: 1}}>
                    <Text
                      style={[
                        stylex.title,
                        {color: 'grey', fontSize: 14, textAlign: 'right'},
                      ]}>
                      Later
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          )}
        />
      ),
    ],
    [R.T, () => <View />],
    [R.F, () => <View />],
  ])(props.section.title);
};

const WelcomeApp = () => {
  return (
    <ImageBackground source={image} style={stylex.image}>
      <SectionList
        sections={DATA}
        keyExtractor={(item, index) => item + index}
        renderItem={props => <Item {...props} />}
        renderSectionHeader={({section: {title}}) =>
          R.isNil(title) && (
            <>
              <SafeAreaView />
              <Text
                style={{
                  fontWeight: '900',
                  fontSize: 20,
                  paddingHorizontal: 20,
                  paddingVertical: 10,
                }}>
                Welcome back, SLAVA Yakimov
              </Text>
              <Text
                style={{
                  fontWeight: '700',
                  fontSize: 16,
                  paddingHorizontal: 20,
                  paddingVertical: 10,
                  color: 'white',
                  justifyContent: 'flex-start',
                }}>
                {moment().format('DD MMMM, YYYY')}
              </Text>
            </>
          )
        }
      />
    </ImageBackground>
  );
};

const Conclusion = () => {
  return (
    <View style={[stylex.cardMessage, {padding: 0}]}>
      <View style={{flex: 1, padding: 20, justifyContent: 'space-between'}}>
        <Text style={{textAlign: 'center', fontWeight: 'bold'}}>
          My calendar conclusion
        </Text>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <Text
            style={{
              textAlign: 'center',
              fontWeight: 'bold',
              fontSize: 18,
            }}>
            $ 415.00
          </Text>
          <Text
            style={{
              textAlign: 'center',
              fontWeight: 'bold',
              fontSize: 25,
              color: 'green',
            }}>
            +30%
          </Text>
        </View>
        <Text
          style={{
            textAlign: 'center',
            fontWeight: '300',
            fontSize: 15,
          }}>
          Lock: $ 100
        </Text>
      </View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          borderTopWidth: 1,
        }}>
        <View style={{flexDirection: 'column', padding: 10}}>
          <Text style={{textAlign: 'center', fontWeight: '500'}}>
            Winner Con
          </Text>
          <Text style={{textAlign: 'center', fontWeight: 'bold'}}>154/190</Text>
        </View>
        <View
          style={{
            flexDirection: 'column',
            padding: 10,
            borderLeftWidth: 1,
            borderRightWidth: 1,
          }}>
          <Text style={{textAlign: 'center', fontWeight: '500'}}>
            Token Supplier
          </Text>
          <Text style={{textAlign: 'center', fontWeight: 'bold'}}>
            1200 FME
          </Text>
        </View>
        <View style={{flexDirection: 'column', padding: 10}}>
          <Text style={{textAlign: 'center', fontWeight: '500'}}>
            Withdrawler
          </Text>
          <Text style={{textAlign: 'center', fontWeight: 'bold'}}>
            $ 536.45
          </Text>
        </View>
      </View>
    </View>
  );
};

const Account = () => {
  return (
    <View style={[stylex.cardMessage, {padding: 0}]}>
      <View style={{flex: 1, padding: 20, justifyContent: 'space-between'}}>
        <Text style={{textAlign: 'center', fontWeight: 'bold'}}>
          My Account will be winner
        </Text>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <Text
            style={{
              textAlign: 'center',
              fontWeight: 'bold',
              fontSize: 25,
            }}>
            $ 415.00
          </Text>
          <Text
            style={{
              textAlign: 'center',
              fontWeight: 'bold',
              fontSize: 25,
              color: 'green',
            }}>
            +30%
          </Text>
        </View>
        <Text
          style={{
            textAlign: 'center',
            fontWeight: '300',
            fontSize: 15,
          }}>
          Lock: $ 350
        </Text>
      </View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          borderTopWidth: 1,
        }}>
        <View style={{flexDirection: 'column', padding: 10}}>
          <Text style={{textAlign: 'center', fontWeight: '500'}}>
            Winner Con
          </Text>
          <Text style={{textAlign: 'center', fontWeight: 'bold'}}>154/190</Text>
        </View>
        <View
          style={{
            flexDirection: 'column',
            padding: 10,
            borderLeftWidth: 1,
            borderRightWidth: 1,
          }}>
          <Text style={{textAlign: 'center', fontWeight: '500'}}>
            Token Supplier
          </Text>
          <Text style={{textAlign: 'center', fontWeight: 'bold'}}>
            1200 FME
          </Text>
        </View>
        <View style={{flexDirection: 'column', padding: 10}}>
          <Text style={{textAlign: 'center', fontWeight: '500'}}>
            Withdrawler
          </Text>
          <Text style={{textAlign: 'center', fontWeight: 'bold'}}>
            $ 536.45
          </Text>
        </View>
      </View>
    </View>
  );
};

const Settings = () => {
  return (
    <>
      <View style={{flex: 1}}>
        <View
          style={[
            stylex.cardMessage,
            {padding: 0, padding: 20, minHeight: 50, marginVertical: 5},
          ]}>
          <Text style={{textAlign: 'center', fontWeight: '900', fontSize: 20}}>
            Address USDT
          </Text>
          <Text
            style={{
              textAlign: 'center',
              fontWeight: '400',
              fontSize: 15,
              padding: 10,
            }}>
            dsjnaffisjajiodfmaidfmdsnfijdsnsnsiadfj
          </Text>
        </View>
        <View
          style={[
            stylex.cardMessage,
            {padding: 0, padding: 20, minHeight: 50, marginVertical: 5},
          ]}>
          <Text style={{textAlign: 'center', fontWeight: '900', fontSize: 20}}>
            Address BTC
          </Text>
          <Text
            style={{
              textAlign: 'center',
              fontWeight: '400',
              fontSize: 15,
              padding: 10,
            }}>
            dsjnaffisjajiodfmaidfmdsnfijdsnsnsiadfj
          </Text>
        </View>
        <View
          style={[
            stylex.cardMessage,
            {padding: 0, padding: 20, minHeight: 50, marginVertical: 5},
          ]}>
          <Text style={{textAlign: 'center', fontWeight: '900', fontSize: 20}}>
            Address ETH
          </Text>
          <Text
            style={{
              textAlign: 'center',
              fontWeight: '400',
              fontSize: 15,
              padding: 10,
            }}>
            dsjnaffisjajiodfmaidfmdsnfijdsnsnsiadfj
          </Text>
        </View>
        <View
          style={[
            stylex.cardMessage,
            {padding: 0, padding: 20, minHeight: 50, marginVertical: 5},
          ]}>
          <Text style={{textAlign: 'center', fontWeight: '900', fontSize: 20}}>
            Address ADA
          </Text>
          <Text
            style={{
              textAlign: 'center',
              fontWeight: '400',
              fontSize: 15,
              padding: 10,
            }}>
            dsjnaffisjajiodfmaidfmdsnfijdsnsnsiadfj
          </Text>
        </View>
        <View
          style={[
            stylex.cardMessage,
            {padding: 0, padding: 20, minHeight: 50, marginVertical: 5},
          ]}>
          <Text style={{textAlign: 'center', fontWeight: '900', fontSize: 20}}>
            Address XRP
          </Text>
          <Text
            style={{
              textAlign: 'center',
              fontWeight: '400',
              fontSize: 15,
              padding: 10,
            }}>
            dsjnaffisjajiodfmaidfmdsnfijdsnsnsiadfj
          </Text>
        </View>
        <View
          style={[
            stylex.cardMessage,
            {padding: 0, padding: 20, minHeight: 50, marginVertical: 5},
          ]}>
          <Text style={{textAlign: 'center', fontWeight: '900', fontSize: 20}}>
            Address DOGECOIN
          </Text>
          <Text
            style={{
              textAlign: 'center',
              fontWeight: '400',
              fontSize: 15,
              padding: 10,
            }}>
            dsjnaffisjajiodfmaidfmdsnfijdsnsnsiadfj
          </Text>
        </View>
        <View
          style={[
            stylex.cardMessage,
            {padding: 0, padding: 20, minHeight: 50, marginVertical: 5},
          ]}>
          <Text style={{textAlign: 'center', fontWeight: '900', fontSize: 20}}>
            Address TRX
          </Text>
          <Text
            style={{
              textAlign: 'center',
              fontWeight: '400',
              fontSize: 15,
              padding: 10,
            }}>
            dsjnaffisjajiodfmaidfmdsnfijdsnsnsiadfj
          </Text>
        </View>
      </View>
      <TouchableOpacity
        style={{
          minHeight: 50,
          backgroundColor: 'red',
          margin: 10,
          borderRadius: 20,
          alignItems: 'center',
          justifyContent: 'center',
          position: 'absolute',
          bottom: 0,
          width: '95%',
        }}>
        <Text>Add new Adress</Text>
      </TouchableOpacity>
    </>
  );
};

const Marker = () => {
  return (
    <View style={[stylex.cardMessage, {padding: 0}]}>
      <View style={{flex: 1, justifyContent: 'space-between'}}>
        <View
          style={{
            flex: 1,
            padding: 20,
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <Text
            style={{
              textAlign: 'center',
              fontWeight: 'bold',
              fontSize: 25,
            }}>
            XRP
          </Text>
          <Text
            style={{
              textAlign: 'center',
              fontWeight: 'bold',
              fontSize: 25,
              color: 'green',
            }}>
            1.4058
          </Text>
        </View>
        <View
          style={{
            flex: 1,
            padding: 20,
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <Text
            style={{
              textAlign: 'center',
              fontWeight: 'bold',
              fontSize: 15,
            }}>
            Total:
          </Text>
          <Text
            style={{
              textAlign: 'center',
              fontWeight: 'bold',
              fontSize: 15,
              color: 'green',
            }}>
            14 058 $
          </Text>
        </View>

        <View
          style={{
            flexDirection: 'row',
            flex: 1,
            justifyContent: 'space-between',
          }}>
          {R.map(x => (
            <View
              x={x}
              style={{
                flexDirection: 'column',
                justifyContent: 'space-between',
                flex: 1,
                padding: 10,
                borderLeftWidth: x === 'l' && 1,
                borderRightWidth: x === 'l' && 1,
              }}>
              <Text
                style={{
                  textAlign: 'center',
                  fontWeight: 'bold',
                  fontSize: 15,
                }}>
                {x}
              </Text>
              <Text
                style={{
                  textAlign: 'center',
                  fontWeight: 'bold',
                  fontSize: 15,
                  color: 'grey',
                }}>
                14 058 $
              </Text>
            </View>
          ))(['h', 'l', 'o'])}
        </View>
      </View>
    </View>
  );
};

const stylex = StyleSheet.create({
  cardMessage: {
    minHeight: 100,
    padding: 20,
    marginHorizontal: 10,
    backgroundColor: 'rgba(255,255,255,0.85)',
    width: Dimensions.get('screen').width - 20,
    justifyContent: 'space-between',
    borderRadius: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: '900',
    color: 'red',
    textTransform: 'uppercase',
  },
  desc: {
    fontSize: 14,
    fontWeight: '700',
    color: 'grey',
  },
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  image: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  text: {
    color: 'white',
    fontSize: 42,
    fontWeight: 'bold',
    textAlign: 'center',
    backgroundColor: '#000000a0',
  },
});

export default WelcomeApp;
