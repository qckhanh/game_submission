// Game State
let gameState = {
    currentYear: 1,
    maxYears: 10,
    stats: {
        economy: 50,
        environment: 50,
        happiness: 50
    },
    isGameActive: false,
    currentCards: []
};

// Policy Cards Database
const policyCards = [
    // Economic Focus Cards
    {
        id: 'tech_park',
        title: '🏢 Khu Công Nghệ Cao',
        description: 'Xây dựng khu công nghệ cao để thu hút đầu tư và tạo việc làm chất lượng cao.',
        effects: {
            economy: +15,
            environment: -8,
            happiness: +5
        }
    },
    {
        id: 'shopping_mall',
        title: '🛍️ Trung Tâm Thương Mại',
        description: 'Xây dựng trung tâm thương mại lớn để thúc đẩy kinh tế và tiêu dùng.',
        effects: {
            economy: +12,
            environment: -10,
            happiness: +8
        }
    },
    {
        id: 'industrial_zone',
        title: '🏭 Khu Công Nghiệp',
        description: 'Mở rộng khu công nghiệp để tăng sản xuất và xuất khẩu.',
        effects: {
            economy: +18,
            environment: -15,
            happiness: -5
        }
    },
    {
        id: 'tax_incentives',
        title: '💸 Ưu Đãi Thuế Doanh Nghiệp',
        description: 'Giảm thuế để thu hút doanh nghiệp đầu tư vào thành phố.',
        effects: {
            economy: +10,
            environment: 0,
            happiness: -8
        }
    },

    // Environmental Focus Cards
    {
        id: 'solar_power',
        title: '☀️ Năng Lượng Mặt Trời',
        description: 'Đầu tư vào hệ thống năng lượng mặt trời cho toàn thành phố.',
        effects: {
            economy: -10,
            environment: +20,
            happiness: +8
        }
    },
    {
        id: 'green_transport',
        title: '🚌 Giao Thông Xanh',
        description: 'Phát triển hệ thống xe buýt điện và làn đường xe đạp.',
        effects: {
            economy: -8,
            environment: +15,
            happiness: +12
        }
    },
    {
        id: 'urban_forest',
        title: '🌳 Rừng Đô Thị',
        description: 'Trồng cây xanh và tạo công viên trong thành phố.',
        effects: {
            economy: -5,
            environment: +18,
            happiness: +15
        }
    },
    {
        id: 'waste_management',
        title: '♻️ Quản Lý Rác Thải',
        description: 'Xây dựng hệ thống tái chế và xử lý rác thải hiện đại.',
        effects: {
            economy: -12,
            environment: +16,
            happiness: +10
        }
    },
    {
        id: 'electric_grid',
        title: '⚡ Lưới Điện Thông Minh',
        description: 'Nâng cấp hệ thống điện để tối ưu hóa năng lượng.',
        effects: {
            economy: -15,
            environment: +22,
            happiness: +5
        }
    },

    // Happiness Focus Cards
    {
        id: 'free_healthcare',
        title: '🏥 Y Tế Miễn Phí',
        description: 'Cung cấp dịch vụ y tế miễn phí cho tất cả người dân.',
        effects: {
            economy: -15,
            environment: 0,
            happiness: +20
        }
    },
    {
        id: 'education_reform',
        title: '🎓 Cải Cách Giáo Dục',
        description: 'Đầu tư vào giáo dục chất lượng cao và miễn phí.',
        effects: {
            economy: -10,
            environment: +5,
            happiness: +18
        }
    },
    {
        id: 'cultural_center',
        title: '🎭 Trung Tâm Văn Hóa',
        description: 'Xây dựng trung tâm văn hóa và nghệ thuật cho cộng đồng.',
        effects: {
            economy: -8,
            environment: +3,
            happiness: +15
        }
    },
    {
        id: 'affordable_housing',
        title: '🏠 Nhà Ở Xã Hội',
        description: 'Xây dựng nhà ở giá rẻ cho người thu nhập thấp.',
        effects: {
            economy: -12,
            environment: -5,
            happiness: +22
        }
    },
    {
        id: 'sports_facilities',
        title: '⚽ Cơ Sở Thể Thao',
        description: 'Xây dựng sân thể thao và trung tâm thể dục công cộng.',
        effects: {
            economy: -6,
            environment: +2,
            happiness: +12
        }
    },

    // Balanced Cards
    {
        id: 'smart_city',
        title: '🤖 Thành Phố Thông Minh',
        description: 'Ứng dụng công nghệ IoT để quản lý thành phố hiệu quả.',
        effects: {
            economy: +8,
            environment: +10,
            happiness: +8
        }
    },
    {
        id: 'startup_incubator',
        title: '💡 Ươm Tạo Startup',
        description: 'Hỗ trợ các công ty khởi nghiệp công nghệ xanh.',
        effects: {
            economy: +10,
            environment: +8,
            happiness: +5
        }
    },
    {
        id: 'eco_tourism',
        title: '🌺 Du Lịch Sinh Thái',
        description: 'Phát triển du lịch bền vững và thân thiện môi trường.',
        effects: {
            economy: +12,
            environment: +6,
            happiness: +10
        }
    },

    // Challenge Cards (High Risk/Reward)
    {
        id: 'casino_resort',
        title: '🎰 Khu Resort Casino',
        description: 'Xây dựng casino lớn để thu hút du khách quốc tế.',
        effects: {
            economy: +25,
            environment: -12,
            happiness: -18
        }
    },
    {
        id: 'oil_refinery',
        title: '🛢️ Nhà Máy Lọc Dầu',
        description: 'Xây dựng nhà máy lọc dầu để phát triển công nghiệp nặng.',
        effects: {
            economy: +30,
            environment: -25,
            happiness: -10
        }
    },
    {
        id: 'nuclear_plant',
        title: '☢️ Nhà Máy Điện Hạt Nhân',
        description: 'Xây dựng nhà máy điện hạt nhân để cung cấp năng lượng sạch.',
        effects: {
            economy: +15,
            environment: +18,
            happiness: -20
        }
    }
];

