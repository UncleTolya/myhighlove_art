import { getRandomNumberBetween, hasLineIntersectionWithRectangle, Point } from '../shared/mathUtils.js';
import { height, width } from '../shared/canvasStore.js';
import { Drawer } from '../entities/drawer/Drawer.js';

let triangles: Point[][] = [];
let trianglesToDraw: Point[][] = [];

export const addFirstTriangle = () => {
    const widthTenPercent = width.value / 100 * 30;
    const middle = { x: width.value / getRandomNumberBetween(1, 10), y: height.value / getRandomNumberBetween(1, 10) };
    const d = getRandomNumberBetween(-widthTenPercent, widthTenPercent);
    const point1 = {
        x: middle.x - d,
        y: middle.y - d,
    }
    const point2 = {
        x: middle.x - d,
        y: middle.y + d,
    }
    const point3 = {
        x: middle.x + d,
        y: middle.y + d,
    }
    const [p1, ...other] = [point1, point2, point3].sort((a, b) => a.x - b.x);
    const [p2, p3] = other.sort((a, b) => a.y - b.y);
    triangles.push([p1, p2, p3]);
    return [[p1, p2], [p2, p3], [p3, p1]];
}

const computeRectangle = (edge: Point[]): Point[] => {
    const [p1, p2] = edge;
    const dx = p2.x - p1.x;
    const dy = p2.y - p1.y;
    const length = Math.sqrt(dx * dx + dy * dy);
    const angle = Math.atan2(dy, dx);
    const angle90 = angle + Math.PI / 2;
    const dx90 = Math.cos(angle90);
    const dy90 = Math.sin(angle90);
    const p3 = {
        x: p2.x + dx90 * length,
        y: p2.y + dy90 * length,
    };
    const p4 = {
        x: p1.x + dx90 * length,
        y: p1.y + dy90 * length,
    };
    return [p3, p4];
}

// const computeRectangle = (edge: Point[], backPoint: Point): Point[] => {
//     const height2 = getRandomNumberBetween(height.value / 100 * 1, height.value / 100 * 2);
//     const length = getLength(edge[0].x, edge[0].y, edge[1].x, edge[1].y);
//     const middle = { x: edge[0].x + (edge[1].x - edge[0].x) / 2, y: edge[0].y + (edge[1].y - edge[0].y) / 2};
//     const gipotenuza = Math.sqrt(height2 ** 2 + length ** 2);
//     const sin = height2 / gipotenuza;
//     let yd = sin * height2;
//     let xd = Math.sqrt(height2 ** 2 - yd ** 2);
//     // console.log('xd', xd)
//     // console.log('yd', yd)
//     let yFactor = middle.y > (height.value / 2) ? 1 : -1;
//     let xFactor = middle.x > (width.value / 2) ? -1 : 1;
//     // [xd, yd] = middle.x > (width.value / 2)  && middle.y > (height.value / 2) ? [xd, yd] : middle.x > (width.value / 2)  && middle.y < (height.value / 2) ? [yd, xd] : middle.x < (width.value / 2)  && middle.y > (height.value / 2) ? [xd, yd] : [yd, xd]
//     const newEdge = [{ x: edge[0].x + xd * xFactor, y: edge[0].y + yd * yFactor }, { x: edge[1].x + xd + xFactor, y: edge[1].y + yd + yFactor}];
//     return newEdge;
// }

const computeTrianglesFromRectangle = (p1: Point, p2: Point, p3: Point, p4: Point): Point[] => {
    return [p1, p2, p3];
}

