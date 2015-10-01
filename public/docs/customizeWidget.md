## Customizing your UI - creating a new widget
    
In this section we will go over customizing and creating your own widget. 
    
Before you proceed customizing your UI, take a look at the contextual dashboard documentation at https://github.sw.ge.com/Predix-Experience/px-contextual-dashboard
    
Lets take a simple scenario - The standard px-datagrid only have rows columns , and each cell is a value bound by the widget contract. Now we want to customize the widge such a way that some of the cell shows two values 
    
        * average meter value last week 
        * percetage up/down compared to the expected value.
        
Here is how the customization would look like.

![kpi](https://github.build.ge.com/github-enterprise-assets/0000/0727/0000/0304/0c015ab0-d34c-11e4-8249-2b016399d32c.jpg)

There are two components for the widget,

       * how the widget should look like (widget template)
               We have cloned px-datagrid widet and customized as per our needs. Customized widget code is in 
                  https://github.build.ge.com/predix-integration/rmd-px-datagrid.git
       * how the widget gets the data (datasource)
                Widget contract/datasource coming from a backend service https://github.build.ge.com/predix-integration/rmd-ui-service.git 
                
Below are the detailed steps to customize:

	i. Register your meta-data for the widget
		Modify the all-context-meta.json file to register your widget. Please refer to this file at rmd_ui_service/src/main/resources/qa folder.
 	
 	ii. Modify the Widget layout based on the use case.
 	
 	````
	  a. Git Fork data grid widget implementation from https://github.build.ge.com/PredixWidgetCatalog/px-datagrid 
	  	In the local workspace, Modify the rmd-px-datagrid/src/px-datagrid.js
	
	  b. Customize the template at rmd-px-datagrid/src/px-datagrid.tmpl
	  
	  	Here is a snippet of the customization required for the kpi widget.

		<Code>
              	 <tr ng-repeat="x in filtered" ng-init="current = x" ng-click="_onRowClick(x)" ng-class="trClass">
                <td ng-class="tdClass" ng-repeat="f in columns">
                    <span ng-if="!current.selected">{{current[f.field][0]}}</span>
                    <span ng-if="f.field === 'output' || f.field === 'heatRate' || f.field=== 'compressorEfficiency' "><span ng-class="current[f.field][1] > 0 ? 'deltaUp' : 'deltaDown'"><i ng-class="current[f.field][1] > 0 ? 'icon-caret-up' : 'icon-caret-down'"></i>{{current[f.field][1]}}%</span></span>
                    <div ng-if="editInPlace && current.selected">
                        <input ng-model="current[f.field]" ng-show="!f.options" type="{{f.inputType}}" 
                        size="{{f.inputSize}}" style="width:auto;"/>
                        <select ng-if="f.options" style="width:auto;" ng-model="current[f.field]" ng-options="o.option as o.label for o in f.options"></select>
                    </div>
                </td>
 		</Code>
	````

	iii. Modify the Views to place the widget on the dashboard.
	
		The Views defines the layout of the dashboard . The views json defines the widget contract and this view should be modified to match the data grid modifications.
		
		a. Modify the view.json at rmd-ui-service/data-script/asset-data to define the new data contract for the custom widget.
		b. Run the script create-view.sh to register the view.