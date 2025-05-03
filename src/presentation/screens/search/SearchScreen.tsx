import { View, FlatList } from 'react-native';
import { globalTheme } from '../../../config/theme/global-theme';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ActivityIndicator, Text, TextInput } from 'react-native-paper';
import { Pokemon } from '../../../domain/entities/pokemon';
import { FullScreenLoader, PokemonCard } from '../../components';
import { getPokemonNameWithId, getPokemonsByIds } from '../../../actions';
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
    }, [term]);

    const { data: pokemons = [], isLoading: isLoadingPokemons } = useQuery({
        queryKey: ['pokemons', 'by', pokemonNameIdList],
        queryFn: () => getPokemonsByIds(pokemonNameIdList.map((item) => item.id)),
        staleTime: 1000 * 60 * 5, // 5 minutos
    });

    if(isLoading) {
        return (<FullScreenLoader />);
    }

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

            { isLoadingPokemons && <ActivityIndicator style={{ paddingTop: 20 }} size="large" /> }

            <FlatList
                data={pokemons}
                keyExtractor={(item, index) => `${item.id}-${index}`}
                numColumns={2}
                style={{ paddingTop: top + 20 }}
                renderItem={({ item }) => (<PokemonCard pokemon={item} />)}
                showsVerticalScrollIndicator={false}
                ListFooterComponent={ <View style={{ height: 120 }} /> }
            />
        </View>
    );
};
