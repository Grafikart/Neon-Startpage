import { BubbleHandlerOffsetInterface } from './BubbleHandler'

export class BubbleMouseListener {

  private origin: BubbleHandlerOffsetInterface
  private movement: {x: number, y: number}
  private _canMove: boolean = false

  constructor(origin: BubbleHandlerOffsetInterface, e: MouseEvent) {
    this.origin = origin
    this.movement = {
      x: e.movementX,
      y: e.movementY
    }
  }

  /**
   * Un élément peut se déplacer si
   *  - le curseur a dépasser la moitié de l'élément
   *  - la souris change de sens
   * @param offset
   * @param e
   */
  public canMove(offset: BubbleHandlerOffsetInterface, e: MouseEvent) {
    if (!this._canMove) {
      if (!this.sameSymbol(this.origin.x, offset.x) || !this.sameSymbol(this.origin.y, offset.y)) {
        this._canMove = true
      } else if (!this.sameSymbol(this.movement.x, e.movementX) || !this.sameSymbol(this.movement.y, e.movementY)) {
        this._canMove = true
      }
    }
    return this._canMove
  }

  private sameSymbol (x: number, y: number) {
    return (x >= 0 && y >= 0) || (x <= 0 && y <= 0)
  }

}
