export type Coordinate = [number, number];

export interface Circle {
    x: number;
    y: number;
    r: number;
}

export interface DrawOptions {
    index?: number;
    strokeStyle?: string;
    fillColor?: string;
    lineWidth?: number;
    globalAlpha?: number;
}
