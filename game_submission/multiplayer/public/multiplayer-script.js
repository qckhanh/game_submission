// Multiplayer GreenCity Mayor Client
class MultiplayerGame {
    constructor() {
        this.socket = null;
        this.gameState = null;
        this.playerId = null;
        this.playerName = '';
        this.roomId = '';
        this.votingTimer = null;
        this.isConnected = false;

        // Climate awareness data
        this.climateHistory = [];
        this.achievements = [];
        this.cityElements = {};

        // Climate data for sustainability scoring
        this.climateData = {
            temperatureRise: {
                excellent: { min: 80, temp: 1.2, description: "Xuất sắc - Giới hạn được mức tăng nhiệt độ dưới 1.5°C" },
                good: { min: 60, temp: 1.8, description: "Tốt - Đạt mục tiêu Paris Agreement" },
                moderate: { min: 40, temp: 2.3, description: "Trung bình - Còn cần nỗ lực nhiều hơn" },
                poor: { min: 20, temp: 3.1, description: "Kém - Nguy cơ biến đổi khí hậu nghiêm trọng" },
                critical: { min: 0, temp: 4.2, description: "Nguy hiểm - Thảm họa khí hậu toàn cầu" }
            },
            realWorldFacts: [
                "Theo IPCC, để giới hạn tăng nhiệt độ dưới 1.5°C, thế giới cần giảm 45% lượng khí thải CO2 vào năm 2030.",
                "Hiện tại, mức độ CO2 trong khí quyển đã đạt 421 ppm - mức cao nhất trong 3 triệu năm.",
                "Nếu không có hành động, nhiệt độ toàn cầu có thể tăng 3-5°C vào cuối thế kỷ này.",
                "Năng lượng tái tạo hiện chiếm 30% tổng sản lượng điện toàn cầu và đang tăng nhanh.",
                "Các thành phố tiêu thụ 78% năng lượng toàn cầu và tạo ra 70% lượng khí thải CO2."
            ]
        };

        this.initializeElements();
        this.initializeEventListeners();
        this.initializeCityMap();
        this.connectToServer();
    }

    initializeElements() {
        // Screen elements
        this.screens = {
            connection: document.getElementById('connection-screen'),
            lobby: document.getElementById('lobby-screen'),
            game: document.getElementById('game-screen'),
            end: document.getElementById('end-screen')
        };

        // Connection screen elements
        this.playerNameInput = document.getElementById('player-name');
        this.roomCodeInput = document.getElementById('room-code');
        this.createRoomBtn = document.getElementById('create-room-btn');
        this.joinRoomBtn = document.getElementById('join-room-btn');
        this.connectionStatus = document.getElementById('connection-status');

        // Lobby elements
        this.roomIdDisplay = document.getElementById('room-id-display');
        this.playersContainer = document.getElementById('players-container');
        this.startGameBtn = document.getElementById('start-game-btn');
        this.leaveRoomBtn = document.getElementById('leave-room-btn');

        // Game elements
        this.currentYearSpan = document.getElementById('current-year');
        this.currentRoomIdSpan = document.getElementById('current-room-id');
        this.playersStatusList = document.getElementById('players-status-list');

        // Game phases
        this.proposalPhase = document.getElementById('proposal-phase');
        this.votingPhase = document.getElementById('voting-phase');
        this.resultsPhase = document.getElementById('results-phase');

        // Mayor elements
        this.mayorName = document.getElementById('mayor-name');
        this.mayorCards = document.getElementById('mayor-cards');
        this.mayorCardsGrid = document.getElementById('mayor-cards-grid');
        this.waitingProposal = document.getElementById('waiting-proposal');

        // Voting elements
        this.proposedPolicyCard = document.getElementById('proposed-policy-card');
        this.votingButtons = document.getElementById('voting-buttons');
        this.voteApproveBtn = document.getElementById('vote-approve');
        this.voteRejectBtn = document.getElementById('vote-reject');
        this.voteAbstainBtn = document.getElementById('vote-abstain');
        this.votesCount = document.getElementById('votes-count');
        this.totalVoters = document.getElementById('total-voters');
        this.votingTimer = document.getElementById('voting-timer');
        this.timerFill = document.getElementById('timer-fill');
        this.timerText = document.getElementById('timer-text');

        // Results elements
        this.voteResults = document.getElementById('vote-results');
        this.policyEffect = document.getElementById('policy-effect');

        // End screen elements
        this.victoryScreen = document.getElementById('victory-screen');
        this.defeatScreen = document.getElementById('defeat-screen');
        this.defeatMessage = document.getElementById('defeat-message');
        this.finalEconomy = document.getElementById('final-economy');
        this.finalEnvironment = document.getElementById('final-environment');
        this.finalHappiness = document.getElementById('final-happiness');
        this.newGameBtn = document.getElementById('new-game-btn');
        this.backToLobbyBtn = document.getElementById('back-to-lobby-btn');

        // Error modal
        this.errorModal = document.getElementById('error-modal');
        this.errorMessage = document.getElementById('error-message');
        this.errorOkBtn = document.getElementById('error-ok-btn');

        // Validate that all critical elements exist
        this.validateElements();
    }

