import { 
  logo_text,
  first_time,
  poster_data,  
} from './variables.js';

$(function() {
  /**
   * request a logo choice button is clicked
   */
  $('#request-logo-btn').click(function () {
    $('#client-logo-section, #page-header-container').removeClass('d-none');
    $('#page-start-section').addClass('d-none').removeClass('d-flex');
    $('#textModal').modal('show');
  });
  
  /**
   * logo modules toogle for the first time
   */
  $('#textModal').on('hidden.bs.modal', function (e) {
    if(first_time.logo_text) {
      $('#fontModal').modal('show');
      first_time.logo_text = false;
      
      $('#logo-text-ok').removeClass('d-none');
      $('#logo-next-font').addClass('d-none');
    }
  })
  
  $('#fontModal').on('hidden.bs.modal', function (e) {
    if(first_time.logo_font) {
      $('#logoModal').modal('show');
      first_time.logo_font = false;
      
      $('#logo-font-ok').removeClass('d-none');
      $('#logo-next-type').addClass('d-none');
    }
  })
  
  $('#logoModal').on('hidden.bs.modal', function (e) {
    if(first_time.logo_type) {
      first_time.logo_type = false;
      
      $('#logo-type-ok').removeClass('d-none');
      $('#logo-finish').addClass('d-none');
    }
  })

  /**
   * request a poster choice button is clicked
   */
  $('#request-poster-btn').click(function () {
    $('#client-poster-section, #page-header-container').removeClass('d-none');
    $('#page-start-section').addClass('d-none').removeClass('d-flex');
    $('#page-header').text('Request For A Poster Design');
    $('#posterModal').modal('show');
  });
  
  /**
   * admin logout or back buttons are clicked
   */
  $('#admin-logout, #logo-back-btn, #poster-back-btn').click(function () {
    location.reload(true);
  });
  
  /**
   * logo category is picked
   */
  $('#logo-category-input').change(function () {
    if($(this).val()){
      logo_text.category_text = $("#logo-category-input option:selected").text();
    } else {
      logo_text.category_text = '';
    }
  });
  
  /**
   * poster category is picked
   */
  $('#poster-category-input').change(function () {
    if($(this).val()){
      poster_data.category_text = $("#poster-category-input option:selected").text();
    } else {
      poster_data.category_text = '';
    }
  });
  
  /**
   * top page alert is closed
   */
  $('#page-alert').on('close.bs.alert', function (e) {
    e.preventDefault();    
    $(this).fadeOut( "slow", function() {
      $(this).addClass('d-none');
      $(this).removeAttr("style");
    });
  })
  
  /**
   * press enter on the admin login form
   */
  $('#cred-form').keypress(function (e) {
    var el_id = '#admin-login';
    if($('#cred-type').val().trim() != ''){
      el_id = '#add-user-confirm';
    }
    
    var keycode = (event.keyCode ? event.keyCode : event.which);
    if(keycode == '13'){
      $(el_id).trigger('click');
    }
  });
  
  $('#add-user-btn').click(function () {
    $('#cred-type').val('add');
    $('#username-input, #password-input').val('');
    $('#admin-login, #cred-modal-header').addClass('d-none');    
    $('#add-user-confirm, #confirm-password-group').removeClass('d-none');
    $('#cred-form').attr('autocomplete', 'off');
    $('#credentialsModal').modal('show');
  });
  
  $('#admin-login-btn').click(function () {
    $('#cred-type').val('');
  });

});

