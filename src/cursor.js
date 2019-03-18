class Cursor {
    
    constructor(ArrayElement) {
        this.x = 500;
        this.y = 200;
        this.ArrayElement = ArrayElement;
        this.DOMElements = [];
        this.init();
    }

    init() {
        this.createCursor();
        this.updateElement();
        this.getMouseCoord();
    }

    getMouseCoord() {
        document.addEventListener("mousemove", (e) => {
            this.x = e.clientX;
            this.y = e.clientY;
            this.updateElement();
        })
    }

    updateElement() {
        this.DOMElements.forEach((item) => {
            item.style.transform = "translate(" + this.x + "px," + this.y + "px) scale(" + item.scale + ") rotate(" + item.rotate + "deg)";
        }) 
    }

    createCursor() {

        let divCursor = document.createElement("div");
        divCursor.id = "cursor";

        this.ArrayElement.forEach((item) => {

            let circle = document.createElement("div");

            circle.scale = 1;
            circle.rotate = 0;

            circle.style.top = -item.rayon / 2 + "px";
            circle.style.left = -item.rayon / 2 + "px";

            circle.style.width = circle.style.height = item.rayon + "px";

            if(item.stroke != undefined){
                circle.style.border = item.stroke.width + "px solid " + item.stroke.color;
            }

            if(item.type == "circle"){
                circle.style.borderRadius = "50%";
            }

            if(item.fill != undefined){
                circle.style.backgroundColor = item.fill;
            }
            else {
                circle.style.backgroundColor = "black";
            }

            if(item.animate != undefined){
                circle.style.transition = "transform " + item.animate.speed + "s " + item.animate.speedCurve + "";
            }


            divCursor.appendChild(circle);

            this.DOMElements.push(circle);
        }) 


        document.body.appendChild(divCursor);

    }

    addInteractElements(arrayElements) {
        arrayElements.forEach(item => {
            item.addEventListener('mouseover', () => {
                this.hoverState()
            });
            item.addEventListener('mouseleave', () => {
                this.resetDefaultProperties()
            });
        });

    }

    hoverState() {
        this.ArrayElement.forEach((item, index) => {
            if(item.hoverProperties != undefined){
                if(item.hoverProperties.scale != undefined){
                    this.DOMElements[index].scale = item.hoverProperties.scale
                }
                if(item.hoverProperties.rotate != undefined){
                    this.DOMElements[index].rotate = item.hoverProperties.rotate
                }
            }
        })
    }

    resetDefaultProperties() {
        this.DOMElements.forEach((item) => {
            item.scale = 1;
            item.rotate = 0;
            this.updateElement();
        })
    }

    holdCursor() {

        let mouseup = false;
        
        document.addEventListener("mouseup", () => {
            mouseup = true;
            this.resetDefaultProperties();
        });
        document.addEventListener("mousedown", () => {
            mouseup = false;
            setTimeout(() => {
                if(!mouseup) {
                    this.ArrayElement.forEach((item, index) => {
                        this.DOMElements[index].scale = item.holdProperties.scale;
                        if(item.holdProperties.animate != undefined){
                            this.DOMElements[index].style.transition = "transform " + item.holdProperties.animate.speed + "s " + item.holdProperties.animate.speedCurve + "";
                            setTimeout(() => {
                                this.DOMElements[index].style.transition = "none";
                            }, item.holdProperties.animate.speed * 1000)
                        }

                        this.updateElement();
                    })
                }
            }, 200);     

        });
    }

}