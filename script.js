// Demo Step Navigation
document.addEventListener('DOMContentLoaded', function() {
    const stepButtons = document.querySelectorAll('.step-btn');
    const demoSteps = document.querySelectorAll('.demo-step');

    stepButtons.forEach(button => {
        button.addEventListener('click', function() {
            const stepNum = this.getAttribute('data-step');

            // Update active button
            stepButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');

            // Update active step content
            demoSteps.forEach(step => step.classList.remove('active'));
            document.getElementById(`step-${stepNum}`).classList.add('active');
        });
    });


    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const navHeight = document.querySelector('.navbar').offsetHeight;
                const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - navHeight - 20;
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Navbar background change on scroll
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
        } else {
            navbar.style.boxShadow = 'none';
        }
    });

    // Animate stats on scroll
    const stats = document.querySelectorAll('.stat-value');
    const observerOptions = {
        threshold: 0.5
    };

    const animateValue = (element, start, end, duration, suffix = '') => {
        let startTimestamp = null;
        const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            const value = progress * (end - start) + start;
            element.textContent = value.toFixed(1) + suffix;
            if (progress < 1) {
                window.requestAnimationFrame(step);
            }
        };
        window.requestAnimationFrame(step);
    };

    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const text = entry.target.textContent;
                const value = parseFloat(text);
                if (!isNaN(value)) {
                    animateValue(entry.target, 0, value, 1500, '%');
                }
                statsObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);

    stats.forEach(stat => {
        statsObserver.observe(stat);
    });

    // Auto-advance demo (optional)
    let autoAdvanceInterval;
    let currentStep = 1;
    const totalSteps = 5;

    const startAutoAdvance = () => {
        autoAdvanceInterval = setInterval(() => {
            currentStep = currentStep >= totalSteps ? 1 : currentStep + 1;
            stepButtons.forEach(btn => btn.classList.remove('active'));
            demoSteps.forEach(step => step.classList.remove('active'));

            document.querySelector(`[data-step="${currentStep}"]`).classList.add('active');
            document.getElementById(`step-${currentStep}`).classList.add('active');
        }, 5000);
    };

    const stopAutoAdvance = () => {
        clearInterval(autoAdvanceInterval);
    };

    // Start auto-advance when demo section is visible
    const demoSection = document.querySelector('.demo');
    const demoObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                startAutoAdvance();
            } else {
                stopAutoAdvance();
            }
        });
    }, { threshold: 0.3 });

    demoObserver.observe(demoSection);

    // Stop auto-advance when user clicks a step button
    stepButtons.forEach(button => {
        button.addEventListener('click', function() {
            stopAutoAdvance();
            currentStep = parseInt(this.getAttribute('data-step'));
        });
    });
});

// Copy BibTeX function
function copyBibtex() {
    const bibtex = `@article{zhang2025liveevo,
  title={Live-Evo: Online Evolution of Agentic Memory from Continuous Feedback},
  author={Zhang, Yaolun and Wu, Yiran and Yu, Yijiong and Wu, Qingyun and Wang, Huazheng},
  journal={arXiv preprint arXiv:2501.xxxxx},
  year={2025}
}`;

    navigator.clipboard.writeText(bibtex).then(() => {
        const btn = document.querySelector('.copy-btn');
        const originalText = btn.textContent;
        btn.textContent = 'Copied!';
        btn.style.background = '#10b981';
        setTimeout(() => {
            btn.textContent = originalText;
            btn.style.background = '';
        }, 2000);
    }).catch(err => {
        console.error('Failed to copy:', err);
        // Fallback for older browsers
        const textArea = document.createElement('textarea');
        textArea.value = bibtex;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);

        const btn = document.querySelector('.copy-btn');
        btn.textContent = 'Copied!';
        setTimeout(() => {
            btn.textContent = 'Copy BibTeX';
        }, 2000);
    });
}

// Add intersection observer for fade-in animations
const fadeInElements = document.querySelectorAll('.stage-card, .innovation-card, .chart-card, .bank-card');

const fadeInObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            fadeInObserver.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.1
});

fadeInElements.forEach(element => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(20px)';
    element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    fadeInObserver.observe(element);
});

// Interactive Prediction Cards
function revealCard(cardId, userChoice, isCorrect) {
    const card = document.getElementById(cardId);
    const front = card.querySelector('.card-front');
    const back = card.querySelector('.card-back');
    const yourPick = back.querySelector('.your-pick');

    // Set user's pick
    if (isCorrect) {
        yourPick.innerHTML = `<span>Your pick: ${userChoice}</span> <span style="color: #166534;">&#10003; Correct!</span>`;
        yourPick.className = 'your-pick correct';
    } else {
        yourPick.innerHTML = `<span>Your pick: ${userChoice}</span> <span style="color: #991b1b;">&#10007; Wrong</span>`;
        yourPick.className = 'your-pick wrong';
    }

    // Animate the flip
    card.style.transform = 'scale(0.95)';

    setTimeout(() => {
        front.style.display = 'none';
        back.style.display = 'block';
        card.style.transform = 'scale(1)';
        card.style.borderColor = isCorrect ? '#10b981' : '#ef4444';
    }, 150);
}
