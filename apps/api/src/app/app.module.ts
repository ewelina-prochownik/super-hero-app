import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { MongooseModule } from '@nestjs/mongoose';
import { join } from 'path';
import { HeroesModule } from '../heroes/heroes.module';

@Module({
  imports: [
    GraphQLModule.forRoot({ autoSchemaFile: join(process.cwd(), 'src/schema.gql') }),
    MongooseModule.forRoot('mongodb://localhost:27017/hero-comparator'),
    HeroesModule
  ]
})
export class AppModule {
}
