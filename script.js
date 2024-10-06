const form = document.querySelector("form");
const input = document.querySelector("input");
const main = document.querySelector(".main-part")
var temp = 0;
var questions_and_answers = [];
var question = null;
var answer = null;

const questions_and_answers_handler = () => {
    main.innerHTML += `<div class="question-and-answer">
                            <div class="question-part">
                                <img src="/Images/profile-img.jpg" alt="">
                                <div class="question">${question}</div>
                            </div>
                            <div class="answer-part">
                                <img src="/Images/gemini-blue.svg" alt="">
                                <div class="answer"><pre>${answer}</pre></div>
                            </div>
                        </div>`;
                    }


const API_KEY = `AIzaSyDd2_CRl0Pykm9zLS-zKiqoijO36381lTs`;
const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${API_KEY}`;

const getting_response = async() => {
    try {
        const respond = await fetch(API_URL, {
            method : 'POST',
            headers : { "Content-Type" : "application/json"},
            body : JSON.stringify({
                contents : [{
                    role :"user",
                    parts : [{text : `${question}`}]
                }]
            })
        });

        const data = await respond.json();
        const actual_respond = data.candidates[0].content.parts[0].text;
        console.log(actual_respond);

        answer = actual_respond;

        questions_and_answers_handler();
        
    } catch (error) {
        console.error(error)
    }
}

// getting_response();



// Logics



// For Handling Request
const requestHandling = () => {
    question = form.querySelector("input").value.trim();
    
    getting_response();
}

form.addEventListener("submit",(ele) =>{
    ele.preventDefault();

    if(temp == 0){
        main.innerHTML = "";
        temp++;
    }

    requestHandling();
    main.style.justifyContent = 'flex-start';
    input.value = '';
})