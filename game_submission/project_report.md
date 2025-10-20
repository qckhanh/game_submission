# GreenCity Mayor - Project Report

## 1. Giới Thiệu Trò Chơi

**GreenCity Mayor** là một trò chơi thẻ bài chiến thuật 2D mô phỏng việc quản lý phát triển đô thị bền vững. Người chơi đóng vai Thị trưởng của một thành phố có tên GreenCity, phải đưa ra các quyết định chính sách trong 10 năm để duy trì sự cân bằng giữa ba yếu tố quan trọng: Kinh tế, Môi trường và Hạnh phúc người dân.

## 2. Lý Do Chọn Chủ Đề

### Thách Thức Phát Triển Đô Thị Bền Vững

Việt Nam đang trải qua quá trình đô thị hóa nhanh chóng với nhiều thách thức:

- **Biến đổi khí hậu**: Ô nhiễm không khí, nước tại các thành phố lớn như Hà Nội, TP.HCM
- **Áp lực kinh tế**: Cần tăng trưởng kinh tế nhưng phải bảo vệ môi trường
- **Chất lượng cuộc sống**: Cân bằng giữa phát triển và hạnh phúc người dân
- **Quy hoạch đô thị**: Các quyết định chính sách có tác động dài hạn

### Tính Thời Sự

- Việt Nam cam kết đạt carbon trung tính vào 2050
- Các thành phố thông minh đang được phát triển (Đà Nẵng, TP.HCM)
- Ý thức môi trường của người dân ngày càng tăng cao
- Nhu cầu phát triển bền vững trong bối cảnh hậu COVID-19

## 3. Tác Động Tiềm Năng

### Giáo Dục và Nhận Thức
- **Hiểu biết về phát triển bền vững**: Game giúp người chơi trải nghiệm trực tiếp sự phức tạp trong việc cân bằng các yếu tố phát triển
- **Tư duy hệ thống**: Mỗi quyết định đều có hậu quả, người chơi học cách suy nghĩt toàn diện
- **Ý thức công dân**: Hiểu được vai trò của chính quyền và trách nhiệm của từng cá nhân

### Ứng Dụng Thực Tế
- **Công cụ giảng dạy**: Có thể sử dụng trong môn Giáo dục công dân, Địa lý
- **Đào tạo cán bộ**: Mô phỏng các tình huống thực tế trong quản lý đô thị
- **Nâng cao nhận thức**: Lan tóa thông điệp về tầm quan trọng của phát triển bền vững

## 4. Công Nghệ Sử Dụng

### Frontend Technologies
- **HTML5**: 
  - Cấu trúc semantic đảm bảo accessibility
  - Canvas và các thẻ media hiện đại
  
- **CSS3**:
  - Flexbox và Grid Layout cho responsive design
  - CSS Variables để quản lý theme
  - Animations và transitions mượt mà
  - Gradient backgrounds tạo visual appeal
  
- **Vanilla JavaScript**:
  - ES6+ features (arrow functions, destructuring, modules)
  - Event-driven programming
  - State management pattern
  - Functional programming concepts

### Design Patterns
- **State Management**: Centralized game state object
- **Event-Driven Architecture**: Loose coupling between components  
- **Factory Pattern**: Card generation system
- **Observer Pattern**: UI updates when state changes

### Performance Optimizations
- **Minimal DOM Manipulation**: Batch updates và efficient selectors
- **CSS Hardware Acceleration**: Transform và opacity cho animations
- **Lazy Loading**: Chỉ load assets khi cần thiết

## 5. Cơ Chế Trò Chơi

### Core Game Loop
1. **Initialization**: Khởi tạo stats (Economy: 50, Environment: 50, Happiness: 50)
2. **Card Drawing**: Rút ngẫu nhiên 3/22 thẻ policy
3. **Decision Making**: Người chơi chọn 1 thẻ
4. **Effect Application**: Áp dụng hiệu ứng lên stats
5. **State Check**: Kiểm tra điều kiện thắng/thua
6. **Next Turn**: Chuyển sang năm tiếp theo

### Balancing Mechanics
- **Starting Balance**: Tất cả stats bắt đầu ở 50/100
- **Win Condition**: Cả 3 stats ≥ 50 sau 10 năm
- **Lose Condition**: Bất kỳ stat nào = 0
- **Card Effects**: Được thiết kế để tạo trade-offs khó khăn

### Policy Card Categories
1. **Economic Focus** (+15~+30 Economy, -5~-25 Environment/Happiness)
2. **Environmental Focus** (+15~+22 Environment, -5~-15 Economy)  
3. **Happiness Focus** (+12~+22 Happiness, -6~-15 Economy)
4. **Balanced Cards** (Moderate effects on multiple stats)
5. **High Risk/Reward** (Extreme positive và negative effects)

### Psychological Elements
- **Loss Aversion**: Sợ mất điểm hơn là muốn được điểm
- **Satisficing vs Optimizing**: Đủ tốt vs tối ưu hóa
- **Short-term vs Long-term**: Cân bằng lợi ích tức thời và dài hạn

## 6. Phản Ánh và Học Hỏi

### Thành Công
- **Gameplay Engaging**: Cơ chế đơn giản nhưng strategic depth cao
- **Educational Value**: Truyền tải message về sustainability hiệu quả
- **Technical Implementation**: Code clean, maintainable, performant
- **User Experience**: Intuitive interface với visual feedback rõ ràng

### Thách Thức và Giải Pháp
1. **Balancing**: 
   - *Thách thức*: Tạo difficulty curve hợp lý
   - *Giải pháp*: Playtesting và iterative balancing

2. **Engagement**:
   - *Thách thức*: Giữ người chơi hứng thú trong 10 turns
   - *Giải pháp*: Varied card effects và clear progression

3. **Educational Impact**:
   - *Thách thức*: Cân bằng giữa fun và educational
   - *Giải pháp*: Embed learning trong core mechanics

### Bài Học Rút Ra
- **Game Design**: Simple rules, complex decisions tạo engaging gameplay
- **Social Impact**: Games có thể là powerful tool cho education
- **Technical Skills**: Vanilla JavaScript vẫn rất mạnh mẽ cho web games
- **User-Centered Design**: Feedback loops và clear communication quan trọng

### Hướng Phát Triển Tương Lai
1. **Multiplayer Mode**: Nhiều người chơi cùng quản lý thành phố
2. **Advanced Mechanics**: Random events, seasonal effects
3. **Data Persistence**: Save/load game state
4. **Analytics**: Track player decisions để improve balancing
5. **Localization**: Hỗ trợ nhiều ngôn ngữ
6. **Mobile App**: Native mobile version
7. **AI Integration**: Smart hints và personalized difficulty

## 7. Kết Luận

GreenCity Mayor thành công trong việc tạo ra một trải nghiệm game vừa thú vị vừa có ý nghĩa giáo dục. Thông qua gameplay đơn giản nhưng sâu sắc, game giúp người chơi hiểu được sự phức tạp trong việc quản lý phát triển đô thị bền vững.

Dự án này không chỉ là một game giải trí mà còn là một công cụ giáo dục hiệu quả, góp phần nâng cao nhận thức cộng đồng về tầm quan trọng của phát triển bền vững trong bối cảnh biến đổi khí hậu và đô thị hóa nhanh chóng tại Việt Nam.

Với foundation vững chắc về mặt kỹ thuật và game design, GreenCity Mayor có tiềm năng phát triển thành một platform giáo dục toàn diện về sustainable urban development.

---
*Báo cáo dự án - October 2025*
