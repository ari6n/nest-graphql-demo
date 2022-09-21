import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateOwnerInput } from './dto/create-owner.input';
import { UpdateOwnerInput } from './dto/update-owner.input';
import { Owner } from './entities/owner.entity';

@Injectable()
export class OwnersService {
  constructor(@InjectRepository(Owner) private ownersRepository: Repository<Owner>) {}

  create(createOwnerInput: CreateOwnerInput): Promise<Owner> {        // (!) there was no ": Promise<Owner>" in video
    const newOwner = this.ownersRepository.create(createOwnerInput);

    return this.ownersRepository.save(newOwner);
  }

  findAll() {
    return this.ownersRepository.find();
  }

  findOne(id: number) {
    return this.ownersRepository.findOneByOrFail({id: id});
  }

  update(id: number, updateOwnerInput: UpdateOwnerInput) {            // ToDo: Implement later by myself
    return `This action updates a #${id} owner`;
  }

  remove(id: number) {                                                // ToDo: Implement later by myself
    return `This action removes a #${id} owner`;
  }
}
