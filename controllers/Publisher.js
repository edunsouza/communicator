var Constantes = require('../helpers/Constantes');
var FacebookGraphAPI  = require('fbgraph');

FacebookGraphAPI.setVersion("3.2");
FacebookGraphAPI.setAccessToken("???????");

function publicar(texto, idPublicacao, callback) {
	if (!texto || !idPublicacao) return;

	var publicacao = {
		message: texto.toString()
	};

	if (typeof callback != "function") {
		callback = new Function();
	}

	FacebookGraphAPI.post(`${idPublicacao}/comments`, publicacao, function(err, res) {
		console.log(err);
		console.log(res);
  		callback(res.id);
	});
}

this.publicar = publicar;
module.exports = this;