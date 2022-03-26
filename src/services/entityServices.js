const { Database } = require('../database/index');
const { ObjectId } = require('mongodb');

class EntityServices {
    constructor(collectionName) {
        this.collectionName = collectionName;
        this.collection = null;
    }

    async getAll() {
        this.collection = await Database(this.collectionName);
        return await this.collection.find().toArray();
    }

    async getById(id) {
        this.collection = await Database(this.collectionName);
        return await this.collection.findOne({ _id: ObjectId(id) });
    }

    async create(entity) {
        this.collection = await Database(this.collectionName);
        const result = await this.collection.insertOne(entity);
        return result.insertedId;
    }

    async delete(id) {
        this.collection = await Database(this.collectionName);
        const result = await this.collection.deleteOne({ _id: ObjectId(id) });
        return result.deletedCount === 1;
    }
}

module.exports = EntityServices;