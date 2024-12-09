document.addEventListener('alpine:init', () => {
  Alpine.data('index', () => ({
    test: 'Hello World',
  }))
})
