import dynamics from 'dynamics.js'
import { BubbleHandler, BubbleHandlerOffsetInterface } from './BubbleHandler'
import { BubbleMouseListener} from './BubbleMouseListener'

/**
 * Make a bubble "move" on mousehover
 */
export class Bubble {

  private element: HTMLElement
  private delta = 15
  private handle: BubbleHandler
  private listener: BubbleMouseListener

  constructor(element: HTMLElement) {
    this.element = element
    this.setPosition(element)
    this.handle = new BubbleHandler(element.querySelector('[data-handle]') as HTMLElement, this.delta)
    this.handle.element.addEventListener('mousemove', (e) => {
      window.requestAnimationFrame(() => this.mouseMove(e) )
    })
    this.handle.element.addEventListener('mouseover', this.mouseOver.bind(this))
    this.handle.element.addEventListener('mouseout', this.mouseOut.bind(this))
    this.animateEnter(this.element)
  }

  private setPosition (element: HTMLElement) {
    const index = Array.from((element.parentNode as HTMLElement).children).indexOf(element) + 1
    const row = Math.ceil(index / 5) - 1
    const position = index - row * 5 // position from 1 to 5
    const randomX = Math.random() * 20 - 10
    const randomY = Math.random() * 80 - 50
    const rowHeight = 150
    if (position < 3) {
      element.style.top = (rowHeight * 2 * row + randomY) + 'px'
      element.style.left = (33.33 * position + randomX) + '%'
    } else {
      element.style.top = (rowHeight + rowHeight * 2 * row + randomY) + 'px'
      switch (position - 3) {
        case 0:
          element.style.left = (10 + randomX) + '%'
          break
        case 1:
          element.style.left = (50 + randomX) + '%'
          break
        default:
          element.style.left = (90 + randomX) + '%'
          break
      }
    }
  }

  /**
   * Entry animation for bubbles
   */
  private animateEnter(element) {
    dynamics.css(
      this.element,
      {
        translateY: window.innerHeight
      }
    )
    dynamics.animate(
      this.element,
      {
        translateY: 0
      },
      {
        duration: 1200,
        type: dynamics.spring,
        delay: 200 + Math.random() * 200,
        frequency: 197,
        friction: 222
      }
    )
  }

  private mouseOver (e: MouseEvent) {
    let offset = this.handle.getOffset(e)
    this.listener = new BubbleMouseListener(offset, e)
    this.handle.expand()
  }

  private mouseOut (e: MouseEvent) {
    this.handle.shrink()
    dynamics.animate(
      this.element,
      {
        translateX: 0,
        translateY: 0
      },
      {
        duration: 600,
        type: dynamics.spring
      }
    )
  }

  private mouseMove (e: MouseEvent) {
    let offset = this.handle.getOffset(e)
    if (this.listener.canMove(offset, e)) {
      let x: number = offset.x * this.delta
      let y: number = offset.y * this.delta
      this.element.style.transform = `translate3D(${x}px, ${y}px, 0)`
    }
  }

}
