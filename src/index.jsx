import * as React from 'react';
import {
  View,
  Text,
  ImageBackground,
  FlatList,
  SafeAreaView,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import styled from 'styled-components';
import {SvgXml} from 'react-native-svg';
import * as Svg from './assets/svg';

const color = {
  lightBlue: '#5BABF8',
  appBack: '#121112',
  appBack: '#121112',
  textDesc: '#B5AFAF',
  textMain: '#FFFFFF',
};
const width = Dimensions.get('screen').width;

const LabelText = styled.Text`
  font-size: ${props => props?.size || 14}px;
  align-items: center;
  text-align: center;
  font-weight: ${props => props?.weight || '400'};
  padding-vertical: 10px;
  color: ${props => props?.color || '#121212'};
  text-transform: ${props => props?.transform || 'none'};
`;

function HomeScreen() {
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: color.appBack}}>
      <FlatList
        contentContainerStyle={{flexGrow: 1, paddingHorizontal: 10}}
        ListHeaderComponent={() => <View style={{minHeight: 100}} />}
        ListFooterComponentStyle={{justifyContent: 'flex-end'}}
        ListEmptyComponent={() => (
          <View style={{flex: 1}}>
            <SvgXml
              fill="#000"
              color="#000"
              height={width * 0.9}
              width={width * 0.9}
              xml={Svg.Second}
            />
          </View>
        )}
        ListFooterComponent={() => (
          <View style={{minHeight: 100, flex: 1, justifyContent: 'flex-end'}}>
            <LabelText size="24" weight="700" color={color.textMain}>
              Investment SimplyField
            </LabelText>
            <LabelText size="16" weight="400" color={color.textDesc}>
              Stock provider simple way to open world in Currency mayker
            </LabelText>
            <TouchableOpacity
              style={{
                flex: 1,
                backgroundColor: color.lightBlue,
                minHeight: 60,
                borderRadius: 10,
                alignItems: 'center',
                justifyContent: 'center',
                marginVertical: 20,
              }}>
              <LabelText
                size="18"
                weight="900"
                color="#FFFFFF"
                transform="uppercase">
                Learn More
              </LabelText>
            </TouchableOpacity>
          </View>
        )}
      />
    </SafeAreaView>
  );
}

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Swiper"
          component={HomeScreen}
          options={() => ({
            headerShown: false,
          })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
