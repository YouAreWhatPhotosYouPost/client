function statusChangeCallback(response) {
    console.log('statusChangeCallback');
    console.log('access token---', response.accessToken)
    console.log(response);
    if (response.status === 'connected') {
      // Logged into your app and Facebook.
      testAPI();
    } else {
      document.getElementById('status').innerHTML = 'Please log ' +
        'into this app.';
    }
  }

  function checkLoginState() {
    FB.getLoginStatus(function(response) {
      statusChangeCallback(response);
    });
  }

  window.fbAsyncInit = function() {
    FB.init({
      appId      : '2132191533682407',
      cookie     : true,  // enable cookies to allow the server to access 
                          // the session
      xfbml      : true,  // parse social plugins on this page
      version    : 'v2.8' // use graph api version 2.8
    });

    FB.getLoginStatus(function(response) {
      statusChangeCallback(response);
    });

  };

  (function(d, s, id) {
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) return;
    js = d.createElement(s); js.id = id;
    js.src = "https://connect.facebook.net/en_US/sdk.js";
    fjs.parentNode.insertBefore(js, fjs);
  }(document, 'script', 'facebook-jssdk'));

  function testAPI() {
    console.log('Welcome!  Fetching your information.... ');
    FB.api('/me', function(response) {
      console.log('Successful login for: ' + response.name);
      localStorage.setItem('name', response.name)
      getAlbums()
    });
  }

  function addAlbum(albumName) {
    $("#albums").append(`
          <div> <h3><b>${albumName}</b></h3> </div>
    `)
  }

  function addPhotoAlbum(urlPhoto) {
    $("#albums").append(`
      <tr>
        <th width="auto"><img id="imgAlbum" src="${urlPhoto}" height="200"></th>
        <th text-align="center">
            <button id="analyzeThis" onclick="analyzePhoto('${urlPhoto}');return false;">Analyze Photo</button>
        </th>
      </tr>
    `)
  }

  function analyzePhoto(urlPhoto) {
    console.log("masuk analyze photo--", urlPhoto)
    // $('#inputImage').val(urlPhoto);
    // $("#btnAnalyze").click();
    window.location.href = 'index.html';
    localStorage.setItem('urlPhoto', urlPhoto)
  }

  function getAlbums() {
    FB.api('/me/albums?fields=id,name', function(response) {
      console.log('response--', response)
      $('#albums').empty();
      for (var i=0; i<response.data.length; i++) {
        var album = response.data[i];
        FB.api('/'+album.id+'/photos?fields=images,album', function(photos){
          addAlbum(photos.data[0].album.name)
          for (var j=0; j<photos.data.length; j++){
            var photo = photos.data[j];
            console.log("photo--",photo.images[0].source)
            addPhotoAlbum(photo.images[0].source)
          }
          $("#albums").append(`<br/>`)
        });
      }
    });
  }
  