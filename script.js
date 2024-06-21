
const startBtn = document.getElementById("start");
startBtn.addEventListener("click", function(){
    let textArea = document.getElementById("textarea");
    startBtn.style.display = "none";
    let audioPlay = document.querySelector("audio");
    let arryOfSeconds = [5, 30, 75, 10, 5, 10, 20, 25, 15, 20, 20, 20, 15, 5, 50];
    let numOfSec = 0;
    let messageEnd = false;
    let getLetterLink = document.getElementById("go-to-letter");
    audioPlay.play().then(()=>{
       
        textArea.style.display = "inline-block";
        const targetElement = document.getElementById("text");
        const texts = [
                "Hello mader, I hope you will like the song",
                "This song is for you mother",
                "You, who we love the most",
                "Happy Birthday to you !.",
                "Happy Birthday to you!..",
                "Happy Birthday, Happy Birthday!",
                "Happy Birthday to you!",
                "I wish you all the best for you",
                "and I'm sorry if ing ani ra ako gift nimo hehe",
                "I want you to know that...",
                "We always",
                "Be here",
                "For you, kami nila chan2, ani",
                "And Thank you for everything ma hehe",
                "HAPPY BIRTHDAY MA !!!!"
            ];

        let textConfirm = false;
        let index = countIndex = waitTime = 0;
        targetElement.textContent = "|";
        const messageInterval = setInterval(function(){
            let countText = texts[index];

            if(textConfirm == false && messageEnd == false){

                targetElement.textContent = targetElement.textContent.replace("|","");
                targetElement.innerHTML += texts[index][countIndex] +"|";
                countIndex++;

                if(countIndex == countText.length){

                    textConfirm = true;
                    countIndex = 0;
                    index++;

                }

            }

            if(textConfirm == true && messageEnd == false){
                waitTime++;
                if(waitTime == arryOfSeconds[numOfSec]){
                    textConfirm = false;
                    targetElement.innerHTML="";
                    waitTime = 0;
                    if(numOfSec != arryOfSeconds.length-1){
                        numOfSec++;
                    }else{
                        numOfSec = 0;
                    }
                }
            }
            if(index >= texts.length && textConfirm == false) {
                messageEnd = true;
                stopInterval();
                getLetterLink.style.display = "block";
            }

        },100);
        function stopInterval() {
            clearInterval(messageInterval);
        }
    })
})