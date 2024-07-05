// scripts.js
document.getElementById('quiz-form').addEventListener('submit', saveQuiz);
document.getElementById('login-form').addEventListener('submit', loginUser);
document.getElementById('signup-form').addEventListener('submit', signupUser);

function showSection(sectionId) {
    const sections = document.querySelectorAll('main section');
    sections.forEach(section => section.classList.add('hidden'));
    document.getElementById(sectionId).classList.remove('hidden');
    if (sectionId === 'quiz-list') {
        loadQuizzes();
    }
}

function saveQuiz(event) {
    event.preventDefault();
    const form = event.target;
    const quiz = {
        name: form['quiz-name'].value,
        description: form['quiz-description'].value,
        question: form.question.value,
        options: [
            form.option1.value,
            form.option2.value,
            form.option3.value,
            form.option4.value,
        ],
        correct: form.correct.value
    };
    let quizzes = JSON.parse(localStorage.getItem('quizzes')) || [];
    quizzes.push(quiz);
    localStorage.setItem('quizzes', JSON.stringify(quizzes));
    alert('Quiz saved!');
    form.reset();
    showSection('home');
}

function loadQuizzes() {
    const quizzes = JSON.parse(localStorage.getItem('quizzes')) || [];
    const quizListContainer = document.getElementById('quiz-list-container');
    quizListContainer.innerHTML = '';
    quizzes.forEach((quiz, index) => {
        const quizDiv = document.createElement('div');
        quizDiv.classList.add('quiz-item');
        quizDiv.innerHTML = `<h3>${quiz.name}</h3>
                             <p>${quiz.description}</p>
                             <button onclick="startQuiz(${index})">Take Quiz</button>`;
        quizListContainer.appendChild(quizDiv);
    });
}

function startQuiz(index) {
    const quizzes = JSON.parse(localStorage.getItem('quizzes'));
    const quiz = quizzes[index];
    const quizContainer = document.getElementById('quiz-container');
    quizContainer.innerHTML = `<h2>${quiz.name}</h2>
                               <p>${quiz.description}</p>
                               <h3>${quiz.question}</h3>
                               ${quiz.options.map((option, i) => `
                                  <button onclick="checkAnswer(${index}, ${i + 1})">${option}</button>
                               `).join('')}`;
    showSection('take-quiz');
}

function checkAnswer(quizIndex, answerIndex) {
    const quizzes = JSON.parse(localStorage.getItem('quizzes'));
    const quiz = quizzes[quizIndex];
    const resultSection = document.getElementById('result');
    const correctAnswer = quiz.options[quiz.correct - 1];
    let userScore = 0;
    if (quiz.correct == answerIndex) {
        userScore++;
        resultSection.innerHTML = `<p>Correct! The answer is ${correctAnswer}</p>`;
    } else {
        resultSection.innerHTML = `<p>Incorrect. The correct answer is ${correctAnswer}</p>`;
    }
    // Display the final score
    resultSection.innerHTML += `<p>Your score: ${userScore}/${quizzes.length}</p>`;
    showSection('quiz-result');
}

function loginUser(event) {
    event.preventDefault();
    const form = event.target;
    const email = form['login-email'].value;
    const password = form['login-password'].value;
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const user = users.find(user => user.email === email && user.password === password);
    if (user) {
        alert('Login successful!');
        showSection('home');
    } else {
        alert('Invalid email or password');
    }
}

function signupUser(event) {
    event.preventDefault();
    const form = event.target;
    const newUser = {
        name: form['signup-name'].value,
        email: form['signup-email'].value,
        password: form['signup-password'].value
    };
    let users = JSON.parse(localStorage.getItem('users')) || [];
    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));
    alert('Sign up successful!');
    form.reset();
    showSection('home');
}

// Load quizzes when the page loads
window.onload = loadQuizzes;
