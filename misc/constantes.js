var Util = require('./util');

// Diretórios
this.ROOT_DIR = Util.fromRoot("");
this.VIEWS_DIR = Util.fromRoot('/views');
this.JQUERY_DIR = Util.fromRoot('/node_modules/jquery/dist/');
this.BOOTSTRAP_DIR = Util.fromRoot('/node_modules/bootstrap/dist/');
// Views
this.MAIN_VIEW = "main";
this.REPORTS_VIEW = "reports";
// Facebook Graph API
this.FBGRAPH_ACCESS_TOKEN = ""; //definir token de acesso
// Facebook
this.FB_PAGE_NICK = "tccgraphapi";
this.FB_PAGE_NAME = "TCC - Graph API";
this.FB_PAGE_ID = "178679969703904";

module.export = this;