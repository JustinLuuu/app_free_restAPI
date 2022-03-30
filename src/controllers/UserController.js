const { Response } = require("../common/response");
const EntityServices = require("../services/entityServices");

const entitiesServices = new EntityServices('users');

const getUsersAction = async (req, res) => {
    try {
        const users = await entitiesServices.getAll();        
        Response(res, 200, 'User list', users);
    } catch (error) {
        console.log(error);
        Response(res, 500, 'Internal server error');
    }
}

const getUserAction = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await entitiesServices.getById(id);

        user ? 
        Response(res, 200, `User [${id}]`, user) : 
        Response(res, 404, `User [${id}] not found`);
    } catch (error) {
        console.log(error);
        Response(res, 500, 'Internal server error');
    }
}

const createUserAction = async (req, res) => {
    try {
        const { body: userData } = req;
        const insertedId = await entitiesServices.create(userData);
        
        Response(res, 200, 'User created', insertedId);
    } catch (error) {
        console.log(error);
        Response(res, 500, 'Internal server error');
    }
}

const updateUserAction = async (req, res) => {
    try {
        const { id } = req.params;
        const { body: userDataUpdate } = req;
        const wasUpdated = await entitiesServices.update(userDataUpdate, id);
        
        Response(res, 200, `${wasUpdated ? 
        `Successfully updated one user` :
        'No user updated'}`, wasUpdated && id);
    } catch (error) {
        console.log(error);
        Response(res, 500, 'Internal server error');
    }
}

const deleteUserAction = async (req, res) => {
    try {
        const { id } = req.params;
        const wasDeleted = await entitiesServices.delete(id);

        Response(res, 200, `${wasDeleted ? 
        'Successfully deleted one user' : 
        'No user matched the query. Deleted 0 users'}`, wasDeleted && id);
    } catch (error) {
        console.log(error);
        Response(res, 500, 'Internal server error');
    }
}


module.exports.UserController = {
    getUsersAction, getUserAction, createUserAction, updateUserAction, deleteUserAction
}