/*=============== MOUSE MOVE ===============*/

$(document).mousemove(function (event) {
    var windowWidth = $(window).width();
    var windowHeight = $(window).height();

    var mouseXpercentage = Math.round((event.pageX / windowWidth) * 100);
    var mouseYpercentage = Math.round((event.pageY / windowHeight) * 100);

    $('#app').css(
        'background',
        'radial-gradient(at ' +
        mouseXpercentage +
        '% ' +
        mouseYpercentage +
        '%, #3498db, #9b59b6)'
    );
});

/*=============== ANIMATE TEXT ===============*/

window.addEventListener('DOMContentLoaded', (event) => {
    animate_text();
});

function animate_text() {
    let delay = 300,
        delay_start = 0,
        contents,
        letters;

    document.querySelectorAll('.animate_text').forEach(function (elem) {
        contents = elem.textContent.trim();
        elem.textContent = '';
        letters = contents.split('');
        elem.style.visibility = 'visible';

        letters.forEach(function (letter, index_1) {
            setTimeout(function () {
                elem.textContent += letter;
            }, delay_start + delay * index_1);
        });
        delay_start += delay * letters.length;
    });
};

/*=============== ENABLED DISABLED ===============*/

document.getElementById('launch_button').addEventListener('click', function () {
    let hello_container = document.getElementById('launch_container');
    let form = document.querySelector('form');
    let header = document.querySelector('header');

    setTimeout(function () {
        hello_container.classList.remove('enabled');
    }, 2200);

    setTimeout(function () {
        hello_container.classList.add('disabled');
    }, 3000);

    setTimeout(function () {
        form.classList.remove('disabled');
        header.classList.remove('disabled');
    }, 2700);

    setTimeout(function () {
        form.classList.add('enabled');
        header.classList.add('enabled');
    }, 2800);
});

/*=============== DELETE MESSAGES ===============*/

document.getElementById('delete_button').addEventListener('click', function () {
    let message = document.getElementsByClassName('message_container');

    for (let i = 0; i < message.length; i++) {
        message[i].classList.remove('enabled');
    };

    setTimeout(function () {
        for (let i = 0; i < message.length; i++) {
            message[i].classList.add('disabled');
        };
    }, 1000);
});

/*=============== TIME ===============*/

function startTime() {
    var today = new Date();
    var h = today.getHours();
    var m = today.getMinutes();
    m = checkTime(m);
    document.getElementById('time').textContent = h + ":" + m;
    var t = setTimeout(startTime, 500);
};

function checkTime(i) {
    if (i < 10) { i = "0" + i };
    return i;
};

startTime();

/*=============== CHAT IA ===============*/

const form = document.querySelector('form');
const chatContainer = document.querySelector('#chat_container');

let loadInterval;

function loader(element) {
    element.textContent = '';

    loadInterval = setInterval(() => {
        element.textContent += '.';

        if (element.textContent === '....') {
            element.textContent = '';
        }
    }, 300);
};

function typeText(element, text) {
    let index = 0;

    let interval = setInterval(() => {
        if (index < text.length) {
            element.innerHTML += text.charAt(index);
            index++;
        } else {
            clearInterval(interval);
        }
    }, 20);
};

function generateUniqueId() {
    const timestamp = Date.now();
    const randomNumber = Math.random();
    const hexadecimalString = randomNumber.toString(16);

    return `id-${timestamp}-${hexadecimalString}`;
};

function chatStripe(isAi, value, uniqueId) {
    return (
        `
        <div class="message_container ${isAi && 'ai'} enabled">
            <div id="message_content">
                <span id="profile">
                    <img src="${isAi ? 'assets/images/ai_icon.png' : 'assets/images/user_icon.png'}" alt="${isAi ? 'ai icon' : 'user icon'}" id="${isAi ? 'ai_icon' : 'user_icon'}">
                </span>
                <div class="message" id=${uniqueId}>${value}</div>
            </div>
        </div>
    `
    );
};

async function handleSubmit(e) {
    e.preventDefault();

    const data = new FormData(form);

    chatContainer.innerHTML += chatStripe(false, data.get('prompt'));

    form.reset();

    const uniqueId = generateUniqueId();
    chatContainer.innerHTML += chatStripe(true, ' ', uniqueId);

    chatContainer.scrollTop = chatContainer.scrollHeight;

    const messageDiv = document.getElementById(uniqueId);

    loader(messageDiv);

    const response = await fetch('http://localhost:5000', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            prompt: data.get('prompt')
        })
    });

    clearInterval(loadInterval);
    messageDiv.innerHTML = ' ';

    if (response.ok) {
        const data = await response.json();
        const parsedData = data.bot.trim();

        typeText(messageDiv, parsedData);
    } else {
        messageDiv.innerHTML = 'Something went wrong';
    };
};

form.addEventListener('submit', handleSubmit);
form.addEventListener('keyup', (e) => {
    if (e.keyCode === 13) {
        handleSubmit(e);
    };
});

/*=============== TEXTAREA HEIGHT ===============*/

$(document).ready(function () {
    $('textarea').on('input', function () {
        if (this.value === '') {
            this.style.height = '';
        } else {
            this.style.height = 'auto';
            var height = (this.scrollHeight > 300) ? 300 : this.scrollHeight;
            this.style.height = height + 'px';
        }
    });
});