import { pokeApi } from '../../config/api/pokeApi';
import type { Pokemon } from '../../domain/entities/pokemon';
import type { PokeAPIPaginatedResponse, PokeAPIPokemon } from '../../infrastructure/interfaces/pokeApi.interfaces';
import { PokemonMapper } from '../../infrastructure/mappers/pokemon.mapper';

export const getPokemons = async(page: number = 0, limit: number = 20):Promise<Pokemon[]> => {
    try {
        const url = `/pokemon?offset=${page * limit}&limit=${limit}`;
        const  { data } = await pokeApi.get<PokeAPIPaginatedResponse>(url);

        const pokemosPromises = data.results.map((info) => {
            return pokeApi.get<PokeAPIPokemon>(info.url);
        });

        const pokeApiPokemons = await Promise.all(pokemosPromises);
        const pokemonsPromises = pokeApiPokemons.map(({data: item}) => {
            return PokemonMapper.pokeApiPokemonToEntity(item);
        });

        const pokemons = await Promise.all(pokemonsPromises);

        return pokemons;

    } catch (error) {
        throw new Error('Error fetching pokemons');
    }
};
