import {
  host,
  scroll_top,
  authenticated,
  fail_response,
  success_response,
} from './variables.js';

$(function() {
  var user_table;
  
  var delete_button = 
    `<button type="button" class="btn btn-sm btn-danger w-100">
      Delete
    </button>`;

  /**
   * poster data from the server
   */
  function get_user_data() {
    user_table = $('#users-table').DataTable({
      destroy: true,
      columns:[
        { data: 'index', title: '#', width: "10%" },
        { data: 'username', title: 'Username'},
        { title: 'Delete Users', width: "20%", defaultContent: delete_button },
      ],
      ajax: {
        url: host.url + "/api/users.php",
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
            display_user_data(index, value) 
          });

          return data;
        },
      }
    });
  }
  
  function display_user_data(index, row) {
    row.index = index + 1;
    return row;
  }
  
  /**
   * send user request to the server
   */  
  function add_user_request(username, password) {
    $.ajax({
      url: host.url + "/api/users.php",
      dataType: 'json',
      method: 'POST',
      data: {
        username: username,
        password: password
      },
      beforeSend: function (xhr) {
        xhr.setRequestHeader (
          'Authorization', 
          'Basic ' + authenticated.encodedData
        );
      },
    }).done(function(response, status) {
      success_response(response);
      get_user_data();      
    }).fail(function (response, status, error) {      
      fail_response(response, status, error);
      display_errors(response);
    }).always(function (response, status) {
      scroll_top();
    });
  }
  
  $('#add-user-confirm').click(function () {
    $('#add-user-errors').addClass('d-none');
  
    var username = $('#username-input').val().trim();
    var password = $('#password-input').val();
    var password_conf = $('#confirm-password-input').val();
    
    if(password === password_conf){
      add_user_request(username, password);
    } else {
      display_errors('password missmatch!', true);
    }

  });
  
  function display_errors(response, form=false) {
    $('#add-user-errors').removeClass('d-none');
    if(form){
      $('#add-user-errors').text(response);
      return;
    }

    var error_string = '';
    $.each(response.responseJSON.errors, function (key, value) {
      error_string += '[' + value + '] '
    });

    $('#add-user-errors').text(error_string);
  }
  
  function get_delete_url() {
    var url = new URL(host.url + "/api/users.php");
    var query_string = url.search;

    var search_params = new URLSearchParams(query_string); 
    search_params.set('id', $('#delete-userid').val());

    // change the search property of the main url
    url.search = search_params.toString();

    return url.toString();
  }
  
  $('#users-table tbody').on('click', 'button', function () {
    var data = user_table.row($(this).parents('tr')).data();

    $('#delete-userid').val(data.id);
    $('#delete-username').text(data.username);
    $('#deleteModal').modal('show');
  });
  
  $('#confirm-delete').click(function () {
    $.ajax({
      url: get_delete_url(),
      dataType: 'json',
      method: 'DELETE',
      beforeSend: function (xhr) {
        xhr.setRequestHeader (
          'Authorization', 
          'Basic ' + authenticated.encodedData
        );
      },
    }).done(function(response, status) {
      success_response(response);
      get_user_data();      
    }).fail(function (response, status, error) {      
      fail_response(response, status, error);
      display_errors(response);
    }).always(function (response, status) {
      scroll_top();
    });
  });
  
  $('#admin-users').click(function () {
    get_user_data();
    
    $('#page-header').text('User Management');
    $('#user-manage').removeClass('d-none');
    $('#add-user-errors').addClass('d-none');
    $('#logo-data, #admin-dash, #poster-data').addClass('d-none');
  });
  
});
