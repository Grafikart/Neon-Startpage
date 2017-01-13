import dynamics from 'dynamics.js'

export interface BubbleHandlerOffsetInterface {
  x: number,
  y: number
}

/**
 * Handle everything about the bubble (circle element with the data-handle attribute)
 */
export class BubbleHandler {

  public element: HTMLElement

  private center: {x: number, y: number}
  private width: number
  private height: number
  private expansion = 10
  private delta: number

  constructor (element: HTMLElement, delta) {
    this.element = element
    element.style.margin = `${this.expansion / 2}px`
    let rect = element.getBoundingClientRect()
    this.center = {
      x: rect.left + window.scrollX + rect.width / 2,
      y: rect.top + window.scrollY + rect.height / 2
    }
    this.width = rect.width
    this.height = rect.height
    this.delta = delta
  }

  /**
   * Get mouse position relative to the center of the handle
   * @param e
   * @returns {{x: number, y: number}}
   */
  public getOffset(e: MouseEvent) {
    return {
      x: (e.pageX - this.center.x) / ((this.width + this.delta) / 2),
      y: (e.pageY - this.center.y) / ((this.height + this.delta) / 2)
    }
  }

  /**
   * Shrink animation
   */
  public shrink () {
    dynamics.animate(
      this.element,
      {
        width: this.width,
        height: this.height,
        margin: this.expansion / 2
      },
      {
        duration: 600,
        type: dynamics.spring
      }
    )
  }

  /**
   * Expand animation
   */
  public expand () {
    dynamics.animate(
      this.element,
      {
        width: this.width + this.expansion,
        height: this.height + this.expansion,
        margin: 0
      },
      {
        duration: 600,
        type: dynamics.spring
      }
    )
  }

}
