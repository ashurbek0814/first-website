document.addEventListener("DOMContentLoaded", function () {
    let welcomeScreen = document.getElementById("welcome-screen");

    setTimeout(() => {
        welcomeScreen.classList.add("fade-out");
    }, 2000); // Приветствие исчезает через 2 секунды

    let header = document.querySelector("header");

    window.addEventListener("scroll", function () {
        if (window.scrollY > 50) {
            header.classList.add("scrolled");
        } else {
            header.classList.remove("scrolled");
        }
    });

    // Плавная прокрутка
    document.querySelectorAll("nav ul li a").forEach((anchor) => {
        anchor.addEventListener("click", function (e) {
            e.preventDefault();
            let targetId = this.getAttribute("href").substring(1);
            let targetElement = document.getElementById(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 60,
                    behavior: "smooth",
                });
            }
        });
    });

    // Анимация появления блоков при прокрутке
    let fadeElements = document.querySelectorAll(".fade-in");

    function checkVisibility() {
        fadeElements.forEach((element) => {
            let position = element.getBoundingClientRect().top;
            let screenHeight = window.innerHeight;

            if (position < screenHeight - 100) {
                element.classList.add("visible");
            }
        });
    }

    window.addEventListener("scroll", checkVisibility);
    checkVisibility();
});
const chatOutput = document.getElementById("chat-output");
const chatInput = document.getElementById("chat-input");
const sendBtn = document.getElementById("send-btn");

sendBtn.addEventListener("click", function () {
    let userText = chatInput.value.trim();
    if (userText === "") return;
    
    chatOutput.innerHTML += `<p><strong>Вы:</strong> ${userText}</p>`;

    let botResponse = getBotResponse(userText);
    setTimeout(() => {
        chatOutput.innerHTML += `<p><strong>Бот:</strong> ${botResponse}</p>`;
    }, 500);
    
    chatInput.value = "";
});

function getBotResponse(text) {
    if (!text) return "Я не понял вопрос.";
    
    let responses = {
        "привет": "Привет! Чем могу помочь?",
        "что посмотреть?": "Советую посетить парк Бобур и водопад Чартак!",
        "что поесть?": "Попробуйте наманганский плов и сомсу!",
        "как дела?": "Отлично! Добро пожаловать на нашу страницу.",
        "какова цель этого сайта?": "Этот сайт создан для того, чтобы познакомить вас с историей, достопримечательностями и событиями районов Наманганской области.",
        "как найти информацию о конкретном районе?": "Вы можете выбрать интересующий вас район в меню или воспользоваться поиском на сайте.",   
        "как связаться с администрацией сайта?": "Вы можете оставить сообщение через форму обратной связи или написать на наш e-mail: ahmadjanovashurbek1@gmail.com"
    };
    
    return responses[text.toLowerCase().trim()] || "Извините, я не знаю ответа на этот вопрос.";
}
async function getWeather() {
    const response = await fetch("https://api.open-meteo.com/v1/forecast?latitude=40.9983&longitude=71.6726&current_weather=true");
    const data = await response.json();
    
    document.getElementById("weather-info").textContent =
        `Температура: ${data.current_weather.temperature}°C`;
}

getWeather();
