function displayUser(){
  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      document.getElementById("test").innerHTML = user.displayName;
    } else {
      console.log(user);
    }
  });
}

