// ===== PREMIUM INITIALIZATION =====
document.addEventListener('DOMContentLoaded', function() {
    // Initialize loading sequence
    initializeLoadingSequence();
    
    // Initialize all premium features
    setTimeout(() => {
        initializeParticles();
        initializeNavigation();
        initializeHeroAnimations();
        initializeScrollEffects();
        initializeCounterAnimations();
        initializeIntersectionObserver();
        initializeIntegratedTools();
        initializeInteractiveSteps();
    }, 100);
});

// ===== LOADING SEQUENCE =====
function initializeLoadingSequence() {
    const loadingScreen = document.getElementById('loadingScreen');
    const loadingProgress = document.querySelector('.loading-progress');
    
    // Simulate loading progress
    let progress = 0;
    const progressInterval = setInterval(() => {
        progress += Math.random() * 15;
        if (progress >= 100) {
            progress = 100;
            clearInterval(progressInterval);
            
            // Hide loading screen after completion
            setTimeout(() => {
                loadingScreen.classList.add('hidden');
                document.body.style.overflow = 'visible';
            }, 500);
        }
        loadingProgress.style.width = progress + '%';
    }, 150);
}

// ===== PREMIUM PARTICLES =====
function initializeParticles() {
    particlesJS('particles-js', {
        particles: {
            number: {
                value: 80,
                density: {
                    enable: true,
                    value_area: 800
                }
            },
            color: {
                value: '#ffffff'
            },
            shape: {
                type: 'circle',
                stroke: {
                    width: 0,
                    color: '#000000'
                }
            },
            opacity: {
                value: 0.5,
                random: false,
                anim: {
                    enable: false,
                    speed: 1,
                    opacity_min: 0.1,
                    sync: false
                }
            },
            size: {
                value: 3,
                random: true,
                anim: {
                    enable: false,
                    speed: 40,
                    size_min: 0.1,
                    sync: false
                }
            },
            line_linked: {
                enable: true,
                distance: 150,
                color: '#ffffff',
                opacity: 0.4,
                width: 1
            },
            move: {
                enable: true,
                speed: 6,
                direction: 'none',
                random: false,
                straight: false,
                out_mode: 'out',
                bounce: false,
                attract: {
                    enable: false,
                    rotateX: 600,
                    rotateY: 1200
                }
            }
        },
        interactivity: {
            detect_on: 'canvas',
            events: {
                onhover: {
                    enable: true,
                    mode: 'repulse'
                },
                onclick: {
                    enable: true,
                    mode: 'push'
                },
                resize: true
            },
            modes: {
                grab: {
                    distance: 400,
                    line_linked: {
                        opacity: 1
                    }
                },
                bubble: {
                    distance: 400,
                    size: 40,
                    duration: 2,
                    opacity: 8,
                    speed: 3
                },
                repulse: {
                    distance: 200,
                    duration: 0.4
                },
                push: {
                    particles_nb: 4
                },
                remove: {
                    particles_nb: 2
                }
            }
        },
        retina_detect: true
    });
}

// ===== PREMIUM NAVIGATION =====
function initializeNavigation() {
    const navbar = document.getElementById('navbar');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Smooth scroll and active states
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                
                // Update active state
                updateActiveNavLink(this);
            }
        });
    });
    
    // Scroll effects
    let lastScrollY = window.scrollY;
    window.addEventListener('scroll', throttle(() => {
        const currentScrollY = window.scrollY;
        
        // Add scrolled class
        if (currentScrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        // Hide/show navbar on scroll
        if (currentScrollY > lastScrollY && currentScrollY > 200) {
            navbar.style.transform = 'translateY(-100%)';
        } else {
            navbar.style.transform = 'translateY(0)';
        }
        
        lastScrollY = currentScrollY;
    }, 16));
}

function updateActiveNavLink(activeLink) {
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
    });
    activeLink.classList.add('active');
}

// ===== HERO ANIMATIONS =====
function initializeHeroAnimations() {
    // Animate words with stagger
    const words = document.querySelectorAll('.word');
    words.forEach((word, index) => {
        const delay = parseInt(word.dataset.delay) || 0;
        setTimeout(() => {
            word.style.animationDelay = '0s';
            word.style.animation = 'wordReveal 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards';
        }, delay);
    });
}

// ===== COUNTER ANIMATIONS =====
function initializeCounterAnimations() {
    const counters = document.querySelectorAll('.stat-number');
    
    const animateCounter = (counter) => {
        const target = parseInt(counter.dataset.target);
        const duration = 2000;
        const step = target / (duration / 16);
        let current = 0;
        
        const timer = setInterval(() => {
            current += step;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            
            if (target >= 1000) {
                counter.textContent = (current / 1000).toFixed(1) + 'k';
            } else {
                counter.textContent = Math.floor(current);
            }
        }, 16);
    };
    
    // Trigger when in viewport
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                observer.unobserve(entry.target);
            }
        });
    });
    
    counters.forEach(counter => observer.observe(counter));
}

// ===== SCROLL EFFECTS =====
function initializeScrollEffects() {
    // Parallax effect for background elements
    window.addEventListener('scroll', throttle(() => {
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('.orb');
        
        parallaxElements.forEach((element, index) => {
            const speed = 0.5 + (index * 0.1);
            element.style.transform = `translateY(${scrolled * speed}px)`;
        });
    }, 16));
}

// ===== INTERSECTION OBSERVER =====
function initializeIntersectionObserver() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    document.querySelectorAll('[data-animate]').forEach(el => {
        observer.observe(el);
    });
}

// ===== UTILITY FUNCTIONS =====
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Smooth scrolling function
function scrollToSection(sectionId) {
    document.getElementById(sectionId).scrollIntoView({
        behavior: 'smooth'
    });
}

// Initialize smooth scrolling for navigation
function initializeSmoothScrolling() {
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            scrollToSection(targetId);
        });
    });
}

// Steps functionality
function initializeSteps() {
    const stepCards = document.querySelectorAll('.step-card');
    
    stepCards.forEach(card => {
        card.addEventListener('click', function() {
            this.classList.toggle('expanded');
        });
    });
}

// ===== INTEGRATED TOOLS FUNCTIONALITY =====
function initializeIntegratedTools() {
    initializeGoalsForm();
    initializeZOPABATNA();
    initializeAdvancedSimulator();
    initializeSmartChecklist();
}

// Enhanced Goals form functionality with ZOPA integration
function initializeGoalsForm() {
    const goalsForm = document.getElementById('goalsForm');
    const aiInsights = document.getElementById('aiInsights');
    
    // Add dynamic label updating
    const mainGoalInput = document.getElementById('mainGoal');
    const minLimitLabel = document.getElementById('minLimitLabel');
    const idealGoalLabel = document.getElementById('idealGoalLabel');
    
    if (mainGoalInput && minLimitLabel && idealGoalLabel) {
        mainGoalInput.addEventListener('input', function() {
            updateLabelsBasedOnContext(this.value, minLimitLabel, idealGoalLabel);
        });
    }
    const insightsContent = document.getElementById('insightsContent');
    
    goalsForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const mainGoal = document.getElementById('mainGoal').value;
        const minLimit = document.getElementById('minLimit').value;
        const idealGoal = document.getElementById('idealGoal').value;
        
        if (!mainGoal || !minLimit || !idealGoal) {
            showNotification('Por favor, preencha todos os campos para receber insights da IA.', 'warning');
            return;
        }
        
        // Update ZOPA visualization
        updateZOPAVisualization(minLimit, idealGoal);
        
        // Simulate AI analysis
        generateAIInsights(mainGoal, minLimit, idealGoal);
        aiInsights.classList.remove('hidden');
        
        // Update checklist
        updateChecklistProgress('check1', true);
        
        showNotification('Objetivos definidos com sucesso. ZOPA atualizada automaticamente.', 'success');
    });
}

// ZOPA and BATNA integration
function initializeZOPABATNA() {
    // Initialize BATNA analysis
    window.analyzeBATNA = function() {
        const batnaInput = document.getElementById('batnaInput').value;
        if (!batnaInput.trim()) {
            showNotification('Por favor, descreva sua BATNA primeiro.', 'warning');
            return;
        }
        
        // Simulate BATNA strength analysis
        const strength = analyzeBATNAStrength(batnaInput);
        updateBATNAStrength(strength);
        updateChecklistProgress('check3', true);
        
        showNotification('BATNA analisada com sucesso.', 'success');
    };
}

