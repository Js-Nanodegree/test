import { useTheme } from '@react-navigation/native';
import axios from 'axios';
import * as R from 'ramda';
import React from 'react';
import {
  FlatList,
  SafeAreaView,
  SectionList,
  StatusBar,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import Header from '../../comp/Header';
import LabelText from '../../style/LabelText';
import { color } from '../../theme';
import Market from './market';

const DATA = [
  {
    data: [
      [
        'Spot',
        'Spot Margin',
        'future',
        'Staking',
        'Options',
        'Tokens',
        'Funding',
        'Payment',
        'Conclusion',
      ],
    ],
  },
];

const HeaderState = R.cond([
  [
    R.equals('PERP'),
    R.always({ header: 'PERP-FUTURES', desc: '15289', photo: null }),
  ],
  [
    R.T,
    R.always({
    }),
  ],
]);

const InputSearch = props => {
  const { property } = useTheme();

  if (props.search) {
    return (
      <>
        <TextInput
          {...property.input}
          onChangeText={props.setFilter}
          value={props.filter}
        />
        {!R.isEmpty(props.filter) && (
          <TouchableOpacity
            onPress={() => props.setFilter('')}
            style={styles.remove}
          />
        )}
        {R.isEmpty(props.filter) && (
          <View style={{ flexDirection: 'row' }}>
            {R.addIndex(R.map)((x, key) => (
              <TouchableOpacity key={key} onPress={() => props.setFilter(x)}>
                <LabelText
                  key={key}
                  {...property.desc}
                  style={styles.fastButton}>
                  {x}
                </LabelText>
              </TouchableOpacity>
            ))(['BTC', 'USDT', 'USD', 'ETH'])}
          </View>
        )}
      </>
    );
  }

  return <View />;
};

import { shallowEqual, useSelector } from 'react-redux';

const ListScreen = ({ navigation }) => {
  const { container } = useTheme();
  const [active, setActive] = React.useState('Referal');
  const [state, setState] = React.useState({});
  const [filter, setFilter] = React.useState('');
  const [search, setSearch] = React.useState(false);
  const data = useSelector(state => state, shallowEqual);

  React.useEffect(() => {
    axios
      .get('https://ftx.com/api/markets')
      .then(({ data }) => setState(R.path(['result'])(data)));
  }, []);

  React.useEffect(() => {
    if (R.pipe(R.path(['user', 'balance']), R.isEmpty)(data)) {
      navigation.navigate('Settings')
    }
  }, [])

  return (
    <SafeAreaView
      style={[container.container, { backgroundColor: color.appBack, flex: 1 }]}>
      <SectionList
        sections={DATA}
        keyExtractor={(_item, index) => index.toString() + '_MenuProfile'}
        contentContainerStyle={{ minHeight: 300, paddingHorizontal: 10 }}
        renderItem={props => {
          return (
            <>
              <InputSearch
                filter={filter}
                search={search}
                setFilter={setFilter}
              />
              <Market
                active={active}
                setActive={setActive}
                state={R.filter(
                  R.pipe(
                    R.path(['name']),
                    R.toUpper,
                    R.includes(R.toUpper(R.isEmpty(filter) ? '' : filter)),
                  ),
                )(state)}
                search={search}
                {...props}
              />
            </>
          );
        }}
        renderSectionHeader={props => {
          if (props.section?.title === null) {
            return <View />;
          }
          return (
            <Header
              header={R.path(['user', 'user'])(data)}
              desc={R.path(['user', 'balance'])(data) + " $"}
              photo=
              'https://www.shutterstock.com/blog/wp-content/uploads/sites/5/2019/07/Man-Silhouette.jpg'
              onPress={() => navigation.navigate('Settings')}
              onPressPhoto={() => {
                if (search === true) {
                  setFilter('');
                }
                setSearch(prev => !prev);
              }}
            />
          );
        }}
      />
    </SafeAreaView>
  );
};

export default ListScreen;

const styles = StyleSheet.create({
  remove: {
    width: 50,
    height: 50,
    backgroundColor: 'red',
    position: 'absolute',
    top: 10,
    right: 0,
    zIndex: 1000,
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
  },
  fastButton: {
    marginHorizontal: 5,
    borderWidth: 1,
    borderColor: '#fff',
    padding: 10,
    borderRadius: 10,
  },
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
    marginHorizontal: 16,
  },
  item: {
    marginHorizontal: 3,
    minWidth: 90,
    borderBottomWidth: 2,
  },
  header: {
    fontSize: 32,
  },
  title: {
    fontSize: 24,
  },
});
