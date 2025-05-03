import { View, FlatList } from 'react-native';
import { globalTheme } from '../../../config/theme/global-theme';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ActivityIndicator, TextInput } from 'react-native-paper';
import { Pokemon } from '../../../domain/entities/pokemon';
import { PokemonCard } from '../../components';
import { getPokemonNameWithId } from '../../../actions';
import { useQuery } from '@tanstack/react-query';

export const SearchScreen = () => {
    const { top } = useSafeAreaInsets();

    const { data: pokemonNameList, isLoading } = useQuery({
        queryKey: ['pokemons', 'all'],
        queryFn: () => getPokemonNameWithId(),
    });

    return (
        <View style={[globalTheme.globalMargin, { paddingTop: top + 10 }]}>
            <TextInput
                placeholder="Buscar pokemon"
                mode="flat"
                autoFocus
                autoCorrect={false}
                onChangeText={() => {}}
                value={''}
            />

            <ActivityIndicator style={{ paddingTop: 20 }} size="large" />

            <FlatList
                data={[] as Pokemon[]}
                keyExtractor={(item, index) => `${item.id}-${index}`}
                numColumns={2}
                style={{ paddingTop: top + 20 }}
                renderItem={({ item }) => (
                    <PokemonCard pokemon={item} />
                )}
                onEndReachedThreshold={ 0.6 }
            />
        </View>
    );
};
