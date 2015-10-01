##Microcomponents

Microcomponents are reusable libraries that can be used in any microservice.  The Adoption team has developed many Bootstrap Microcomponents 

- [PredixBoot](#PredixBoot)
- [Predix Rest Client](#PredixRestClient)
- [Asset Bootstrap Client](#AssetBootstrapClient)
- [Timeseries Bootstrap Client](#TimeseriesBootstrapClient)

###<a name="PredixBoot" href="https://github.build.ge.com/adoption/predix-boot">PredixBoot 
A back-end Microservice bootstrap that gets you creating a Microservice much quicker than starting from scratch.  We started with SpringBoot helloWorld and added CXF, Tomcat, Spring Profiles and Property File management features that you would need anyway.

###<a name="PredixRestClient" href="https://github.build.ge.com/adoption/predix-boot">Predix Rest Client
Part of Predix Boot but worth calling out.  Predix Rest Client has GET, PUT, POST, DELETE calls that integrate with Predix UAA Security.  Everything is property-ized from the Hostname to Port to Proxy server urls to JWT vs SAML token support.  It works backwards compatible to Predix 1.0 security as well so you can use it port services from Predix 1.0 to 2.0 in the cloud.

###<a name="AssetBootstrapClient" href="https://github.build.ge.com/adoption/asset-bootstrap">Asset Bootstrap Client
Asset Bootstrap exposes the Predix Asset APIs for Groups, Classifications, Assets and Meters.  It also provides the ability to pass through or get tokens from Predix UAA Security.  This is also backwards compatible, at this time, to Predix Asset 14.3.

###<a name="TimeseriesBootstrapClient" href="https://github.build.ge.com/adoption/timeseries-bootstrap">Timeseries Bootstrap Client
Timeseries Bootstrap exposes the Predix Timeseries APIs following the KairosDB API.  Support for Start/End Date based timeseries calls are much more easily exposed including support for Predix UAA calls to Security Authorization.




