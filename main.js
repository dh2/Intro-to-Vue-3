const app = Vue.createApp({
    data() {
        return {
            cart: [],
            premium: true
        }
    },
    methods: {
        updateCart(props) {
            const { id, action, index } = props;
            if (action === 'add') {
                this.cart.push(id)
            } else if (action === 'remove') {
                this.cart.splice(index, 1);
            }
        },
    }
  })
  