// DOM Elements
const screens = {
    menu: document.getElementById('menu-screen'),
    instructions: document.getElementById('instructions-screen'),
    game: document.getElementById('game-screen'),
    results: document.getElementById('results-screen')
};

// Initialize Game
document.addEventListener('DOMContentLoaded', function() {
    initializeEventListeners();
    showScreen('menu');
});

function initializeEventListeners() {
    // Menu buttons
    document.getElementById('start-game-btn').addEventListener('click', startNewGame);
    document.getElementById('instructions-btn').addEventListener('click', () => showScreen('instructions'));
    document.getElementById('back-to-menu-btn').addEventListener('click', () => showScreen('menu'));

    // Results buttons
    document.getElementById('play-again-btn').addEventListener('click', startNewGame);
    document.getElementById('menu-btn').addEventListener('click', () => showScreen('menu'));

    // Action feedback
    document.getElementById('next-year-btn').addEventListener('click', nextYear);
}

function showScreen(screenName) {
    Object.values(screens).forEach(screen => screen.classList.remove('active'));
    screens[screenName].classList.add('active');
}

function startNewGame() {
    // Reset game state
    gameState = {
        currentYear: 1,
        maxYears: 10,
        stats: {
            economy: 50,
            environment: 50,
            happiness: 50
        },
        isGameActive: true,
        currentCards: []
    };

    showScreen('game');
    updateUI();
    drawCards();
}

function updateUI() {
    // Update year
    document.getElementById('current-year').textContent = gameState.currentYear;

    // Update stats
    Object.keys(gameState.stats).forEach(stat => {
        const value = Math.max(0, Math.min(100, gameState.stats[stat]));
        gameState.stats[stat] = value;

        document.getElementById(`${stat}-value`).textContent = value;
        document.getElementById(`${stat}-bar`).style.width = `${value}%`;
    });
}

function drawCards() {
    // Shuffle and draw 3 random cards
    const shuffledCards = [...policyCards].sort(() => Math.random() - 0.5);
    gameState.currentCards = shuffledCards.slice(0, 3);

    const cardsGrid = document.getElementById('cards-grid');
    cardsGrid.innerHTML = '';

    gameState.currentCards.forEach((card, index) => {
        const cardElement = createCardElement(card, index);
        cardsGrid.appendChild(cardElement);
    });
}

function createCardElement(card, index) {
    const cardDiv = document.createElement('div');
    cardDiv.className = 'policy-card';
    cardDiv.addEventListener('click', () => selectCard(index));

    const effectsHTML = Object.keys(card.effects).map(stat => {
        const value = card.effects[stat];
        if (value === 0) return '';

        const isPositive = value > 0;
        const icon = getStatIcon(stat);
        const className = isPositive ? 'positive' : 'negative';
        const sign = isPositive ? '+' : '';

        return `<div class="effect ${className}">
            ${icon} ${sign}${value}
        </div>`;
    }).filter(html => html !== '').join('');

    cardDiv.innerHTML = `
        <div class="card-title">${card.title}</div>
        <div class="card-description">${card.description}</div>
        <div class="card-effects">${effectsHTML}</div>
    `;

    return cardDiv;
}

