import { useState } from "react"
import peopleService from "../services/peopleService";
import { Person } from "../types";

const AddPersonForm = ({people, setPeople }:{people: Person[], setPeople: any}) => {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [age, setAge] = useState("");
    const reset = () => {
        setFirstName("");
        setLastName("");
        setAge("");
    };
    const sendPerson = async (event: any) => {
        event.preventDefault()
        const newPerson: Omit<Person, 'id'> = {
            firstName,
            lastName,
            age: Number(age)
        }
        console.log(newPerson)
        const people = await peopleService.addPerson(newPerson);
        setPeople(people)
        reset()
    }
    console.log((firstName !== "" && lastName !== "" && age !== ""))
    return(
        <div>
            <h2>Add a new person</h2>
            <form>
                <div>
                    <label>first name:</label>
                    <input type='text' value={firstName} onChange={(event) => {setFirstName(event.target.value)}}></input>
                </div>
                <div>
                  <label>last name:</label>
                  <input type='text' value={lastName} onChange={(event) => {setLastName(event.target.value)}}></input>
                </div>
                <div>
                  <label>age:</label>
                  <input type='number' value={age} onChange={(event) => {if(Number(event.target.value) >= 0) setAge(event.target.value)}}></input>
                </div>
                <div>
                   {(firstName !== "" && lastName !== "" && age !== "")
                   ? <button type="submit" onClick={(event) => {sendPerson(event)}}>Add</button> 
                   : <button disabled type="submit">Add</button>
                   }
                   <button type="button" onClick={reset}>cancel</button>
                   </div>
            </form>
        </div>
    )
}

export default AddPersonForm