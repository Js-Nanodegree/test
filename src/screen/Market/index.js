import React from 'react';
import {
    View,
    Text,
    SafeAreaView,
    FlatList,
    Dimensions,
    StyleSheet,
} from 'react-native';

const UiColor = {
    black: '#17181B',
    white: '#ffffff',
    background: '#23252A',
    green: '#89BD4F',
};

const windowWight = Dimensions.get('screen').width;

const data = [
    {
        coin: 'BTC',
        price: '$ 123,232',
        change: '+ 1.2%',
    },
    {
        coin: 'ADA',
        price: '$ 123,232',
        change: '+ 1.2%',
    },
    {
        coin: 'XRP',
        price: '$ 123,232',
        change: '+ 1.2%',
    },
    {
        coin: 'SOLANA',
        price: '$ 123,232',
        change: '+ 1.2%',
    },
    {
        coin: 'TRX',
        price: '$ 123,232',
        change: '+ 1.2%',
    },
    {
        coin: 'TETHER',
        price: '$ 123,232',
        change: '+ 1.2%',
    },
];

const HomeScreen = () => (
    <SafeAreaView style={styles.container}>
        <FlatList
            data={data}
            extraData={data}
            keyExtractor={(item, index) => index.toString()}
            contentContainerStyle={{ width: windowWight - windowWight / 5 }}
            renderItem={props => (
                <View style={{ flex: 1 }}>
                    <View
                        style={[
                            props.index % 2 && {
                                backgroundColor: UiColor.black,
                            },
                            styles.wrapper,
                        ]}>
                        <View style={styles.row}>
                            <View style={styles.coin} />
                            <Text style={[styles.fontIn, { fontWeight: "900" }]}>{props.item.coin}</Text>
                        </View>
                        <View style={styles.center}>
                            <Text style={styles.fontIn}>{props.item.price}</Text>
                        </View>
                        <View style={styles.change}>
                            <Text style={[styles.fontIn]}>{props.item.change}</Text>
                        </View>
                    </View>
                </View>
            )}
            ListHeaderComponent={() => (
                <>
                    <View style={[styles.wrapperComp, { flexDirection: 'row', alignItems: 'center', flex: 1, justifyContent: 'space-between' }]}>
                        <Text style={styles.header}>Cardano</Text>
                        <Text style={[styles.header, { fontSize: 16, justifyContent: 'center', color: UiColor.green }]}>1.38650</Text>
                    </View>


                    <View style={{ flexDirection: 'row', flex: 1, borderTopWidth: 1, borderBottomWidth: 1, marginVertical: 10, borderColor: '#ffffff', padding: 10, }}>
                        <View style={{ flex: 1, alignItems: 'center' }}>
                            <Text style={[styles.fontIn, { paddingBottom: 5, color: "#7F8183" }]}>Future</Text>
                            <Text style={[styles.fontIn, { fontWeight: "900" }]}>1.300</Text>
                        </View>
                        <View style={{ flex: 1, alignItems: 'center', borderLeftWidth: 1, borderRightWidth: 1, borderColor: '#ffffff' }}>
                            <Text style={[styles.fontIn, { paddingBottom: 5, color: "#7F8183" }]}>Trade</Text>
                            <Text style={[styles.fontIn, { fontWeight: "900" }]}>300</Text>
                        </View>
                        <View style={{ flex: 1, alignItems: 'center' }}>
                            <Text style={[styles.fontIn, { paddingBottom: 5, color: "#7F8183" }]}>Total</Text>
                            <Text style={[styles.fontIn, { fontWeight: "900" }]}>1.600</Text>
                        </View>
                    </View>

                    <View style={styles.wrapperComp}>
                        <Text style={[styles.fontIn]}>My wallet</Text>
                        <Text style={[styles.fontIn]}>1x123dkffkkffkx231e123s</Text>
                    </View>

                    <View style={{ flexDirection: 'row', flex: 1, borderTopWidth: 1, borderBottomWidth: 1, marginVertical: 10, borderColor: '#ffffff', padding: 10, }}>
                        <View style={{ flex: 1, alignItems: 'center' }}>
                            <Text style={[styles.fontIn, { paddingBottom: 5, color: "#7F8183" }]}>Daily High</Text>
                            <Text style={[styles.fontIn, { fontWeight: "900" }]}>1.16305</Text>
                        </View>
                        <View style={{ flex: 1, alignItems: 'center', borderLeftWidth: 1, borderRightWidth: 1, borderColor: '#ffffff' }}>
                            <Text style={[styles.fontIn, { paddingBottom: 5, color: "#7F8183" }]}>Daily Low</Text>
                            <Text style={[styles.fontIn, { fontWeight: "900" }]}>1.08305</Text>
                        </View>
                        <View style={{ flex: 1, alignItems: 'center' }}>
                            <Text style={[styles.fontIn, { paddingBottom: 5, color: "#7F8183" }]}>Fear Index</Text>
                            <Text style={[styles.fontIn, { fontWeight: "900" }]}>76%</Text>
                        </View>
                    </View>
                </>
            )}
            ListFooterComponent={() => <View />}
        />
        <View style={{ width: windowWight / 5, backgroundColor: UiColor.white }} />
    </SafeAreaView>
);

const BackButton = () => {
    return (
        <View
            style={{
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: UiColor.background,
            }}>
            <View
                style={{
                    rotation: 100,
                    flexDirection: 'row',
                    backgroundColor: UiColor.black,
                }}>
                <View
                    style={{
                        padding: 5,
                        paddingHorizontal: 20,
                        borderTopRightRadius: 20,
                        backgroundColor: UiColor.background,
                    }}
                />
                <View style={{ backgroundColor: UiColor.background }}>
                    <View
                        style={{
                            padding: 10,
                            backgroundColor: UiColor.black,
                            paddingHorizontal: 20,
                            borderBottomLeftRadius: 20,
                            borderBottomRightRadius: 20,
                        }}>
                        <Text style={{ color: UiColor.white }}>back</Text>
                    </View>
                </View>
                <View
                    style={{
                        padding: 5,
                        paddingHorizontal: 20,
                        borderTopLeftRadius: 20,
                        backgroundColor: UiColor.background,
                    }}
                />
            </View>
        </View>
    );
};

export default HomeScreen;

const styles = StyleSheet.create({
    header: { color: UiColor.white, fontWeight: '700', fontSize: 30 },
    wrapperComp: { flex: 1, maxHeight: 100, margin: 15 },
    container: {
        backgroundColor: UiColor.background,
        flex: 1,
        flexDirection: 'row',
    },
    wrapper: {
        marginHorizontal: 10,
        flexDirection: 'row',
        paddingVertical: 20,
        borderColor: UiColor.white,
    },
    center: {
        width: (windowWight - windowWight / 5) / 3,
        justifyContent: 'center',
        flex: 1,
    },
    change: {
        width: (windowWight - windowWight / 5) / 3.5,
        justifyContent: 'flex-end',
        flex: 1,
        paddingHorizontal: 20,
    },
    coin: {
        backgroundColor: 'red',
        width: 25,
        height: 25,
        marginHorizontal: 5,
    },
    row: {
        width: (windowWight - windowWight / 5) / 3,
        flexDirection: 'row',
        alignItems: 'center',
    },
    fontIn: {
        color: UiColor.white,
        fontWeight: '400',
        fontSize: 14,
    },
});
