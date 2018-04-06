function statusChangeCallback(response) {
  // for FB.getLoginStatus().
  if (response.status === 'connected') {
    localStorage.setItem('token', response.authResponse.accessToken)
    axios.post('http://localhost:3000/login', {}, {
        headers: {tokenFb: response.authResponse.accessToken}
    })
    .then(function (response) {
        // console.log(response)
    })
    .catch(function (error) {
        // console.log(error)
    })
    // Logged into your app and Facebook.
    document.querySelector('#fbLogout').style.display="block"
    document.querySelector('#processImage').style.display="block"
    document.querySelector('#fbLogin').style.display="none"
    document.querySelector('#btnProfile').style.display="block"
    document.querySelector('#btnHistory').style.display="block"
    $('#inputImage').attr('readonly', false)
    // testAPI()
  } else {
    localStorage.clear()
    // The person is not logged into your app or we are unable to tell.
    document.querySelector('#fbLogout').style.display="none"
    document.querySelector('#processImage').style.display="none"
    document.querySelector('#fbLogin').style.display="block"
    document.querySelector('#btnProfile').style.display="none"
    document.querySelector('#btnHistory').style.display="none"
    $('#inputImage').attr('readonly', true)
  }
}
function getScope() {
  FB.login(function(respone) {
    console.log(respone)
  }, {
    scope: 'user_photos',
    return_scopes: true
  })
}

function checkLoginState() {
  FB.getLoginStatus(function(response) {
    statusChangeCallback(response);
  });
}

window.fbAsyncInit = function() {
  FB.init({
    appId      : '2132191533682407',
    cookie     : true,
    xfbml      : true,
    version    : 'v2.8'
  });

  FB.getLoginStatus(function(response) {
    statusChangeCallback(response);
  });

};

// Load the SDK asynchronously
(function(d, s, id) {
  var js, fjs = d.getElementsByTagName(s)[0];
  if (d.getElementById(id)) return;
  js = d.createElement(s); js.id = id;
  js.src = "https://connect.facebook.net/en_US/sdk.js";
  fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));

// Here we run a very simple test of the Graph API after login is
// successful.  See statusChangeCallback() for when this call is made.
// function testAPI() {
//   FB.api('/me', {fields: ['email', 'first_name', 'name']}, function(response) {
//     console.log('Successful login for: ' + response.name);
//   });
// }

function fbLogout() {
  FB.logout(function (response) {
    window.location.reload();
  });
}