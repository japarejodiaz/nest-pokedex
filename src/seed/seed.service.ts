import { Injectable } from '@nestjs/common';
import axios, { AxiosInstance } from 'axios';
import { PokeResponse } from './interfaces/poke-response.interface';
import { InjectModel } from '@nestjs/mongoose';
import { Pokemon } from '../pokemon/entities/pokemon.entity';
import { Model } from 'mongoose';
import { AxiosAdapter } from '../common/adapters/axios.adapter';



@Injectable()
export class SeedService {

  constructor(@InjectModel(Pokemon.name)
              private readonly pokemonModel: Model<Pokemon>,
              private readonly http: AxiosAdapter) {

  }

  async executeSeed() {
    await this.pokemonModel.deleteMany({});
    const data = await this.http.get<PokeResponse>('https://pokeapi.co/api/v2/pokemon?limit=650');
    const pokemonToInsert: { name: string, no: number }[] = [];

    data.results.forEach((async pokemon => {
      const pokemonName = pokemon.name;
      const url = pokemon.url;
      const id = url.split('/')[6];
      console.log(`Pokemon name ${pokemonName} with ID ${id} will be saved to the database.`);

      pokemonToInsert.push({
        name: pokemonName,
        no: +id,
      })

    }))
    await this.pokemonModel.insertMany(pokemonToInsert);
    return 'Seed executed successfully!';
  }
}
