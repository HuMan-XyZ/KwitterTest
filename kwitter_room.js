const firebaseConfig = {
      apiKey: "AIzaSyAmHGUmFkUIa6qe_1I5sBNu6mpo_B00Y20",
      authDomain: "roomtalk-a35bb.firebaseapp.com",
      databaseURL: "https://roomtalk-a35bb-default-rtdb.firebaseio.com",
      projectId: "roomtalk-a35bb",
      storageBucket: "roomtalk-a35bb.appspot.com",
      messagingSenderId: "129742129730",
      appId: "1:129742129730:web:cdf9c9a70286cc4b9abbdb",
      measurementId: "G-9F5B6RLYVC"
    };
    
    // Initialize Firebase
    const app = initializeApp(firebaseConfig);
    const analytics = getAnalytics(app);
UserName = localStorage.getItem("Username");
 document.getElementById("userwelcome").innerHTML = "Welcome, " + UserName + ".";


function getData() {firebase.database().ref("/").on('value', function(snapshot) {document.getElementById("output").innerHTML = "";snapshot.forEach(function(childSnapshot) {childKey  = childSnapshot.key;
       Room_names = childKey;
      //Start code
  row = "<div class = 'roomname' id ="+Room_names+" onclick='redirecttoroomname(this.id)'>Room"+Room_names+ "</div> <hr>";
  console.log(Room_names)
  document.getElementById("output").innerHTML += row;
      //End code
      });});}
getData();


function addRoom(){
      GetRoom = document.getElementById("roominput").value; 
      firebase.database().ref("/").child(GetRoom).update({
            purpose: "New Room"
      })
      localStorage.setItem("Roomname" , GetRoom);
      window.location = "kwitter_page.html";
      
}


function redirecttoroomname(name){
      console.log(Room_names);
      localStorage.setItem("RoomName" , name);
     
      window.location = "kwitter_page.html";
}

function logout() {
      localStorage.removeItem("Username");
      localStorage.removeItem("RoomName");
      window.location = "index.html";
}