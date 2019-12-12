//Add a description to the data object with the value "A pair of warm, fuzzy socks". Then display the description using an expression in an p element, underneath the h1.




Vue.component('product', {
  props: {
  premuim: {

  }
  },
  template: `
  <div class="product">
  <div class="product-image">
      <img v-bind:src="image">
  </div>
<div class="product-info">
<h1>{{ title }}</h1>
<p v-if="inStock">in Stock:</p>
<p v-else>out Stock:</p>      
<p> shipping: {{ shipping }}</p>
<ul>
    <li v-for="detail in details"> {{detail}}</li>
</ul>
<div v-for= "variant in variants"
  class="color-box"
  :style= "{backgroundColor: variant.variantColor}"
  @mouseover="updatProduct(variant.variantImage)"
>
  

</div>
<button v-on:click="addToCart"
:disabled="!inStock"
:class="{disabledButton : !inStock }">Add cart</button>
<button v-on:click="removCart">Remov cart</button>    

</div>
<div class="cart">
      <p>Carte ({{cart}}) </p>
  </div>
</div>
  `,
  data() {
    return {
      product: 'Socks',
      brand: 'nabil',
      image: './assets/vmSocks-green-onWhite.jpg',
      inStock: false,
      details: ["coton", "cuir", "polyster"],
      variants: [{
          variantId: 1,
          variantColor: 'green',
          variantImage: './assets/vmSocks-green-onWhite.jpg'
      },
      {
          variantId: 2,
          variantColor: 'blue',
          variantImage: './assets/vmSocks-blue-onWhite.jpg'
      }
      ],
      cart: 0
    }
  },
  methods: {
    addToCart: function (){
        this.cart += 1;
    },

    removCart: function () {
        this.cart -= 1;
        if (this.cart <= 0) {
          this.cart = 0;
        }
    },

    updatProduct: function (variantImage) {
      console.log('totot' + variantImage);
      this.image = variantImage;
    }
},
computed: {
  title() {
    return this.brand + ' ' + this.product
  },

  shipping() {
   if(this.premuim) {
     return 'Gratos' 
   }
   return 3.99;
    
  }
}

  

})


var app = new Vue({
    el: '#app',
    data: {
      premuim: true
    },
     
    })
  
  