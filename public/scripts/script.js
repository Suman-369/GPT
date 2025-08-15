


// Theme Toggle and Chat Functionality
document.addEventListener('DOMContentLoaded', function() {
    const themeToggle = document.getElementById('themeToggle') || document.getElementById('theme-toggle');
    const themeIcon = document.getElementById('theme-icon');
    const html = document.documentElement;
    const body = document.body;
    const mobileMenuToggle = document.getElementById('mobileMenuToggle');
    const sidebarToggle = document.getElementById('sidebarToggle');
    const sidebarToggleIcon = document.getElementById('sidebarToggleIcon');
    const sidebar = document.querySelector('.sidebar');
    const sidebarBackdrop = document.getElementById('sidebarBackdrop');
    const tryPlusBtn = document.querySelector('.try-plus-button .upgrade-btn');
    const chatInput = document.getElementById('chatInput');
    const chatMessages = document.getElementById('chatMessages');
    const sendBtn = document.getElementById('sendBtn');
    const chatContainer = document.querySelector('.chat-container');
    const welcomeMessage = document.getElementById('welcomeMessage');

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

    // Sidebar toggle functionality (desktop)
    if (sidebarToggle) {
        sidebarToggle.addEventListener('click', function() {
            sidebar.classList.toggle('collapsed');
            
            // Update icon based on state
            if (sidebar.classList.contains('collapsed')) {
                sidebarToggleIcon.className = 'fas fa-bars';
                sidebarToggle.title = 'Expand sidebar';
            } else {
                sidebarToggleIcon.className = 'fas fa-times';
                sidebarToggle.title = 'Collapse sidebar';
            }
            
            // Save state to localStorage
            localStorage.setItem('sidebarCollapsed', sidebar.classList.contains('collapsed'));
        });
    }

    // Mobile menu toggle functionality
    if (mobileMenuToggle) {
        mobileMenuToggle.addEventListener('click', function() {
            sidebar.classList.toggle('open');
            
            // Update mobile menu icon
            const mobileIcon = mobileMenuToggle.querySelector('i');
            if (sidebar.classList.contains('open')) {
                mobileIcon.className = 'fas fa-times';
                mobileMenuToggle.title = 'Close menu';
                // Show backdrop
                if (sidebarBackdrop) {
                    sidebarBackdrop.style.display = 'block';
                    setTimeout(() => sidebarBackdrop.classList.add('active'), 10);
                }
            } else {
                mobileIcon.className = 'fas fa-bars';
                mobileMenuToggle.title = 'Open menu';
                // Hide backdrop
                if (sidebarBackdrop) {
                    sidebarBackdrop.classList.remove('active');
                    setTimeout(() => sidebarBackdrop.style.display = 'none', 300);
                }
            }
        });
    }

    // Close sidebar when clicking outside on mobile
    document.addEventListener('click', function(event) {
        if (window.innerWidth <= 768) {
            const isClickInsideSidebar = sidebar.contains(event.target);
            const isClickOnMobileToggle = mobileMenuToggle && mobileMenuToggle.contains(event.target);
            const isClickOnBackdrop = sidebarBackdrop && sidebarBackdrop.contains(event.target);
            
            if ((!isClickInsideSidebar && !isClickOnMobileToggle) || isClickOnBackdrop) {
                if (sidebar.classList.contains('open')) {
                    sidebar.classList.remove('open');
                    
                    // Reset mobile menu icon
                    if (mobileMenuToggle) {
                        const mobileIcon = mobileMenuToggle.querySelector('i');
                        mobileIcon.className = 'fas fa-bars';
                        mobileMenuToggle.title = 'Open menu';
                    }
                    
                    // Hide backdrop
                    if (sidebarBackdrop) {
                        sidebarBackdrop.classList.remove('active');
                        setTimeout(() => sidebarBackdrop.style.display = 'none', 300);
                    }
                }
            }
        }
    });

    // Handle window resize
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768) {
            // On desktop, remove mobile open state
            sidebar.classList.remove('open');
            
            // Reset mobile menu icon
            if (mobileMenuToggle) {
                const mobileIcon = mobileMenuToggle.querySelector('i');
                mobileIcon.className = 'fas fa-bars';
                mobileMenuToggle.title = 'Open menu';
            }
            
            // Hide backdrop
            if (sidebarBackdrop) {
                sidebarBackdrop.classList.remove('active');
                sidebarBackdrop.style.display = 'none';
            }
        } else {
            // On mobile, remove collapsed state
            sidebar.classList.remove('collapsed');
            
            // Reset sidebar toggle icon
            if (sidebarToggleIcon) {
                sidebarToggleIcon.className = 'fas fa-times';
                sidebarToggle.title = 'Toggle sidebar';
            }
        }
    });

    // Load saved sidebar state on page load
    const savedSidebarState = localStorage.getItem('sidebarCollapsed');
    if (savedSidebarState === 'true' && window.innerWidth > 768) {
        sidebar.classList.add('collapsed');
        if (sidebarToggleIcon) {
            sidebarToggleIcon.className = 'fas fa-bars';
            sidebarToggle.title = 'Expand sidebar';
        }
    }

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
            if (event.key === 'Enter' && !event.shiftKey) {
                event.preventDefault();
                sendMessage();
            }
        });

        // Send button functionality
        if (sendBtn) {
            sendBtn.addEventListener('click', function() {
                sendMessage();
            });
        }

        // Function to send message
        function sendMessage() {
            const message = chatInput.value.trim();
            if (message) {
                // Disable send button temporarily
                sendBtn.disabled = true;
                sendBtn.style.opacity = '0.6';
                
                // Add user message to chat
                socket.emit("ai-message", message);
                addUserMessage(message);
                
                // Clear input
                chatInput.value = '';
                
                // Add has-messages class to move input to bottom and hide welcome message smoothly
                chatContainer.classList.add('has-messages');
                // Remove welcome message from DOM so content starts at top
                if (welcomeMessage && welcomeMessage.parentNode) {
                    welcomeMessage.parentNode.removeChild(welcomeMessage);
                }
                
                // AI response will be handled from server via socket "ai-message-response"
            }
        }

        // Fast progressive streaming support
        let assemblingMessage = '';
        socket.on("ai-message-response-start", () => {
            assemblingMessage = '';
            // pre-create a message bubble to stream into
            const chatMessagesEl = document.getElementById('chatMessages');
            const wrapper = document.createElement('div');
            wrapper.className = 'message ai streaming';
            wrapper.innerHTML = `<div class="ai-message"><div class="ai-message-text" id="streaming-text"></div></div>`;
            chatMessagesEl.appendChild(wrapper);
        });
        socket.on("ai-message-response-chunk", ({ text }) => {
            assemblingMessage += text;
            const target = document.getElementById('streaming-text');
            if (target) {
                target.textContent = assemblingMessage;
                smoothScrollToBottom();
            }
        });
        socket.on("ai-message-response-end", () => {
            // Replace streaming bubble with rich rendered content
            const target = document.getElementById('streaming-text');
            if (target) {
                const streamingWrapper = target.parentElement.parentElement; // .message.ai.streaming
                streamingWrapper.remove();
            }
            addAITextMessage(assemblingMessage);
            assemblingMessage = '';
            if (sendBtn) {
                sendBtn.disabled = false;
                sendBtn.style.opacity = '1';
            }
        });
        socket.on("ai-message-response", (message) => {
            // Fallback for non-streaming
            addAITextMessage(message);
            if (sendBtn) {
                sendBtn.disabled = false;
                sendBtn.style.opacity = '1';
            }
        });

            // Auto-resize input field
    chatInput.addEventListener('input', function() {
        this.style.height = 'auto';
        this.style.height = Math.min(this.scrollHeight, 120) + 'px';
        
        // Enable/disable send button based on input
        if (this.value.trim()) {
            sendBtn.disabled = false;
            sendBtn.style.opacity = '1';
        } else {
            sendBtn.disabled = true;
            sendBtn.style.opacity = '0.6';
        }
    });

    // Enhanced scroll behavior for chat messages
    chatMessages.addEventListener('scroll', function() {
        // Add smooth momentum scrolling
        this.style.scrollBehavior = 'smooth';
    });

    // Prevent scroll chaining on mobile
    chatMessages.addEventListener('touchstart', function() {
        this.style.overscrollBehavior = 'contain';
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
    const chatMessagesEl = document.getElementById('chatMessages');
    if (!chatMessagesEl) return;
    const messageDiv = document.createElement('div');
    messageDiv.className = 'message user';
    messageDiv.innerHTML = `
        <div class="user-message-bubble">
            ${escapeHtml(String(message))}
        </div>
    `;
    chatMessagesEl.appendChild(messageDiv);
    smoothScrollToBottom(chatMessagesEl);
}

function addAIResponse(userMessage) {
    const chatMessagesEl = document.getElementById('chatMessages');
    if (!chatMessagesEl) return;
    const messageDiv = document.createElement('div');
    messageDiv.className = 'message ai';
    const response = generateAIResponse(userMessage);
    messageDiv.innerHTML = response;
    chatMessagesEl.appendChild(messageDiv);
    smoothScrollToBottom(chatMessagesEl);
}

// Add an AI message using plain text from the server (no manual/generic generation)
function addAITextMessage(text) {
    const chatMessagesEl = document.getElementById('chatMessages');
    if (!chatMessagesEl) return;
    const messageDiv = document.createElement('div');
    messageDiv.className = 'message ai';
    const rendered = renderMarkdownRich(String(text));
    messageDiv.innerHTML = `
        <div class="ai-message">${rendered}
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
    chatMessagesEl.appendChild(messageDiv);
    enhanceCodeBlocks(messageDiv);
    smoothScrollToBottom(chatMessagesEl);
}

// Render markdown and transform <pre><code> into styled code blocks with header, language and actions
function renderMarkdownRich(markdownText) {
    try {
        if (typeof marked !== 'undefined') {
            marked.setOptions({ mangle: false, headerIds: false, breaks: true });
            const raw = marked.parse(markdownText);
            const safe = typeof DOMPurify !== 'undefined' ? DOMPurify.sanitize(raw) : raw;
            // Wrap non-code paragraphs with .ai-message-text for better spacing
            const container = document.createElement('div');
            container.innerHTML = safe;
            // Convert code blocks to custom layout
            container.querySelectorAll('pre > code').forEach(codeEl => {
                const pre = codeEl.parentElement;
                const languageMatch = (codeEl.className || '').match(/language-([\w#+-]+)/i);
                const lang = languageMatch ? languageMatch[1] : 'text';
                const codeText = codeEl.textContent;
                const wrapper = document.createElement('div');
                wrapper.className = 'code-block';
                wrapper.innerHTML = `
                    <div class="code-header">
                        <span class="code-language">${lang}</span>
                        <div class="code-actions">
                            <button class="code-action-btn copy-btn" title="Copy">Copy</button>
                            <button class="code-action-btn edit-btn" title="Edit">Edit</button>
                        </div>
                    </div>
                    <div class="code-content"><pre><code class="language-${lang}">${escapeHtml(codeText)}</code></pre></div>
                `;
                pre.replaceWith(wrapper);
            });
            // Add class to regular paragraphs
            container.querySelectorAll('p, h1, h2, h3, h4, h5, h6, ul, ol, blockquote').forEach(el => {
                if (!el.closest('.code-block')) {
                    el.classList.add('ai-message-text');
                }
            });
            return container.innerHTML;
        }
    } catch (e) {
        console.error('Markdown render error', e);
    }
    // Fallback to escaped plain text
    return `<div class="ai-message-text">${escapeHtml(markdownText)}</div>`;
}

// Attach handlers for Copy/Edit on code blocks
function enhanceCodeBlocks(scopeEl) {
    const root = scopeEl || document;
    root.querySelectorAll('.code-block').forEach(block => {
        const copyBtn = block.querySelector('.copy-btn');
        const editBtn = block.querySelector('.edit-btn');
        const codeContainer = block.querySelector('.code-content');
        // Apply syntax highlighting if hljs is present
        try {
            if (typeof hljs !== 'undefined') {
                codeContainer.querySelectorAll('pre code').forEach(code => hljs.highlightElement(code));
            }
        } catch (_) {}
        if (copyBtn) {
            copyBtn.addEventListener('click', async () => {
                const text = codeContainer.innerText;
                try {
                    await navigator.clipboard.writeText(text);
                    const prev = copyBtn.textContent;
                    copyBtn.textContent = 'Copied!';
                    setTimeout(() => (copyBtn.textContent = prev), 1200);
                } catch (_) {}
            });
        }
        if (editBtn) {
            editBtn.addEventListener('click', () => {
                const pre = codeContainer.querySelector('pre');
                const isEditable = pre.getAttribute('contenteditable') === 'true';
                pre.setAttribute('contenteditable', isEditable ? 'false' : 'true');
                pre.focus();
                editBtn.textContent = isEditable ? 'Edit' : 'Done';
            });
        }
    });
}

// Enhanced smooth scrolling function
function smoothScrollToBottom(targetEl) {
    const chatMessagesEl = targetEl || document.getElementById('chatMessages');
    if (!chatMessagesEl) return;
    const scrollTarget = chatMessagesEl.scrollHeight - chatMessagesEl.clientHeight;
    chatMessagesEl.scrollTo({
        top: scrollTarget,
        behavior: 'smooth'
    });
    if (!('scrollBehavior' in document.documentElement.style)) {
        const start = chatMessagesEl.scrollTop;
        const change = scrollTarget - start;
        const duration = 500;
        let startTime = null;
        function animateScroll(currentTime) {
            if (startTime === null) startTime = currentTime;
            const timeElapsed = currentTime - startTime;
            const progress = Math.min(timeElapsed / duration, 1);
            const easeOut = 1 - Math.pow(1 - progress, 3);
            chatMessagesEl.scrollTop = start + change * easeOut;
            if (timeElapsed < duration) {
                requestAnimationFrame(animateScroll);
            }
        }
        requestAnimationFrame(animateScroll);
    }
}

// Basic HTML escape to avoid injecting raw HTML from the server into the DOM
function escapeHtml(unsafe) {
    return String(unsafe)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;');
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
