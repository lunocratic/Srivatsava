// Student Portal Application
console.log("Welcome to Student Portal");

// Demo credentials
const demoCredentials = {
    'STU001': 'password123',
    'STU002': 'student456',
    'admin': 'admin123'
};

// Get form and message elements
document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('loginForm');
    const messageDiv = document.getElementById('message');

    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const studentId = document.getElementById('studentId').value;
        const password = document.getElementById('password').value;

        // Validate credentials
        if (validateLogin(studentId, password)) {
            showMessage('Login successful! Welcome ' + studentId, 'success');
            setTimeout(() => {
                // Redirect to dashboard or home page
                console.log('Redirecting to dashboard...');
                // window.location.href = 'dashboard.html';
            }, 1500);
        } else {
            showMessage('Invalid Student ID or Password. Please try again.', 'error');
        }
    });
});

function validateLogin(studentId, password) {
    // Check if credentials match
    if (demoCredentials[studentId] && demoCredentials[studentId] === password) {
        return true;
    }
    return false;
}

function showMessage(text, type) {
    const messageDiv = document.getElementById('message');
    messageDiv.textContent = text;
    messageDiv.className = 'message ' + type;
    messageDiv.style.display = 'block';
    
    // Hide message after 3 seconds
    if (type === 'error') {
        setTimeout(() => {
            messageDiv.style.display = 'none';
        }, 3000);
    }
}

// Additional utility functions
function dashboard() {
    console.log("Dashboard view loaded");
}

function logout() {
    console.log("User logged out");
    // Clear session and redirect to login
}
