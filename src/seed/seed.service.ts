import { Injectable } from '@nestjs/common';
import axios, { AxiosInstance } from 'axios';
import { PokeResponse } from './interfaces/poke-response.interface';


@Injectable()
export class SeedService {

  private readonly axios: AxiosInstance = axios;

  async executeSeed() {

    const { data } = await this.axios.get<PokeResponse>('https://pokeapi.co/api/v2/pokemon?limit=1');
    // console.log(data);
    data.results.forEach(pokemon => {
      const pokemonName = pokemon.name;
      const url = pokemon.url;
      const id = url.split('/')[6];
      console.log(`Pokemon: ${pokemonName}, ID: ${id}`);
      console.log(`Pokemon name ${pokemonName} with ID ${id} will be saved to the database.`);
    })


    return data.results;
  }

}
