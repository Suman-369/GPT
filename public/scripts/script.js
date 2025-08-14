// Theme Toggle and Chat Functionality
document.addEventListener('DOMContentLoaded', function() {
    const themeToggle = document.getElementById('themeToggle') || document.getElementById('theme-toggle');
    const themeIcon = document.getElementById('theme-icon');
    const html = document.documentElement;
    const body = document.body;
    const mobileMenuToggle = document.getElementById('mobileMenuToggle');
    const sidebar = document.querySelector('.sidebar');
    const tryPlusBtn = document.querySelector('.try-plus-button .upgrade-btn');
    const chatInput = document.getElementById('chatInput');
    const chatMessages = document.getElementById('chatMessages');

    // Check for saved theme preference or default to system preference
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    // Set initial theme
    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
        html.classList.add('dark-theme');
        body.classList.add('dark-theme');
        if (themeIcon) themeIcon.textContent = '☀️';
    } else {
        html.classList.remove('dark-theme');
        body.classList.remove('dark-theme');
        if (themeIcon) themeIcon.textContent = '🌙';
    }

    // Theme toggle functionality
    if (themeToggle) {
        themeToggle.addEventListener('click', function() {
            if (html.classList.contains('dark-theme')) {
                // Switch to light theme
                html.classList.remove('dark-theme');
                body.classList.remove('dark-theme');
                if (themeIcon) themeIcon.textContent = '🌙';
                localStorage.setItem('theme', 'light');
            } else {
                // Switch to dark theme
                html.classList.add('dark-theme');
                body.classList.add('dark-theme');
                if (themeIcon) themeIcon.textContent = '☀️';
                localStorage.setItem('theme', 'dark');
            }
        });
    }
    
    // Listen for system theme changes
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', function(e) {
        if (!localStorage.getItem('theme')) {
            if (e.matches) {
                html.classList.add('dark-theme');
                body.classList.add('dark-theme');
                if (themeIcon) themeIcon.textContent = '☀️';
            } else {
                html.classList.remove('dark-theme');
                body.classList.remove('dark-theme');
                if (themeIcon) themeIcon.textContent = '🌙';
            }
        }
    });
    
    // Try Plus button functionality
    if (tryPlusBtn) {
        tryPlusBtn.addEventListener('click', function() {
            console.log('Try Plus button clicked');
            // Add your upgrade logic here
            // window.location.href = '/upgrade';
        });
    }

    // Mobile menu toggle functionality
    mobileMenuToggle.addEventListener('click', function() {
        sidebar.classList.toggle('open');
    });

    // Close sidebar when clicking outside on mobile
    document.addEventListener('click', function(event) {
        if (window.innerWidth <= 768) {
            const isClickInsideSidebar = sidebar.contains(event.target);
            const isClickOnMobileToggle = mobileMenuToggle.contains(event.target);
            
            if (!isClickInsideSidebar && !isClickOnMobileToggle && sidebar.classList.contains('open')) {
                sidebar.classList.remove('open');
            }
        }
    });

    // Handle window resize
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768) {
            sidebar.classList.remove('open');
        }
    });

    // Chat input functionality
    const inputWrapper = document.querySelector('.input-wrapper');

    if (chatInput) {
        chatInput.addEventListener('focus', function() {
            inputWrapper.style.borderColor = 'var(--accent)';
        });

        chatInput.addEventListener('blur', function() {
            inputWrapper.style.borderColor = 'var(--chat-input-border)';
        });

        // Handle Enter key press
        chatInput.addEventListener('keypress', function(event) {
            if (event.key === 'Enter') {
                const message = chatInput.value.trim();
                if (message) {
                    // Add user message to chat
                    addUserMessage(message);
                    
                    // Simulate AI response (you can replace this with actual API call)
                    setTimeout(() => {
                        addAIResponse(message);
                    }, 1000);
                    
                    chatInput.value = '';
                }
            }
        });
    }

    // Add hover effects to chat items
    const chatItems = document.querySelectorAll('.chat-item');
    chatItems.forEach(item => {
        item.addEventListener('click', function() {
            // Remove active state from all items
            chatItems.forEach(chatItem => chatItem.classList.remove('active'));
            // Add active state to clicked item
            this.classList.add('active');
            
            // Here you can add functionality to load the selected chat
            console.log('Selected chat:', this.querySelector('span').textContent);
        });
    });

    // Add hover effects to navigation items
    const navItems = document.querySelectorAll('.nav-item');
    navItems.forEach(item => {
        item.addEventListener('click', function() {
            // Handle navigation item clicks
            const action = this.querySelector('span').textContent;
            console.log('Navigation action:', action);
            
            // Special handling for "New chat"
            if (action === 'New chat') {
                // Clear any active chat selection
                chatItems.forEach(chatItem => chatItem.classList.remove('active'));
                console.log('Starting new chat...');
            }
        });
    });

    // Smooth scrolling for sidebar
    const sidebarNav = document.querySelector('.sidebar-nav');
    if (sidebarNav) {
        sidebarNav.style.scrollBehavior = 'smooth';
    }

    // Add loading states for buttons
    const buttons = document.querySelectorAll('button');
    buttons.forEach(button => {
        button.addEventListener('click', function() {
            if (!this.classList.contains('theme-toggle-btn') && !this.classList.contains('mobile-menu-toggle')) {
                this.style.opacity = '0.7';
                setTimeout(() => {
                    this.style.opacity = '1';
                }, 200);
            }
        });
    });

    // Keyboard shortcuts
    document.addEventListener('keydown', function(event) {
        // Ctrl/Cmd + K to focus chat input
        if ((event.ctrlKey || event.metaKey) && event.key === 'k') {
            event.preventDefault();
            if (chatInput) {
                chatInput.focus();
            }
        }
        
        // Escape to close mobile sidebar
        if (event.key === 'Escape' && window.innerWidth <= 768) {
            sidebar.classList.remove('open');
        }
    });

    // Add smooth transitions for theme changes
    const style = document.createElement('style');
    style.textContent = `
        * {
            transition: background-color 0.3s ease, color 0.3s ease, border-color 0.3s ease;
        }
    `;
    document.head.appendChild(style);

    // Initialize tooltips for buttons
    const tooltipButtons = document.querySelectorAll('[title]');
    tooltipButtons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            const tooltip = document.createElement('div');
            tooltip.className = 'tooltip';
            tooltip.textContent = this.title;
            tooltip.style.cssText = `
                position: absolute;
                background: var(--primary-bg);
                color: var(--primary-color);
                padding: 8px 12px;
                border-radius: var(--border-radius);
                font-size: 12px;
                box-shadow: var(--shadow);
                z-index: 1000;
                pointer-events: none;
                opacity: 0;
                transition: opacity 0.2s ease;
            `;
            
            document.body.appendChild(tooltip);
            
            const rect = this.getBoundingClientRect();
            tooltip.style.left = rect.left + (rect.width / 2) - (tooltip.offsetWidth / 2) + 'px';
            tooltip.style.top = rect.top - tooltip.offsetHeight - 8 + 'px';
            
            setTimeout(() => tooltip.style.opacity = '1', 10);
            
            this.addEventListener('mouseleave', function() {
                tooltip.style.opacity = '0';
                setTimeout(() => tooltip.remove(), 200);
            });
        });
    });
});

