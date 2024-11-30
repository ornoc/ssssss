// src/models/salaModel.js
const db = require('../db');

exports.listarSalas = async () => {
    return await db.findAll("salas");
};

exports.buscarSala = async (idsala) => {
    return db.findOne("salas", idsala);
};

exports.atualizarMensagens = async (sala) => {
    return await db.updateOne("salas", sala, { _id: sala._id });
};

exports.buscarMensagens = async (idsala, timestamp) => {
    let sala = await this.buscarSala(idsala);
    if (sala.msgs) {
        let msgs = sala.msgs.filter(msg => msg.timestamp >= timestamp);
        return msgs;
    }
    return [];
};
