var Util = require('./Util');

// Diretórios
this.ROOT_DIR = Util.fromRoot("");
this.VIEWS_DIR = Util.fromRoot('/views');
this.JQUERY_DIR = Util.fromRoot('/node_modules/jquery/dist/');
this.BOOTSTRAP_DIR = Util.fromRoot('/node_modules/bootstrap/dist/');
this.CSS_DIR = Util.fromRoot('/resources/css');
this.JS_DIR = Util.fromRoot('/resources/js');
this.IMG_DIR = Util.fromRoot('/resources/img');
this.FONTS_DIR = Util.fromRoot('/resources/fonts');
// Views
// this.MAIN_VIEW = "Main";
this.MAIN_VIEW = "Main";
this.REPORTS_VIEW = "Listar";
// Facebook Graph API
this.FBGRAPH_ACCESS_TOKEN = ""; //definir token de acesso
// Facebook
this.FB_PAGE_NICK = "tccgraphapi";
this.FB_PAGE_NAME = "TCC - Graph API";
this.FB_PAGE_ID = "178679969703904";

module.export = this;