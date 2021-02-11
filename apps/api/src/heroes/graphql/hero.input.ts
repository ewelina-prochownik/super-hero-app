import { Field, InputType, Int, ObjectType } from '@nestjs/graphql';
import { IDuel, IHero, IStats } from '@super-hero-comparator/api-interfaces';
import { Duel, Stats } from './hero.model';
import { Type } from '@angular/core';

@InputType()
export class StatsInput implements IStats {
  @Field(type => Int)
  intelligence: number;

  @Field(type => Int)
  strength: number;

  @Field(type => Int)
  speed: number;

  @Field(type => Int)
  hp: number;
}

@InputType()
export class DuelInput implements IDuel {
  @Field()
  isWin: boolean;

  @Field(type => String)
  enemyId: string;

  @Field()
  date: Date;
}
@InputType()
export class HeroInput {
  @Field(type => String,{nullable: true})
  id?: string;

  @Field(type => String)
  name: string;

  @Field(type => String)
  image: string;

  @Field(type => Boolean)
  favourite: boolean;

  @Field(type => String, { nullable: true })
  notes?: string;

  @Field(type => StatsInput)
  stats: StatsInput;

  @Field(type => [DuelInput],{nullable: true})
  fights?: DuelInput[];
}
