import { useTheme } from '@react-navigation/native';
import * as R from 'ramda';
import React from 'react';
import { FlatList, TouchableOpacity, View } from 'react-native';
import LabelText from '../../style/LabelText';
import AssetsRender from './currentAssets';
import InfoAssets from './Info';

const Market = ({ state, search }) => {
  const [filter, setFilter] = React.useState('ALL');
  const { colors, property } = useTheme();
  const [sort, setSort] = React.useState('name')

  React.useEffect(() => {
    setFilter('ALL')
  }, [search])

  const fn = (a, b) => {
    if (sort === 'name') {
      return a.name.localeCompare(b.name)
    }
    if (sort === 'price') {
      return b.last - a.last
    }
    if (sort === 'volume') {
      return b.quoteVolume24h - a.quoteVolume24h
    }
  }


  const memoData = React.useMemo(
    () =>
      R.pipe(
        R.sort((a, b) => a.name.localeCompare(b.name)),
        x =>
          R.cond([
            [
              R.T,
              () =>
                R.filter(
                  R.pipe(
                    R.path(['name']),
                    R.includes(
                      R.ifElse(
                        R.equals('ALL'),
                        R.always(''),
                        R.always(R.defaultTo('')(filter)),
                      )(filter),
                    ),
                  ),
                )(x),
            ],
          ])(filter),
        R.sort(fn),
      )(state),
  );

  return (
    <>
      {!search && <InfoAssets state={state} setFilter={setFilter} />}
      <FlatList
        data={memoData}
        keyExtractor={(_item, index) => index.toString() + '_InfoMode'}
        contentContainerStyle={{ minHeight: R.length(state) * 100 }}
        keyExtractor={(_item, index) => index.toString() + '_MarketStock'}
        initialNumToRender={10}
        ListHeaderComponent={() => (
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
            <TouchableOpacity onPress={() => console.log('sds')}>
              <LabelText
                {...property.header}
                color={colors.textMain}
                style={{ margin: 15 }}>
                ASSETS
              </LabelText>
            </TouchableOpacity>
            <View style={{ alignItems: 'center' }}>
              <LabelText
                {...property.desc}
                color={colors.textMain}
                weight="900"
              >
                СОРТИРОВКА
              </LabelText>
              <View style={{ flexDirection: 'row' }}>
                <TouchableOpacity onPress={() => setSort('price')}>
                  <LabelText
                    {...property.desc}
                    color={colors.textMain}
                    style={{ marginHorizontal: 5 }}
                  >
                    price
                  </LabelText>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setSort('volume')}>
                  <LabelText
                    {...property.desc}
                    color={colors.textMain}
                    style={{ marginHorizontal: 5 }}>
                    volume
                  </LabelText>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setSort('name')}>
                  <LabelText
                    {...property.desc}
                    color={colors.textMain}
                    style={{ marginHorizontal: 5 }}>
                    assets
                  </LabelText>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        )}
        renderItem={props => <AssetsRender {...props} />}
      />
    </>
  );
};

export default Market;
