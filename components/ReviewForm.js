app.component('review-form', {
    template:
    /* html */
    `<form class="review-form" @submit.prevent="onSubmit">
        <h3>Leave a Review</h3>
        <label for="name">Name:</label>
        <input id="name" name="name" v-model="name" />

        <label id="recommend-label">Would you recommend this product?</label>
        <div aria-labelledby="recommend-label" role="radiogroup" id="recomment">
            <input type="radio" name="recommend" id="recommend-yes" value="Yes" v-model="recommend"/><label for="recommend-yes">Yes</label>
            <input type="radio" name="recommend" id="recommend-no" value="No" v-model="recommend" /><label for="recommend-no">No</label>
        </div>

        <label for="review">Review:</label>
        <textarea id="review" name="review" v-model="review"></textarea>
        
        <label for="rating">Rating:</label>
        <select name="rating" id="rating" v-model.number="rating">
            <option>5</option>
            <option>4</option>
            <option>3</option>
            <option>2</option>
            <option>1</option>
        </select>

        <input class="button" type="submit" value="Submit" :disabled="!submitEnabled" :class="{ disabledButton: !submitEnabled  }" />
     </form>`,
     data() {
        return {
            name: '',
            review: '',
            recommend: '',
            rating: null
        }
    },
    computed: {
        submitEnabled() {
            return this.name !== '' && this.review !=='' && this.rating !== null;
        }
    },
    methods: {
        onSubmit() {
            let productReview = {
                name: this.name,
                review: this.review,
                rating: this.rating,
                recommend: this.recommend
            };
            this.$emit('review-submitted', productReview);

            this.name = '';
            this.review = '';
            this.rating = null;
        }
    }
});