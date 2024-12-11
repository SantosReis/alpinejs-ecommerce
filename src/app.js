document.addEventListener('alpine:init', () => {
  Alpine.data('index', () => ({
    productCounter: 10,
    addToCart(item) {
      this.productCounter++
    },
  }))
})
