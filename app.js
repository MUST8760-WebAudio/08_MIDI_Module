//Import Modules


//Function Definitions
const mtof = function(midiNum){
    return 440 * 2**((midiNum-69)/12)
}

//Create Web Audio Graph
const myAudContext = new AudioContext()

const fader = new GainNode(myAudContext)
fader.gain.value = 0.25
fader.connect(myAudContext.destination);
