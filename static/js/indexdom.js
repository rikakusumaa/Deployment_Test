document.addEventListener("DOMContentLoaded", function(event) {  

    document.getElementById("search-icon").addEventListener("click", isClicked);
    function isClicked(){
        let inputs = $('#search-input').val();
        localStorage.setItem("value", inputs);

        
        if(inputs === ""){
            alert("Please fill the search box first!");
            document.getElementById("search-icon").setAttribute("href", "javascript:;");
        }
        
        else{
            document.getElementById("form-input").submit();
        }
        return true;
    };
});


