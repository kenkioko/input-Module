/*
 * logo text to be passed to the server
 */
var logo_text = {
  category: '',
  line_1:'',
  line_2:'',
  type: ''
};

/*
 * available fonts to be shown on the cards and can be chosen
 */
var logo_fonts = [
  {
    id: 1,
    img_src: '...',
    img_alt: '...',
    title: 'Font 1',
    text: 'This card has supporting text.'
  },
  {
    id: 2,
    img_src: '...',
    img_alt: '...',
    title: 'Font 2',
    text: 'This card has supporting text.'
  },
  {
    id: 3,
    img_src: '...',
    img_alt: '...',
    title: 'Font 3',
    text: 'This card has supporting text.'
  },
  {
    id: 4,
    img_src: '...',
    img_alt: '...',
    title: 'Font 3',
    text: 'This card has supporting text.'
  },
];


/*
 * available logos to be shown on the cards and can be chosen
 */
var logo_types = [
  {
    id: 1,
    img_src: '...',
    img_alt: '...',
    title: 'Logo 1',
    text: 'This card has supporting text .'
  },
  {
    id: 2,
    img_src: '...',
    img_alt: '...',
    title: 'Logo 1',
    text: 'This card has supporting text .'
  },
  {
    id: 3,
    img_src: '...',
    img_alt: '...',
    title: 'Logo 2',
    text: 'This card has supporting text.'
  },
  {
    id: 4,
    img_src: '...',
    img_alt: '...',
    title: 'Logo 3',
    text: 'This card has supporting text.'
  },
];

/*
 * the card top image as a vue component
 */
Vue.component('card-img', {
  //template: ` <img src="" class="card-img-top <i class="fas fa-image"></i>" alt="">`
  template: `<i class="fas fa-font fa-7x text-center"></i>`
});

/*
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
        selected.fonts.push(item.id);
      } else if (type == 'logo') {
        selected.logos.push(item.id);
      }
      
      console.log(selected);
    },
    remove: function (item, type) {
      this.selected = false;
      if (type == 'font') {
        var index = selected.fonts.findIndex(function (element) {
          return element === item.id;
        });
        
        selected.fonts.splice(index, 1);
      } else if (type == 'logo') {
        var index = selected.logos.findIndex(function (element) {
          return element === item.id;
        });
        
        selected.logos.splice(index, 1);
      }      
      
      console.log(selected);
    },
  },
  template: '#modal-card-template',
})

/*
 * vue instances for different modals
 */
var logo_text_app = new Vue({ 
  el: '#text-data',
  data: logo_text
})

var font_items_app = new Vue({ 
  el: '#font-items',
  data: {
    fonts: logo_fonts,
    type: 'font'
  }
})

var logo_items_app = new Vue({ 
  el: '#logo-items',
  data: {
    logos: logo_types,
    type: 'logo'
  }
})

/*
 * Selected fonts and logo types
 */
var selected = {
  fonts: [],
  logos: []
};

$(function() {
  /*
   * get the form data to be passed to the server
   */
  function get_data() {
    return {
      logo_text: JSON.stringify(logo_text),
      font_type: JSON.stringify(selected.fonts),
      logo_type: JSON.stringify(selected.logos),
    }
  };
  
  /*
   * submit the form data to the server
   */
  function submit_data() {
    $.ajax({
      url: "http://127.0.0.1:8000/api/logos.php",
      data: get_data(),
      dataType: 'json',
      method: 'POST',
    }).always(function(response, status) {
      console.log('response: ', response);
      console.log('status: ', status);
    });
  };
  
  $('#submit').click(function () {
    submit_data();
  });
});

