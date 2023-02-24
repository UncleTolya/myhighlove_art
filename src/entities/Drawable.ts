import { Drawer } from './drawer/Drawer.js'
export interface Drawable {
    isFinished: boolean;
    draw(drawer: Drawer, frame: number): void
}
