import { 
  host,
  scroll_top,
  poster_data,
  poster_images,
  authenticated,
  fail_response,
  success_response,
  set_request_data,
  set_category_options
} from './variables.js';

$(function() {
  /*
   * status if poster categories 
   * have been fetched from the server
   */
  var categories_fetched = false;
  
  /*
   * poster data table
   */
  var poster_table;
  
  /**
   * categories from the server
   */
  function get_categories() {
    $.ajax({
      url: host.url + "/api/poster_categories.php",
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
    
    request.open("POST", host.url + "/api/posters.php");
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
    poster_table = $('#poster-data-table').DataTable({
      destroy: true,
      columns:[
        { data: 'index', title: '#'},
        { data: 'email', title: 'Client Email'},
        { data: 'category', title: 'Poster Category'},
      ],
      ajax: {
        url: host.url + "/api/posters.php",
        type: "GET",
        beforeSend: function (xhr) {
          xhr.setRequestHeader (
            'Authorization', 
            'Basic ' + authenticated.encodedData
          );
        },
        error: function (response, status, error) {
          fail_response(response, status, error);
        },
        dataSrc: function (data) {
          success_response()

          $.each( data, function( index, value ) {
            display_poster_data(index, value) 
          });

          return data;
        },
      }
    });
  }
  
  /**
   * select table row
   */
  $('#poster-data-table tbody').on( 'click', 'tr', function () {
    poster_table.$('tr.selected').removeClass('selected');
    $(this).addClass('selected');
    
    var poster_data = poster_table.row('.selected').data();
    set_request_data(poster_data, 'poster');
  });
  
  function display_poster_data(index, row) {
    // category
    row.category = row.category.category;
    row.index = index + 1;
    
    return row;
  }
  
  function readURL(files) {
    poster_images.splice(0, poster_images.length);

    $.each( files, function( index, file ) {
      var url = window.URL.createObjectURL(file);
      poster_images.push(url);
    });
  }
  
  $('#download-pimages').click(function () {
    $('#download-pimages-progress').removeClass('d-none');
    
    $.ajax({
      url: get_pimage_url(),
      method: 'GET',
      xhrFields: {
        responseType: 'blob'
      },
      beforeSend: function (xhr) {
        $('#download-pimages-progress').text('zipping images...');
        
        xhr.setRequestHeader (
          'Authorization', 
          'Basic ' + authenticated.encodedData
        );        
      },
    }).done(function(response, status) {
      $('#admin-section, #page-header-container').removeClass('d-none');
      $('#page-start-section').removeClass('d-flex').addClass('d-none');
      $('#client-logo-section').addClass('d-none');
      
      success_response();
      download_zip(response);
    }).fail(function (response, status, error) {
      fail_response(response, status, error);
      $('#download-pimages-progress').text('error zipping files.');
    }).always(function () {
      $('#requestModal').modal('hide');
    });
  });
  
  function download_zip(data) {
    $('#download-pimages-progress').text('downloading files...');
    
    var link = document.createElement('a');
    var url = window.URL.createObjectURL(data);
    link.href = url;
    link.download = 'images.zip';
    document.body.append(link);
    link.click();
    link.remove();
    window.URL.revokeObjectURL(url);
  }
  
  function get_pimage_url() {
    var url = new URL(host.url + "/api/posters.php");
    var query_string = url.search;

    var search_params = new URLSearchParams(query_string); 
    search_params.set('id', $('#poster-id').val());
    search_params.set('filter', 'images');

    // change the search property of the main url
    url.search = search_params.toString();

    return url.toString();
  }
  
  /**
   * function triggers
   */
  $('#submit-poster-data').click(function () {
    submit_data();
  });
  
  $('#poster-images-input').change(function () {
    $('#poster-images-label').text(
     this.files.length + ' file(s) selected.'
    );
    
    readURL(this.files);
  });
  
  $('#get-poster-data').click(function () {
    get_poster_data();
    
    $('#page-header').text('Poster Data');
    $('#poster-data').removeClass('d-none');
    $('#logo-data, #admin-dash, #user-manage').addClass('d-none');
  });
  
});

