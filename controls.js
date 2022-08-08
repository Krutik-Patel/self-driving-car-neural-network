class Controls {
    constructor(controlType) {
        this.forward = false
        this.left = false
        this.right = false
        this.reverse = false
        if (controlType == "KEYS") {
            this.#addKeyboardListerners()
        }
        else {
            this.forward = true;
        }
        // the hash says that the function is 
        // only accessible from the inside 
        // of the class and not the outside
    }

    #addKeyboardListerners() {
        document.onkeydown = (event) => {
            switch (event.key) {
                case "w":
                case "ArrowUp":
                    this.forward = true
                    break
                case "s":
                case "ArrowDown":
                    this.reverse = true
                    break
                case "a":
                case "ArrowLeft":
                    this.left = true
                    break
                case "d":
                case "ArrowRight":
                    this.right = true
                    break
            }
        }
        document.onkeyup = (event) => {
            switch (event.key) {
                case "w":
                case "ArrowUp":
                    this.forward = false
                    break
                case "s":
                case "ArrowDown":
                    this.reverse = false
                    break
                case "a":
                case "ArrowLeft":
                    this.left = false
                    break
                case "d":
                case "ArrowRight":
                    this.right = false
                    break
            }
        }
    }
}