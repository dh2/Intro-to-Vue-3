app.component('product-display', {
    props:{
        premium: {
            type: Boolean,
            required: true
        },
        cart: {
            type: Array,
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
                
                <div>
                    <button class="button" :class="{ disabledButton: !inStock }" :disabled="!inStock" v-on:click="addToCart">Add to Cart</button>
                    <button class="button" :class="{ disabledButton: !inCart }" :disabled="!inCart" v-on:click="removeFromCart">Remove from Cart</button>
                </div>
            </div>
        </div>
        
        <review-entry v-if="reviews.length" :reviews="reviews" />
        <review-form  @review-submitted="handleReview" />
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
            ],
            reviews: []
        }
    },
    methods: {
        addToCart() {
            this.$emit('add-to-cart', { action: 'add', id: this.variants[this.selectedVariant].id });
        },
        removeFromCart() {
            const id = this.variants[this.selectedVariant].id;
            this.$emit('remove-from-cart', { action: 'remove', index: this.cart.findIndex(c => c === id) });
        },
        updateVariant(variantIndex) {
            this.selectedVariant = variantIndex;
        },
        handleReview(review) {
            this.reviews.push(review);
        }
    },
    computed: {
        title() {
            return `${this.variants[this.selectedVariant].onSale ? 'On Sale: ': ''}${this.brand} ${this.product}`;
        },
        inStock() {
            return this.variants[this.selectedVariant].quantity > 0;
        },
        inCart() {
            const id = this.variants[this.selectedVariant].id;
            const index = this.cart.findIndex(c => c === id);
            return index >= 0;
        },
        image() {
            return `./assets/images/socks_${this.variants[this.selectedVariant].color}.jpg`;
        },
        shipping() {
            return this.premium ? 'Free' : '$2.99';
        }
    },
});
