import { useInfiniteQuery, useQueryClient } from '@tanstack/react-query';
import { StyleSheet, View } from 'react-native';
import { getPokemons } from '../../../actions';
import { PokemonBallBg, PokemonCard } from '../../components';
import { FlatList } from 'react-native-gesture-handler';
import { ActivityIndicator, FAB, Text, useTheme } from 'react-native-paper';
import { globalTheme } from '../../../config/theme/global-theme';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { RootStackParams } from '../../navigator/StackNavigator';
import { StackScreenProps } from '@react-navigation/stack';

interface Props extends StackScreenProps<RootStackParams, 'HomeScreen'> {}

export const HomeScreen = ({ navigation }: Props) => {
    const { top } = useSafeAreaInsets();
    const queryClient = useQueryClient();
    const theme = useTheme();

    // esta es la forma tradicional de realizar una peticion HTTP
    // const { data: pokemons = [], isLoading } = useQuery({
    //     queryKey: ['pokemons'],
    //     queryFn: () => getPokemons(),
    //     staleTime: 1000 * 60 * 60, // 60 minutes
    // });

    const { data, isLoading, fetchNextPage } = useInfiniteQuery({
        queryKey: ['pokemons', 'infinite'],
        initialPageParam: 0,
        staleTime: 1000 * 60 * 60, // 60 minutes
        queryFn: async({ pageParam = 0 }) => {
            const pokemons = await getPokemons(pageParam);

            pokemons.forEach(pokemon => {
                queryClient.setQueryData(['pokemon', pokemon.id], pokemon);
            });

            return pokemons;
        },
        getNextPageParam: (lastPage, pages) => pages.length,

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
                ListFooterComponent={() => (
                    <ActivityIndicator size="large" />
                )}
            />

            <FAB
                label="Buscar"
                style={[globalTheme.fab, { backgroundColor: theme.colors.primary }]}
                mode="elevated"
                color={ theme.dark ? 'black' : 'white' }
                onPress={() => navigation.push('SearchScreen') }
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
