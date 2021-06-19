import { useTheme } from '@react-navigation/native';
import * as R from 'ramda';
import * as React from 'react';
import {
  FlatList,
  SafeAreaView,
  TouchableOpacity,
  View,
  Dimensions,
  StatusBar,
} from 'react-native';
import { SvgXml } from 'react-native-svg';
import * as Svg from '../../assets/svg';
import { color, widthScreen } from '../../theme';
import LabelText from '../../style/LabelText';
import staticContent from './ctx'
import RenderItem from './render'

function HomeScreen({ navigation }) {
  const [state, setState] = React.useState(0);
  const ref = React.useRef();



  const onPress = () => {
    if (state !== 3) {
      ref.current.scrollToIndex({
        animated: true,
        index: state + 1,
        viewPosition: 0,
      });
      setState(prev => prev + 1);
    } else {
      navigation.navigate('ListScreen')
    }
  };
  const handleScroll = event => {
    let yOffset = R.pipe(
      R.path(['nativeEvent', 'contentOffset', 'x']),
      R.defaultTo(0),
      x => x / Dimensions.get('screen').width,
      x => Math.round(x)
    )(event);
    if (state !== yOffset) {
      setState(yOffset);
    }
  };

  return (
    <FlatList
      ref={ref}
      bounces={false}
      data={staticContent}
      keyExtractor={item => item.id}
      horizontal
      scrollEnabled={true}
      onScroll={event => handleScroll(event)}
      pagingEnabled
      contentContainerStyle={{ flexGrow: 1 }}
      renderItem={props => (
        <RenderItem {...props} state={state} onPress={onPress} />
      )}
    />
  );
}

export default HomeScreen;
