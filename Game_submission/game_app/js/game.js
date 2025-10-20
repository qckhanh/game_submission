// Game State
let gameState = {
    year: 1,
    maxYears: 10,
    carbon: 50,
    budget: 100,
    happiness: 75,
    decisions: [],
    soundEnabled: true,
    currentCategory: 0,
    features: {} // track currently rendered city features by key
};

// Climate Facts for Menu
const climateFacts = [
    "🌍 Global temperatures have risen by 1.1°C since pre-industrial times.",
    "🌊 Sea levels are rising at 3.3mm per year, threatening coastal cities.",
    "🌳 Forests absorb 2.6 billion tonnes of CO2 annually.",
    "☀️ Solar energy costs have dropped by 89% in the last decade.",
    "🚗 Electric vehicles produce 50% less CO2 than gasoline cars.",
    "♻️ Recycling one ton of paper saves 17 trees and 7,000 gallons of water.",
    "🏭 Industry accounts for 21% of global greenhouse gas emissions.",
    "💡 LED bulbs use 75% less energy than traditional bulbs."
];

// Decision Categories
const categories = ['Energy', 'Transport', 'Waste', 'Industry'];

// Decision Database
const decisions = {
    Energy: [
        {
            title: "City Power Source",
            description: "Choose the primary energy source for your city.",
            choices: [
                {
                    text: "Coal Power Plant",
                    effects: { carbon: 15, budget: -5, happiness: -5 },
                    description: "Cheap but highly polluting"
                },
                {
                    text: "Solar Farm",
                    effects: { carbon: -10, budget: -20, happiness: 10 },
                    description: "Clean energy with high initial cost"
                },
                {
                    text: "Wind Turbines",
                    effects: { carbon: -8, budget: -15, happiness: 5 },
                    description: "Renewable with moderate cost"
                },
                {
                    text: "Nuclear Plant",
                    effects: { carbon: -5, budget: -25, happiness: -10 },
                    description: "Low emissions but controversial"
                }
            ]
        },
        {
            title: "Home Energy Efficiency",
            description: "Implement energy-saving measures in residential areas.",
            choices: [
                {
                    text: "Do Nothing",
                    effects: { carbon: 5, budget: 0, happiness: 0 },
                    description: "Maintain status quo"
                },
                {
                    text: "LED Bulb Program",
                    effects: { carbon: -3, budget: -5, happiness: 5 },
                    description: "Subsidize LED bulbs for homes"
                },
                {
                    text: "Smart Grid System",
                    effects: { carbon: -7, budget: -15, happiness: 8 },
                    description: "Optimize energy distribution"
                },
                {
                    text: "Solar Roof Incentives",
                    effects: { carbon: -10, budget: -20, happiness: 12 },
                    description: "Encourage home solar panels"
                }
            ]
        }
    ],
    Transport: [
        {
            title: "Public Transportation",
            description: "Improve the city's public transport system.",
            choices: [
                {
                    text: "Expand Bus Network",
                    effects: { carbon: -5, budget: -10, happiness: 8 },
                    description: "More buses, less cars"
                },
                {
                    text: "Build Metro System",
                    effects: { carbon: -12, budget: -30, happiness: 15 },
                    description: "Major infrastructure project"
                },
                {
                    text: "Electric Bus Fleet",
                    effects: { carbon: -8, budget: -20, happiness: 10 },
                    description: "Zero-emission public transport"
                },
                {
                    text: "Keep Current System",
                    effects: { carbon: 3, budget: 0, happiness: -5 },
                    description: "No changes"
                }
            ]
        },
        {
            title: "Personal Vehicle Policy",
            description: "Regulate private vehicle usage in the city.",
            choices: [
                {
                    text: "Ban Diesel Cars",
                    effects: { carbon: -10, budget: 5, happiness: -15 },
                    description: "Strict but effective"
                },
                {
                    text: "EV Subsidies",
                    effects: { carbon: -7, budget: -15, happiness: 8 },
                    description: "Encourage electric vehicles"
                },
                {
                    text: "Congestion Tax",
                    effects: { carbon: -5, budget: 10, happiness: -10 },
                    description: "Charge for city center access"
                },
                {
                    text: "Bike Lane Network",
                    effects: { carbon: -6, budget: -10, happiness: 12 },
                    description: "Promote cycling"
                }
            ]
        }
    ],
    Waste: [
        {
            title: "Waste Management System",
            description: "Choose how the city handles waste disposal.",
            choices: [
                {
                    text: "Landfill Expansion",
                    effects: { carbon: 8, budget: -5, happiness: -8 },
                    description: "Cheap but environmentally harmful"
                },
                {
                    text: "Recycling Program",
                    effects: { carbon: -8, budget: -12, happiness: 10 },
                    description: "Reduce, reuse, recycle"
                },
                {
                    text: "Waste-to-Energy Plant",
                    effects: { carbon: -5, budget: -20, happiness: 5 },
                    description: "Convert waste to electricity"
                },
                {
                    text: "Composting Initiative",
                    effects: { carbon: -6, budget: -8, happiness: 8 },
                    description: "Organic waste processing"
                }
            ]
        },
        {
            title: "Plastic Reduction",
            description: "Address plastic pollution in your city.",
            choices: [
                {
                    text: "Ban Single-Use Plastics",
                    effects: { carbon: -7, budget: 0, happiness: -5 },
                    description: "Immediate but unpopular"
                },
                {
                    text: "Plastic Tax",
                    effects: { carbon: -4, budget: 8, happiness: -3 },
                    description: "Economic incentive"
                },
                {
                    text: "Reusable Bag Program",
                    effects: { carbon: -3, budget: -5, happiness: 7 },
                    description: "Encourage alternatives"
                },
                {
                    text: "No Action",
                    effects: { carbon: 5, budget: 0, happiness: 0 },
                    description: "Maintain current practices"
                }
            ]
        }
    ],
    Industry: [
        {
            title: "Industrial Regulations",
            description: "Set environmental standards for factories.",
            choices: [
                {
                    text: "Strict Emission Limits",
                    effects: { carbon: -12, budget: -10, happiness: -8 },
                    description: "Clean but costly for business"
                },
                {
                    text: "Green Technology Incentives",
                    effects: { carbon: -8, budget: -15, happiness: 5 },
                    description: "Support eco-friendly industry"
                },
                {
                    text: "Moderate Standards",
                    effects: { carbon: -3, budget: -5, happiness: 0 },
                    description: "Balanced approach"
                },
                {
                    text: "Minimal Regulation",
                    effects: { carbon: 10, budget: 5, happiness: -10 },
                    description: "Business-friendly, environment-unfriendly"
                }
            ]
        },
        {
            title: "Green Industry Development",
            description: "Invest in sustainable industries.",
            choices: [
                {
                    text: "Tech Innovation Hub",
                    effects: { carbon: -5, budget: -20, happiness: 12 },
                    description: "Attract green tech companies"
                },
                {
                    text: "Circular Economy Program",
                    effects: { carbon: -8, budget: -15, happiness: 8 },
                    description: "Reduce waste in production"
                },
                {
                    text: "Carbon Credit Trading",
                    effects: { carbon: -6, budget: 10, happiness: 3 },
                    description: "Market-based solution"
                },
                {
                    text: "Traditional Industry Focus",
                    effects: { carbon: 7, budget: 10, happiness: -5 },
                    description: "Stick with what works"
                }
            ]
        }
    ]
};

