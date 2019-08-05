import { 
  logo_text,
  logo_fonts,
  logo_types,
  poster_data,
  poster_images,
  selected_logo_items
} from './variables.js';

$(function() {
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
   * display logo item component 
   */
  Vue.component('display-litem', {
    props: ['key', 'item'],
    template: '#display-litem-template'
  })
  
  /**
   * display poster image component 
   */
  Vue.component('display-pimage', {
    props: ['key', 'image'],
    template: '#display-pimage-template'
  })

  /**
   * the modal card as a vue component
   */
  Vue.component('modal-card', {
    props: ['key', 'item', 'type'],
    data: function () {
      return {
        selected: false
      }
    },
    methods: {
      select: function (item, type) {
        this.selected = true;
        if (type == 'font') {
          selected_logo_items.fonts.push(item);
        } else if (type == 'logo') {
          selected_logo_items.logos.push(item);
        }
      },
      remove: function (item, type) {
        this.selected = false;
        if (type == 'font') {
          var index = selected_logo_items.fonts.findIndex(function (element) {
            return element.id === item.id;
          });
          
          selected_logo_items.fonts.splice(index, 1);
        } else if (type == 'logo') {
          var index = selected_logo_items.logos.findIndex(function (element) {
            return element.id === item.id;
          });
          
          selected_logo_items.logos.splice(index, 1);
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
   * vue instances to display to data captured
   */
  var display_logo_text_app = new Vue({ 
    el: '#display-text',
    data: logo_text
  });
  
  var display_logo_font_app = new Vue({ 
    el: '#display-fonts',
    data: {
      fonts: selected_logo_items.fonts
    }
  });
  
  var display_logo_type_app = new Vue({ 
    el: '#display-logos',
    data: {
      logos: selected_logo_items.logos
    }
  });

  /**
   * vue instances to capture and display poster data
   */
  var capture_poster_app = new Vue({ 
    el: '#poster-data-capture',
    data: poster_data
  });
  
  var display_poster_app = new Vue({ 
    el: '#poster-data-display',
    data: poster_data
  });
  
  var display_pimages_app = new Vue({ 
    el: '#poster-image-display',
    data: {
      images: poster_images
    }
  });
});

