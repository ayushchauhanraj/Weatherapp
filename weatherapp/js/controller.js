app.controller('weatherController', ($scope, weatherFac) => {
    $scope.city;

    $scope.ajax = (lat, lag) => {
        console.log("inside the ajax")
        var promise = weatherFac.doAjax(lat, lag);
        promise.then(data => {
            $scope.data = data.data;
            console.log($scope.data);
            $scope.city = data.data.timezone;
            var date = new Date($scope.data.daily.data[5].time * 1000);
            console.log(date)
        }, (err) => {
            $scope.err = err;
        });
    }


    var mymap = L.map('mapid').setView([20.5937, 78.9629], 5);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 18,
        minZoom: 2,
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(mymap);

    function markerCheck() {

        if ($scope.marker) {
            mymap.removeLayer($scope.marker);
        }
        if ($scope.marker1) {
            mymap.removeLayer($scope.marker1);
        }

        results.clearLayers();
    }

    function onMapClick(e) {

        // mymap.on('click', function (e) {

        // });
        markerCheck();
        var location = e.latlng.toString();
        location = location.slice(7, location.length - 1);
        var tp = location.split(',');
        var lat = Number(tp[0]);
        var lag = Number(tp[1]);
        $scope.ajax(lat, lag);
        $scope.marker1 = L.marker([lat, lag]).addTo(mymap);
    }
    mymap.on('click', onMapClick);
    //search control
    L.control.scale().addTo(mymap);
    var searchControl = new L.esri.Controls.Geosearch().addTo(mymap);

    var results = new L.LayerGroup().addTo(mymap);

    searchControl.on('results', function (data) {
        markerCheck();
        results.clearLayers();
        for (var i = data.results.length - 1; i >= 0; i--) {
            results.addLayer(L.marker(data.results[i].latlng));
            $scope.marker3 = L.marker(data.results[i].latlng);
            $scope.ajax(data.results[i].latlng.lat, data.results[i].latlng.lng);
        }
    });

    // In order to get my current location 
    $scope.getMylocation = () => {
        markerCheck();
        navigator.geolocation.getCurrentPosition(function (location) {
            var latlng = new L.LatLng(location.coords.latitude, location.coords.longitude);
            $scope.ajax(location.coords.latitude, location.coords.longitude)
            $scope.marker = L.marker(latlng).addTo(mymap);
            $scope.marker.bindPopup("<b>You are Here</b><br>Hello!").openPopup()

        })

    }

});
