import { Module } from '@nestjs/common';
import { HeroResolver } from './graphql/heroes.resolver';
import { MongooseModule } from '@nestjs/mongoose';
import { Hero, HeroSchema } from './data-access/hero.schema';
import { HeroRepository } from './data-access/hero.repository';

@Module({
  imports: [MongooseModule.forFeature([{ name: Hero.name, schema: HeroSchema }])],
  providers: [HeroResolver, HeroRepository]
})
export class HeroesModule {
}
