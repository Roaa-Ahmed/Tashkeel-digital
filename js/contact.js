// Contact Form Functionality
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    const submitButton = contactForm.querySelector('.submit-button');
    const buttonText = submitButton.querySelector('.button-text');
    
    // Form submission handler
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(contactForm);
        const data = Object.fromEntries(formData);
        
        // Validate form
        if (!validateForm(data)) {
            return;
        }
        
        // Show loading state
        showLoadingState();
        
        // Simulate form submission (replace with actual submission logic)
        setTimeout(() => {
            showSuccessMessage();
            resetForm();
        }, 2000);
    });
    
    // Form validation
    function validateForm(data) {
        let isValid = true;
        
        // Check required fields
        const requiredFields = ['name', 'email', 'subject', 'message'];
        requiredFields.forEach(field => {
            const input = contactForm.querySelector(`[name="${field}"]`);
            if (!data[field] || data[field].trim() === '') {
                showFieldError(input, 'This field is required');
                isValid = false;
            } else {
                clearFieldError(input);
            }
        });
        
        // Validate email
        if (data.email && !isValidEmail(data.email)) {
            const emailInput = contactForm.querySelector('[name="email"]');
            showFieldError(emailInput, 'Please enter a valid email address');
            isValid = false;
        }
        
        return isValid;
    }
    
    // Email validation
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    
    // Show field error
    function showFieldError(input, message) {
        clearFieldError(input);
        
        input.style.borderColor = '#ff6b35';
        input.style.boxShadow = '0 0 10px rgba(255, 107, 53, 0.3)';
        
        const errorDiv = document.createElement('div');
        errorDiv.className = 'field-error';
        errorDiv.style.cssText = `
            color: #ff6b35;
            font-size: 0.8rem;
            margin-top: 0.5rem;
            animation: fadeIn 0.3s ease;
        `;
        errorDiv.textContent = message;
        
        input.parentNode.appendChild(errorDiv);
    }
    
    // Clear field error
    function clearFieldError(input) {
        const existingError = input.parentNode.querySelector('.field-error');
        if (existingError) {
            existingError.remove();
        }
        
        input.style.borderColor = '';
        input.style.boxShadow = '';
    }
    
    // Show loading state
    function showLoadingState() {
        submitButton.classList.add('loading');
        submitButton.disabled = true;
        buttonText.textContent = 'Sending';
    }
    
    // Show success message
    function showSuccessMessage() {
        submitButton.classList.remove('loading');
        submitButton.disabled = false;
        buttonText.textContent = 'Message Sent!';
        submitButton.style.background = 'linear-gradient(135deg, #4CAF50, #45a049)';
        
        // Create success notification
        const notification = document.createElement('div');
        notification.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            background: linear-gradient(135deg, #4CAF50, #45a049);
            color: white;
            padding: 1rem 2rem;
            border-radius: 10px;
            box-shadow: 0 4px 15px rgba(76, 175, 80, 0.3);
            z-index: 10000;
            animation: slideInRight 0.5s ease;
        `;
        notification.innerHTML = `
            <div style="display: flex; align-items: center; gap: 0.5rem;">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M20 6L9 17l-5-5"/>
                </svg>
                <span>Message sent successfully! We'll get back to you soon.</span>
            </div>
        `;
        
        document.body.appendChild(notification);
        
        // Remove notification after 5 seconds
        setTimeout(() => {
            notification.style.animation = 'slideOutRight 0.5s ease';
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 500);
        }, 5000);
        
        // Reset button after 3 seconds
        setTimeout(() => {
            buttonText.textContent = 'Send Message';
            submitButton.style.background = '';
        }, 3000);
    }
    
    // Reset form
    function resetForm() {
        contactForm.reset();
        
        // Clear any remaining errors
        const errors = contactForm.querySelectorAll('.field-error');
        errors.forEach(error => error.remove());
        
        // Reset input styles
        const inputs = contactForm.querySelectorAll('.form-input');
        inputs.forEach(input => {
            input.style.borderColor = '';
            input.style.boxShadow = '';
        });
    }
    
    // Real-time validation
    const inputs = contactForm.querySelectorAll('.form-input');
    inputs.forEach(input => {
        input.addEventListener('blur', function() {
            const value = this.value.trim();
            
            if (this.hasAttribute('required') && !value) {
                showFieldError(this, 'This field is required');
            } else if (this.type === 'email' && value && !isValidEmail(value)) {
                showFieldError(this, 'Please enter a valid email address');
            } else {
                clearFieldError(this);
            }
        });
        
        input.addEventListener('input', function() {
            clearFieldError(this);
        });
    });
});

// Add CSS animations
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeIn {
        from { opacity: 0; transform: translateY(-10px); }
        to { opacity: 1; transform: translateY(0); }
    }
    
    @keyframes slideInRight {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    
    @keyframes slideOutRight {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(100%); opacity: 0; }
    }
`;
document.head.appendChild(style);