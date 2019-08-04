import { 
  host,
  scroll_top,
  poster_data,
  poster_images,
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
   * get the form data to be submited to the server
   */
  function get_form_data() {
    poster_data.email = $('#poster-email').val();
    var formData = new FormData();

    $.each(poster_data, function (key, value) {
      if(poster_data[key]){
        formData.append(key, value);
      }
    });
    
    var img_files = document.getElementById('poster-images-input');
    $.each( img_files.files, function( index, file ) {
      formData.append('images[]', file, file.name);
    });

    return formData;
  }
  
  /**
   * submit the form data to the server
   */
  function submit_data() {
    hide_errors();
    
    var request = new XMLHttpRequest();
    request.onload = function () {      
      try{
        var response = JSON.parse(request.response);

        if(request.status == 200 || request.status == 201){
          success_response(response);
          $('#submit-poster-data').addClass('d-none');
          $('#poster-back-btn').removeClass('ml-1').addClass('ml-auto');
        } else {
          fail_response({
            responseJSON: response,
            status: request.status,
          }, 'error', request.statusText);

          display_errors(response);
        }
      } catch {
        fail_response({
          status: request.status,
        }, 'error', request.statusText);
      }

      scroll_top();
    };
    
    
    request.open("POST", host + "/api/posters.php");
    request.send(get_form_data());
  }

  function display_errors(response) {
    if(response && response.errors){
      $.each( response.errors, function( key, value ) {
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
        
        console.log(key, value)
        if(key == 'images'){
          $('#poster-images-error')
            .text(value)
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
  
  function readURL(files) {
    poster_images.splice(0, poster_images.length);

    $.each( files, function( index, file ) {
      var url = window.URL.createObjectURL(file);
      poster_images.push(url);
    });
  }
  
  $('#submit-poster-data').click(function () {
    submit_data();
  });
  
  $('#poster-images-input').change(function () {
    $('#poster-images-label').text(
     this.files.length + ' file(s) selected.'
    );
    
    readURL(this.files);
  });
});

