/*global define */
define(['angular', './sample-module'], function (angular, module) {
    'use strict';
    /**
     * PredixAssetService is a sample angular service that integrates with Predix Asset Server API
     */
    module.factory('PredixAssetService', ['$q', '$http', function ($q, $http) {

        /**
         * predix asset server base url
         */
        var baseUrl = '/api';

        /**
         * Added for reference app, to change query, depending on level in asset heirarchy.
         */
        var getChildrenUrl = function (parentId) {
            var query;

            if (parentId.indexOf('plant') >= 0) {
                // at plant level, we search for assets in the plant group
                // TODO - find a better way to identify plants???
                query = baseUrl + '/asset?filter=group=';
            } else if (parentId.indexOf('asset') >= 0) {
                // assets have parent assets
                query = baseUrl + '/asset?filter=parent=';
            } else {
                // groups have parent groups
                query = baseUrl + '/group?filter=parent=';
            }
            query = query + parentId;
             //console.log('returning childrenUrl: ' + query);
            return query;
        };

        /**
         * this method transforms asset entity into an object format consumable by px-context-browser item
         */
        var transformEntityForDisplay = function (entity) { // transform your entity to context browser entity format
            entity.name = entity.description;
            entity.id = entity.uri;
            entity.parentId = entity.parent;
            entity.isOpenable = true;
            return entity;
            
            // return {
            //     name: entity.description, // Displayed name in the context browser
            //     id: entity.uri, // Unique ID (could be a URI for example)
            //     parentId: entity.parent, // Parent ID. Used to place the children under the corresponding parent in the browser.
            //     isOpenable: true
            // };
        };

        /**
         * this method fetch asset children by parentId
         * (Default method from seed app, that we won't use in the reference app)
         */
        // var getEntityChildren = function (parentId, options) {
        //     var numberOfRecords = 100;
        //     var deferred = $q.defer();
        //     var childrenUrl = baseUrl + '?pageSize=' + numberOfRecords + '&topLevelOnly=true&filter=parent=' + parentId;
        //     var childEntities = {
        //         meta: {link: ''},
        //         data: []
        //     };
        //     if (options && options.hasOwnProperty('link')) {
        //         if (options.link === '') {
        //             deferred.resolve(childEntities);
        //             return deferred.promise;
        //         }
        //         else {
        //             //overwrite url if there is link
        //             childrenUrl = options.link;
        //         }
        //     }

        //     $http.get(childrenUrl)
        //         .success(function (data, status, headers) {
        //             var linkHeader = headers('Link');
        //             var link = '';
        //             if (data.length !== 0) {
        //                 if (linkHeader && linkHeader !== '') {
        //                     var posOfGt = linkHeader.indexOf('>');
        //                     if (posOfGt !== -1) {
        //                         link = linkHeader.substring(1, posOfGt);
        //                     }
        //                 }
        //             }

        //             childEntities = {
        //                 meta: {link: link, parentId: parentId},
        //                 data: data
        //             };
        //             deferred.resolve(childEntities);
        //         })
        //         .error(function () {
        //             deferred.reject('Error fetching asset with id ' + parentId);
        //         });


        //     return deferred.promise;
        // };

        /**
         * get asset by parent id
         * (Default method from seed app, that we won't use in the reference app)
         */
        // var getAssetsByParentId = function (parentId, options) {
        //     var deferred = $q.defer();

        //     getEntityChildren(parentId, options).then(function (results) {
        //         var transformedChildren = [];
        //         for (var i = 0; i < results.data.length; i++) {
        //             transformedChildren.push(transformChildren(results.data[i]));
        //         }

        //         results.data = transformedChildren;

        //         deferred.resolve(results);

        //     }, function () {
        //         deferred.reject('Error fetching asset with id ' + parentId);
        //     });

        //     return deferred.promise;
        // };

        var getRmdRefAppEntities = function(parent) {
            var parentId = parent.uri,
                deferred = $q.defer();

            $http.get(getChildrenUrl(parentId))
                .success(function (results) {  //, status, headers) {

                    var transformedChildren = [];
                    results.forEach(function(asset) {
                        transformedChildren.push(transformEntityForDisplay(asset));
                    });

                    var childEntities = {
                        meta: {parentId: parentId},
                        data: transformedChildren // results
                    };
                    deferred.resolve(childEntities);
                })
                .error(function () {
                    deferred.reject('Error fetching group with parent id ' + parentId);
                });

            return deferred.promise;
        };

        return {
            // getAssetsByParentId: getAssetsByParentId,
            getRmdRefAppEntities: getRmdRefAppEntities
        };
    }]);
});
