import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Hero } from './hero.model';
import { HeroRepository } from '../data-access/hero.repository';
import { IDuel, IHero } from '@super-hero-comparator/api-interfaces';
import { HeroInput } from './hero.input';


@Resolver(of => Hero)
export class HeroResolver {
  constructor(private readonly heroRepository: HeroRepository) {
  }

  @Mutation(returns => Hero, { nullable: true })
  async addHero(@Args({ name: 'hero', type: () => HeroInput }) hero: IHero) {
    return this.heroRepository.create(hero);
  }

  @Mutation(returns => Hero)
  async updateHero(@Args({ name: 'id', type: () => String }) id: string,
                   @Args({ name: 'hero', type: () => HeroInput }) hero: IHero) {
    return this.heroRepository.update(id, hero);
  }

  @Mutation(returns => Hero)
  async removeHero(@Args({ name: 'id', type: () => String }) id: string) {
    return this.heroRepository.delete(id);
  }

  @Query(returns => [Hero])
  async getAll(@Args('skip', { type: () => Number }) skip: number,
               @Args('limit', { type: () => Number }) limit: number) {
    return this.heroRepository.findAll(skip, limit);
  }

  @Query(returns => Hero)
  async hero(@Args('id', { type: () => String }) id: string) {
    return this.heroRepository.findById(id);
  }

  @Query(returns => Hero)
  async getRandomHero() {
    return  await this.heroRepository.findRandom() as IHero;
  }

  @Mutation(returns => Hero)
  async makeFavourite(@Args({ name: 'id', type: () => String }) id: string,
                      @Args({ name: 'favourite', type: () => Boolean }) favourite: boolean) {
    return this.heroRepository.toggleFavouriteHero(id, favourite);
  }

  @Mutation(returns => String)
  async fight(@Args({ name: 'heroId', type: () => String }) heroId: string,
              @Args({ name: 'enemyId', type: () => String }) enemyId: string) {
    const heroOne = await this.heroRepository.findById(heroId);
    const heroTwo = await this.heroRepository.findById(enemyId);
    const winnerId = this.compareHeroes(heroOne, heroTwo);
    const fightDate = new Date();
    const heroOneDuel: IDuel = {
      enemyId: heroTwo._id,
      isWin: winnerId === heroOne._id,
      date: fightDate
    };

    const heroTwoDuel: IDuel = {
      enemyId: heroOne._id,
      isWin: winnerId === heroTwo._id,
      date: fightDate
    };
    await this.heroRepository.addFightResult(heroOne._id, [...(heroOne.fights || []), heroOneDuel]);
    await this.heroRepository.addFightResult(heroTwo._id, [...(heroTwo.fights || []), heroTwoDuel]);
    return winnerId;
  }

  private compareHeroes(heroOne: IHero, heroTwo: IHero): string {
    const resultOne = this.calculateStats(heroOne);
    const resultTwo = this.calculateStats(heroTwo);
    return resultOne > resultTwo ? heroOne._id : heroTwo._id;
  }

  private calculateStats(hero: IHero): number {
    const random = Math.random() * (1.0 - 0.6) + 0.6;
    return (hero.stats.strength + hero.stats.speed * 0.2 + hero.stats.intelligence * 0.5 + hero.stats.hp * 0.4) * random;
  }

  @Query(returns => [Hero])
  async getFavourites(@Args('skip', { type: () => Number }) skip: number,
                      @Args('limit', { type: () => Number }) limit: number) {
    return this.heroRepository.findAllFavouriteHeroes(skip, limit);
  }
}
