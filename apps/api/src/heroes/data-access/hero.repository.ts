import { Injectable } from '@nestjs/common';
import { Hero, HeroDocument } from './hero.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IDuel, IHero } from '@super-hero-comparator/api-interfaces';
import * as mongoose from 'mongoose';


@Injectable()
export class HeroRepository {
  constructor(@InjectModel(Hero.name) private heroModel: Model<HeroDocument>) {
  }

  async create(heroDto: IHero): Promise<Hero> {
    const createdHero = new this.heroModel(heroDto);
    createdHero._id = new mongoose.Types.ObjectId();
    return createdHero.save();
  }

  async update(_id: string, hero: IHero): Promise<Hero> {
    const id = mongoose.Types.ObjectId(_id);
    return this.heroModel.findByIdAndUpdate(id, { $set: hero }, { new: true }).exec();
  }

  async delete(_id: string): Promise<Hero> {
    const id = mongoose.Types.ObjectId(_id);
    return this.heroModel.findByIdAndDelete(id).exec();
  }

  async findAll(skip = 0, limit = 10): Promise<Hero[]> {
    return this.heroModel.find().skip(skip).limit(limit).exec();
  }

  async findById(_id: string): Promise<Hero> {
    const id = mongoose.Types.ObjectId(_id);
    return this.heroModel.findById(id).exec();
  }

  async findRandom(): Promise<Hero> {
    const found = await this.heroModel.aggregate([{ $sample: { size: 1 } }]).exec();
    return found[0];
  }

  async toggleFavouriteHero(_id: string, favourite: boolean): Promise<Hero> {
    const id = mongoose.Types.ObjectId(_id);
    return this.heroModel.findByIdAndUpdate(id, { $set: { favourite } }, { new: true }).exec();
  }

  async findAllFavouriteHeroes(skip = 0, limit = 10): Promise<Hero[]> {
    return this.heroModel.find({ favourite: true }).skip(skip).limit(limit).exec();
  }

  async addFightResult(id: string, duels: IDuel[]): Promise<Hero> {
    return this.heroModel.findByIdAndUpdate(id, { $set: { fights: duels } }, { new: true }).exec();
  }

}
