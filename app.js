document.addEventListener('DOMContentLoaded', () => {
    initHeroChart();
    initMarketGrid();
    setupScrollAnimations();
});

function initHeroChart() {
    const canvas = document.getElementById('hero-chart');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    // Resize canvas
    canvas.width = canvas.offsetWidth * window.devicePixelRatio;
    canvas.height = canvas.offsetHeight * window.devicePixelRatio;
    ctx.scale(window.devicePixelRatio, window.devicePixelRatio);

    const data = [1400, 1405, 1398, 1410, 1408, 1420, 1412, 1425, 1418, 1435, 1428, 1445];
    const width = canvas.offsetWidth;
    const height = canvas.offsetHeight;
    const step = width / (data.length - 1);
    const padding = 20;

    // Draw Gradient Area
    const gradient = ctx.createLinearGradient(0, 0, 0, height);
    gradient.addColorStop(0, 'rgba(16, 185, 129, 0.4)');
    gradient.addColorStop(1, 'rgba(16, 185, 129, 0)');

    ctx.beginPath();
    ctx.moveTo(0, height);
    data.forEach((val, i) => {
        const x = i * step;
        const y = height - ((val - 1390) / 60) * (height - padding * 2) - padding;
        ctx.lineTo(x, y);
    });
    ctx.lineTo(width, height);
    ctx.fillStyle = gradient;
    ctx.fill();

    // Draw Line
    ctx.beginPath();
    ctx.strokeStyle = '#10b981';
    ctx.lineWidth = 3;
    ctx.lineJoin = 'round';
    data.forEach((val, i) => {
        const x = i * step;
        const y = height - ((val - 1390) / 60) * (height - padding * 2) - padding;
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
    });
    ctx.stroke();
}

function initMarketGrid() {
    const grid = document.querySelector('.market-grid');
    if (!grid) return;

    const stocks = [
        { name: 'CPALL', price: '58.50', change: '+0.75' },
        { name: 'PTT', price: '34.25', change: '-0.25' },
        { name: 'AOT', price: '64.00', change: '+1.25' },
        { name: 'GULF', price: '45.75', change: '+0.50' }
    ];

    stocks.forEach(stock => {
        const card = document.createElement('div');
        card.className = 'glass-card stock-item';
        const isUp = stock.change.startsWith('+');
        card.innerHTML = `
            <div class="stock-header">
                <strong>${stock.name}</strong>
                <span class="${isUp ? 'status-up' : 'status-down'}">${stock.change}</span>
            </div>
            <div class="stock-body">
                <span>฿${stock.price}</span>
            </div>
        `;
        grid.appendChild(card);
    });
}

function setupScrollAnimations() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.feature-card').forEach(card => {
        observer.observe(card);
    });
}
