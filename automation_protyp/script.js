// Mobile Menu Toggle
document.querySelector('.mobile-menu-btn').addEventListener('click', function() {
    document.querySelector('.nav-links').classList.toggle('active');
});

// Project Filtering
const filterButtons = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');

filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Remove active class from all buttons
        filterButtons.forEach(btn => btn.classList.remove('active'));
        // Add active class to clicked button
        button.classList.add('active');
        
        const filter = button.getAttribute('data-filter');
        
        projectCards.forEach(card => {
            if (filter === 'all' || card.getAttribute('data-category') === filter) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    });
});

// Contact Form Submission
document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault();
    alert('Thank you for your message! We will get back to you soon.');
    this.reset();
});

// Learn Automation Page Toggle
const learnBtn = document.getElementById('learnAutomationBtn');
const learnPage = document.getElementById('learnAutomationPage');
const closeLearn = document.getElementById('closeLearnPage');

learnBtn.addEventListener('click', function(e) {
    e.preventDefault();
    learnPage.classList.add('active');
    document.body.style.overflow = 'hidden';
});

closeLearn.addEventListener('click', function() {
    learnPage.classList.remove('active');
    document.body.style.overflow = 'auto';
});

// Close learn page when clicking outside content
learnPage.addEventListener('click', function(e) {
    if (e.target === learnPage) {
        learnPage.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
});

// Optimized Custom Cursor and Light Wave
function initCursorEffects() {
    const cursor = document.querySelector('.custom-cursor');
    const follower = document.querySelector('.cursor-follower');
    
    let mouseX = 0, mouseY = 0;
    let cursorX = 0, cursorY = 0;
    let followerX = 0, followerY = 0;
    
    // Use requestAnimationFrame for smooth animation
    function animateCursor() {
        // Update cursor position with lerp for smooth movement
        cursorX += (mouseX - cursorX) * 0.2;
        cursorY += (mouseY - cursorY) * 0.2;
        
        cursor.style.left = `${cursorX}px`;
        cursor.style.top = `${cursorY}px`;
        
        // Update follower with more delay for trailing effect
        followerX += (mouseX - followerX) * 0.1;
        followerY += (mouseY - followerY) * 0.1;
        
        follower.style.left = `${followerX}px`;
        follower.style.top = `${followerY}px`;
        
        requestAnimationFrame(animateCursor);
    }
    
    // Start animation loop
    animateCursor();
    
    // Track mouse position
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });
    
    // Interactive elements cursor effect
    const interactiveElements = document.querySelectorAll('.btn, .event-item, .project-card, .team-member');
    
    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.style.transform = 'scale(1.5)';
            cursor.style.borderColor = 'var(--accent-interactive)';
            follower.style.transform = 'scale(1.2)';
            follower.style.borderColor = 'var(--accent-interactive)';
        });
        
        el.addEventListener('mouseleave', () => {
            cursor.style.transform = 'scale(1)';
            cursor.style.borderColor = 'var(--accent-automation)';
            follower.style.transform = 'scale(1)';
            follower.style.borderColor = 'rgba(58, 134, 255, 0.3)';
        });
    });
    
    // Throttled light wave creation
    let lastWaveTime = 0;
    const waveInterval = 100; // ms between waves
    
    document.addEventListener('mousemove', (e) => {
        const now = Date.now();
        if (now - lastWaveTime > waveInterval) {
            createLightWave(e.clientX, e.clientY);
            lastWaveTime = now;
        }
    });
    
    function createLightWave(x, y) {
        const wave = document.createElement('div');
        wave.className = 'light-wave';
        wave.style.left = `${x}px`;
        wave.style.top = `${y}px`;
        document.body.appendChild(wave);
        
        // Animate the wave with enhanced effects
        gsap.to(wave, {
            duration: 2,
            width: '500px',
            height: '500px',
            opacity: 0.4,
            ease: "power2.out"
        });
        
        gsap.to(wave, {
            duration: 2,
            opacity: 0,
            delay: 0.5,
            onComplete: () => {
                if (document.body.contains(wave)) {
                    document.body.removeChild(wave);
                }
            }
        });
    }
}

