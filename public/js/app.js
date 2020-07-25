const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#location')
const messageTwo = document.querySelector('#forecast')

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()  //preventing default values to erase

    const location = search.value

    messageOne.textContent = 'Loading...'
    messageTwo.textContent = ''

    fetch('http://localhost:3000/weather?address=' + location).then( (response) => {
        response.json().then( (data) => {
            if (data.error) {
                messageOne.textContent = data.error    // console.log(data.error)
            } else {
                messageOne.textContent = data.location    // console.log(data.location)
                messageTwo.textContent = data.forecastData    // console.log(data.forecastData)
            }
        })
    })

})