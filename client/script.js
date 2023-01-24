/*=============== PREF ===============*/

document.getElementById('start').addEventListener('click', function () {
    let hello_container = document.querySelector('.hello_container');

    setTimeout(function () {
        hello_container.classList.add('removing');
    }, 2400);

    setTimeout(function () {
        hello_container.classList.add('delete');
    }, 2500);
});

window.addEventListener("DOMContentLoaded", (event) => {
    animate_text();
});

function animate_text() {
    let delay = 300,
        delay_start = 0,
        contents,
        letters;

    document.querySelectorAll(".animate_text").forEach(function (elem) {
        contents = elem.textContent.trim();
        elem.textContent = "";
        letters = contents.split("");
        elem.style.visibility = 'visible';

        letters.forEach(function (letter, index_1) {
            setTimeout(function () {
                elem.textContent += letter;
            }, delay_start + delay * index_1);
        });
        delay_start += delay * letters.length;
    });
}

/*=============== MOUSE ===============*/

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

/*=============== CHAT IA ===============*/

const form = document.querySelector('form')
const chatContainer = document.querySelector('#chat_container')

let loadInterval

function loader(element) {
    element.textContent = ''

    loadInterval = setInterval(() => {
        // Update the text content of the loading indicator
        element.textContent += '.';

        // If the loading indicator has reached three dots, reset it
        if (element.textContent === '....') {
            element.textContent = '';
        }
    }, 300);
}

function typeText(element, text) {
    let index = 0

    let interval = setInterval(() => {
        if (index < text.length) {
            element.innerHTML += text.charAt(index)
            index++
        } else {
            clearInterval(interval)
        }
    }, 20)
}

// generate unique ID for each message div of bot
// necessary for typing text effect for that specific reply
// without unique ID, typing text will work on every element
function generateUniqueId() {
    const timestamp = Date.now();
    const randomNumber = Math.random();
    const hexadecimalString = randomNumber.toString(16);

    return `id-${timestamp}-${hexadecimalString}`;
}

function chatStripe(isAi, value, uniqueId) {
    return (
        `
        <div class="wrapper ${isAi && 'ai'}" id="wrapper">
            <div class="chat">
                <div class="profile">
                  <lord-icon src="${isAi ? "https://cdn.lordicon.com/wrprwmwt.json" : "https://cdn.lordicon.com/dxjqoygy.json"}" trigger="loop" delay="${isAi ? 0 : 5000}" style="width:36px;height:36px" colors="primary:#121331,secondary:#000000"></lord-icon>
                </div>
                <div class="message" id=${uniqueId}>${value}</div>
            </div>
        </div>
    `
    )
}

const handleSubmit = async (e) => {
    e.preventDefault()

    const data = new FormData(form)

    // user's chatstripe
    chatContainer.innerHTML += chatStripe(false, data.get('prompt'))

    // to clear the textarea input 
    form.reset()

    // bot's chatstripe
    const uniqueId = generateUniqueId()
    chatContainer.innerHTML += chatStripe(true, ' ', uniqueId)

    // to focus scroll to the bottom 
    chatContainer.scrollTop = chatContainer.scrollHeight;

    // specific message div 
    const messageDiv = document.getElementById(uniqueId)

    // messageDiv.innerHTML = "..."
    loader(messageDiv)

    const response = await fetch('http://localhost:5000', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            prompt: data.get('prompt')
        })
    })

    clearInterval(loadInterval)
    messageDiv.innerHTML = ' '

    if (response.ok) {
        const data = await response.json();
        const parsedData = data.bot.trim() // trims any trailing spaces/'\n' 

        typeText(messageDiv, parsedData)
    } else {
        const err = await response.text()

        messageDiv.innerHTML = 'Something went wrong'
        alert(err)
    }
}

form.addEventListener('submit', handleSubmit)
form.addEventListener('keyup', (e) => {
    if (e.keyCode === 13) {
        handleSubmit(e)
    }
});

/*=============== DELETE CHAT IA ===============*/

document.getElementById('delete').addEventListener('click', function () {
    let wrapper = document.getElementsByClassName('wrapper');

    for (let i = 0; i < wrapper.length; i++) {
        wrapper[i].classList.add('removing');
    }

    setTimeout(function () {
        for (let i = 0; i < wrapper.length; i++) {
            wrapper[i].remove();
        }
    }, 500);

    setTimeout(function () {
        for (let i = 0; i < wrapper.length; i++) {
            wrapper[i].classList.add('delete');
        }
    }, 1000);
});