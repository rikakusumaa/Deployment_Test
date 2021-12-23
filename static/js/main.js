$(document).ready(function(){
    $.ajaxSetup({ cache: false });
    $('#search-input').keyup(function(){
        $('#match-list').html('');
        $('#state').val('');
        const searchField = $('#search-input').val();
        const expression = new RegExp(searchField, "i");
 
        $.getJSON('../static/data/songs.json', function(songs) {
          console.log(songs);
          let count = 0;
          $.each(songs, function(key, value){
            if (value.artist_music.search(expression) != -1){
              $('#match-list').append(`
                <li class="list-group-item link-class">
                  <span class="nama" style="font-weight: 600">`+value.artists+`</span>
                  <span class="text-muted" style="float: right;">`+value.titles+`</span>
                  <span class="combined" style="display: none;">`+value.artist_music+`</span>
                  <span class="mood" style="display: none;">`+value.moods+`</span>
                </li>`);
              count++;
            }
            return (count < 10);   
          });
          document.getElementById("foot").style.marginTop = "55%";
          if(searchField === "") {
              $('#match-list').html("");
          }
        });
    });

    
    $('#match-list').on('click', 'li', function() {
      let nama_lagu = $(this).children('.combined').text();
      $('#search-input').val(nama_lagu);
      $("#match-list").html('');
    });
});