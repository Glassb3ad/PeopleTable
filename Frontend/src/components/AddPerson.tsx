/* eslint-disable react/react-in-jsx-scope */
import { useState } from "react";
import peopleService from "../services/peopleService";
import { Person } from "../types";

const AddPerson = ({setPeople}: {people: Person[], setPeople: any}) => {
  const [show, setShow] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [age, setAge] = useState("");
  const reset = () => {
    setFirstName("");
    setLastName("");
    setAge("");
    setShow(false);
  };
  const sendPerson = async (event: any) => {
    event.preventDefault();
    const newPerson: Omit<Person, "id"> = {
      firstName,
      lastName,
      age: Number(age)
    };
    const people = await peopleService.addPerson(newPerson);
    setPeople(people);
    reset();
  };
  if(show){
    return(
      <tr>
        <td id="personData"><input id="tableInput" value={firstName} onChange={(event) => {setFirstName(event.target.value);}}/></td>
        <td id="personData"><input id="tableInput" value={lastName} onChange={(event) => {setLastName(event.target.value);}}/></td>
        <td id="personData"><input id="tableInput" value={age} onChange={(event) => {setAge(event.target.value);}}/></td>
        { firstName && lastName && age && !isNaN(Number(age))
          ? <td className="tableButtonColumn"><button className="tableButtons" id="saveButton" onClick={sendPerson}>Save</button></td> 
          : <td className="tableButtonColumn"><button className="tableButtons" id="saveButtonDisabled" disabled>Save</button></td>
        }
        <td className="tableButtonColumn"><button className="tableButtons" id="deleteButton" onClick={reset}>Cancel</button></td>
      </tr>
    );
  }
  return (
    <tr>
      <td id="emptyPersonData"></td>
      <td id="emptyPersonData"></td>
      <td id="emptyPersonData"></td>
      <td className="tableButtonColumn"><button className="tableButtons" id="editButton" onClick={() => {setShow(true);}}>Add</button></td>
      <td className="tableButtonColumn"></td>
    </tr>
  );

};
export default AddPerson;