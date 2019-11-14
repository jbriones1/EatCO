firebase.auth().onAuthStateChanged(function (user) {
      if (user) {
        console.log(user.displayName);
        document.getElementById("test").innerHTML = user.displayName;
        user.once('value', function (snapshot) {
          if (snapshot.exists()) {
            console.log('exists');
          } else {
            db.collection("users").add({
              "name": user.displayName,
              "email": user.email,
              "userid": user.uid});
          }
        });
      } else {
        console.log(user);
      }
});


