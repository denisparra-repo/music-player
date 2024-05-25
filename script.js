const musicList = document.getElementById('list');
const generateLink = (id) => `http://docs.google.com/uc?export=open&id=${id}`
let index = 0;
const addElement = (id, name, indexMusic) => {
  const music = document.createElement('li');
  music.setAttribute('id', id);
  music.appendChild(document.createTextNode(`${name}`));
  const template = generateLink(id)
  music.myLink = template;
  music.indexMusic = indexMusic;
  music.addEventListener('click', playMusicFromList)
  musicList.appendChild(music)
}

$.ajax({
  dataType: 'json',
  url: "http://localhost:8080/musics",
  type: "GET",
  success: function (data) {
      for(let i = 0; i < data.length; i++) {
        addElement(data[i].id, data[i].name, i)
      }   
  },
  error: function (xhr, textStatus, errorThrown) {
      console.log(xhr)
  }
});

const next = document.getElementById('next')
next.addEventListener('click', function() {
   if (index < data.musics.length - 1) {
      index = index + 1;
      playMusicByLink(data.musics[index].link)
   }
})

const prev = document.getElementById('prev')
prev.addEventListener('click', function() {
   if (index > 0) {
      index = index - 1;
      playMusicByLink(data.musics[index].link)
   }
})

function playMusicByLink(link) {
  const player = document.getElementById('player');
  const playerSource = document.getElementById('musicItem');
  playerSource.setAttribute('src', link);
  player.load();
  player.play();
}

function playMusicFromList(evt) {
  playMusicByLink(evt.currentTarget.myLink)
  index = evt.currentTarget.indexMusic;
}

$('#uploadForm').submit(function() {
  $("#status").empty().text("File is uploading...");
  $(this).ajaxSubmit({
    error: function(xhr) {
      status('Error: ' + xhr.status);
    },
    success: function(response) {
      $("#status").empty().text('File was uploaded');
          console.log(response);
      $.ajax({
        dataType: 'json',
        url: "http://localhost:8080/musics",
        type: "GET",
        success: function (data) {
            let file = data.find(file => file.id == response)
            addElement(file.id, file.name, data.length)
        },
        error: function (xhr, textStatus, errorThrown) {
            console.log(xhr)
        }
      });
    }
});

  //Very important line, it disable the page refresh.
return false;
})