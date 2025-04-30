import { useQuery } from '@tanstack/react-query';
import { StyleSheet, View } from 'react-native';
import { getPokemons } from '../../../actions';
import { PokemonBallBg } from '../../components';

export const HomeScreen = () => {
    const { data = [], isLoading } = useQuery({
        queryKey: ['pokemons'],
        queryFn: () => getPokemons(),
        staleTime: 1000 * 60 * 60, // 60 minutes
    });

    return (
        <View>
            <PokemonBallBg style={styles.imgPosition} />
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
