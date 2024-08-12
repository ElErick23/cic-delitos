
onmessage = function (points, geoJSON,markerClusterGroup) {
    console.log(points);
    console.log(geoJSON);
    const data = {
        type: "FeatureCollection",
        features: points,
    }
    const lightData = geoJSON(data, {
        chunkedLoading: true
        // pointToLayer: function (feature, latlng) {
        //     return L.marker(latlng, { icon: iconMarker });
        // },

    });
    console.log("YES")

    const markers = markerClusterGroup({
        maxClusterRadius: 200,
        disableClusteringAtZoom: 18,
        spiderfyOnMaxZoom: false,
        showCoverageOnHover: false,
    })
    markers.addLayer(lightData);

    postMessage(markers);
}