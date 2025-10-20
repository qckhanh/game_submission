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

        this.initializeElements();
        this.initializeEventListeners();
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
    }

    initializeEventListeners() {
        // Connection events
        this.createRoomBtn.addEventListener('click', () => this.createRoom());
        this.joinRoomBtn.addEventListener('click', () => this.joinRoom());
        this.playerNameInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.createRoom();
        });
        this.roomCodeInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.joinRoom();
        });

        // Lobby events
        this.startGameBtn.addEventListener('click', () => this.startGame());
        this.leaveRoomBtn.addEventListener('click', () => this.leaveRoom());

        // Voting events
        this.voteApproveBtn.addEventListener('click', () => this.vote('approve'));
        this.voteRejectBtn.addEventListener('click', () => this.vote('reject'));
        this.voteAbstainBtn.addEventListener('click', () => this.vote('abstain'));

        // End screen events
        this.newGameBtn.addEventListener('click', () => this.showScreen('connection'));
        this.backToLobbyBtn.addEventListener('click', () => this.showScreen('lobby'));

        // Error modal
        this.errorOkBtn.addEventListener('click', () => this.hideError());
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
    }

    updateGameState(gameState) {
        this.gameState = gameState;

        if (gameState.phase === 'waiting') {
            this.updateLobby(gameState);
        } else {
            this.showScreen('game');
            this.updateGameUI(gameState);
            this.updatePlayersStatus(gameState);

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

            // In voting phase, show who has voted
            if (gameState.phase === 'voting' && !player.isMayor) {
                // This would need server support to track votes
                statusElement.classList.add('voted');
            }

            statusElement.innerHTML = `
                ${player.isMayor ? '👑 ' : ''}
                ${player.name}
                ${player.id === this.playerId ? ' (Bạn)' : ''}
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
        let timeLeft = 30;
        this.timerText.textContent = `${timeLeft}s`;
        this.timerFill.style.width = '100%';

        const timer = setInterval(() => {
            timeLeft--;
            this.timerText.textContent = `${timeLeft}s`;
            this.timerFill.style.width = `${(timeLeft / 30) * 100}%`;

            if (timeLeft <= 0) {
                clearInterval(timer);
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

        if (result.victory) {
            this.victoryScreen.classList.remove('hidden');
            this.defeatScreen.classList.add('hidden');
        } else {
            this.victoryScreen.classList.add('hidden');
            this.defeatScreen.classList.remove('hidden');
            this.defeatMessage.textContent = result.message;
        }
    }

    hideAllPhases() {
        this.proposalPhase.classList.add('hidden');
        this.votingPhase.classList.add('hidden');
        this.resultsPhase.classList.add('hidden');
    }

    showScreen(screenName) {
        Object.values(this.screens).forEach(screen => screen.classList.remove('active'));
        this.screens[screenName].classList.add('active');
    }

    showConnectionStatus(message) {
        this.connectionStatus.querySelector('p').textContent = message;
        this.connectionStatus.classList.remove('hidden');
    }

    hideConnectionStatus() {
        this.connectionStatus.classList.add('hidden');
    }

    showError(message) {
        this.errorMessage.textContent = message;
        this.errorModal.classList.remove('hidden');
    }

    hideError() {
        this.errorModal.classList.add('hidden');
    }
}

// Initialize the multiplayer game when page loads
document.addEventListener('DOMContentLoaded', () => {
    new MultiplayerGame();
});
