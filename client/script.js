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
                    <img src="${isAi ? 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACQAAAAfCAQAAAAltKd9AAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAAAmJLR0QA/4ePzL8AAAAJcEhZcwAADsMAAA7DAcdvqGQAAAAHdElNRQfnARkAJxeO8oedAAADV0lEQVRIx52WS2hdVRSGv3Nyk7SRPOitJWm0UWmqiX0orQYU2qoE0VBEKlRRQSyKQQcadCJaHUgHitDYjqwiZGA7SSBIFRU6iIM0hZYabVCSELW1NZhH82jaPO75HNybmHtzbxP99+Ssvff597/WWWvtE7AEzj+UsJEqSrnGRfoYTE4GrBAREeKtNtnhkDMmnHXcbj/yXkmObMg4QMQw3MsBNvM7nZxngkLuoI4tDPOJh4NxSBC7sRqRKOabXvWCb3mb4bwG4+6zS20xnktTuhpsdNpTbk9acxh3dWql3C/Uo0l7OaI6B/3RGnGbdeIOz9pszHU2GLfEYyZ8eXmiAo855R6xwnP+YbWPeM2vLPB99R2x2j7PW7mUKkz76Ft5jBN8C1zlLwYZpZMztDNDL+P8BvTyOTXUL5URplk7KaGVGWCcDibYSZxpptnMei7TBcAJrlCf8V4GUcA9jHAupfAXAg5zJxGyn0ZOMw7AAP3UUEyGc4uJ8ilnlBGKeIm9nKKJy6n1PL7hPcp5m11MMsAGqjIVxdIU5RExyxaaiYIeYlQSARCxj/soZRPtdNDOk7zOK8y4KJ8XE80xyl0U+2twhBFOUsaHKUUh7TQT5wlOIm008CzfcTzCpbUn4kGvuzuVfg/b4kXr/d7nPGSPh6K1C3le64DnvX1xEqRHv5M8Hko9308NHzNAQGALLdQHZQv7eviATbyaNdgBQBc9PMV6YBXbGOMolygkPzjLT6xle2prFS+yjinuJj9XZmNTKoMr7XPYWnc7aZsxD6gHRSI8os456PM5SkXEm/3BER8VG9w3F/MBe/3MfCt82ltEzLPNEV9wayIvylVzIj7oBfuTIY9IhG6wdCHISaJWL1opUSo3siDZHaPHveQ5K5zvlkmH5kdoq39albNok0aABF/zJRuphJCQgIC0RhpSAEt9yuiZQVLuVBa51exnDVLELs4wugwRhLkC2MgbjDIHdPMuE8sS5cQaxniGPgKGuLJ0OTdRlBGIgAQD9P9rrowoRi1jTDHFdWaJgEIgzH1BZifqJsGnTDLBGCMM8zdD1JIgkdvzLAcIhexhB2uJE6eMUm5iNQHHeY2p4D8RzSOPAlZRRDGlxPiZsdyuZZ2/0a214p+I/4t/AM4Q0UvnwyYVAAAAJXRFWHRkYXRlOmNyZWF0ZQAyMDIzLTAxLTI1VDAwOjM5OjAwKzAwOjAwKZRL8AAAACV0RVh0ZGF0ZTptb2RpZnkAMjAyMy0wMS0yNVQwMDozOTowMCswMDowMFjJ80wAAAAASUVORK5CYII=' : 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACQAAAAkCAQAAABLCVATAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAAAmJLR0QA/4ePzL8AAAAJcEhZcwAADsMAAA7DAcdvqGQAAAAHdElNRQfnARkAJCFqZUHHAAACXUlEQVRIx+2VQUuUURSGnxktJaNRFFEhFKVEQaON4CYioh8gDLROf0Arf4IbB3SpO2tV+A9mqRsJNULIaWFYkJILxRmZsWy+p8WM08w4M36t6/125773ueece+93I9RRQKRGVKJ1/M21wz8KmCjDTNAPfOEdKYzwk5uEVh4Re0146KUOTdgrEoQHSUAwYFLdc9EXvnDRPTUZ9AcYHiO2+UZd9b4Uv3uuqm9sMyxKxCkvXA96ShjEHte9cOpvQFFfq89FjgH4VUA9V18ZDQ+KueWBQ+WNDRCHPHDLWC1Q7WPRwm1yZMuHowBZcrTRQmhQjmNitFPWDQHaiXFCLjwowzadPCkBLoFP6GSbTLgWFdr62LQpxyp2bcyUGR+H3LXipCbn1U2f2Spiq8/cVOdtLjiuUe7P+u0um/fMpAsumPTMvMu2X45nQuTT5ZxxCW457YZZVbNuOB3cEuPO2XVNTkGhqIS6VFy5w0njxp20oxhZUhM2Nby8Ij41Y8rRijaXf6OmzPi0YU7iDd+qM3JRw1iIOqO+9UZj0Ijf3bG7XuIidrvjd0cqQdFyEzBON2sc1TupEYAj1uhmnIqcq/2DwO51h4TdorMB6A6EuAJnRWeZqn/+h8B4qdCKl6SskLGis26rccR9087aV3f7+5w17b4jlQcgQvWacRbp4xNrvGefE84RiNBKBwM85BHDHPCSVWq+fH9ywglX/KZqYNa0p56aNmte1QNXnLh6caugQSHUxCAPGOUunbQWh8455isf+cBn8l7Zp8jVrCrUVPIH5BtNbFBmbdWd8F//sn4DMGzQWmZkj2UAAAAldEVYdGRhdGU6Y3JlYXRlADIwMjMtMDEtMjVUMDA6MzY6MjYrMDA6MDD5aiI6AAAAJXRFWHRkYXRlOm1vZGlmeQAyMDIzLTAxLTI1VDAwOjM2OjI2KzAwOjAwiDeahgAAAABJRU5ErkJggg=='}" alt="${isAi ? 'ai icon' : 'user icon'}" id="${isAi ? 'ai_icon' : 'user_icon'}">
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

    const response = await fetch('https://yu-cg2l.onrender.com', {
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