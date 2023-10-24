const unitTemplate = document.createElement('template')

unitTemplate.innerHTML = `
  <style>
    /* Define your component's styling here */
    .heed-unit-container {
      border: 1px solid #ccc;
    }
  </style>
  <div class="heed-unit">
    <slot></slot>
  </div>
`
export default unitTemplate
