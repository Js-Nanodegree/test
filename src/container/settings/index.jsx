import React from 'react';
import {
  SectionList,
  StyleSheet,
  StatusBar,
  SafeAreaView,
  View,
  FlatList,
  Image,
  TouchableOpacity,
  TextInput,
  Text
} from 'react-native';
import { useTheme } from '@react-navigation/native';
import { color } from '../../theme';
import LabelText from '../../style/LabelText';
import Header from '../../comp/Header';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import * as R from 'ramda';

const SETTINGS = [
  {
    title: 'Profile',
    data: [['Referal', 'Income', 'Withdraw', 'Donat', 'Tax', 'Profile', 'Pro']],
  },
];

const Item = props => {
  const { colors } = useTheme();

  return (
    <FlatList
      data={props.item}
      horizontal
      scrollEnabled
      keyExtractor={(item, index) => index.toString() + '_MenuProfile'}
      renderItem={element => (
        <TouchableOpacity
          onPress={() => props.setActive(element.item)}
          style={[
            styles.item,
            {
              borderColor:
                props.active === element.item
                  ? color.textMain
                  : colors.textDesc,
            },
          ]}>
          <LabelText
            size="20"
            padding={0}
            weight="600"
            color={
              props.active === element.item ? color.textMain : colors.textDesc
            }
            style={{ textAlign: 'left' }}>
            {element.item}
          </LabelText>
        </TouchableOpacity>
      )}
    />
  );
};

const Settings = (props) => {
  const { container, colors, property } = useTheme();
  const [active, setActive] = React.useState('Stock');
  const data = useSelector(state => state, shallowEqual);
  const dispatchRedux = useDispatch();

  return (
    <SafeAreaView
      style={[
        container.container,
        { backgroundColor: color.appBack, paddingHorizontal: 10 },
      ]}>
      <SectionList
        contentContainerStyle={{ paddingHorizontal: 10, flexGrow: 1 }}
        sections={SETTINGS}
        keyExtractor={(item, index) => index.toString() + '_Profile'}
        renderItem={props => (
          <Item active={active} setActive={setActive} {...props} />
        )}
        renderSectionHeader={({ section: { title } }) => (
          <>
            <Header
              header={
                R.pipe(
                  R.paths([
                    ['user', 'user'],
                    ['user', 'balance'],
                  ]),
                  R.join(' growth to '),
                )(data) + ' $ in per day? and Now trading!'}
              desc="Settings"
              onPress={props.navigation.goBack}
            />
            <View style={styles.block}>
              <Image
                style={styles.image}
                source={{
                  uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQkG_B0czr3KsPHoQPPKbdKz1HQ0onCgsVnTQ&usqp=CAU',
                }}
              />
              <View style={{
                maxWidth: 100, flex: 1, justifyContent: 'space-between'
              }}>
                <View>
                  <LabelText
                    {...property.desc}
                    color={colors.primary}
                    style={styles.labelRisk}>
                    Share investors
                  </LabelText>
                  <LabelText
                    {...property.desc}
                    color={colors.primary}
                    style={styles.labelRisk}>
                    Pro Account
                  </LabelText>
                </View>
                {R.isEmpty(data.user.balance) && <LabelText
                  {...property.desc}
                  color={colors.textMain}
                  style={styles.labelRisk}>
                  set money in account
                </LabelText>}
                {R.isEmpty(data.user.user) && <LabelText
                  {...property.desc}
                  color={colors.textMain}
                  style={styles.labelRisk}>
                  install username
                </LabelText>}
              </View>
            </View>
            <LabelText
              {...property.desc}
            >
              username
            </LabelText>
            <TextInput
              {...property.input}
              onChangeText={e => dispatchRedux({ type: 'name', payload: e })}
              value={R.path(['user', 'user'])(data)}
            />
            <LabelText
              {...property.desc}
            >
              how money your need?
            </LabelText>
            <TextInput
              {...property.input}
              onChangeText={e => dispatchRedux({ type: 'balance', payload: e })}
              value={R.path(['user', 'balance'])(data)}
            />
          </>
        )
        }
      />
    </SafeAreaView >
  );
};

export default Settings;

const styles = StyleSheet.create({
  labelRisk: {
    textAlign: 'right',
    fontWeight: '700',
    textTransform: 'uppercase',
  },
  image: {
    flex: 1,
    borderRadius: 10,
    backgroundColor: color.lightBlue,
    marginRight: 10,
    borderWidth: 1,
  },
  block: {
    flex: 1,
    flexDirection: 'row',
    marginVertical: 10,
    justifyContent: 'space-between',
    minHeight: 200,
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
});
