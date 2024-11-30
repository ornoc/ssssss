const db = require('../db');

exports.criarUsuario = async (nick) => {
    const user = { nick, sala: null };
    const result = await db.insertOne("usuarios", user);
    return result.insertedId ? { _id: result.insertedId, ...user } : null;
};

exports.buscarUsuario = async (idUser) => {
    return await db.findOne("usuarios", idUser);
};

exports.alterarUsuario = async (user) => {
    return await db.updateOne("usuarios", user, { _id: user._id });
};
