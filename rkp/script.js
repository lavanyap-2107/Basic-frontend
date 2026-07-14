let userScore = 0;
let compScore = 0;

const choices = document.querySelectorAll(".choice");
let msg = document.querySelector("#msg");
let userScorePara = document.querySelector("#userScore");
let compScorePara = document.querySelector("#compScore");

const genCompChoice = () =>{
    const options = ["rock", "paper", "scissors"];
    const randomIdx = Math.floor(Math.random() * 3);
    const tempChoice = options[randomIdx];
    return tempChoice;
}

const showWinner = (userWin) =>{
    if(userWin){
        console.log("User won!");
        msg.innerText = "User won!" ;
        userScore++;
        userScorePara.innerText = userScore;
    }else{
        console.log("You lost.. Play again!");
        msg.innerText = "You lost.. Play again!" ;
        compScore++;
        compScorePara.innerText = compScore;
    }
}
const gameDraw = () =>{
    console.log("It's a draw!");
    msg.innerText = "Game draw!";
}

const playGame = (userChoice) =>{
    console.log("User chose: ",userChoice);
    //generate computer's choice
    const compChoice = genCompChoice();
    console.log("Computer chose: ",compChoice);
    if(userChoice === compChoice ){
        gameDraw();
    }else{
        let userWin = true;
        if(userChoice === "rock"){
            //computer can choose either paper or scissors
            userWin = compChoice === "paper" ? false : true;
    }else if(userChoice === "paper"){
        //computer can choose either rock or scissors
        userWin = compChoice === "scissors" ? false : true;
    }else{
        //computer can choose either rock or paper
        userWin = compChoice === "rock" ? false : true;
    }
    showWinner(userWin);

    }
    

}
choices.forEach((choice) => {
    choice.addEventListener("click", () =>{
        const userChoice = choice.getAttribute("id");
        playGame(userChoice);
    })
})