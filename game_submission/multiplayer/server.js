const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const { v4: uuidv4 } = require('uuid');
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
});

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));

// Game rooms storage
const gameRooms = new Map();

// Game configuration
const GAME_CONFIG = {
    MIN_PLAYERS: 2,
    MAX_PLAYERS: 10,
    VOTING_TIME: 30000, // 30 seconds
    MAX_YEARS: 10
};

// Policy Cards Database
const policyCards = [
    {
        id: 'tech_park',
        title: '🏢 Khu Công Nghệ Cao',
        description: 'Xây dựng khu công nghệ cao để thu hút đầu tư và tạo việc làm chất lượng cao.',
        effects: { economy: +15, environment: -8, happiness: +5 }
    },
    {
        id: 'shopping_mall',
        title: '🛍️ Trung Tâm Thương Mại',
        description: 'Xây dựng trung tâm thương mại lớn để thúc đẩy kinh tế và tiêu dùng.',
        effects: { economy: +12, environment: -10, happiness: +8 }
    },
    {
        id: 'industrial_zone',
        title: '🏭 Khu Công Nghiệp',
        description: 'Mở rộng khu công nghiệp để tăng sản xuất và xuất khẩu.',
        effects: { economy: +18, environment: -15, happiness: -5 }
    },
    {
        id: 'solar_power',
        title: '☀️ Năng Lượng Mặt Trời',
        description: 'Đầu tư vào hệ thống năng lượng mặt trời cho toàn thành phố.',
        effects: { economy: -10, environment: +20, happiness: +8 }
    },
    {
        id: 'green_transport',
        title: '🚌 Giao Thông Xanh',
        description: 'Phát triển hệ thống xe buýt điện và làn đường xe đạp.',
        effects: { economy: -8, environment: +15, happiness: +12 }
    },
    {
        id: 'urban_forest',
        title: '🌳 Rừng Đô Thị',
        description: 'Trồng cây xanh và tạo công viên trong thành phố.',
        effects: { economy: -5, environment: +18, happiness: +15 }
    },
    {
        id: 'free_healthcare',
        title: '🏥 Y Tế Miễn Phí',
        description: 'Cung cấp dịch vụ y tế miễn phí cho tất cả người dân.',
        effects: { economy: -15, environment: 0, happiness: +20 }
    },
    {
        id: 'education_reform',
        title: '🎓 Cải Cách Giáo Dục',
        description: 'Đầu tư vào giáo dục chất lượng cao và miễn phí.',
        effects: { economy: -10, environment: +5, happiness: +18 }
    }
];

class GameRoom {
    constructor(roomId) {
        this.roomId = roomId;
        this.players = new Map();
        this.gameState = {
            currentYear: 1,
            maxYears: GAME_CONFIG.MAX_YEARS,
            stats: { economy: 50, environment: 50, happiness: 50 },
            phase: 'waiting', // waiting, proposing, voting, results, ended
            currentMayor: null,
            proposedPolicy: null,
            votes: new Map(),
            votingTimer: null
        };
        this.currentCards = [];
    }

    addPlayer(socket, playerName) {
        const player = {
            id: socket.id,
            name: playerName,
            socket: socket,
            isMayor: false
        };

        this.players.set(socket.id, player);

        // If first player or no mayor, make them mayor
        if (this.players.size === 1 || !this.getCurrentMayor()) {
            this.setMayor(socket.id);
        }

        return player;
    }

    removePlayer(socketId) {
        const removedPlayer = this.players.get(socketId);
        this.players.delete(socketId);

        // If mayor left, assign new mayor
        if (removedPlayer && removedPlayer.isMayor && this.players.size > 0) {
            const nextMayor = this.players.values().next().value;
            this.setMayor(nextMayor.id);
        }

        return removedPlayer;
    }

    setMayor(playerId) {
        // Remove mayor status from all players
        this.players.forEach(player => player.isMayor = false);

        // Set new mayor
        const newMayor = this.players.get(playerId);
        if (newMayor) {
            newMayor.isMayor = true;
            this.gameState.currentMayor = playerId;
        }
    }

    getCurrentMayor() {
        return Array.from(this.players.values()).find(player => player.isMayor);
    }

    canStartGame() {
        return this.players.size >= GAME_CONFIG.MIN_PLAYERS &&
               this.players.size <= GAME_CONFIG.MAX_PLAYERS;
    }

