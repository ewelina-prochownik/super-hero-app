import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { IDuel, IHero, IStats } from '@super-hero-comparator/api-interfaces';
import { Int } from '@nestjs/graphql';
import * as mongoose from 'mongoose'

export type HeroDocument = Hero & Document;


@Schema()
export class Stats implements IStats {
  @Prop({ type: Int, required: true })
  intelligence: number;

  @Prop({ type: Int, required: true })
  strength: number;

  @Prop({ type: Int, required: true })
  speed: number;

  @Prop({ type: Int, required: true })
  hp: number;
}

@Schema()
export class Duel implements IDuel {
  @Prop()
  isWin: boolean;

  @Prop({ type: String, required: true })
  enemyId: string;

  @Prop({ required: true })
  date: Date;
}

@Schema()
export class Hero implements IHero {
  @Prop({ type: mongoose.Types.ObjectId })
  _id: string;

  @Prop({ required: true })
  image: string;

  @Prop({ required: true })
  name: string;

  @Prop()
  notes: string;

  @Prop()
  favourite: boolean;

  @Prop({ type: Stats, required: true })
  stats: Stats;

  @Prop([Duel])
  fights: Duel[];
}


export const HeroSchema = SchemaFactory.createForClass(Hero);
