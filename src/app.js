document.addEventListener('alpine:init', () => {
  Alpine.store('header', {
    cartItems: 0,
    watchingItems: [],
    get watchlistItems() {
      return this.watchingItems.length
    },
  })

  Alpine.store('toast', {
    visible: false,
    delay: 5000,
    percent: 0,
    interval: 0,
    timeout: null,
    message: null,
    close() {
      this.visible = false
      clearInterval(this.interval)
    },
    show(message) {
      this.visible = true
      this.message = message

      if (this.interval) {
        clearInterval(this.interval)
        this.timeout = null
      }

      if (this.timeout) {
        clearTimeout(this.timeout)
        this.interval = null
      }

      this.timeout = setTimeout(() => {
        this.visible = false
        this.timeout = null
      }, this.delay)
      const startDate = Date.now()
      const futureDate = Date.now() + this.delay
      this.interval = setInterval(() => {
        const date = Date.now()
        this.percent = ((date - startDate) * 100) / (futureDate - startDate)
        if (this.percent >= 100) {
          clearInterval(this.interval)
          this.interval = null
        }
      }, 30)
    },
  })

  Alpine.data('productItem', () => ({
    quantity: 1,
    get watchlistItems() {
      return this.$store.watchlistItems
    },
    addToWatchlist(id) {
      // if (this.watchingItems.includes(id)) return
      if (this.$store.header.watchingItems.includes(id)) {
        this.$store.header.watchingItems.splice(
          this.$store.header.watchingItems.indexOf(id)
        )
        this.$store.toast.show('The item was remoted from your watchlist')
      } else {
        this.$store.header.watchingItems.push(id)
        this.$store.toast.show('The item was added into your watchlist')
      }
    },
    isInWatchlist(id) {
      return this.$store.header.watchingItems.includes(id)
    },
    addToCart(quantity = 1) {
      this.$store.header.cartItems += parseInt(quantity)
      this.$store.toast.show('The item was added into the cart')
    },
  }))
})
