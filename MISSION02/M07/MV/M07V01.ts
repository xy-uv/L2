//* OOP CLASS
class Animal {
  animalType: string;
  name: string;
  species: string;
  sound: string;

  constructor(
    animalType: string,
    name: string,
    species: string,
    sound: string
  ) {
    this.animalType = animalType;
    this.name = name;
    this.species = species;
    this.sound = sound;
  }

  makeSound() {
    console.log(`${this.name} is making ${this.sound}`);
    return this;
  }
}

const dog = new Animal("Dog", "Dogesh", "kukur", "Ghew Ghew").makeSound();
console.log(dog);