function updateZOPAVisualization(minLimit, idealGoal) {
    // Detect value types from both inputs
    const minType = detectValueType(minLimit);
    const maxType = detectValueType(idealGoal);
    
    // Use the most specific type detected
    const valueType = minType !== 'currency' ? minType : maxType;
    
    // Extract numeric values
    const minValue = extractNumericValue(minLimit);
    const maxValue = extractNumericValue(idealGoal);
    
    // Check for value confusion first
    let actualMin = minValue;
    let actualMax = maxValue;
    let valuesSwapped = false;
    
    // Get main goal from form to better detect context
    const mainGoalElement = document.getElementById('mainGoal');
    const mainGoal = mainGoalElement ? mainGoalElement.value : '';
    const contextText = (mainGoal + ' ' + minLimit + ' ' + idealGoal).toLowerCase();
    
    console.log('ZOPA Debug:', { minValue, maxValue, mainGoal, contextText, hasCompr: contextText.includes('compr') });
    
    if (minValue && maxValue && minValue > maxValue && contextText.includes('compr')) {
        // For buying, swap the values
        actualMin = maxValue; // ideal price (lower)
        actualMax = minValue; // max budget (higher)
        valuesSwapped = true;
        console.log('Values swapped:', { actualMin, actualMax });
    }
    
    if (actualMin && actualMax && actualMin < actualMax) {
        // Format user values with correct type (show corrected values if swapped)
        if (valuesSwapped) {
            document.getElementById('userMin').textContent = formatValue(actualMin, valueType, idealGoal);
            document.getElementById('userMax').textContent = formatValue(actualMax, valueType, minLimit);
        } else {
            document.getElementById('userMin').textContent = formatValue(actualMin, valueType, minLimit);
            document.getElementById('userMax').textContent = formatValue(actualMax, valueType, idealGoal);
        }
        
        // Intelligent counterpart estimation based on value type
        let counterMin, counterMax;
        
        switch (valueType) {
            case 'percentage':
                // For percentage increases, counterpart offers less but still reasonable
                const percentageGap = (actualMax - actualMin) * 0.5;
                counterMin = Math.max(actualMin * 0.5, actualMin - percentageGap);
                counterMax = Math.max(counterMin + 2, actualMax * 0.8);
                break;
                
            case 'time':
                // For time, counterpart usually wants 20-30% less time
                counterMin = Math.max(1, actualMin * 0.7);
                counterMax = actualMax * 0.8;
                break;
                
            case 'quantity':
                // For quantities, counterpart typically wants 10-25% less
                counterMin = Math.max(1, Math.round(actualMin * 0.75));
                counterMax = Math.round(actualMax * 0.85);
                break;
                
            case 'currency':
            default:
                // Intelligent currency estimation based on context
                if (contextText.includes('vend') || (contextText.includes('carro') && !contextText.includes('compr')) || contextText.includes('casa')) {
                    // For selling items, buyers typically offer 10-25% less
                    counterMin = actualMin * 0.75;
                    counterMax = actualMax * 0.95;
                } else if (contextText.includes('compr') || contextText.includes('adquir')) {
                    // For buying, sellers typically want 5-15% more
                    counterMin = actualMin * 1.05;
                    counterMax = actualMax * 1.15;
                } else {
                    // Default case
                    counterMin = actualMin * 0.8;
                    counterMax = actualMax * 0.9;
                }
                console.log('Counterpart calculation:', { contextText, counterMin, counterMax });
                break;
        }
        
        document.getElementById('counterMin').textContent = formatValue(counterMin, valueType, valuesSwapped ? idealGoal : minLimit);
        document.getElementById('counterMax').textContent = formatValue(counterMax, valueType, valuesSwapped ? minLimit : idealGoal);
        
        // Calculate ZOPA with intelligent overlap detection
        const zopaMin = Math.max(actualMin, counterMin);
        const zopaMax = Math.min(actualMax, counterMax);
        
        const zopaElement = document.getElementById('zopaRange');
        
        if (zopaMin <= zopaMax) {
            const zopaSize = zopaMax - zopaMin;
            const totalRange = maxValue - minValue;
            const overlapPercentage = totalRange > 0 ? (zopaSize / totalRange) * 100 : 0;
            
            // Ensure minimum meaningful ZOPA size
            let displayZopaMin = zopaMin;
            let displayZopaMax = zopaMax;
            
            if (valueType === 'percentage' && zopaSize < 1) {
                // For percentages, ensure at least 1% range
                const midpoint = (zopaMin + zopaMax) / 2;
                displayZopaMin = Math.max(0, midpoint - 0.5);
                displayZopaMax = midpoint + 0.5;
            }
            
            zopaElement.textContent = `${formatValue(displayZopaMin, valueType, minLimit)} - ${formatValue(displayZopaMax, valueType, idealGoal)}`;
            
            // Color based on ZOPA quality
            if (overlapPercentage > 40 || zopaSize > (maxValue * 0.3)) {
                zopaElement.style.background = 'linear-gradient(45deg, #10b981, #059669)';
                zopaElement.title = 'ZOPA Excelente - Grande margem para negociação';
            } else if (overlapPercentage > 15 || zopaSize > (maxValue * 0.1)) {
                zopaElement.style.background = 'linear-gradient(45deg, #f59e0b, #d97706)';
                zopaElement.title = 'ZOPA Moderada - Negociação possível com cuidado';
            } else {
                zopaElement.style.background = 'linear-gradient(45deg, #ef4444, #dc2626)';
                zopaElement.title = 'ZOPA Estreita - Negociação difícil';
            }
        } else {
            zopaElement.textContent = 'Nenhuma ZOPA identificada - Revise seus objetivos';
            zopaElement.style.background = 'linear-gradient(45deg, #7f1d1d, #991b1b)';
            zopaElement.title = 'Sem sobreposição - Negociação muito difícil';
        }
        
        // Generate intelligent insights
        generateZOPAInsights(actualMin, actualMax, counterMin, counterMax, valueType, minLimit);
        
    } else if (minValue && maxValue && minValue >= maxValue) {
        // This should only happen for non-buying scenarios now
        console.log('Error case reached:', { minValue, maxValue, contextText });
        document.getElementById('zopaRange').textContent = 'Erro: Verifique se os valores estão corretos';
        document.getElementById('zopaRange').style.background = 'linear-gradient(45deg, #7f1d1d, #991b1b)';
        
        // Clear other displays
        document.getElementById('userMin').textContent = 'N/A';
        document.getElementById('userMax').textContent = 'N/A';
        document.getElementById('counterMin').textContent = 'N/A';
        document.getElementById('counterMax').textContent = 'N/A';
    } else {
        // Handle case where values are null or invalid
        console.log('Invalid values case:', { minValue, maxValue });
        document.getElementById('zopaRange').textContent = 'Erro: Valores inválidos detectados';
        document.getElementById('zopaRange').style.background = 'linear-gradient(45deg, #7f1d1d, #991b1b)';
        
        document.getElementById('userMin').textContent = 'N/A';
        document.getElementById('userMax').textContent = 'N/A';
        document.getElementById('counterMin').textContent = 'N/A';
        document.getElementById('counterMax').textContent = 'N/A';
    }
}

function generateZOPAInsights(userMin, userMax, counterMin, counterMax, valueType, originalText) {
    const insights = [];
    
    const zopaMin = Math.max(userMin, counterMin);
    const zopaMax = Math.min(userMax, counterMax);
    
    if (zopaMin <= zopaMax) {
        const zopaSize = zopaMax - zopaMin;
        const userRange = userMax - userMin;
        const flexibility = (zopaSize / userRange) * 100;
        
        if (flexibility > 60) {
            insights.push("✅ Excelente flexibilidade para negociação");
            insights.push("💡 Considere começar próximo ao seu objetivo ideal");
        } else if (flexibility > 30) {
            insights.push("⚠️ Flexibilidade moderada - negocie com cuidado");
            insights.push("💡 Prepare argumentos sólidos para justificar sua posição");
        } else {
            insights.push("🚨 Pouca margem de manobra - seja estratégico");
            insights.push("💡 Foque em criar valor adicional para ambas as partes");
        }
        
        // Type-specific insights
        switch (valueType) {
            case 'percentage':
                if (originalText.toLowerCase().includes('aumento') || originalText.toLowerCase().includes('salario')) {
                    insights.push("💼 Dica: Para aumentos salariais, prepare evidências de performance e mercado");
                    insights.push("📈 Considere benefícios adicionais como parte da negociação");
                } else {
                    insights.push("📊 Dica: Em negociações de percentual, pequenas mudanças têm grande impacto");
                }
                break;
            case 'time':
                insights.push("⏰ Dica: Considere flexibilidade em prazos como moeda de troca");
                break;
            case 'quantity':
                insights.push("📦 Dica: Explore descontos por volume ou entregas parceladas");
                break;
            case 'currency':
                if (originalText.toLowerCase().includes('vend') && originalText.toLowerCase().includes('carro')) {
                    insights.push("🚗 Dica: Para venda de carro, destaque diferenciais como revisões, pneus novos, baixa quilometragem");
                    insights.push("💳 Considere aceitar financiamento ou entrada + parcelas para facilitar");
                } else if (originalText.toLowerCase().includes('casa') || originalText.toLowerCase().includes('imóvel')) {
                    insights.push("🏠 Dica: Para imóveis, enfatize localização, estado de conservação e documentação");
                } else {
                    insights.push("💰 Dica: Considere formas de pagamento e condições como variáveis");
                }
                break;
        }
    } else {
        insights.push("❌ Sem ZOPA detectada - revise sua estratégia");
        insights.push("💡 Considere: melhorar sua BATNA, ajustar objetivos ou criar valor adicional");
        insights.push("🔄 Tente identificar outros interesses além do valor principal");
    }
    
    // Display insights
    const insightsContainer = document.getElementById('zopaInsights');
    if (insightsContainer) {
        insightsContainer.innerHTML = insights.map(insight => `<p>${insight}</p>`).join('');
    }
}

function analyzeBATNAStrength(batnaText) {
    if (!batnaText || batnaText.trim().length < 10) {
        return 15; // Very weak if too short or empty
    }
    
    const text = batnaText.toLowerCase();
    let score = 40; // Base score
    
    // Strong indicators (increase score)
    const strongIndicators = {
        'alternativa concreta': 25,
        'outra empresa': 20,
        'proposta melhor': 20,
        'oferta superior': 20,
        'concorrente': 18,
        'backup': 15,
        'plano b': 15,
        'segunda opção': 15,
        'alternativa': 12,
        'outra': 10,
        'opção': 8,
        'possibilidade': 8
    };
    
    // Weak indicators (decrease score)
    const weakIndicators = {
        'nenhuma alternativa': -30,
        'não tenho': -25,
        'impossível': -25,
        'muito difícil': -20,
        'sem opção': -20,
        'única chance': -18,
        'desesperado': -15,
        'preciso muito': -15,
        'urgente': -12,
        'difícil': -10,
        'complicado': -8
    };
    
    // Quality indicators
    const qualityIndicators = {
        'já confirmada': 15,
        'garantida': 15,
        'aprovada': 12,
        'negociando': 10,
        'em andamento': 10,
        'provável': 8,
        'possível': 5,
        'talvez': -5,
        'incerta': -10,
        'duvidosa': -15
    };
    
    // Check for strong indicators
    Object.entries(strongIndicators).forEach(([phrase, points]) => {
        if (text.includes(phrase)) {
            score += points;
        }
    });
    
    // Check for weak indicators
    Object.entries(weakIndicators).forEach(([phrase, points]) => {
        if (text.includes(phrase)) {
            score += points; // points are negative
        }
    });
    
    // Check for quality indicators
    Object.entries(qualityIndicators).forEach(([phrase, points]) => {
        if (text.includes(phrase)) {
            score += points;
        }
    });
    
    // Length bonus (detailed BATNAs are usually stronger)
    if (text.length > 100) score += 10;
    if (text.length > 200) score += 5;
    
    // Specificity bonus (numbers, names, dates indicate concrete alternatives)
    if (/\d+/.test(text)) score += 8; // Contains numbers
    if (/empresa|companhia|cliente|fornecedor/.test(text)) score += 8; // Contains business entities
    if (/janeiro|fevereiro|março|abril|maio|junho|julho|agosto|setembro|outubro|novembro|dezembro|\d{1,2}\/\d{1,2}/.test(text)) score += 5; // Contains dates
    
    return Math.max(5, Math.min(95, score));
}

