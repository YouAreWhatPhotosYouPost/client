function showItunes(highestEmotion, idImage){
  $('#songRecomendationList').empty();
  //nanti genreId sesuai data emotions: Schema.Types.Mixed,
  //let emotions =
  let genreId = 14; //defaultnya pop
  switch (highestEmotion[0]) {
    case 'anger':
      genreId = 1153; //grnre metal
      break;
    case 'contempt':
      genreId = 20; //grnre Alternative
      break;
    case 'disgust':
      genreId = 21; //grnre Rock
      break;
    case 'fear':
      genreId = 8; //grnre Holiday
      break;
    case 'happiness':
      genreId = 17; //grnre Dance
      break;
    case 'neutral':
      genreId = 25; //grnre Easy Listening
      break;
    case 'sadness':
      genreId = 16; //grnre soundtrack
      break;
    case 'surprise':
      genreId = 13; //grnre New Age
      break;
    default:
      genreId = 51
  }

  console.log("masuk ke seneh", genreId)

  //API url untuk search Lagu berdasarkan genre
  let apiUrl = `https://itunes.apple.com/search?term=genre&genreId=${genreId}&limit=9`;
  let songs = document.querySelector("#songRecomendationList")
  // console.log(songs);
  // songs.empty()
  //
  axios.get(apiUrl)
  .then(function (response){

    let itunesRec = [];
    response.data.results.forEach(objSongs =>{
      let table = document.createElement('TABLE')
      let tableRow = document.createElement('TR')
      table.setAttribute('class', 'music')
      table.appendChild(tableRow)

      //Artist Name
      let artistName = document.createElement('TD')
      let artistNameText = document.createTextNode(objSongs.artistName)
      artistName.appendChild(artistNameText)
      tableRow.appendChild(artistName)

      //Track Name
      let trackName = document.createElement('TD')
      let trackNameText = document.createTextNode(objSongs.trackName)
      trackName.appendChild(trackNameText)
      tableRow.appendChild(trackName)

      //artist Url
      let artistView = document.createElement('TD')
      let artistA = document.createElement('a')
      artistA.innerHTML = 'Visit Artist'
      artistA.setAttribute('href', objSongs.artistViewUrl)
      artistA.setAttribute('target', '_blank')
      artistView.appendChild(artistA)
      tableRow.appendChild(artistView)

      //track Url
      let viewTrack = document.createElement('TD')
      let trackA = document.createElement('a')
      trackA.innerHTML = 'View Track'
      trackA.setAttribute('href', objSongs.trackViewUrl)
      trackA.setAttribute('target', '_blank')
      viewTrack.appendChild(trackA)
      tableRow.appendChild(viewTrack)

      //preview Track
      let previewTrack = document.createElement('TD')
      let previewA = document.createElement('a')
      previewA.innerHTML = 'Preview Track'
      previewA.setAttribute('href', objSongs.previewUrl)
      previewA.setAttribute('target', '_blank')
      previewTrack.appendChild(previewA)
      tableRow.appendChild(previewTrack)

      songs.appendChild(table)

      let itunesMusic = {
        artistName: objSongs.artistName,
        trackName: objSongs.trackName,
        artistUrl: objSongs.artistViewUrl,
        trackUrl: objSongs.trackViewUrl,
        previewTrack: objSongs.previewUrl
      }

      itunesRec.push(itunesMusic);


    })

    //Kirim Data ke Server
    //harus bikin validasi kalo udah d save ga perlu save lagi
    axios.post('http://localhost:3000/music/save', {
      itunesRec
    })
    .then(function (response) {
      let idMusic = response.data.musicRec._id;
      console.log("response- ", response)
      console.log("id music: ", idMusic)
      console.log("id image: ", idImage)
      axios.post('http://localhost:3000/history', {
        image: idImage,
        music: idMusic
      })
      .then(function (response) {
        console.log("berhasil masuk ke history--", response)
      })
      .catch(function (error) {
        console.log("error- ", error)
      })
    })
    .catch(function (error) {
      console.log("error- ", error)
    })

    // console.log(itunesRec);
    // songs.textContent = JSON.stringify(response.data.results, null, 2);
  })
  .catch(function (error) {
    console.log(error);
  })

}
