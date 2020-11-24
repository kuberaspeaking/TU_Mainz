var geocoder = platform.getSearchService();

function showPeople(){
    fetch('peopleData.json')
    .then(response => response.json())
    .then(data =>{
        data.people.forEach(async person=>{
            let position = await showPosition(person.address);//get postion for person
            // place a marker
            console.log(position);
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