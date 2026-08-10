# 🤖 AGENTS.md — AI Agent Operating Protocol & Prompt Registry

Tệp tài liệu này quy định các quy tắc hoạt động, quy trình kiểm tra trùng lặp prompt (Anti-Duplication Protocol), quy chuẩn đặt tên và quy trình Git Commit dành cho các **AI Coding Assistants** (Antigravity, Claude, ChatGPT, Cursor, Copilot,...) khi tương tác với Repository này.

---

## 🎯 1. Quy định đặt tên & Cấu trúc Tệp (Naming Conventions)

Để duy trì tính ngăn nắp và liên kết 1-1 giữa tệp Prompt và ứng dụng Web:

* **Tệp Prompt**: Đặt ở thư mục gốc dưới dạng `<project-name>.txt` (sử dụng `kebab-case`).
* **Thư mục Ứng dụng**: Đặt ở thư mục gốc dưới dạng `<project-name>/` (sử dụng `kebab-case` trùng tên hoàn toàn với tệp prompt).
* **Tệp GIF Demo (BẮT BUỘC)**: Mọi thư mục ứng dụng **BẮT BUỘC** phải chứa tệp GIF xem trước giao diện động tại `<project-name>/preview.gif` (và/hoặc `<project-name>/public/preview.gif`) để mô phỏng chân thực giao diện web đang hoạt động.

*Ví dụ:*
- Tệp Prompt: `wandor-travel.txt`
- Thư mục dự án: `wandor-travel/`
- Tệp GIF xem trước: `wandor-travel/preview.gif`

---

## 🔍 2. Danh mục Prompt Hiện tại & Quy trình Kiểm tra Trùng lặp (Anti-Duplication Protocol)

Trước khi khởi tạo bất kỳ Prompt hoặc Dự án mới nào, AI Agent **BẮT BUỘC** phải kiểm tra danh sách bên dưới để đảm bảo chủ đề/nhiệm vụ không bị trùng lặp với các dự án đã có.

### 📋 Danh mục 24 Dự án Hiện có (Prompt Catalog Index):

