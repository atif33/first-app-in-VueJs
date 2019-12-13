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

<div>
  <h2> Reviews </h2>
    <p v-if="!reviews.length"> the are not reviews yet </p>
  <ul>
    <li v-for="review of reviews">
      <p> {{review.name}} </p>
      <p> {{review.review}} </p>
      <p> Rating: {{review.rating}} </p>
    </li>
  </ul>
</div>

<product-review @review-product="sendProduct"></product-review>
</div>


</div>
  `,
  data() {
    return {
      product: 'Socks',
      brand: 'nabil',
      image: './assets/vmSocks-green-onWhite.jpg',
      inStock: true,
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
      reviews: []
    }
  },
  methods: {
    addToCart: function (){
        this.$emit('add-to-cart', this.variants[1].variantId);
    },

    removCart: function () {
        this.$emit('remov-from-cart');
    },

    updatProduct: function (variantImage) {
      this.image = variantImage;
    },
    sendProduct(productReview) {
      console.log('herze');
      this.reviews.push(productReview);

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

Vue.component('product-review', {
  template: `
  <form class="review-form" @submit.prevent="onSubmit">
    <p v-if="errors.length">
      <b> please corrige your form </b>
        <ul>
          <li v-for="error in errors"> {{error}}</li>
        </ul>

    </p>
    <p>
      <label for="name"> Name: </label>
      <input id="name" v-model="name">
    </p>
    <p>
      <label for="review" > Reviqew: </label>
      <textarea id="review" v-model="review" ></textarea>
    </p>
    <p>
      <label for="rating">Rating: </label>
      <select id="rating" v-model="rating" >
      <option v-for="note in notes"> {{note}} </option>
  
      </select>

    </p>
    <p>
    <input type="submit" value="Valider" :disabled="!(review && rating)">
    </p>
</form>
  `,
  data() {
    return {
      name: null,
      review: null,
      rating: null,
      notes: [1, 2, 3, 4, 5],
      errors: []
    }
  },
  methods: {
    onSubmit() {
      if(this.name && this.review && this.rating) {
      let productPreview = {
          name: this.name,
          review: this.review,
          rating: this.rating
      }
      this.$emit('review-product', productPreview);
      this.name = null;
      this.review = null;
      this.rating = null;
    } else {
      if (!this.name) {this.errors.push('set name')}
      if (!this.rating) {this.errors.push('set rating')}
      if (!this.review) {this.errors.push('set review')}
    
    
    
  }
}}})


var app = new Vue({
    el: '#app',
    data: {
      premuim: true,
      cart: []
    },
    methods: {
      updatCart(id) {
         this.cart.push(id);
      },
      removeProduct() {
        this.cart -= 1;
        if(this.cart <= 0) { this.cart = 0 ;}
      }

    }
     
    })
  
  