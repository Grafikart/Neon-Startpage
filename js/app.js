import { Bubble } from './bubble'

let bubbles = document.querySelectorAll('.bubble')
bubbles.forEach(function (bubble) {
  new Bubble(bubble)
})
