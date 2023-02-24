export const getRandomNumberBetween = (min: number, max: number) => Math.random() * (max - min) + min;
export const getLength = (x1: number, y1: number , x2: number, y2: number) => Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);

function hasLineIntersection(p0_x: number, p0_y: number, p1_x: number, p1_y: number, p2_x: number, p2_y: number, p3_x: number, p3_y: number): boolean {
    var s1_x, s1_y, s2_x, s2_y;
    s1_x = p1_x - p0_x;
    s1_y = p1_y - p0_y;
    s2_x = p3_x - p2_x;
    s2_y = p3_y - p2_y;

    var s, t;
    s = (-s1_y * (p0_x - p2_x) + s1_x * (p0_y - p2_y)) / (-s2_x * s1_y + s1_x * s2_y);
    t = ( s2_x * (p0_y - p2_y) - s2_y * (p0_x - p2_x)) / (-s2_x * s1_y + s1_x * s2_y);

    return s >= 0 && s <= 1 && t >= 0 && t <= 1
}

export const hasLineIntersectionWithRectangle = (edge: Point[], rectangle: Point[]) => {
    const [p1, p2] = edge;
    const [rp1, rp2, rp3, rp4] = rectangle;
    return hasLineIntersection(p1.x, p1.y, p2.x, p2.y, rp1.x, rp1.y, rp2.x, rp2.y)
        || hasLineIntersection(p1.x, p1.y, p2.x, p2.y, rp2.x, rp2.y, rp3.x, rp3.y)
        || hasLineIntersection(p1.x, p1.y, p2.x, p2.y, rp3.x, rp3.y, rp4.x, rp4.y)
        || hasLineIntersection(p1.x, p1.y, p2.x, p2.y, rp4.x, rp4.y, rp1.x, rp1.y);
}


export interface Point {
    x: number;
    y: number;
}
