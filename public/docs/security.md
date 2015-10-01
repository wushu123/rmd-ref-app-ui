## Securing the Application

### Authentication 

Predix Authentication service (UAA) is configured for this application.  In practice, you'd probably want to federate with GE SSO. In order to enable your application to have a GE SSO, please work with Predix security team.

Once you get the applicationId (aka clientId), go to your appliction frontend project (see rmd-predix-ui project), specify your clientId in /public/scripts/app.js:

	$scope.clientId = 'your_client_id';

### Authorization

Predix ACS service can provide role based authorization for your application. Please refer to Predix ACS service documentation to use this feature: <https://github.build.ge.com/predix/acs-samples>  Role based authorization was not implemented for this RMD reference app.