var router = platform.getRoutingService(null, 8);

function getIsoline(origin){
    let url = `https://isoline.router.hereapi.com/v8/isolines?`+
                `apiKey=${window.hereApiKey}`+
                `&transportMode=car`+
                `&range[type]=distance`+
                `&range[values]=10000`+ //distance in meters
                // `&departureTime=2020-07-31T06:30:00`+
                `&origin=${origin.lat},${origin.lng}`;
    fetch(url)
    .then(result => result.json())
    .then(result=>{
        // console.log(result);
        result.isolines[0].polygons.forEach(polygon=>{

            let linestring = H.geo.LineString.fromFlexiblePolyline(polygon.outer);

            // Create a polyline to display the route:
            let routePolygon = new H.map.Polygon(linestring,{
            style: { 
                strokeColor: '#EC610E',
                fillColor:'rgba(245,176,134,0.4)',
                lineWidth: 3 
            }
            });

            map.addObject(routePolygon);
        });
    })
    .catch(error =>{
       console.log(error);
    })

}