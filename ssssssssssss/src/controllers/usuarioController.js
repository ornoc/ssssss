const usuarioModel = require('../models/usuarioModel');
const token = require('../util/token');

exports.registrarUsuario = async (nick) => {
    const user = await usuarioModel.criarUsuario(nick);
    if (user) {
        const userToken = token.gerarToken(user);
        return { token: userToken, id: user._id, nick: user.nick };
    }
    throw new Error('Falha ao registrar o usuário');
};