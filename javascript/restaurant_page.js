// Gets the restaurant ID from the URL. Taken from the map page.
var queryString = decodeURIComponent(window.location.search);
var queries = queryString.split("?");
var restoId = queries[1];
var restaurant = db.collection("Restaurants").doc(restoId);

// Declaration of various collections
var reviews = restaurant.collection("Reviews");
var reviewSection = document.getElementById("reviews");
var reviewLeftSection = document.getElementById("review-section");

// ------------------------------
// ------ Restaurant Info  ------
// ------------------------------

// Reads the restaurant info from the database and adds the information
// to html elements on the page. Called whenever the restaurant page
// is loaded. 
function loadRestoInfo() {
  restaurant.get().then(function (doc) {
    var n = doc.data().Name;
    var desc = doc.data().description;
    var addr = doc.data().address;
    var phone = doc.data().phoneNumber;
    var price = doc.data().price;
    var rating = doc.data().rating;
    var type = doc.data().type;

    $("#name").html(n);
    $("#address").html(addr);
    $("#description").html(desc);
    $("#phone-number").html(phone);
    $("#price").html(price);
    $("#rating-number").html(rating);
    $("#type").html(type);
    $("title").html(n);
  });
}

// Reads the image from the cloud store and places it in the correct image spot.
function showRestoImage() {
  sto.ref().child(restoId+".jpg").getDownloadURL().then(function(url) {
    document.getElementById("resto-image").src = url;
  });
}

// ------------------------------
// ------ Writing a review ------
// ------------------------------
// Grabs the review section from the restaurant's database and creates
// review boxes to display each review. Each review contains
// the name of the reviewer and when it was submitted. Orders the reviews
// by date submitted.
// Called whenever the page is loaded.
function loadReviews() { // function to load reviews to the page
  reviews.orderBy("date").get() // grabs the docs from the reviews docs from the "Reviews" collection
    .then(function (snap) {
      snap.forEach(function (doc) { // goes through each document
        let r = doc.data().review; // grabs the review portion
        let t = doc.data().date;
        let n = doc.data().reviewer;
        tDate = t.toDate();
        let dateFormatted = tDate.toISOString().substring(0,10);
//            console.log(dateFormatted);

        // Creates elements for the review section
        let rvr = document.createElement("span");
        rvr.setAttribute("class", "reviewer");
        let date = document.createElement("span");
        date.setAttribute("class", "timeStamp");
        let div = document.createElement("div");
        div.setAttribute("class", "reviewContainer");
        div.setAttribute("id", doc.id);
        reviewSection.insertBefore(div, reviewLeftSection);
        let dateNode = document.createTextNode(dateFormatted);
        date.appendChild(dateNode);

        div.appendChild(rvr);
        let rvrnode = document.createTextNode(n);
        rvr.appendChild(rvrnode);

        div.appendChild(date);
        let node = document.createTextNode(r);
        div.appendChild(node);
      })
    });
}

// ------------------------------
// ----- Submitting a review ----
// ------------------------------

// Attaches a click listener to the submit button.
// Happens when the page is loaded.
document.getElementById("send-review").addEventListener("click",
submitReview); // attaches a click listener to the submit button

// Function that is used whenever the submit button is clicked.
// Creates a review in the restaurant's review collection and writes in
// that collection.
function submitReview(e) { // function to write a review to the restaurant
  var reviewText = document.getElementById("review-textarea").value; // text field where the review is typed
  var reviewDate = firebase.firestore.Timestamp.fromDate(new Date());
  var username = firebase.auth().currentUser;

  // Creates the review and adds it to the database
  // Writes the review date, name and review text to the database.
  reviews.doc().set({
    review: reviewText,
    date: reviewDate,
    reviewer: username.displayName
  }).then(function () {
    let dateObj = reviewDate.toDate()
    let dateFormatted = dateObj.toISOString().substring(0,10);

    // Creates a new review box and adds it to the HTML
    let rvr = document.createElement("span");
    rvr.setAttribute("class", "reviewer");
    let date = document.createElement("span");
    date.setAttribute("class", "timeStamp");
    let div = document.createElement("div");
    div.setAttribute("class", "reviewContainer");
    reviewSection.insertBefore(div, reviewLeftSection);
    let dateNode = document.createTextNode(dateFormatted);
    date.appendChild(dateNode);

    div.appendChild(rvr);
    let rvrnode = document.createTextNode(username.displayName);
    rvr.appendChild(rvrnode);

    div.appendChild(date);
    let node = document.createTextNode(reviewText);
    div.appendChild(node);
    document.getElementById("review-textarea").value = " "; // supposed to set the textfield to nothing after review is submitted
  })
}

// Allows the tabs to be switched in the restaurant page.
// Happens whenever a tab is clicked on the restaurant page.
function openTab(tabName) {
  var i;
  var x = document.getElementsByClassName("info");
  for (i = 0; i < x.length; i++) {
    x[i].style.display = "none";
  }
  document.getElementById(tabName).style.display = "block";
}

// Function to remove the blur after the page has loaded in.
// Happens 2000 ms (2 seconds) after the page is loaded.
function loadBlur() {
  $(".blur").removeClass("blur");
}
