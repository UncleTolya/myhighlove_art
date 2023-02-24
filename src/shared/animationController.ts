import { drawer as _drawer, onFrame } from './canvasStore.js';
import { computed, ref } from 'vue';
import { Drawer } from '../entities/drawer/Drawer.js';
import { Drawable } from '../entities/Drawable.js';
import { Spiral } from '../entities/spiral/Spiral.js';
import { Star } from '../entities/star/Star.js';


let order = false;
const r = ref(249 + 15);
const g = ref(233 + 15);
const b = ref(244 + 15);

const colorBack = computed(() => {
    return `rgb(${r.value},${g.value},${b.value})`;
});

const drawer = (): Drawer => {
    const d = _drawer.value;
    if (!d) {
        throw new Error('Drawer is not initialized');
    }
    // @ts-expect-error ??
    return d;
}


let click: MouseEvent | undefined = undefined;

let changeAnimation = 0;
const animations = [
    // (clear?: boolean) => drawTrianglesOnFrame(drawer(), colorBack.value),
    // (clear?: boolean) => {
    //     drawBubblesOnFrame(drawer(), clear, click);
    //     click = undefined;
    // }
];


window.addEventListener('click', (event) => {
    click = event;
})

let staff: Drawable[] = [];
export const initAnimation = (): void => {
    onFrame((frame) => {
        // const arr = [r,g, b];
        // if (frame % 20 === 0) {
        //     const newOrder = order
        //      ? !arr.every((v) => v.value >= 255)
        //      : arr.some((v) => v.value === 230)
        //     if (newOrder !== order) {
        //         changeAnimation+=0.5;
        //     }
        //     order = newOrder;
        //     arr.forEach((v) => {
        //         const old = v.value;
        //         v.value = order ? old + 1 : old - 1;
        //     });
        // }

        drawer().resetCanvas('white');
        staff = staff.filter((v) => !v.isFinished)
        if (staff.length < 3) {
            staff.push(new Spiral());
            staff.push(new Star());
        }
        staff.forEach((v) => v.draw(drawer(), frame));
        // drawer().resetCanvas(colorBack.value);
        // let index = Math.floor(changeAnimation);
        // if (index > animations.length - 1) {
        //     changeAnimation = 0;
        //     index = 0;
        //     animations.forEach(v => v(true));
        // }
        // animations[index]();
    });
}
