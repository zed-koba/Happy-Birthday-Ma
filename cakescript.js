let getActiveCandles = 3;
let blowOutDone = false;
document.addEventListener("DOMContentLoaded", function () {
    const celebrateSound = document.querySelector("#celebrate-sound");
    const clapSond = document.querySelector("#clap-sound");
    const hbdSong = document.querySelector("#hbd-song");
    const cake = document.querySelector(".cake");
    const contentWish = document.querySelector(".content-wish");
    const candleCountDisplay = document.getElementById("candleCount");
    let candles = [];
    let audioContext;
    let analyser;
    let microphone;
    
    function updateCandleCount() {
      const activeCandles = candles.filter(
        (candle) => !candle.classList.contains("out")
      ).length;
      candleCountDisplay.textContent = activeCandles;
      getActiveCandles = activeCandles;
    }
  
    function addCandle(left, top) {
      const candle = document.createElement("div");
      candle.className = "candle";
      candle.style.left = left + "px";
      candle.style.top = top + "px";
  
      const flame = document.createElement("div");
      flame.className = "flame";
      candle.appendChild(flame);
  
      cake.appendChild(candle);
      candles.push(candle);
      updateCandleCount();
    }
    addCandle(54.5, 7.5);
    addCandle(129.5, 8.5);
    addCandle(203.5, 9.5);

    function isBlowing() {
      const bufferLength = analyser.frequencyBinCount;
      const dataArray = new Uint8Array(bufferLength);
      analyser.getByteFrequencyData(dataArray);
  
      let sum = 0;
      for (let i = 0; i < bufferLength; i++) {
        sum += dataArray[i];
      }
      let average = sum / bufferLength;
  
      return average > 40; //
    }
  
    function blowOutCandles() {
      let blownOut = 0;
  
      if (isBlowing()) {
        candles.forEach((candle) => {
          if (!candle.classList.contains("out") && Math.random() > 0.5) {
            candle.classList.add("out");
            blownOut++;
          }
        });
      }
  
      if (blownOut > 0) {
        updateCandleCount();
      }
      if(getActiveCandles == 0 && blowOutDone == false){
        hbdSong.pause();
        contentWish.style.display = "block";
        fireStart();
        blowOutDone = true;
        setTimeout(function(){
          clapSond.play();
          setTimeout(function() {
            celebrateSound.play();
            setTimeout(function(){
              hbdSong.play();
            }, 16000);
          }, 8000);
        }, 1000);
        
      }
      
    }
  
    if (navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices
        .getUserMedia({ audio: true })
        .then(function (stream) {
          audioContext = new (window.AudioContext || window.webkitAudioContext)();
          analyser = audioContext.createAnalyser();
          microphone = audioContext.createMediaStreamSource(stream);
          microphone.connect(analyser);
          analyser.fftSize = 256;
          setInterval(blowOutCandles, 200);
        })
        .catch(function (err) {
          console.log("Unable to access microphone: " + err);
        });
    } else {
      console.log("getUserMedia not supported on your browser!");
    }
  });

  //asdasdadaaa
  let fireScreen = document.querySelector('.screen');

        let screen_width = window.innerWidth;

        let screen_height = window.innerHeight;

        let cracker_x = 0, cracker_y = 0;

        let fireTiming = setInterval(fireStart,3000);

        let fireWorks = document.querySelectorAll('.fireG');

        let colors = [
            '#ff7f00',
            '#00ddff',
            '#ff53d1',
            '#FFFF00',
            '#FF4500',
            '#FFF0F5',
            '#98FB98',
            '#6A5ACD',
            '#F5FFFA'
        ];        


        function fireStart() {
        
            if(getActiveCandles == 0){
            fireWorks.forEach((fireWork,i) =>{
                
                let rndColor = Math.floor((Math.random() * colors.length) + 1);

                fireWork.classList.remove('fired');
                fireWork.style.color = `${colors[rndColor]}`;

                cracker_x = Math.floor((Math.random() * screen_width) + 1);
                cracker_y = Math.floor((Math.random() * screen_height) + 1);
                
                fireWork.style.setProperty('--animationDelay',(i*2) + 's');
                fireWork.style.top = cracker_y + 'px';
                fireWork.style.left = cracker_x + 'px';

                setTimeout(() => {
                    fireWork.classList.add('fired');
                }, 10);
            })
          }
        }