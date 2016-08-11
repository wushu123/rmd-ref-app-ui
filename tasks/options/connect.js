var auth = require('../helpers/auth');
var proxy = require('../helpers/proxy');

var config = {
  /**
   * --------- ADD YOUR UAA CONFIGURATION HERE ---------
   * If you have run the installRefApp.py script, then you can copy values from the manifest.yml into this file for local development.
   * This uaa helper object simulates NGINX uaa integration using Grunt allowing secure cloudfoundry service integration in local development without deploying your application to cloudfoundry.
   * Please update the following uaa configuration for your solution
   */
    uaa: {

        clientId: 'app_client_id',
        serverUrl: 'https://5f37babc-08cd-4d3c-9f7f-0ffd3b474f0f.predix-uaa-sysint.grc-apps.svc.ice.ge.com',
        defaultClientRoute: '/about',
        base64ClientCredential: 'YXBwX2NsaWVudF9pZDpzZWNyZXQ='

    },
  /**
   * --------- ADD YOUR SECURE ROUTES HERE ------------
   *
   * Please update the following object add your secure routes
   */

    proxy: {
        '/api/asset': {
            url: 'http://predix-asset-sysint.grc-apps.svc.ice.ge.com',
            instanceId: '64f941e4-07d2-46e1-9fb8-7862c1e82204',
            pathRewrite: { '^/api/': '/'}
        },
        '/api/group': {
            url: 'http://predix-asset-sysint.grc-apps.svc.ice.ge.com',
            instanceId: '64f941e4-07d2-46e1-9fb8-7862c1e82204',
            pathRewrite: { '^/api/': '/'}
        },
        '/api/v1/datapoints': {
            url: 'https://time-series-store-predix-sysint.svc.ice.ge.com/v1/datapoints',
            instanceId: 'e1bbe838-f3ac-49c1-90fa-a0b3dc76c3e9',
            pathRewrite: { '^/api/v1/datapoints': ''}
        },
        '/api/datagrid': {
            url: 'https://unittest-rmd-datasource.grc-apps.svc.ice.ge.com',
            instanceId: null,
            pathRewrite: { '^/api/': '/services/experience/datasource/'}
        }
    }

};

// a middleware function to simulate a path that returns an nginx environment variable:
var environment = function(req, res, next) {
    if (req.originalUrl.indexOf('getWsUrl') >= 0) {
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify({wsUrl: 'wss://unittest-websocket-server.grc-apps.svc.ice.ge.com'}));
    } else {
        next();
    }
};

module.exports = {
    server: {
        options: {
            port: 9000,
            base: 'public',
            open: true,
            hostname: 'localhost',
            middleware: function (connect, options) {
                var middlewares = [];

                //add predix services proxy middlewares
                middlewares = middlewares.concat(proxy.init(config.proxy));

                //add predix uaa authentication middlewaress
                middlewares = middlewares.concat(auth.init(config.uaa));

                middlewares = middlewares.concat(environment);

                if (!Array.isArray(options.base)) {
                    options.base = [options.base];
                }

                var directory = options.directory || options.base[options.base.length - 1];
                options.base.forEach(function (base) {
                    // Serve static files.
                    middlewares.push(connect.static(base));
                });

                // Make directory browse-able.
                middlewares.push(connect.directory(directory));

                return middlewares;
            }
        }
    }
};
