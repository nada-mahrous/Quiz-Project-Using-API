

///<reference path="../typings/globals/jquery/index.d.ts" />
import {Quiz} from './quiz.js'
export class Settings{
    constructor(){
        this.categoryElement = document.getElementById('category');
        // console.log(this.categoryElement);
        this.numberOfQuestionsElement = document.getElementById('numberOfQuestions');
        // console.log(this.numberOfQuestionsElement);
        this.difficultyElement = document.getElementsByName('difficulty');
        // console.log(this.difficultyElement);

        this.startBtn = document.getElementById('startBtn');
        this.startBtn.addEventListener('click' , this.StartQuiz.bind(this))
    }

    async StartQuiz(){
        let category = this.categoryElement.value;
        // console.log(category);

        let numOfQues = this.numberOfQuestionsElement.value;
        // console.log(numOfQues);

        let difficulty = [...this.difficultyElement].filter(el => el.checked)[0].value;
        // console.log(difficulty);

        let API = `https://opentdb.com/api.php?amount=${numOfQues}&category=${category}&difficulty=${difficulty}`

        // let response = await this.FetchAPI(API);
        let response = await this.FetchAPI(API);
        // console.log(response);
        if(response.length > 0){
            $('#formAlert').fadeOut(500)
            $("#setting").fadeOut(500,()=>{
                $("#quiz").fadeIn(500)
            })
            let quiz = new Quiz(response); 
        }else{
            $('#formAlert').fadeIn(500)
        }
    }
    
    async FetchAPI(API){
        let response = await fetch(API)
        let result = await response.json();
        return result.results;
    }
}