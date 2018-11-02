var Util = require('./Util');

// Diretórios
this.ROOT_DIR = Util.fromRoot("");
this.MODELS_DIR = Util.fromRoot('/models');
this.VIEWS_DIR = Util.fromRoot('/views');
this.CONTROLLERS_DIR = Util.fromRoot('/controllers');
this.JS_DIR = Util.fromRoot('/resources/js');
this.CSS_DIR = Util.fromRoot('/resources/css');
this.IMG_DIR = Util.fromRoot('/resources/img');
this.FONTS_DIR = Util.fromRoot('/resources/fonts');

// Views
this.MAIN_VIEW = "Main";
this.DASH_VIEW = "Dashboard";

// Rotas
this.ROTA_MAIN = '/';
this.ROTA_DASHBOARD = '/dash';

// Facebook Graph API
this.FBGRAPH_ACCESS_TOKEN = ""; //definir token de acesso

// Facebook
this.FB_PAGE_NICK = "tccgraphapi";
this.FB_PAGE_NAME = "TCC - Graph API";
this.FB_PAGE_ID = "178679969703904";

module.export = this;