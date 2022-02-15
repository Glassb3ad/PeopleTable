/* eslint-disable react/react-in-jsx-scope */
import { useState } from "react";
import peopleService from "../services/peopleService";
import { Person } from "../types";

const PeopleTableRow = ({person, onEdit, setOnEdit, people, setPeople}:{person: Person, onEdit: string, setOnEdit: any, people: Person[], setPeople: any}) => {
  const [firstName, setFirstName] = useState("");
  const [secondName, setSecondName] = useState("");
  const [age, setAge] = useState("");
  const [deleteRequested, setDeleteRequested] = useState(false);
  const handleEdit = () => {
    setOnEdit(person.id);
    setFirstName(person.firstName);
    setSecondName(person.lastName);
    setAge(person.age.toString());
  };
  const cancel = () => {
    setOnEdit("");
    setFirstName("");
    setSecondName("");
    setAge("");
  };
  const save = () => {
    const newPerson: Person = {
      id: person.id,
      firstName: firstName,
      lastName: secondName,
      age: Number(age)
    };
    const newPeople = people.map(a => a.id === newPerson.id ? newPerson : a );
    console.log(newPeople);
    setPeople(newPeople);
    peopleService.savePerson(newPerson);
    cancel();
  };
  const handleDelete = async () => {
    const newPeople = await peopleService.deletePerson(person.id);
    setPeople(newPeople);
  }; 

  if(onEdit === person.id){
    return(
      <tr>
        <td id="personData"><input id="tableInput" value={firstName} onChange={(event) => {setFirstName(event.target.value);}}/></td>
        <td id="personData"><input id="tableInput" value={secondName} onChange={(event) => {setSecondName(event.target.value);}}/></td>
        <td id="personData"><input id="tableInput" value={age} onChange={(event) => {setAge(event.target.value);}}/></td>
        { firstName && secondName && age && !isNaN(Number(age))
          ? <td className="tableButtonColumn"><button className="tableButtons" id="saveButton" onClick={save}>Save</button></td> 
          : <td className="tableButtonColumn"><button className="tableButtons" id="saveButtonDisabled"disabled onClick={save}>Save</button></td>
        }
        <td className="tableButtonColumn"><button className="tableButtons" id="deleteButton" onClick={cancel}>Cancel</button></td>
      </tr>
    );
  }
  if(deleteRequested) {
    return(
      <tr>
        <td id="personData">{person.firstName}</td>
        <td id="personData">{person.lastName}</td>
        <td id="personData">{person.age}</td>
        <td className="tableButtonColumn"><button className="tableButtons" id="deleteButton" onClick={handleDelete}>Sure?</button></td>
        <td className="tableButtonColumn"><button className="tableButtons" id="cancelDeleteButton" onClick={() => {setDeleteRequested(false);}}>Cancel</button></td>
      </tr>
    );
  }
  else {
    return(
      <tr>
        <td id="personData">{person.firstName}</td>
        <td id="personData">{person.lastName}</td>
        <td id="personData">{person.age}</td>
        <td className="tableButtonColumn"><button className="tableButtons" id="deleteButton" onClick={() => {setDeleteRequested(true);}}>Delete</button></td>
        <td className="tableButtonColumn"><button className="tableButtons" id="editButton" onClick={handleEdit}>Edit</button></td>
      </tr>
    );
  }
};
export default PeopleTableRow;