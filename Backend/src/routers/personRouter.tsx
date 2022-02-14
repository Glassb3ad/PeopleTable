import express from 'express';
import personService from '../services/personService';
const personRouter = express.Router();

personRouter.get('/',(_req, res) => {
    res.status(200).send(personService.getPeople());
});
personRouter.get('/:id',(req, res) => {
    try{
            res.status(200).send(personService.getPerson(req.params.id));
    }
    catch (error){
        res.status(404).send({error: `No person with id ${req.params.id} exists`})
    }
});
personRouter.delete('/:id',(req, res) => {
    try{
            res.status(200).send(personService.deletePerson(req.params.id));
    }
    catch (error){
        res.status(404).send({error: `No person with id ${req.params.id} exists`})
    }
});
personRouter.post('/',(req, res) => {
    try{
        res.status(200).send(personService.addPerson(req.body));
    }
    catch (error){
        res.status(400).send(error)
    }
});
personRouter.put('/',(req, res) => {
    try{
        res.status(200).send(personService.editPerson(req.body));
    }
    catch (error:any){ 
        res.status(400).send(error)
    }
});

export default personRouter;