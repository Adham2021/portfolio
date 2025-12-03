// Mobile menu toggle
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');

menuToggle.addEventListener('click', () => {
    navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        if(targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if(targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
            
            // Close mobile menu if open
            if(window.innerWidth <= 768) {
                navLinks.style.display = 'none';
            }
        }
    });
});

// Project modals
const projectButtons = document.querySelectorAll('.btn-project-details');
const modal = document.getElementById('projectModal');
const closeModal = document.querySelector('.close-modal');
const modalBody = document.getElementById('modalBody');

const projectDetails = {
    flowx: `
        <h2>FlowX Backend System</h2>
        <p class="modal-subtitle">A comprehensive CRM and document management platform</p>
        
        <div class="modal-section">
            <h3><i class="fas fa-bullseye"></i> Purpose</h3>
            <p>Enterprise multi-tenant solution for client relationship management, digital document signing, and business communication.</p>
        </div>
        
        <div class="modal-section">
            <h3><i class="fas fa-cogs"></i> Technologies</h3>
            <div class="tech-stack">
                <span>.NET 9 with ASP.NET Core</span>
                <span>Entity Framework Core 8.0</span>
                <span>Azure Blob Storage</span>
                <span>Docker Containerization</span>
                <span>JWT Authentication</span>
                <span>Redis Caching</span>
            </div>
        </div>
        
        <div class="modal-section">
            <h3><i class="fas fa-star"></i> Key Features</h3>
            <ul>
                <li><strong>Multi-Tenant Architecture:</strong> Company-based data isolation</li>
                <li><strong>Digital Document Signing:</strong> Create, manage, and track signature forms</li>
                <li><strong>WhatsApp Integration:</strong> Automated chatbot with session management</li>
                <li><strong>Role-Based Access Control:</strong> Admin, Employee, Manager roles</li>
                <li><strong>Multi-Channel Communication:</strong> Email, SMS, WhatsApp notifications</li>
                <li><strong>Clean Architecture:</strong> Repository pattern, dependency injection</li>
            </ul>
        </div>
        
        <div class="modal-section">
            <h3><i class="fas fa-project-diagram"></i> Architecture</h3>
            <div class="architecture-diagram">
                <div class="arch-layer">
                    <h4>📦 Controllers Layer</h4>
                    <p>Auth, Clients, Forms, Events, Communication, Marketing</p>
                </div>
                <div class="arch-layer">
                    <h4>📦 Services Layer</h4>
                    <p>Business logic with DTO mapping</p>
                </div>
                <div class="arch-layer">
                    <h4>📦 Repository Layer</h4>
                    <p>Data access abstraction</p>
                </div>
                <div class="arch-layer">
                    <h4>📦 Models Layer</h4>
                    <p>Entity Framework models</p>
                </div>
            </div>
        </div>
        
        <div class="modal-section">
            <h3><i class="fas fa-lightbulb"></i> Development Notes</h3>
            <p>Built with clean architecture principles. Utilized AI tools for code generation and optimization. Demonstrates production-ready patterns including rate limiting, health checks, and internationalization support.</p>
        </div>
    `,
    
    whatsapp: `
        <h2>WhatsApp Booking Assistant</h2>
        <p class="modal-subtitle">Intelligent multilingual appointment booking chatbot</p>
        
        <div class="modal-section">
            <h3><i class="fas fa-bullseye"></i> Purpose</h3>
            <p>Enable businesses to manage appointments through WhatsApp with natural language processing and conflict detection.</p>
        </div>
        
        <div class="modal-section">
            <h3><i class="fas fa-cogs"></i> Technologies</h3>
            <div class="tech-stack">
                <span>Node.js with Express</span>
                <span>TypeScript</span>
                <span>OpenAI GPT-4o-mini</span>
                <span>Redis</span>
                <span>Azure Blob Storage</span>
                <span>Baileys WhatsApp Library</span>
            </div>
        </div>
        
        <div class="modal-section">
            <h3><i class="fas fa-star"></i> Key Features</h3>
            <ul>
                <li><strong>Multilingual NLP:</strong> Arabic, Hebrew, English support with GPT classification</li>
                <li><strong>Conflict Detection:</strong> Automatic alternative slot suggestions</li>
                <li><strong>Session Management:</strong> Persistent WhatsApp sessions in Azure Blob</li>
                <li><strong>Rate Limiting:</strong> Redis-based user blocking for spam prevention</li>
                <li><strong>Natural Language Booking:</strong> Conversational flow without rigid forms</li>
                <li><strong>Timezone Handling:</strong> Precise Jerusalem timezone conversion</li>
            </ul>
        </div>
        
        <div class="modal-section">
            <h3><i class="fas fa-project-diagram"></i> System Architecture</h3>
            <div class="architecture-diagram">
                <div class="arch-layer">
                    <h4>🔄 WhatsApp Client Layer</h4>
                    <p>Baileys library with session persistence</p>
                </div>
                <div class="arch-layer">
                    <h4>🧠 AI Processing Layer</h4>
                    <p>GPT-4o-mini for intent classification and response generation</p>
                </div>
                <div class="arch-layer">
                    <h4>💾 Data Layer</h4>
                    <p>Redis for caching, Azure Blob for sessions</p>
                </div>
                <div class="arch-layer">
                    <h4>🌐 API Layer</h4>
                    <p>REST endpoints for session management</p>
                </div>
            </div>
        </div>
        
        <div class="modal-section">
            <h3><i class="fas fa-lightbulb"></i> Development Notes</h3>
            <p>Leveraged AI tools for rapid development. Implemented dependency injection pattern. Features comprehensive error handling and automatic session recovery. Deployable on Azure Web Apps with PM2 process management.</p>
        </div>
    `
};

