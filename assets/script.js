const circle = {
    type: "circle",
    rayon: 10,
    fill: "#6713D2",
    animate: {
        speed: .4,
        speedCurve: "cubic-bezier(0,.01,.34,1.01)",
    },
    hoverProperties: {
        scale: 0,
        rotate: 0
    },
    holdProperties: {
        scale: 0
    }
}

const circle1 = {
    type: "circle",
    rayon: 10,
    fill: "#cc208e",
    animate: {
        speed: .7,
        speedCurve: "cubic-bezier(0,.01,.34,1.01)",
    },
    hoverProperties: {
        scale: 0,
        rotate: 0
    },
    holdProperties: {
        scale: 0
    }
}



let cursor = new Cursor([circle, circle1]);