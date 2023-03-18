import { Circle, DrawOptions } from './model.js';
import { getLineWithTails } from './lib.js';
import { height, width } from '../../shared/canvasStore.js';
import { color1 } from '../../shared/colorPalette.js';
import { Point } from '../../shared/mathUtils.js';

const GRID_GAP = 10;

export class Drawer {
  constructor(public ctx: CanvasRenderingContext2D) {
  }

  public drawLine(x: number, y: number, x2: number, y2: number, strokeStyle: string, lineWidth: number, tail?: number): void {
    const draw = (x1: number, y1: number, x2: number, y2: number) => {
      const { ctx } = this;
      ctx.beginPath();
      ctx.strokeStyle = strokeStyle;
      ctx.lineWidth = lineWidth
      ctx.moveTo(x1, y1);
      ctx.lineTo(x2, y2);
      ctx.stroke();
      ctx.closePath();
    }
    if (tail) {
      const [[_x1, _y1],[_x2, _y2]] = getLineWithTails(x, y, x2, y2, tail);
      draw(_x1, _y1, _x2, _y2);
    } else {
      draw(x, y, x2, y2);
    }
  }

  public drawFigure(
      points: Point[],
      { strokeStyle = 'black' , lineWidth = 2 }: DrawOptions,
    ): void {
    this.ctx.beginPath();
    points.forEach((point) => {
      this.ctx.lineTo(point.x, point.y);
    })
    this.ctx.strokeStyle = strokeStyle;
    this.ctx.lineWidth = lineWidth;
    this.ctx.stroke();
  }

  public drawTriangle([p1 , p2, p3]: Point[], options: DrawOptions): void {
    const { ctx } = this;
    ctx.beginPath();
    ctx.moveTo(p1.x, p1.y);
    ctx.lineTo(p2.x, p2.y);
    ctx.lineTo(p3.x, p3.y);
    ctx.closePath();
    ctx.strokeStyle = options.strokeStyle ?? 'black';
    ctx.stroke();
  }

  public resetCanvas(colorBack: string): void {
    // this.ctx.rotate(180 * Math.PI / 180);
    this.cleanCanvas(colorBack);
  }

  private cleanCanvas(colorBack: string = color1): void {
    const { ctx } = this;
    ctx.fillStyle = colorBack;
    ctx.fillRect(-3, -3, width.value + 6, height.value + 6);
  }

  public drawRect(
      box: { width: number, height: number, x: number, y: number },
      {
        fillColor = 'pink',
        globalAlpha = 1.0,
      }: DrawOptions,
  ): void {
    const { ctx } = this;
    ctx.globalAlpha = globalAlpha;
    ctx.fillStyle = fillColor;
    ctx.fillRect(box.x, box.y, box.width, box.height);
  }

  private drawText(
    text: string | number,
    x: number,
    y: number,
    height = 30,
  ): void {
    const { ctx } = this;
    const t = `${text}`;
    const { width } = ctx.measureText(t);
    ctx.fillStyle = 'white'
    const offset = 6;
    ctx.fillRect(x - offset, y - offset * 2, width + offset * 2, height * 1.3);
    ctx.font = `${height}px Arial`;
    ctx.strokeStyle = 'black';
    ctx.strokeText(t, x, y);
  }

  private drawGrid(): void {
    const { ctx } = this;
    ctx.strokeStyle = 'gray';
    ctx.lineWidth = 1;
    for (let i = 0; i < Math.ceil(width.value / 10); i += 1) {
      ctx.globalAlpha = 0.1;
      ctx.beginPath();
      ctx.moveTo(i * 10 + GRID_GAP, GRID_GAP);
      ctx.lineTo(i * 10 + GRID_GAP, height.value + GRID_GAP);
      ctx.stroke();
      ctx.closePath();
      ctx.globalAlpha = 0.1;
      ctx.beginPath();
      ctx.moveTo(i * 10 + GRID_GAP, GRID_GAP);
    }
    for (let i = 0; i < Math.ceil(height.value / 10); i += 1) {
      ctx.globalAlpha = 1.0;
      ctx.beginPath();
      ctx.moveTo(GRID_GAP, i * 10 + GRID_GAP);
      ctx.lineTo(GRID_GAP + width.value, i * 10 + GRID_GAP);
      ctx.stroke();
      ctx.closePath();
      ctx.globalAlpha = 1.0;
      ctx.beginPath();
      ctx.moveTo(GRID_GAP, i * 10 + GRID_GAP);
    }
  }

  public rotate(num: number): void {
    this.ctx.rotate(num);
  }


  public drawCircle(
    { x, y, r }: Omit<Circle, 'id'>,
    {
      strokeStyle,
      fillColor,
      lineWidth,
      globalAlpha,
    }: DrawOptions,
  ): void {
    const { ctx } = this;
    ctx.beginPath();
    ctx.strokeStyle = strokeStyle ?? 'black';
    if (lineWidth) {
      ctx.lineWidth = lineWidth;
      ctx.arc(x, y, r + lineWidth / 2, 0, Math.PI * 2);
      ctx.stroke();
      ctx.lineWidth = 1;
      ctx.arc(x, y, r, 0, Math.PI * 2);
    } else {
      ctx.arc(x, y, r, 0, Math.PI * 2);
    }
    if (fillColor) {
      ctx.globalAlpha = globalAlpha ?? 1;
      ctx.fillStyle = fillColor;
      ctx.fill();
      ctx.globalAlpha = 1;
    }
    ctx.stroke();
    ctx.closePath();
    ctx.lineWidth = 1;
  }
}