function updateBATNAStrength(strength) {
    const strengthFill = document.getElementById('batnaStrength');
    const strengthText = document.getElementById('batnaStrengthText');
    
    if (strengthFill) strengthFill.style.width = strength + '%';
    
    let category, advice, color;
    
    if (strength >= 80) {
        category = 'Excelente';
        advice = 'Sua BATNA é muito forte. Você pode negociar com confiança e ser mais exigente.';
        color = 'linear-gradient(45deg, #059669, #047857)';
    } else if (strength >= 65) {
        category = 'Muito Forte';
        advice = 'Boa BATNA! Você tem poder de negociação. Mantenha-se firme em seus objetivos.';
        color = 'linear-gradient(45deg, #10b981, #059669)';
    } else if (strength >= 50) {
        category = 'Forte';
        advice = 'BATNA sólida. Você tem alternativas viáveis, mas seja estratégico.';
        color = 'linear-gradient(45deg, #22c55e, #16a34a)';
    } else if (strength >= 35) {
        category = 'Moderada';
        advice = 'BATNA razoável. Trabalhe para fortalecê-la antes da negociação.';
        color = 'linear-gradient(45deg, #f59e0b, #d97706)';
    } else if (strength >= 20) {
        category = 'Fraca';
        advice = 'BATNA precisa ser melhorada. Busque mais alternativas antes de negociar.';
        color = 'linear-gradient(45deg, #ef4444, #dc2626)';
    } else {
        category = 'Muito Fraca';
        advice = 'BATNA crítica! Desenvolva alternativas urgentemente ou evite a negociação.';
        color = 'linear-gradient(45deg, #dc2626, #b91c1c)';
    }
    
    if (strengthText) strengthText.textContent = category;
    if (strengthFill) strengthFill.style.background = color;
    
    // Update advice
    const adviceElement = document.getElementById('batnaAdvice');
    if (adviceElement) {
        adviceElement.textContent = advice;
        adviceElement.className = `batna-advice ${strength >= 50 ? 'positive' : strength >= 35 ? 'neutral' : 'negative'}`;
    }
    
    // Generate specific recommendations
    generateBATNARecommendations(strength);
}

function generateBATNARecommendations(strength) {
    const recommendations = [];
    
    if (strength >= 65) {
        recommendations.push("🎯 Use sua BATNA forte como âncora na negociação");
        recommendations.push("💪 Seja mais exigente em seus objetivos");
        recommendations.push("⏰ Você pode se dar ao luxo de ser paciente");
    } else if (strength >= 35) {
        recommendations.push("🔍 Explore maneiras de fortalecer sua BATNA atual");
        recommendations.push("🤝 Considere parcerias ou alianças estratégicas");
        recommendations.push("📈 Trabalhe no desenvolvimento de alternativas paralelas");
    } else {
        recommendations.push("🚨 URGENTE: Desenvolva alternativas antes de negociar");
        recommendations.push("🔄 Considere adiar a negociação se possível");
        recommendations.push("💡 Explore mercados ou parceiros alternativos");
        recommendations.push("📞 Reative contatos antigos que podem gerar oportunidades");
    }
    
    const recommendationsElement = document.getElementById('batnaRecommendations');
    if (recommendationsElement) {
        recommendationsElement.innerHTML = recommendations.map(rec => `<li>${rec}</li>`).join('');
    }
}

// Enhanced simulator with context from goals and BATNA
function initializeAdvancedSimulator() {
    const roleBtns = document.querySelectorAll('.role-btn');
    const chatContainer = document.getElementById('chatContainer');
    const sendButton = document.getElementById('sendMessage');
    const messageInput = document.getElementById('messageInput');
    
    roleBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            roleBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            const role = this.getAttribute('data-role');
            startAdvancedSimulation(role);
        });
    });
    
    if (sendButton && messageInput) {
        sendButton.addEventListener('click', sendMessage);
        messageInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                sendMessage();
            }
        });
    }
}

function startAdvancedSimulation(role) {
    const chatContainer = document.getElementById('chatContainer');
    const chatMessages = document.getElementById('chatMessages');
    
    if (!chatContainer || !chatMessages) return;
    
    chatContainer.classList.remove('hidden');
    chatMessages.innerHTML = '';
    
    // Get context from previously defined goals
    const mainGoal = document.getElementById('mainGoal')?.value || '';
    const minLimit = document.getElementById('minLimit')?.value || '';
    const batna = document.getElementById('batnaInput')?.value || '';
    
    currentSimulation = {
        role: role,
        step: 0,
        score: 0,
        context: { mainGoal, minLimit, batna }
    };
    
    // Enhanced initial messages with context
    const contextualMessages = {
        buyer: `Olá! Vou simular uma negociação onde você é o comprador. ${mainGoal ? `Vejo que seu objetivo é: "${mainGoal}". ` : ''}Vamos começar: O vendedor está pedindo R$ 25.000 por um produto. Como você inicia a negociação?`,
        seller: `Olá! Você é o vendedor nesta simulação. ${mainGoal ? `Com base no seu objetivo "${mainGoal}", ` : ''}Um cliente está interessado mas quer 30% de desconto. Como você responde mantendo sua margem?`,
        employee: `Olá! Vamos simular sua negociação salarial. ${mainGoal ? `Seu objetivo é "${mainGoal}" e ` : ''}${minLimit ? `seu limite mínimo é "${minLimit}". ` : ''}Seu chefe acabou de entrar na sala. Como você inicia a conversa?`
    };
    
    addMessage('ai', contextualMessages[role]);
    updateChecklistProgress('check7', true);
}

// Smart checklist with progress tracking
function initializeSmartChecklist() {
    const checkboxes = document.querySelectorAll('.checklist-item input[type="checkbox"]');
    const progressFill = document.getElementById('progressFill');
    const progressText = document.getElementById('progressText');
    const completionMessage = document.getElementById('completionMessage');
    
    checkboxes.forEach(checkbox => {
        checkbox.addEventListener('change', function() {
            updateChecklistProgress(this.id, this.checked);
            calculateOverallProgress();
        });
    });
}

function updateChecklistProgress(checkId, isCompleted) {
    const checkbox = document.getElementById(checkId);
    if (checkbox) {
        checkbox.checked = isCompleted;
        
        // Add visual feedback
        const item = checkbox.closest('.checklist-item');
        if (isCompleted) {
            item.classList.add('completed');
            showMiniNotification(`Concluído: ${checkbox.nextElementSibling.textContent.trim()}`);
        } else {
            item.classList.remove('completed');
        }
    }
}

function calculateOverallProgress() {
    const checkboxes = document.querySelectorAll('.checklist-item input[type="checkbox"]');
    const progressFill = document.getElementById('progressFill');
    const progressText = document.getElementById('progressText');
    const completionMessage = document.getElementById('completionMessage');
    
    if (!checkboxes.length || !progressFill) return;
    
    const totalItems = checkboxes.length;
    const checkedItems = document.querySelectorAll('.checklist-item input[type="checkbox"]:checked').length;
    const percentage = Math.round((checkedItems / totalItems) * 100);
    
    progressFill.style.width = percentage + '%';
    progressText.textContent = percentage + '% Completo';
    
    if (percentage === 100) {
        setTimeout(() => {
            if (completionMessage) {
                completionMessage.classList.remove('hidden');
                completionMessage.scrollIntoView({ behavior: 'smooth' });
                showNotification('Parabéns! Você está totalmente preparado para negociar!', 'success');
            }
        }, 500);
    } else if (completionMessage) {
        completionMessage.classList.add('hidden');
    }
}

// Enhanced utility functions with smart value detection
function extractNumericValue(text) {
    if (!text) return null;
    
    const originalText = text.toLowerCase();
    
    // Handle different number formats
    let cleanText = text.replace(/[^\d.,\s]/g, '');
    
    // Look for patterns like "75.000", "75,000", "75000", "75 mil", "75k"
    let match;
    
    // Check for "mil" or "k" indicators (thousands)
    if (originalText.includes('mil') || originalText.includes('k')) {
        match = cleanText.match(/(\d+(?:[.,]\d+)?)/);
        if (match) {
            const baseValue = parseFloat(match[1].replace(',', '.'));
            return isNaN(baseValue) ? null : baseValue * 1000;
        }
    }
    
    // Check for large numbers with dots or commas as thousand separators
    // Pattern: 75.000 or 75,000 (thousands) vs 75.50 or 75,50 (decimals)
    match = cleanText.match(/(\d{1,3})[.,](\d{3})(?:[.,](\d{1,2}))?/);
    if (match) {
        const thousands = parseInt(match[1]);
        const hundreds = parseInt(match[2]);
        const decimals = match[3] ? parseInt(match[3]) / 100 : 0;
        
        // If the middle part is exactly 3 digits, treat as thousands
        if (match[2].length === 3) {
            return thousands * 1000 + hundreds + decimals;
        }
    }
    
    // Simple number extraction for other cases
    match = cleanText.match(/(\d+(?:[.,]\d+)?)/);
    if (match) {
        let numericValue = parseFloat(match[1].replace(',', '.'));
        
        // If it's a reasonable car price range (above 1000), assume it's correct
        // If it's very small (like 75), might be missing thousands
        if (originalText.includes('carro') || originalText.includes('vend') || originalText.includes('compr')) {
            if (numericValue < 1000 && numericValue > 10) {
                numericValue *= 1000; // Assume thousands were omitted
            }
        }
        
        return isNaN(numericValue) ? null : numericValue;
    }
    
    return null;
}

function detectValueType(text) {
    if (!text) return 'currency';
    
    const lowerText = text.toLowerCase();
    
    // Check for percentage indicators
    if (lowerText.includes('%') || lowerText.includes('porcent') || lowerText.includes('percent')) {
        return 'percentage';
    }
    
    // Check for time indicators
    if (lowerText.includes('dia') || lowerText.includes('mes') || lowerText.includes('ano') || 
        lowerText.includes('hora') || lowerText.includes('semana')) {
        return 'time';
    }
    
    // Check for quantity indicators
    if (lowerText.includes('unidade') || lowerText.includes('peça') || lowerText.includes('item') ||
        lowerText.includes('quantidade') || lowerText.includes('qtd')) {
        return 'quantity';
    }
    
    // Check for currency indicators
    if (lowerText.includes('r$') || lowerText.includes('real') || lowerText.includes('dinheiro') ||
        lowerText.includes('valor') || lowerText.includes('preço') || lowerText.includes('custo')) {
        return 'currency';
    }
    
    // Default to currency if no specific type detected
    return 'currency';
}

function formatValue(value, type, originalText = '') {
    if (value === null || value === undefined) return 'N/A';
    
    switch (type) {
        case 'percentage':
            return `${value.toFixed(1)}%`;
            
        case 'time':
            if (originalText.toLowerCase().includes('dia')) {
                return `${Math.round(value)} dias`;
            } else if (originalText.toLowerCase().includes('mes')) {
                return `${Math.round(value)} meses`;
            } else if (originalText.toLowerCase().includes('ano')) {
                return `${Math.round(value)} anos`;
            } else if (originalText.toLowerCase().includes('hora')) {
                return `${Math.round(value)} horas`;
            } else if (originalText.toLowerCase().includes('semana')) {
                return `${Math.round(value)} semanas`;
            }
            return `${Math.round(value)} unidades de tempo`;
            
        case 'quantity':
            return `${Math.round(value)} unidades`;
            
        case 'currency':
        default:
            return new Intl.NumberFormat('pt-BR', {
                style: 'currency',
                currency: 'BRL'
            }).format(value);
    }
}

