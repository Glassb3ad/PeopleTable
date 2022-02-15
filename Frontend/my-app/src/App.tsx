import React, { useEffect, useState } from "react";
import PeopleTable from "./components/PeopleTable";
import peopleService from "./services/peopleService";
import { Person } from "./types";

function App() {
  const [people, setPeople]:[Person[], any] = useState([]);
  const getPeoplefromServer = async () => { 
    const newPeople = await peopleService.getPeople();
    console.log(newPeople);
    setPeople(newPeople);
  };
  useEffect(() => {
    getPeoplefromServer();
  }, []);
  console.log("people from app: ");
  console.log(people);
  return (
    <div>
      <div className="title">
        <h1>People Table</h1>
        <p>- A table for people</p>
      </div>
      <div className='content'>
        <PeopleTable people={people} setPeople={setPeople}/>
      </div>
    </div>
  );
}

export default App;
