/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import * as R from 'ramda';
import type {Node} from 'react';
import React from 'react';
import {
  FlatList,
  ImageBackground,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  useColorScheme,
  View,
  ScrollView,
  VirtualizedList,
} from 'react-native';
import WS from 'react-native-websocket';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import moment from 'moment';

const getItem = (data, index) => {
  console.log(
    R.pipe(R.find(R.propEq('s', data[index]?.s)), R.path(['c']))(data),
    'dsadas',
  );
  console.log(
    R.pipe(
      R.find(R.propEq('s', data[index]?.ps + '_PERP')),
      R.path(['c']),
    )(data),
    'dsadas',
  );
  return {
    id: Math.random().toString(12).substring(0),
    data: R.path([index])(data),
    change:
      R.pipe(R.find(R.propEq('s', data[index]?.s)), R.path(['c']))(data) -
      R.pipe(
        R.find(R.propEq('s', data[index]?.ps + '_PERP')),
        R.path(['c']),
      )(data),
    changeH:
      R.pipe(R.find(R.propEq('s', data[index]?.s)), R.path(['h']))(data) -
      R.pipe(
        R.find(R.propEq('s', data[index]?.ps + '_PERP')),
        R.path(['h']),
      )(data),
    changeL:
      R.pipe(R.find(R.propEq('s', data[index]?.s)), R.path(['l']))(data) -
      R.pipe(
        R.find(R.propEq('s', data[index]?.ps + '_PERP')),
        R.path(['l']),
      )(data),
  };
};