// Random Events
const randomEvents = [
    {
        text: "🌪️ Extreme weather event! Climate change impacts are visible.",
        effects: { carbon: 5, budget: -10, happiness: -10 },
        probability: 0.15
    },
    {
        text: "💡 Scientists develop new green technology!",
        effects: { carbon: -8, budget: 5, happiness: 8 },
        probability: 0.1
    },
    {
        text: "📢 Citizens protest for climate action!",
        effects: { carbon: 0, budget: 0, happiness: -15 },
        probability: 0.12
    },
    {
        text: "🌱 International climate fund grants your city money!",
        effects: { carbon: -5, budget: 20, happiness: 10 },
        probability: 0.08
    },
    {
        text: "🏭 Factory closes due to regulations, unemployment rises.",
        effects: { carbon: -3, budget: -5, happiness: -12 },
        probability: 0.1
    },
    {
        text: "☀️ Perfect weather boosts renewable energy output!",
        effects: { carbon: -10, budget: 5, happiness: 5 },
        probability: 0.12
    }
];

// Sound Effects (using Web Audio API)
const audioContext = new (window.AudioContext || window.webkitAudioContext)();

function playSound(type) {
    if (!gameState.soundEnabled) return;

    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);

    switch(type) {
        case 'click':
            oscillator.frequency.value = 800;
            gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);
            oscillator.start(audioContext.currentTime);
            oscillator.stop(audioContext.currentTime + 0.1);
            break;
        case 'success':
            oscillator.frequency.value = 523.25;
            gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3);
            oscillator.start(audioContext.currentTime);
            oscillator.stop(audioContext.currentTime + 0.3);
            break;
        case 'warning':
            oscillator.frequency.value = 300;
            gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.2);
            oscillator.start(audioContext.currentTime);
            oscillator.stop(audioContext.currentTime + 0.2);
            break;
        case 'gameover':
            oscillator.frequency.value = 200;
            gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5);
            oscillator.start(audioContext.currentTime);
            oscillator.stop(audioContext.currentTime + 0.5);
            break;
    }
}

