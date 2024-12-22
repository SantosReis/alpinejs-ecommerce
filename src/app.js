document.addEventListener('alpine:init', () => {
  Alpine.data('index', () => ({
    cartItems: 0,
    watchingItems: [],
    get watchlistItems() {
      return this.watchingItems.length
    },
    addToCart() {
      this.cartItems++
      this.toast.show('The item was added into the cart')
    },
    addToWatchlist(id) {
      // if (this.watchingItems.includes(id)) return
      if (this.watchingItems.includes(id)) {
        this.watchingItems.splice(this.watchingItems.indexOf(id))
        this.toast.show('The item was remoted from your watchlist')
      } else {
        this.watchingItems.push(id)
        this.toast.show('The item was added into your watchlist')
      }
    },
    toast: {
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
    },
  }))
})