    startGame() {
        if (!this.canStartGame()) return false;

        this.gameState.phase = 'proposing';
        this.drawCards();
        this.broadcastGameState();
        return true;
    }

    drawCards() {
        const shuffled = [...policyCards].sort(() => Math.random() - 0.5);
        this.currentCards = shuffled.slice(0, 3);
    }

    proposePolicy(policyIndex) {
        if (this.gameState.phase !== 'proposing') return false;

        this.gameState.proposedPolicy = this.currentCards[policyIndex];
        this.gameState.phase = 'voting';
        this.gameState.votes.clear();

        // Start voting timer
        this.startVotingTimer();
        return true;
    }

    startVotingTimer() {
        if (this.gameState.votingTimer) {
            clearTimeout(this.gameState.votingTimer);
        }

        this.gameState.votingTimer = setTimeout(() => {
            this.endVoting();
        }, GAME_CONFIG.VOTING_TIME);
    }

    vote(playerId, voteType) {
        if (this.gameState.phase !== 'voting') return false;
        if (playerId === this.gameState.currentMayor) return false; // Mayor cannot vote

        this.gameState.votes.set(playerId, voteType);

        // Check if all non-mayor players have voted
        const nonMayorPlayers = Array.from(this.players.values()).filter(p => !p.isMayor);
        if (this.gameState.votes.size >= nonMayorPlayers.length) {
            this.endVoting();
        }

        return true;
    }

    endVoting() {
        if (this.gameState.votingTimer) {
            clearTimeout(this.gameState.votingTimer);
            this.gameState.votingTimer = null;
        }

        const voteResults = this.calculateVoteResults();

        if (voteResults.approved) {
            this.applyPolicy(this.gameState.proposedPolicy);
        }

        this.gameState.phase = 'results';
        this.broadcastVoteResults(voteResults);

        // Check game end conditions
        setTimeout(() => {
            if (this.checkGameEnd()) {
                this.endGame();
            } else {
                this.nextYear();
            }
        }, 3000);
    }

    calculateVoteResults() {
        const votes = Array.from(this.gameState.votes.values());
        const approveVotes = votes.filter(vote => vote === 'approve').length;
        const rejectVotes = votes.filter(vote => vote === 'reject').length;
        const abstainVotes = votes.filter(vote => vote === 'abstain').length;

        return {
            approved: approveVotes > rejectVotes,
            approveVotes,
            rejectVotes,
            abstainVotes,
            totalVotes: votes.length
        };
    }

    applyPolicy(policy) {
        Object.keys(policy.effects).forEach(stat => {
            this.gameState.stats[stat] += policy.effects[stat];
            this.gameState.stats[stat] = Math.max(0, Math.min(100, this.gameState.stats[stat]));
        });
    }

    checkGameEnd() {
        const { economy, environment, happiness } = this.gameState.stats;

        // Check lose conditions
        if (economy <= 0 || environment <= 0 || happiness <= 0) {
            return true;
        }

        // Check year limit
        if (this.gameState.currentYear >= this.gameState.maxYears) {
            return true;
        }

        return false;
    }

    nextYear() {
        this.gameState.currentYear++;
        this.gameState.phase = 'proposing';
        this.gameState.proposedPolicy = null;
        this.gameState.votes.clear();

        // Rotate mayor
        this.rotateMayor();
        this.drawCards();
        this.broadcastGameState();
    }

    rotateMayor() {
        const playerIds = Array.from(this.players.keys());
        const currentMayorIndex = playerIds.indexOf(this.gameState.currentMayor);
        const nextMayorIndex = (currentMayorIndex + 1) % playerIds.length;
        this.setMayor(playerIds[nextMayorIndex]);
    }

    endGame() {
        this.gameState.phase = 'ended';
        const { economy, environment, happiness } = this.gameState.stats;

        let result = {
            victory: false,
            message: ''
        };

        if (economy <= 0) {
            result.message = 'Thành phố phá sản! Kinh tế sụp đổ hoàn toàn.';
        } else if (environment <= 0) {
            result.message = 'Môi trường bị ô nhiễm nghiêm trọng! Thành phố không còn đáng sống.';
        } else if (happiness <= 0) {
            result.message = 'Người dân hoàn toàn mất niềm tin! Chính quyền bị lật đổ.';
        } else if (economy >= 50 && environment >= 50 && happiness >= 50) {
            result.victory = true;
            result.message = 'Chúc mừng! Thành phố đã phát triển bền vững thành công!';
        } else {
            result.message = 'Thành phố tồn tại được 10 năm nhưng chưa phát triển bền vững hoàn toàn.';
        }

        this.broadcastGameEnd(result);
    }

