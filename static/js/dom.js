document.addEventListener("DOMContentLoaded", function(event) {  
    document.getElementById("nav-link").style.justifyContent = "center";

    const songComb = document.createElement("p");
    const currContainer = document.getElementById("curr-song");
    
    let inputs = localStorage.getItem("value");
    console.log(inputs);
    
    const resTitle = document.getElementById("res-title");
    const description = document.getElementById("res-desc");
    resTitle.innerHTML = 'Recommendations for you';
    description.innerHTML = 'showing recommendations based on:';
            
    if(songComb.innerText === ""){
        songComb.innerText = inputs;
        currContainer.appendChild(songComb);
    }

    else{
        songComb.innerText = inputs;
    }
    currContainer.style.display = "block";

    let th0 = document.getElementsByTagName("TH")[0];
    th0.innerHTML = "No.";

    let th1 = document.getElementsByTagName("TH")[1];
    th1.innerHTML = "Artist & Song Title";

    let th2 = document.getElementsByTagName("TH")[2];
    th2.innerHTML = "Song Title";

    let th3 = document.getElementsByTagName("TH")[3];
    th3.innerHTML = "Artist Name";

    let th4 = document.getElementsByTagName("TH")[4];
    th4.innerHTML = "Mood";

});