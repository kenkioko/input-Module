import { logo_text, poster_data } from './variables.js';

$(function() {
  $('#request-logo-btn').click(function () {
    $('#client-logo-section, #page-header-container').removeClass('d-none');
    $('#page-start-section').addClass('d-none').removeClass('d-flex');
  });
  
  $('#request-poster-btn').click(function () {
    $('#client-poster-section, #page-header-container').removeClass('d-none');
    $('#page-start-section').addClass('d-none').removeClass('d-flex');
    $('#page-header').text('Request For A Poster Design');
  });
  
  $('#admin-logout, #logo-back-btn, #poster-back-btn').click(function () {
    location.reload(true);
  });
  
  $('#logo-category-input').change(function () {
    if($(this).val()){
      logo_text.category_text = $("#logo-category-input option:selected").text();
    } else {
      logo_text.category_text = '';
    }
  });
  
  $('#poster-category-input').change(function () {
    if($(this).val()){
      poster_data.category_text = $("#poster-category-input option:selected").text();
    } else {
      poster_data.category_text = '';
    }
  });
  
});

