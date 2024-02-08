const cityForm = document.querySelector('form');
const card = document.querySelector('.card');
const details = document.querySelector('.details');
const time = document.querySelector('img.time');
const forecast = new Forecast();

const updateUI = (data) => {

    const cityDets = data.cityDets;
    const weather = data.weather;
    
    details.innerHTML = `
        <div class="text-muted text-uppercase text-center details">
            <h5 class="my-3">${cityDets.EnglishName}</h5>
            <div class="my-3">${weather.WeatherText}</div>
            <div class="icon bg-light mx-auto text-center">
                <img src="" alt="">
            </div>
            <div class="temperature my-4">
                <span>${weather.Temperature.Imperial.Value}</span>
                <span>&deg;F</span>
                <span> = ${weather.Temperature.Metric.Value}</span>
                <span>&deg;C</span>
            </div>
            </div>
    `;

    const icon = document.querySelector('.icon img');
    const iconSrc = `img/weatherIcons/${weather.WeatherIcon}.png`;
    icon.setAttribute('src', iconSrc);

    let timeSrc = weather.IsDayTime ? 'img/day.webp' : 'img/night.webp';
    time.setAttribute('src', timeSrc);

    if(card.classList.contains('d-none')){
        card.classList.remove('d-none');
    }
};

cityForm.addEventListener('submit', e => {
    e.preventDefault();

    const city = cityForm.city.value.trim();
    cityForm.reset();

    forecast.updateCity(city)
    .then(data => updateUI(data))
    .catch(err => console.log(err));

    localStorage.setItem('city', city);
    
});

if(localStorage.getItem('city')){
    forecast.updateCity(localStorage.getItem('city'))
    .then(data => updateUI(data))
    .catch(err => console.log(err));
}