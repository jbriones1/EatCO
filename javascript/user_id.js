// Create a user in the database, merges it if it's already there
firebase.auth().onAuthStateChanged(function (user) {
  if (user) {
    console.log(user.displayName);
    let firstname = user.displayName.split(' ')
    document.getElementById("name").innerHTML = firstname[0];
    db.collection("users").doc(user.uid).set({
      "name": user.displayName,
      "email": user.email,
      "userid": user.uid
    },{merge: true});
  } else {
    console.log(user);
  }
});


