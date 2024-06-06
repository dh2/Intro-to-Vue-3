const app = Vue.createApp({
    data() {
        return {
            cart:0,
            product: 'Socks',
            brand: 'Vue Mastery',
            selectedVariant: 0,
            details: ['50% cotton', '30% wool', '20% polyester'],
            variants: [
              { id: 2234, color: 'green', quantity: 50, onSale: true },
              { id: 2235, color: 'blue', quantity: 0, onSale: false },
              { id: 2235, color: 'purple', quantity: 10, onSale: true },
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
        }
    }
})
