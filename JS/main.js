// let userEmail = document.querySelector("#useremail")
// let userPass = document.querySelector("#userpass")
// let logbtn = document.querySelector("#logbtn")
// let errMess = document.querySelector("#errMess")
// let succMess = document.querySelector("#succMess")
// let form = document.querySelector("form")
// let QuestionsNum = document.querySelector("#questionsNum")
// let strTestBtn = document.querySelector("#strTestBtn")
// let testScreen = document.querySelector("#testScreen")
// let testSection = document.querySelector("#test")
// let cartona = ''
// // local storage 
// console.log(localStorage.getItem("Isloginlaksdklasd"));




// logbtn.addEventListener("click", (e) => {
//     e.preventDefault()
//     console.log(userEmail.value, userPass.value);



//     if (userEmail.value != "oman" || userPass.value != "1970") {
//         errMess.classList.replace("d-none", "d-block")
//     }
//     else {
//         errMess.classList.replace("d-block", "d-none")

//         succMess.classList.replace("d-none", "d-block")

//         localStorage.setItem("Islogin","True")
//         setTimeout(GoToTestPage,
//             1000
//         )
//     }


// })

// function GoToTestPage() {
//    testSection.classList.replace("d-none","d-block")
//    form.classList.add("d-none")
// }

// strTestBtn.addEventListener("click", (e) => {
//     e.preventDefault()
//     let num = QuestionsNum.value
//     for (let i = 1; i <= num; i++) {
//         let num1 = Math.floor(Math.random() * 10)
//         let num2 = Math.floor(Math.random() * 10)
//         let opertation = "+"
//         cartona += `${i})   <label>  ${num1} + ${num2} = </label>
//         <input class='form-control'>    
//     `
//     }
//     testScreen.innerHTML = cartona
// })
/////////////////////////////////////////////////////////////////////////////////////////////////////////

// ================= Elements =================
let userEmail = document.querySelector("#useremail");
let userPass = document.querySelector("#userpass");
let logbtn = document.querySelector("#logbtn");
let messageBox = document.querySelector("#messageBox");

let formSection = document.querySelector("#logform");
let testSection = document.querySelector("#test");

let questionsNum = document.querySelector("#questionsNum");
let strTestBtn = document.querySelector("#strTestBtn");
let testScreen = document.querySelector("#testScreen");
let logoutBtn = document.querySelector("#logoutBtn");

// ================= Check Login On Load =================
if (localStorage.getItem("IsLogin") === "true") {
    showTestPage();
} else {
    showLoginPage();
}

// ================= Login =================
logbtn.addEventListener("click", function (e) {
    e.preventDefault();

    if (userEmail.value === "WE" && userPass.value === "46") {

        messageBox.classList.remove("d-none", "alert-danger");
        messageBox.classList.add("alert-success");
        messageBox.innerText = "Login Successfully ✅";

        localStorage.setItem("IsLogin", "true");

        setTimeout(() => {
            showTestPage();
            messageBox.classList.add("d-none");
        }, 1000);

    } else {

        messageBox.classList.remove("d-none", "alert-success");
        messageBox.classList.add("alert-danger");
        messageBox.innerText = "Invalid Username Or Password ❌";
    }
});

// ================= Logout =================
logoutBtn.addEventListener("click", function () {
    localStorage.removeItem("IsLogin");
    showLoginPage();

    userEmail.value = "";
    userPass.value = "";
    questionsNum.value = "";
    testScreen.innerHTML = "";
});

// ================= Start Test =================
strTestBtn.addEventListener("click", function (e) {
    e.preventDefault();

    let num = parseInt(questionsNum.value);
    if (!num || num <= 0) return;

    let cartona = "";

    for (let i = 1; i <= num; i++) {

        let num1 = Math.floor(Math.random() * 10);
        let num2 = Math.floor(Math.random() * 10);
        let correctAnswer = num1 + num2;

        cartona += `
            <div class="mb-3">
                <label>${i}) ${num1} + ${num2} = </label>
                <input type="number" 
                       class="form-control w-25 d-inline-block ms-2 answer"
                       data-correct="${correctAnswer}">
            </div>
        `;
    }

    cartona += `
        <button class="btn btn-primary mt-3" id="submitAnswers">
            Submit
        </button>

        <div id="scoreBox" class="alert mt-3 d-none"></div>
    `;

    testScreen.innerHTML = cartona;

    handleSubmit(num);
});

// ================= Handle Submit =================
function handleSubmit(totalQuestions) {

    let submitBtn = document.querySelector("#submitAnswers");

    submitBtn.addEventListener("click", function () {

        let answers = document.querySelectorAll(".answer");
        let score = 0;

        answers.forEach(input => {

            let correct = input.dataset.correct;
            let userAnswer = input.value;

            input.classList.remove("border-success", "border-danger");

            if (userAnswer == correct) {
                score++;
                input.classList.add("border", "border-success");
            } else {
                input.classList.add("border", "border-danger");
            }
        });

        let scoreBox = document.querySelector("#scoreBox");
        scoreBox.classList.remove("d-none");

        if (score === totalQuestions) {
            scoreBox.classList.remove("alert-info");
            scoreBox.classList.add("alert-success");
        } else {
            scoreBox.classList.remove("alert-success");
            scoreBox.classList.add("alert-info");
        }

        scoreBox.innerText = `Your Score: ${score} / ${totalQuestions}`;
    });
}

// ================= Helpers =================
function showTestPage() {
    formSection.classList.add("d-none");
    testSection.classList.remove("d-none");
}

function showLoginPage() {
    formSection.classList.remove("d-none");
    testSection.classList.add("d-none");
}