function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    // Style the notification
    Object.assign(notification.style, {
        position: 'fixed',
        top: '20px',
        right: '20px',
        padding: '1rem 1.5rem',
        borderRadius: '8px',
        color: 'white',
        fontWeight: '500',
        zIndex: '10000',
        transform: 'translateX(100%)',
        transition: 'transform 0.3s ease'
    });
    
    // Set background color based on type
    const colors = {
        success: '#10b981',
        warning: '#f59e0b',
        error: '#ef4444',
        info: '#6366f1'
    };
    notification.style.background = colors[type] || colors.info;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Remove after delay
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

function showMiniNotification(message) {
    const mini = document.createElement('div');
    mini.textContent = message;
    mini.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: rgba(16, 185, 129, 0.9);
        color: white;
        padding: 0.5rem 1rem;
        border-radius: 20px;
        font-size: 0.9rem;
        z-index: 10001;
        opacity: 0;
        transition: opacity 0.3s ease;
    `;
    
    document.body.appendChild(mini);
    
    setTimeout(() => mini.style.opacity = '1', 100);
    setTimeout(() => {
        mini.style.opacity = '0';
        setTimeout(() => document.body.removeChild(mini), 300);
    }, 1500);
}

function generateAIInsights(mainGoal, minLimit, idealGoal) {
    const insightsContent = document.getElementById('insightsContent');
    
    // Simulate AI processing
    insightsContent.innerHTML = '<div class="loading">Analisando seus objetivos...</div>';
    
    setTimeout(() => {
        // Extract and format values properly
        const minValue = extractNumericValue(minLimit);
        const maxValue = extractNumericValue(idealGoal);
        const valueType = detectValueType(minLimit + ' ' + idealGoal);
        
        const formattedMin = minValue ? formatValue(minValue, valueType, minLimit) : minLimit;
        const formattedMax = maxValue ? formatValue(maxValue, valueType, idealGoal) : idealGoal;
        
        let insights = [
            `<strong>Análise do Objetivo Principal:</strong> Seu objetivo "${mainGoal}" parece bem estruturado. Certifique-se de ter dados concretos para justificar sua proposta.`
        ];
        
        // Context-specific analysis
        const goalLower = mainGoal.toLowerCase();
        if (goalLower.includes('vend') && goalLower.includes('carro')) {
            insights.push(`<strong>Análise de Mercado:</strong> Para venda de veículo entre ${formattedMin} e ${formattedMax}, pesquise preços similares na FIPE e sites especializados.`);
            insights.push(`<strong>Estratégia de Venda:</strong> Destaque diferenciais como manutenção em dia, baixa quilometragem e documentação regular.`);
        } else if (goalLower.includes('aumento') || goalLower.includes('salario')) {
            insights.push(`<strong>Avaliação Salarial:</strong> A faixa entre ${formattedMin} e ${formattedMax} deve ser justificada com performance e pesquisa de mercado.`);
            insights.push(`<strong>Estratégia Profissional:</strong> Prepare evidências de resultados e contribuições para a empresa.`);
        } else {
            insights.push(`<strong>Avaliação dos Limites:</strong> A diferença entre ${formattedMin} e ${formattedMax} oferece uma margem de negociação adequada.`);
        }
        
        // Calculate flexibility and detect value confusion
        if (minValue && maxValue) {
            if (minValue > maxValue && goalLower.includes('compr')) {
                // User likely confused the values for buying
                insights.push(`<strong>⚠️ Valores Corrigidos:</strong> Para compra, detectamos que você quer pagar entre ${formatValue(maxValue, valueType, idealGoal)} (ideal) e ${formatValue(minValue, valueType, minLimit)} (máximo orçamento).`);
                const correctedFlexibility = ((minValue - maxValue) / minValue) * 100;
                insights.push(`<strong>Flexibilidade:</strong> Sua margem de ${correctedFlexibility.toFixed(1)}% oferece boa flexibilidade para negociar.`);
            } else if (minValue > maxValue) {
                insights.push(`<strong>❌ Erro nos Valores:</strong> Limite mínimo (${formattedMin}) não pode ser maior que objetivo ideal (${formattedMax}).`);
                insights.push(`<strong>💡 Correção:</strong> Para venda, o mínimo deve ser menor. Para compra, o ideal deve ser menor que o máximo orçamento.`);
            } else {
                const flexibility = ((maxValue - minValue) / maxValue) * 100;
                if (flexibility > 20) {
                    insights.push(`<strong>Flexibilidade:</strong> Sua margem de ${flexibility.toFixed(1)}% oferece boa flexibilidade para negociar.`);
                } else if (flexibility > 0) {
                    insights.push(`<strong>Atenção:</strong> Margem de apenas ${flexibility.toFixed(1)}% - seja estratégico e prepare argumentos sólidos.`);
                } else {
                    insights.push(`<strong>⚠️ Margem Zero:</strong> Sem flexibilidade para negociar - considere revisar seus objetivos.`);
                }
            }
        }
        
        insights.push(`<strong>Dica da IA:</strong> Considere preparar 2-3 alternativas criativas que possam agregar valor além do aspecto principal.`);
        
        insightsContent.innerHTML = insights.map(insight => `<p>${insight}</p>`).join('');
    }, 2000);
}

function updateLabelsBasedOnContext(mainGoal, minLimitLabel, idealGoalLabel) {
    const goalLower = mainGoal.toLowerCase();
    const minLimitInput = document.getElementById('minLimit');
    const idealGoalInput = document.getElementById('idealGoal');
    
    // Selling scenarios
    if (goalLower.includes('vend')) {
        if (goalLower.includes('carro') || goalLower.includes('veículo')) {
            minLimitLabel.textContent = 'Qual o menor preço que você aceita pelo carro?';
            idealGoalLabel.textContent = 'Por quanto você gostaria de vender?';
            if (minLimitInput) minLimitInput.placeholder = 'Ex: R$ 75.000';
            if (idealGoalInput) idealGoalInput.placeholder = 'Ex: R$ 85.000';
        } else if (goalLower.includes('casa') || goalLower.includes('imóvel') || goalLower.includes('apartamento')) {
            minLimitLabel.textContent = 'Qual o menor preço que você aceita pelo imóvel?';
            idealGoalLabel.textContent = 'Por quanto você gostaria de vender?';
            if (minLimitInput) minLimitInput.placeholder = 'Ex: R$ 450.000';
            if (idealGoalInput) idealGoalInput.placeholder = 'Ex: R$ 500.000';
        } else {
            minLimitLabel.textContent = 'Qual o menor preço que você aceita?';
            idealGoalLabel.textContent = 'Por quanto você gostaria de vender?';
            if (minLimitInput) minLimitInput.placeholder = 'Ex: R$ 1.000';
            if (idealGoalInput) idealGoalInput.placeholder = 'Ex: R$ 1.200';
        }
    }
    // Buying scenarios
    else if (goalLower.includes('compr')) {
        if (goalLower.includes('carro') || goalLower.includes('veículo')) {
            minLimitLabel.textContent = 'Quanto você gostaria de pagar pelo carro?';
            idealGoalLabel.textContent = 'Qual seu orçamento máximo?';
            if (minLimitInput) minLimitInput.placeholder = 'Ex: R$ 70.000';
            if (idealGoalInput) idealGoalInput.placeholder = 'Ex: R$ 80.000';
        } else if (goalLower.includes('casa') || goalLower.includes('imóvel') || goalLower.includes('apartamento')) {
            minLimitLabel.textContent = 'Quanto você gostaria de pagar pelo imóvel?';
            idealGoalLabel.textContent = 'Qual seu orçamento máximo?';
            if (minLimitInput) minLimitInput.placeholder = 'Ex: R$ 400.000';
            if (idealGoalInput) idealGoalInput.placeholder = 'Ex: R$ 450.000';
        } else {
            minLimitLabel.textContent = 'Quanto você gostaria de pagar?';
            idealGoalLabel.textContent = 'Qual seu orçamento máximo?';
            if (minLimitInput) minLimitInput.placeholder = 'Ex: R$ 800';
            if (idealGoalInput) idealGoalInput.placeholder = 'Ex: R$ 1.000';
        }
    }
    // Salary/raise scenarios
    else if (goalLower.includes('aumento') || goalLower.includes('salário') || goalLower.includes('salario')) {
        minLimitLabel.textContent = 'Qual o menor aumento que você aceita?';
        idealGoalLabel.textContent = 'Qual aumento você gostaria de conseguir?';
        if (minLimitInput) minLimitInput.placeholder = 'Ex: 15%';
        if (idealGoalInput) idealGoalInput.placeholder = 'Ex: 20%';
    }
    // Job/position scenarios
    else if (goalLower.includes('emprego') || goalLower.includes('trabalho') || goalLower.includes('vaga')) {
        minLimitLabel.textContent = 'Qual o menor salário que você aceita?';
        idealGoalLabel.textContent = 'Qual salário você gostaria de conseguir?';
        if (minLimitInput) minLimitInput.placeholder = 'Ex: R$ 8.000';
        if (idealGoalInput) idealGoalInput.placeholder = 'Ex: R$ 10.000';
    }
    // Contract/service scenarios
    else if (goalLower.includes('contrato') || goalLower.includes('serviço') || goalLower.includes('projeto')) {
        minLimitLabel.textContent = 'Qual o menor valor que você aceita?';
        idealGoalLabel.textContent = 'Qual valor você gostaria de conseguir?';
        if (minLimitInput) minLimitInput.placeholder = 'Ex: R$ 5.000';
        if (idealGoalInput) idealGoalInput.placeholder = 'Ex: R$ 7.000';
    }
    // Time-based scenarios
    else if (goalLower.includes('prazo') || goalLower.includes('tempo') || goalLower.includes('entrega')) {
        minLimitLabel.textContent = 'Qual o prazo máximo que você aceita?';
        idealGoalLabel.textContent = 'Qual seria o prazo ideal?';
        if (minLimitInput) minLimitInput.placeholder = 'Ex: 30 dias';
        if (idealGoalInput) idealGoalInput.placeholder = 'Ex: 20 dias';
    }
    // Partnership/investment scenarios
    else if (goalLower.includes('sociedade') || goalLower.includes('investimento') || goalLower.includes('participação')) {
        minLimitLabel.textContent = 'Qual a menor participação que você aceita?';
        idealGoalLabel.textContent = 'Qual participação você gostaria?';
        if (minLimitInput) minLimitInput.placeholder = 'Ex: 20%';
        if (idealGoalInput) idealGoalInput.placeholder = 'Ex: 30%';
    }
    // Default fallback
    else if (mainGoal.length > 10) {
        minLimitLabel.textContent = 'Qual o mínimo que você aceita?';
        idealGoalLabel.textContent = 'Qual seria o resultado ideal?';
        if (minLimitInput) minLimitInput.placeholder = 'Ex: Valor mínimo';
        if (idealGoalInput) idealGoalInput.placeholder = 'Ex: Valor ideal';
    }
}

// ZOPA & BATNA functionality
function initializeZopaBatna() {
    const scenarioBtns = document.querySelectorAll('.scenario-btn');
    const scenarios = document.querySelectorAll('.scenario');
    
    scenarioBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Remove active class from all buttons and scenarios
            scenarioBtns.forEach(b => b.classList.remove('active'));
            scenarios.forEach(s => s.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            // Show corresponding scenario
            const scenarioType = this.getAttribute('data-scenario');
            document.querySelector(`.scenario.${scenarioType}`).classList.add('active');
        });
    });
}

// AI Simulator functionality
let currentSimulation = null;
let simulationStep = 0;

function initializeSimulator() {
    const roleBtns = document.querySelectorAll('.role-btn');
    const chatContainer = document.getElementById('chatContainer');
    const sendButton = document.getElementById('sendMessage');
    const messageInput = document.getElementById('messageInput');
    
    roleBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            roleBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            const role = this.getAttribute('data-role');
            startSimulation(role);
        });
    });
    
    sendButton.addEventListener('click', sendMessage);
    messageInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            sendMessage();
        }
    });
}

function startSimulation(role) {
    const chatContainer = document.getElementById('chatContainer');
    const chatMessages = document.getElementById('chatMessages');
    
    chatContainer.classList.remove('hidden');
    chatMessages.innerHTML = '';
    
    currentSimulation = {
        role: role,
        step: 0,
        score: 0
    };
    
    // Initial AI message based on role
    const initialMessages = {
        buyer: "Olá! Sou seu parceiro de negociação. Você está interessado em comprar um carro usado. O vendedor está pedindo R$ 25.000. Como você vai iniciar a negociação?",
        seller: "Olá! Você é o vendedor de um produto inovador. Um cliente potencial está interessado, mas quer um desconto de 30%. Como você responde?",
        employee: "Olá! Você vai negociar um aumento salarial com seu chefe. Sua pesquisa mostra que você está 15% abaixo do mercado. Como você inicia a conversa?"
    };
    
    addMessage('ai', initialMessages[role]);
}

function sendMessage() {
    const messageInput = document.getElementById('messageInput');
    const message = messageInput.value.trim();
    
    if (!message || !currentSimulation) return;
    
    addMessage('user', message);
    messageInput.value = '';
    
    // Simulate AI response
    setTimeout(() => {
        const aiResponse = generateAIResponse(message);
        addMessage('ai', aiResponse);
        
        currentSimulation.step++;
        
        // End simulation after 5 exchanges
        if (currentSimulation.step >= 5) {
            setTimeout(() => {
                endSimulation();
            }, 1000);
        }
    }, 1500);
}

function addMessage(sender, content) {
    const chatMessages = document.getElementById('chatMessages');
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${sender}`;
    
    messageDiv.innerHTML = `
        <div class="message-content">
            ${content}
        </div>
    `;
    
    chatMessages.appendChild(messageDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

function generateAIResponse(userMessage) {
    const responses = [
        "Interessante abordagem! Vejo que você está tentando encontrar um meio-termo. Como você justificaria essa proposta?",
        "Essa é uma estratégia válida. Agora, como você reagiria se eu dissesse que preciso consultar meu supervisor?",
        "Percebo que você está sendo firme em sua posição. Que alternativas você ofereceria para chegarmos a um acordo?",
        "Boa argumentação! Você está demonstrando conhecimento do mercado. Qual seria seu plano B se não chegássemos a um acordo?",
        "Vejo que você está preparado para esta negociação. Vamos finalizar: qual é sua proposta final?"
    ];
    
    return responses[Math.min(currentSimulation.step, responses.length - 1)];
}

function endSimulation() {
    const chatContainer = document.getElementById('chatContainer');
    const feedbackPanel = document.getElementById('feedbackPanel');
    const feedbackContent = document.getElementById('feedbackContent');
    
    chatContainer.classList.add('hidden');
    feedbackPanel.classList.remove('hidden');
    
    // Generate feedback based on simulation
    const feedback = generateFeedback();
    feedbackContent.innerHTML = feedback;
}

function generateFeedback() {
    const score = Math.floor(Math.random() * 30) + 70; // Random score between 70-100
    
    return `
        <div class="feedback-score">
            <h4>Sua Pontuação: ${score}/100</h4>
            <div class="score-bar">
                <div class="score-fill" style="width: ${score}%"></div>
            </div>
        </div>
        <div class="feedback-points">
            <h4>Pontos Fortes:</h4>
            <ul>
                <li>Demonstrou preparação e conhecimento do mercado</li>
                <li>Manteve uma postura profissional durante toda a negociação</li>
                <li>Soube fazer concessões estratégicas</li>
            </ul>
            <h4>Áreas para Melhoria:</h4>
            <ul>
                <li>Poderia ter explorado mais os interesses da outra parte</li>
                <li>Considere preparar mais alternativas criativas</li>
                <li>Pratique técnicas de escuta ativa</li>
            </ul>
        </div>
        <div class="feedback-tips">
            <h4>Dica da IA:</h4>
            <p>Lembre-se: uma boa negociação é aquela onde ambas as partes saem satisfeitas. Continue praticando!</p>
        </div>
    `;
}

function restartSimulation() {
    const feedbackPanel = document.getElementById('feedbackPanel');
    const roleBtns = document.querySelectorAll('.role-btn');
    
    feedbackPanel.classList.add('hidden');
    roleBtns.forEach(btn => btn.classList.remove('active'));
    currentSimulation = null;
}

// Checklist functionality
function initializeChecklist() {
    const checkboxes = document.querySelectorAll('.checklist-item input[type="checkbox"]');
    const progressFill = document.getElementById('progressFill');
    const progressText = document.getElementById('progressText');
    const completionMessage = document.getElementById('completionMessage');
    
    checkboxes.forEach(checkbox => {
        checkbox.addEventListener('change', updateProgress);
    });
    
    function updateProgress() {
        const totalItems = checkboxes.length;
        const checkedItems = document.querySelectorAll('.checklist-item input[type="checkbox"]:checked').length;
        const percentage = Math.round((checkedItems / totalItems) * 100);
        
        progressFill.style.width = percentage + '%';
        progressText.textContent = percentage + '% Completo';
        
        if (percentage === 100) {
            setTimeout(() => {
                completionMessage.classList.remove('hidden');
                completionMessage.scrollIntoView({ behavior: 'smooth' });
            }, 500);
        } else {
            completionMessage.classList.add('hidden');
        }
    }
}

// PDF Generation
function generatePDF() {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();
    
    // Add title
    doc.setFontSize(20);
    doc.text('Resumo: Planejar para Negociar', 20, 30);
    
    // Add content
    doc.setFontSize(12);
    let yPosition = 50;
    
    const content = [
        'As 7 Etapas da Negociação:',
        '1. Preparação e Planejamento',
        '2. Definição de Regras',
        '3. Exploração',
        '4. Propostas e Concessões',
        '5. Fechamento',
        '6. Implementação',
        '7. Avaliação',
        '',
        'Conceitos Importantes:',
        '• ZOPA - Zona de Acordo Possível',
        '• BATNA - Melhor Alternativa em Caso de Impasse',
        '• Objetivos SMART (Específicos, Mensuráveis, Alcançáveis, Relevantes, Temporais)',
        '',
        'Checklist de Preparação:',
        'Objetivos definidos',
        'Mercado analisado',
        'BATNA identificada',
        'ZOPA mapeada',
        'Concessões planejadas',
        'Pesquisa sobre a outra parte',
        'Argumentos preparados',
        'Cronograma definido',
        '',
        'Lembre-se: "Negociar é arte, ciência e preparação."'
    ];
    
    content.forEach(line => {
        if (yPosition > 270) {
            doc.addPage();
            yPosition = 20;
        }
        doc.text(line, 20, yPosition);
        yPosition += 7;
    });
    
    // Save the PDF
    doc.save('resumo-negociacao.pdf');
}

// Quotes carousel
function initializeQuotesCarousel() {
    const quotes = document.querySelectorAll('.quote');
    let currentQuote = 0;
    
    setInterval(() => {
        quotes[currentQuote].classList.remove('active');
        currentQuote = (currentQuote + 1) % quotes.length;
        quotes[currentQuote].classList.add('active');
    }, 4000);
}

// Navbar scroll effect
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = 'none';
    }
});

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', function() {
    const animatedElements = document.querySelectorAll('.step-card, .smart-item, .concept-card, .checklist-item');
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// Mobile menu toggle
function toggleMobileMenu() {
    console.log('toggleMobileMenu called');
    const navMenu = document.querySelector('.nav-menu');
    const mobileToggle = document.querySelector('.mobile-menu-toggle');
    
    console.log('Elements found:', { navMenu, mobileToggle });
    
    if (navMenu && mobileToggle) {
        navMenu.classList.toggle('active');
        mobileToggle.classList.toggle('active');
        
        console.log('Menu toggled, active:', navMenu.classList.contains('active'));
        
        // Prevent body scroll when menu is open
        if (navMenu.classList.contains('active')) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }
    } else {
        console.error('Menu elements not found');
    }
}

