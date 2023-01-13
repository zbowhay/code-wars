// NOTE: developed for Code Wars https://www.codewars.com/kata/526f35b9c103314662000007

export class GeneticAlgorithm {
  generate(length: number): string {
    let binaryString = '';
    for (let i = 0; i < length; i++) {
      binaryString += Math.random() > 0.5 ? '1' : '0';
    }

    return binaryString;
  }

  select(population: string[], fitnesses: number[]): string {
    const fitnessSum = fitnesses.reduce((prev, curr) => prev + curr, 0);
    const random = Math.random();

    let sum = 0;
    let selectedIndex = 0;
    for (let i = 0; i < fitnesses.length; i++) {
      const selectionChance = fitnesses[i] / fitnessSum;

      if (random > sum && random < sum + selectionChance) {
        selectedIndex = i;
        break;
      }

      sum += selectionChance;
    }

    return population[selectedIndex];
  }

  mutate(chromosome: string, p: number = 0.01): string {
    let mutation = '';
    for (let i = 0; i < chromosome.length; i++) {
      if (Math.random() < p) {
        mutation += chromosome[i] === '0' ? '1' : '0';
      } else {
        mutation += chromosome[i];
      }
    }

    return mutation;
  }

  crossover(chromosome1: string, chromosome2: string): string[] {
    const crossBit = Math.floor(Math.random() * chromosome1.length);

    return [
      `${chromosome1.slice(0, crossBit)}${chromosome2.slice(crossBit)}`,
      `${chromosome2.slice(0, crossBit)}${chromosome1.slice(crossBit)}`,
    ];
  }

  run(fitness: (chromosome: string) => number, length: number, p_c: number, p_m: number, iterations = 100) {
    let population = [];
    let fitnesses = [];
    const populationSize = 250;
    for (let i = 0; i < populationSize; i++) {
      const chromosome = this.generate(length);
      population.push(chromosome);
      const fit = fitness(chromosome);
      fitnesses.push(fit);

      if (fit === 1) {
        return chromosome;
      }
    }

    for (let i = 0; i < iterations; i++) {
      const newPopulation = [];
      const newFitnesses = [];
      while (newPopulation.length < population.length) {
        // select 2 chromosomes
        let chromosome1 = this.select(population, fitnesses);
        let chromosome2 = this.select(population, fitnesses);

        const odds = Math.random();
        // based on odds, crossover
        if (odds < p_c) {
          [chromosome1, chromosome2] = this.crossover(chromosome1, chromosome2);
        }

        // based on odds, mutate
        if (odds < p_m) {
          chromosome1 = this.mutate(chromosome1);
          chromosome2 = this.mutate(chromosome2);
        }

        newPopulation.push(chromosome1);
        newPopulation.push(chromosome2);
        const [fit1, fit2] = [fitness(chromosome1), fitness(chromosome2)];
        newFitnesses.push(fit1);
        newFitnesses.push(fit2);

        // if we got it, return it.
        if (fit1 === 1) {
          return chromosome1;
        }
        if (fit2 === 1) {
          return chromosome2;
        }
      }

      population = newPopulation;
      fitnesses = newFitnesses;
    }

    let mostFit = 0;
    let mostFitIndex = 0;
    for (let i = 0; i < fitnesses.length; i++) {
      const fitness = fitnesses[i];
      if (mostFit < fitness) {
        mostFit = fitness;
        mostFitIndex = i;
      }
    }

    console.log(`fitness = ${mostFit}, chromosome = ${population[mostFitIndex]}`);
    return population[mostFitIndex];
  }
}

const genetic = new GeneticAlgorithm();

const getFitnessFunction = (goal: string) => {
  return (chromosome: string): number => {
    let score = 0;
    for (let i = 0; i < goal.length; i++) {
      if (chromosome[i] === goal[i]) {
        score += 1;
      }
    }

    return score / goal.length;
  };
};

const GOALS = new Array(10).fill(1).map(() => genetic.generate(50));

for (const GOAL of GOALS) {
  const outcome = genetic.run(getFitnessFunction(GOAL), GOAL.length, 0.6, 0.002, 10000);
  console.log(`${GOAL} === ${outcome} = ${GOAL === outcome}`);
}
