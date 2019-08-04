import {
  host,
  fail_response,
  success_response,
} from './variables.js';

$(function() {
  /**
   * using auth0 to get user info
   * the cliend id for the auth0 app
   */
  var client_id = 'eLmPtXQDyQXgRqX3DqbnfgOKHPSVg4Gz';
  
  // Initialize the Auth0 application
  var webAuth = new auth0.WebAuth({
    domain:       'dev-k2n.eu.auth0.com',
    clientID:     client_id
  });

  function get_user_info() {
    // Parse the URL and extract the Access Token
    webAuth.parseHash({ hash: window.location.hash }, function(err, authResult) {
      if (err || !authResult) {
        location.hash = '';
        $('#auth-login').removeClass('d-none');
        $('#auth-logout, #request-logo-btn, #request-poster-btn').addClass('d-none');
      } else if (authResult) {
        webAuth.client.userInfo(authResult.accessToken, function(err, user) {
          $('#customer-email, #poster-email').val(user.email).removeClass('d-none')
          $('#auth-logout').text('Not "' + user.email + '" ?');
          $('#auth-logout, #request-logo-btn, #request-poster-btn').removeClass('d-none');
          $('#auth-login, #admin-login-btn').addClass('d-none');
        });
      }
    });
  }  
  
  $('#auth-login').click(function () {
    // Trigger login with google
    webAuth.authorize({
      connection: 'google-oauth2',
      responseType: 'token',
      redirect_uri: host
    }); 
  });
  
  $('#auth-logout').click(function () {
    webAuth.logout({
      returnTo: host,
      client_id: client_id
    });
  });    
  
  get_user_info();
  
  /**
   * login to admin dashboard
   */
  $('#admin-login').click(function () {
    var username = $('#username-input').val().trim();
    var password = $('#password-input').val().trim();
    var encodedData = window.btoa(username + ':' + password);
    
    $.ajax({
      url: host + "/api/admin.php",
      dataType: 'json',
      method: 'GET',
      beforeSend: function (xhr) {
        xhr.setRequestHeader ('Authorization', 'Basic ' + encodedData);
      },
    }).done(function(response, status) {
      success_response(response);
      
      $('#admin-section, #page-header-container').removeClass('d-none');
      $('#page-start-section').removeClass('d-flex').addClass('d-none');
      $('#client-logo-section').addClass('d-none');
    }).fail(function (response, status, error) {
      fail_response(response, status, error);
    });
  });
  
});

