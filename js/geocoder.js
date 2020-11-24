var geocoder = platform.getSearchService();
var peopleGroup = new H.map.Group();
map.addObject(peopleGroup);
function showPeople(){
    fetch('peopleData.json') // call to your DB
    .then(response => response.json())
    .then(data =>{
        data.people.forEach(async person=>{
            let position = await showPosition(person.address);//get postion for person
            // place a marker

            let peopleMarker = new H.map.Marker(position);
              // add marker to map
            peopleGroup.addObject(peopleMarker);
            // console.log(position);
            map.getViewModel().setLookAtData({
                bounds: peopleGroup.getBoundingBox()
            });
        })
        console.log(data)})
}

async function showPosition(address){
    return new Promise((resolve, reject)=>{
        geocoder.geocode({q: address},(result) => {
                // Add a marker for each location found
                resolve(result.items[0].position)
              },function (error){reject(error.message)})
            });
}

showPeople();