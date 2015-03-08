$(document).ready(function() {
  $('#login').click(function() {
    SphereSDK.login(function(response) {
      if(response.success) {
        $('.not_authenticated').hide();
        $('.authenticated').show();
      }
    });
  });

  $('#logout').click(function() {
    SphereSDK.logout(function(response) {
      if(response.success) {
        $('.not_authenticated').show();
        $('.authenticated').hide();
      }
    });
  });

  SphereSDK.isAuthenticated(function(response) {
    if(response.success) {
      $('.not_authenticated').hide();
      $('.authenticated').show();
    }
    else {
      $('.not_authenticated').show();
      $('.authenticated').hide();
    }
  });
});