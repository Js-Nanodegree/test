import { Dimensions } from 'react-native';

export const widthScreen = Dimensions.get('screen').width;

export const color = {
  lightBlue: '#5BABF8',
  lightGreen: '#04C604',
  appBack: '#121112',
  textDesc: '#B5AFAF',
  textMain: '#FFFFFF',
};

const MyTheme = {
  dark: false,
  colors: {
    primary: 'rgb(255, 45, 85)',
    background: 'rgb(242, 242, 242)',
    card: 'rgb(255, 255, 255)',
    text: 'rgb(28, 28, 30)',
    border: 'rgb(199, 199, 204)',
    notification: 'rgb(255, 69, 58)',
    ...color,
  },
  property: {
    header: {
      align: 'left',
      size: '27',
      padding: '0',
      weight: '800',
      color: color.textMain,
    },
    desc: {
      align: 'left',
      size: '15',
      padding: '5',
      weight: '400',
      color: color.textDesc,

    },
    button: {
      size: "24",
      weight: "700",
      color: color.textMain,
      align: 'center',
      transform: 'uppercase'
    },
    statusBar: {
      animated: true,
      backgroundColor: color.lightBlue,
      barStyle: 'light-content',
      showHideTransition: 'fade',
      hidden: false
    },
    input: {
      backgroundColor: color.textMain,
      margin: 10,
      minHeight: 50,
      borderRadius: 10,
      paddingHorizontal: 10,
      fontWeight: '900',
      color: color.appBack
    }
  },
  container: {
    container: {
      flex: 1,
      width: widthScreen,
      justifyContent: 'space-between',
    },
    card: {
      padding: 25,
      backgroundColor: color.lightBlue,
      flex: 1,
      borderRadius: 10,
      justifyContent: 'space-between',
    },
    dots: {
      row: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: 50,
        marginVertical: 10
      },
      column: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
      },
    },
    buttonContainerDown: {
      height: 100,
      flex: 1,
      justifyContent: 'flex-end',
      paddingHorizontal: 10,
    },
  },
  dots: {
    width: 10,
    height: 10,
    backgroundColor: 'red',
    borderRadius: 10,
    marginHorizontal: 20,
  },
  button: {
    button: {
      backgroundColor: color.lightBlue,
      minHeight: 60,
      borderRadius: 10,
      alignItems: 'center',
      justifyContent: 'center',
      marginVertical: 20,
      size: '18',
      weight: '900',
      color: '#FFFFFF',
    },
  },
};

export default MyTheme;
