mapboxgl.accessToken = mapToken;
const map = new mapboxgl.Map({
    container: 'map', // container ID
    style: 'mapbox://styles/mapbox/streets-v12', // style URL
    center: campLoc.geometry.coordinates, // starting position [lng, lat]
    zoom: 8, // starting zoom
});


new mapboxgl.Marker()
    .setLngLat(campLoc.geometry.coordinates)
    .setPopup(
        new mapboxgl.Popup({ offset: 25 })
            .setHTML(
                `<h3>${campLoc.title}</h3><p>${campLoc.location}</p>`
            )
    )
    .addTo(map)


