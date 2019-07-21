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
      success_response(response, status)
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
    $.ajax({
      url: host + "/api/logos.php",
      dataType: 'json',
      method: 'GET',
    }).done(function(response, status) {
      success_response(response, status)
      
      $.each( response, function( index, value ) {
        display_logo_data(index, value);
      });
    }).fail(function (response, status) {
      fail_response(response, status);
    });
  }
  
  function display_logo_data(index, row) {
    $('#server-logo-data').removeClass('d-none');
    $('#logo-data-table').empty();
    
    var tr = document.createElement('tr');
    //id col
    var td_id = document.createElement('td');
    td_id.textContent = row.id;
    tr.appendChild(td_id);
    //category col
    var td_category = document.createElement('td');
    td_category.textContent = row.category.category;
    tr.appendChild(td_category);
    //line 1 col
    var td_line_1 = document.createElement('td');
    td_line_1.textContent = row.line_1;
    tr.appendChild(td_line_1);
    //line 2 col
    var td_line_2 = document.createElement('td');
    td_line_2.textContent = row.line_2;
    tr.appendChild(td_line_2);
    //type col
    var td_type = document.createElement('td');
    td_type.textContent = row.type;
    tr.appendChild(td_type);
    
    var font = '', logo = '';
    $.each( row.logo_items, function( index, value ) {
      if(value.type == 'font'){
        if(font.trim() !== '') {font += ', '}
        
        font += value.name;
      } else if(value.type == 'logo'){
        if(logo.trim() !== '') {logo += ', '}
        
        logo += value.name;
      }
    });
    
    //font col
    var td_font= document.createElement('td');
    td_font.textContent = font;
    tr.appendChild(td_font);
    //logo col
    var td_logo = document.createElement('td');
    td_logo.textContent = logo;
    tr.appendChild(td_logo);
    
    document.getElementById('logo-data-table').appendChild(tr);
  }
  
  function success_response(response, status) {
    $('#page-alert').addClass('alert-success')
                    .removeClass('alert-danger d-none');

    $('#server-status').text('')
    $('#server-message').text('Sever responded with success');
    $('#server-data').text(
      JSON.stringify(response, null, 2)
    );
  }
  
  function fail_response(response, status) {
    $('#page-alert').addClass('alert-danger')
                    .removeClass('alert-success d-none');
    
    $('#server-status').text(status + ' [code=' + response.status + ']')
    
    if(response.responseJSON){
      $('#server-message').text(response.responseJSON.message);
      $('#server-data').text(
        JSON.stringify(response.responseJSON, null, 2)
      );
    } else {
      $('#server-message').text('Server Error!');
      $('#server-data').text('');
    }
  }
  
  /*
   * display form data errors
   */
  function display_errors(response) {
    if(response.responseJSON.errors){
      $.each( response.responseJSON.errors, function( key, value ) {
        console.log(key, value);
        
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
  }
  
  /**
   * function triggers
   */
  get_items();
  get_categories();
  
  $('#submit-data').click(function () {
    submit_data();
  });
  
  $('#get-data').click(function () {
    get_logo_data();
  });
  
  // Initialize the Auth0 application
  var webAuth = new auth0.WebAuth({
    domain:       'dev-k2n.eu.auth0.com',
    clientID:     '2Nat3h0kOLImHdExf2PUb9yrgC2mau5c'
  });

  function get_user_info() {
    // Parse the URL and extract the Access Token
    webAuth.parseHash(window.location.hash, function(err, authResult) {
      if (err) {
        return console.log(err);
      }
      webAuth.client.userInfo(authResult.accessToken, function(err, user) {
          // This method will make a request to the /userinfo endpoint
          // and return the user object, which contains the user's information,
          // similar to the response below.
          console.log(err, user);
      });
    });
  }  
  
  $('#auth-login').click(function () {
    // Trigger login with google
    webAuth.authorize({
      connection: 'google-oauth2',
      responseType: 'token',
      redirect_uri: ''
    }); 
  });
});