// Make sure function is globally available
window.toggleMobileMenu = toggleMobileMenu;

// Close mobile menu when clicking on nav links
document.addEventListener('DOMContentLoaded', function() {
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            const navMenu = document.querySelector('.nav-menu');
            const mobileToggle = document.querySelector('.mobile-menu-toggle');
            
            if (navMenu && mobileToggle) {
                navMenu.classList.remove('active');
                mobileToggle.classList.remove('active');
                document.body.style.overflow = 'auto';
            }
        });
    });
});

// Add click handlers for better UX
document.addEventListener('click', function(e) {
    // Close mobile menu when clicking outside
    if (!e.target.closest('.nav-menu') && !e.target.closest('.mobile-menu-btn')) {
        const navMenu = document.querySelector('.nav-menu');
        if (navMenu) {
            navMenu.classList.remove('active');
        }
    }
});

// Keyboard navigation support
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        // Close any open modals or menus
        const activeElements = document.querySelectorAll('.active');
        activeElements.forEach(el => {
            if (el.classList.contains('nav-menu')) {
                el.classList.remove('active');
            }
        });
    }
});

// Performance optimization: Debounce scroll events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Apply debounce to scroll handler
const debouncedScrollHandler = debounce(function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = 'none';
    }
}, 10);

window.addEventListener('scroll', debouncedScrollHandler);

// Mobile-specific optimizations
window.addEventListener('orientationchange', function() {
    setTimeout(() => {
        window.scrollTo(0, window.scrollY);
    }, 100);
});

// Touch events for better mobile interaction
document.addEventListener('touchstart', function() {}, { passive: true });

