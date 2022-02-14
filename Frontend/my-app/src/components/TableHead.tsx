import { Person } from "../types"

const TableHead = ({people, setPeople}: {people: Person[], setPeople: any}) => {
    const sortByFirstName = ()  => {
        const peopleCopy = [...people] //Copy is needed because sort -function will mutate array which would prevent rendering if the original people-array is used.           
        const sortedPeople = peopleCopy.sort((x, y): number => {
            const a: string = x.firstName
            const b: string = y.firstName
            if(a > b) return 1
            if(a < b) return -1
            return 0
        })
        setPeople(sortedPeople)
    }
    const sortByLastName = ()  => {
        const peopleCopy = [...people]            
        const sortedPeople = peopleCopy.sort((x, y): number => {
            const a: string = x.lastName
            const b: string = y.lastName
            if(a > b) return 1
            if(a < b) return -1
            return 0
        })
        setPeople(sortedPeople)
    }
    const sortByAge = ()  => {
        const peopleCopy = [...people]            
        const sortedPeople = peopleCopy.sort((x, y): number => {
            const a: number = x.age
            const b: number = y.age
            if(a > b) return -1
            if(a < b) return 1
            return 0
        })
        setPeople(sortedPeople)
    }
    
    
    return (
        <thead>
            <tr>
                <th id="head"><button className="tableHeadButton" onClick={sortByFirstName}>First name</button></th>
                <th id="head"><button className="tableHeadButton" onClick={sortByLastName}>Last name</button></th>
                <th id="head"><button className="tableHeadButton" onClick={sortByAge}>Age</button></th>
            </tr>
        </thead>
    )
}
export default TableHead