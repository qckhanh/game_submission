# 🏙️ GreenCity Mayor - Multiplayer Edition

## 🎮 Tổng Quan

**GreenCity Mayor Multiplayer** là phiên bản nhiều người chơi của game quản lý đô thị bền vững. 2-10 người chơi có thể cùng nhau quyết định tương lai của thành phố thông qua hệ thống bỏ phiếu dân chủ.

## 🚀 Cách Cài Đặt và Chạy

### Yêu Cầu Hệ Thống
- Node.js v14+ 
- NPM hoặc Yarn
- Trình duyệt web hiện đại

### Cài Đặt
```bash
# Di chuyển vào thư mục multiplayer
cd multiplayer

# Cài đặt dependencies
npm install

# Chạy server
npm start
```

Server sẽ chạy tại `http://localhost:3000`

### Chạy Development Mode
```bash
npm run dev
```

## 🎯 Cách Chơi Multiplayer

### Tạo Phòng và Tham Gia
1. **Tạo phòng mới**: Nhập tên → Click "Tạo Phòng Mới"
2. **Vào phòng có sẵn**: Nhập tên + mã phòng 6 ký tự → Click "Vào Phòng"
3. **Chia sẻ mã phòng** cho bạn bè để họ tham gia

### Gameplay Loop
1. **🏛️ Giai đoạn Đề xuất** (Mayor):
   - Thị trưởng (ngẫu nhiên) được chọn mỗi năm
   - Thị trưởng xem 3 thẻ chính sách và chọn 1 để đề xuất
   - Chỉ hiển thị nội dung chính sách và hiệu ứng cho các người chơi khác

2. **🗳️ Giai đoạn Bỏ phiếu** (30 giây):
   - Tất cả người chơi (trừ Thị trưởng) bỏ phiếu:
     - ✅ **Đồng ý**: Thông qua chính sách
     - ❌ **Không đồng ý**: Từ chối chính sách  
     - ⚪ **Phiếu trắng**: Không ý kiến
   - Chính sách được thông qua nếu: Phiếu đồng ý > Phiếu không đồng ý

3. **📊 Giai đoạn Kết quả**:
   - Hiển thị kết quả bỏ phiếu
   - Áp dụng hiệu ứng chính sách (nếu được thông qua)
   - Chuyển sang năm tiếp theo với Thị trưởng mới

### Điều Kiện Thắng/Thua
- **🎉 Thắng**: Cả 3 chỉ số ≥ 50 sau 10 năm
- **💔 Thua**: Bất kỳ chỉ số nào = 0 hoặc không đạt mục tiêu sau 10 năm

## 🛠️ Kiến Trúc Kỹ Thuật

### Backend (Node.js + Socket.IO)
- **Express.js**: Web server và static file serving
- **Socket.IO**: Real-time bidirectional communication
- **Game Room Management**: Quản lý phòng chơi và trạng thái game
- **Voting System**: Hệ thống bỏ phiếu với timeout tự động

### Frontend (HTML5 + CSS3 + JavaScript)
- **Socket.IO Client**: Kết nối real-time với server
- **State Management**: Quản lý trạng thái game phía client
- **Responsive UI**: Giao diện thích ứng mobile/desktop
- **Real-time Updates**: Cập nhật trực tiếp trạng thái các người chơi

### Tính Năng Real-time
- ⚡ **Instant Updates**: Cập nhật trạng thái game ngay lập tức
- ⏰ **Voting Timer**: Đếm ngược thời gian bỏ phiếu 30 giây
- 👥 **Player Status**: Hiển thị ai đã bỏ phiếu, ai là Thị trưởng
- 🔄 **Mayor Rotation**: Tự động thay đổi Thị trưởng mỗi năm

## 📋 API Events (Socket.IO)

### Client → Server
```javascript
// Tạo phòng mới
socket.emit('createRoom', { playerName: 'Tên người chơi' });

// Vào phòng
socket.emit('joinRoom', { playerName: 'Tên', roomId: 'ROOM01' });

// Bắt đầu game (chỉ Mayor)
socket.emit('startGame');

// Đề xuất chính sách (chỉ Mayor)
socket.emit('proposePolicy', { policyIndex: 0 });

// Bỏ phiếu
socket.emit('vote', { voteType: 'approve' }); // approve/reject/abstain
```

### Server → Client
```javascript
// Cập nhật trạng thái game
socket.on('gameState', (gameState) => { /* ... */ });

// Kết quả bỏ phiếu
socket.on('voteResults', (results) => { /* ... */ });

// Kết thúc game
socket.on('gameEnd', (result) => { /* ... */ });

// Lỗi
socket.on('error', (error) => { /* ... */ });
```

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