const computeNextEdges = (edges: Point[][], isTriangle = true) => {
    if (triangles.length > 200) {
        return;
    }
    const canvas = [{ x: 0, y: 0 }, { x: width.value, y: 0 }, { x: width.value, y: height.value }, { x: 0, y: height.value }];
    const notAllEdgesOutsideCanvas = edges.every((edge) => {
        return !hasLineIntersectionWithRectangle(edge, canvas) && ((edge[0].x < 0 || edge[0].x > width.value) && (edge[0].y < 0 || edge[0].y > height.value)) && ((edge[1].x < 0 || edge[1].x > width.value) && (edge[1].y < 0 || edge[1].y > height.value));
    })
    if (notAllEdgesOutsideCanvas) {
        return;
    }
    const nextEdges = [];
    const rectangleEdge1 = computeRectangle(edges[0]);
    triangles.push(computeTrianglesFromRectangle(edges[0][0], rectangleEdge1[0], rectangleEdge1[1], edges[0][1]));
    const rectangleEdge2 = computeRectangle(edges[1]);
    triangles.push(computeTrianglesFromRectangle(edges[1][0], rectangleEdge2[0], rectangleEdge2[1], edges[1][1]));
    const rectangleEdge3 = computeRectangle(edges[2]);
    triangles.push(computeTrianglesFromRectangle(edges[2][0], rectangleEdge3[0], rectangleEdge3[1], edges[2][1]));

    if (isTriangle) {
        const triangleEdge1 = [rectangleEdge1[1], rectangleEdge2[0]];
        const triangleEdge2 = [rectangleEdge2[1], rectangleEdge3[0]];
        const triangleEdge3 = [rectangleEdge3[1], rectangleEdge1[0]];
        const triangle1 = [rectangleEdge1[1], rectangleEdge2[0], edges[0][1]];
        const triangle2 = [rectangleEdge2[1], rectangleEdge3[0], edges[1][1]];
        const triangle3 = [rectangleEdge3[1], rectangleEdge1[0], edges[2][1]];
        triangles.push(triangle1, triangle2, triangle3);
        nextEdges.push(triangleEdge1, triangleEdge2, triangleEdge3);
    } else {
        const trapezoidEdge1 = [rectangleEdge1[1], rectangleEdge2[0]]
        const trapezoidEdge2 = [rectangleEdge2[1], rectangleEdge3[0]]
        const trapezoidEdge3 = [rectangleEdge3[1], rectangleEdge1[0]]
        triangles.push(computeTrianglesFromRectangle(edges[0][1], rectangleEdge1[1], rectangleEdge2[0], edges[1][0]));
        triangles.push(computeTrianglesFromRectangle(edges[1][1], rectangleEdge2[1], rectangleEdge3[0], edges[2][0]));
        triangles.push(computeTrianglesFromRectangle(edges[2][1], rectangleEdge3[1], rectangleEdge1[0], edges[0][0]));
        nextEdges.push(trapezoidEdge1, trapezoidEdge2, trapezoidEdge3);
    }

    // triangles.forEach((triangle) => {
    //     drawer.drawTriangle(...triangle, { strokeStyle: 'black' });
    // });

    computeNextEdges(nextEdges, false);
}

const computeTriangles = () => {
    const firstEdges = addFirstTriangle();
    computeNextEdges(firstEdges);

}

export const drawTrianglesOnFrame = (drawer: Drawer, color: string) => {
    if (width.value === 0 || height.value === 0) {
        return;
    }
    if (!triangles.length) {
        drawer.resetCanvas(color);
        trianglesToDraw = [];
        computeTriangles();
    } else {
        const throttling = Math.random();
        if (throttling > 0.75) {
            const triangle1 = triangles.shift();
            if (triangle1) {
                trianglesToDraw.push(triangle1)
            }
        }
        // const triangle2 = triangles.shift();
        // if (triangle2) {
        //     trianglesToDraw.push(triangle2)
        // }
        // const triangle3 = triangles.shift();
        // if (triangle3) {
        //     trianglesToDraw.push(triangle3)
        // }
        // const triangle4 = triangles.shift();
        // if (triangle4) {
        //     trianglesToDraw.push(triangle4)
        // }
        // const triangle5 = triangles.shift();
        // if (triangle5) {
        //     trianglesToDraw.push(triangle5)
        // }
        trianglesToDraw.forEach((triangle) => {
            drawer.drawTriangle(triangle, { strokeStyle: 'white' });
        });
    }
}
