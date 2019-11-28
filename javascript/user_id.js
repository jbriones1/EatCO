function createUser() {
  console.log(firebase.auth().currentUser);
    firebase.auth().onAuthStateChanged(function (user) {
      if (user) {
        console.log(user.displayName);
        document.getElementById("name").innerHTML = user.displayName;
        db.collection("users").add({
          "name": user.displayName,
          "email": user.email,
          "userid": user.uid
        });
      } else {
        console.log(user);
      }
    });
}


