
// Class to create and manage individual musical notes using Web Audio oscillators
export default class Note{
    // Constructor runs when we create a new Note with: new Note(...)
    // Parameters:
    //   context = the AudioContext to use
    //   outputDestination = where to send the audio (our masterGain node)
    //   freq = the frequency in Hz for this note
    constructor(context, outputDestination, freq, maxAmplitude, options = {}) {
        const {
            attack = 0.251,
            decay = 0.25,
            sustain = 0.5,
            release = 0.5,
            waveshape = 'sine'
        } = options;

        // Store the audio context for this note
        this.myContext = context;

        // Store where this note's audio should be sent
        this.destination = outputDestination;

        // Create an oscillator node - this generates the actual sound wave
        this.osc = new OscillatorNode(this.myContext);
        this.osc.type = waveshape;

        // Set the oscillator's frequency to the note we want (in Hz)
        this.osc.frequency.value = freq;

        // Set up what happens when the oscillator stops playing
        // .bind(this) ensures 'this' still refers to our Note object inside cleanup()
        this.osc.onended = this.cleanup.bind(this);

        this.adsr = new GainNode(this.myContext, {gain: 0.})

        this.maxGain = maxAmplitude;
        this.attack = attack;
        this.decay = decay;
        this.sustain = sustain;
        this.release = release;

        // Connect the oscillator to the destination (masterGain)
        // Now audio can flow from oscillator → masterGain → speakers
        this.osc.connect(this.adsr).connect(this.destination);
    }
    _attackDecaySustain() {
        let now = this.myContext.currentTime
        this.adsr.gain.cancelScheduledValues(now)
        this.adsr.gain.setValueAtTime(this.adsr.gain.value, now)
        this.adsr.gain.linearRampToValueAtTime(this.maxGain, now + this.attack)
        this.adsr.gain.linearRampToValueAtTime(this.sustain *  this.maxGain, now + this.attack + this.decay)
    }

    _release() {
        let now = this.myContext.currentTime
        this.adsr.gain.cancelScheduledValues(now)
        this.adsr.gain.setValueAtTime(this.adsr.gain.value, now)
        this.adsr.gain.linearRampToValueAtTime(0., now + this.release)
        this.osc.stop(now + this.release)
    }
    // Method to start playing the note
    start(){
        // Tell the oscillator to begin generating sound
        this.osc.start();
        this._attackDecaySustain();
        console.log("start");
    }

    // Method to stop playing the note
    stop(){
        // Tell the oscillator to stop generating sound
        // This also triggers the 'onended' event which calls cleanup()
        this._release()
        console.log("stop");
    }

    // Cleanup method that runs automatically when oscillator ends
    cleanup(){
        // Disconnect the oscillator from the audio graph
        // This breaks the connection: oscillator -X- masterGain
        this.osc.disconnect();

        // Set oscillator to null to free up memory
        // Once stopped, oscillators can't be reused, so we delete the reference
        this.osc = null;
    }
}

