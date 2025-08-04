// js/charts.js

// Data for the charts (can be derived from sampleApplications in a real app)
const applicationsOverTimeData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    datasets: [{
        label: 'Applications Received',
        data: [65, 59, 80, 81, 56, 55, 70, 90, 70, 120, 130, 140], // Sample data for each month
        fill: true,
        backgroundColor: 'rgba(36, 68, 251, 0.2)', // var(--primary-color) with alpha
        borderColor: '#3366FF', // var(--primary-color)
        tension: 0.4,
        pointBackgroundColor: '#3366FF',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: '#3366FF'
    }]
};

const statusDistributionData = {
    labels: ['Approved', 'Under Review', 'Rejected'],
    datasets: [{
        data: [290, 145, 50,30], // Corresponding to the sample data counts
        backgroundColor: [
            '#4CAF50', // Green for Approved
            '#FFC107', // Amber for Under Review
            '#F44336' // Red for Rejected

        ],
        hoverOffset: 4
    }]
};

// Chart options
const commonChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
        legend: {
            display: false // We'll handle legend manually for custom look
        }
    }
};

// Function to initialize charts
function initializeCharts() {
    // Line Chart: Applications Over Time
    const applicationsOverTimeCtx = document.getElementById('applicationsOverTimeChart').getContext('2d');
    new Chart(applicationsOverTimeCtx, {
        type: 'line',
        data: applicationsOverTimeData,
        options: {
            ...commonChartOptions,
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });

    // Donut Chart: NOC Status Distribution
    const statusDistributionCtx = document.getElementById('statusDistributionChart').getContext('2d');
    new Chart(statusDistributionCtx, {
        type: 'doughnut', // Doughnut is a variant of pie chart
        data: statusDistributionData,
        options: {
            ...commonChartOptions,
            cutout: '70%', // Makes it a donut chart
        }
    });
}