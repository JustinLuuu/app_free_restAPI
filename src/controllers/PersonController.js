const { Response } = require("../common/response");
const EntityServices = require("../services/entityServices");

const entitiesServices = new EntityServices('persons');

const getPersonsAction = async (req, res) => {
    try {
        const people = await entitiesServices.getAll();        
        Response(res, 200, 'People list', people);
    } catch (error) {
        console.log(error);
        Response(res, 500, 'Internal server error');
    }
}

const getPersonAction = async (req, res) => {
    try {
        const { id } = req.params;
        const person = await entitiesServices.getById(id);

        person ? 
        Response(res, 200, `Person ${id}`, person) : 
        Response(res, 404, `There is'nt a person with id: ${id}`);
    } catch (error) {
        console.log(error);
        Response(res, 500, 'Internal server error');
    }
}

const createPersonAction = async (req, res) => {
    try {
        const { body: personData } = req;
        const insertedId = await entitiesServices.create(personData);
        
        Response(res, 200, 'Person created', insertedId);
    } catch (error) {
        console.log(error);
        Response(res, 500, 'Internal server error');
    }
}

const updatePersonAction = async (req, res) => {
    try {
        const { id } = req.params;
        const { body: personDataUpdate } = req;
        const wasUpdated = await entitiesServices.update(personDataUpdate, id);
        
        Response(res, 200, `${wasUpdated ? 
        `Successfully updated one person` :
        '0 persons were updated'}`, wasUpdated ? id : null);
    } catch (error) {
        console.log(error);
        Response(res, 500, 'Internal server error');
    }
}

const deletePersonAction = async (req, res) => {
    try {
        const { id } = req.params;
        const wasDeleted = await entitiesServices.delete(id);

        Response(res, 200, `${wasDeleted ? 
        'Successfully deleted one person' : 
        '0 persons were deleted'}`, wasDeleted ? id : null);
    } catch (error) {
        console.log(error);
        Response(res, 500, 'Internal server error');
    }
}


module.exports.PersonController = {
    getPersonsAction, getPersonAction, createPersonAction, updatePersonAction, deletePersonAction
}