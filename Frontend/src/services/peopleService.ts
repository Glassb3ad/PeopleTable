import axios from "axios";
import { Person } from "../types";
const baseURL = "http://localhost:3001/api/people";

const getPeople = async () => {
  const newPeople: Person[] = (await axios.get(baseURL)).data;
  return newPeople;
};
const addPerson = async (person: Omit<Person, "id">) => {
  const newPeople: Person[] = (await axios.post(baseURL, person)).data;
  return newPeople;
};
const savePerson = async (person: Person) => {
  try{
    const newPeople: Person[] = (await axios.put(baseURL, person)).data;
    return newPeople;
  }
  catch(error) {console.log(error);}
};
const deletePerson = async (id: string) => {
  const newPeople: Person[] = (await axios.delete(`${baseURL}/${id}`)).data;
  return newPeople;
};

const peopleService = {getPeople, addPerson, savePerson, deletePerson};
export default peopleService;