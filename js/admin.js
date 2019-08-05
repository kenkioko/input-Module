import {
  host,
  scroll_top,
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
    var username = $('#username-input').val().trim();
    var password = $('#password-input').val().trim();
    var encodedData = window.btoa(username + ':' + password);
    
    user_table = $('#users-table').dataTable({
      destroy: true,
      columns:[
        { data: 'index', title: '#', width: "10%" },
        { data: 'username', title: 'Username'},
        { title: 'Delete Users', width: "20%", defaultContent: delete_button },
      ],
      ajax: {
        url: host + "/api/users.php",
        type: "GET",
        beforeSend: function (xhr) {
          xhr.setRequestHeader ('Authorization', 'Basic ' + encodedData);
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
  
  function get_data() {
    return {
      username: $('#new-user-input').val(),
      password: $('#new-pass-input').val()
    }
  }
  
  $('#add-user-btn').click(function () {
    $('#add-user-errors').addClass('d-none');

    var username = $('#username-input').val().trim();
    var password = $('#password-input').val().trim();
    var encodedData = window.btoa(username + ':' + password);
    $('#download-pimages-progress').removeClass('d-none');
  
    $.ajax({
      url: host + "/api/users.php",
      data: get_data(),
      dataType: 'json',
      method: 'POST',
      beforeSend: function (xhr) {
        xhr.setRequestHeader ('Authorization', 'Basic ' + encodedData);
      },
    }).done(function(response, status) {
      success_response(response);
      get_user_data();
      
      $('#new-user-input').val('');
      $('#new-pass-input').val('');
    }).fail(function (response, status, error) {      
      fail_response(response, status, error);
      display_errors(response);
    }).always(function (response, status) {
      scroll_top();
    });
  });
  
  function display_errors(response) {
    $('#add-user-errors').removeClass('d-none');
    var error_string = '';
    $.each(response.responseJSON.errors, function (key, value) {
      error_string += '[' + value + '] '
    });

    $('#add-user-errors').text(error_string);
  }
  
  $('#users-table tbody').on('click', 'button', function () {
    var data = user_table.row($(this).parents('tr')).data();
    console.log(user_table.data());
  });
  
  $('#admin-users').click(function () {
    get_user_data();
    
    $('#page-header').text('User Management');
    $('#user-manage').removeClass('d-none');
    $('#add-user-errors').addClass('d-none');
    $('#logo-data, #admin-dash, #poster-data').addClass('d-none');
  });
  
});