function getStatIcon(stat) {
    const icons = {
        economy: '💰',
        environment: '🌿',
        happiness: '😊'
    };
    return icons[stat] || '';
}

function selectCard(cardIndex) {
    if (!gameState.isGameActive) return;

    const selectedCard = gameState.currentCards[cardIndex];
    applyCardEffects(selectedCard);
    showActionFeedback(selectedCard);
}

function applyCardEffects(card) {
    Object.keys(card.effects).forEach(stat => {
        gameState.stats[stat] += card.effects[stat];
    });
    updateUI();
}

function showActionFeedback(card) {
    document.getElementById('feedback-title').textContent = card.title;
    document.getElementById('feedback-description').textContent = card.description;

    const effectsHTML = Object.keys(card.effects).map(stat => {
        const value = card.effects[stat];
        if (value === 0) return '';

        const isPositive = value > 0;
        const icon = getStatIcon(stat);
        const className = isPositive ? 'positive' : 'negative';
        const sign = isPositive ? '+' : '';
        const statName = getStatName(stat);

        return `<div class="effect ${className}">
            ${icon} ${statName}: ${sign}${value}
        </div>`;
    }).filter(html => html !== '').join('');

    document.getElementById('feedback-effects').innerHTML = effectsHTML;
    document.getElementById('action-feedback').classList.remove('hidden');
}

function getStatName(stat) {
    const names = {
        economy: 'Kinh Tế',
        environment: 'Môi Trường',
        happiness: 'Hạnh Phúc'
    };
    return names[stat] || stat;
}

function nextYear() {
    document.getElementById('action-feedback').classList.add('hidden');

    // Check for game over conditions
    if (checkGameOver()) {
        return;
    }

    gameState.currentYear++;

    // Check for victory
    if (gameState.currentYear > gameState.maxYears) {
        checkVictory();
        return;
    }

    updateUI();
    drawCards();
}

function checkGameOver() {
    const { economy, environment, happiness } = gameState.stats;

    if (economy <= 0) {
        endGame(false, 'Thành phố phá sản! Kinh tế sụp đổ hoàn toàn.');
        return true;
    }

    if (environment <= 0) {
        endGame(false, 'Môi trường bị ô nhiễm nghiêm trọng! Thành phố không còn đáng sống.');
        return true;
    }

    if (happiness <= 0) {
        endGame(false, 'Người dân hoàn toàn mất niềm tin! Bạn bị phế truất khỏi chức vụ.');
        return true;
    }

    return false;
}

function checkVictory() {
    const { economy, environment, happiness } = gameState.stats;

    if (economy >= 50 && environment >= 50 && happiness >= 50) {
        endGame(true);
    } else {
        endGame(false, 'Bạn đã trụ được 10 năm nhưng thành phố chưa thật sự phát triển bền vững. Một hoặc nhiều chỉ số còn quá thấp.');
    }
}

function endGame(isVictory, defeatMessage = '') {
    gameState.isGameActive = false;

    // Update final stats
    document.getElementById('final-economy').textContent = gameState.stats.economy;
    document.getElementById('final-environment').textContent = gameState.stats.environment;
    document.getElementById('final-happiness').textContent = gameState.stats.happiness;

    if (isVictory) {
        document.getElementById('victory-screen').classList.remove('hidden');
        document.getElementById('defeat-screen').classList.add('hidden');
    } else {
        document.getElementById('victory-screen').classList.add('hidden');
        document.getElementById('defeat-screen').classList.remove('hidden');
        document.getElementById('defeat-message').textContent = defeatMessage;
    }

    showScreen('results');
}

// Add some random events for more challenge
function triggerRandomEvent() {
    if (Math.random() < 0.3) { // 30% chance per year
        const events = [
            {
                name: 'Suy thoái kinh tế toàn cầu',
                effects: { economy: -10, environment: 0, happiness: -5 }
            },
            {
                name: 'Phong trào bảo vệ môi trường',
                effects: { economy: -5, environment: +8, happiness: +3 }
            },
            {
                name: 'Lễ hội văn hóa thành công',
                effects: { economy: +5, environment: 0, happiness: +8 }
            }
        ];

        const event = events[Math.floor(Math.random() * events.length)];

        // Apply event effects
        Object.keys(event.effects).forEach(stat => {
            gameState.stats[stat] += event.effects[stat];
        });

        // Show notification (could be enhanced with a modal)
        console.log(`Sự kiện ngẫu nhiên: ${event.name}`);
    }
}