// Initialize
window.onload = function() {
    displayRandomFact();
    setInterval(displayRandomFact, 8000);
};

function displayRandomFact() {
    document.getElementById('climateFact').textContent = climateFacts[Math.floor(Math.random() * climateFacts.length)];
}

// Screen Navigation
function showScreen(screenId) {
    document.querySelectorAll('.screen').forEach(screen => {
        screen.classList.remove('active');
    });
    document.getElementById(screenId).classList.add('active');
    playSound('click');
}

function showInstructions() {
    showScreen('instructionsScreen');
}

function backToMenu() {
    showScreen('menuScreen');
}

function toggleSound() {
    gameState.soundEnabled = !gameState.soundEnabled;
    document.getElementById('soundIcon').textContent = gameState.soundEnabled ? '🔊' : '🔇';
    document.getElementById('soundText').textContent = gameState.soundEnabled ? 'Sound: ON' : 'Sound: OFF';
    playSound('click');
}

// Game Functions
function startGame() {
    // Reset game state
    gameState = {
        year: 1,
        maxYears: 10,
        carbon: 50,
        budget: 100,
        happiness: 75,
        decisions: [],
        soundEnabled: gameState.soundEnabled,
        currentCategory: 0,
        features: {}
    };

    showScreen('gameScreen');
    updateUI();
    generateCity();
    presentDecision();
    playSound('success');
}

function updateUI() {
    // Compute environment score (higher is better) from carbon emissions
    const environmentScore = Math.max(0, 150 - gameState.carbon);

    // Update year
    document.getElementById('yearDisplay').textContent = `${gameState.year}/${gameState.maxYears}`;

    // Update resources (Environment shown instead of raw carbon)
    document.getElementById('environmentValue').textContent = Math.round(environmentScore);
    document.getElementById('budgetValue').textContent = `${Math.round(gameState.budget)}M`;
    document.getElementById('happinessValue').textContent = `${Math.round(gameState.happiness)}%`;

    // Update resource bars
    updateResourceBar('carbonBar', environmentScore, 150);
    updateResourceBar('budgetBar', gameState.budget, 150);
    updateResourceBar('happinessBar', gameState.happiness, 100);

    // Environment bar color: low score red, mid orange, high green
    const carbonBar = document.getElementById('carbonBar');
    if (environmentScore < 50) {
        carbonBar.style.background = 'linear-gradient(90deg, #f56565, #c53030)';
    } else if (environmentScore < 80) {
        carbonBar.style.background = 'linear-gradient(90deg, #ed8936, #dd6b20)';
    } else {
        carbonBar.style.background = 'linear-gradient(90deg, #48bb78, #38a169)';
    }

    updateBuildingStyles();
    renderCityFeatures();
}

function updateResourceBar(barId, value, max) {
    const percentage = Math.min(Math.max((value / max) * 100, 0), 100);
    document.getElementById(barId).style.width = percentage + '%';
}

function generateCity() {
    const cityBuildings = document.getElementById('cityBuildings');
    cityBuildings.innerHTML = '';

    const buildingCount = 8;
    for (let i = 0; i < buildingCount; i++) {
        const building = document.createElement('div');
        building.className = 'building';
        const height = 80 + Math.random() * 120;
        building.style.height = height + 'px';
        building.style.transformOrigin = 'bottom';
        cityBuildings.appendChild(building);
    }
    updateBuildingStyles();
    renderCityFeatures();
}

