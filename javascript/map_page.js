function initMap() {
  var bcit = {
    lat: 49.250,
    lng: -123.000
  };
  var map = new google.maps.Map(
    document.getElementById('map'), {
      zoom: 14,
      center: bcit
    });
  var pinImage = {
    url: './images/leafPin.png',
    labelOrigin: new google.maps.Point(15, 40)
  };
  var marker2 = new google.maps.Marker({
    position: bcit,
    map: map,
    icon: pinImage,
    label: {
      color: 'green',
      fontSize: '10pt',
      text: 'BCIT',
      fontWeight: 'bold',
    }
  });


db.collection('Restaurants').get().then(function (querySnapshot) {
  querySnapshot.forEach(function (doc) {
    console.log(doc.id, " => ", doc.data());
    var lat = doc.data().location._lat;
    var long = doc.data().location._long;
    var name = doc.data().Name;
    var docid = doc.id;
    console.log(name);
    console.log(docid);
    var marker = new google.maps.Marker({
      position: {
        lat: lat,
        lng: long,
      },
      map: map,
      labelAnchor: new google.maps.Point(100, 0),
      title: name,
      icon: pinImage,
      url: doc.data().link,
      label: {
        textShadow: '10px 10px #ff0000',
        fontWeight: 'bold',
        color: 'green',
        fontSize: '10pt',
        text: name
      }
    });
    google.maps.event.addListener(marker, 'click', function () {
      window.location.href = "restaurantpage.html?"+docid;
    });
  });
});


}