// Advanced Interactive Grid (Lusion.co style)
function initInteractiveGrid() {
    const canvas = document.getElementById('grid-canvas');
    const ctx = canvas.getContext('2d');
    const container = document.querySelector('.interactive-grid');
    
    // Set canvas size
    function setCanvasSize() {
        canvas.width = container.clientWidth;
        canvas.height = container.clientHeight;
    }
    
    setCanvasSize();
    window.addEventListener('resize', setCanvasSize);
    
    // Grid configuration
    const gridSize = 20;
    const nodeRadius = 2;
    const connectionDistance = 80;
    const repulsionRadius = 100;
    
    // Create nodes
    const nodes = [];
    const rows = Math.ceil(canvas.height / gridSize);
    const cols = Math.ceil(canvas.width / gridSize);
    
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            nodes.push({
                x: j * gridSize,
                y: i * gridSize,
                originalX: j * gridSize,
                originalY: i * gridSize,
                vx: 0,
                vy: 0,
                connections: []
            });
        }
    }
    
    // Mouse position
    const mouse = {
        x: canvas.width / 2,
        y: canvas.height / 2,
        isActive: false
    };
    
    // Handle mouse movement
    canvas.addEventListener('mousemove', (e) => {
        const rect = canvas.getBoundingClientRect();
        mouse.x = e.clientX - rect.left;
        mouse.y = e.clientY - rect.top;
        mouse.isActive = true;
    });
    
    canvas.addEventListener('mouseleave', () => {
        mouse.isActive = false;
    });
    
    // Animation loop
    function animate() {
        requestAnimationFrame(animate);
        
        // Clear canvas with slight fade effect
        ctx.fillStyle = 'rgba(10, 10, 10, 0.1)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        // Update nodes
        nodes.forEach(node => {
            // Calculate distance to mouse
            const dx = mouse.x - node.x;
            const dy = mouse.y - node.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            // Apply force if mouse is active and close enough
            if (mouse.isActive && distance < repulsionRadius) {
                const force = (repulsionRadius - distance) / repulsionRadius;
                const angle = Math.atan2(dy, dx);
                
                // Repel from mouse
                node.vx -= Math.cos(angle) * force * 2;
                node.vy -= Math.sin(angle) * force * 2;
            }
            
            // Apply spring force to return to original position
            const springForceX = (node.originalX - node.x) * 0.05;
            const springForceY = (node.originalY - node.y) * 0.05;
            
            node.vx += springForceX;
            node.vy += springForceY;
            
            // Apply friction
            node.vx *= 0.9;
            node.vy *= 0.9;
            
            // Update position
            node.x += node.vx;
            node.y += node.vy;
            
            // Find connections
            node.connections = [];
            nodes.forEach(otherNode => {
                if (node === otherNode) return;
                
                const dx = otherNode.x - node.x;
                const dy = otherNode.y - node.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < connectionDistance) {
                    node.connections.push({
                        node: otherNode,
                        distance: distance
                    });
                }
            });
        });
        
        // Draw connections
        ctx.strokeStyle = 'rgba(58, 134, 255, 0.2)';
        ctx.lineWidth = 1;
        
        nodes.forEach(node => {
            node.connections.forEach(connection => {
                const opacity = 1 - (connection.distance / connectionDistance);
                ctx.globalAlpha = opacity * 0.5;
                
                ctx.beginPath();
                ctx.moveTo(node.x, node.y);
                ctx.lineTo(connection.node.x, connection.node.y);
                ctx.stroke();
            });
        });
        
        ctx.globalAlpha = 1;
        
        // Draw nodes
        nodes.forEach(node => {
            // Calculate distance to mouse for glow effect
            const dx = mouse.x - node.x;
            const dy = mouse.y - node.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            // Create gradient for node
            const gradient = ctx.createRadialGradient(
                node.x, node.y, 0,
                node.x, node.y, nodeRadius * 2
            );
            
            if (distance < repulsionRadius) {
                gradient.addColorStop(0, 'rgba(255, 107, 107, 0.8)');
                gradient.addColorStop(1, 'rgba(255, 107, 107, 0)');
            } else {
                gradient.addColorStop(0, 'rgba(58, 134, 255, 0.8)');
                gradient.addColorStop(1, 'rgba(58, 134, 255, 0)');
            }
            
            ctx.fillStyle = gradient;
            ctx.beginPath();
            ctx.arc(node.x, node.y, nodeRadius, 0, Math.PI * 2);
            ctx.fill();
        });
        
        // Draw mouse influence area if active
        if (mouse.isActive) {
            const gradient = ctx.createRadialGradient(
                mouse.x, mouse.y, 0,
                mouse.x, mouse.y, repulsionRadius
            );
            gradient.addColorStop(0, 'rgba(0, 240, 181, 0.1)');
            gradient.addColorStop(1, 'rgba(0, 240, 181, 0)');
            
            ctx.fillStyle = gradient;
            ctx.beginPath();
            ctx.arc(mouse.x, mouse.y, repulsionRadius, 0, Math.PI * 2);
            ctx.fill();
        }
    }
    
    // Start animation
    animate();
}

