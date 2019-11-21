  <!-- Insert these scripts at the bottom of the HTML, but before you use any Firebase services -->

  <!-- Firebase App (the core Firebase SDK) is always required and must be listed first -->
  <script src="https://www.gstatic.com/firebasejs/7.2.2/firebase-app.js"></script>

  <!-- Add Firebase products that you want to use -->
  <script src="https://www.gstatic.com/firebasejs/7.2.2/firebase-auth.js"></script>
  <script src="https://www.gstatic.com/firebasejs/7.2.2/firebase-firestore.js"></script>


	<script>
    // Your web app's Firebase configuration
  var firebaseConfig = {
    apiKey: "AIzaSyCo-LlpYtYvJMyMeX8gZ641jH_QD7iEHXk",
    authDomain: "comp1930-app.firebaseapp.com",
    databaseURL: "https://comp1930-app.firebaseio.com",
    projectId: "comp1930-app",
    storageBucket: "comp1930-app.appspot.com",
    messagingSenderId: "862102020646",
    appId: "1:862102020646:web:fae4e0f72f0f01df81fce7"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);