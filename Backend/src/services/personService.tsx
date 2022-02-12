import { Person, NewPerson  } from "../types";
import { parseAge, parseString } from "../utils";
import {v1} from 'uuid'

let people: Person[] = []; 

const getPeople = () => people

const getPerson = (id: string) => people.find(a => a.id === id)

const addPerson = (newPerson: NewPerson): Person[] => {
    const personComplete: Person = createPerson(newPerson) 
    people = people.concat([personComplete])
    return people
}
const deletePerson = (id: string): Person[] => {
    people = people.filter(a => a.id !== id); 
    return people;
}
const editPerson = (newPerson: Person ): Person[] => {
    const personChecked = checkPerson(newPerson); 
    //Tests whether person with give id exists before editing data
    if(people.find(a => a.id === personChecked.id)){ 
        people = people.map(a => {
            if (a.id === personChecked.id) return personChecked;
            else return a;
        })
    }
    else {throw new Error('No person with give id exists')} 
    return people;
}
const checkPerson = (uncheckedPerson: Person): Person => {
    const checkedPerson: Person = {
        id: parseString(uncheckedPerson.id, "id"),
        firstName: parseString(uncheckedPerson.firstName, "first name"),
        lastName: parseString(uncheckedPerson.lastName, "last name"),
        age: parseAge(uncheckedPerson.age)
    }
    return checkedPerson
}

const createPerson = (newPerson: NewPerson): Person => {
    const person: Person = {
        id: v1(),
        firstName: parseString(newPerson.firstName, "first name"),
        lastName: parseString(newPerson.lastName, "last name"),
        age: parseAge(newPerson.age)
    }
    return person;
};

const personService = { getPeople, getPerson, addPerson, deletePerson, editPerson}
export default personService