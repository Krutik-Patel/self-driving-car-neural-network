function lerp(A, B, t) {
    return A + (B - A) * t;
}

function getIntersection(A, B, C, D) {

    let tTop = (D.x - C.x) * (A.y - C.y) - (D.y - C.y) * (A.x - C.x);
    let uTop = (A.x - B.x) * (C.y - A.y) - (A.y - B.y) * (C.x - A.x);
    let bottom = (B.x - A.x) * (D.y - C.y) - (B.y - A.y) * (D.x - C.x);

    if (bottom != 0) {
        const t = tTop / bottom;
        const u = uTop / bottom;
        if (t >= 0 && t <= 1 && u >= 0 && u <= 1) {
            return {
                x: lerp(A.x, B.x, t),
                y: lerp(A.y, B.y, t),
                offset: t
            }
        }
    }
    return null;
}