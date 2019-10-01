app.factory('weatherFac', ($http, $q, $sce) => {
    trustSrc = function (PRODUCTURL) {
        return $sce.trustAsResourceUrl(PRODUCTURL);
    }
    var obj = {
        doAjax(lat, lag) {
            let PRODUCTURL = `https://api.darksky.net/forecast/7b0b9bdfa881f77af313bcbc08069045/${lat},${lag}`;
            console.log(PRODUCTURL)
            let defer = $q.defer();
            $http({
                method: 'JSONP',

                url: trustSrc(PRODUCTURL)
            }).then(function successCallback(response) {
                console.log(response)
                defer.resolve(response)
            }, function errorCallback(response) {
                console.log(response)
            });
            return defer.promise;
        }
    }

    return obj;

})