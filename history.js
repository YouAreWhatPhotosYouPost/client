let historyContainer = document.querySelector('#historyContainer');

axios.get('http://localhost:3000/music')
     .then(function(musicData) {
        console.log(musicData.data.musics);
        showMusic(musicData.data.musics)
     })
     .catch(function(err) {
       console.log(err);
     })

// axios.get('')
//masih find all
function showMusic(musicData){
  //Nanti looping sesuai jumlah history
  for (let i = 0; i < musicData.length; i++) {
    let historyContent = document.createElement('div')
    historyContent.setAttribute('class', 'historyContent')
    historyContainer.appendChild(historyContent)

    let historyImages = document.createElement('div')
    historyImages.setAttribute('class', 'historyImages')
    let imagesSrc = document.createElement('img')
    //contoh link img nanti dari db
    let linkImages = 'http://www.uni-regensburg.de/Fakultaeten/phil_Fak_II/Psychologie/Psy_II/beautycheck/english/durchschnittsgesichter/m(01-32)_gr.jpg'
    imagesSrc.setAttribute('src', linkImages)
    historyImages.appendChild(imagesSrc)
    //historyImages.innerHTML = 'historyImages' //isi div
    historyContent.appendChild(historyImages)

    //history Images Emotion Table
    let historyImagesTable = document.createElement('div')
    historyImagesTable.setAttribute('class', 'historyImagesTable')
    historyImagesTable.innerHTML = 'historyImagesTable' //isi div
    let pickImagesTable = $(".historyImagesTable")
    getEmotion({}, pickImagesTable)
    historyContent.appendChild(historyImagesTable)


    let historyQuotes = document.createElement('div')
    historyQuotes.setAttribute('class', 'historyQuotes')
    historyQuotes.innerHTML = 'historyQuotes' //isi div
    historyContent.appendChild(historyQuotes)

    let historyMusic = document.createElement('div')
    historyMusic.setAttribute('class', 'historyMusic')
    showItunesFromDb(musicData[i].musicRecommendation, historyMusic)
    //historyMusic.innerHTML = 'historyMusic'
    historyContent.appendChild(historyMusic)

    let buttonDelete = document.createElement('button')
    buttonDelete.innerHTML = 'Delete History'
    buttonDelete.setAttribute('class', 'historyDelete')
    buttonDelete.setAttribute('onclick', 'routes untuk delete')
    historyContent.appendChild(buttonDelete)
  }
}

function showItunesFromDb(songs, divSongs){
  //let divSongs = document.querySelector("#historyMusic")

  //songs dalam array of Object
  songs.forEach(objSongs =>{
    console.log('Songs',objSongs);
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
    artistA.setAttribute('href', objSongs.artistUrl)
    artistA.setAttribute('target', '_blank')
    artistView.appendChild(artistA)
    tableRow.appendChild(artistView)

    //track Url
    let viewTrack = document.createElement('TD')
    let trackA = document.createElement('a')
    trackA.innerHTML = 'View Track'
    trackA.setAttribute('href', objSongs.trackUrl)
    trackA.setAttribute('target', '_blank')
    viewTrack.appendChild(trackA)
    tableRow.appendChild(viewTrack)

    //preview Track
    let previewTrack = document.createElement('TD')
    let previewA = document.createElement('a')
    previewA.innerHTML = 'Preview Track'
    previewA.setAttribute('href', objSongs.previewTrack)
    previewA.setAttribute('target', '_blank')
    previewTrack.appendChild(previewA)
    tableRow.appendChild(previewTrack)

    divSongs.appendChild(table)
  })
}

function getEmotion(emotion, historyImagesTable){
  historyImagesTable.empty()
  historyImagesTable.append(`
      <table class="table">
          <thead >
          <tr>
              <th><b>Emotion</b></th>
              <th><b>Point<b/></th>
          </tr>
          </thead>
          <tbody>
              <tr>
                  <th>Anger</th>
                  <th>${emotion.anger}</th>
              </tr>
              <tr>
                  <th>Contempt</th>
                  <th>${emotion.contempt}</th>
              </tr>
              <tr>
                  <th>Disgust</th>
                  <th>${emotion.disgust}</th>
              </tr>
              <tr>
                  <th>Fear</th>
                  <th>${emotion.fear}</th>
              </tr>
              <tr>
                  <th>Happiness</th>
                  <th>${emotion.happiness}</th>
              </tr>
              <tr>
                  <th>Neutral</th>
                  <th>${emotion.neutral}</th>
              </tr>
              <tr>
                  <th>Sadness</th>
                  <th>${emotion.sadness}</th>
              </tr>
              <tr>
                  <th>Surprise</th>
                  <th>${emotion.surprise}</th>
              </tr>
          </tbody>
      </table>
  `)
}
