import { pokeApi } from '../../config/api/pokeApi';
import type { Pokemon } from '../../domain/entities/pokemon';
import type { PokeAPIPokemon } from '../../infrastructure/interfaces/pokeApi.interfaces';
import { PokemonMapper } from '../../infrastructure/mappers/pokemon.mapper';

export const getPokemonById = async(id: string):Promise<Pokemon> => {
    try {
        const url = `/pokemon/${id}`;
        const  { data } = await pokeApi.get<PokeAPIPokemon>(url);
        const pokemon = await PokemonMapper.pokeApiPokemonToEntity(data);
        return pokemon;

    } catch (error) {
        throw new Error(`Error fetching pokemon by id: ${id}`);
    }
};
