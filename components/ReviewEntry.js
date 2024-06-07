app.component('review-entry', {
    props: {
        reviews: { 
            type: Array,
            required: true
        }
    },
    template:
    /* html */
    `<div class="review-container">
        <h3>Reviews</h3>
        <ul>
            <li v-for="(rev, index) in reviews" :key="index">{{rev.name}} (<span class="rating" v-for="n in rev.rating">&#9055;</span>): <br />
                Recommended: {{rev.recommend}} <br />
                Review: "{{rev.review}}"
            </li>
        </ul>
     </div>`,
});