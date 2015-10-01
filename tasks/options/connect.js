var auth = require('../helpers/auth');
var proxy = require('../helpers/proxy');

var config = {
  /**
   * --------- ADD YOUR UAA CONFIGURATION HERE ---------
   *
   * This uaa helper object simulates NGINX uaa integration using Grunt allowing secure cloudfoundry service integration in local development without deploying your application to cloudfoundry.
   * Please update the following uaa configuration for your solution
   */
    uaa: {

        clientId: 'mvp3_ref_app',
        serverUrl: 'https://39d5983f-0626-4f83-9611-4b0e6ee751a7.predix-uaa-sysint.grc-apps.svc.ice.ge.com',
        defaultClientRoute: '/about',
        base64ClientCredential: 'bXZwM19yZWZfYXBwOm12cDNyZWZAcHA='

// ------- Working config for STC UAA, and MVP 2 services:
        // clientId : 'rmd_ref_app_int',
        // serverUrl: 'https://stc.predix-uaa-test.grc-apps.svc.ice.ge.com',
        // defaultClientRoute: '/about',
        // base64ClientCredential: 'cm1kX3JlZl9hcHBfaW50OnJtZGludEBh'
            // echo -n rmd_ref_app_int:rmdint@a | base64
                // --->   cm1kX3JlZl9hcHBfaW50OnJtZGludEBh
    },
  /**
   * --------- ADD YOUR SECURE ROUTES HERE ------------
   *
   * Please update the following object add your secure routes
   */
    proxy: {
        // '/api/views(.*)': {
        //   url: 'http://px-view-service-exp.grc-apps.svc.ice.ge.com/api$1',
        //   instanceId: 'c8918695-f515-41e2-ba86-cdea84848cc5'
        // }
        '/api/asset(.*)': {
            url: 'http://predix-asset-sysint.grc-apps.svc.ice.ge.com/asset$1',
            instanceId: '446a256f-8a3e-4c2b-aac9-e217c2b4f2d6'
        },
        '/api/group(.*)': {
            url: 'http://predix-asset-sysint.grc-apps.svc.ice.ge.com/group$1',
            instanceId: '446a256f-8a3e-4c2b-aac9-e217c2b4f2d6'
        },
        '/api/v1/datapoints(.*)': {
            url: 'https://time-series-store-predix-sysint.svc.ice.ge.com/api/v1/datapoints$1',
            instanceId: 'e9a241d0-d895-4057-b4bd-42ae4e53cbec'
        },
        '/api/datagrid(.*)': {
            url: 'http://gs-rmd-datasource.grc-apps.svc.ice.ge.com/services/experience/datasource/datagrid$1',
            instanceId: null
        }
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
