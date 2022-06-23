
export class Quiz{
    constructor(response){
        // console.log('000');

        this.response = response
        console.log(this.response);

        this.NumOfQues = response.length;
        console.log('NumOfQues ' + this.NumOfQues);

        this.nextBtn = document.getElementById("next");

        this.nextBtn.addEventListener('click' , this.nextQuestion.bind(this));


        this.currentQuestion = 0;
        this.showQuestion();
        this.score = 0;
    }

    showQuestion(){
        // console.log(this.response[this.currentQuestion].question);
        document.getElementById('question').innerHTML = this.response[this.currentQuestion].question;
        
        document.getElementById('currentQuestion').innerHTML = this.currentQuestion+1;

        document.getElementById('totalNumberOfQuestions').innerHTML = this.NumOfQues;

        let answers = [this.response[this.currentQuestion].correct_answer , ...this.response[this.currentQuestion].incorrect_answers]
        // console.log(answers);

        function shuffle(array) {
            let currentIndex = array.length,
                randomIndex;

            // While there remain elements to shuffle.
            while (currentIndex != 0) {

                // Pick a remaining element.
                randomIndex = Math.floor(Math.random() * currentIndex);
                currentIndex--;

                // And swap it with the current element.
                [array[currentIndex], array[randomIndex]] = [
                    array[randomIndex], array[currentIndex]
                ];
            }

            return array;
        }

        shuffle(answers);
        // b3d el random
        // console.log(answers);

        let temp = ""
        for(let i = 0 ; i < answers.length ; i++){
            temp+= ` <div class="form-check">
            <label class="form-check-label">
                <input type="radio" class="form-check-input" name="answer" id="" value="${answers[i]}" >
               ${answers[i]}
            </label>
        </div>
        `
        }
        document.getElementById('rowAnswer').innerHTML = temp;

    }


    nextQuestion(){
        // this.checkUserAnswer();
        // console.log('hello next');
        let userAnswerElement = document.getElementsByName("answer");
        if ([...userAnswerElement].filter(el => el.checked).length == 1) {
            $("#alert").fadeOut(300);
            this.checkUserAnswer();
            this.currentQuestion++;

            if (this.currentQuestion < this.NumOfQues) {
                this.showQuestion();
            } else {
                $("#quiz").fadeOut(500, () => {
                    $("#finish").fadeIn(500)
                    document.getElementById("score").innerHTML = this.score;
                    document.getElementById("tryBtn").addEventListener("click",()=>{
                        $("#finish").fadeOut(500,()=>{
                            $("#setting").fadeIn(500);
                        })
                    })
                })
            } 
        }else{
            $("#alert").fadeIn(300);
        }
    }

    checkUserAnswer(){
        // console.log('hello check');

        let userAnswerElement = document.getElementsByName("answer");
        // console.log(userAnswerElement);

        let userAnswer = [...userAnswerElement].filter(el => el.checked)[0].value;
        // console.log(userAnswer);

        if(userAnswer == this.response[this.currentQuestion].correct_answer){
            this.score++;
            $('#Correct').fadeIn(500 , ()=>{
                $('#Correct').fadeOut(500);
            });
        } else{
            $('#inCorrect').fadeIn(500 , ()=>{
                $('#inCorrect').fadeOut(500);
            });
        }
    }
}