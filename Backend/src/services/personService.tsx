import { Person, NewPerson  } from "../types";
import { parseAge, parseString } from "../utils";
import peopleModel from "../models/people";
import {v1} from "uuid";

let people: Person[] = []; 
let peopleId: string;

export const InitializePeople = async () => {
  const peopleDB: {id: string, people: Person[]} = (await peopleModel.find({}))[0];
  if(peopleDB) {
    people = peopleDB.people;
    peopleId = peopleDB.id;
  }
};
const updatePeople = async (newPeople: Person[]) => {
  people = newPeople;
  const result = await peopleModel.findByIdAndUpdate(peopleId, {people: newPeople}, { new: true });
  console.log(result);
}; 

const getPeople = () => people;
const getPerson = (id: string) => people.find(a => a.id === id);

const addPerson = (newPerson: NewPerson): Person[] => {
  const personComplete: Person = createPerson(newPerson); 
  updatePeople(people.concat([personComplete]));
  return people;
};
const deletePerson = (id: string): Person[] => {
  const newPeople = people.filter(a => a.id !== id);
  updatePeople(newPeople); 
  return people;
};
const editPerson = (newPerson: Person ): Person[] => {
  const personChecked = checkPerson(newPerson); 
  //Tests whether person with give id exists before editing data
  if(people.find(a => a.id === personChecked.id)){ 
    const newPeople = people.map(a => {
      if (a.id === personChecked.id) return personChecked;
      else return a;
    });
    updatePeople(newPeople);
    return people;
  }
  else {throw new Error("No person with give id exists");} 
};
const checkPerson = (uncheckedPerson: Person): Person => {
  const checkedPerson: Person = {
    id: parseString(uncheckedPerson.id, "id"),
    firstName: parseString(uncheckedPerson.firstName, "first name"),
    lastName: parseString(uncheckedPerson.lastName, "last name"),
    age: parseAge(uncheckedPerson.age)
  };
  return checkedPerson;
};

const createPerson = (newPerson: NewPerson): Person => {
  const person: Person = {
    id: v1(),
    firstName: parseString(newPerson.firstName, "first name"),
    lastName: parseString(newPerson.lastName, "last name"),
    age: parseAge(newPerson.age)
  };
  return person;
};

const personService = { getPeople, getPerson, addPerson, deletePerson, editPerson};
export default personService;