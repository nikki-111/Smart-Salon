document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('appointment-form');
    const submitBtn = form.querySelector('.submit-btn');
    const apiUrl = form.dataset.apiurl; // Get API URL from data attribute
    const homeUrl = form.dataset.homeurl; // Get home URL from data attribute

    // Minimum and maximum date constraints (today to 3 months in future)
    const today = new Date();
    const maxDate = new Date();
    maxDate.setMonth(today.getMonth() + 3, today.getDate());

    // Format dates for input[type="date"]
    const dateInput = document.getElementById('date');
    if (dateInput) {
        dateInput.min = formatDate(today);
        dateInput.max = formatDate(maxDate);
    }

    // Business hours validation (9 AM to 5 PM)
    const businessHours = {
        start: 9,   // 9 AM
        end: 17     // 5 PM
    };

    // Time validation when time input changes
    const timeInput = document.getElementById('time');
    if (timeInput) {
        timeInput.addEventListener('change', validateTime);
    }

    // Form submission handler
    form.addEventListener('submit', function(e) {
        e.preventDefault();

        if (validateForm()) {
            submitBtn.disabled = true;
            submitBtn.textContent = 'Booking...';

            // Prepare form data
            const formData = {
                name: document.getElementById('name').value,
                email: document.getElementById('email').value,
                phone: document.getElementById('phone').value,
                service: document.getElementById('service').value,
                date: document.getElementById('date').value,
                time: document.getElementById('time').value,
                notes: document.getElementById('notes').value
            };

            // Send data to server
            fetch(apiUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRFToken': getCookie('csrftoken'),
                },
                body: JSON.stringify(formData)
            })
            .then(response => {
                if (!response.ok) {
                    return response.json().then(err => { throw err; });
                }
                return response.json();
            })
            .then(data => {
                if (data.status === 'success') {
                    window.location.href = homeUrl;
                } else {
                    // Display form errors from backend
                    if (data.errors) {
                        displayBackendErrors(data.errors);
                    } else {
                        alert('Error: ' + (data.message || 'Unknown error'));
                    }
                }
            })
            .catch(error => {
                console.error('Error:', error);
                alert('An error occurred: ' + (error.message || 'Please try again later'));
            })
            .finally(() => {
                submitBtn.disabled = false;
                submitBtn.textContent = 'Book Appointment';
            });
        }
    });

    // Display backend validation errors
    function displayBackendErrors(errors) {
        // Clear all existing errors first
        document.querySelectorAll('.error-message').forEach(el => el.remove());
        document.querySelectorAll('.error').forEach(el => el.classList.remove('error'));

        // Display new errors
        for (const field in errors) {
            const input = document.getElementById(field);
            if (input) {
                const errorMessage = errors[field][0].message;
                showError(input, errorMessage);
            }
        }
    }

    // Form validation function
    function validateForm() {
        let isValid = true;

        // Validate required fields
        const requiredFields = form.querySelectorAll('[required]');
        requiredFields.forEach(field => {
            if (!field.value.trim()) {
                isValid = false;
                showError(field, 'This field is required');
            } else {
                clearError(field);
            }
        });

        // Validate email format
        const email = document.getElementById('email');
        if (email && email.value && !isValidEmail(email.value)) {
            isValid = false;
            showError(email, 'Please enter a valid email address');
        }

        // Validate phone number (basic validation)
        const phone = document.getElementById('phone');
        if (phone && phone.value && !isValidPhone(phone.value)) {
            isValid = false;
            showError(phone, 'Please enter a valid phone number');
        }

        // Validate time
        if (timeInput && !validateTime()) {
            isValid = false;
        }

        return isValid;
    }

    // Time validation helper
    function validateTime() {
        if (!timeInput) return true;
        const timeValue = timeInput.value;

        if (!timeValue) return true;

        const [hours, minutes] = timeValue.split(':').map(Number);
        const timeError = document.getElementById('time-error') || createTimeErrorElement();

        if (hours < businessHours.start || hours >= businessHours.end) {
            timeError.textContent = `We're only open from ${businessHours.start}:00 to ${businessHours.end}:00`;
            timeInput.parentNode.appendChild(timeError);
            return false;
        } else {
            if (timeError.parentNode) {
                timeError.parentNode.removeChild(timeError);
            }
            return true;
        }
    }

    function createTimeErrorElement() {
        const errorElement = document.createElement('div');
        errorElement.id = 'time-error';
        errorElement.className = 'error-message';
        return errorElement;
    }

    // Helper functions
    function isValidEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }

    function isValidPhone(phone) {
        return /^[\d\s\-()+]{10,}$/.test(phone);
    }

    function showError(field, message) {
        clearError(field);
        const errorElement = document.createElement('div');
        errorElement.className = 'error-message';
        errorElement.textContent = message;
        field.parentNode.appendChild(errorElement);
        field.classList.add('error');
    }

    function clearError(field) {
        const errorElement = field.parentNode.querySelector('.error-message');
        if (errorElement) {
            field.parentNode.removeChild(errorElement);
        }
        field.classList.remove('error');
    }

    function formatDate(date) {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    }

    // Helper function to get CSRF token
    function getCookie(name) {
        let cookieValue = null;
        if (document.cookie && document.cookie !== '') {
            const cookies = document.cookie.split(';');
            for (let i = 0; i < cookies.length; i++) {
                const cookie = cookies[i].trim();
                if (cookie.substring(0, name.length + 1) === (name + '=')) {
                    cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                    break;
                }
            }
        }
        return cookieValue;
    }
});