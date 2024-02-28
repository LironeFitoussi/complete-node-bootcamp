/* eslint-disable */
const locations = JSON.parse(document.getElementById("map").dataset.locations);
mapboxgl.accessToken =
  "pk.eyJ1IjoibGlyb25lZml0b3Vzc2kiLCJhIjoiY2x0NXF4azRnMDNjZTJxcGRkbjMxdWo2aiJ9.CdWsopX-B91jgnAx_Qs7tg";
var map = new mapboxgl.Map({
  container: "map",
  style: "mapbox://styles/lironefitoussi/clt5rbiv1003601qyhuak76kd",
  //   center: [-118.113491, 34.111745],
  //   zoom: 8,
  //   interactive: false,
});
map.scrollZoom.disable();
const bounds = new mapboxgl.LngLatBounds();

locations.forEach((loc) => {
  // Create marker
  const el = document.createElement("div");
  el.className = "marker";

  // Add marker
  new mapboxgl.Marker({
    element: el,
    anchor: "bottom",
  })
    .setLngLat(loc.coordinates)
    .addTo(map);

  // Add popup
  new mapboxgl.Popup({
    offset: 30,
  })
    .setLngLat(loc.coordinates)
    .setHTML(`<p>Day ${loc.day}: ${loc.description}</p>`)
    .addTo(map);

  // Extend map bounds to include current location
  bounds.extend(loc.coordinates);
});

map.fitBounds(bounds, {
  padding: {
    top: 200,
    bottom: 150,
    left: 100,
    right: 100,
  },
});
