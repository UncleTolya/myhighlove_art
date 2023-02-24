import { Drawable } from '../Drawable.js';
import { Drawer } from '../drawer/Drawer.js';
import { height, width } from '../../shared/canvasStore.js';
import { getRandomNumberBetween, Point } from '../../shared/mathUtils.js';
import { spinPoint } from '../drawer/lib.js';

const segmentSize = 2;
const maxLength = 50;
const bendFactor = 0.12;
const starPoints = [
    { x: 0, y: 0.9511 },
    { x: 1, y: 0.9511 },
    { x: 1.3090, y: 0 },
    { x: 1.6180, y: 0.9511 },
    { x: 2.6180, y: 0.9511 },
    { x: 1.8090, y: 1.5388 },
    { x: 2.1180, y: 2.4899 },
    { x: 1.3090, y: 1.9021 },
    { x: 1.3090, y: 1.9021 },
    { x: 0.5000, y: 2.4899 },
    { x: 0.8090, y: 1.5388 },
    { x: 0, y: 0.9511 },
];
export class Star implements Drawable {
    angle = 0;
    stage = 0;
    startX = getRandomNumberBetween(0, width.value);
    startY = getRandomNumberBetween(0, height.value);
    dx = Math.random() > 0.5 ? 1 : -1;
    dy = Math.random() > 0.5 ? 1 : -1;
    release = false;
    isFinished = false;
    history: Point[][] = [];
    size = 1;

    maxSize = getRandomNumberBetween(10, 40);


    centerX = getRandomNumberBetween(0, width.value);
    centerY = getRandomNumberBetween(0, height.value);

    constructor() {}

    draw(drawer: Drawer, frame: number) {
        this.stage += 2;
        this.angle += 0.04;
        if (this.angle > 360) {
            this.angle = 0;
        }
        this.size = this.size * 1.04 > this.maxSize ? this.maxSize : this.size * 1.04;
        const spinPoints = starPoints.map(point => spinPoint(
            point.x * this.size + this.centerX + this.dx * this.stage,
            point.y * this.size + this.centerY + this.dy * this.stage,
            this.angle,
            this.centerX + 1.3090 * this.size + this.dx * this.stage,
            this.centerY + 1.3090 * this.size + this.dy * this.stage,
        ));
        this.history.push(spinPoints);
        drawer.drawFigure(spinPoints, { lineWidth: 1, strokeStyle: `rgba(0, 0, 0. ${0.6})` });
        for (let i = 5; i > 0; i--) {
            const points = this.history[this.history.length - i * 3];
            if (!points) {
                continue;
            }
            drawer.drawFigure(points, { lineWidth: 1, strokeStyle: `rgba(0, 0, 0, ${0.6 - 0.1 * i})` });
        }
        const pointOnCanvas = (point: Point): boolean => {
            return (point.x > 0 && point.x < width.value) && (point.y > 0 && point.y < height.value);
        }
        if (!spinPoints.some(pointOnCanvas)) {
            this.isFinished = true;
        }
    }
}
