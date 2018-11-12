var Constantes = require('../helpers/Constantes');
var FacebookGraphAPI  = require('fbgraph');

FacebookGraphAPI.setVersion("3.2");
FacebookGraphAPI.setAccessToken("??????");

function getPublicacoes(callback) {
	var campos = {
		fields: "message,name,from{name,about}"
	};

	if (typeof callback != "function") {
		callback = new Function();
	}

	FacebookGraphAPI.get(Constantes.FB_PAGE_NICK + '/feed', campos, function(err, res) {
    	var retorno = [];

    	if (res && res.data) {
    		res.data.forEach(post => {
				if (post && post.message) {
    				retorno.push({
    					texto: post.message,
    					usuario: (post.from) ? post.from.name : null,
    					id: post.id
    				});
    			}
    		});
    	}

    	return retorno;
	});
}

this.getPublicacoes = getPublicacoes;
module.exports = this;