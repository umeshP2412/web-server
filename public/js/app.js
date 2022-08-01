
console.log('client side js file loaded!');

const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const messageOne = document.querySelector('#message-1');
const messageTwo = document.querySelector('#message-2');

// messageOne.textContent = ''

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()
    
    const location = search.value

    fetch('/weather?address='+location).then((response) => {
        response.json().then((data) => {
            if (data.error){
                messageOne.textContent = data.error;
                messageTwo.textContent = '';
                messageOne.style.color = 'red'
                console.log(data.error);
            }
            else{
                messageOne.textContent = data.forecast;
                messageTwo.textContent = data.atmosephere;
                messageOne.style.color = 'black'
                messageTwo.style.color = 'black'
                console.log(data.forecast);
                console.log(data.atmosephere);
            }
        }) 
    })

})