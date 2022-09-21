import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Owner } from 'src/owners/entities/owner.entity';    // (!) In video "src/" is replaced by "../" - why??
import { OwnersService } from 'src/owners/owners.service';
import { Repository } from 'typeorm';
import { CreatePetInput } from './dto/create-pet.input';
import { Pet } from './pet.entity'

@Injectable()
export class PetsService {
    constructor(@InjectRepository(Pet) private petsRepository: Repository<Pet>, 
                private ownersService: OwnersService) {}

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

    findOne(id: number): Promise<Pet> {
        return this.petsRepository.findOneByOrFail({id: id});   // findOneOrFail(id) doesn't work in new version of typeorm
                                                                // Backward compatibility is sucks yet in NestJS and 3-rd-party packages :(
    }

    getOwner(ownerId: number): Promise<Owner> {
        return this.ownersService.findOne(ownerId);
    }
}
