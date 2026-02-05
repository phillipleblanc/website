const CONTACT_API = 'https://phillipleblanc-contact.web.val.run/contact';

document.getElementById('contact-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const form = e.target;
    const button = form.querySelector('button');
    const status = document.getElementById('form-status');
    
    const data = {
        name: form.name.value,
        email: form.email.value,
        message: form.message.value
    };
    
    button.disabled = true;
    button.textContent = 'Sending...';
    status.className = '';
    status.style.display = 'none';
    
    try {
        const response = await fetch(CONTACT_API, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
        
        const result = await response.json();
        
        if (result.success) {
            status.className = 'success';
            status.textContent = 'Message sent! I\'ll get back to you soon.';
            form.reset();
        } else {
            status.className = 'error';
            status.textContent = result.error || 'Failed to send message. Please try again.';
        }
    } catch (error) {
        status.className = 'error';
        status.textContent = 'Failed to send message. Please try again.';
    } finally {
        button.disabled = false;
        button.textContent = 'Send Message';
        status.style.display = 'block';
    }
});
