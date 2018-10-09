const trafficOverviewLine = document.querySelector('#traffic-chart-line').getContext('2d');
const trafficOverviewBar = document.querySelector('#traffic-chart-bar').getContext('2d');
const mobileUsersChart = document.querySelector('#mobile-users-chart').getContext('2d');

const chartBtns = document.querySelector('.line-chart-header ul');

let randomData = [];
let dateLabels = [];

 /**********************
       LINE CHART
 **********************/
const lineChart = new Chart(trafficOverviewLine, {
    type: 'line',
    data: {
        labels: createDateLabels(7, 'days', 11),
        datasets: [{
            backgroundColor: 'rgba(115, 119, 191, 0.2)',
            borderColor: 'rgba(115, 119, 191, 1)',
            data: createRandomData(500, 2500, 11),
            borderWidth: 1,
            pointRadius: 5,
            pointBorderWidth: 2,
            pointBackgroundColor: '#fff'
        }]
    },
     options: {
        legend: {
            display: false
        },
        elements: {
            line: {
                tension: 0,
            }
        },
         responsive: true,
         maintainAspectRatio: false,
     }
});

/**********************
      BAR CHART
 *********************/
const barChart = new Chart(trafficOverviewBar, {
    type: 'bar',
    data: {
        labels: ["S", "M", "T", "W", "T", "F", "S"],
        datasets: [{
            backgroundColor: 'rgba(115, 119, 191)',
            borderWidth: 1,
            barThickness: 2,
            data: createRandomData(50, 250, 7)
        }]
    },
    options:{
        scales: {
            xAxes:[{
                barThickness: 30
            }]
        },
        legend: {
            display: false
        }
    },
    responsive: false,
    maintainAspectRatio: false
});

/***************************
     DOUGHNUT CHART
 **************************/
const mbUsersChart = new Chart(mobileUsersChart, {
    type: 'doughnut',
    data: {
        labels: ["Phones", "Tablets", "Desktop"],
        datasets: [{
            data: createRandomData(1, 10, 3),
            backgroundColor: [
                "#7377bf",
                "#81c98f",
                "#74b1bf",
            ],
        }]
    },
    options: {
        legend: {
            position: 'right',
            labels: {
                padding: 20,
                fontFamily: "'Open Sans'",
                fontSize: 12,
                fontColor: '#666'
            }
        }
    },
    responsive: false,
    maintainAspectRatio: false
});

chartBtns.addEventListener('click', (e) => {
    if(e.target.tagName === 'LI') {
        let clicked = e.target.textContent.toLowerCase();
        const isSelected = document.querySelector('.line-chart-header .selected');
        const numOfLabels = 11;

        // Empty arrays
        dateLabels = [];
        randomData = [];

        // Set random data
        lineChart.config.data.datasets[0].data = createRandomData(500, 2500, numOfLabels);

        switch (clicked) {
            case 'hourly':
                lineChart.config.data.labels = createDateLabels(1, 'hour', numOfLabels);
                e.target.classList.add('selected');
                break;
            case 'daily':
                lineChart.config.data.labels = createDateLabels(1, 'day', numOfLabels);
                e.target.classList.add('selected');
                break;
            case 'weekly':
                lineChart.config.data.labels = createDateLabels(7, 'days', numOfLabels);
                e.target.classList.add('selected');
                break;
            case 'monthly':
                lineChart.config.data.labels = createDateLabels(1, 'month', numOfLabels);
                e.target.classList.add('selected');
                break;
            default:
                return 0;
        }
        if(isSelected) {
            isSelected.classList.remove('selected');
        }
        e.target.classList.add('selected');
        lineChart.update();
    }
});


function createDateLabels(duration, measure, numOfLabels){
    let now = moment();
    for(let i = 0; i < numOfLabels; i++) {
            let newDate = moment(now).subtract(duration, measure).format();
            now = newDate;
            dateLabels.push(newDate);
    }
    if(duration === 7 && measure === 'days') {
        return formatTime('weekly');
    }
    if(duration === 1 && measure === 'hour') {
        return formatTime('hourly');
    }
    if(duration === 1 && measure === 'month') {
        return formatTime('monthly');
    }
    if(duration === 1 && measure === 'day') {
        return formatTime('daily');
    }
}

// Moment.js time and date parsing is inconsistent across browsers so
// this helper function is needed
function formatTime(duration) {
    const formattedLabels = [];

    for(let i = 0; i < dateLabels.length; i++) {
        if(duration === 'hourly') {
            let formattedTime = dateLabels[i].substr(11, 2);
            formattedLabels.push(formattedTime);
        }
        if(duration === 'weekly' || duration === 'daily') {
            let formattedTime = dateLabels[i].substr(5, 5);
            formattedLabels.push(formattedTime);
        }
        if(duration === 'monthly') {
            let formattedTime = dateLabels[i].substr(0, 7);
            formattedLabels.push(formattedTime);
        }
    }
    return formattedLabels.reverse();
}

function createRandomData(min, max, numOfDataPoints) {
    let tempArray = [];
    for(let i = 0; i < numOfDataPoints; i++) {
        let randomNum = Math.floor((Math.random() * max) + min);
        tempArray.push(randomNum);
    }
    randomData = tempArray;
    return randomData;
}

//Simulate button clicks to highlight items according to mockup
document.querySelectorAll('.line-chart-header li')[2].click();
document.querySelectorAll('nav img')[0].click();