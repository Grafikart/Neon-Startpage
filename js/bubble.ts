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
    this.handle = new BubbleHandler(element.querySelector('[data-handle]') as HTMLElement, this.delta)
    this.handle.element.addEventListener('mousemove', (e) => {
      window.requestAnimationFrame(() => this.mouseMove(e) )
    })
    this.handle.element.addEventListener('mouseover', this.mouseOver.bind(this))
    this.handle.element.addEventListener('mouseout', this.mouseOut.bind(this))
    this.animateEnter(this.element)
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
