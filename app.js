// SCRIPT JUST FOR DOM MANIPULATION
const cityForm = document.querySelector('form');
const cityInfo = document.querySelector('.detail')
const card = document.querySelector('.card')
const time = document.querySelector('.time')
const icon = document.querySelector('.icon')


// update city
const updateCity = async (city)=>{

    const cityDets = await getCity(city)
    const weather = await getWeather(cityDets.Key)

    return {cityDets, weather}
}

// update UI
const updateUI = (data)=>{

    const { cityDets, weather } = data

    console.log(data);

    // displaying city Info
    cityInfo.innerHTML = `<h5 class="my-3">${cityDets.LocalizedName}</h5>
    <div class="my-3">${weather.WeatherText}</div>
    <div class="display-4 my-4">
        <span>${weather.Temperature.Metric.Value}</span>
        <span>&deg;C</span>
    </div>`

    // removing d-none class if present
    if (card.classList.contains('d-none')) {
        card.classList.remove('d-none')
    }

    // displaying day/night time img (with ternary operator)
    let timeSrc = weather.IsDayTime ? 'img/day.svg' : 'img/night.svg'
    time.setAttribute('src', timeSrc)

    // displaying icon
    let iconSrc = `img/icons/${weather.WeatherIcon}.svg`
    icon.firstElementChild.setAttribute('src', iconSrc)
}

cityForm.addEventListener('submit', (e)=>{
    e.preventDefault();

    const city  = cityForm.city.value.trim();
    cityForm.reset();

    updateCity(city)
        .then(data => updateUI(data))
        .catch(err =>console.log(err))

        localStorage.setItem('city', city)
});

if (localStorage.getItem('city')) {
    updateCity(localStorage.getItem('city'))
    .then(data => updateUI(data))
    .catch(err =>console.log(err))
}