| STT | Project Name | Tệp Prompt | Thư mục Dự án | Lĩnh vực (Domain) | Đặc trưng UI/UX & Tính năng chính |
|---|---|---|---|---|---|
| 1 | **Wandor** | `wandor-travel.txt` | `wandor-travel/` | Du lịch / AI Travel | Background video thiên nhiên, Frosted-glass prompt card, chọn lịch trình du lịch |
| 2 | **Celestial Odyssey** | `space-travel-landing.txt` | `space-travel-landing/` | Du hành Vũ trụ / Sci-Fi | Canvas particle background 3D, Card hành tinh, Modal đặt vé chuyến bay vũ trụ |
| 3 | **Leon Portfolio** | `leon-3d-portfolio.txt` | `leon-3d-portfolio/` | Portfolio 3D Creator | Three.js 3D canvas model, tông tối Cyberpunk/Minimalist, lọc dự án 3D |
| 4 | **Serene** | `serene-wellness.txt` | `serene-wellness/` | Spa & Health Care | Bảng màu Pastel thư thái, danh mục liệu trình, Modal đặt lịch hẹn |
| 5 | **Tiny Trails** | `tinytrails-404.txt` | `tinytrails-404/` | Trang lỗi 404 / Gaming | Mini-game Canvas đom đóm tương tác, hoạt ảnh nhân vật lạc đường |
| 6 | **Aura Email** | `aura-email.txt` | `aura-email/` | Ứng dụng Email / AI App | Bố cục 3 cột chuyên nghiệp, AI tóm tắt thư, Command Palette (`Cmd+K`) |
| 7 | **Atelier Agency** | `atelier-agency.txt` | `atelier-agency/` | Creative Agency | Typography khổ lớn, Magnetic Custom Cursor, Grid video dự án đạt giải |
| 8 | **Velorah** | `velorah-hero.txt` | `velorah-hero/` | Thời trang Cao cấp | Layout phong cách tạp chí, Carousel bộ sưu tập, Quick View Modal |
| 9 | **Measured** | `measured-wearable.txt` | `measured-wearable/` | Health Tech / Wearable | Biểu đồ sinh học thời gian thực, Neon Glow high-tech, xem nhẫn 360° |
| 10 | **Lumora** | `lumora-app.txt` | `lumora-app/` | Nhà thông minh (Smart Home) | Điều chỉnh nhiệt độ màu ánh sáng, công tắc bật/tắt thiết bị theo phòng, biểu đồ năng lượng |
| 11 | **Leon Archive** | `leon-archive.txt` | `leon-archive/` | Kho thử nghiệm 3D / R&D | Preview WebGL Shaders, xem chi tiết 3D Assets, tải tài nguyên thiết kế |
| 12 | **Prisma Studio** | `prisma-studio.txt` | `prisma-studio/` | Digital Agency | Nền Gradient Wave động, khối dịch vụ đa sắc, Form liên hệ tư vấn |
| 13 | **Axion Studio** | `axion-studio.txt` | `axion-studio/` | Design Agency | Shader animated hero (FlutedGlass + ChromaFlow), text-roll hover buttons, video case study cards with expand-on-hover |
| 14 | **Vibrant Wellness** | `vibrant-wellness.txt` | `vibrant-wellness/` | Holistic Wellness / Landing | Full-screen looping background video, Liquid Glass UI (backdrop-blur gradient-border), animated mobile menu, avatar badge pill, bottom stats |
| 15 | **Nora Studio** | `nora-studio.txt` | `nora-studio/` | Motion Designer Portfolio | Staggered splash screen, Canvas spotlight mouse-reveal, word-by-word blur animation, sliding CTA button, slide-down dark glass menu panel |
| 16 | **TerraElix** | `terra-elix.txt` | `terra-elix/` | Supplements / Wellness Hero | Full-viewport background image, DM Sans & Inter typography, word-by-word headline reveal with inline capsule image, 3-panel footer with auto-rotating card carousel, floating desktop product |
| 17 | **CozyPaws** | `cozy-paws.txt` | `cozy-paws/` | Pet Care / E-Commerce Hero | Viewport-height (100vh) layout, DM Serif Display typography, 3 distinct breakpoint layouts (mobile, tablet, desktop), word-pop animation, floating side product & video cards, 3-photo bottom strip with stats overlay |
| 18 | **Adam Roberts** | `adam-roberts.txt` | `adam-roberts/` | Portfolio / Design & Engineering | Full-bleed looping video background, 4-column meta grid, font-pixel (basis33) & Inter typography, play showreel button, award chips (FWA, W., CSSDA), fullscreen mobile menu |
| 19 | **Mostar City** | `mostar-city.txt` | `mostar-city/` | Du lịch / Cinematic Scroll | Standalone page vanilla HTML/CSS/JS, scroll story parallax 3D, multi-layer image blend, infinite sights slider |
| 20 | **SkyElite** | `skyelite-jets.txt` | `skyelite-jets/` | Du thuyền & Hàng không / Private Jets | Hero section video background tràn viền (100vh), typography Inter, menu mobile backdrop-blur, heading hai lớp chèn chữ -12px overlap, CTA Discover & Book Now |
| 21 | **DE</HELPERS** | `dehelpers-hero.txt` | `dehelpers-hero/` | Outsource Dev / Hero Section | Sticky background video, fixed navbar, liquid glass testimonial card, Framer Motion staggered mobile menu |
| 22 | **Void 404** | `void-404.txt` | `void-404/` | Trang lỗi 404 / Cinematic | Full-viewport video background (no overlay), large gradient 404 numeral (Geist Mono SemiBold), centered divider + message, LGPSM pixel-mark logo, React + Vite + Tailwind CSS v4 |
| 23 | **ECHOID** | `echoid-voice.txt` | `echoid-voice/` | Định danh Giọng nói / Voice ID | Single full-viewport hero page, full-bleed cinematic AI face video, right-aligned voice entry panel, sharp rect UI, dual gradient scrim, Google Fonts Sora & JetBrains Mono |
| 24 | **SynapseX** | `synapsex-landing.txt` | `synapsex-landing/` | Giao diện Thần kinh Neural-AI / Interface | Background video full-viewport (5 CloudFront videos), mouse-scrubbed hero video, typography Space Mono & Anton SC, scramble text animations, navbar capsule expanding menu, 3D scroll text, responsive metric grid, 3-layer architecture cards |

---

## 🛡️ 3. Các Bước Kiểm tra Trùng lặp (Checklist cho AI Agent)

