function statusChangeCallback(response) {
  // for FB.getLoginStatus().
  if (response.status === 'connected') {
    
    axios.post('http://localhost:3000/login', {}, {
        headers: {tokenFb: response.authResponse.accessToken}
    })
    .then(function (response) {
      localStorage.setItem('token', response.data.token)
    })
    .catch(function (error) {
      console.log(error)
        // console.log(error)
    })
    // Logged into your app and Facebook.
    document.querySelector('#fbLogout').style.display="block"
    document.querySelector('#processImage').style.display="block"
    document.querySelector('#fbLogin').style.display="none"
    $('#inputImage').attr('readonly', false)
    
  } else {
    localStorage.clear()
    // The person is not logged into your app or we are unable to tell.
    document.querySelector('#fbLogout').style.display="none"
    document.querySelector('#processImage').style.display="none"
    document.querySelector('#fbLogin').style.display="block"
    $('#inputImage').attr('readonly', true)
  }
}

function checkLoginState() {
  FB.getLoginStatus(function(response) {
    statusChangeCallback(response);
  });
}

window.fbAsyncInit = function() {
  FB.init({
    appId      : '642268909442216',
    cookie     : true,
    xfbml      : true,
    version    : 'v2.8'
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

function fbLogout() {
  FB.logout(function (response) {
    window.location.reload();
  });
}