function presentDecision() {
    const category = categories[gameState.currentCategory];
    const categoryDecisions = decisions[category];
    const decision = categoryDecisions[Math.floor(Math.random() * categoryDecisions.length)];

    document.getElementById('cardCategory').textContent = category;
    document.getElementById('cardTitle').textContent = decision.title;
    document.getElementById('cardDescription').textContent = decision.description;

    const choicesContainer = document.getElementById('choicesContainer');
    choicesContainer.innerHTML = '';

    decision.choices.forEach((choice) => {
        const choiceBtn = document.createElement('button');
        choiceBtn.className = 'choice-btn';
        choiceBtn.onclick = () => makeDecision(category, decision.title, choice);

        choiceBtn.innerHTML = `
            <div class="choice-title">${choice.text}</div>
            <div class="choice-description">${choice.description}</div>
            <div class="choice-effects">
                ${formatEffect('🌱', choice.effects.carbon)}
                ${formatEffect('💰', choice.effects.budget)}
                ${formatEffect('😊', choice.effects.happiness)}
            </div>
        `;

        choicesContainer.appendChild(choiceBtn);
    });
}

function formatEffect(icon, value) {
    if (value === 0) return '';

    let displayValue; // string with sign + magnitude
    let className;
    let tooltip; // title attribute content

    if (icon === '🌱') {
        // Underlying value is carbon delta; negative means environment improves
        if (value < 0) {
            const abs = Math.abs(value);
            displayValue = `+${abs}`; // environment points gained
            className = 'positive';
            tooltip = `Environment improved by ${abs}`;
        } else {
            displayValue = `-${value}`; // environment points lost
            className = 'negative';
            tooltip = `Environment harmed by ${value}`;
        }
    } else {
        displayValue = (value > 0 ? '+' : '') + value; // native sign formatting
        className = value > 0 ? 'positive' : 'negative';
        const metric = icon === '💰' ? 'Budget' : 'Happiness';
        tooltip = `${metric} ${value > 0 ? 'increased' : 'decreased'} by ${Math.abs(value)}`;
    }

    return `<span class="effect ${className}" title="${tooltip}">${icon} ${displayValue}</span>`;
}


function makeDecision(category, decisionTitle, choice) {
    playSound('click');

    // Apply effects
    gameState.carbon += choice.effects.carbon;
    gameState.budget += choice.effects.budget;
    gameState.happiness += choice.effects.happiness;

    // Clamp values
    gameState.carbon = Math.max(0, gameState.carbon);
    gameState.budget = Math.max(0, gameState.budget);
    gameState.happiness = Math.max(0, Math.min(100, gameState.happiness));

    gameState.decisions.push({
        year: gameState.year,
        category,
        decisionTitle,
        choice: choice.text,
        effects: choice.effects
    });

    // Update city visuals based on decision
    updateCityFeatures(category, decisionTitle, choice.text);

    updateUI();
    generateCity(); // re-render buildings & features

    // Check for random event
    setTimeout(() => {
        if (Math.random() < 0.3) {
            triggerRandomEvent();
        } else {
            nextTurn();
        }
    }, 500);
}

function triggerRandomEvent() {
    const eligibleEvents = randomEvents.filter(event => Math.random() < event.probability);

    if (eligibleEvents.length === 0) {
        nextTurn();
        return;
    }

    const event = eligibleEvents[Math.floor(Math.random() * eligibleEvents.length)];

    showEvent(event.text);
    playSound('warning');

    setTimeout(() => {
        gameState.carbon += event.effects.carbon;
        gameState.budget += event.effects.budget;
        gameState.happiness += event.effects.happiness;

        gameState.carbon = Math.max(0, gameState.carbon);
        gameState.budget = Math.max(0, gameState.budget);
        gameState.happiness = Math.max(0, Math.min(100, gameState.happiness));

        updateUI();

        setTimeout(() => {
            hideEvent();
            nextTurn();
        }, 3000);
    }, 1000);
}

function showEvent(text) {
    const notification = document.getElementById('eventNotification');
    document.getElementById('eventText').textContent = text;
    notification.classList.add('show');
}

function hideEvent() {
    document.getElementById('eventNotification').classList.remove('show');
}

function nextTurn() {
    gameState.year++;
    gameState.currentCategory = (gameState.currentCategory + 1) % categories.length;

    // Check win/lose conditions
    if (gameState.budget <= 0) {
        endGame('bankruptcy');
        return;
    }

    if (gameState.happiness <= 0) {
        endGame('unhappiness');
        return;
    }

    if (gameState.year > gameState.maxYears) {
        endGame('complete');
        return;
    }

    updateUI();
    presentDecision();
}

