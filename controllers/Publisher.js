var FacebookGraphAPI  = require('fbgraph');

var Constantes = require('../helpers/Constantes');
var Publicacao = require('../models/Publicacao');

FacebookGraphAPI.setVersion("3.2");
FacebookGraphAPI.setAccessToken("???????");

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

		if (cache.length) {
			cache = cache[0];
		} else {
			cache = new Publicacao(publicacao.id, publicacao.texto, publicacao.usuario);
		}

		cache.lida = true;
		cache.resposta = resposta.toString();
	
		Util.salvarCache(cache, Constantes.DB_PATH);
		console.log(err);
		console.log(res);
  		callback(res.id);
	});
}

this.publicar = publicar;
module.exports = this;