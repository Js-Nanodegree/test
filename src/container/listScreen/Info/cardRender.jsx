import { useTheme } from '@react-navigation/native';
import * as R from 'ramda';
import React from 'react';
import {
  TouchableOpacity, View
} from 'react-native';
import LabelText from '../../../style/LabelText';
import { color } from '../../../theme';


const selecterData = R.cond([
  [R.equals('PERP'), R.always('Фьючерсный контракты на спотовый актив')],
  [R.equals('0619'), R.always('Фьючерсный co сроком экспирации в 19 июня 2021')],
  [R.equals('0620'), R.always('Фьючерсный co сроком экспирации в 20 июня 2021')],
  [R.equals('0625'), R.always('Фьючерсный co сроком экспирации в 25 июня 2021')],
  [R.equals('0702'), R.always('Фьючерсный co сроком экспирации в 7 июля 2021')],
  [R.equals('0709'), R.always('Фьючерсный co сроком экспирации в 9 июля 2021')],
  [R.equals('0716'), R.always('Фьючерсный co сроком экспирации в 16 июля 2021')],
  [R.equals('0812'), R.always('Фьючерсный co сроком экспирации в 12 августа 2021')],
  [R.equals('0924'), R.always('Фьючерсный co сроком экспирации в 24 сентября 2021')],
  [R.equals('1231'), R.always('Фьючерсный co сроком экспирации в 31 декабря 2021')],
  [R.equals('2021Q2'), R.always('Квартальный фьючерсный на 2 квартал 2021')],
  [R.equals('2021Q3'), R.always('Квартальный фьючерсный на 3 квартал 2021')],
  [R.equals('2021Q4'), R.always('Квартальный фьючерсный на 4 квартал 2021')],
  [R.equals('BOLSONARO2022'), R.always('Ставка на событие')],
  [R.equals('OLY2021'), R.always('Ставка на событие')],
  [R.equals('PERP'), R.always('Бессрочный фьючерсы')],
  [R.equals('TRUMP2024'), R.always('Ставка на событие')],
  [R.T, R.always('Все активы в приложении')],
])

const RenderItem = props => {
  const { container, colors, property } = useTheme();

  return (
    <TouchableOpacity
      onPress={() => props.onPress(props.item)}
      style={{
        width: props.snap,
        height: props.snap,
        padding: 10,
      }}>
      <View
        style={[
          container.card,
          { padding: 5 },
          {
            backgroundColor:
              props.state === props.index
                ? color.lightBlue
                : color.lightGreen,
          },
        ]}>
        <LabelText {...property.header} color={colors.textMain}>
          {props.item}
        </LabelText>
        <View>
          <LabelText
            {...property.desc}
            color={colors.textMain}
            style={{ textTransform: 'uppercase' }}>
            {selecterData(props.item)}
          </LabelText>
          <LabelText
            {...property.desc}
            color={colors.textMain}
            style={{ textTransform: 'uppercase' }}>
            {R.length(props.assets)} assets
          </LabelText>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default RenderItem