function endGame(reason) {
    playSound('gameover');

    // Calculate scores
    const environmentScore = Math.max(0, 150 - gameState.carbon); // higher is better
    const carbonScore = environmentScore; // retain for total score calculation compatibility
    const budgetScore = gameState.budget;
    const happinessScore = gameState.happiness;
    const totalScore = Math.round(carbonScore + budgetScore + happinessScore);

    // Determine outcome
    let title, message, rating;

    if (reason === 'bankruptcy') {
        title = '💸 Bankruptcy!';
        message = 'Your city ran out of money. Economic sustainability is as important as environmental sustainability!';
        rating = 'Failed';
    } else if (reason === 'unhappiness') {
        title = '😢 Citizens Revolt!';
        message = 'Your citizens are too unhappy. Remember to balance environmental goals with quality of life!';
        rating = 'Failed';
    } else if (gameState.carbon > 100) {
        title = '🔥 Climate Disaster!';
        message = 'Carbon emissions were too high. The planet cannot sustain this level of pollution!';
        rating = 'Failed';
    } else if (gameState.carbon < 30 && gameState.happiness > 70) {
        title = '🌟 Climate Hero!';
        message = 'Congratulations! You created a sustainable, happy city with low emissions. You are a true climate champion!';
        rating = 'Excellent';
    } else if (gameState.carbon < 50) {
        title = '🌱 Well Done!';
        message = 'You successfully managed your city with reasonable emissions. There is room for improvement, but you are on the right track!';
        rating = 'Good';
    } else {
        title = '⚠️ Could Be Better';
        message = 'You completed the challenge, but emissions are still concerning. Try making bolder green choices next time!';
        rating = 'Average';
    }

    // Display results
    document.getElementById('resultsTitle').textContent = title;
    document.getElementById('finalScore').textContent = `Score: ${totalScore}`;
    document.getElementById('finalEnvironment').textContent = Math.round(environmentScore);
    document.getElementById('finalCarbon').textContent = Math.round(gameState.carbon);
    document.getElementById('finalBudget').textContent = `${Math.round(gameState.budget)}M`;
    document.getElementById('finalHappiness').textContent = `${Math.round(gameState.happiness)}%`;
    document.getElementById('resultsMessage').textContent = message;

    // Generate impact summary
    const impactList = document.getElementById('impactList');
    impactList.innerHTML = '';

    const impacts = [
        `You made ${gameState.decisions.length} major decisions over ${gameState.year - 1} years.`,
        `Environment score: ${Math.round(environmentScore)} (Higher is better; max 150)`,
        `Final carbon emissions: ${Math.round(gameState.carbon)} (Target: <100)`,
        `Your city's rating: ${rating}`,
        environmentScore > 100 ? '✅ Strong environmental performance!' : '❌ Environment performance needs improvement',
        gameState.happiness > 60 ? '✅ Citizens are satisfied!' : '❌ Citizens need better quality of life',
        gameState.budget > 50 ? '✅ Financially sustainable!' : '⚠️ Budget concerns remain'
    ];

    impacts.forEach(impact => {
        const item = document.createElement('div');
        item.className = 'impact-item';
        item.textContent = impact;
        impactList.appendChild(item);
    });

    showScreen('resultsScreen');
}

function pauseGame() {
    playSound('click');
    if (confirm('Pause game? Click OK to return to menu or Cancel to continue playing.')) {
        backToMenu();
    }
}

function updateBuildingStyles() {
    // Visual feedback: higher carbon -> darker / red buildings, higher happiness -> add subtle glow.
    const buildings = document.querySelectorAll('.building');
    buildings.forEach(b => {
        const baseColorLowCarbon = 'linear-gradient(135deg,#4a5568,#2d3748)';
        const highCarbonColor = 'linear-gradient(135deg,#742a2a,#2d3748)';
        const ratio = Math.min(gameState.carbon / 150, 1);
        // Interpolate simple: if ratio > .6 use highCarbonColor else base.
        b.style.background = ratio > 0.6 ? highCarbonColor : baseColorLowCarbon;
        if (gameState.happiness > 80) {
            b.style.boxShadow = '0 0 10px 2px rgba(144,238,144,0.6)';
        } else if (gameState.happiness < 40) {
            b.style.boxShadow = '0 0 10px 2px rgba(255,99,71,0.5)';
        } else {
            b.style.boxShadow = 'none';
        }
    });
}

