// Newsletter subscription handler - shared across all pages
(function() {
    const SUPABASE_URL = "https://lsfkeyjvulvbherwmbbu.supabase.co";
    const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxzZmtleWp2dWx2YmhlcndtYmJ1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzUyNTI4ODQsImV4cCI6MjA5MDgyODg4NH0.gARtdg8pUgE_o4VJKhC3jB6UHxwXSX3xbdsH-vrpg5I";

    document.addEventListener('DOMContentLoaded', function() {
        const btn = document.getElementById('newsletterBtn');
        const input = document.getElementById('newsletterEmail');
        if (!btn || !input) return;

        btn.addEventListener('click', async function() {
            const email = input.value.trim();
            if (!email || !email.includes('@')) {
                input.style.borderColor = '#dc3545';
                return;
            }
            input.style.borderColor = '';
            btn.textContent = '...';
            btn.disabled = true;

            const res = await fetch(`${SUPABASE_URL}/rest/v1/newsletter_subscribers`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'apikey': SUPABASE_KEY,
                    'Authorization': `Bearer ${SUPABASE_KEY}`,
                    'Prefer': 'return=minimal'
                },
                body: JSON.stringify({ email })
            });

            if (res.status === 409) {
                btn.textContent = 'Already subscribed';
            } else if (res.ok) {
                btn.textContent = 'Subscribed!';
                input.value = '';
            } else {
                btn.textContent = 'Error';
            }
            setTimeout(() => { btn.textContent = 'Sign Up'; btn.disabled = false; }, 3000);
        });
    });
})();
