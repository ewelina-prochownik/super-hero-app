import { Field, Int, ObjectType } from '@nestjs/graphql';
import { IDuel, IHero, IStats, IWinningStatistics } from '@super-hero-comparator/api-interfaces';

@ObjectType()
export class Stats implements IStats {
  @Field(type => Int)
  intelligence: number;

  @Field(type => Int)
  strength: number;

  @Field(type => Int)
  speed: number;

  @Field(type => Int)
  hp: number;
}

@ObjectType()
export class Hero implements IHero {
  @Field(type => String, {nullable: true})
  _id?: string;

  @Field()
  name: string;

  @Field()
  image: string;

  @Field()
  favourite: boolean;

  @Field({ nullable: true })
  notes?: string;

  @Field(type => Stats)
  stats: Stats;

  @Field(type => [Duel], {nullable: true})
  fights?: Duel[];
}

@ObjectType()
export class Duel implements IDuel {
  @Field()
  isWin: boolean;

  @Field(type => String)
  enemyId: string;

  @Field()
  date: Date;
}
