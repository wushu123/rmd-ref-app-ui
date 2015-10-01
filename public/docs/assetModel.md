## Model Assets, Meters

### Create your assets, meters, classifications and groups

For an overview of the Predix Asset service, please see the [MVP 1 Documentation](http://sjc1ecldoc01.crd.ge.com:8080/exist/restxq/twopanel/review/mvp1/am_asset_services.html).

#### Uploading asset data
Regardless of your asset model, you'll probably want to store it in Predix Asset.  There are several ways to do this.  The two main ways are described here:

1. Run curl scripts to post JSON files to Predix Asset REST API.  Sample json files are provided at https://github.build.ge.com/predix-integration/rmd-ui-service/tree/develop/data-scripts/asset-data, along with README instructions to run the scripts for your application.  You should modify the scripts and JSON files for your needs.
2. Define your asset model in an Excel spreadsheet, and upload to the [data-seed-service](https://github.build.ge.com/adoption/data-seed-service).

#### RMD Reference app asset model
For this reference app, we are modeling assets (machines) in the Oil & Gas industry.  Companies have plants, with many machines at those plants.  Each machine could have many sensors (meters).  In this model, assets are grouped together using Predix Asset groups.  Assets can also be organized in a heirarchy, which can be nested many levels deep.  For instance, a compressor asset could have many parts - valves, combustion liners, fuel nozzles, turbine rotor etc.  We want to monitor the performance of these parts.  What is the fuel pressure at the nozzles? What is the temperature around combustion lines?  What is the rotating speed of the rotor? 

The spreadsheet defining the model for this app can be found here: <https://github.build.ge.com/adoption/data-seed-service/blob/master/dataseed-service/src/main/resources/rmdapp/AssetData.xls>

##### Groups
In this model, we group assets together by company, site, and plant.  A plant could be a refinery with many machines and parts such as turbines, compressors, valves, pumps, etc.

Sample group:
```
    {
        "parent": "/group/site-richmond",
        "description": "Refinery",
        "uri": "/group/plant-richmond-refinery",
        "level": "plant",
        "name": "Richmond Refinery 1",
        "createdate": "2015-03-24T12:28:01.000Z"
    }
```

##### Classifications
A classification is a type of asset.  For instance an asset could have a classification of "GE_COMPRESSOR".  Classifications are essentailly just tagging an asset with an additional property, so it will be easy to find the assets in a given classification instead of naviagting through hierachy of assets.  We've defined a few classifications in the model, which are important for several reasons.  If you have a large data model with many assets, classifications help to organize the assets.  Also, assets are tied to "views" in the Predix Dashboard in the front end of this application.

Sample classification:
```
    {
        "uri": "/classification/GE_COMPRESSOR",
        "name": "GE_COMPRESSOR",
        "description": "GE Compressor",
        "obsolete": false,
        "attributes": {
            "Model": {
                "type": "string"
            },
            "Serial Number": {
                "type": "string"
            }
        }
    }
```

##### Assets
Assets can be any kind of machine or part that you want to monitor.  In this application, the asset Chevron > Richmond > Refinery > Bently Compressor is the most important.  It has meters defined on it which are tied to a real Predix Machine instance.

Sample asset, with two associated meters:
```
    {
        "uri": "/asset/plant-richmond-refinery-summary",
        "group": "/asset/plant-richmond-refinery-summary/group",
        "description": "Summary for Richmond Plant",
        "assetId": "plant-richmond-refinery-summary",
        "nonserialized": {},
        "attributes": {
            "summary": {
                "type": "string",
                "value": [
                    "/group/plant-richmond-refinery"
                ]
            },
            "summaryMeter": {
                "type": "string",
                "value": [
                    "site-total-output1",
                    "isomerization-reactor-output1"
                ]
            }
        },
        "meters": {
            "isomerization-reactor-output1": {
                "meterUri": "/meter/c5-c6-isomerization-reactor-output",
                "sourceTagId": "isomerization-reactor-output1",
                "dataSource": "isKpi=true",
                "isManual": false,
                "outputMinimum": 72,
                "outputMaximum": 100,
                "isSelfPower": false
            },
            "site-total-output1": {
                "meterUri": "/meter/summary-output-mbd",
                "sourceTagId": "plant-richmond-refinery-summary-mbd1",
                "dataSource": "isKpi=true",
                "isManual": false,
                "outputMinimum": 0,
                "outputMaximum": 2,
                "isSelfPower": false
            }
        }
    }
```

##### Meters
Meters represent measurements taken from an industrial machine in the plant.  These could be monitored continuously for alerts and performance optimization.  Meters are associated with time-series data via the sourceTagId.  In this application, they are also associated with real sensors using the dataSource field.  Note that instances of meters are are included in the asset itself, along with specifics for that instance of the meter.

Sample meter:
```
    {
        "uri": "/meter/cylinder-crank-frame-velocity",
        "name": "Cylinder Crank Frame Velocity",
        "description": "Crank Frame Velocity",
        "meterType": "Continuous",
        "dataType": "number",
        "uom": "m/s",
        "tags": ["test.tag"]
    }
```
