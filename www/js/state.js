export class State {
    constructor(active, coordinates, riddle) {
        this.active = active;
        this.coords = coordinates;
        this.nextStates = [];
        this.clues = riddle;
        this.visited = false;
    }

    addState(state) {
        this.nextStates.push(state);
    }

    addStates(states) {
        for (var i = 0; i < states.length; i++) {
            this.nextStates.push(states[i]);
        }
    }

    setActive() {
        if (this.visited == true) return;
        if (this.active == true) return;
        this.active = true;
    }

    arrivedAt() {
        this.visited = true;
        this.active = false;


        for (var i = 0; i < this.nextStates.length; i++) {
            this.nextStates[i].setActive();
        }

    }

    addClues(clue) {
        this.clues.push(clue);
    }
}
