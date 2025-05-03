import { pokeApi } from '../../config/api/pokeApi';
import { PokeAPIPaginatedResponse } from '../../infrastructure/interfaces/pokeApi.interfaces';

export const getPokemonNameWithId = async () => {
    const url = 'pokemon?limit=1000';
    const { data } = await pokeApi.get<PokeAPIPaginatedResponse>(url);
    return data.results.map((info) => ({
        id: Number(info.url.split('/').at(-2)),
        name: info.name,
    }));
};
