import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePetInput } from './dto/create-pet.input';
import { Pet } from './pet.entity'

@Injectable()
export class PetsService {
    constructor(@InjectRepository(Pet) private petsRepository: Repository<Pet>) {}

    createPet(createPetInput: CreatePetInput): Promise<Pet> {
        const newPet = this.petsRepository.create(createPetInput);  // newPet = new Pet(); new.name = input.name;

        return this.petsRepository.save(newPet);    // INSERTorUPDATE INTO pet
    }

    async findAll(): Promise<Pet[]> {
        // const pet = new Pet();
        // pet.id = 1;
        // pet.name = "Mambo";

        // return [pet];

        return this.petsRepository.find();      // SELECT * pet
    }
}
