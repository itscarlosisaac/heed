import {makeAutoObservable} from "mobx";

class LayerManager {
    secondsPassed = 0
    layers: Layer[] = []

    constructor() {
        makeAutoObservable(this)
    }

    increaseTimer() {
        this.secondsPassed += 1
        this.layers.push(new Layer(this.secondsPassed))
    }
}

class Layer {
    private id: number
    constructor(id: number) {
        this.id = id;
    }
}

export default new LayerManager();