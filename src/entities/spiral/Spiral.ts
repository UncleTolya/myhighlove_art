import { Drawable } from '../Drawable.js';
import { Drawer } from '../drawer/Drawer.js';
import { height, width } from '../../shared/canvasStore.js';
import { getRandomNumberBetween } from '../../shared/mathUtils.js';

const segmentSize = 2;
const maxLength = 50;
const bendFactor = 0.12;
export class Spiral implements Drawable {
    length = 1;
    s = 0;
    startX = getRandomNumberBetween(0, width.value);
    startY = getRandomNumberBetween(0, height.value);
    dx = Math.random() > 0.5 ? 1 : -1;
    dy = Math.random() > 0.5 ? 1 : -1;
    release = false;
    isFinished = false;

    constructor() {}

    draw(drawer: Drawer) {
        const spiralPoints = [];
        for (let i = this.s; i < this.length + this.s; i += segmentSize) {
            let angle = i * bendFactor;
            let x = (1 + angle) * Math.cos(angle) + this.startX + i * this.dx * Math.sqrt(2);
            let y = (1 + angle) * Math.sin(angle) + this.startY + i * this.dy * 2;
            spiralPoints.push({ x, y });
        }
        if (!this.release) {
            if (this.length + 1 > maxLength) {
                this.release = true;
            } else {
                this.length = this.length + 1;
            }

        }
        this.s += segmentSize;
        drawer.drawFigure(spiralPoints, {});
        const lastPoint = spiralPoints[spiralPoints.length - 1];
        const lastPointOutOfCanvas = (lastPoint.x > width.value || lastPoint.x < 0) || (lastPoint.y > height.value || lastPoint.y < 0);
        if (lastPointOutOfCanvas) {
            this.release = true;
            this.length -=2 ;
            if (this.length < 1) {
                this.isFinished = true;
            }
        }
    }
}
