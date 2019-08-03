export { 
  host,  
  logo_text,
  logo_fonts,
  logo_types,
  scroll_top,
  poster_data,
  fail_response,
  success_response,
  selected_logo_items,
  set_category_options
};

/**
 * Back-end Server Host URL
 */
let host = 'http://127.0.0.1:8000';

/**
 * logo text to be passed to the server
 */
let logo_text = {
  category_text: null,
  category: null,
  line_1: null,
  line_2: null,
  type: null
};

/**
 * available fonts to be shown on the cards
 */
let logo_fonts = [];

/**
 * available logos to be shown on the cards
 */
let logo_types = [];

/**
 * selected fonts and logo types
 */
let selected_logo_items = {
  fonts: [],
  logos: []
};

/**
 * poster data input
 */
let poster_data = {
  category_text: null,
  category: null,
  header: null,
  title: null,
  main: null,
  footer: null,
  background: null,
  email: null
};

function scroll_top() {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
}

function success_response(response=null) {
  $('#page-alert').addClass('alert-success')
                  .removeClass('alert-danger d-none');

  $('#server-status').text('')
  
  if(response && response.message){
    $('#server-message').text(response.message);
  } else {
    $('#server-message').text('Sever responded with success');
  }
}

function fail_response(response, status, error) {
  $('#page-alert').addClass('alert-danger')
                  .removeClass('alert-success d-none');
  
  $('#server-status').text(
    '[status=' + status + ','
    + ' error_code=' + response.status + ','
    + ' error_string=' + error + ']'
  );
  
  if(response.responseJSON){
    $('#server-message').text(response.responseJSON.message);
  } else {
    $('#server-message').text('Server Error!');
  }
}

function set_category_options(index, category, element) {
  var select = document.getElementById(element);
  var opt = document.createElement('option');
  opt.value = category.id;
  opt.textContent = category.category;            
  select.appendChild(opt);
}

