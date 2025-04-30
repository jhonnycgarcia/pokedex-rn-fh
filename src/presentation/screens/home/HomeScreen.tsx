import { useQuery } from '@tanstack/react-query';
import { View } from 'react-native';
import { ActivityIndicator, Button, Text } from 'react-native-paper';
import { getPokemons } from '../../../actions';

export const HomeScreen = () => {
    const { data, isLoading } = useQuery({
        queryKey: ['pokemons'],
        queryFn: () => getPokemons(),
        staleTime: 1000 * 60 * 60, // 60 minutes
    });

    return (
        <View>
            <Text variant="headlineLarge">HomeScreen</Text>
            { (isLoading)
                ? <ActivityIndicator />
                : <Button mode="contained" onPress={() => console.log('Pressed')}>
                    Press me
                </Button>
            }
        </View>
    );
};
