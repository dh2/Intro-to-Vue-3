app.component('product-display', {
    props:{
        premium: {
            type: Boolean,
            required: true
        }
    },
    template:
    /* html */
    `<div class="product-display">
        <div class="product-container">
        <div class="product-image">
            <img v-bind:src="image">
        </div>
        <div class="product-info">
            <h1>{{ title }}</h1>
            <p v-if="inStock">In Stock</p>
            <p v-else>Out of Stock</p>
            <p>Shipping: {{shipping}}</p>
            <product-details :details="details" />

            <div 
            v-for="(variant, index) in variants" 
            :key="variant.id" 
            @mouseover="updateVariant(index)" 
            class="color-circle" 
            :style="{ backgroundColor: variant.color }">
            </div>
            

            <button class="button" :class="{ disabledButton: !inStock }" :disabled="!inStock" v-on:click="addToCart">Add to Cart</button>
        </div>
        </div>
    </div>
    `,
    data() {
        return {
            product: 'Socks',
            brand: 'Vue Mastery',
            selectedVariant: 0,
            details: ['50% cotton', '30% wool', '20% polyester'],
            variants: [
              { id: 2234, color: 'green', quantity: 50, onSale: false },
              { id: 2235, color: 'blue', quantity: 0, onSale: false },
              { id: 2235, color: 'purple', quantity: 10, onSale: false },
            ]
        }
    },
    methods: {
        addToCart() {
            this.cart += 1
        },
        updateVariant(variantIndex) {
            this.selectedVariant = variantIndex;
        }
    },
    computed: {
        title() {
            return `${this.variants[this.selectedVariant].onSale ? 'On Sale: ': ''}${this.brand} ${this.product}`;
        },
        inStock() {
            return this.variants[this.selectedVariant].quantity > 0;
        },
        image() {
            return `./assets/images/socks_${this.variants[this.selectedVariant].color}.jpg`;
        },
        shipping() {
            return this.premium ? 'Free' : '$2.99';
        }
    },
});