Khi người dùng yêu cầu thêm Prompt/Ứng dụng mới, Agent thực hiện 3 bước kiểm tra:

1. **Kiểm tra Lĩnh vực (Domain Overlap Check)**:
   - Ý tưởng mới có thuộc 12 lĩnh vực trên hay không?
   - *Ví dụ*: Nếu người dùng yêu cầu làm "Ứng dụng đặt vé máy bay", Agent cần lưu ý là đã có `wandor-travel` và `space-travel-landing`. Agent cần định hướng tạo sự khác biệt rõ rệt (ví dụ: làm app "Tàu thủy / Du thuyền sang trọng" hoặc mở rộng dự án cũ).

2. **Kiểm tra Tính năng & Component (Feature Overlap Check)**:
   - Các linh kiện UI chính (Canvas 3D, Video Hero, Interactive Game, Command K Palette) đã có ở đâu chưa?
   - Tránh tạo 2 dự án có giao diện và hành vi giống nhau đến >60%.

3. **Cập nhật Chỉ mục**:
   - Nếu Ý tưởng mới đạt tiêu chuẩn không trùng lặp, Agent **BẮT BUỘC** bổ sung hàng mới vào Bảng Chỉ mục ở mục 2 của tệp `AGENTS.md` này và tệp `README.md`.

---

## 🌿 4. Quy chuẩn Commit & Phân chia Git (Git Commit Protocol)

Để duy trì lịch sử Git sạch sẽ, rõ ràng và dễ revert khi cần:

### ⚠️ QUY TẮC VÀNG:
1. **Mỗi dự án/prompt mới BẮT BUỘC nằm trong lượt commit riêng.** Không bao giờ gộp 2 dự án khác nhau vào cùng 1 commit.
2. **Format Commit Message**:
   - Khi thêm dự án mới: `feat(<project-name>): add <Project Name> prompt & application`
   - Khi sửa đổi dự án: `fix(<project-name>): <nội dung sửa>` hoặc `refactor(<project-name>): <nội dung>`
   - Khi cập nhật tài liệu: `docs: update AGENTS.md & README.md for <project-name>`
3. **BẮT BUỘC CHẠY DEMO & CHỜ USER DUYỆT TRƯỚC KHIN COMMIT**:
   - AI Agent **TUYỆT ĐỐI KHÔNG TỰ Ý COMMIT** code ngay sau khi tạo/chỉnh sửa dự án.
   - AI Agent **BẮT BUỘC** phải chạy server demo local (ví dụ `npm run dev`), thông báo cho người dùng xem và duyệt giao diện web.
   - Chỉ khi Người dùng xem demo và phản hồi **đồng ý/duyệt**, Agent mới được thực hiện tạo `preview.gif`, cập nhật tài liệu (`AGENTS.md`, `README.md`), `git commit` và `git push`.

### 🔄 Quy trình 6 Bước cho AI Agent khi thêm Prompt mới:

```bash
# Bước 1: Tạo tệp prompt chuẩn tên
touch <project-name>.txt

# Bước 2: Tạo thư mục ứng dụng và phát triển code
npx -y create-vite@latest <project-name> --template react-ts
# ...phát triển ứng dụng...

# Bước 3: Khởi chạy local dev server & Thông báo Người dùng duyệt Demo
npm run dev
# (Dừng tại đây, gửi link local demo cho User kiểm tra và CHỜ USER DUYỆT)

# Bước 4: Sau khi User ĐỒNG Ý/DUYỆT, tạo tệp preview.gif demo giao diện thực tế
# (Chụp/Render giao diện thực tế và xuất thành <project-name>/preview.gif)

# Bước 5: Thêm vào Git cho riêng dự án đó (bao gồm tệp prompt, ứng dụng & preview.gif)
git add <project-name>.txt <project-name>/
git commit -m "feat(<project-name>): add <Project Name> prompt, application & preview GIF"

# Bước 6: Cập nhật AGENTS.md và README.md, commit và push lên GitHub
git add AGENTS.md README.md
git commit -m "docs: update AGENTS.md and README.md index for <project-name>"
git push origin main
```

---
*Tài liệu này là bộ quy chuẩn vận hành bắt buộc cho mọi AI Agent làm việc trong repository `AI-Prompts`.*