// Enhanced Technical Background
function initTechBackground() {
    const techBackground = document.querySelector('.tech-background');
    
    // Create floating tech icons
    const techIcons = ['<i class="fas fa-robot"></i>', '<i class="fas fa-microchip"></i>', '<i class="fas fa-cog"></i>', '<i class="fas fa-industry"></i>', '<i class="fas fa-server"></i>'];
    
    for (let i = 0; i < 8; i++) {
        const icon = document.createElement('div');
        icon.className = 'floating-tech';
        icon.innerHTML = techIcons[Math.floor(Math.random() * techIcons.length)];
        icon.style.left = `${Math.random() * 100}%`;
        icon.style.top = `${Math.random() * 100}%`;
        icon.style.animation = `float ${15 + Math.random() * 20}s ease-in-out infinite`;
        techBackground.appendChild(icon);
    }
    
    // Create pulse rings
    for (let i = 0; i < 5; i++) {
        const ring = document.createElement('div');
        ring.className = 'pulse-ring';
        ring.style.left = `${Math.random() * 100}%`;
        ring.style.top = `${Math.random() * 100}%`;
        ring.style.width = `${100 + Math.random() * 300}px`;
        ring.style.height = ring.style.width;
        ring.style.animationDelay = `${Math.random() * 5}s`;
        techBackground.appendChild(ring);
    }
    
    // Create binary rain
    function createBinaryRain() {
        const binaryChars = ['0', '1'];
        const rainCount = 30;
        
        for (let i = 0; i < rainCount; i++) {
            const binary = document.createElement('div');
            binary.className = 'binary-rain';
            binary.textContent = binaryChars[Math.floor(Math.random() * binaryChars.length)];
            binary.style.left = `${Math.random() * 100}%`;
            binary.style.animationDuration = `${5 + Math.random() * 10}s`;
            binary.style.animationDelay = `${Math.random() * 5}s`;
            techBackground.appendChild(binary);
        }
    }
    
    createBinaryRain();
    
    // Create data nodes
    function createDataNodes() {
        const dataStream = document.getElementById('data-stream');
        const nodeCount = 20;
        
        for (let i = 0; i < nodeCount; i++) {
            const node = document.createElement('div');
            node.className = 'data-node';
            node.style.left = `${Math.random() * 100}%`;
            node.style.top = `${Math.random() * 100}%`;
            node.style.animation = `pulse ${3 + Math.random() * 4}s infinite`;
            dataStream.appendChild(node);
        }
    }
    
    createDataNodes();
}

// Initialize everything when the page loads
window.addEventListener('DOMContentLoaded', () => {
    initCursorEffects();
    initInteractiveGrid();
    initTechBackground();
    
    // Add scroll animations
    gsap.registerPlugin(ScrollTrigger);
    
    // Animate sections on scroll
    gsap.utils.toArray('section').forEach(section => {
        gsap.from(section, {
            opacity: 0,
            y: 50,
            duration: 1,
            scrollTrigger: {
                trigger: section,
                start: 'top 80%',
                end: 'bottom 20%',
                toggleActions: 'play none none reverse'
            }
        });
    });
    
    // Animate stats counting
    const statNumbers = document.querySelectorAll('.stat-number');
    statNumbers.forEach(stat => {
        const target = parseInt(stat.textContent);
        const suffix = stat.textContent.replace(/[0-9]/g, '');
        let current = 0;
        
        const increment = target / 50;
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            stat.textContent = Math.floor(current) + suffix;
        }, 30);
    });
});
