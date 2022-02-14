export interface Person {
    id: string,
    firstName: string,
    lastName: string,
    age: number,
}
export type NewPerson =  Omit<Person, 'id'>