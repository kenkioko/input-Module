import { 
  host,
  logo_text,
  logo_fonts,
  logo_types,
  scroll_top,  
  fail_response,
  success_response,
  set_request_data,
  selected_logo_items,
  set_category_options
} from './variables.js';

$(function() {
  /*
   * status if logo items and logo categories 
   * have been fetched from the server
   */
  var items_fetched = false;
  var categories_fetched = false;
  
  /*
   * logo data table
   */
  var logo_table;
  
  /**
   * get the form data to be passed to the server
   */
  function get_data() {
    var selected = {
      fonts: [],
      logos: []
    };
    
    $.each(selected_logo_items.fonts, function (index, value) {
      selected.fonts.push(value.id)
    });
    
    $.each(selected_logo_items.logos, function (index, value) {
      selected.logos.push(value.id)
    });
    
    return {
      logo_text: JSON.stringify(logo_text),
      font_type: JSON.stringify(selected.fonts),
      logo_type: JSON.stringify(selected.logos),
      customer_email: $('#customer-email').val()
    }
  }
  
  /**
   * submit the form data to the server
   */
  function submit_data() {
    hide_errors();
    
    $.ajax({
      url: host + "/api/logos.php",
      data: get_data(),
      dataType: 'json',
      method: 'POST',
    }).done(function(response, status) {
      success_response(response);
      $('#submit-logo-data').addClass('d-none');
      $('#logo-back-btn').removeClass('ml-1').addClass('ml-auto');
    }).fail(function (response, status, error) {      
      fail_response(response, status, error);
      display_errors(response);
    }).always(function (response, status) {
      scroll_top();
    });
  }  
  
  /**
   * categories from the server
   */
  function get_categories() {
    $.ajax({
      url: host + "/api/logo_categories.php",
      dataType: 'json',
      method: 'GET',
    }).done(function(response, status) {
      $.each( response, function( index, value ) {
        set_category_options( index, value , 'logo-category-input');
      });
      
      categories_fetched = true;
    }).fail(function (response, status, error) {
      fail_response(response, status, error);
    });
  }
  
  /**
   * modal items from the server
   */
  function get_items() {
    $.ajax({
      url: host + "/api/items.php",
      dataType: 'json',
      method: 'GET',
    }).done(function(response, status) {
      $.each( response, function( index, value ) {
        if (value.type == 'logo') {
          set_logo( index, value );
        } else if (value.type == 'font') {
          set_font( index, value );
        }
      });

      items_fetched = true;
    }).fail(function (response, status, error) {
      fail_response(response, status, error);
    });
  }
  
  function set_logo(index, logo) {
    logo_types.push(logo);
  }
  
  function set_font(index, font) {
    logo_fonts.push(font);
  }    
  
  /**
   * logo data from the server
   */
  function get_logo_data() {
    var username = $('#username-input').val().trim();
    var password = $('#password-input').val().trim();
    var encodedData = window.btoa(username + ':' + password);
    
    logo_table = $('#logo-data-table').DataTable({
      destroy: true,
      columns:[
        { data: 'index', title: '#'},
        { data: 'email', title: 'Client Email'},
        { data: 'category', title: 'Business Category'},
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

          $.each( data, function( index, value ) {
            display_logo_data(index, value) 
          });

          return data;
        },
      }
    });
  }
  
  /**
   * select table row
   */
  $('#logo-data-table tbody').on( 'click', 'tr', function () {
    logo_table.$('tr.selected').removeClass('selected');
    $(this).addClass('selected');
    
    var logo_data = logo_table.row('.selected').data();
    set_request_data(logo_data, 'logo');
  });
  
  function display_logo_data(index, row) {
    // category
    row.category = row.category.category;
    // font and logo types
    var font = '', logo = '';
    $.each( row.logo_items, function( indx, value ) {      
      if(value.type == 'font'){
        if(font.trim() !== '') {font += ', '}
        
        font += value.name;
      } else if(value.type == 'logo'){
        if(logo.trim() !== '') {logo += ', '}
        
        logo += value.name;
      }
    });
    
    row.index = index + 1;
    row.logo_font = font;
    row.logo_type = logo;
    
    return row;
  }
  
  /*
   * display form data errors
   */
  function display_errors(response) {
    if(response.responseJSON.errors){
      $.each( response.responseJSON.errors, function( key, value ) {
        if(key == 'logo_text'){
          logo_text_error(value);
        }
        
        if(key == 'font_type'){
          $('#display-font-error').text(value)
                                  .removeClass('d-none');
        }
        
        if(key == 'logo_type'){
          $('#display-logo-error').text(value)
                                  .removeClass('d-none');
        }
        
        if(value.customer_email){
          $('#display-email-error').text(value.customer_email)
                                  .removeClass('d-none');
        }
      });
    }
  }
  
  function logo_text_error(logo_text) {
    $.each( logo_text, function( index, value ) {
      if(value.category){
        $('#display-category-error').text(value.category)
                                    .removeClass('d-none');
      }
      
      if(value.line_1){
        $('#display-line-error').text(value.line_1)
                                .removeClass('d-none');
      }
    });
  }
  
  function hide_errors() {
    $(`
      #display-category-error,
      #display-line-error,
      #display-font-error,
      #display-logo-error,
      #display-email-error
    `).addClass('d-none');
  }
  
  /**
   * function triggers
   */
  $('#request-logo-btn').click(function () {
    if(!items_fetched){
      get_items();
    }
    
    if(!categories_fetched){
      get_categories();
    }
  });
  
  $('#submit-logo-data').click(function () {
    submit_data();
  });
  
  $('#get-logo-data').click(function () {
    get_logo_data();
    
    $('#page-header').text('Logo Data');
    $('#logo-data').removeClass('d-none');
    $('#poster-data, #admin-dash').addClass('d-none');    
  });
  
});