// Add modal CSS styles
const modalStyle = document.createElement('style');
modalStyle.textContent = `
    .modal-subtitle {
        color: var(--secondary);
        margin-bottom: 30px;
        font-size: 1.1rem;
    }
    
    .modal-section {
        margin-bottom: 30px;
    }
    
    .modal-section h3 {
        color: var(--dark);
        margin-bottom: 15px;
        display: flex;
        align-items: center;
        gap: 10px;
        font-size: 1.2rem;
    }
    
    .modal-section h3 i {
        color: var(--primary);
    }
    
    .tech-stack {
        display: flex;
        flex-wrap: wrap;
        gap: 10px;
    }
    
    .tech-stack span {
        background: #e0f2fe;
        color: var(--primary);
        padding: 8px 15px;
        border-radius: 5px;
        font-size: 0.9rem;
    }
    
    .modal-section ul {
        padding-left: 20px;
    }
    
    .modal-section li {
        margin-bottom: 10px;
        color: var(--secondary);
    }
    
    .modal-section li strong {
        color: var(--dark);
    }
    
    .architecture-diagram {
        background: #f8fafc;
        padding: 20px;
        border-radius: 8px;
        border-left: 4px solid var(--primary);
    }
    
    .arch-layer {
        margin-bottom: 15px;
        padding-bottom: 15px;
        border-bottom: 1px solid #e2e8f0;
    }
    
    .arch-layer:last-child {
        border-bottom: none;
        margin-bottom: 0;
        padding-bottom: 0;
    }
    
    .arch-layer h4 {
        color: var(--dark);
        margin-bottom: 5px;
        font-size: 1.1rem;
    }
    
    .arch-layer p {
        color: var(--secondary);
        font-size: 0.9rem;
    }
`;
document.head.appendChild(modalStyle);

projectButtons.forEach(button => {
    button.addEventListener('click', () => {
        const projectId = button.getAttribute('data-project');
        modalBody.innerHTML = projectDetails[projectId];
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
    });
});

closeModal.addEventListener('click', () => {
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
});

window.addEventListener('click', (e) => {
    if(e.target === modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
});

// Form submission
const contactForm = document.getElementById('contactForm');
contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(contactForm);
    const data = Object.fromEntries(formData);
    
    // In a real application, you would send this to a server
    console.log('Form submitted:', data);
    
    // Show success message
    alert('Thank you for your message! I will get back to you soon.');
    contactForm.reset();
});

// Add active class to current section in navigation
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-links a');
    
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if(scrollY >= (sectionTop - 100)) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if(link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// Add active style to CSS
const activeStyle = document.createElement('style');
activeStyle.textContent = `
    .nav-links a.active {
        color: var(--primary) !important;
        font-weight: 600;
    }
`;
document.head.appendChild(activeStyle);