document.addEventListener("DOMContentLoaded",function() {
    const startButton = docuemnt.getElementById("startButton");
    const questionContainer = document.getElementById("questionContainer");
    const questionElement = document.getElementById("question");
    const answerInput = document.getElementById("answerInput");
    const submitAnswerButton = document.getElementById("submitAnswer");
    let questionCounter = 0;

    //generates a math question - either multiplication or divison
    function generateQuestions() {
        // const min = 67;
        // const max = 453;
        // const num1 = Math.floor(Math.random() * (max-min +1))+ min;

        const num1 = Math.floor(Math.random() * 9000000000) + 1000000000;
        const num2 = Math.floor(Math.random() * 9000000000) + 1000000000; // Random number between 10^9 and 10^10 - 1

        let operator;
        let answer;

        if (Math.random() < 0.5) { // randomly decides if multiplication or divison is going to show
            operator = "*";
            answer = num1 * num2;
        }
        else{
            operator = "/";
            answer = Math.floor(num1/num2);
            num1 = answer * num2;
        }
        return `What is ${num} ${operator} ${num}?`;
    }

    const questions = Array.from({length: 5},generateQuestions);

    function showQuestion() {
        if (questionCounter < questions.length){
            questionElement.textContent = questions[questionCounter];
            answerInput.value = " ";
        }
        else{
            questionContainer.classList.add("hidden");
            alert("Questions completed!");
        }
    }

    function askQuestion(){
        showQuestion();
        questionCounter = (questionCounter +1) % questions.length;
    }
    startButton.addEventListener("click", function (){
        questionContainer.classList.remove("hidden");
        showQuestion();
    });

    submitAnswerButton.addEventListener("click", function() {
        const userAnswer = answerInput.value.trim();
        if (userAnswer !== ""){
            const correctAnswer = eval(questions[questionCounter]);
            if (parseInt(userAnswer) === correctAnswer) {
                //because the user input is taken as a string
                questionCounter++;
                showQuestion();
            }
            else{
                alert("Incorrect. Try Again.");
            }
        }
        else{
            alert("Enter an answer");
        }
    });
    //cannot click other windows before completing
    window.onbeforeunload = function () {
        if (questionCounter < questions.length){
            return "Complete the questions first ALVIN"
        }
    };

    const interval = 1*60*1000;
    setInterval(askQuestion, interval);
});