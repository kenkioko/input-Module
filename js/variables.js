export { 
  host,
  auth,
  logo_text,
  logo_fonts,
  logo_types,
  first_time,
  scroll_top,
  poster_data,
  poster_images,
  authenticated,
  fail_response,
  success_response,
  set_request_data,
  selected_logo_items,
  set_category_options,
};

/**
 * Back-end Server Host URL
 * dynamic_url: host changes with window url
 * for production, dynamic_url = false
 */
let host = {
  url: 'http://127.0.0.1',
  dynamic_url: true
}

/**
 * Auth0 variables
 */
let auth = {
  domain: 'dev-k2n.eu.auth0.com',
  client_id: 'eLmPtXQDyQXgRqX3DqbnfgOKHPSVg4Gz'
}

/**
 * logo text to be passed to the server
 */
let logo_text = {
  category_text: null,
  category: '',
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
  category: '',
  header: null,
  title: null,
  main: null,
  footer: null,
  background: null,
  email: null
};

let poster_images = [];

/**
 * first time run after loading
 */
let first_time = {
  logo_text: true,
  logo_font: true,
  logo_type: true
};

/**
 * Authenticated user details
 */
let authenticated = {
  username: null,
  password: null,
  encodedData: null
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

function set_request_data(data, data_category) {
  $('#download-pimages-progress').addClass('d-none');
  $('#request-client-email').text(data.email);
  $('#request-category-text').text(data.category);
  
  if(data_category == 'poster'){
    $('#poster-request').removeClass('d-none');
    $('#logo-request').addClass('d-none');
    
    $('#poster-id').val(data.id);
    $('#requestModalLabel').text('Poster Request Description');
    $('#request-category').text('Poster Category:');
    $('#request-poster-header').text(data.header);
    $('#request-poster-title').text(data.title);
    $('#request-poster-main').text(data.main);
    $('#request-poster-footer').text(data.footer);
    $('#request-poster-background').text(data.background);
  } else if(data_category == 'logo'){
    $('#logo-request').removeClass('d-none');
    $('#poster-request').addClass('d-none');
    
    $('#requestModalLabel').text('Logo Request Details');
    $('#request-category').text('Business Category:');
    $('#request-logo-line1').text(data.line_1);
    $('#request-logo-line2').text(data.line_2);
    $('#request-logo-type').text(data.type);
    $('#request-logo-font').text(data.logo_font);
    $('#request-logo-style').text(data.logo_type);
  }
  
  // show modal
  $('#requestModal').modal('show');
}