const App: () => Node = () => {
  const isDarkMode = useColorScheme() === 'dark';

  const [state, setState] = React.useState({symbol: []});

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  const renderItem = props => {
    return (
      <View
        style={{
          minHeight: 200,
          borderWidth: 1,
          borderRadius: 10,
          backgroundColor: 'lightgrey',
          marginVertical: 5,
          borderColor: '#cecece',
          padding: 20,
        }}>
        <Text style={[styles.title, {fontWeight: '900'}]}>
          {props?.item?.data?.s}
        </Text>
        <Text style={styles.title}>{props?.item?.data?.c}</Text>
        <Text style={styles.title}>{props?.item?.data?.h}</Text>
        <Text style={styles.title}>
          {props?.item?.data?.h / props?.item?.data?.o}
        </Text>
        <Text style={styles.title}>
          {props?.item?.data?.o / props?.item?.data?.l}
        </Text>
        <Text style={styles.title}>
          {props?.item?.data?.h / props?.item?.data?.c}
        </Text>
        <Text style={styles.title}>
          {props?.item?.data?.c / props?.item?.data?.l}
        </Text>
        <Text style={styles.title}>{props?.item?.data?.l}</Text>

        <View style={{flexDirection: 'column', flex: 1}}>
          <Text style={styles.title}>{props?.item?.data?.c}</Text>
          <Text style={styles.title}>{props?.item?.changeH}</Text>
          <Text
            style={[
              {
                color: props?.item?.changeH < props?.item?.change && 'green',
              },
              {
                color: props?.item?.changeL - props?.item?.change < 0 && 'red',
              },
            ]}>
            {props?.item?.change}
          </Text>
          <Text style={styles.title}>{props?.item?.changeL}</Text>
        </View>
        <Text style={styles.title}>{props?.item?.data?.marginAsset}</Text>
        <Text style={styles.title}>{props?.item?.data?.contractStatus}</Text>
      </View>
    );
  };

  const ref = React.useRef();

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <VirtualizedList
        data={state}
        contentContainerStyle={{flexGrow: 1, marginHorizontal: 10}}
        initialNumToRender={4}
        renderItem={renderItem}
        keyExtractor={item => item.key}
        getItemCount={() => R.pipe(R.length, R.defaultTo(1))(state)}
        getItem={getItem}
      />
      <WS
        ref={ref}
        url="wss://dstream.binance.com/ws/!miniTicker@arr"
        onOpen={() => {
          console.log('Open!');
          // this.ws.send('Hello')
        }}
        onMessage={({data}) => {
          setState(prev => {
            return R.pipe(
              R.unionWith(R.eqBy(R.prop('s')), JSON.parse(data)),
              R.sort((a, b) => a.s.localeCompare(b.s)),
            )(prev);
          });
        }}
        onError={console.log}
        onClose={console.log}
        reconnect // Will try to reconnect onClose
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

const image = {
  uri: 'https://i.pinimg.com/564x/e3/e5/b1/e3e5b121a4a6d008971cccbd3088ef01.jpg',
};

const WelcomeApp = () => {
  return (
    <ImageBackground source={image} style={stylex.image}>
      <FlatList
        data={[]}
        bounces={false}
        contentContainerStyle={{flexGrow: 1, padding: 20, paddingHorizontal: 5}}
        ListEmptyComponent={() => (
          <>
            <View
              style={{
                height: 150,
                borderWidth: 1,
                borderRadius: 20,
                borderColor: '#cecece',
                opacity: 0.8,
                flex: 1,
                backgroundColor: '#cecece',
                margin: 10,
                padding: 10,
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}>
                <Text
                  style={{
                    fontWeight: '600',
                    fontSize: 14,
                    paddingHorizontal: 20,
                    paddingVertical: 10,
                    color: 'red',
                  }}>
                  Activity today
                </Text>
                <Text
                  style={{
                    fontWeight: '600',
                    fontSize: 14,
                    paddingHorizontal: 20,
                    paddingVertical: 10,
                    color: 'red',
                  }}>
                  {moment().format('HH:mm ')}
                </Text>
              </View>
              <Text
                style={{
                  fontWeight: '600',
                  fontSize: 14,
                  paddingHorizontal: 20,
                  paddingVertical: 10,
                }}>
                Now we run new tournament by one time selected
              </Text>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}>
                <TouchableOpacity style={{flex: 1, borderRadius: 14}}>
                  <Text
                    style={{
                      fontWeight: '600',
                      fontSize: 14,
                      paddingHorizontal: 20,
                      paddingVertical: 10,
                      color: 'red',
                      textAlign: 'center',
                      textTransform: 'uppercase',
                    }}>
                    Register
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={{
                    flex: 1,
                    borderRadius: 14,
                    opacity: 1,
                  }}>
                  <Text
                    style={{
                      fontWeight: '600',
                      fontSize: 14,
                      paddingHorizontal: 20,
                      paddingVertical: 10,
                      color: 'black',
                      textAlign: 'center',
                      textTransform: 'uppercase',
                    }}>
                    Remember Me
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
            <View style={{height: 250}} />
          </>
        )}
        ListHeaderComponent={() => (
          <>
            <SafeAreaView />
            <Text
              style={{
                fontWeight: '900',
                fontSize: 20,
                paddingHorizontal: 20,
                paddingVertical: 10,
              }}>
              Welcome, SLLAVVA
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
        )}
        ListFooterComponentStyle={{flexGrow: 1, justifyContent: 'flex-end'}}
        ListFooterComponent={() => (
          <>
            <Text
              style={{
                fontWeight: '900',
                fontSize: 25,
                paddingHorizontal: 20,
                paddingVertical: 10,
                color: 'white',
                paddingVertical: 20,
                textTransform: 'uppercase',
              }}>
              One Day Trader Tournament
            </Text>
            <View
              style={{
                paddingVertical: 10,
                borderWidth: 1,
                borderRadius: 20,
                borderColor: '#cecece',
                opacity: 0.8,
                backgroundColor: '#cecece',
              }}>
              <ScrollView>
                <Text>About conclusion</Text>
                <Text
                  style={{
                    fontWeight: '300',
                    fontSize: 12,
                    flex: 1,
                    paddingHorizontal: 20,
                    paddingVertical: 10,
                    color: 'black',
                    textTransform: 'uppercase',
                  }}>
                  jansdj asjd fja fa sdajksd sajdf jadkafdads jasfdj
                  jaodfisjfiadok ajsjf jija dojksfid jja djksjdfji jajdo lsj
                  ifjdojsgjvfjifjjao fjsf aj fjj disfdp dsf sisjpo fjos fgpiaoj
                  fss gssjapf ghs fdi fsiss fsifd sdfisjjs Google
                </Text>
                <Text>Currency</Text>
                <Text
                  style={{
                    fontWeight: '300',
                    fontSize: 12,
                    flex: 1,
                    paddingHorizontal: 20,
                    paddingVertical: 10,
                    color: 'black',
                    textTransform: 'uppercase',
                  }}>
                  jansdj asjd fja fa sdajksd sajdf jadkafdads jasfdj
                  jaodfisjfiadok ajsjf jija dojksfid jja djksjdfji jajdo lsj
                  ifjdojsgjvfjifjjao fjsf aj fjj disfdp dsf sisjpo fjos fgpiaoj
                  fss gssjapf ghs fdi fsiss fsifd sdfisjjs Google
                </Text>
                <Text>Commisions</Text>
                <Text
                  style={{
                    fontWeight: '300',
                    fontSize: 12,
                    flex: 1,
                    paddingHorizontal: 20,
                    paddingVertical: 10,
                    color: 'black',
                    textTransform: 'uppercase',
                  }}>
                  jansdj asjd fja fa sdajksd sajdf jadkafdads jasfdj
                  jaodfisjfiadok ajsjf jija dojksfid jja djksjdfji jajdo lsj
                  ifjdojsgjvfjifjjao fjsf aj fjj disfdp dsf sisjpo fjos fgpiaoj
                  fss gssjapf ghs fdi fsiss fsifd sdfisjjs Google
                </Text>
                <Text>Bounces</Text>
                <Text
                  style={{
                    fontWeight: '300',
                    fontSize: 12,
                    flex: 1,
                    paddingHorizontal: 20,
                    paddingVertical: 10,
                    color: 'black',
                    textTransform: 'uppercase',
                  }}>
                  jansdj asjd fja fa sdajksd sajdf jadkafdads jasfdj
                  jaodfisjfiadok ajsjf jija dojksfid jja djksjdfji jajdo lsj
                  ifjdojsgjvfjifjjao fjsf aj fjj disfdp dsf sisjpo fjos fgpiaoj
                  fss gssjapf ghs fdi fsiss fsifd sdfisjjs Google
                </Text>

                <TouchableOpacity>
                  <Text>List Register User || Finish Address User</Text>
                </TouchableOpacity>
                <TouchableOpacity>
                  <Text>Hot Chat</Text>
                </TouchableOpacity>
                <TouchableOpacity>
                  <Text>Daily Volume </Text>
                </TouchableOpacity>
                <TouchableOpacity>
                  <Text>Rules</Text>
                </TouchableOpacity>
                <TouchableOpacity>
                  <Text>Referal Links</Text>
                </TouchableOpacity>
              </ScrollView>
            </View>

            <TouchableOpacity
              style={{
                borderRadius: 14,
                backgroundColor: 'white',
                minHeight: 50,
                alignItems: 'center',
                justifyContent: 'center',
                marginVertical: 5,
              }}>
              <Text
                style={{
                  fontWeight: '600',
                  fontSize: 14,
                  color: 'red',
                  fontWeight: 'bold',
                  textTransform: 'uppercase',
                }}>
                Register
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                borderRadius: 14,
                minHeight: 50,
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: 'red',
                marginVertical: 5,
              }}>
              <Text
                style={{
                  fontWeight: '600',
                  fontSize: 14,
                  paddingHorizontal: 20,
                  paddingVertical: 10,
                  fontWeight: 'bold',
                  color: 'black',
                  textTransform: 'uppercase',
                }}>
                Remember Me
              </Text>
            </TouchableOpacity>
            <SafeAreaView />
          </>
        )}
      />
    </ImageBackground>
  );
};

const stylex = StyleSheet.create({
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
