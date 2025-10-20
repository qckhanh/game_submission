# 🏙️ GreenCity Mayor - Multiplayer Edition

## 🎮 Game Overview

**GreenCity Mayor Multiplayer** is a sustainable city management game where 2-10 players collaborate to build and manage an eco-friendly city through democratic voting. Players take turns as Mayor, proposing policies while others vote on city decisions that affect three key sustainability metrics: Environment, Economy, and Happiness.

The game combines strategic city planning with social dynamics, requiring players to balance competing interests while working toward a common goal of creating a thriving, sustainable metropolis.

## 🚀 Instructions to Run the Game

### System Requirements
- Node.js v14 or higher
- NPM or Yarn package manager
- Modern web browser (Chrome, Firefox, Safari, Edge)
- Internet connection for multiplayer functionality

### Installation & Setup
```bash
# Navigate to the game application directory
cd game_app

# Install required dependencies
npm install

# Start the game server
npm start
```

The game server will run at `http://localhost:3000`

### For Development
```bash
# Run in development mode with auto-reload
npm run dev
```

### How to Play
1. **Create or Join Room**: Enter your name and either create a new room or join existing one with a 6-character room code
2. **Wait for Players**: Game requires 2-10 players to start
3. **Gameplay Loop**:
   - **Mayor Phase**: Current mayor reviews 3 policy cards and proposes one
   - **Voting Phase**: All other players vote (Approve/Reject/Abstain) within 30 seconds
   - **Results Phase**: Policy is implemented if approved, then new mayor is selected
4. **Win Condition**: Keep all three city metrics (Environment, Economy, Happiness) ≥ 50 for 10 years
5. **Lose Condition**: Any metric reaches 0 or fail to meet targets after 10 years

## 📋 Project Summary

### Game Theme & Justification
**Sustainable City Management** was chosen to address the critical global challenge of urban sustainability. As urbanization accelerates worldwide, cities consume 78% of global energy and produce 70% of carbon emissions. This game educates players about the complex trade-offs involved in sustainable urban planning while promoting collaborative decision-making.

### Potential Impact
- **Educational**: Teaches players about sustainability challenges and policy impacts
- **Social**: Develops collaboration and democratic decision-making skills
- **Awareness**: Raises consciousness about environmental issues in urban planning
- **Engagement**: Makes complex policy topics accessible through interactive gameplay

### Technology Stack

#### AI Tools Used
- **ChatGPT/Claude**: Game concept development, code generation, and debugging
- **GitHub Copilot**: Code completion and optimization
- **AI-assisted debugging**: Error resolution and code refinement

#### Web Technologies & Libraries
- **Backend**: Node.js, Express.js, Socket.IO
- **Frontend**: HTML5, CSS3, Vanilla JavaScript
- **Real-time Communication**: Socket.IO for multiplayer functionality
- **State Management**: Custom JavaScript state management
- **Responsive Design**: CSS Grid and Flexbox for mobile/desktop compatibility

### Game Mechanics Overview
- **Turn-based Mayor System**: Rotating leadership with random selection
- **Democratic Voting**: Real-time voting with 30-second time limits
- **Policy Cards**: 50+ unique policies with varied impacts on city metrics
- **Resource Management**: Three interconnected sustainability indicators
- **Progressive Difficulty**: Challenges increase as the city grows
- **Multiplayer Dynamics**: Social interaction and negotiation elements

### Technical Features
- **Real-time Multiplayer**: Up to 10 concurrent players per room
- **Room Management**: Dynamic room creation and joining system
- **Responsive UI**: Works across desktop and mobile devices
- **Auto-save**: Game state persistence throughout sessions
- **Vote Tracking**: Real-time vote counting with visual feedback

### Development Reflection
This project demonstrates the power of AI-assisted development in creating complex multiplayer applications. The integration of democratic gameplay mechanics with environmental themes creates an engaging educational experience that could be expanded for classroom use or public awareness campaigns.

The multiplayer architecture showcases modern web technologies working together to create seamless real-time interactions, while the game design promotes critical thinking about sustainability challenges facing modern cities.

## 🔧 Cấu Hình Game

```javascript
const GAME_CONFIG = {
    MIN_PLAYERS: 2,        // Tối thiểu 2 người
    MAX_PLAYERS: 10,       // Tối đa 10 người
    VOTING_TIME: 30000,    // 30 giây bỏ phiếu
    MAX_YEARS: 10          // 10 năm game
};
```

## 🎨 Giao Diện Multiplayer

### Màn Hình Lobby
- **Danh sách người chơi** với biểu tượng 👑 cho Thị trưởng
- **Mã phòng** để chia sẻ
- **Luật chơi** và hướng dẫn
- **Nút bắt đầu** (chỉ Thị trưởng thấy)

### Màn Hình Game
- **Stats real-time** của thành phố
- **Trạng thái người chơi** (ai là Thị trưởng, ai đã vote)
- **Timer đếm ngược** trong giai đoạn bỏ phiếu
- **Kết quả bỏ phiếu** với biểu đồ trực quan

## 🚀 Deployment

### Development
```bash
npm run dev  # Nodemon auto-restart
```

### Production
```bash
npm start
# hoặc với PM2:
pm2 start server.js --name "greencity-multiplayer"
```

### Environment Variables
```bash
PORT=3000                    # Server port
NODE_ENV=production         # Production mode
```

## 🤝 Tính Năng Xã Hội

- **👥 Collaborative Gameplay**: Cùng nhau quyết định tương lai thành phố
- **🗳️ Democratic Decision Making**: Hệ thống bỏ phiếu dân chủ
- **💬 Implicit Communication**: Thông qua lựa chọn vote thể hiện quan điểm
- **🎭 Role Playing**: Trải nghiệm vai trò lãnh đạo và công dân
- **🏆 Shared Victory**: Thắng/thua cùng nhau, không có cạnh tranh cá nhân

## 🔮 Tính Năng Có Thể Mở Rộng

- **💬 Chat System**: Thêm chat real-time giữa các người chơi
- **📊 Statistics**: Thống kê chi tiết về decisions của từng player
- **🎨 Custom Policies**: Cho phép tạo chính sách tùy chỉnh
- **🌍 Multiple Cities**: Nhiều thành phố cùng lúc với effects tương tác
- **📱 Mobile App**: Phiên bản mobile native
- **🎪 Spectator Mode**: Chế độ xem cho người không chơi

---

*Multiplayer GreenCity Mayor - Tương lai thành phố trong tay bạn và bạn bè!*
