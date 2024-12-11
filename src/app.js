document.addEventListener('alpine:init', () => {
  Alpine.data('index', () => ({
    productCounter: 10,
    addToCart() {
      this.productCounter++
      this.toast.show()
    },
    toast: {
      visible: false,
      delay: 5000,
      percent: 0,
      interval: 0,
      close() {
        this.visible = false
        clearInterval(this.interval)
      },
      show() {
        this.visible = true
        setTimeout(() => {
          // this.visible = false
        }, this.timeout)
        const startDate = Date.now()
        const futureDate = Date.now() + this.timeout
        this.interval = setInterval(() => {
          const date = Date.now()
          this.percent = ((date - startDate) * 100) / (futureDate - startDate)
          if (this.percent >= 100) {
            clearInterval(this.interval)
          }
        }, 30)
      },
    },
  }))
})
