import { useTheme } from '@react-navigation/native';
import * as R from 'ramda';
import React from 'react';
import {
  ImageBackground, StyleSheet, View
} from 'react-native';
import LabelText from '../../style/LabelText';
import { color } from '../../theme';

const CardSelecter = props => {
  const { colors, property } = useTheme();

  return (
    <View
      style={styles.block}>
      <ImageBackground
        source={R.cond([
          [
            R.pipe(x => x < 0),
            () => require('../../assets/card/down.png'),
          ],
          [R.pipe(x => x > 0), () => require('../../assets/card/up.png')],
          [R.T, () => null],
        ])(props.item.change24h)}
        imageStyle={{ borderRadius: 10 }}
        style={styles.image}>
        <View
          style={styles.card}>
          <View style={styles.around}>
            <LabelText
              {...property.header}
              color={colors.textMain}
              style={styles.leftText}>
              {props.item.name}
            </LabelText>
            <LabelText
              {...property.desc}
              color={colors.textDesc}
              style={styles.leftText}>
              {props.item.volumeUsd24h}
            </LabelText>
          </View>
          <View style={styles.around}>
            <LabelText
              {...property.desc}
              color={colors.textDesc}
              style={styles.textRight}>
              $ {props.item.last}
            </LabelText>
            <LabelText
              {...property.desc}
              color={colors.textDesc}
              style={styles.textRight}>
              {R.pipe(
                R.path(['item']),
                R.paths([['bid'], ['ask']]),
                R.map(x => Math.round(x * 1000) / 1000),
                R.join(' / '),
              )(props)}
            </LabelText>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
}

export default CardSelecter

const styles = StyleSheet.create({
  around: { minHeight: 50, justifyContent: 'space-around', flex: 1 },
  textRight: { marginVertical: 0, padding: 0, textAlign: 'right', flex: 1 },
  leftText: { marginVertical: 0, padding: 0, textAlign: 'left', flex: 1 },
  block: {
    padding: 5,
    borderRadius: 10,
  },
  image: {
    flex: 1,
    borderRadius: 10,
  },
  card: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: 2,
    backgroundColor: color.appBack,
    borderRadius: 10,
    padding: 10,
    flex: 1,
  },
  empty: {
    height: 75,
    backgroundColor: 'red',
    flex: 1,
    marginTop: 5,
    borderRadius: 10,
  },
  container: {
    backgroundColor: color.appBack,
    flexGrow: 1,
  },
  cardContainer: {
    flexGrow: 1,
  },
})