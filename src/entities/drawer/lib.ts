import { Circle } from './model.js';
import { getLength, getRandomNumberBetween } from '../../shared/mathUtils.js';

export const getLineWithTails = (x1: number, y1: number, x2: number, y2: number, dlPercent: number) => {
    const dl = getLength(x1, y1, x2, y2) / 100 * dlPercent;
    const dx = x2 - x1;
    const dy = y2 - y1;
    const k = dl / Math.sqrt(dx ** 2 + dy ** 2);
    const dx2 = dx * k;
    const dy2 = dy * k;
    return [
        [x1, y1],
        [x2 + dx2, y2 + dy2],
    ];
}

export const getRandomPointsInCircle = (circle: Omit<Circle, 'id'>, pointsCount: number): [number, number] => {
    const points = [];
    for (let i = 0; i < pointsCount; i += 1) {
        const angle = getRandomNumberBetween(0, 2 * Math.PI);
        const r = getRandomNumberBetween(0, circle.r);
        points.push([circle.x + r * Math.cos(angle), circle.y + r * Math.sin(angle)]);
    }
    return points.sort((a, b) => a[0] - b[0]) as unknown as [number, number]
}

export const spinPoint = (x: number, y: number, angle: number, x0: number, y0: number) => {
    const x1 = x0 + (x - x0) * Math.cos(angle) - (y - y0) * Math.sin(angle);
    const y1 = y0 + (x - x0) * Math.sin(angle) + (y - y0) * Math.cos(angle);
    return { x: x1, y: y1 };
}
