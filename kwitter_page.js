//YOUR FIRE BASE LINKS
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
RoomName = localStorage.getItem("RoomName");

function send() {
    msg = document.getElementById("msg").value;
    firebase.database().ref(RoomName).push({
        name: UserName,
        message: msg,
        like: 0
    });
    document.getElementById("msg").value = "";
}

function getData() {
    firebase.database().ref("/" + RoomName).on('value', function (snapshot) {
                document.getElementById("output").innerHTML = "";
                snapshot.forEach(function (childSnapshot) {
                            childKey = childSnapshot.key;
                            childData = childSnapshot.val();
                            if (childKey != "purpose") {
                                firebase_message_id = childKey;
                                message_data = childData;
                                name1 = message_data['name'];
                                message = message_data['message'];
                                like = message_data['like'];

                               

                                name_with_tag = "<h4>"+name1+"</h4>";
                            message_with_tag = "<h4 class = 'message_h4'>"+message+"</h4>";
                        like_button = "<button class= 'btn btn-info' id="+firebase_message_id+" value="+ like+ " onclick='updatelikes(this.id)'>";
                        span_with_tag = "<span class = 'glyphicon glyphicon-thumbs-up'>Likes: "+like+"</span></button><hr>";
                        row = name_with_tag+message_with_tag+like_button+span_with_tag;
                        document.getElementById("output").innerHTML +=row;
                    }



                        });
                    });
                };

                getData();

                function updatelikes(messageid){
                    buttonid = messageid;
                    likes = document.getElementById(buttonid).value;
                     onsole.log(likes)
                    updatedlike = Number(likes)+1;
                   
                   // document.getElementById(buttonid).className += " disabled";
                    firebase.database().ref(RoomName).child(messageid).update({
                        like : updatedlike
                    });
                };