function updateCityFeatures(category, decisionTitle, choiceText) {
    // Determine a feature key & element spec to render; store in gameState.features for persistence.
    let key = null;
    let html = '';

    // ENERGY
    if (decisionTitle === 'City Power Source') {
        key = 'powerSource';
        if (choiceText === 'Coal Power Plant') html = '<div class="feature coal-plant"><div class="stack"></div><div class="stack"></div><div class="smoke"></div></div>';
        if (choiceText === 'Solar Farm') html = '<div class="feature solar-farm">' + ['','',''].map(()=>'<div class="solar-panel"></div>').join('') + '</div>';
        if (choiceText === 'Wind Turbines') html = '<div class="feature wind-turbines">' + [1,2,3].map(()=>'<div class="wind-turbine"><div class="turbine-blades turbine-spin"><span></span><span></span><span></span></div></div>').join('') + '</div>';
        if (choiceText === 'Nuclear Plant') html = '<div class="feature nuclear-plant"><div class="tower"></div><div class="tower"></div><div class="steam"></div><div class="steam"></div></div>';
    } else if (decisionTitle === 'Home Energy Efficiency') {
        key = 'homeEnergy';
        if (choiceText === 'Do Nothing') html = '';
        if (choiceText === 'LED Bulb Program') html = '<div class="feature led-program">LED</div>';
        if (choiceText === 'Smart Grid System') html = '<div class="feature smart-grid">GRID</div>';
        if (choiceText === 'Solar Roof Incentives') html = '<div class="feature solar-roofs">ROOFS</div>';
    }

    // TRANSPORT
    if (decisionTitle === 'Public Transportation') {
        key = 'publicTransport';
        if (choiceText === 'Expand Bus Network') html = '<div class="feature bus-depot">BUS</div>';
        if (choiceText === 'Build Metro System') html = '<div class="feature metro-station">METRO</div>';
        if (choiceText === 'Electric Bus Fleet') html = '<div class="feature e-bus-depot">E-BUS</div>';
        if (choiceText === 'Keep Current System') html = '';
    } else if (decisionTitle === 'Personal Vehicle Policy') {
        key = 'vehiclePolicy';
        if (choiceText === 'Ban Diesel Cars') html = '<div class="feature congestion-tax">BAN</div>';
        if (choiceText === 'EV Subsidies') html = '<div class="feature ev-station">EV</div>';
        if (choiceText === 'Congestion Tax') html = '<div class="feature congestion-tax">TAX</div>';
        if (choiceText === 'Bike Lane Network') html = '<div class="feature bike-lane"></div>';
    }

    // WASTE
    if (decisionTitle === 'Waste Management System') {
        key = 'wasteSystem';
        if (choiceText === 'Landfill Expansion') html = '<div class="feature landfill"></div>';
        if (choiceText === 'Recycling Program') html = '<div class="feature recycling-center">♻️</div>';
        if (choiceText === 'Waste-to-Energy Plant') html = '<div class="feature waste-energy">W2E</div>';
        if (choiceText === 'Composting Initiative') html = '<div class="feature compost">COMPOST</div>';
    } else if (decisionTitle === 'Plastic Reduction') {
        key = 'plasticPolicy';
        if (choiceText === 'Ban Single-Use Plastics') html = '<div class="feature plastic-ban">NO PLASTIC</div>';
        if (choiceText === 'Plastic Tax') html = '<div class="feature plastic-ban">PLASTIC TAX</div>';
        if (choiceText === 'Reusable Bag Program') html = '<div class="feature recycling-center">BAGS</div>';
        if (choiceText === 'No Action') html = '';
    }

    // INDUSTRY
    if (decisionTitle === 'Industrial Regulations') {
        key = 'industryReg';
        if (choiceText === 'Strict Emission Limits') html = '<div class="feature green-factory"></div>';
        if (choiceText === 'Green Technology Incentives') html = '<div class="feature green-factory"></div>';
        if (choiceText === 'Moderate Standards') html = '<div class="feature factory"></div>';
        if (choiceText === 'Minimal Regulation') html = '<div class="feature factory"></div>';
    } else if (decisionTitle === 'Green Industry Development') {
        key = 'industryDev';
        if (choiceText === 'Tech Innovation Hub') html = '<div class="feature tech-hub">TECH</div>';
        if (choiceText === 'Circular Economy Program') html = '<div class="feature circular-economy">CIRCULAR</div>';
        if (choiceText === 'Carbon Credit Trading') html = '<div class="feature carbon-trading">CO2 TRADE</div>';
        if (choiceText === 'Traditional Industry Focus') html = '<div class="feature factory"></div>';
    }

    if (key !== null) {
        if (!html) {
            delete gameState.features[key];
        } else {
            gameState.features[key] = html;
        }
    }
}

function renderCityFeatures() {
    const container = document.getElementById('cityFeatures');
    if (!container) return;
    container.innerHTML = Object.values(gameState.features).join('');
}