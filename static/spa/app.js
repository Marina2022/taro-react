// Объект для хранения содержимого страниц
const pages = {};

function getCookie(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}

// Объект с обработчиками страниц
const pageHandlers = {
    '/': () => {
        // Код для обработки страницы /about
        function getProgressBarColor(value, low, high) {
            if (value < low) {
                return "#E63D52"; // Красный
            } else if (value >= low && value < high) {
                return "#FFB94C"; // Желтый
            } else {
                return "#39CB3F"; // Зеленый
            }
        }

        // Применение логики прогресс-бара
        document.querySelectorAll(".day-quality").forEach((chart) => {
            const value = parseFloat(chart.getAttribute("data-value"));
            const low = parseFloat(chart.getAttribute("data-low"));
            const high = parseFloat(chart.getAttribute("data-high"));
            const conicGradient = chart.querySelector(".conic-gradient");
            const percentLabel = chart.querySelector(".day-quality-percent");

            let color = getProgressBarColor(value, low, high);

            // Рассчитываем угол градиента
            const angle = -90 + 180 * value;
            conicGradient.style.backgroundImage = `conic-gradient(from ${angle}deg, transparent, ${color})`;
            percentLabel.textContent = `${value * 100}%`;
            percentLabel.style.color = `${color}`;
        });
    },
    '/ask': () => {

    },
    '/onboarding': () => {
        initRegistration(); // Функция для инициализации логики регистрации
    }
};

// Функция для предзагрузки страниц
async function preloadPages() {
    const urls = {
        '/': '/static/spa/pages/home.html',
        '/ask': '/static/spa/pages/ask.html',
        '/onboarding': '/static/spa/pages/onboarding.html', // Добавляем страницу регистрации

    };

    // Загрузка всех страниц и сохранение в памяти
    const promises = Object.keys(urls).map(async (route) => {
        const response = await fetch(urls[route]);
        pages[route] = await response.text();
    });

    await Promise.all(promises); // Ждем загрузки всех страниц
}

// Функция для отображения контента на основе маршрута
function loadContent() {
    const path = location.hash.slice(1) || '/'; // Получаем текущий маршрут
    const content = pages[path] || '<h1>404</h1><p>Page not found.</p>'; // Берем контент из памяти
    document.getElementById('content').innerHTML = content; // Обновляем содержимое

    // Если для страницы есть обработчик, вызвать его
    if (pageHandlers[path]) {
        pageHandlers[path]();
    }
}

// Инициализация приложения
async function initApp() {
    await preloadPages(); // Предзагрузка страниц
    loadContent(); // Загрузка контента первой страницы
    window.addEventListener('hashchange', loadContent); // Обновление контента при изменении маршрута
}

// Запуск приложения
initApp();

// Универсальный обработчик событий
document.addEventListener('click', (event) => {
    // Проверяем, был ли клик на элементе с атрибутом data-route
    const routeElement = event.target.closest('[data-route]');
    if (routeElement) {
        const route = routeElement.dataset.route; // Получаем маршрут из data-route
        if (route) {
            location.hash = route; // Изменяем hash
        }
    }
});

