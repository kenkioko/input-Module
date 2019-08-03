import { 
  host,
  scroll_top,
  poster_data,
  fail_response,
  success_response,
  set_category_options
} from './variables.js';

$(function() {
  /*
   * status if poster categories 
   * have been fetched from the server
   */
  var categories_fetched = false;
  
  /**
   * categories from the server
   */
  function get_categories() {
    $.ajax({
      url: host + "/api/poster_categories.php",
      dataType: 'json',
      method: 'GET',
    }).done(function(response, status) {
      $.each( response, function( index, value ) {
        set_category_options( index, value, 'poster-category-input' );
      });
      
      categories_fetched = true;
    }).fail(function (response, status, error) {
      fail_response(response, status, error);
    });
  }
  
  /*
   * fetch poster categories
   */
  $('#request-poster-btn').click(function () {
    if(!categories_fetched){
      get_categories();
    }
  });
  
  /**
   * submit the form data to the server
   */
  function submit_data() {
    hide_errors();
    poster_data.email = $('#poster-email').val();
    
    $.ajax({
      url: host + "/api/posters.php",
      data: poster_data,
      dataType: 'json',
      method: 'POST',
    }).done(function(response) {
      success_response(response);
      $('#submit-poster-data').addClass('d-none');
      $('#poster-back-btn').removeClass('ml-1').addClass('ml-auto');
    }).fail(function (response, status, error) {      
      fail_response(response, status, error);
      display_errors(response);
    }).always(function () {
      scroll_top();
    });
  }
  
  function display_errors(response) {
    if(response.responseJSON.errors){
      $.each( response.responseJSON.errors, function( key, value ) {
        if(value.category){
          $('#poster-category-error')
            .text(value.category)
            .removeClass('d-none');
        }
        
        if(value.email){
          $('#poster-email-error')
            .text(value.email)
            .removeClass('d-none');
        }
      });
    }
  }
  
  function hide_errors() {
    $('#poster-category-error, #poster-email-error').addClass('d-none');
  }
  
  /**
   * poster data from the server
   */
  function get_poster_data() {
    var username = $('#username-input').val().trim();
    var password = $('#password-input').val().trim();
    var encodedData = window.btoa(username + ':' + password);
    
    /*$('#logo-data-table').DataTable({
      destroy: true,
      columns:[
        { data: 'index', title: '#'},
        { data: 'email', title: 'Email'},
        { data: 'category', title: 'Business Category'},
        { data: 'line_1', title: 'Business Name'},
        { data: 'line_2', title: 'Logo Line 2'},
        { data: 'type', title: 'Type Of Logo Image'},
        { data: 'logo_font', title: 'Logo Fonts'},
        { data: 'logo_type', title: 'Logo Type'},
      ],
      ajax: {
        url: host + "/api/logos.php",
        type: "GET",
        beforeSend: function (xhr) {
          xhr.setRequestHeader ('Authorization', 'Basic ' + encodedData);
        },
        error: function (response, status, error) {
          fail_response(response, status, error);
        },
        dataSrc: function (data) {
          success_response()
          
          $('#page-header').text('Logo Data');
          $('#admin-section, #page-header-container').removeClass('d-none');
          $('#client-logo-section').addClass('d-none');
          $('#page-start-section').removeClass('d-flex')
                                  .addClass('d-none');
          $.each( data, function( index, value ) {
            display_logo_data(index, value) 
          });
          
          return data;
        },
      }
    });*/
  }
  
  $('#submit-poster-data').click(function () {
    submit_data();
  });
});

/* js

function readURL(input) {
  if (input.files && input.files[0]) {
    var reader = new FileReader();
    
    reader.onload = function(e) {
      $('#blah').attr('src', e.target.result);
    }
    
    reader.readAsDataURL(input.files[0]);
  }
}

$("#imgInp").change(function() {
  readURL(this);
});

*/

/* html

<input type='file' id="imgInp" />
<img scr="">
*/


