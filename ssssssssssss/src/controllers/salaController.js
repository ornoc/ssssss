// src/controllers/salaController.js
const salaModel = require('../models/salaModel');

exports.listarSalas = async () => {
    return await salaModel.listarSalas();
};

exports.entrarNaSala = async (iduser, idsala) => {
    const sala = await salaModel.buscarSala(idsala);
    let usuarioModel = require('../models/usuarioModel');
    let user = await usuarioModel.buscarUsuario(iduser);

    user.sala = { _id: sala._id, nome: sala.nome, tipo: sala.tipo };

    if (await usuarioModel.alterarUsuario(user)) {
        return { msg: "OK", timestamp: Date.now() };
    }

    return false;
};

exports.enviarMensagem = async (nick, msg, idsala) => {
    const sala = await salaModel.buscarSala(idsala);

    if (!sala.msgs) {
        sala.msgs = [];
    }

    const timestamp = Date.now();
    sala.msgs.push({ timestamp, msg, nick });

    let resp = await salaModel.atualizarMensagens(sala);
    return { msg: "OK", timestamp };
};

exports.buscarMensagens = async (idsala, timestamp) => {
    let mensagens = await salaModel.buscarMensagens(idsala, timestamp);
    return { timestamp: mensagens[mensagens.length - 1].timestamp, msgs: mensagens };
};
