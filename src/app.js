document.addEventListener('alpine:init', () => {
  Alpine.store('header', {
    cartItemsObject: Alpine.$persist({}),
    watchingItems: Alpine.$persist([]),
    get watchlistItems() {
      return this.watchingItems.length
    },
    get cartItems() {
      let sum = 0
      for (let key in this.cartItemsObject) {
        sum += this.cartItemsObject[key].quantity
      }
      return sum
    },
  })

  Alpine.data('toast', () => ({
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
  }))

  Alpine.data('productItem', (product) => {
    return {
      id: product.id,
      product,
      quantity: 1,
      get watchlistItems() {
        return this.$store.watchlistItems
      },
      addToWatchlist(id) {
        if (this.$store.header.watchingItems.includes(id)) {
          this.$store.header.watchingItems.splice(
            this.$store.header.watchingItems.indexOf(id),
            1
          )
          this.$dispatch('notify', {
            message: 'The item was removed from your watchlist',
          })
        } else {
          this.$store.header.watchingItems.push(id)
          this.$dispatch('notify', {
            message: 'The item was added into your watchlist',
          })
        }
      },
      isInWatchlist(id) {
        return this.$store.header.watchingItems.includes(id)
      },
      addToCart(id, quantity = 1) {
        // this.$store.header.cartItemsObject[id] =
        //   this.$store.header.cartItemsObject[id] || 0
        // this.$store.header.cartItemsObject[id] += parseInt(quantity)
        this.$store.header.cartItemsObject[id] = this.$store.header
          .cartItemsObject[id] || { ...product, quantity: 0 }
        this.$store.header.cartItemsObject[id].quantity += parseInt(quantity)

        this.$dispatch('notify', {
          message: 'The item was added into cart',
        })
      },
      removeItemFromCart() {
        delete this.$store.header.cartItemsObject[this.id]
        this.$dispatch('notify', {
          message: 'The item was removed from cart',
        })
      },
    }
  })
})