// ===== INTERACTIVE STEPS FUNCTIONALITY =====
function initializeInteractiveSteps() {
    // Add click listeners to clickable steps
    document.querySelectorAll('.clickable-step').forEach(step => {
        step.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            const stepNumber = this.getAttribute('data-step');
            console.log('Clicking step:', stepNumber);
            openStepModal(stepNumber);
        });
    });
    
    // Add click listeners to theory cards
    document.querySelectorAll('.clickable-theory').forEach(card => {
        card.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            const onclickAttr = this.getAttribute('onclick');
            if (onclickAttr) {
                const theoryNumber = onclickAttr.match(/\d+/)[0];
                console.log('Theory card clicked:', theoryNumber);
                openTheoryModal(theoryNumber);
            }
        });
    });
    
    // Close modal when clicking outside
    const stepModal = document.getElementById('stepModal');
    const theoryModal = document.getElementById('theoryModal');
    
    if (stepModal) {
        stepModal.addEventListener('click', function(e) {
            if (e.target === this) {
                closeStepModal();
            }
        });
    }
    
    if (theoryModal) {
        theoryModal.addEventListener('click', function(e) {
            if (e.target === this) {
                closeTheoryModal();
            }
        });
    }
    
    // Close modal with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeStepModal();
            closeTheoryModal();
        }
    });
}

// Theory Modal Functions
function openTheoryModal(theoryId) {
    const modal = document.getElementById('theoryModal');
    const title = document.getElementById('theoryModalTitle');
    const content = document.getElementById('theoryModalContent');
    
    if (theoryData[theoryId]) {
        title.textContent = theoryData[theoryId].title;
        content.innerHTML = theoryData[theoryId].content;
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
    }
}

function closeTheoryModal() {
    const modal = document.getElementById('theoryModal');
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
}

// Step Modal Functions
function openStepModal(stepId) {
    const modal = document.getElementById('stepModal');
    const title = document.getElementById('stepModalTitle');
    const content = document.getElementById('stepModalContent');
    
    if (stepData[stepId]) {
        title.textContent = stepData[stepId].title;
        content.innerHTML = stepData[stepId].content;
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
    }
}

function closeStepModal() {
    const modal = document.getElementById('stepModal');
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
}

// Theory content data
const theoryData = {
    1: {
        title: "O que é Negociação?",
        content: `
            <div class="modal-step-content">
                <div class="step-intro">
                    <h3>Definição e Conceito</h3>
                    <p>A negociação é um <strong>processo de comunicação bilateral</strong> onde duas ou mais partes, com interesses parcialmente conflitantes, buscam chegar a um acordo mutuamente aceitável. Segundo Roger Fisher e William Ury, autores do clássico "Getting to Yes" (1981), a negociação eficaz transcende a simples barganha, constituindo-se como uma metodologia estruturada para resolver diferenças de forma construtiva. Estudos do Program on Negotiation de Harvard demonstram que 85% dos conflitos organizacionais podem ser resolvidos através de técnicas de negociação bem aplicadas.</p>
                </div>
                
                <div class="elements-grid">
                    <h3>Características Essenciais</h3>
                    <div class="element-cards">
                        <div class="element-card">
                            <div class="element-icon">
                                <i class="fas fa-link"></i>
                            </div>
                            <h4>Interdependência</h4>
                            <p>As partes precisam uma da outra para alcançar seus objetivos. Sem essa dependência mútua, não há necessidade de negociar.</p>
                        </div>
                        
                        <div class="element-card">
                            <div class="element-icon">
                                <i class="fas fa-balance-scale"></i>
                            </div>
                            <h4>Conflito de Interesses</h4>
                            <p>Nem todos os objetivos são compatíveis. Existe tensão entre o que cada parte deseja obter do acordo.</p>
                        </div>
                        
                        <div class="element-card">
                            <div class="element-icon">
                                <i class="fas fa-comments"></i>
                            </div>
                            <h4>Comunicação</h4>
                            <p>Troca contínua de informações, propostas e feedback entre as partes envolvidas no processo.</p>
                        </div>
                        
                        <div class="element-card">
                            <div class="element-icon">
                                <i class="fas fa-sync-alt"></i>
                            </div>
                            <h4>Processo Dinâmico</h4>
                            <p>A negociação evolui ao longo do tempo, com mudanças de posições, descoberta de novos interesses e ajustes de estratégia.</p>
                        </div>
                    </div>
                </div>
            </div>
        `
    },
    2: {
        title: "Tipos de Negociação",
        content: `
            <div class="modal-step-content">
                <div class="step-intro">
                    <h3>Abordagens Estratégicas</h3>
                    <p>Existem diferentes abordagens para negociar, cada uma adequada a situações específicas. <strong>Compreender essas modalidades</strong> é crucial para escolher a estratégia mais eficaz em cada contexto. A pesquisa de David Lax e James Sebenius em "The Manager as Negotiator" (1986) identificou que negociadores que dominam múltiplas abordagens obtêm resultados 40% superiores àqueles que utilizam apenas uma estratégia. O modelo distributivo vs. integrativo, desenvolvido por Mary Parker Follett nos anos 1920 e refinado por Walton e McKersie (1965), permanece como base fundamental da teoria moderna de negociação.</p>
                </div>
                
                <div class="elements-grid">
                    <h3>Modalidades Principais</h3>
                    <div class="element-cards">
                        <div class="element-card">
                            <div class="element-icon">
                                <i class="fas fa-chart-pie"></i>
                            </div>
                            <h4>Distributiva (Ganha-Perde)</h4>
                            <p>Recursos limitados onde um ganha o que o outro perde. Foco na divisão de um "bolo" fixo. Comum em negociações de preço.</p>
                        </div>
                        
                        <div class="element-card">
                            <div class="element-icon">
                                <i class="fas fa-handshake"></i>
                            </div>
                            <h4>Integrativa (Ganha-Ganha)</h4>
                            <p>Criação de valor para ambas as partes através de soluções criativas que expandem os benefícios mútuos.</p>
                        </div>
                        
                        <div class="element-card">
                            <div class="element-icon">
                                <i class="fas fa-trophy"></i>
                            </div>
                            <h4>Competitiva</h4>
                            <p>Foco em maximizar ganhos próprios, mesmo que isso signifique menores ganhos para a contraparte.</p>
                        </div>
                        
                        <div class="element-card">
                            <div class="element-icon">
                                <i class="fas fa-users"></i>
                            </div>
                            <h4>Colaborativa</h4>
                            <p>Busca soluções criativas e mutuamente benéficas através de cooperação e transparência.</p>
                        </div>
                    </div>
                </div>
            </div>
        `
    },
    3: {
        title: "Preparação Estratégica",
        content: `
            <div class="modal-step-content">
                <div class="step-intro">
                    <h3>O Diferencial Competitivo</h3>
                    <p>A preparação é o diferencial entre negociadores amadores e profissionais. Uma preparação adequada pode determinar até <strong>70% do sucesso</strong> de uma negociação, sendo mais importante que a habilidade de comunicação durante o processo. Esta estatística foi confirmada pelo estudo longitudinal de Leigh Thompson na Kellogg School of Management (2001), que acompanhou mais de 2.000 negociações empresariais. Howard Raiffa, em "The Art and Science of Negotiation" (1982), demonstrou que negociadores que investem pelo menos 3 horas de preparação para cada hora de negociação atingem 89% de seus objetivos principais, comparado a apenas 23% daqueles que não se preparam adequadamente.</p>
                </div>
                
                <div class="elements-grid">
                    <h3>Elementos da Preparação</h3>
                    <div class="element-cards">
                        <div class="element-card">
                            <div class="element-icon">
                                <i class="fas fa-search"></i>
                            </div>
                            <h4>Análise de Contexto</h4>
                            <p>Avaliação da situação, urgência, alternativas disponíveis e fatores externos que podem influenciar a negociação.</p>
                        </div>
                        
                        <div class="element-card">
                            <div class="element-icon">
                                <i class="fas fa-bullseye"></i>
                            </div>
                            <h4>Definição de Objetivos</h4>
                            <p>Estabelecimento de metas claras, mensuráveis e prioritizadas. Definição de cenários mínimo, realista e ideal.</p>
                        </div>
                        
                        <div class="element-card">
                            <div class="element-icon">
                                <i class="fas fa-user-friends"></i>
                            </div>
                            <h4>Pesquisa da Contraparte</h4>
                            <p>Investigação sobre interesses, limitações, histórico de negociações e estilo de tomada de decisão.</p>
                        </div>
                        
                        <div class="element-card">
                            <div class="element-icon">
                                <i class="fas fa-chess-knight"></i>
                            </div>
                            <h4>Estratégia e Táticas</h4>
                            <p>Desenvolvimento de plano de ação principal e planos de contingência para diferentes cenários possíveis.</p>
                        </div>
                    </div>
                </div>
            </div>
        `
    },
    4: {
        title: "Conceitos Fundamentais",
        content: `
            <div class="modal-step-content">
                <div class="step-intro">
                    <h3>Conceitos-Chave</h3>
                    <p>Dominar os conceitos fundamentais da negociação é essencial para <strong>aplicar as técnicas de forma eficaz</strong> e compreender a dinâmica do processo negocial em sua totalidade. O conceito de ZOPA foi formalmente introduzido por Howard Raiffa em 1982, enquanto BATNA foi desenvolvido por Roger Fisher, William Ury e Bruce Patton no Harvard Negotiation Project. Pesquisas de Max Bazerman e Margaret Neale demonstram que negociadores que compreendem estes conceitos superam em média 60% aqueles que negociam intuitivamente.</p>
                </div>
                
                <div class="elements-grid">
                    <h3>Conceitos Essenciais</h3>
                    <div class="element-cards">
                        <div class="element-card">
                            <div class="element-icon">
                                <i class="fas fa-map-marked-alt"></i>
                            </div>
                            <h4>ZOPA</h4>
                            <p><strong>Zona de Acordo Possível</strong> - Faixa onde existe sobreposição entre o que uma parte está disposta a aceitar e o que a outra está disposta a oferecer.</p>
                        </div>
                        
                        <div class="element-card">
                            <div class="element-icon">
                                <i class="fas fa-route"></i>
                            </div>
                            <h4>BATNA</h4>
                            <p><strong>Melhor Alternativa ao Acordo Negociado</strong> - Sua melhor opção caso a negociação atual não resulte em acordo. Determina seu poder de negociação.</p>
                        </div>
                        
                        <div class="element-card">
                            <div class="element-icon">
                                <i class="fas fa-flag"></i>
                            </div>
                            <h4>Ponto de Reserva</h4>
                            <p>Limite mínimo aceitável em uma negociação. O ponto além do qual é melhor ativar sua BATNA do que aceitar o acordo.</p>
                        </div>
                        
                        <div class="element-card">
                            <div class="element-icon">
                                <i class="fas fa-anchor"></i>
                            </div>
                            <h4>Âncora</h4>
                            <p>Primeira oferta que influencia toda a negociação, criando um ponto de referência psicológico para as discussões subsequentes.</p>
                        </div>
                    </div>
                </div>
                
                <div class="practical-tips">
                    <h3>Aplicação Prática</h3>
                    <ul class="tips-list">
                        <li>Sempre identifique sua BATNA antes de iniciar qualquer negociação</li>
                        <li>Use âncoras estrategicamente para influenciar as expectativas</li>
                        <li>Mantenha flexibilidade dentro da ZOPA para criar valor mútuo</li>
                        <li>Defina pontos de reserva realistas baseados em alternativas concretas</li>
                    </ul>
                </div>
            </div>
        `
    }
};

