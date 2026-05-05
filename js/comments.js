// Comments handler - manages loading and submitting comments
(function() {
    const SUPABASE_URL = "https://lsfkeyjvulvbherwmbbu.supabase.co";
    const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxzZmtleWp2dWx2YmhlcndtYmJ1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzUyNTI4ODQsImV4cCI6MjA5MDgyODg4NH0.gARtdg8pUgE_o4VJKhC3jB6UHxwXSX3xbdsH-vrpg5I";
    
    // Bad words filter
    const BAD_WORDS = ['fuck', 'bitch'];
    
    function containsBadWord(text) {
        const lowerText = text.toLowerCase();
        return BAD_WORDS.some(word => {
            // Match whole words only (word boundaries)
            const regex = new RegExp(`\\b${word}\\b`, 'gi');
            return regex.test(lowerText);
        });
    }
    
    // Load and display existing comments
    async function loadComments() {
        const commentsContainer = document.getElementById('comments-display');
        if (!commentsContainer) return;
        
        // Default to course 1 for now (can be enhanced with URL params)
        const courseId = 1;
        
        try {
            const response = await fetch(
                `${SUPABASE_URL}/rest/v1/comments?course_id=eq.${courseId}&order=created_at.desc`,
                {
                    headers: {
                        'apikey': SUPABASE_KEY,
                        'Authorization': `Bearer ${SUPABASE_KEY}`
                    }
                }
            );
            
            if (!response.ok) {
                console.error('Error loading comments:', response.statusText);
                return;
            }
            
            const comments = await response.json();
            
            if (comments.length === 0) {
                commentsContainer.innerHTML = '<p class="text-muted">No comments yet. Be the first to comment!</p>';
                return;
            }
            
            commentsContainer.innerHTML = comments.map(comment => `
                <div class="media mb-4">
                    <img src="img/user.jpg" alt="Image" class="img-fluid rounded-circle mr-3 mt-1" style="width: 45px;">
                    <div class="media-body">
                        <h6>${comment.author_name} <small><i>${new Date(comment.created_at).toLocaleDateString()} at ${new Date(comment.created_at).toLocaleTimeString()}</i></small></h6>
                        <p>${comment.comment_text}</p>
                    </div>
                </div>
            `).join('');
        } catch (error) {
            console.error('Error loading comments:', error);
        }
    }
    
    // Handle comment form submission
    document.addEventListener('DOMContentLoaded', function() {
        loadComments();
        
        const commentForm = document.getElementById('comment-form');
        if (commentForm) {
            commentForm.addEventListener('submit', async function(e) {
                e.preventDefault();
                
                const name = document.getElementById('comment-name').value.trim();
                const message = document.getElementById('comment-message').value.trim();
                const formMsg = document.getElementById('comment-form-msg');
                
                // Clear previous message
                formMsg.style.display = 'none';
                formMsg.textContent = '';
                
                // Validation
                if (!name || !message) {
                    formMsg.textContent = 'Please fill in all required fields';
                    formMsg.className = 'alert alert-danger';
                    formMsg.style.display = 'block';
                    return;
                }
                
                // Bad word filter
                if (containsBadWord(message)) {
                    formMsg.textContent = 'Your comment contains inappropriate language. Please revise and try again.';
                    formMsg.className = 'alert alert-danger';
                    formMsg.style.display = 'block';
                    return;
                }
                
                const courseId = 1;
                
                // Submit to Supabase
                try {
                    const response = await fetch(
                        `${SUPABASE_URL}/rest/v1/comments`,
                        {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                                'apikey': SUPABASE_KEY,
                                'Authorization': `Bearer ${SUPABASE_KEY}`,
                                'Prefer': 'return=minimal'
                            },
                            body: JSON.stringify({
                                author_name: name,
                                comment_text: message,
                                course_id: courseId
                            })
                        }
                    );
                    
                    if (!response.ok) {
                        throw new Error('Failed to submit comment');
                    }
                    
                    // Success
                    formMsg.textContent = 'Thank you! Your comment has been posted.';
                    formMsg.className = 'alert alert-success';
                    formMsg.style.display = 'block';
                    commentForm.reset();
                    
                    // Reload comments
                    setTimeout(() => {
                        loadComments();
                        formMsg.style.display = 'none';
                    }, 1500);
                } catch (error) {
                    formMsg.textContent = 'Error submitting comment. Please try again.';
                    formMsg.className = 'alert alert-danger';
                    formMsg.style.display = 'block';
                    console.error('Error inserting comment:', error);
                }
            });
        }
    });
})();
