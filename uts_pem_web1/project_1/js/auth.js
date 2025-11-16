// Default credential for demonstration:
const defaultUsername = 'admin';
const defaultPassword = 'password123';
const usersKey = 'app_users';
const currentUserKey = 'current_user';

function isLoggedIn() {
    return localStorage.getItem('isLoggedIn') === '1';
}

function logout() {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem(currentUserKey);
    // redirect kembali ke halaman login
    window.location.href = 'login.html';
}

function authenticate(username, password) {
    // In production, send credentials to server. Here we do a simple check.
    if (username === defaultUsername && password === defaultPassword) return true;

    // Check stored users
    const users = getUsers();
    const user = users.find(u => u.username === username && u.password === password);
    return !!user;
}

function getUsers() {
    try {
        return JSON.parse(localStorage.getItem(usersKey) || '[]');
    } catch(e) {
        return [];
    }
}

function saveUsers(users) {
    localStorage.setItem(usersKey, JSON.stringify(users));
}

function findUser(username) {
    const users = getUsers();
    return users.find(u => u.username === username);
}

function registerUser(username, password) {
    const users = getUsers();
    users.push({ username: username, password: password });
    saveUsers(users);
}

// When used on login.html
if (location.pathname.endsWith('login.html')) {
    document.addEventListener('DOMContentLoaded', function() {
        // If user already logged in, go to main page
        if (isLoggedIn()) {
            window.location.href = 'index.html';
            return;
        }

        const form = document.getElementById('loginForm');
        const err = document.getElementById('loginError');

        form.addEventListener('submit', function(e) {
            e.preventDefault();
            const username = document.getElementById('username').value.trim();
            const password = document.getElementById('password').value;

            if (authenticate(username, password)) {
                localStorage.setItem('isLoggedIn', '1');
                localStorage.setItem(currentUserKey, username);
                window.location.href = 'index.html';
            } else {
                err.style.display = 'block';
                err.textContent = 'Username atau password salah. Coba lagi.';
            }
        });
    });
}

// Protect all pages except login: if not logged in, redirect to login
// Allow `login.html` and `register.html` without authentication.
if (!(location.pathname.endsWith('login.html') || location.pathname.endsWith('register.html'))) {
    document.addEventListener('DOMContentLoaded', function() {
        if (!isLoggedIn()) {
            window.location.href = 'login.html';
        }
    });
}

// Registration logic
if (location.pathname.endsWith('register.html')) {
    document.addEventListener('DOMContentLoaded', function() {
        const form = document.getElementById('registerForm');
        const err = document.getElementById('registerError');
        const success = document.getElementById('registerSuccess');

        form.addEventListener('submit', function(e) {
            e.preventDefault();
            err.style.display = 'none';
            success.style.display = 'none';

            const username = document.getElementById('regUsername').value.trim();
            const password = document.getElementById('regPassword').value;
            const password2 = document.getElementById('regPassword2').value;

            if (!username || !password) {
                err.style.display = 'block';
                err.textContent = 'Username dan password tidak boleh kosong.';
                return;
            }

            if (password !== password2) {
                err.style.display = 'block';
                err.textContent = 'Password tidak cocok.';
                return;
            }

            if (findUser(username) || username === defaultUsername) {
                err.style.display = 'block';
                err.textContent = 'Username sudah digunakan. Pilih username lain.';
                return;
            }

            registerUser(username, password);
            success.style.display = 'block';
            success.textContent = 'Registrasi berhasil! Anda akan langsung masuk.';

            // Auto-login after register
            localStorage.setItem('isLoggedIn', '1');
            localStorage.setItem(currentUserKey, username);
            setTimeout(function() {
                window.location.href = 'index.html';
            }, 900);
        });
    });
}