// //Import Modules
// import * as MusicTools from "./MusicTools.js"
// import Note from "./Note.js"
// import MIDIEngine from "./MIDIEngine.js"
//
//
// const midiIn = new MIDIEngine();
//
// const alltheNotes = new Array(16).fill(null);
//
// alltheNotes.forEach((v, i)=>{
//     alltheNotes[i] = new Array(128).fill(null)
// })
//
//
// //Create Web Audio Graph
// const myAudContext = new AudioContext()
//
//
//
// const fader = new GainNode(myAudContext)
// fader.gain.value = 0.25
//
// midiIn.onNoteOn = function(n, v, ch){
//     alltheNotes[ch][n] = new Note(myAudContext, fader, MusicTools.mtof(n), v/127., {attack: 1-(v/127)})
//     alltheNotes[ch][n].start()
// }
//
// midiIn.onNoteOff = function(n, v, ch){
//     alltheNotes[ch][n].stop()
//     alltheNotes[ch][n] = null
// }
//
// fader.connect(myAudContext.destination);
