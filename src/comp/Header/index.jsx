import React from 'react';
import {
    Image,
    SafeAreaView,
    TouchableOpacity,
    View,
    StyleSheet,
} from 'react-native';
import LabelText from '../../style/LabelText';
import { useTheme } from '@react-navigation/native';

const defaultUri =
    'https://sun9-20.userapi.com/c850424/v850424285/1885fd/4BasTBUdyy8.jpg';

const Header = props => {
    const [state, setState] = React.useState(props.photo);
    const { colors, property, container } = useTheme();

    return (
        <SafeAreaView style={container.dots}>
            <TouchableOpacity
                disabled={!props.onPress}
                onPress={props.onPress}
                style={styles.touch}>
                <View style={{ flex: 1 }}>
                    <LabelText {...property.desc} color={[colors.textDesc]}>
                        {props.header}
                    </LabelText>
                    <LabelText {...property.header} color={[colors.textMain]}>
                        {props.desc}
                    </LabelText>
                </View>
                {props?.photo ? (
                    <TouchableOpacity
                        disabled={!props.onPressPhoto}
                        onPress={props.onPressPhoto}>
                        <Image
                            source={{
                                uri: state,
                            }}
                            onError={() => setState(defaultUri)}
                            style={styles.image}
                        />
                    </TouchableOpacity>
                ) : (
                    <View />
                )}
            </TouchableOpacity>
        </SafeAreaView>
    );
};

export default Header;

const styles = StyleSheet.create({
    image: { width: 50, height: 50, borderRadius: 10 },
    touch: {
        flexDirection: 'row',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
    },
    container: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
