import { getRandomNumberBetween } from '../shared/mathUtils.js';
import { width } from '../shared/canvasStore.js';
import { Drawer } from '../entities/drawer/Drawer.js';
import { Circle } from '../entities/drawer/model.js';

let bubbles: Array<Circle & { vx: number, vy: number }> = [];

const twoCirclesIntersect = (c1: Circle, c2: Circle) => {
    const dx = c1.x - c2.x;
    const dy = c1.y - c2.y;
    const distance = Math.sqrt(dx * dx + dy * dy);
    return distance < c1.r + c2.r ? distance : 0;
}

export const drawBubblesOnFrame = (drawer: Drawer, clear?: boolean, click?: MouseEvent) => {
    if (clear) {
        bubbles = [];
        return;
    }
    if (bubbles.length < 1000) {
        const tenPercent = width.value / 100 * 5;
        bubbles.push({ x: getRandomNumberBetween(0, width.value), y: 0, r: getRandomNumberBetween(1, tenPercent), vy: 15 + bubbles.length / 100, vx: 0});
    }
    const clickBubble = click ? { x: click.x, y: click.y, r: width.value / 100 * 15 } : null;

    bubbles.forEach((bubble, index) => {
        bubble.y += bubble.vy;
        bubble.vy *= 1 - index / 20000;
        if (clickBubble) {
            const intersectDistance = twoCirclesIntersect(bubble, clickBubble);
            bubble.vx = intersectDistance ? (bubble.x - clickBubble.x) - (bubble.x - clickBubble.x) / 3  : 0;
        }
        bubble.vx *= 0.99;
        bubble.x += bubble.vx;
        drawer.drawCircle(bubble, { strokeStyle: 'white', globalAlpha: 1 });
    });
}
