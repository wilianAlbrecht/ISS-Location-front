async function buscar(){

    const jsonResponse = await fetch('http://localhost:8080/api/iss-location', {
        method: "GET",
        headers: {"Content-type": "application/json; charset=UTF-8"}
    }).then(response => {

        if(response.status == 200){
            return response.json(); // Isso faz o parsing do JSON da resposta
        }
      })

      //faz a requisição para o google para obter o endereço
      const geocoder = new google.maps.Geocoder();
      const infowindow = new google.maps.InfoWindow();

      const latlng = {
        lat: parseFloat(jsonResponse.latitude),
        lng: parseFloat(jsonResponse.longitude),
      };
    
      geocoder
        .geocode({ location: latlng })
        .then((response) => {
          if (response.results[0]) {
            map.setZoom(2);
            
            const marker = new google.maps.Marker({
              position: latlng,
              map: map,
            });
    
            infowindow.setContent(response.results[0].formatted_address);
            infowindow.open(map, marker);
          } else {
            window.alert("No results found");
          }
        })
        .catch((e) => window.alert("Geocoder failed due to: " + e));
        


}

var map;

async function initMap() {
  // The location of Uluru
  const position = { lat: -15.00, lng: -56.00 };
  // Request needed libraries.
  //@ts-ignore
  const { Map } = await google.maps.importLibrary("maps");
  const { AdvancedMarkerView } = await google.maps.importLibrary("marker");

  // The map, centered at Uluru
  map = new Map(document.getElementById("map"), {
    zoom: 2,
    center: position,
    mapId: "DEMO_MAP_ID",
  });

  // The marker, positioned at Uluru
      const marker = new AdvancedMarkerView({
          map: map,
          position: position,
          title: "Uluru",
      });


  
}

initMap();