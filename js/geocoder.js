var geocoder = platform.getSearchService();

var peopleGroup = new H.map.Group();
map.addObject(peopleGroup);

function getMyPosition(){
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(position=>{
            // console.log(position.coords)
            var myPosition = {lat:position.coords.latitude,lng:position.coords.longitude};
            let myMarker = new H.map.Marker(myPosition);
            myMarker.setData("Hi I'm Shruti");
              // add marker to map
            peopleGroup.addObject(myMarker);
            getIsoline(myPosition);
            showStores(myPosition);
        })
            
        // console.log(position.coords)
    }
}
function showPeople(){
    fetch('peopleData.json') // call to your DB
    .then(response => response.json())
    .then(data =>{
        data.people.forEach(async person=>{
            let position = await showPosition(person.address);//get postion for person
            // place a marker
            let peopleInfo = person.name+' wants '+person.list[0];

            let peopleMarker = new H.map.Marker(position);
            peopleMarker.setData(peopleInfo);
              // add marker to map
            peopleGroup.addObject(peopleMarker);
            // console.log(position);
            map.getViewModel().setLookAtData({
                bounds: peopleGroup.getBoundingBox()
            });
        });
        // console.log(data)})
    })
}
async function showPosition(address){
    return new Promise((resolve, reject)=>{
        geocoder.geocode({q: address},(result) => {
                // Add a marker for each location found
                resolve(result.items[0].position)
              },function (error){reject(error.message)})
            });
}


function showStores(origin){
    geocoder.browse({
        at: origin.lat+','+origin.lng,
        limit: 1,
        categories: '600-6300-0066'
      }, function(result){
          console.log(result)

        }, function(error){console.log(error)})
}
getMyPosition();
showPeople();