// Функция инициализации регистрации
function initRegistration() {
    // Ваш код инициализации без обёртки
    const stepsContainer = document.getElementById("steps-container");
    const steps = stepsContainer.querySelectorAll(".step");
    const backButton = document.getElementById("back-button");
    const nextButton = document.getElementById("next-button");
    const genderButtons = document.querySelectorAll(".gender-button");

    const stepHeader = document.getElementById("step-header");
    const step3Screen = document.getElementById("step3-screen");
    const step4Screen = document.getElementById("step4-screen");
    const currentStepIndicator = document.getElementById("current-step");

    const step3 = document.getElementById("step3");
    const step4 = document.getElementById("step4");

    // Объединяем все шаги в один массив
    const allSteps = [...steps, step3, step4];

    let currentStep = 0; // Индекс текущего шага
    let selectedGender = ""; // Выбранный пол

    // Функция обновления видимости шагов
    const updateSteps = () => {
        // Удаляем классы 'active' и 'completed' у всех шагов
        allSteps.forEach(step => {
            step.classList.remove("active");
            step.classList.remove("completed");
        });

        if (currentStep < 3) {
            stepsContainer.style.display = "block";
            stepHeader.style.display = "block";
            step3Screen.style.display = "none";
            step4Screen.style.display = "none";

            steps.forEach((step, index) => {
                const inputs = step.querySelectorAll("input, select");

                if (index < currentStep) {
                    step.classList.add("completed");
                    inputs.forEach(input => input.setAttribute("disabled", "true"));
                } else if (index === currentStep) {
                    step.classList.add("active");
                    inputs.forEach(input => input.removeAttribute("disabled"));
                } else {
                    inputs.forEach(input => input.setAttribute("disabled", "true"));
                }
            });

            // Обновить шаг в заголовке
            currentStepIndicator.innerText = currentStep + 1;

            // Обновить кнопки "Назад" и "Далее"
            backButton.style.display = currentStep === 0 ? "none" : "inline-block";
            nextButton.innerText = "Далее";

        } else if (currentStep === 3) {
            // Переходим к шагу "Давайте знакомиться"
            stepsContainer.style.display = "none";
            stepHeader.style.display = "none";
            step3Screen.style.display = "block";
            step4Screen.style.display = "none";

            // Активируем шаг 3
            step3.classList.add("active");

            // Обновить кнопки
            backButton.style.display = "inline-block";
            nextButton.innerText = "Далее";

        } else if (currentStep === 4) {
            // Переходим к шагу "Личный кабинет"
            stepsContainer.style.display = "none";
            stepHeader.style.display = "none";
            step3Screen.style.display = "none";
            step4Screen.style.display = "block";

            // Активируем шаг 4
            step4.classList.add("active");

            // Обновить кнопки
            backButton.style.display = "inline-block";
            nextButton.innerText = "Завершить";
        }
    };

    // Логика выбора пола
    genderButtons.forEach(button => {
        button.addEventListener("click", () => {
            genderButtons.forEach(btn => btn.classList.remove("active"));
            button.classList.add("active");
            selectedGender = button.dataset.gender; // Сохраняем выбранный пол
        });
    });

    // Обработчики событий для кнопок "Назад" и "Далее"
    backButton.addEventListener("click", () => {
        if (currentStep > 0) {
            currentStep--;
            updateSteps();
        } else {
            // Вернуться на предыдущую страницу или показать сообщение
            window.history.back();
        }
    });

    nextButton.addEventListener("click", () => {
        if (validateStep(currentStep)) {
            if (currentStep === 4) {
                // Отправляем данные на сервер для завершения регистрации
                submitRegistration();
            } else {
                currentStep++;
                updateSteps();
            }
        }
    });

    // Функция валидации текущего шага
    function validateStep(step) {
        if (step === 0) {
            const birthDate = document.getElementById("birth_date").value;
            if (!birthDate) {
                alert("Пожалуйста, введите дату рождения.");
                return false;
            }
        } else if (step === 1) {
            const birthTime = document.getElementById("birth_time").value;
            if (!birthTime) {
                alert("Пожалуйста, введите время рождения.");
                return false;
            }
        } else if (step === 2) {
            const country = document.getElementById("country").value;
            const city = document.getElementById("city").value;
            if (!country) {
                alert("Пожалуйста, выберите страну.");
                return false;
            }
            if (!city) {
                alert("Пожалуйста, введите город.");
                return false;
            }
        } else if (step === 3) {
            const nickname = document.getElementById("nickname").value;
            if (!nickname) {
                alert("Пожалуйста, введите имя.");
                return false;
            }
            if (!selectedGender) {
                alert("Пожалуйста, выберите пол.");
                return false;
            }
        } else if (step === 4) {
            const email = document.getElementById("email").value;
            const dataConsent = document.getElementById("data_consent").checked;

            if (!email) {
                alert("Пожалуйста, введите ваш email.");
                return false;
            }
            if (!dataConsent) {
                alert("Пожалуйста, дайте согласие на обработку персональных данных.");
                return false;
            }
        }
        return true;
    }

    // Функция отправки данных регистрации на сервер
    function submitRegistration() {
        const data = {
            birth_date: document.getElementById("birth_date").value,
            birth_time: document.getElementById("birth_time").value,
            country: document.getElementById("country").value,
            city: document.getElementById("city").value,
            nickname: document.getElementById("nickname").value,
            gender: selectedGender,
            email: document.getElementById("email").value,
            data_consent: document.getElementById("data_consent").checked,
            newsletter_consent: document.getElementById("newsletter_consent").checked,
        };

        // Отправляем данные на сервер
        fetch('/api/register/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
            .then(response => response.json())
            .then(result => {
                if (result.success) {
                    // Регистрация прошла успешно
                    alert('Регистрация завершена!');
                    // Перенаправляем пользователя на главную страницу или в личный кабинет
                    location.hash = '/';
                } else {
                    // Обработка ошибок
                    alert('Ошибка при регистрации: ' + result.message);
                }
            })
            .catch(error => {
                console.error('Ошибка:', error);
            });
    }

    // Инициализация
    updateSteps();
}
document.addEventListener('DOMContentLoaded', function() {
    // Функция для получения данных профиля пользователя
    function fetchUserProfile() {
        fetch('/api/profile/', {
            method: 'GET',
            credentials: 'include',
        })
        .then(response => {
            if (response.ok) {
                return response.json();
            } else if (response.status === 403 || response.status === 401) {
                // Обработка случая, когда пользователь не аутентифицирован
                console.error('Пользователь не аутентифицирован');
                // Вы можете перенаправить пользователя на страницу входа или показать сообщение
            } else {
                throw new Error('Ошибка при получении данных профиля');
            }
        })
        .then(data => {
            // Обновляем имя пользователя
            const userNameElement = document.getElementById('user-name');
            if (userNameElement && data.name) {
                userNameElement.innerText = data.name;
            }

            // Обновляем знак зодиака пользователя
            const horoSignElement = document.querySelector('.horo-sign');
            if (horoSignElement && data.sign) {
                horoSignElement.className = 'horo-sign';
                horoSignElement.classList.add(data.sign.toLowerCase());
            }
        })
        .catch(error => {
            console.error('Ошибка:', error);
        });
    }

    // Вызываем функцию для получения и обновления данных профиля пользователя
    fetchUserProfile();
});


// Функция отправки вопрос астрологу на бекенд
function submitQuestionForAstrologist() {
    const user_question = document.getElementById('user-question').value;

    // Проверка на заполненность полей
    let missingFields = [];
    if (!user_question) missingFields.push('вопрос');

    if (missingFields.length > 0) {
        alert('Заполните следующие поля: ' + missingFields.join(', '));
        return;
    }

    const data = {
        user_question: user_question
    };

    // Получение CSRF токена
    const csrfToken = getCookie('csrftoken');

    // Отправляем POST запрос
    fetch('/api/astrologists/ask/', {
        method: 'POST',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
            'X-CSRFToken': csrfToken
        },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(data => {
        if (data.status === "in_progress") {
            //TODO: Показываем popup с обратным отсчетом
        }
    })
    .catch(error => {
        console.error('Error:', error);
    });
}