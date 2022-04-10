const data = {
  "musics": [
    {
      "title": "The scienst",
      "author": "Coldplay",
      "link": "http://docs.google.com/uc?export=open&id=1LGeODTRjB4VsDx_707Nc-I0tyRZrpk0Z"
    },
    {
        "title": "Don't stat now",
        "author": "Dua Lipa",
        "link": "http://docs.google.com/uc?export=open&id=1D1Ev22IM7la05QGl-lhfLnydZymsMbaW"
    },
    {
        "title": "Levitating",
        "author": "Dua Lipa",
        "link": "http://docs.google.com/uc?export=open&id=1MNcNE5S8zuO5lRevW6vM67gHxpGFGK2Y"
    },
    {
        "title": "Nothing breaks like a heart",
        "author": "Miley Cyrus",
        "link": "http://docs.google.com/uc?export=open&id=1EynP8K2Yh03m_YGQ3j8d0wwhWAFjQxeo"
    },
    {
        "title": "Let her go",
        "author": "Passenger",
        "link": "http://docs.google.com/uc?export=open&id=1RdqQEisrBd_M0QAQd2Sv3vxN0qiVLoY1"
    },
    {
        "title": "No Lie",
        "author": "Sean Paul ft Dua Lipa",
        "link": "http://docs.google.com/uc?export=open&id=1JuKzPmg38yYQuVnZikkwG--XXlVdKPal"
    },
    {
        "title": "Snowman",
        "author": "Sia",
        "link": "http://docs.google.com/uc?export=open&id=1VDf4OdPIbyH2Ornt0HvPGvRnVFvgP9k0"
    }
  ]
}
let index = 0;
const musicList = document.getElementById('list');
for (let i = 0; i< data.musics.length; i++) {
  const music = document.createElement('li');
  music.setAttribute('id', data.musics[i].title);
  music.appendChild(document.createTextNode(`${data.musics[i].author} - ${data.musics[i].title}`));
  music.myLink = data.musics[i].link;
  music.indexMusic = i;
  music.addEventListener('click', playMusicFromList)
  musicList.appendChild(music)
}


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
