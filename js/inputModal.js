$(function() {
  /**
   * Back-end Server Host URL
   */
  var host = 'http://127.0.0.1:8000';

  /**
   * logo text to be passed to the server
   */
  var logo_text = {
    category_text: '',
    category: '',    
    line_1:'',
    line_2:'',
    type: ''
  };

  /**
   * available fonts to be shown on the cards
   */
  var logo_fonts = [];

  /**
   * available logos to be shown on the cards
   */
  var logo_types = [];

  /**
   * the card top image as a vue component
   *
   * use one of the two lines
   */
  Vue.component('card-img', {
    template: '#card-img-template'  /* uncomment this line for images */
    //template: `<i class="fas fa-image fa-7x"></i>` /* uncomment this line for sample */
  });

  /**
   * the modal card as a vue component
   */
  Vue.component('modal-card', {
    props: ['item', 'type'],
    data: function () {
      return {
        selected: false
      }
    },
    methods: {
      select: function (item, type) {
        this.selected = true;
        if (type == 'font') {
          selected_items.fonts.push(item);
        } else if (type == 'logo') {
          selected_items.logos.push(item);
        }
      },
      remove: function (item, type) {
        this.selected = false;
        if (type == 'font') {
          var index = selected_items.fonts.findIndex(function (element) {
            return element.id === item.id;
          });
          
          selected_items.fonts.splice(index, 1);
        } else if (type == 'logo') {
          var index = selected_items.logos.findIndex(function (element) {
            return element.id === item.id;
          });
          
          selected_items.logos.splice(index, 1);
        }
      },
    },
    template: '#modal-card-template',
  });

  /**
   * vue instances for different modals
   */
  var logo_text_app = new Vue({ 
    el: '#text-data',
    data: logo_text
  });

  var font_items_app = new Vue({ 
    el: '#font-items',
    data: {
      fonts: logo_fonts,
      type: 'font'
    }
  });

  var logo_items_app = new Vue({ 
    el: '#logo-items',
    data: {
      logos: logo_types,
      type: 'logo'
    }
  });

  /**
   * selected fonts and logo types
   */
  var selected_items = {
    fonts: [],
    logos: []
  };
  
  /**
   * vue instances to display to data captured
   */
  var display_logo_text_app = new Vue({ 
    el: '#display-text',
    data: logo_text
  });
  
  var display_logo_font_app = new Vue({ 
    el: '#display-fonts',
    data: {
      fonts: selected_items.fonts
    }
  });
  
  var display_logo_type_app = new Vue({ 
    el: '#display-logos',
    data: {
      logos: selected_items.logos
    }
  });
  
  /**
   * display item component 
   */
  Vue.component('display-item', {
    props: ['item'],
    template: '#display-item-template'
  })
  
  $('#category-input').change(function () {
    logo_text.category_text = $( "#category-input option:selected" ).text();
  });
  
  /**
   * get the form data to be passed to the server
   */
  function get_data() {
    var selected = {
      fonts: [],
      logos: []
    };
    
    $.each(selected_items.fonts, function (index, value) {
      selected.fonts.push(value.id)
    });
    
    $.each(selected_items.logos, function (index, value) {
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
    }).fail(function (response, status) {
      fail_response(response, status);
      display_errors(response);
    });
  }  
  
  function get_categories() {
    $.ajax({
      url: host + "/api/categories.php",
      dataType: 'json',
      method: 'GET',
    }).done(function(response, status) {
      $.each( response, function( index, value ) {
        set_categories( index, value );
      });
    }).fail(function (response, status) {
      fail_response(response, status);
    });
  }
  
  function set_categories(index, category) {
    var select = document.getElementById('category-input');
    var opt = document.createElement('option');
    opt.value = category.id;
    opt.textContent = category.category;            
    select.appendChild(opt);
  }
  
  function get_items() {
    $.ajax({
      url: host + "/api/items.php",
      dataType: 'json',
      method: 'GET',
    }).done(function(response, status) {
      $.each( response, function( index, value ) {
        if (value.type == 'logo') {
          set_logos( index, value );
        } else if (value.type == 'font') {
          set_fonts( index, value );
        }
      });
    }).fail(function (response, status) {
      fail_response(response, status);
    });
  }
  
  function set_logos(index, logo) {
    logo_types.push(logo);
  }
  
  function set_fonts(index, font) {
    logo_fonts.push(font);
  }    
  
  function get_logo_data() {
    var username = $('#username-input').val().trim();
    var password = $('#password-input').val().trim();
    var encodedData = window.btoa(username + ':' + password);
    
    $('#logo-data-table').DataTable({
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
        error: function (response, status) {
          fail_response(response, status);
        },
        dataSrc: function (data) {
          success_response()
          
          $('#page-header').text('Logo Data');
          $('#admin-section').removeClass('d-none');
          $('#client-section').addClass('d-none');
          $.each( data, function( index, value ) {
            display_logo_data(index, value) 
          });
          
          return data;
        },
      }
    });
  }
  
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
  
  function fail_response(response, status) {
    $('#page-alert').addClass('alert-danger')
                    .removeClass('alert-success d-none');
    
    $('#server-status').text(
      '[status=' + status + ','
      + ' code=' + response.status + ']'
    );
    
    if(response.responseJSON){
      $('#server-message').text(response.responseJSON.message);
    } else {
      $('#server-message').text('Server Error!');
    }
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
    $('#display-category-error').addClass('d-none');
    $('#display-line-error').addClass('d-none');
    $('#display-font-error').addClass('d-none');
    $('#display-logo-error').addClass('d-none');
    $('#display-email-error').addClass('d-none');
  }
  
  /**
   * function triggers
   */
  get_items();
  get_categories();
  
  $('#submit-data').click(function () {
    submit_data();
  });
  
  $('#get-data, #reload-data').click(function () {
    get_logo_data();
  });
  
  $('#admin-logout').click(function () {
    location.reload(true);
  });
  
  var client_id = 'eLmPtXQDyQXgRqX3DqbnfgOKHPSVg4Gz';
  
  // Initialize the Auth0 application
  var webAuth = new auth0.WebAuth({
    domain:       'dev-k2n.eu.auth0.com',
    clientID:     client_id
  });

  function get_user_info() {
    // Parse the URL and extract the Access Token
    webAuth.parseHash({ hash: window.location.hash }, function(err, authResult) {
      if (err || !authResult) {
        location.hash = '';
        $('#auth-login').removeClass('d-none');
        $('#auth-logout').addClass('d-none');
      } else if (authResult) {
        webAuth.client.userInfo(authResult.accessToken, function(err, user) {
          $('#customer-email').val(user.email)
                             .removeClass('d-none')
          
          $('#auth-logout').removeClass('d-none');
          $('#auth-login').addClass('d-none');
        });
      }
    });
  }  
  
  $('#auth-login').click(function () {
    // Trigger login with google
    webAuth.authorize({
      connection: 'google-oauth2',
      responseType: 'token',
      redirect_uri: host
    }); 
  });
  
  $('#auth-logout').click(function () {
    webAuth.logout({
      returnTo: host,
      client_id: client_id
    });
  });
  
  get_user_info();
});

