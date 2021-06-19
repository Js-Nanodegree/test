import { useTheme } from '@react-navigation/native';
import * as R from 'ramda';
import * as React from 'react';
import {
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
  View,
  ScrollView,
} from 'react-native';
import { SvgXml } from 'react-native-svg';
import LabelText from '../../style/LabelText';
import { color, widthScreen } from '../../theme';
import staticContent from './ctx';

const RenderItem = props => {
  const { container, button, dots, colors, property } = useTheme();

  return (
    <SafeAreaView
      style={[container.container, { backgroundColor: color.appBack }]}>
      <ScrollView contentOffset={{ flexGrow: 1 }}>
        <StatusBar {...property.statusBar} />
        <SvgXml
          fill="#000"
          color="#000"
          height={widthScreen}
          width={widthScreen}
          xml={props?.item?.svg}
        />
        <View style={[container.dots.row]}>
          {R.addIndex(R.map)((x, key) => (
            <View
              key={key}
              style={[
                dots,
                props.state < key
                  ? { backgroundColor: 'grey' }
                  : {
                    backgroundColor:
                      props.state === 1
                        ? colors.lightGreen
                        : colors.lightBlue,
                  },
                props.state === 3 && { backgroundColor: 'red' },
              ]}
            />
          ))([1, 2, 3, 4])}
        </View>

        <LabelText
          {...property.header}
          align="center"
          style={{ marginHorizontal: 30, minHeight: 75 }}>
          {props.item.header}
        </LabelText>
        <LabelText
          {...property.desc}
          align="center"
          style={{ marginHorizontal: 30, minHeight: 100 }}>
          {props.item.descriptor}
        </LabelText>

        <View style={container.buttonContainerDown}>
          <TouchableOpacity
            onPress={props.onPress}
            style={[
              button.button,
              props.state === 3 && { backgroundColor: 'red' },
              props.state === 1 && { backgroundColor: colors.lightGreen },
            ]}>
            <LabelText {...property.button} {...button.button}>
              {R.path([props.state, 'button'])(staticContent)}
            </LabelText>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default RenderItem;
