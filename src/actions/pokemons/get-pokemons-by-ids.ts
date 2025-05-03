import { Pokemon } from '../../domain/entities/pokemon';
import { getPokemonById } from './get-pokemon-by-id';

export const getPokemonsByIds = async (ids: number[]): Promise<Pokemon[]> => {
    try {
        const pokemonPromises: Promise<Pokemon>[] = ids
            .map((id) => getPokemonById(id.toString()));

        return await Promise.all(pokemonPromises);
    } catch (error) {
        throw new Error(`Error fetching pokemons by ids: ${ids}`);
    }
};
