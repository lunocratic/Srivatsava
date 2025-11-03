document.addEventListener('DOMContentLoaded', () => {
    // Login/Signup page logic
    if (document.getElementById('login-form')) {
        const loginContainer = document.getElementById('login-container');
        const signupContainer = document.getElementById('signup-container');
        const showSignup = document.getElementById('show-signup');
        const showLogin = document.getElementById('show-login');
        const loginForm = document.getElementById('login-form');
        const signupForm = document.getElementById('signup-form');

        showSignup.addEventListener('click', (e) => {
            e.preventDefault();
            loginContainer.style.display = 'none';
            signupContainer.style.display = 'block';
        });

        showLogin.addEventListener('click', (e) => {
            e.preventDefault();
            signupContainer.style.display = 'none';
            loginContainer.style.display = 'block';
        });

        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            // In a real application, you would validate credentials against a server
            const email = document.getElementById('login-email').value;
            localStorage.setItem('loggedInUser', email);
            window.location.href = 'dashboard.html';
        });

        signupForm.addEventListener('submit', (e) => {
            e.preventDefault();
            // In a real application, you would send this data to a server
            const name = document.getElementById('signup-name').value;
            const email = document.getElementById('signup-email').value;
            const role = document.getElementById('signup-role').value;
            localStorage.setItem('loggedInUser', email);
            localStorage.setItem('userName', name);
            localStorage.setItem('userRole', role);
            alert('Sign up successful! You are now logged in.');
            window.location.href = 'dashboard.html';
        });
    }

    // Dashboard page logic
    if (document.getElementById('logout-btn')) {
        const userNameSpan = document.getElementById('user-name');
        const logoutBtn = document.getElementById('logout-btn');

        const loggedInUser = localStorage.getItem('loggedInUser');
        const userName = localStorage.getItem('userName');

        if (!loggedInUser) {
            window.location.href = 'index.html';
        }

        if (userName) {
            userNameSpan.textContent = userName;
        } else if(loggedInUser) {
            userNameSpan.textContent = loggedInUser;
        }


        logoutBtn.addEventListener('click', () => {
            localStorage.removeItem('loggedInUser');
            localStorage.removeItem('userName');
            localStorage.removeItem('userRole');
            window.location.href = 'index.html';
        });
    }
});

function openTab(evt, tabName) {
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tab-content");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("tab-link");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    document.getElementById(tabName).style.display = "block";
    evt.currentTarget.className += " active";
}

// File Upload Functionality
let selectedFiles = [];

function openUploadModal(assignmentName) {
    document.getElementById('uploadModal').style.display = 'block';
    document.getElementById('assignment-name').textContent = assignmentName;
    selectedFiles = [];
    updateFileList();
}

function closeUploadModal() {
    document.getElementById('uploadModal').style.display = 'none';
    document.getElementById('upload-form').reset();
    selectedFiles = [];
    updateFileList();
}

// Close modal when clicking outside
window.onclick = function(event) {
    const modal = document.getElementById('uploadModal');
    if (event.target === modal) {
        closeUploadModal();
    }
}

// File input change handler
if (document.getElementById('file-input')) {
    document.getElementById('file-input').addEventListener('change', function(e) {
        handleFiles(e.target.files);
    });

    // Drag and drop functionality
    const uploadArea = document.getElementById('upload-area');

    uploadArea.addEventListener('dragover', function(e) {
        e.preventDefault();
        uploadArea.classList.add('drag-over');
    });

    uploadArea.addEventListener('dragleave', function(e) {
        e.preventDefault();
        uploadArea.classList.remove('drag-over');
    });

    uploadArea.addEventListener('drop', function(e) {
        e.preventDefault();
        uploadArea.classList.remove('drag-over');
        handleFiles(e.dataTransfer.files);
    });

    // Form submission
    document.getElementById('upload-form').addEventListener('submit', function(e) {
        e.preventDefault();
        
        if (selectedFiles.length === 0) {
            alert('Please select at least one file to upload.');
            return;
        }

        const comments = document.getElementById('submission-comments').value;
        const assignmentName = document.getElementById('assignment-name').textContent;
        
        // Simulate upload (in real app, send to server)
        console.log('Uploading files:', selectedFiles);
        console.log('Comments:', comments);
        console.log('Assignment:', assignmentName);
        
        // Store submission in localStorage for demo
        const submissions = JSON.parse(localStorage.getItem('submissions') || '[]');
        submissions.push({
            assignment: assignmentName,
            files: selectedFiles.map(f => ({ name: f.name, size: f.size })),
            comments: comments,
            timestamp: new Date().toISOString()
        });
        localStorage.setItem('submissions', JSON.stringify(submissions));
        
        alert('Assignment submitted successfully!');
        closeUploadModal();
    });
}

function handleFiles(files) {
    for (let file of files) {
        // Check file size (max 10MB)
        if (file.size > 10 * 1024 * 1024) {
            alert(`File ${file.name} is too large. Maximum size is 10MB.`);
            continue;
        }
        
        // Check if file already added
        if (selectedFiles.find(f => f.name === file.name)) {
            alert(`File ${file.name} is already added.`);
            continue;
        }
        
        selectedFiles.push(file);
    }
    
    updateFileList();
}