// Step content data
const stepData = {
    1: {
        title: "1. Preparação",
        content: `
            <div class="modal-step-content">
                <div class="step-intro">
                    <h3>Importância da Preparação</h3>
                    <p>A preparação é considerada o fator mais crítico para o sucesso de uma negociação. Estudos mostram que negociadores bem preparados obtêm resultados <strong>30-50% melhores</strong> que aqueles que improvisam. Esta conclusão é respaldada pela meta-análise de Deepak Malhotra e Max Bazerman (2007), que examinou mais de 150 estudos sobre eficácia negocial. O modelo das 7 etapas da negociação tem suas raízes no trabalho seminal de Neil Rackham em "SPIN Selling" (1988) e foi refinado por pesquisadores do MIT e Wharton School ao longo das últimas três décadas.</p>
                </div>
                
                <div class="elements-grid">
                    <h3>Elementos Essenciais da Preparação</h3>
                    <div class="element-cards">
                        <div class="element-card">
                            <div class="element-icon">
                                <i class="fas fa-bullseye"></i>
                            </div>
                            <h4>Definição de Objetivos</h4>
                            <p>Estabeleça objetivos SMART (Específicos, Mensuráveis, Atingíveis, Relevantes, Temporais). Defina três níveis: mínimo aceitável, objetivo realista e cenário ideal.</p>
                        </div>
                        
                        <div class="element-card">
                            <div class="element-icon">
                                <i class="fas fa-search"></i>
                            </div>
                            <h4>Pesquisa da Contraparte</h4>
                            <p>Colete informações sobre histórico, necessidades, limitações, estilo de negociação e possíveis alternativas da outra parte.</p>
                        </div>
                        
                        <div class="element-card">
                            <div class="element-icon">
                                <i class="fas fa-route"></i>
                            </div>
                            <h4>Desenvolvimento de Estratégias</h4>
                            <p>Prepare múltiplas estratégias e táticas. Antecipe possíveis cenários e desenvolva planos de contingência.</p>
                        </div>
                        
                        <div class="element-card">
                            <div class="element-icon">
                                <i class="fas fa-clipboard-check"></i>
                            </div>
                            <h4>Documentação e Recursos</h4>
                            <p>Organize todos os documentos necessários, dados de apoio, propostas alternativas e materiais de apresentação.</p>
                        </div>
                    </div>
                </div>
                
                <div class="practical-tips">
                    <h3>Dicas Práticas</h3>
                    <ul class="tips-list">
                        <li>Reserve tempo adequado para preparação (mínimo 2x o tempo da negociação)</li>
                        <li>Pratique sua apresentação e argumentos principais</li>
                        <li>Prepare perguntas estratégicas para descobrir interesses ocultos</li>
                        <li>Defina critérios claros para avaliar propostas</li>
                        <li>Identifique sua BATNA (melhor alternativa ao acordo)</li>
                    </ul>
                </div>
            </div>
        `
    },
    2: {
        title: "2. Investigação",
        content: `
            <div class="modal-step-content">
                <div class="step-intro">
                    <h3>Objetivo da Investigação</h3>
                    <p>A investigação visa compreender profundamente a contraparte, seus interesses, limitações e motivações. Esta fase é fundamental para <strong>identificar oportunidades de criação de valor</strong> e evitar mal-entendidos que podem comprometer a negociação. Chris Voss, ex-negociador do FBI e autor de "Never Split the Difference" (2016), demonstrou que técnicas de escuta ativa podem aumentar em até 70% a probabilidade de descobrir interesses ocultos. A pesquisa de Adam Grant na Wharton School confirma que negociadores que fazem pelo menos 5 perguntas abertas na fase inicial obtêm acordos 23% mais vantajosos.</p>
                </div>
                
                <div class="elements-grid">
                    <h3>Técnicas de Investigação</h3>
                    <div class="element-cards">
                        <div class="element-card">
                            <div class="element-icon">
                                <i class="fas fa-headphones"></i>
                            </div>
                            <h4>Escuta Ativa</h4>
                            <p>Pratique a escuta atenta, fazendo perguntas de esclarecimento e demonstrando interesse genuíno pelas preocupações da outra parte. Mantenha contato visual e use linguagem corporal receptiva.</p>
                        </div>
                        
                        <div class="element-card">
                            <div class="element-icon">
                                <i class="fas fa-question-circle"></i>
                            </div>
                            <h4>Perguntas Estratégicas</h4>
                            <p>Use perguntas abertas para descobrir interesses ocultos: "O que é mais importante para vocês neste acordo?" ou "Quais são suas principais preocupações?" Evite perguntas que levem a respostas sim/não.</p>
                        </div>
                        
                        <div class="element-card">
                            <div class="element-icon">
                                <i class="fas fa-handshake"></i>
                            </div>
                            <h4>Construção de Rapport</h4>
                            <p>Estabeleça conexão pessoal através de pontos em comum, experiências compartilhadas e demonstração de empatia. Isso cria um ambiente de confiança mútua.</p>
                        </div>
                        
                        <div class="element-card">
                            <div class="element-icon">
                                <i class="fas fa-database"></i>
                            </div>
                            <h4>Pesquisa Prévia</h4>
                            <p>Colete informações públicas sobre a empresa, setor, desafios recentes e histórico de negociações anteriores. Use LinkedIn, sites corporativos e notícias do setor.</p>
                        </div>
                    </div>
                </div>
                
                <div class="practical-tips">
                    <h3>Informações Essenciais a Descobrir</h3>
                    <ul class="tips-list">
                        <li>Critérios de decisão e processo interno de aprovação</li>
                        <li>Restrições orçamentárias e temporais</li>
                        <li>Alternativas disponíveis (BATNA da contraparte)</li>
                        <li>Pressões internas e externas que enfrentam</li>
                        <li>Experiências anteriores em negociações similares</li>
                        <li>Stakeholders envolvidos na decisão final</li>
                    </ul>
                </div>
            </div>
        `
    },
    3: {
        title: "3. Sinalização",
        content: `
            <div class="modal-step-content">
                <div class="step-intro">
                    <h3>Comunicação de Intenções</h3>
                    <p>A sinalização é o momento de <strong>comunicar suas intenções</strong> e testar as reações da outra parte. É uma fase delicada onde você estabelece as bases para as discussões futuras sem se comprometer definitivamente. Daniel Kahneman, ganhador do Nobel de Economia, em "Thinking, Fast and Slow" (2011), demonstrou como as primeiras informações (ancoragem) influenciam desproporcionalmente todo o processo decisório. Estudos de Amos Tversky confirmam que âncoras bem posicionadas podem mover o resultado final em até 40% na direção desejada.</p>
                </div>
                
                <div class="elements-grid">
                    <h3>Técnicas de Sinalização</h3>
                    <div class="element-cards">
                        <div class="element-card">
                            <div class="element-icon">
                                <i class="fas fa-lightbulb"></i>
                            </div>
                            <h4>Propostas Tentativas</h4>
                            <p>Use linguagem condicional: "E se considerássemos..." ou "Seria possível...". Isso permite testar ideias sem criar compromissos firmes.</p>
                        </div>
                        
                        <div class="element-card">
                            <div class="element-icon">
                                <i class="fas fa-eye"></i>
                            </div>
                            <h4>Observação de Reações</h4>
                            <p>Monitore linguagem corporal, tom de voz e expressões faciais. As reações não-verbais revelam muito sobre a receptividade das ideias.</p>
                        </div>
                        
                        <div class="element-card">
                            <div class="element-icon">
                                <i class="fas fa-comments"></i>
                            </div>
                            <h4>Comunicação Gradual</h4>
                            <p>Revele informações e intenções progressivamente. Comece com aspectos menos sensíveis e avance conforme a receptividade.</p>
                        </div>
                        
                        <div class="element-card">
                            <div class="element-icon">
                                <i class="fas fa-thermometer-half"></i>
                            </div>
                            <h4>Teste de Temperatura</h4>
                            <p>Avalie o clima da negociação. Se as reações forem negativas, recue e explore outras abordagens antes de prosseguir.</p>
                        </div>
                    </div>
                </div>
                
                <div class="practical-tips">
                    <h3>Estratégias de Sinalização</h3>
                    <ul class="tips-list">
                        <li>Use perguntas hipotéticas para testar aceitação de ideias</li>
                        <li>Sinalize flexibilidade em pontos menos importantes</li>
                        <li>Demonstre interesse genuíno pelas preocupações da contraparte</li>
                        <li>Evite compromissos definitivos nesta fase</li>
                        <li>Mantenha múltiplas opções em aberto</li>
                    </ul>
                </div>
            </div>
        `
    },
    4: {
        title: "4. Teste suas hipóteses",
        content: `
            <div class="modal-step-content">
                <div class="step-intro">
                    <h3>Validação de Premissas</h3>
                    <p>Momento crucial para <strong>validar suas suposições</strong> e ajustar a estratégia com base nas informações coletadas. É aqui que você confirma ou refuta suas hipóteses iniciais sobre a negociação.</p>
                </div>
                
                <div class="elements-grid">
                    <h3>Métodos de Validação</h3>
                    <div class="element-cards">
                        <div class="element-card">
                            <div class="element-icon">
                                <i class="fas fa-question"></i>
                            </div>
                            <h4>Perguntas Diretas</h4>
                            <p>Faça perguntas específicas para confirmar suas suposições: "Entendi corretamente que vocês precisam de...?" ou "Posso assumir que...?"</p>
                        </div>
                        
                        <div class="element-card">
                            <div class="element-icon">
                                <i class="fas fa-chart-line"></i>
                            </div>
                            <h4>Análise de Padrões</h4>
                            <p>Compare as informações coletadas com suas hipóteses iniciais. Identifique discrepâncias e ajuste sua compreensão da situação.</p>
                        </div>
                        
                        <div class="element-card">
                            <div class="element-icon">
                                <i class="fas fa-sync-alt"></i>
                            </div>
                            <h4>Ajuste de Estratégia</h4>
                            <p>Modifique sua abordagem com base nas descobertas. Seja flexível para adaptar táticas que não estão funcionando como esperado.</p>
                        </div>
                        
                        <div class="element-card">
                            <div class="element-icon">
                                <i class="fas fa-clipboard-list"></i>
                            </div>
                            <h4>Revisão de Objetivos</h4>
                            <p>Reavalie se seus objetivos iniciais ainda são realistas e relevantes. Ajuste metas conforme necessário baseado nas novas informações.</p>
                        </div>
                    </div>
                </div>
                
                <div class="practical-tips">
                    <h3>Sinais de Alerta</h3>
                    <ul class="tips-list">
                        <li>Resistência inesperada a propostas que pareciam aceitáveis</li>
                        <li>Informações contraditórias sobre prioridades da contraparte</li>
                        <li>Mudanças súbitas no tom ou comportamento</li>
                        <li>Descoberta de stakeholders não identificados inicialmente</li>
                        <li>Prazos ou orçamentos diferentes dos assumidos</li>
                    </ul>
                </div>
            </div>
        `
    },
    5: {
        title: "5. Troca de concessões",
        content: `
            <div class="modal-step-content">
                <div class="step-intro">
                    <h3>Equilíbrio de Interesses</h3>
                    <p>Fase onde ambas as partes fazem <strong>ajustes mútuos</strong>, cedendo em alguns pontos para chegar ao acordo. É o momento de encontrar o equilíbrio que seja satisfatório para todos os envolvidos. Robert Cialdini, em "Influence: The Psychology of Persuasion" (2006), identificou que o princípio da reciprocidade é um dos mais poderosos motivadores humanos. A pesquisa de Shell na Wharton demonstrou que concessões feitas de forma estratégica e condicional geram 35% mais valor total do que concessões unilaterais.</p>
                </div>
                
                <div class="elements-grid">
                    <h3>Estratégias de Concessão</h3>
                    <div class="element-cards">
                        <div class="element-card">
                            <div class="element-icon">
                                <i class="fas fa-gift"></i>
                            </div>
                            <h4>Concessões Estratégicas</h4>
                            <p>Ceda em pontos que custam pouco para você, mas têm alto valor para a contraparte. Maximize o impacto positivo de suas concessões.</p>
                        </div>
                        
                        <div class="element-card">
                            <div class="element-icon">
                                <i class="fas fa-handshake"></i>
                            </div>
                            <h4>Reciprocidade</h4>
                            <p>Sempre que fizer uma concessão, peça algo em troca. Mantenha o equilíbrio e evite concessões unilaterais que enfraquecem sua posição.</p>
                        </div>
                        
                        <div class="element-card">
                            <div class="element-icon">
                                <i class="fas fa-clock"></i>
                            </div>
                            <h4>Timing Adequado</h4>
                            <p>Faça concessões no momento certo. Concessões muito cedo podem ser vistas como fraqueza; muito tarde podem gerar desconfiança.</p>
                        </div>
                        
                        <div class="element-card">
                            <div class="element-icon">
                                <i class="fas fa-shield-alt"></i>
                            </div>
                            <h4>Proteção de Limites</h4>
                            <p>Mantenha seus pontos não-negociáveis protegidos. Seja claro sobre onde não pode ceder e explique as razões quando necessário.</p>
                        </div>
                    </div>
                </div>
                
                <div class="practical-tips">
                    <h3>Táticas Eficazes</h3>
                    <ul class="tips-list">
                        <li>Agrupe concessões em pacotes para maior impacto</li>
                        <li>Use linguagem que valorize suas concessões</li>
                        <li>Documente todas as concessões feitas por ambas as partes</li>
                        <li>Mantenha algumas concessões menores para o final</li>
                        <li>Celebre acordos parciais para manter momentum positivo</li>
                    </ul>
                </div>
            </div>
        `
    },
    6: {
        title: "6. Acordo",
        content: `
            <div class="modal-step-content">
                <div class="step-intro">
                    <h3>Formalização do Acordo</h3>
                    <p>Momento de <strong>consolidar todos os pontos discutidos</strong> e estabelecer os termos finais do acordo de forma clara e objetiva para ambas as partes. É crucial garantir que não haja mal-entendidos.</p>
                </div>
                
                <div class="elements-grid">
                    <h3>Elementos do Acordo</h3>
                    <div class="element-cards">
                        <div class="element-card">
                            <div class="element-icon">
                                <i class="fas fa-clipboard-check"></i>
                            </div>
                            <h4>Resumo Completo</h4>
                            <p>Recapitule todos os pontos acordados, incluindo detalhes específicos, valores, prazos e responsabilidades de cada parte.</p>
                        </div>
                        
                        <div class="element-card">
                            <div class="element-icon">
                                <i class="fas fa-file-contract"></i>
                            </div>
                            <h4>Termos Claros</h4>
                            <p>Use linguagem precisa e evite ambiguidades. Defina claramente o que cada termo significa para evitar interpretações diferentes.</p>
                        </div>
                        
                        <div class="element-card">
                            <div class="element-icon">
                                <i class="fas fa-calendar"></i>
                            </div>
                            <h4>Cronograma Detalhado</h4>
                            <p>Estabeleça datas específicas para entregas, pagamentos e marcos importantes. Inclua consequências para atrasos quando relevante.</p>
                        </div>
                        
                        <div class="element-card">
                            <div class="element-icon">
                                <i class="fas fa-users"></i>
                            </div>
                            <h4>Responsabilidades</h4>
                            <p>Defina claramente quem é responsável por cada aspecto do acordo. Inclua pontos de contato e processos de comunicação.</p>
                        </div>
                    </div>
                </div>
                
                <div class="practical-tips">
                    <h3>🔒 Garantias de Sucesso</h3>
                    <ul class="tips-list">
                        <li>Confirme o entendimento mútuo de cada ponto</li>
                        <li>Documente o acordo por escrito imediatamente</li>
                        <li>Inclua cláusulas para resolução de disputas futuras</li>
                        <li>Defina critérios de sucesso mensuráveis</li>
                        <li>Estabeleça processo para modificações futuras</li>
                        <li>Obtenha aprovações necessárias de todas as partes</li>
                    </ul>
                </div>
            </div>
        `
    },
    7: {
        title: "7. Acerto final",
        content: `
            <div class="modal-step-content">
                <div class="step-intro">
                    <h3>🎯 Consolidação e Acompanhamento</h3>
                    <p>Etapa final onde se garante que <strong>todos os detalhes sejam implementados corretamente</strong> e que o acordo seja cumprido conforme estabelecido. O sucesso da negociação depende da execução eficaz.</p>
                </div>
                
                <div class="elements-grid">
                    <h3>🔧 Implementação Eficaz</h3>
                    <div class="element-cards">
                        <div class="element-card">
                            <div class="element-icon">
                                <i class="fas fa-tasks"></i>
                            </div>
                            <h4>Plano de Implementação</h4>
                            <p>Crie um plano detalhado com etapas específicas, responsáveis e prazos. Transforme o acordo em ações concretas e mensuráveis.</p>
                        </div>
                        
                        <div class="element-card">
                            <div class="element-icon">
                                <i class="fas fa-chart-line"></i>
                            </div>
                            <h4>Monitoramento Contínuo</h4>
                            <p>Estabeleça métricas e pontos de verificação regulares. Monitore o progresso e identifique desvios precocemente.</p>
                        </div>
                        
                        <div class="element-card">
                            <div class="element-icon">
                                <i class="fas fa-comments"></i>
                            </div>
                            <h4>Comunicação Regular</h4>
                            <p>Mantenha canais de comunicação abertos com todas as partes. Realize reuniões de acompanhamento e relatórios de status.</p>
                        </div>
                        
                        <div class="element-card">
                            <div class="element-icon">
                                <i class="fas fa-tools"></i>
                            </div>
                            <h4>Ajustes Necessários</h4>
                            <p>Esteja preparado para fazer ajustes quando necessário. Mantenha flexibilidade para adaptar-se a mudanças de contexto.</p>
                        </div>
                    </div>
                </div>
                
                <div class="practical-tips">
                    <h3>🏆 Garantia de Sucesso</h3>
                    <ul class="tips-list">
                        <li>Documente todas as entregas e marcos atingidos</li>
                        <li>Celebre sucessos parciais para manter motivação</li>
                        <li>Mantenha relacionamento positivo com todas as partes</li>
                        <li>Aprenda com desafios para negociações futuras</li>
                        <li>Avalie resultados contra objetivos iniciais</li>
                        <li>Construa base para futuras colaborações</li>
                    </ul>
                </div>
            </div>
        `
    }
};

