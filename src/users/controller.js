const { Response } = require("../common/response");
const EntityServices = require("../services/entityServices");

const entitiesServices = new EntityServices('users');

const getUsersAction = async (req, res = res) => {
    try {
        const users = await entitiesServices.getAll();
        Response.success(res, 200, 'User list', users);
    } catch (error) {
        console.log(error);
        Response.error(res);
    }
}

const getUserAction = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await entitiesServices.getById(id);

        Response.success(
            res,
            user ? 200 : 404,
            `${user ? `User ${id}` : 'No user found'}`,
            user ? user : {});
    } catch (error) {
        console.log(error);
        Response.error(res);
    }
}

const createUserAction = async (req, res) => {
    try {
        const { body: userData } = req;
        const insertedId = await entitiesServices.create(userData);
        Response.success(res, 201, 'User created', insertedId);
    } catch (error) {
        console.log(error);
        Response.error(res);
    }
}

const deleteUserAction = async (req, res) => {
    try {
        const { id } = req.params;
        const deleted = await entitiesServices.delete(id);
        Response.success(res, 200, `${deleted ?
            'Successfully deleted one user' :
            'No user matched the query. Deleted 0 users'}`);
    } catch (error) {
        console.log(error);
        Response.error(res);
    }
}


module.exports.UserController = {
    getUsersAction, getUserAction, createUserAction, deleteUserAction
}