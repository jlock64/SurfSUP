angular.module('surfSup')
.controller('MapController', function ($scope) {

    // angular.extend($scope, {
    //     map: {
    //         center: {
    //             latitude: 32.7799400,
    //             longitude:-79.9341970
    //         },
    //         zoom: 11,
    //         markers: [],
    //         events: {
    //         click: function (map, eventName, originalEventArgs) {
    //             var e = originalEventArgs[0];
    //             var lat = e.latLng.lat(),lon = e.latLng.lng();
    //             var marker = {
    //                 id: Date.now(),
    //                 coords: {
    //                     latitude: lat,
    //                     longitude: lon
    //                 }
    //             };
    //             $scope.map.markers.push(marker);
    //             console.log('MARKERS:', $scope.map.markers);
    //             window.glow = $scope.map.markers;
    //             $scope.$apply();
    //         }
    //     }
    //     }
    // });
});