function openStepModal(stepNumber) {
    console.log('openStepModal called with:', stepNumber);
    
    // Try both modal structures
    let modal = document.getElementById('stepModal');
    let modalTitle = document.getElementById('modalTitle') || document.getElementById('stepModalTitle');
    let modalContent = document.getElementById('modalContent') || document.getElementById('stepModalContent');
    
    console.log('Modal elements:', { modal, modalTitle, modalContent });
    console.log('Step data:', stepData[stepNumber]);
    
    if (modal && modalTitle && modalContent && stepData[stepNumber]) {
        const step = stepData[stepNumber];
        modalTitle.textContent = step.title;
        modalContent.innerHTML = step.content;
        modal.classList.add('active');
        document.body.classList.add('modal-open');
        console.log('Modal opened successfully');
    } else {
        console.error('Modal opening failed - missing elements or data');
    }
}

function closeStepModal() {
    const modal = document.getElementById('stepModal');
    if (modal) {
        modal.classList.remove('active');
        document.body.classList.remove('modal-open');
    }
}

function openTheoryModal(theoryId) {
    console.log('openTheoryModal called with:', theoryId);
    const modal = document.getElementById('theoryModal');
    const modalTitle = document.getElementById('theoryModalTitle');
    const modalContent = document.getElementById('theoryModalContent');
    
    console.log('Theory modal elements:', { modal, modalTitle, modalContent });
    console.log('Theory data:', theoryData[theoryId]);
    
    if (modal && modalTitle && modalContent && theoryData[theoryId]) {
        const theory = theoryData[theoryId];
        modalTitle.textContent = theory.title;
        modalContent.innerHTML = theory.content;
        modal.style.display = 'block';
        document.body.classList.add('modal-open');
        console.log('Theory modal opened successfully');
    } else {
        console.error('Theory modal opening failed - missing elements or data');
    }
}

function closeTheoryModal() {
    const modal = document.getElementById('theoryModal');
    if (modal) {
        modal.style.display = 'none';
        document.body.classList.remove('modal-open');
    }
}

// Global functions for onclick handlers
window.openStepModal = openStepModal;
window.closeStepModal = closeStepModal;
window.openTheoryModal = openTheoryModal;
window.closeTheoryModal = closeTheoryModal;

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeGoalsForm();
    initializeZOPABATNA();
    initializeChecklist();
    initializeInteractiveSteps();
    
    // Initialize particles if the library is loaded
    if (typeof particlesJS !== 'undefined') {
        initializeParticles();
    }
});
