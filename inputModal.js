var text = {
  category: '',
  line_1:'',
  line_2:'',
  type: ''
};

var fonts = [
  {
    id: 1,
    chosen: false,
    img_src: '...',
    img_alt: '...',
    title: 'Font 1',
    text: 'This card has supporting text below as a natural lead-in to additional content.'
  },
  {
    id: 2,
    chosen: false,
    img_src: '...',
    img_alt: '...',
    title: 'Font 2',
    text: 'This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.'
  },
  {
    id: 3,
    chosen: false,
    img_src: '...',
    img_alt: '...',
    title: 'Font 3',
    text: 'This is a wider card with supporting text below as a natural lead-in to additional content. This card has even longer content than the first to show that equal height action.'
  },
];

var logos = [
  {
    id: 1,
    chosen: false,
    img_src: '...',
    img_alt: '...',
    title: 'Logo 1',
    text: 'This card has supporting text below as a natural lead-in to additional content.'
  },
  {
    id: 2,
    chosen: false,
    img_src: '...',
    img_alt: '...',
    title: 'Logo 2',
    text: 'This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.'
  },
  {
    id: 3,
    chosen: false,
    img_src: '...',
    img_alt: '...',
    title: 'Logo 3',
    text: 'This is a wider card with supporting text below as a natural lead-in to additional content. This card has even longer content than the first to show that equal height action.'
  },
];

Vue.component('card-img', {
  template: ` <img src="" class="card-img-top" alt="">`
});

Vue.component('modal-card', {
  props: ['item'],
  data: function () {
    return {
      selected: false
    }
  },
  methods: {
    select: function (item) {
      this.selected = true;
      item.chosen = true;
    },
    remove: function (item) {
      this.selected = false;
      item.chosen = false;
    },
  },
  template: `
    <div class="card">
      <card-img 
        v-bind:src="item.img_src"
        v-bind:alt="item.img_alt"
      ></card-img>
      <div class="card-body">
        <h5 class="card-title">{{item.title}}</h5>
        <p class="card-text">{{item.text}}</p>        
      </div>
      <div class="card-footer">
        <button
          v-if="selected"
          v-on:click="remove(item)"
          type="button"
          class="btn btn-success"
        >
          {{ selected }}
        </button>
        <button
          v-else
          v-on:click="select(item)"
          type="button"
          class="btn btn-secondary"
        >
          {{ selected }}
        </button>
      </div>
    </div>
  `
})

var logo_text_app = new Vue({ 
  el: '#text-data',
  data: text
})

var font_items_app = new Vue({ 
  el: '#font-items',
  data: {
    fonts: fonts
  }
})

var logo_items_app = new Vue({ 
  el: '#logo-items',
  data: {
    logos: logos
  }
})
