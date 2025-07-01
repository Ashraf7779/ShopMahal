// Global function for password strength checking
function checkPasswordStrength(password) {
    if (password.length < 8) return 'bad';
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasDigit = /\d/.test(password);
    const hasSpecial = /[!@#$%^&*]/.test(password); // Basic special characters
    const metCriteria = [hasUpperCase, hasLowerCase, hasDigit, hasSpecial].filter(Boolean).length;
  
    if (metCriteria === 4) return 'strong';
    if (metCriteria >= 2) return 'weak';
    return 'bad';
  }
  
  // Store users in localStorage (simplified, use a secure backend in production)
  let users = JSON.parse(localStorage.getItem('users')) || [];
  
  // Sign-up and sign-in logic
  document.addEventListener('DOMContentLoaded', () => {
    const signupForm = document.getElementById('signup-form');
    const signinForm = document.getElementById('signin-form');
    const adminForm = document.getElementById('admin-form');
    const clearBtn = document.getElementById('clear-btn'); // Target by ID
    const logoutLink = document.getElementById('logout');
  
    // Load persisted OTP and current user email from localStorage
    let generatedOTP = localStorage.getItem('generatedOTP');
    let currentUserEmail = localStorage.getItem('currentUserEmail');
  
    if (signupForm) {
      const passwordInput = document.getElementById('signup-password');
      const message = document.getElementById('signup-message');
      let strengthMessage = document.createElement('p');
      strengthMessage.id = 'password-strength';
      strengthMessage.style.marginTop = '0.5rem';
      strengthMessage.style.color = '#666';
      signupForm.appendChild(strengthMessage);
  
      // Real-time password strength checking
      passwordInput.addEventListener('input', function () {
        console.log('Signup password input event triggered, value:', this.value);
        const password = this.value;
        const strength = checkPasswordStrength(password);
        console.log('Signup password strength:', strength);
        switch (strength) {
          case 'bad':
            strengthMessage.textContent = 'Password is BAD (minimum 8 characters, include uppercase, lowercase, digit, special character).';
            strengthMessage.style.color = '#e74c3c';
            break;
          case 'weak':
            strengthMessage.textContent = 'Password is WEAK (meets length but missing some rules).';
            strengthMessage.style.color = '#f1c40f';
            break;
          case 'strong':
            strengthMessage.textContent = 'Password is STRONG!';
            strengthMessage.style.color = '#28a745';
            break;
          default:
            strengthMessage.textContent = '';
        }
      });
  
      signupForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const username = document.getElementById('signup-username').value;
        const email = document.getElementById('signup-email').value;
        const phone = document.getElementById('signup-phone')?.value || '';
        const password = document.getElementById('signup-password').value;
  
        if (users.some(user => user.email === email || user.username === username)) {
          message.textContent = 'Username or email already exists!';
          message.className = 'error';
          message.style.display = 'block';
          return;
        }
  
        if (!phone || phone.length < 10) {
          message.textContent = 'Please enter a valid phone number (at least 10 digits)!';
          message.className = 'error';
          message.style.display = 'block';
          return;
        }
  
        const strength = checkPasswordStrength(password);
        if (strength !== 'strong') {
          message.textContent = 'Password must be strong (8+ characters, uppercase, lowercase, digit, special character)!';
          message.className = 'error';
          message.style.display = 'block';
          return;
        }
  
        const timestamp = new Date().toLocaleString();
        users.push({ username, email, phone, password, timestamp });
        localStorage.setItem('users', JSON.stringify(users));
        message.textContent = 'Sign-up successful! Redirecting to Sign In...';
        message.className = 'success';
        message.style.display = 'block';
        setTimeout(() => {
          window.location.href = 'signin.html';
        }, 2000);
      });
    }
  
    if (signinForm) {
      signinForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const usernameEmail = document.getElementById('signin-username').value;
        const password = document.getElementById('signin-password').value;
        const message = document.getElementById('signin-message');
  
        const user = users.find(u => (u.username === usernameEmail || u.email === usernameEmail) && u.password === password);
  
        if (usernameEmail === 'Ashraf7779' && password === 'Ashrafsk#7779') {
          const adminUser = { username: 'Ashraf7779', email: 'Ashrafsk@gmail.com', password: 'Ashrafsk#7779', phone: '', timestamp: new Date().toLocaleString() };
          localStorage.setItem('currentUser', JSON.stringify(adminUser));
          message.textContent = 'Admin login successful! Redirecting to Admin Panel...';
          message.className = '';
          message.style.display = 'block';
          setTimeout(() => {
            window.location.href = 'admin.html';
          }, 2000);
        } else if (user) {
          message.textContent = 'Login successful! Redirecting to Home...';
          message.className = '';
          message.style.display = 'block';
          localStorage.setItem('currentUser', JSON.stringify(user));
          localStorage.removeItem('welcomeShown');
          setTimeout(() => {
            window.location.href = 'index.html';
          }, 2000);
        } else {
          message.textContent = 'Invalid username/email or password!';
          message.className = 'error';
          message.style.display = 'block';
        }
      });
    }
  
    if (adminForm) {
      adminForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const password = document.getElementById('admin-password').value;
        const adminMessage = document.getElementById('admin-message');
        const adminActions = document.getElementById('admin-actions');
  
        // Use the same admin credentials as sign-in for consistency
        const currentUser = JSON.parse(localStorage.getItem('currentUser'));
        if (currentUser && currentUser.username === 'Ashraf7779' && currentUser.password === 'Ashrafsk#7779') {
          adminMessage.textContent = 'Admin login successful!';
          adminMessage.style.color = '#28a745';
          adminMessage.style.display = 'block';
          adminForm.style.display = 'none';
          adminActions.style.display = 'block';
        } else {
          adminMessage.textContent = 'Access denied! Redirecting to Sign In...';
          adminMessage.style.color = '#e74c3c';
          adminMessage.style.display = 'block';
          setTimeout(() => {
            window.location.href = 'signin.html';
          }, 2000);
        }
      });
    }
  
    if (clearBtn) {
      clearBtn.addEventListener('click', () => {
        localStorage.setItem('users', JSON.stringify([]));
        const clearMessage = document.getElementById('clear-message');
        clearMessage.textContent = 'All registrations cleared successfully!';
        clearMessage.style.color = '#28a745';
        clearMessage.style.display = 'block';
        setTimeout(() => {
          clearMessage.textContent = '';
          clearMessage.style.display = 'none';
          if (window.updateUserStats) window.updateUserStats();
        }, 3000);
      });
    }
  
    if (logoutLink) {
      logoutLink.addEventListener('click', (e) => {
        e.preventDefault();
        localStorage.removeItem('currentUser');
        localStorage.removeItem('welcomeShown');
        window.location.href = 'signin.html';
      });
    }
  
    // Forgot Password Form Submission with phone validation
    const forgotForm = document.getElementById('forgot-form');
    if (forgotForm) {
      console.log('forgotForm element found in DOM');
      const phoneInput = document.getElementById('forgot-phone');
      const message = document.getElementById('forgot-message');
  
      // Prevent non-digit input in real-time
      phoneInput.addEventListener('keydown', function (e) {
        console.log('Key pressed:', e.key);
        if (
          e.key === 'Backspace' ||
          e.key === 'Delete' ||
          e.key === 'ArrowLeft' ||
          e.key === 'ArrowRight' ||
          e.key === 'Tab' ||
          (e.key >= '0' && e.key <= '9')
        ) {
          message.style.display = 'none';
          return;
        }
        e.preventDefault();
        message.textContent = 'Please enter only digits.';
        message.style.display = 'block';
        message.style.color = '#e74c3c'; // Ensure red color for this error
      });
  
      // Prevent pasting non-digit characters
      phoneInput.addEventListener('paste', function (e) {
        e.preventDefault();
        const pastedData = e.clipboardData.getData('text/plain').replace(/[^0-9]/g, '');
        console.log('Pasted data:', pastedData);
        if (pastedData) {
          document.execCommand('insertText', false, pastedData);
          message.style.display = 'none';
        } else {
          message.textContent = 'Please enter only digits.';
          message.style.display = 'block';
          message.style.color = '#e74c3c'; // Ensure red color for this error
        }
      });
  
      // Ensure only digits remain (as a fallback)
      phoneInput.addEventListener('input', function () {
        this.value = this.value.replace(/[^0-9]/g, '');
        message.style.display = 'none';
      });
  
      // Handle form submission
      forgotForm.addEventListener('submit', (e) => {
        e.preventDefault();
        console.log('Form submitted');
        const usernameEmail = document.getElementById('forgot-username').value;
        const phone = document.getElementById('forgot-phone').value;
        console.log('Form data:', { usernameEmail, phone, usersLength: users.length });
  
        if (!/^[0-9]*$/.test(phone) || phone.length < 10) {
          message.style.color = '#e74c3c';
          message.textContent = 'Please enter a valid phone number (digits only, at least 10 digits).';
          message.style.display = 'block';
          console.log('Phone validation failed:', phone);
          return;
        }
  
        const user = users.find(u => (u.username === usernameEmail || u.email === usernameEmail));
        console.log('User found by username/email:', user);
  
        if (user) {
          if (user.phone !== phone) {
            message.style.color = '#e74c3c';
            message.textContent = 'Wrong phone number, please enter the correct phone number.';
            message.style.display = 'block';
            console.log('Phone mismatch for user:', user);
            return;
          } else {
            generatedOTP = Math.floor(100000 + Math.random() * 900000).toString();
            currentUserEmail = usernameEmail;
            localStorage.setItem('generatedOTP', generatedOTP);
            localStorage.setItem('currentUserEmail', currentUserEmail);
            message.style.color = '#28a745';
            message.textContent = `Your OTP: ${generatedOTP} (For testing only)`;
            console.log('OTP generated:', generatedOTP);
            message.style.display = 'block';
            setTimeout(() => {
              message.style.display = 'none';
              window.location.href = 'reset_password.html';
            }, 5000);
          }
        } else {
          message.style.color = '#e74c3c';
          message.textContent = 'Invalid username/email or no matching user found.';
          message.style.display = 'block';
          console.log('No user found with:', { usernameEmail, phone });
        }
      });
    }
  
    // Reset Password Form Submission
    const resetForm = document.getElementById('reset-form');
    if (resetForm) {
      console.log('resetForm element found in DOM');
      const passwordInput = document.getElementById('reset-password');
      let strengthMessage = document.getElementById('password-strength');
      if (!strengthMessage) {
        strengthMessage = document.createElement('p');
        strengthMessage.id = 'password-strength';
        strengthMessage.style.marginTop = '0.5rem';
        strengthMessage.style.color = '#666';
        resetForm.appendChild(strengthMessage);
        console.log('Created new password-strength element');
      } else {
        console.log('Found existing password-strength element');
      }
  
      if (passwordInput) {
        console.log('reset-password input found, attaching event listener');
        passwordInput.addEventListener('input', function () {
          console.log('Input event triggered, value:', this.value);
          const password = this.value;
          const strength = checkPasswordStrength(password);
          console.log('Password strength calculated:', strength);
          switch (strength) {
            case 'bad':
              strengthMessage.textContent = 'Password is BAD (minimum 8 characters, include uppercase, lowercase, digit, special character).';
              strengthMessage.style.color = '#e74c3c';
              break;
            case 'weak':
              strengthMessage.textContent = 'Password is WEAK (meets length but missing some rules).';
              strengthMessage.style.color = '#f1c40f';
              break;
            case 'strong':
              strengthMessage.textContent = 'Password is STRONG!';
              strengthMessage.style.color = '#28a745';
              break;
            default:
              strengthMessage.textContent = '';
          }
        });
      } else {
        console.error('reset-password input not found');
      }
  
      resetForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const otp = document.getElementById('reset-otp').value;
        const newPassword = document.getElementById('reset-password').value;
        const confirmPassword = document.getElementById('reset-confirm-password').value;
        const message = document.getElementById('reset-message');
  
        const storedOTP = localStorage.getItem('generatedOTP');
        console.log('Entered OTP:', otp, 'Stored OTP:', storedOTP);
  
        if (otp === storedOTP) {
          if (newPassword === confirmPassword && newPassword.length >= 6) {
            const userIndex = users.findIndex(u => u.email === currentUserEmail || u.username === currentUserEmail);
            if (userIndex !== -1) {
              users[userIndex].password = newPassword;
              localStorage.setItem('users', JSON.stringify(users));
              message.style.color = '#28a745';
              message.textContent = 'Successfully changed your password! Redirecting to Sign In...';
              message.style.display = 'block';
              localStorage.removeItem('generatedOTP');
              localStorage.removeItem('currentUserEmail');
              setTimeout(() => {
                window.location.href = 'signin.html';
              }, 2000);
            } else {
              message.style.color = '#e74c3c';
              message.textContent = 'User not found for password update.';
              message.style.display = 'block';
            }
          } else {
            message.style.color = '#e74c3c';
            message.textContent = 'Passwords do not match or are too short (min 6 characters).';
            message.style.display = 'block';
          }
        } else {
          message.style.color = '#e74c3c';
          message.textContent = 'Invalid OTP.';
          message.style.display = 'block';
        }
      });
    }
  
    // Home page pop-up logic
    if (window.location.pathname.includes('index.html')) {
      const currentUser = JSON.parse(localStorage.getItem('currentUser'));
      const welcomeShown = localStorage.getItem('welcomeShown');
      if (currentUser && !welcomeShown) {
        const welcomeMessage = document.createElement('div');
        welcomeMessage.id = 'welcome-popup';
        welcomeMessage.innerHTML = `🎉 Welcome ${currentUser.username}! Enjoy our shopping platform!`;
        welcomeMessage.style.cssText = `
          position: fixed;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          background: rgba(40, 167, 69, 0.9);
          color: white;
          padding: 2rem 3rem;
          border-radius: 15px;
          box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
          z-index: 1000;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.2rem;
          animation: popInOut 4s ease forwards;
        `;
        document.body.appendChild(welcomeMessage);
  
        setTimeout(() => {
          welcomeMessage.remove();
        }, 2000);
        localStorage.setItem('welcomeShown', 'true');
      } else if (!currentUser) {
        window.location.href = 'signin.html';
      }
    }
  });
  
  // Animation for pop in and out
  const styleSheet = document.createElement('style');
  styleSheet.textContent = `
    @keyframes popInOut {
      0% { opacity: 0; transform: translate(-50%, -50%) scale(0.5); }
      10% { opacity: 1; transform: translate(-50%, -50%) scale(1); }
      90% { opacity: 1; transform: translate(-50%, -50%) scale(1); }
      100% { opacity: 0; transform: translate(-50%, -50%) scale(0.5); }
    }
  `;
  document.head.appendChild(styleSheet);
  
  // Toggle password visibility function
  window.togglePassword = function(inputId) {
    const passwordInput = document.getElementById(inputId);
    if (!passwordInput) return;
  
    const toggleIcon = passwordInput.nextElementSibling.querySelector('.toggle-password i');
    if (passwordInput.type === 'password') {
      passwordInput.type = 'text';
      toggleIcon.classList.remove('fa-eye-slash');
      toggleIcon.classList.add('fa-eye');
    } else {
      passwordInput.type = 'password';
      toggleIcon.classList.remove('fa-eye');
      toggleIcon.classList.add('fa-eye-slash');
    }
  };