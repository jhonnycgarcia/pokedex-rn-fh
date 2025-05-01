import { useInfiniteQuery } from '@tanstack/react-query';
import { StyleSheet, View } from 'react-native';
import { getPokemons } from '../../../actions';
import { PokemonBallBg, PokemonCard } from '../../components';
import { FlatList } from 'react-native-gesture-handler';
import { ActivityIndicator, Text } from 'react-native-paper';
import { globalTheme } from '../../../config/theme/global-theme';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export const HomeScreen = () => {
    const { top } = useSafeAreaInsets();

    // esta es la forma tradicional de realizar una peticion HTTP
    // const { data: pokemons = [], isLoading } = useQuery({
    //     queryKey: ['pokemons'],
    //     queryFn: () => getPokemons(),
    //     staleTime: 1000 * 60 * 60, // 60 minutes
    // });

    const { data, isLoading, fetchNextPage } = useInfiniteQuery({
        queryKey: ['pokemons', 'infinite'],
        initialPageParam: 0,
        queryFn: ({ pageParam = 0 }) => getPokemons(pageParam),
        getNextPageParam: (lastPage, pages) => pages.length,
        staleTime: 1000 * 60 * 60, // 60 minutes
    });

    return (
        <View
            style={globalTheme.globalMargin}
        >
            <PokemonBallBg style={styles.imgPosition} />
            <FlatList
                data={data?.pages.flat() ?? []}
                keyExtractor={(item, index) => `${item.id}-${index}`}
                numColumns={2}
                style={{ paddingTop: top + 20 }}
                ListHeaderComponent={() => (
                    <Text variant="displayMedium">Pokedex</Text>
                )}
                renderItem={({ item }) => (
                    <PokemonCard pokemon={item} />
                )}
                onEndReachedThreshold={ 0.6 }
                onEndReached={() => fetchNextPage()}
                showsVerticalScrollIndicator={false}
                // ListFooterComponent={() => (
                //     <ActivityIndicator size="large" color={globalTheme.colors.primary} />
                // )}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    imgPosition: {
        position: 'absolute',
        top: -100,
        right: -100,
        opacity: 0.3,
    },
});
