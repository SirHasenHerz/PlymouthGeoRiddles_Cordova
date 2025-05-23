import {State} from './state.js';

export class RiddleManager {

    stateArray = [];

    constructor (riddleJSON) {

        //storing all riddle locations/states in an array   --- initializing Riddles into Array
        for (var i = 0; i < riddleJSON.features.length; i++) {
            var state = new State(false, riddleJSON.features[i].geometry.coordinates, riddleJSON.features[i].properties.riddleText);
            this.stateArray.push(state);
        }

        //set next LocationPoints/next states
        this.stateArray[0].addState(this.stateArray[1]);
        this.stateArray[1].addState(this.stateArray[2]);
        this.stateArray[2].addState(this.stateArray[3]);
        this.stateArray[3].addState(this.stateArray[4]);
        this.stateArray[4].addState(this.stateArray[5]);
        this.stateArray[5].addState(this.stateArray[6]);
        this.stateArray[6].addState(this.stateArray[7]);
        this.stateArray[7].addState(this.stateArray[8]);
        this.stateArray[8].addState(this.stateArray[9]);
        this.stateArray[9].addState(this.stateArray[10]);
        this.stateArray[10].addState(this.stateArray[11]);
        this.stateArray[11].addState(this.stateArray[12]);

        this.stateArray[0].setActive();
    }

    getActiveStates() {
        return this.stateArray.filter(state => state.active)   
    }

    checkFirstZoneCompleted() {
        for (let i = 0; i < 5; i++) {
            if (this.stateArray[i].visited == false) {
                return false;
            }
        }
        return true;
    }
}