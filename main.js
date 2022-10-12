window.addEventListener('DOMContentLoaded', onDOMLoaded);

let particleParams = {
    count: 10,
    duration: {from:3, to:5},
    type: 'circle', /* can be circle, square, text or img */
    colorOverlife: true,
    idleDie: {
        active: true,
        idleTime: 10
    },
    playState:{
        repeat: -1, /* -1 for repeat endlessly, 2 to repeat the particles 2 times, 3  to repeat the particles 2 times, and so on */
        yoyo: 1 /* 0 for to loop cycle the timeline, 1 to loop the timeline back and forth*/
    },
    start:{
        x:{from:-10, to:310},
        y:{from:-50, to:-10},
        opacity:{from:0.3, to:0.5},
        size:{from:10, to:10.5},
        rotation:{from:0, to:0},
        color: 'white'
    },
    end:{
        x:{from:0, to:300},
        y:{from:300, to:320},
        opacity:{from:0.3, to:0.5},
        size:{from:1, to:1.5},
        rotation:{from:0, to:0},
        color: '#ffa800'
    },
};

function onDOMLoaded(e) {
    var theParticles = setupParticles('particle_container', particleParams); // particle index 0
    playParticle(0, 0);

    document.querySelector('#main').addEventListener('click', () => {
        if(theParticles.isParticlesPlaying()){
             pauseParticles();
        }else{
            playParticles();
        }
    })

}