function updateFileList() {
    const fileList = document.getElementById('file-list');
    
    if (selectedFiles.length === 0) {
        fileList.innerHTML = '';
        return;
    }
    
    fileList.innerHTML = selectedFiles.map((file, index) => `
        <div class="file-item">
            <div class="file-info">
                <span class="file-icon">📄</span>
                <div class="file-details">
                    <span class="file-name">${file.name}</span>
                    <span class="file-size">${formatFileSize(file.size)}</span>
                </div>
            </div>
            <button type="button" class="remove-file" onclick="removeFile(${index})">Remove</button>
        </div>
    `).join('');
}

function removeFile(index) {
    selectedFiles.splice(index, 1);
    updateFileList();
}

function formatFileSize(bytes) {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
}

// Navigation Functions
function viewCourse(courseId) {
    alert(`Opening ${courseId} course page...`);
    // In a real app, this would navigate to the course details page
    console.log('Viewing course:', courseId);
}

function performSearch() {
    const searchTerm = document.getElementById('dashboard-search')?.value;
    if (searchTerm) {
        alert(`Searching for: ${searchTerm}`);
        console.log('Search term:', searchTerm);
    }
}

function searchCourses() {
    const searchTerm = document.getElementById('course-search')?.value;
    if (searchTerm) {
        alert(`Searching courses for: ${searchTerm}`);
        console.log('Course search:', searchTerm);
    }
}

function toggleHelpMenu(event) {
    event.preventDefault();
    const helpMenu = `
📚 Help & Support

1. Getting Started Guide
2. How to Submit Assignments
3. Grading Policy
4. Technical Support
5. Contact Instructor

Need help? Contact: support@kluniversity.in
    `;
    alert(helpMenu);
}

function filterView(view) {
    console.log('Filtering view:', view);
    alert(`Showing ${view} courses`);
}

function sortCourses() {
    alert('Courses sorted alphabetically');
    console.log('Sorting courses...');
}

function toggleView() {
    alert('View toggled (Card/List view)');
}

function filterCourseCards() {
    const searchTerm = document.getElementById('course-filter')?.value.toLowerCase();
    const cards = document.querySelectorAll('.course-card');
    
    cards.forEach(card => {
        const title = card.querySelector('h3').textContent.toLowerCase();
        if (title.includes(searchTerm)) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
}

function filterCourses(status) {
    const cards = document.querySelectorAll('.course-card');
    const buttons = document.querySelectorAll('.filter-btn');
    
    buttons.forEach(btn => btn.classList.remove('active'));
    event.target.classList.add('active');
    
    cards.forEach(card => {
        if (status === 'all' || card.dataset.status === status) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
}

// Profile Page Functions
if (document.getElementById('profile-form')) {
    const userName = localStorage.getItem('userName') || 'Student';
    const userEmail = localStorage.getItem('loggedInUser') || 'student@kluniversity.in';
    
    document.getElementById('profile-name').textContent = userName;
    document.getElementById('profile-email').textContent = userEmail;
    document.getElementById('edit-name').value = userName;
    document.getElementById('edit-email').value = userEmail;
    document.getElementById('edit-phone').value = localStorage.getItem('userPhone') || '';
    
    document.getElementById('profile-form').addEventListener('submit', function(e) {
        e.preventDefault();
        const name = document.getElementById('edit-name').value;
        const email = document.getElementById('edit-email').value;
        const phone = document.getElementById('edit-phone').value;
        
        localStorage.setItem('userName', name);
        localStorage.setItem('loggedInUser', email);
        localStorage.setItem('userPhone', phone);
        
        document.getElementById('profile-name').textContent = name;
        document.getElementById('profile-email').textContent = email;
        
        alert('Profile updated successfully!');
    });
    
    document.getElementById('password-form').addEventListener('submit', function(e) {
        e.preventDefault();
        const newPassword = document.getElementById('new-password').value;
        const confirmPassword = document.getElementById('confirm-password').value;
        
        if (newPassword !== confirmPassword) {
            alert('Passwords do not match!');
            return;
        }
        
        if (newPassword.length < 6) {
            alert('Password must be at least 6 characters long!');
            return;
        }
        
        alert('Password updated successfully!');
        document.getElementById('password-form').reset();
    });
}

function handleAvatarUpload(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            document.getElementById('avatar-img').src = e.target.result;
            localStorage.setItem('userAvatar', e.target.result);
        };
        reader.readAsDataURL(file);
    }
}

// Update user name in top bar on all pages
if (document.getElementById('top-user-name')) {
    const userName = localStorage.getItem('userName');
    const userEmail = localStorage.getItem('loggedInUser');
    const userId = localStorage.getItem('userId') || generateUserId();
    
    if (userName) {
        document.getElementById('top-user-name').textContent = userName.toUpperCase() + ' - ' + userId;
    } else if (userEmail) {
        document.getElementById('top-user-name').textContent = userEmail.toUpperCase();
    } else {
        document.getElementById('top-user-name').textContent = 'Student Portal';
    }
}

// Generate a unique student ID if not exists
function generateUserId() {
    const userId = 'STU' + Math.floor(100000000 + Math.random() * 900000000);
    localStorage.setItem('userId', userId);
    return userId;
}

// Update student ID in profile page
if (document.getElementById('student-id-display')) {
    const userId = localStorage.getItem('userId') || generateUserId();
    document.getElementById('student-id-display').textContent = userId;
}