// Add CSS for active chat item
const activeChatStyle = document.createElement('style');
activeChatStyle.textContent = `
    .chat-item.active {
        background: var(--accent) !important;
        color: white !important;
    }
    
    .chat-item.active i {
        color: white !important;
    }
    
    .tooltip {
        position: absolute;
        background: var(--primary-bg);
        color: var(--primary-color);
        padding: 8px 12px;
        border-radius: var(--border-radius);
        font-size: 12px;
        box-shadow: var(--shadow);
        z-index: 1000;
        pointer-events: none;
        opacity: 0;
        transition: opacity 0.2s ease;
    }
`;
document.head.appendChild(activeChatStyle);

// Chat Message Functions
function addUserMessage(message) {
    const messageDiv = document.createElement('div');
    messageDiv.className = 'message user';
    
    messageDiv.innerHTML = `
        <div class="user-message-bubble">
            ${message}
        </div>
    `;
    
    chatMessages.appendChild(messageDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

function addAIResponse(userMessage) {
    const messageDiv = document.createElement('div');
    messageDiv.className = 'message ai';
    
    // Generate AI response based on user message
    const response = generateAIResponse(userMessage);
    
    messageDiv.innerHTML = response;
    
    chatMessages.appendChild(messageDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

function generateAIResponse(userMessage) {
    const lowerMessage = userMessage.toLowerCase();
    
    if (lowerMessage.includes('hello') || lowerMessage.includes('hi')) {
        return `
            <div class="ai-message">
                <div class="ai-message-text">Hey! How's your evening going?</div>
                <div class="message-actions">
                    <button class="action-btn" title="Thumbs up"><i class="fas fa-thumbs-up"></i></button>
                    <button class="action-btn" title="Thumbs down"><i class="fas fa-thumbs-down"></i></button>
                    <button class="action-btn" title="Speak"><i class="fas fa-volume-up"></i></button>
                    <button class="action-btn" title="Edit"><i class="fas fa-edit"></i></button>
                    <button class="action-btn" title="Share"><i class="fas fa-share"></i></button>
                    <button class="action-btn" title="Refresh"><i class="fas fa-redo"></i></button>
                </div>
            </div>
        `;
    } else if (lowerMessage.includes('javascript') || lowerMessage.includes('js') || lowerMessage.includes('code')) {
        return `
            <div class="ai-message">
                <div class="ai-message-text">Here's the simplest way to print "Hello World" in JavaScript:</div>
                <div class="code-block">
                    <div class="code-header">
                        <span class="code-language">javascript</span>
                        <div class="code-actions">
                            <button class="action-btn">Copy</button>
                            <button class="action-btn">Edit</button>
                        </div>
                    </div>
                    <div class="code-content">console.log("Hello World");</div>
                </div>
                <div class="ai-message-text">If you want it to appear in the browser instead of the console:</div>
                <div class="code-block">
                    <div class="code-header">
                        <span class="code-language">javascript</span>
                        <div class="code-actions">
                            <button class="code-action-btn">Copy</button>
                            <button class="code-action-btn">Edit</button>
                        </div>
                    </div>
                    <div class="code-content">document.write("Hello World");</div>
                </div>
                <div class="ai-message-text">Do you want me to show you both console and alert popup versions too?</div>
                <div class="message-actions">
                    <button class="action-btn" title="Thumbs up"><i class="fas fa-thumbs-up"></i></button>
                    <button class="action-btn" title="Thumbs down"><i class="fas fa-thumbs-down"></i></button>
                    <button class="action-btn" title="Speak"><i class="fas fa-volume-up"></i></button>
                    <button class="action-btn" title="Edit"><i class="fas fa-edit"></i></button>
                    <button class="action-btn" title="Share"><i class="fas fa-share"></i></button>
                    <button class="action-btn" title="Refresh"><i class="fas fa-redo"></i></button>
                </div>
            </div>
        `;
    } else {
        return `
            <div class="ai-message">
                <div class="ai-message-text">I understand you said: "${userMessage}". How can I help you with that?</div>
                <div class="message-actions">
                    <button class="action-btn" title="Thumbs up"><i class="fas fa-thumbs-up"></i></button>
                    <button class="action-btn" title="Thumbs down"><i class="fas fa-thumbs-down"></i></button>
                    <button class="action-btn" title="Speak"><i class="fas fa-volume-up"></i></button>
                    <button class="action-btn" title="Edit"><i class="fas fa-edit"></i></button>
                    <button class="action-btn" title="Share"><i class="fas fa-share"></i></button>
                    <button class="action-btn" title="Refresh"><i class="fas fa-redo"></i></button>
                </div>
            </div>
        `;
    }
}
