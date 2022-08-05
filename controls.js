class Controls {
    constructor() {
        this.forward = false
        this.left = false
        this.right = false
        this.reverse = false
        this.#addKeyboardListerners()
        // the hash says that the function is 
        // only accessible from the inside 
        // of the class and not the outside
    }

    #addKeyboardListerners() {
        document.onkeydown = (event) => {
            switch (event.key) {
                case "ArrowUp":
                    this.forward = true
                    break
                case "ArrowDown":
                    this.reverse = true
                    break
                case "ArrowLeft":
                    this.left = true
                    break
                case "ArrowRight":
                    this.right = true
                    break
            }
        }
        document.onkeyup = (event) => {
            switch (event.key) {
                case "ArrowUp":
                    this.forward = false
                    break
                case "ArrowDown":
                    this.reverse = false
                    break
                case "ArrowLeft":
                    this.left = false
                    break
                case "ArrowRight":
                    this.right = false
                    break
            }
        }
    }
}