    validateElements() {
        const criticalElements = {
            'create-room-btn': this.createRoomBtn,
            'join-room-btn': this.joinRoomBtn,
            'player-name': this.playerNameInput,
            'room-code': this.roomCodeInput
        };

        for (const [elementId, element] of Object.entries(criticalElements)) {
            if (!element) {
                console.error(`Critical element not found: ${elementId}`);
                console.log('Available elements:', Object.keys(document.querySelectorAll('[id]')).map(el => el.id));
            }
        }
    }

    initializeEventListeners() {
        // Add safety checks for all event listeners
        console.log('Initializing event listeners...');

        // Connection events
        if (this.createRoomBtn) {
            this.createRoomBtn.addEventListener('click', () => {
                console.log('Create room button clicked');
                this.createRoom();
            });
        } else {
            console.error('Create room button not found');
        }

        if (this.joinRoomBtn) {
            this.joinRoomBtn.addEventListener('click', () => {
                console.log('Join room button clicked');
                this.joinRoom();
            });
        } else {
            console.error('Join room button not found');
        }

        if (this.playerNameInput) {
            this.playerNameInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') this.createRoom();
            });
        }

        if (this.roomCodeInput) {
            this.roomCodeInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') this.joinRoom();
            });
        }

        // Lobby events
        if (this.startGameBtn) {
            this.startGameBtn.addEventListener('click', () => this.startGame());
        }

        if (this.leaveRoomBtn) {
            this.leaveRoomBtn.addEventListener('click', () => this.leaveRoom());
        }

        // Voting events
        if (this.voteApproveBtn) {
            this.voteApproveBtn.addEventListener('click', () => this.vote('approve'));
        }

        if (this.voteRejectBtn) {
            this.voteRejectBtn.addEventListener('click', () => this.vote('reject'));
        }

        if (this.voteAbstainBtn) {
            this.voteAbstainBtn.addEventListener('click', () => this.vote('abstain'));
        }

        // End screen events
        if (this.newGameBtn) {
            this.newGameBtn.addEventListener('click', () => this.showScreen('connection'));
        }

        if (this.backToLobbyBtn) {
            this.backToLobbyBtn.addEventListener('click', () => this.showScreen('lobby'));
        }

        // Error modal
        if (this.errorOkBtn) {
            this.errorOkBtn.addEventListener('click', () => this.hideError());
        }

        console.log('Event listeners initialized successfully');
    }

    connectToServer() {
        this.showConnectionStatus('Đang kết nối với server...');

        this.socket = io();

        this.socket.on('connect', () => {
            console.log('Connected to server');
            this.isConnected = true;
            this.playerId = this.socket.id;
            this.hideConnectionStatus();
        });

        this.socket.on('disconnect', () => {
            console.log('Disconnected from server');
            this.isConnected = false;
            this.showError('Mất kết nối với server!');
        });

        this.socket.on('roomCreated', (data) => {
            this.roomId = data.roomId;
            this.roomIdDisplay.textContent = data.roomId;
            this.currentRoomIdSpan.textContent = data.roomId;
            this.showScreen('lobby');
        });

        this.socket.on('roomJoined', (data) => {
            this.roomId = data.roomId;
            this.roomIdDisplay.textContent = data.roomId;
            this.currentRoomIdSpan.textContent = data.roomId;
            this.showScreen('lobby');
        });

        this.socket.on('gameState', (gameState) => {
            this.updateGameState(gameState);
        });

        this.socket.on('voteResults', (results) => {
            this.showVoteResults(results);
        });

        this.socket.on('statsWarnings', (data) => {
            this.showStatsWarnings(data.warnings);
        });

        this.socket.on('gameEnd', (result) => {
            this.showGameEnd(result);
        });

        this.socket.on('error', (error) => {
            this.showError(error.message);
        });
    }

    createRoom() {
        const name = this.playerNameInput.value.trim();
        if (!name) {
            this.showError('Vui lòng nhập tên của bạn!');
            return;
        }

        if (!this.isConnected) {
            this.showError('Chưa kết nối được với server!');
            return;
        }

        this.playerName = name;
        this.socket.emit('createRoom', { playerName: name });
    }

    joinRoom() {
        const name = this.playerNameInput.value.trim();
        const roomCode = this.roomCodeInput.value.trim().toUpperCase();

        if (!name) {
            this.showError('Vui lòng nhập tên của bạn!');
            return;
        }

        if (!roomCode || roomCode.length !== 6) {
            this.showError('Vui lòng nhập mã phòng hợp lệ (6 ký tự)!');
            return;
        }

        if (!this.isConnected) {
            this.showError('Chưa kết nối được với server!');
            return;
        }

        this.playerName = name;
        this.socket.emit('joinRoom', {
            playerName: name,
            roomId: roomCode
        });
    }

    startGame() {
        this.socket.emit('startGame');
    }

    leaveRoom() {
        this.showScreen('connection');
        // Socket will automatically handle disconnect
    }

    proposePolicy(policyIndex) {
        this.socket.emit('proposePolicy', { policyIndex });
    }

    vote(voteType) {
        this.socket.emit('vote', { voteType });
        this.disableVotingButtons();
        this.showVoteConfirmation(voteType);
    }

    showVoteConfirmation(voteType) {
        // Create vote confirmation notification
        const notification = document.createElement('div');
        notification.className = 'vote-notification';

        const voteMessages = {
            approve: '✅ Bạn đã bỏ phiếu ĐỒNG Ý',
            reject: '❌ Bạn đã bỏ phiếu KHÔNG ĐỒNG Ý',
            abstain: '⚪ Bạn đã bỏ phiếu TRẮNG'
        };

        notification.innerHTML = `
            <div class="notification-content">
                <span class="notification-icon">${voteType === 'approve' ? '✅' : voteType === 'reject' ? '❌' : '⚪'}</span>
                <span class="notification-text">${voteMessages[voteType]}</span>
            </div>
        `;

        document.body.appendChild(notification);

        // Animate in
        setTimeout(() => notification.classList.add('show'), 100);

        // Remove after 3 seconds
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => notification.remove(), 300);
        }, 3000);
    }

    updateVoteCount(gameState) {
        const nonMayorPlayers = gameState.players.filter(p => !p.isMayor);
        const votedCount = gameState.voteCount || 0;

        this.votesCount.textContent = votedCount;
        this.totalVoters.textContent = nonMayorPlayers.length;

        // Update progress bar
        const progressPercent = nonMayorPlayers.length > 0 ? (votedCount / nonMayorPlayers.length) * 100 : 0;
        const progressBar = document.querySelector('.vote-progress-bar');
        if (progressBar) {
            progressBar.style.width = `${progressPercent}%`;
        }
    }

    updateGameState(gameState) {
        this.gameState = gameState;

        if (gameState.phase === 'waiting') {
            this.updateLobby(gameState);
        } else {
            this.showScreen('game');
            this.updateGameUI(gameState);
            this.updatePlayersStatus(gameState);

            // Update real-time vote count
            if (gameState.phase === 'voting') {
                this.updateVoteCount(gameState);
            }

            switch (gameState.phase) {
                case 'proposing':
                    this.showProposalPhase(gameState);
                    break;
                case 'voting':
                    this.showVotingPhase(gameState);
                    break;
                case 'results':
                    this.showResultsPhase(gameState);
                    break;
            }
        }
    }

    updateLobby(gameState) {
        this.updatePlayersList(gameState.players);

        // Show start button only for mayor
        const currentPlayer = gameState.players.find(p => p.id === this.playerId);
        if (currentPlayer && currentPlayer.isMayor) {
            this.startGameBtn.classList.remove('hidden');
        } else {
            this.startGameBtn.classList.add('hidden');
        }
    }

    updatePlayersList(players) {
        this.playersContainer.innerHTML = '';

        players.forEach(player => {
            const playerCard = document.createElement('div');
            playerCard.className = `player-card ${player.isMayor ? 'mayor' : ''}`;

            playerCard.innerHTML = `
                ${player.isMayor ? '<span class="player-crown">👑</span>' : ''}
                <span>${player.name}</span>
                ${player.id === this.playerId ? ' (Bạn)' : ''}
            `;

            this.playersContainer.appendChild(playerCard);
        });
    }

    updateGameUI(gameState) {
        // Update year
        this.currentYearSpan.textContent = gameState.currentYear;

        // Update stats
        this.updateStats(gameState.stats);

        // Update Mini Map City View
        this.updateCityVisualization(gameState);

        // Update Climate Timeline
        this.updateClimateTimeline(gameState);

        // Store climate history
        this.climateHistory.push({
            year: gameState.currentYear,
            environmentScore: gameState.stats.environment
        });
    }

    updateStats(stats) {
        Object.keys(stats).forEach(stat => {
            const value = Math.max(0, Math.min(100, stats[stat]));

            const valueElement = document.getElementById(`${stat}-value`);
            const barElement = document.getElementById(`${stat}-bar`);

            if (valueElement && barElement) {
                valueElement.textContent = value;
                barElement.style.width = `${value}%`;
            }
        });
    }

    updatePlayersStatus(gameState) {
        this.playersStatusList.innerHTML = '';

        gameState.players.forEach(player => {
            const statusElement = document.createElement('div');
            statusElement.className = 'player-status';

            if (player.isMayor) {
                statusElement.classList.add('mayor');
            }

            // Show who has voted in real-time
            if (gameState.phase === 'voting' && !player.isMayor && player.hasVoted) {
                statusElement.classList.add('voted');
            }

            statusElement.innerHTML = `
                ${player.isMayor ? '👑 ' : ''}
                ${player.name}
                ${player.id === this.playerId ? ' (Bạn)' : ''}
                ${gameState.phase === 'voting' && !player.isMayor && player.hasVoted ? ' ✓' : ''}
            `;

            this.playersStatusList.appendChild(statusElement);
        });
    }

    showProposalPhase(gameState) {
        this.hideAllPhases();
        this.proposalPhase.classList.remove('hidden');

        const currentPlayer = gameState.players.find(p => p.id === this.playerId);
        const mayor = gameState.currentMayor;

        this.mayorName.textContent = mayor ? mayor.name : 'Unknown';

        if (currentPlayer && currentPlayer.isMayor) {
            // Show cards for mayor
            this.mayorCards.classList.remove('hidden');
            this.waitingProposal.classList.add('hidden');
            this.renderMayorCards(gameState.cards);
        } else {
            // Show waiting message for other players
            this.mayorCards.classList.add('hidden');
            this.waitingProposal.classList.remove('hidden');
        }
    }

    renderMayorCards(cards) {
        this.mayorCardsGrid.innerHTML = '';

        cards.forEach((card, index) => {
            const cardElement = this.createCardElement(card, index);
            cardElement.addEventListener('click', () => this.proposePolicy(index));
            this.mayorCardsGrid.appendChild(cardElement);
        });
    }

    createCardElement(card, index) {
        const cardDiv = document.createElement('div');
        cardDiv.className = 'policy-card';

        const effectsHTML = Object.keys(card.effects).map(stat => {
            const value = card.effects[stat];
            if (value === 0) return '';

            const isPositive = value > 0;
            const icon = this.getStatIcon(stat);
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

    getStatIcon(stat) {
        const icons = {
            economy: '💰',
            environment: '🌿',
            happiness: '😊'
        };
        return icons[stat] || '';
    }

    showVotingPhase(gameState) {
        this.hideAllPhases();
        this.votingPhase.classList.remove('hidden');

        const currentPlayer = gameState.players.find(p => p.id === this.playerId);

        // Show proposed policy
        this.renderProposedPolicy(gameState.proposedPolicy);

        // Enable/disable voting buttons based on whether player is mayor
        if (currentPlayer && currentPlayer.isMayor) {
            this.disableVotingButtons();
        } else {
            this.enableVotingButtons();
        }

        // Update vote counts
        const nonMayorPlayers = gameState.players.filter(p => !p.isMayor);
        this.totalVoters.textContent = nonMayorPlayers.length;
        this.votesCount.textContent = '0'; // This would need server support

        // Start countdown timer
        this.startVotingCountdown();
    }

    renderProposedPolicy(policy) {
        const effectsHTML = Object.keys(policy.effects).map(stat => {
            const value = policy.effects[stat];
            if (value === 0) return '';

            const isPositive = value > 0;
            const icon = this.getStatIcon(stat);
            const className = isPositive ? 'positive' : 'negative';
            const sign = isPositive ? '+' : '';
            const statName = this.getStatName(stat);

            return `<div class="effect ${className}">
                ${icon} ${statName}: ${sign}${value}
            </div>`;
        }).filter(html => html !== '').join('');

        this.proposedPolicyCard.innerHTML = `
            <div class="card-title">${policy.title}</div>
            <div class="card-description">${policy.description}</div>
            <div class="card-effects">${effectsHTML}</div>
        `;
    }

    getStatName(stat) {
        const names = {
            economy: 'Kinh Tế',
            environment: 'Môi Trường',
            happiness: 'Hạnh Phúc'
        };
        return names[stat] || stat;
    }

    startVotingCountdown() {
        // Clear any existing timer
        if (this.currentTimer) {
            clearInterval(this.currentTimer);
        }

        let timeLeft = 30;
        this.timerText.textContent = `${timeLeft}s`;
        this.timerFill.style.width = '100%';

        // Add pulsing effect when time is running out
        this.timerFill.classList.remove('timer-warning', 'timer-critical');

        this.currentTimer = setInterval(() => {
            timeLeft--;
            this.timerText.textContent = `${timeLeft}s`;
            this.timerFill.style.width = `${(timeLeft / 30) * 100}%`;

            // Add visual warnings
            if (timeLeft <= 10 && timeLeft > 5) {
                this.timerFill.classList.add('timer-warning');
            } else if (timeLeft <= 5) {
                this.timerFill.classList.add('timer-critical');
            }

            if (timeLeft <= 0) {
                clearInterval(this.currentTimer);
                this.disableVotingButtons();
            }
        }, 1000);
    }

    enableVotingButtons() {
        this.voteApproveBtn.disabled = false;
        this.voteRejectBtn.disabled = false;
        this.voteAbstainBtn.disabled = false;
    }

    disableVotingButtons() {
        this.voteApproveBtn.disabled = true;
        this.voteRejectBtn.disabled = true;
        this.voteAbstainBtn.disabled = true;
    }

    showVoteResults(results) {
        this.hideAllPhases();
        this.resultsPhase.classList.remove('hidden');

        const voteBreakdown = `
            <div class="vote-breakdown">
                <div class="vote-count approve">
                    <div>✅ Đồng Ý</div>
                    <div><strong>${results.approveVotes}</strong></div>
                </div>
                <div class="vote-count reject">
                    <div>❌ Không Đồng Ý</div>
                    <div><strong>${results.rejectVotes}</strong></div>
                </div>
                <div class="vote-count abstain">
                    <div>⚪ Phiếu Trắng</div>
                    <div><strong>${results.abstainVotes}</strong></div>
                </div>
            </div>
            <div class="vote-result ${results.approved ? 'approved' : 'rejected'}">
                ${results.approved ? '✅ Chính sách được THÔNG QUA!' : '❌ Chính sách bị TỪ CHỐI!'}
            </div>
        `;

        this.voteResults.innerHTML = voteBreakdown;

        if (results.approved) {
            const effectsHTML = Object.keys(results.policy.effects).map(stat => {
                const value = results.policy.effects[stat];
                if (value === 0) return '';

                const isPositive = value > 0;
                const icon = this.getStatIcon(stat);
                const className = isPositive ? 'positive' : 'negative';
                const sign = isPositive ? '+' : '';
                const statName = this.getStatName(stat);

                return `<div class="effect ${className}">
                    ${icon} ${statName}: ${sign}${value}
                </div>`;
            }).filter(html => html !== '').join('');

            this.policyEffect.innerHTML = `
                <h4>📈 Hiệu Ứng Chính Sách:</h4>
                <div class="card-effects">${effectsHTML}</div>
            `;
        } else {
            this.policyEffect.innerHTML = `
                <p>Chính sách bị từ chối, không có thay đổi nào.</p>
            `;
        }
    }

    showResultsPhase() {
        // This will be handled by showVoteResults
    }

    showGameEnd(result) {
        this.showScreen('end');

        // Update final stats
        this.finalEconomy.textContent = result.finalStats.economy;
        this.finalEnvironment.textContent = result.finalStats.environment;
        this.finalHappiness.textContent = result.finalStats.happiness;

        // Calculate and display sustainability score
        this.displaySustainabilityResults(result.finalStats);

        // Display achievements
        this.displayAchievements(result.finalStats);

        if (result.victory) {
            this.victoryScreen.classList.remove('hidden');
            this.defeatScreen.classList.add('hidden');
        } else {
            this.victoryScreen.classList.add('hidden');
            this.defeatScreen.classList.remove('hidden');
            this.defeatMessage.textContent = result.message;
        }
    }

    calculateSustainabilityScore(stats) {
        const { economy, environment, happiness } = stats;

        // Weighted calculation emphasizing environment for sustainability
        return Math.round((environment * 0.5) + (economy * 0.25) + (happiness * 0.25));
    }

    getTemperatureRiseData(sustainabilityScore) {
        for (const [level, data] of Object.entries(this.climateData.temperatureRise)) {
            if (sustainabilityScore >= data.min) {
                return data;
            }
        }
        return this.climateData.temperatureRise.critical;
    }

    displaySustainabilityResults(finalStats) {
        const sustainabilityScore = this.calculateSustainabilityScore(finalStats);
        const tempData = this.getTemperatureRiseData(sustainabilityScore);

        // Update sustainability score display
        const scoreElement = document.getElementById('sustainability-score');
        const descriptionElement = document.getElementById('score-description');
        const impactElement = document.getElementById('impact-prediction');
        const realWorldElement = document.getElementById('real-world-data');

        if (scoreElement) {
            scoreElement.textContent = sustainabilityScore;
            // Color-code the score
            if (sustainabilityScore >= 80) scoreElement.style.color = '#27ae60';
            else if (sustainabilityScore >= 60) scoreElement.style.color = '#f39c12';
            else scoreElement.style.color = '#e74c3c';
        }

        if (descriptionElement) {
            descriptionElement.textContent = tempData.description;
        }

        if (impactElement) {
            impactElement.innerHTML = `🌡️ Nếu tất cả thành phố trên thế giới hành xử như GreenCity của bạn, 
                nhiệt độ toàn cầu sẽ tăng ${tempData.temp}°C vào năm 2050.`;
        }

        if (realWorldElement) {
            const randomFact = this.climateData.realWorldFacts[
                Math.floor(Math.random() * this.climateData.realWorldFacts.length)
            ];

            realWorldElement.innerHTML = `
                <strong>📊 Dữ liệu thực tế:</strong><br>
                ${randomFact}
                <br><br>
                <strong>💡 Bạn có biết:</strong> Theo nghiên cứu của IPCC, các thành phố có thể giảm 70% lượng khí thải 
                bằng cách áp dụng các giải pháp xanh như bạn đã thực hiện trong game.
            `;
        }
    }

    displayAchievements(finalStats) {
        const achievementsList = document.getElementById('achievements-list');
        if (!achievementsList) return;

        const achievements = this.calculateAchievements(finalStats);

        achievementsList.innerHTML = '';
        achievements.forEach(achievement => {
            const achievementElement = document.createElement('div');
            achievementElement.className = `achievement ${achievement.earned ? 'earned' : ''}`;

            achievementElement.innerHTML = `
                <div class="achievement-icon">${achievement.icon}</div>
                <div class="achievement-name">${achievement.name}</div>
                <div class="achievement-description">${achievement.description}</div>
            `;

            achievementsList.appendChild(achievementElement);
        });
    }

    calculateAchievements(finalStats) {
        const { economy, environment, happiness } = finalStats;
        const sustainabilityScore = this.calculateSustainabilityScore(finalStats);

        const achievements = [
            {
                icon: '🌱',
                name: 'Eco Hero',
                description: 'Giữ chỉ số môi trường > 80%',
                earned: environment >= 80
            },
            {
                icon: '🧠',
                name: 'Smart Mayor',
                description: 'Đạt điểm bền vững ≥ 70',
                earned: sustainabilityScore >= 70
            },
            {
                icon: '🤝',
                name: 'United Citizens',
                description: 'Tất cả người chơi hoàn thành game',
                earned: true // This would need server support to track
            },
            {
                icon: '⚖️',
                name: 'Perfect Balance',
                description: 'Cân bằng cả 3 chỉ số > 60%',
                earned: economy >= 60 && environment >= 60 && happiness >= 60
            },
            {
                icon: '🌍',
                name: 'Climate Champion',
                description: 'Ngăn chặn biến đổi khí hậu (Môi trường > 70%)',
                earned: environment >= 70
            },
            {
                icon: '💚',
                name: 'Sustainable Future',
                description: 'Đạt điểm bền vững xuất sắc (≥ 80)',
                earned: sustainabilityScore >= 80
            }
        ];

        return achievements;
    }

    // =================== MINI MAP CITY VIEW & CLIMATE TIMELINE ===================

    updateCityVisualization(gameState) {
        const stats = gameState.stats;

        // Update city elements based on policies
        this.updateCityElements(gameState);

        // Update progress indicators
        this.updateProgressIndicators(stats);
    }

    updateCityElements(gameState) {
        const stats = gameState.stats;
        const envScore = stats.environment;
        const economyScore = stats.economy;

        // Show/hide industrial elements based on economy
        const factories = document.querySelectorAll('.industrial');
        factories.forEach((factory, index) => {
            if (economyScore > 70 - (index * 20)) {
                factory.classList.remove('hidden');
                factory.classList.add('new');
                setTimeout(() => factory.classList.remove('new'), 500);
            } else {
                factory.classList.add('hidden');
            }
        });

        // Show/hide environmental elements based on environment score
        const envEffects = document.querySelectorAll('.env-effect');
        envEffects.forEach((effect, index) => {
            if (envScore > 60 + (index * 10)) {
                effect.classList.remove('hidden');
                effect.classList.add('new');
                setTimeout(() => effect.classList.remove('new'), 500);
            } else {
                effect.classList.add('hidden');
            }
        });

        // Update green spaces based on environment
        const greenSpaces = document.querySelectorAll('.green-space');
        greenSpaces.forEach(space => {
            if (envScore < 30) {
                space.style.opacity = '0.3';
                space.style.filter = 'grayscale(70%)';
            } else if (envScore < 60) {
                space.style.opacity = '0.7';
                space.style.filter = 'grayscale(30%)';
            } else {
                space.style.opacity = '1';
                space.style.filter = 'none';
            }
        });
    }

    updateClimateTimeline(gameState) {
        const envScore = gameState.stats.environment;
        const year = gameState.currentYear;

        // Update climate status indicator
        const climateStatus = document.getElementById('climate-status');
        if (climateStatus) {
            climateStatus.className = ''; // Reset classes

            if (envScore < 20) {
                climateStatus.textContent = '🌡️ Khủng hoảng khí hậu';
                climateStatus.classList.add('danger');
                this.showClimateEffects(['pollution', 'drought', 'smog']);
            } else if (envScore < 40) {
                climateStatus.textContent = '⚠️ Biến đổi khí hậu nghiêm trọng';
                climateStatus.classList.add('danger');
                this.showClimateEffects(['pollution', 'drought']);
            } else if (envScore < 60) {
                climateStatus.textContent = '⚠️ Cảnh báo khí hậu';
                climateStatus.classList.add('warning');
                this.showClimateEffects(['pollution']);
            } else if (envScore < 80) {
                climateStatus.textContent = '🌍 Khí hậu ổn định';
                this.showClimateEffects([]);
            } else {
                climateStatus.textContent = '🌱 Khí hậu tốt';
                this.showClimateEffects([]);
            }
        }

        // Add flooding effects for later years with poor environment
        if (year > 5 && envScore < 50) {
            this.showClimateEffects(['flood']);
        }
    }

    showClimateEffects(effectTypes) {
        // Hide all climate effects first
        document.querySelectorAll('.climate-effect').forEach(effect => {
            effect.style.opacity = '0';
        });

        // Show specified effects
        effectTypes.forEach(type => {
            const effects = document.querySelectorAll(`.${type}-cloud, .${type}-area, .${type}`);
            effects.forEach(effect => {
                effect.style.opacity = '0.7';
            });
        });
    }

    updateProgressIndicators(stats) {
        // Update development dots based on economy
        const developmentDots = document.querySelectorAll('[id^="development-"]');
        const economyLevel = Math.floor(stats.economy / 34); // 0-2 dots
        developmentDots.forEach((dot, index) => {
            if (index < economyLevel) {
                dot.classList.add('active');
            } else {
                dot.classList.remove('active');
            }
        });

        // Update ecology dots based on environment
        const ecologyDots = document.querySelectorAll('[id^="ecology-"]');
        const ecologyLevel = Math.floor(stats.environment / 34); // 0-2 dots
        ecologyDots.forEach((dot, index) => {
            if (index < ecologyLevel) {
                dot.classList.add('active');
            } else {
                dot.classList.remove('active');
            }
        });
    }

    initializeCityMap() {
        // Initialize the city map when DOM is ready
        // This method is called during constructor, so we need to ensure DOM elements exist
        console.log('Initializing city map...');

        // Set up initial city state
        this.cityElements = {
            residential: 2,
            commercial: 2,
            greenSpaces: 3,
            infrastructure: 2,
            industrial: 0,
            environmental: 0
        };

        // The visual elements are already in the HTML, so we just need to track them
        console.log('City map initialized successfully');
    }

    showConnectionStatus(message) {
        if (this.connectionStatus && this.connectionStatus.querySelector('p')) {
            this.connectionStatus.querySelector('p').textContent = message;
            this.connectionStatus.classList.remove('hidden');
        }
    }

    hideConnectionStatus() {
        if (this.connectionStatus) {
            this.connectionStatus.classList.add('hidden');
        }
    }

    showError(message) {
        if (this.errorMessage && this.errorModal) {
            this.errorMessage.textContent = message;
            this.errorModal.classList.remove('hidden');
        } else {
            // Fallback if error modal elements don't exist
            alert(message);
        }
    }

    hideError() {
        if (this.errorModal) {
            this.errorModal.classList.add('hidden');
        }
    }

    showScreen(screenName) {
        Object.values(this.screens).forEach(screen => {
            if (screen) screen.classList.remove('active');
        });
        if (this.screens[screenName]) {
            this.screens[screenName].classList.add('active');
        }
    }

    hideAllPhases() {
        if (this.proposalPhase) this.proposalPhase.classList.add('hidden');
        if (this.votingPhase) this.votingPhase.classList.add('hidden');
        if (this.resultsPhase) this.resultsPhase.classList.add('hidden');
    }

    showStatsWarnings(warnings) {
        // Clear existing warnings
        const existingWarnings = document.getElementById('stats-warnings');
        if (existingWarnings) {
            existingWarnings.remove();
        }

        if (!warnings || warnings.length === 0) {
            return;
        }

        // Create warnings container
        const warningsContainer = document.createElement('div');
        warningsContainer.id = 'stats-warnings';
        warningsContainer.className = 'stats-warnings';

        warnings.forEach(warning => {
            const warningElement = document.createElement('div');
            warningElement.className = `stats-warning ${warning.type}`;

            warningElement.innerHTML = `
                <div class="warning-content">
                    <span class="warning-icon">${warning.type === 'critical' ? '🚨' : '⚠️'}</span>
                    <span class="warning-text">${warning.message}</span>
                </div>
            `;

            warningsContainer.appendChild(warningElement);
        });

        document.body.appendChild(warningsContainer);

        // Animate in
        setTimeout(() => warningsContainer.classList.add('show'), 100);

        // Remove after 6 seconds for critical, 4 seconds for warnings
        const displayTime = warnings.some(w => w.type === 'critical') ? 6000 : 4000;
        setTimeout(() => {
            warningsContainer.classList.remove('show');
            setTimeout(() => warningsContainer.remove(), 300);
        }, displayTime);
    }
}

// Initialize the multiplayer game when page loads
document.addEventListener('DOMContentLoaded', () => {
    new MultiplayerGame();
});
