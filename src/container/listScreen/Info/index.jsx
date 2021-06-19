import { useTheme } from '@react-navigation/native';
import * as R from 'ramda';
import React from 'react';
import {
    Dimensions,
    FlatList, StyleSheet, View
} from 'react-native';
import LabelText from '../../../style/LabelText';
import { color } from '../../../theme';
import CardRender from './cardRender';

const InfoAssets = props => {
    const [state, setState] = React.useState(0);
    const [about, setAbout] = React.useState(null);
    const { colors, property } = useTheme();
    const snap = Dimensions.get('screen').width * 0.5;

    const nameFilter = R.pipe(
        R.path(['state']),
        R.defaultTo([]),
        R.map(R.pipe(R.path(['name']), R.split('-'), R.last)),
        R.reject(R.includes('/')),
        R.uniq,
        R.sort((a, b) => a.localeCompare(b)),
        R.concat(['ALL', 'USDT', 'USD', 'BTC', 'ETH']),
    )(props);

    const assets = filter =>
        R.pipe(R.path(['state']), R.defaultTo([]), x =>
            R.cond([
                [
                    R.T,
                    () =>
                        R.filter(
                            R.pipe(
                                R.path(['name']),
                                R.includes(filter === 'ALL' ? '' : R.defaultTo('')(filter)),
                            ),
                        )(x),
                ],
            ])(filter),
        )(props);

    const handleScroll = event => {
        let index = Math.ceil(event.nativeEvent.contentOffset.x / snap);
        setState(index);
        setAbout(null);
        props.setFilter(R.path([state])(nameFilter));
    };

    return (
        <>
            <FlatList
                horizontal
                pagingEnabled
                onScroll={handleScroll}
                snapToInterval={snap}
                decelerationRate="fast"
                data={nameFilter}
                keyExtractor={(_item, index) => index.toString() + 'AssetCard'}
                contentContainerStyle={[styles.cardContainer, { minHeight: snap }]}
                renderItem={element => (
                    <CardRender
                        {...element}
                        assets={assets(element.item === 'ALL' ? '' : element.item)}
                        snap={snap}
                        state={state}
                        onPress={setAbout}
                    />
                )}
                ListEmptyComponentListEmptyComponent={() => <CardRender />}
            />
            {about && (
                <View>
                    <LabelText
                        {...property.desc}
                        color={colors.textMain}
                        style={{ textTransform: 'uppercase' }}>
                        Mean 1H :
                        {R.pipe(
                            R.map(R.path(['change1h'])),
                            R.mean,
                            R.toString,
                            R.take(7),
                        )(assets(about))}
                    </LabelText>
                    <LabelText
                        {...property.desc}
                        color={colors.textMain}
                        style={{ textTransform: 'uppercase' }}>
                        Mean 24H :
                        {R.pipe(
                            R.map(R.path(['change24h'])),
                            R.mean,
                            R.toString,
                            R.take(7),
                        )(assets(about))}
                    </LabelText>
                </View>
            )}
        </>
    );
};

export default InfoAssets;

const styles = StyleSheet.create({
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
});
