import { ref } from 'vue';
import { Drawer } from '../entities/drawer/Drawer.js';

export const width = ref(0);
export const height = ref(0);
export const frame = ref(0);
export const drawer = ref<Drawer | null>(null);

const handlers: ((frame: number) => void)[] = [];

export const incFrame = (): void => {
    frame.value += 1;
    if (frame.value > 10000) {
        frame.value = 0;
    }
    handlers.forEach((handler) => handler(frame.value));
};

export const onFrame = (callback: (frame: number) => void): void => {
    handlers.push(callback);
}

export const getWidthPercent = (percent: number): number => width.value / 100 * percent;
export const getHeightPercent = (percent: number): number => height.value / 100 * percent;
