# E-commerce website template files built with tailwindcss

## Misc Notes

### Javascript

indexOf
findIndex
includes
splice

### Tailwind

tailwind aspect ratio

https://github.com/tailwindlabs/tailwindcss-aspect-ratio
https://tailwindcss.com/docs/aspect-ratio

### Alpine.js

- x-transition and x-cloak (with tailwind aspect-ratio)
- @notify and $dispatch
- @click.prevent to avoid jump to top
- alpine.js data exchange between components https://codewithhugo.com/alpinejs-component-communication-event-bus/
- Alpine persist
- x-ref vs x-model
- delete
- Alpine x-data function patterns

```
//1st normal function arrow
Alpine.data("toast", () => ({
  //content
}));

//2nd: function arrow 2 times; double array
Alpine.data("toast", () => (id) => {
  //content
});

//3rd: return
Alpine.data('productItem', (id) => {
  return {
    //content
  }
})
```
