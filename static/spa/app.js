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

    }
};

// Функция для предзагрузки страниц
async function preloadPages() {
    const urls = {
        '/': '/static/spa/pages/home.html',
        '/ask': '/static/spa/pages/ask.html',
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