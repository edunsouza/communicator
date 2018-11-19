const FacebookGraphAPI  = require('fbgraph');

const Util = require('../helpers/Util');
const Constantes = require('../helpers/Constantes');
const Publicacao = require('../models/Publicacao');

FacebookGraphAPI.setVersion(Constantes.API_VERSION);
FacebookGraphAPI.setAccessToken(Constantes.FBGRAPH_ACCESS_TOKEN);

function publicar(resposta, publicacao, callback) {
	if (!resposta || !publicacao.id) return;

	var postagem = {
		message: resposta.toString()
	};

	if (typeof callback != "function") {
		callback = new Function();
	}

	var cache = Util.buscarCache(Constantes.DB_PATH).filter(x => x.id = publicacao.id);

	FacebookGraphAPI.post(`${publicacao.id}/comments`, postagem, function(err, res) {

		if (err) {
			console.log(err);
			return;
		}

		if (cache.length) {
			cache = cache[0];
		} else {
			cache = new Publicacao(publicacao.id, publicacao.texto, publicacao.usuario);
		}

		cache.lida = true;
		cache.resposta = resposta.toString();
	
		Util.salvarCache(cache, Constantes.DB_PATH);
	
  		callback(res.id);
	});
}

this.publicar = publicar;
module.exports = this;