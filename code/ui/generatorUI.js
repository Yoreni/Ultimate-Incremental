Vue.component('generator', {
  props: {
	   generator: generators[page],
	   page: page
  },
  data: function() 
  {
    return {

    }
  },
  template:
  `<div>
      <h4>Generator {{ page }}</h4>
      <span class="generator-amount">You own {{ generator.amount }} .</span>
      <span class="generator-cost">Cost: {{ generator.price }}</span>
      <button onclick="buyGen(page)">Buy</button>
</div>`
})
