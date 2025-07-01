// Animate statistics counters
function animateCounters() {
    const capacityCounter = document.getElementById('capacity');
    const parksCounter = document.getElementById('parks');
    const turbinesCounter = document.getElementById('turbines');
    const percentageCounter = document.getElementById('percentage');

    const targetCapacity = 22;
    const targetParks = 800;
    const targetTurbines = 9000;
    const targetPercentage = 11;

    const duration = 2000; // Animation duration in ms
    const interval = 20; // Update interval in ms
    const steps = duration / interval;

    let currentStep = 0;

    const timer = setInterval(() => {
        currentStep++;
        
        // Update values
        capacityCounter.textContent = Math.floor((targetCapacity / steps) * currentStep);
        parksCounter.textContent = Math.floor((targetParks / steps) * currentStep);
        turbinesCounter.textContent = Math.floor((targetTurbines / steps) * currentStep);
        percentageCounter.textContent = Math.floor((targetPercentage / steps) * currentStep);

        if (currentStep >= steps) {
            // Final values
            capacityCounter.textContent = targetCapacity;
            parksCounter.textContent = targetParks;
            turbinesCounter.textContent = targetTurbines;
            percentageCounter.textContent = targetPercentage;
            clearInterval(timer);
        }
    }, interval);
}

// Initialize Google Map
function initMap() {
    const brazilCenter = { lat: -14.2350, lng: -51.9253 };
    const map = new google.maps.Map(document.getElementById('map'), {
        zoom: 5,
        center: brazilCenter
    });

    // Add markers for major wind farms
    const windFarms = [
        { name: 'Complexo Eólico Rio do Vento', location: { lat: -5.4806, lng: -36.0025 } },
        { name: 'Complexo Eólico Lagoa dos Ventos', location: { lat: -6.7667, lng: -41.3167 } },
        { name: 'Complexo Eólico Chapada do Piauí', location: { lat: -7.7333, lng: -41.4667 } },
        { name: 'Parque Eólico Osório', location: { lat: -29.9167, lng: -50.2667 } },
        { name: 'Complexo Eólico Alto Sertão', location: { lat: -9.6667, lng: -41.3333 } }
    ];

    windFarms.forEach(farm => {
        new google.maps.Marker({
            position: farm.location,
            map: map,
            title: farm.name
        });
    });
}

// Create wind energy growth chart
function createChart() {
    const ctx = document.getElementById('windChart').getContext('2d');
    const chart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['2010', '2012', '2014', '2016', '2018', '2020', '2022'],
            datasets: [{
                label: 'Capacidade Instalada (GW)',
                data: [1, 2.5, 5, 10, 14, 18, 22],
                backgroundColor: 'rgba(52, 152, 219, 0.2)',
                borderColor: 'rgba(52, 152, 219, 1)',
                borderWidth: 2,
                tension: 0.1,
                fill: true
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'top',
                },
                title: {
                    display: true,
                    text: 'Crescimento da Energia Eólica no Brasil',
                    font: {
                        size: 16
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: 'Capacidade (GW)'
                    }
                },
                x: {
                    title: {
                        display: true,
                        text: 'Ano'
                    }
                }
            }
        }
    });
}

// Form submission
document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form values
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;
    
    // Here you would typically send the data to a server
    // For this example, we'll just show an alert
    alert(`Obrigado, ${name}! Sua mensagem foi recebida. Entraremos em contato em breve.`);
    
    // Reset form
    this.reset();
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        window.scrollTo({
            top: targetElement.offsetTop - 80,
            behavior: 'smooth'
        });
    });
});

// Initialize everything when the page loads
window.addEventListener('DOMContentLoaded', () => {
    animateCounters();
    createChart();
    
    // Note: The Google Maps API will call initMap() when it's loaded
    // For this to work, you need to replace YOUR_API_KEY with an actual Google Maps API key
});