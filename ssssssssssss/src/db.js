const { MongoClient, ObjectId } = require('mongodb');
let singleton;

async function connect() {
    if (singleton) return singleton;

    const client = new MongoClient(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
    await client.connect();
    singleton = client.db(process.env.DB_DATABASE);
    return singleton;
}

exports.findAll = async (collection) => {
    const db = await connect();
    return db.collection(collection).find().toArray();
};

exports.insertOne = async (collection, data) => {
    const db = await connect();
    return db.collection(collection).insertOne(data);
};

exports.findOne = async (collection, _id) => {
    const db = await connect();
    let obj = await db.collection(collection).find({ '_id': new ObjectId(_id) }).toArray();
    return obj[0] || false;
};

exports.updateOne = async (collection, object, param) => {
    const db = await connect();
    return await db.collection(collection).updateOne(param, { $set: object });
};
