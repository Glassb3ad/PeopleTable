/* eslint-disable react/react-in-jsx-scope */
import { useState } from "react";
import { Person } from "../types";
import AddPerson from "./AddPerson";
import PeopleTableRow from "./peopleTableRow";
import TableHead from "./TableHead";
const PeopleTable = ({people, setPeople }:{people: Person[], setPeople: any}) => {
  const [onEdit, setOnEdit] = useState("");
  return (
    <table style={{borderCollapse: "collapse"}}>
      <TableHead people={people} setPeople={setPeople}/>
      {people.map(a => <PeopleTableRow key={a.id} person={a} onEdit={onEdit} setOnEdit={setOnEdit} people={people} setPeople={setPeople}/>)}
      <AddPerson people={people} setPeople={setPeople}/>
    </table>
  );
};

export default PeopleTable;