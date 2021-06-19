import { useTheme } from '@react-navigation/native';
import * as R from 'ramda';
import React from 'react';
import {
  Dimensions,
  FlatList, SectionList, View
} from 'react-native';
import Header from '../../comp/Header';
import LabelText from '../../style/LabelText';
import { color } from '../../theme';

const screenHeight = Dimensions.get('screen').height;

const cardSelect = [
  {
    card: 'VISA',
    money: 5000,
    value: 'USD',
    crypto: false,
    account: '**** 5674',
    descriptor: 'freelance',
    model: 'CARD NUMBER',
  },
  {
    card: 'CARDANO',
    money: 5000,
    value: 'ADA',
    crypto: true,
    account: '....sdafdsafdfasdfsda',
    descriptor: 'freelance',
    model: 'CRYPTO WALLET',
  },
  {
    card: 'ZILIQA',
    money: 5000,
    value: 'ZIL',
    crypto: true,
    account: '....sdafdsafdfasdfsda',
    descriptor: 'freelance',
    model: 'CRYPTO WALLET',
  },
]


const RenderItem = props => {
  const { container, button, dots, colors, property } = useTheme();

  if (props?.item?.card) {
    return (
      <View
        style={{
          width: Dimensions.get('screen').width * 0.7,
          height: Dimensions.get('screen').height * 0.4,
          padding: 10,
        }}>
        <View
          style={[
            container.card,
            {
              backgroundColor:
                props.state === props.index ? color.lightBlue : color.lightGreen,
            },
          ]}>
          <LabelText {...property.header} color={[colors.textMain]}>
            {props.item.card}
          </LabelText>
          <View>
            <LabelText {...property.header} color={[colors.textMain]}>
              {props.item.money} {props.item.value}
            </LabelText>
            <LabelText
              {...property.desc}
              color={[colors.textMain]}
              style={{ textTransform: 'uppercase' }}>
              {props.item.descriptor}
            </LabelText>
          </View>
          <View>
            <LabelText
              {...property.desc}
              color={[colors.textMain]}
              style={{ textTransform: 'uppercase' }}>
              {props.item.model}
            </LabelText>
            <LabelText
              {...property.desc}
              color={[colors.textMain]}
              style={{ textTransform: 'uppercase' }}>
              {props.item.account}
            </LabelText>
          </View>
        </View>
      </View>
    );
  }
  return <View style={{ flex: 1, backgroundColor: 'red' }} />;
};

const CardScroll = () => {
  const [state, setState] = React.useState(0);


  const handleScroll = event => {
    let index = Math.ceil(event.nativeEvent.contentOffset.x / 300);
    setState(index);
  };

  return (
    <FlatList
      horizontal
      pagingEnabled
      onScroll={handleScroll}
      snapToInterval={Dimensions.get('screen').width * 0.7}
      decelerationRate="fast"
      data={cardSelect}
      keyExtractor={(_item, index) => index.toString() + 'ddasds'}
      contentContainerStyle={{
        minHeight: screenHeight * 0.4,
        flexGrow: 1,
      }}
      renderItem={(props) => <RenderItem {...props} state={state} />}
      ListEmptyComponentListEmptyComponent={() => <RenderItem />}
    />
  );
};

const Card = () => {
  const { container, button, dots, colors, property } = useTheme();

  const selectScreen = props => {
    if (props?.item?.key) {
      return (
        <View
          style={{
            minHeight: 75,
            borderColor: 'red',
            borderWidth: 0.5,
            marginTop: 5,
            borderRadius: 10,
            paddingHorizontal: 20,
          }}>
          <LabelText {...property.desc} color={[colors.textMain]}>
            HASH:{' '}
            {R.pipe(
              R.takeLast(30),
              R.prepend('...'),
            )(
              '0000000000000000000425214fc1ba680011636cb2093d96d8e9a613aeda5068',
            )}
          </LabelText>
          <View
            style={{
              flex: 1,
              justifyContent: 'space-between',
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <LabelText {...property.desc} color={[colors.textDesc]}>
              2021-06-12 17:42
            </LabelText>

            <LabelText {...property.desc} color={[colors.textDesc]}>
              1884.13822430 BTC
            </LabelText>
          </View>
        </View>
      );
    }
    return (
      <View
        style={{
          height: 75,
          backgroundColor: 'red',
          flex: 1,
          marginTop: 5,
          borderRadius: 10,
        }}
      />
    );
  };

  const sectionItem = props => {
    return R.cond([
      [
        R.equals(['Cards']),
        () => (
          <>
            <View style={{ padding: 15 }}>
              <LabelText {...property.header} color={[colors.textMain]}>
                Cards
              </LabelText>
            </View>
            <CardScroll />
          </>
        ),
      ],
      [
        R.equals(['Transaction']),
        () => (
          <View style={{ paddingHorizontal: 10 }}>
            <View style={{ paddingVertical: 10 }}>
              <LabelText {...property.header} color={[colors.textMain]}>
                Transaction
              </LabelText>
            </View>
            <FlatList
              data={[
                { key: 1 },
                { key: 1 },
                { key: 1 },
                { key: 1 },
                { key: 1 },
                { key: 1 },
                { key: 1 },
                { key: 1 },
                { key: 1 },
                { key: 1 },
                { key: 1 },
                { key: 1 },
              ]}
              keyExtractor={(_item, index) => index.toString() + 'adads'}
              contentContainerStyle={{ flexGrow: 1, paddingHorizontal: 10 }}
              renderItem={selectScreen}
            />
          </View>
        ),
      ],
      [R.T, () => <View />],
    ])(props?.section?.data);
  };

  return (
    <SectionList
      bounces={false}
      contentContainerStyle={[
        {
          backgroundColor: color.appBack,
          flexGrow: 1,
        },
      ]}
      sections={[{ data: ['Cards'] }, { data: ['Transaction'] }]}
      keyExtractor={(item, index) => item + index}
      ListHeaderComponent={() => (
        <Header
          header="Total Balance"
          desc="5000 $"
          photo=""
          onPress={() => console.log('click')}

        />
      )}
      renderItem={sectionItem}
    />
  );
};

export default Card;
