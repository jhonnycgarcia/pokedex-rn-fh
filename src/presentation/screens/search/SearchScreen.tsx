import { View, FlatList } from 'react-native';
import { globalTheme } from '../../../config/theme/global-theme';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ActivityIndicator, Text, TextInput } from 'react-native-paper';
import { Pokemon } from '../../../domain/entities/pokemon';
import { PokemonCard } from '../../components';
import { getPokemonNameWithId } from '../../../actions';
import { useQuery } from '@tanstack/react-query';
import { useMemo, useState } from 'react';

export const SearchScreen = () => {
    const { top } = useSafeAreaInsets();
    const [term, setTerm] = useState('');

    const { data: pokemonNameList, isLoading } = useQuery({
        queryKey: ['pokemons', 'all'],
        queryFn: () => getPokemonNameWithId(),
    });

    const pokemonNameIdList = useMemo(() => {
        // es un numero
        if(!isNaN(Number(term))) {
            const pokemon = pokemonNameList?.find((item) => item.id === Number(term));
            return pokemon ? [pokemon] : [];
        }

        if(term.length === 0) return [];

        if(term.length < 3) return [];

        return pokemonNameList?.filter((item) => item.name.includes(term.toLowerCase())) ?? [];
    });

    return (
        <View style={[globalTheme.globalMargin, { paddingTop: top + 10 }]}>
            <TextInput
                placeholder="Buscar pokemon"
                mode="flat"
                autoFocus
                autoCorrect={false}
                onChangeText={setTerm}
                value={term}
            />

            <ActivityIndicator style={{ paddingTop: 20 }} size="large" />

            <Text>{JSON.stringify(pokemonNameIdList, null, 2)}</Text>

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