    broadcastGameState() {
        const currentMayor = this.getCurrentMayor();
        const gameData = {
            currentYear: this.gameState.currentYear,
            maxYears: this.gameState.maxYears,
            stats: this.gameState.stats,
            phase: this.gameState.phase,
            currentMayor: currentMayor ? {
                id: currentMayor.id,
                name: currentMayor.name,
                isMayor: currentMayor.isMayor
            } : null,
            players: Array.from(this.players.values()).map(p => ({
                id: p.id,
                name: p.name,
                isMayor: p.isMayor
            })),
            cards: this.gameState.phase === 'proposing' ? this.currentCards : null,
            proposedPolicy: this.gameState.proposedPolicy
        };

        this.players.forEach(player => {
            player.socket.emit('gameState', gameData);
        });
    }

    broadcastVoteResults(results) {
        this.players.forEach(player => {
            player.socket.emit('voteResults', {
                ...results,
                policy: this.gameState.proposedPolicy
            });
        });
    }

    broadcastGameEnd(result) {
        this.players.forEach(player => {
            player.socket.emit('gameEnd', {
                ...result,
                finalStats: this.gameState.stats
            });
        });
    }
}

// Socket.io connection handling
io.on('connection', (socket) => {
    console.log(`Player connected: ${socket.id}`);

    socket.on('createRoom', (data) => {
        const roomId = uuidv4().substring(0, 6).toUpperCase();
        const room = new GameRoom(roomId);
        gameRooms.set(roomId, room);

        const player = room.addPlayer(socket, data.playerName);
        socket.join(roomId);
        socket.roomId = roomId;

        socket.emit('roomCreated', {
            roomId: roomId,
            player: {
                id: player.id,
                name: player.name,
                isMayor: player.isMayor
            }
        });

        room.broadcastGameState();
    });

    socket.on('joinRoom', (data) => {
        const room = gameRooms.get(data.roomId);
        if (!room) {
            socket.emit('error', { message: 'Phòng không tồn tại!' });
            return;
        }

        if (room.players.size >= GAME_CONFIG.MAX_PLAYERS) {
            socket.emit('error', { message: 'Phòng đã đầy!' });
            return;
        }

        const player = room.addPlayer(socket, data.playerName);
        socket.join(data.roomId);
        socket.roomId = data.roomId;

        socket.emit('roomJoined', {
            roomId: data.roomId,
            player: {
                id: player.id,
                name: player.name,
                isMayor: player.isMayor
            }
        });

        room.broadcastGameState();
    });

    socket.on('startGame', () => {
        const room = gameRooms.get(socket.roomId);
        if (!room) return;

        const player = room.players.get(socket.id);
        if (!player || !player.isMayor) return;

        if (room.startGame()) {
            room.broadcastGameState();
        } else {
            socket.emit('error', { message: 'Không thể bắt đầu game. Cần 2-10 người chơi.' });
        }
    });

    socket.on('proposePolicy', (data) => {
        const room = gameRooms.get(socket.roomId);
        if (!room) return;

        const player = room.players.get(socket.id);
        if (!player || !player.isMayor) return;

        if (room.proposePolicy(data.policyIndex)) {
            room.broadcastGameState();
        }
    });

    socket.on('vote', (data) => {
        const room = gameRooms.get(socket.roomId);
        if (!room) return;

        room.vote(socket.id, data.voteType);
        room.broadcastGameState();
    });

    socket.on('disconnect', () => {
        console.log(`Player disconnected: ${socket.id}`);

        if (socket.roomId) {
            const room = gameRooms.get(socket.roomId);
            if (room) {
                room.removePlayer(socket.id);

                if (room.players.size === 0) {
                    gameRooms.delete(socket.roomId);
                } else {
                    room.broadcastGameState();
                }
            }
        }
    });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`🚀 GreenCity Mayor Multiplayer Server running on port ${PORT}`);
    console.log(`🌐 Open http://localhost:${PORT} to play`);
});
