---
name: "CHẠM Flora"
description: "Landing page game hóa hành động xanh cho Gen Z và kết nối nhà tài trợ"
colors:
  primary: "#e3a11d"
  primary-deep: "#4f3516"
  accent-petal: "#f58fb1"
  accent-mint: "#82bf47"
  neutral-bg: "#fffaf2"
  neutral-fg: "#2f2416"
  neutral-card: "#fffdf8"
  bloom-gold: "#ffcb45"
typography:
  display:
    fontFamily: "var(--font-be-vietnam-pro), var(--font-inter), sans-serif"
    fontSize: "clamp(2rem, 5vw, 4rem)"
    fontWeight: 800
    lineHeight: 1.2
    letterSpacing: "-0.02em"
  body:
    fontFamily: "var(--font-be-vietnam-pro), var(--font-inter), sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.6
rounded:
  sm: "0.5rem"
  md: "1rem"
  lg: "2rem"
spacing:
  sm: "1rem"
  md: "2rem"
  lg: "4rem"
components:
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.primary-deep}"
    rounded: "9999px"
    padding: "12px 24px"
  button-primary-hover:
    backgroundColor: "{colors.primary}"
---

# Design System: CHẠM Flora

## 1. Overview

**Creative North Star: "The Gamified Green Oasis" (Ốc đảo xanh game hóa)**

Hệ thống thiết kế CHẠM Flora được xây dựng để mang đến một không gian tràn ngập năng lượng sinh động, gần gũi với thiên nhiên nhưng đầy tính tương tác thế hệ mới. Hệ thống là sự giao thoa độc đáo giữa phong cách game hóa (Gamified) trẻ trung, các yếu tố đồ họa 3D nổi bật (Neo-brutalism nhẹ nhàng) và bảng màu hữu cơ (Organic) ấm áp. Thiết kế hướng tới việc thuyết phục doanh nghiệp tài trợ bằng sự chuyên nghiệp của cấu trúc thông tin, đồng thời tạo sức hút hành động xanh cho thế hệ Gen Z bằng các hiệu ứng đung đưa, chuyển động nổi.

Hệ thống thiết kế này loại bỏ hoàn toàn các phong cách xám xịt, tối giản lạnh lùng của SaaS truyền thống và thay thế bằng các góc bo tròn lớn, viền dày thân thiện và các nút bấm có chiều sâu xúc giác.

**Key Characteristics:**
- **Organic & Tactile**: Sử dụng các đường viền dày (2.5px), các nút bấm dạng khối 3D tạo cảm giác vật lý sống động.
- **Friendly Geometry**: Các container dạng thẻ (cards) được bo tròn lớn (32px / 2rem) để giảm bớt sự cứng nhắc.
- **Playful Animation**: Các hiệu ứng đung đưa (sway) và nổi bồng bềnh (float) nhẹ nhàng mô phỏng sự phát triển của cỏ cây hoa lá.

## 2. Colors

Bảng màu của CHẠM Flora lấy cảm hứng từ thiên nhiên nhiệt đới ấm áp với các tông màu mật ong, hồng cánh hoa và xanh bạc hà tươi mát.

### Primary
- **Honey Mid** (#e3a11d): Màu vàng mật ong ấm áp, sử dụng làm màu chủ đạo cho các CTA chính, các điểm nhấn quan trọng và trạng thái active.
- **Forest Deep** (#4f3516): Màu nâu đất đậm, đóng vai trò làm đường viền (border), màu chữ chính và các chi tiết định hình hình khối 3D.

### Secondary
- **Petal Pink** (#f58fb1): Màu hồng cánh hoa tươi tắn đại diện cho sự tươi trẻ, game hóa và những đóa hoa nở rộ.
- **Mint Green** (#82bf47): Màu xanh bạc hà tươi mát đại diện cho hành động xanh, môi trường và sự phát triển bền vững.

### Neutral
- **Bloom Cream** (#fffaf2): Màu nền chủ đạo, mang lại cảm giác ấm áp, dễ chịu và thân thiện hơn so với màu trắng tinh khiết hay xám lạnh.
- **Ink Dark** (#2f2416): Màu chữ chính, đảm bảo độ tương phản cao chống mỏi mắt và kết nối tốt với Forest Deep.
- **Card White** (#fffdf8): Màu nền cho các thẻ thông tin, sáng hơn màu nền chung một chút để tạo chiều sâu lớp lang.

### Named Rules
**The Forest Border Rule.** Tất cả các thành phần tương tác quan trọng (thẻ card, nút bấm, input) đều phải có đường viền Forest Deep (#4f3516) dày 2.5px để duy trì tính nhất quán của phong cách game 3D.

## 3. Typography

**Display Font:** Be Vietnam Pro (hoặc Inter làm fallback)
**Body Font:** Be Vietnam Pro (hoặc Inter làm fallback)

Hệ thống sử dụng font chữ sans-serif hiện đại của Việt Nam với các nét chữ bo tròn thân thiện, rõ nét, dễ đọc trên mọi thiết bị.

### Hierarchy
- **Display** (Bold 800, clamp(2rem, 5vw, 4rem), 1.2): Dùng cho các tiêu đề chính của Hero section và các số liệu thống kê nổi bật.
- **Headline** (Bold 700, 1.875rem, 1.3): Tiêu đề các mục lớn trên trang.
- **Title** (SemiBold 600, 1.25rem, 1.4): Tiêu đề của thẻ card hoặc các phân mục nhỏ.
- **Body** (Regular 400, 1rem, 1.6): Dùng cho văn bản thông thường, giới hạn dòng tối đa 65-75ch để dễ đọc.
- **Label** (Medium 500, 0.875rem, 1.4): Dùng cho thẻ tag, nút bấm, chú thích nhỏ.

### Named Rules
**The Balanced Headline Rule.** Tất cả các tiêu đề h1 đến h3 phải sử dụng thuộc tính `text-wrap: balance` để đảm bảo độ dài các dòng cân đối trên mọi thiết bị, không để mồ côi chữ.

## 4. Elevation

CHẠM Flora không sử dụng bóng đổ mờ (soft shadows) làm mặc định để trang trí. Thay vào đó, chiều sâu của giao diện được kiến tạo thông qua sự kết hợp giữa đường viền dày và bóng đổ cứng 3D (hard shadow) có màu sắc rõ ràng (Forest Deep) dịch chuyển theo tương tác của người dùng.

### Shadow Vocabulary
- **3D Button Shadow** (`box-shadow: 0 5px 0 #4f3516`): Sử dụng cho các nút bấm ở trạng thái bình thường. Dịch chuyển xuống `0 3px 0` khi hover và `0 0 0` khi active.
- **3D Card Shadow** (`box-shadow: 0 6px 0 #4f3516`): Sử dụng cho các thẻ thông tin (cards). Tăng lên `0 10px 0` khi hover ở trạng thái tương tác.

### Named Rules
**The Hard-Shadow Rule.** Cấm tuyệt đối việc sử dụng bóng đổ mịn màu xám mờ nhạt kết hợp với viền mỏng trên cùng một phần tử (ghost card pattern). Mọi chiều sâu phải được thể hiện bằng bóng đổ cứng màu Forest Deep (#4f3516).

## 5. Components

### Buttons
- **Shape:** Bo tròn hoàn toàn (full-pill, `border-radius: 9999px`), tạo cảm giác mềm mại thân thiện.
- **Primary (Honey 3D):** Nền Honey Mid (#e3a11d), chữ Forest Deep (#4f3516), viền Forest Deep dày 2.5px. Box shadow 3D dày 5px màu Forest Deep.
- **Outline (Cream 3D):** Nền Bloom Cream (#fffaf2), chữ Forest Deep, viền Forest Deep dày 2.5px. Box shadow 3D dày 5px.
- **Petal (Pink 3D):** Nền Petal Pink (#f58fb1), chữ trắng, viền Forest Deep dày 2.5px. Box shadow 3D dày 5px.
- **Mint (Green 3D):** Nền Mint Green (#82bf47), chữ trắng, viền Forest Deep dày 2.5px. Box shadow 3D dày 5px.
- **Interactive Treatment:** Khi hover, nút dịch chuyển xuống `translateY(2px)` và shadow giảm còn 3px. Khi click (active), nút dịch chuyển xuống `translateY(5px)` và shadow biến mất hoàn toàn.

### Cards / Containers
- **Corner Style:** Bo tròn lớn (32px / 2rem) mang phong cách organic.
- **Background:** Nền Card White (#fffdf8).
- **Border:** Viền Forest Deep dày 2.5px.
- **Shadow:** Sử dụng 3D Card Shadow (`0 6px 0 #4f3516`).
- **Hover Treatment (Interactive Card):** Dịch chuyển lên `translateY(-4px)` và shadow tăng lên `0 10px 0 #4f3516`.

### Chips / Tags
- **Style:** Nền trắng mờ (opacity 70%), viền Honey Mid nhạt dày 1px, chữ Forest Deep. Bo tròn hoàn toàn.

### Navigation
- **Style:** Nền Bloom Cream hoặc trắng mờ tích hợp backdrop-blur, viền Forest Deep dày 2.5px ở phía dưới. Các link điều hướng sử dụng font Be Vietnam Pro, màu Ink Dark, hover đổi màu sang Honey Mid.

## 6. Do's and Don'ts

### Do:
- **Do** sử dụng viền Forest Deep (#4f3516) dày 2.5px cho các phần tử tương tác chính.
- **Do** sử dụng hiệu ứng chuyển dịch translateY kết hợp với thay đổi shadow để thể hiện tương tác của nút bấm và thẻ card.
- **Do** tôn trọng bảng màu tự nhiên ấm áp (Bloom Cream, Honey Mid, Petal Pink, Mint Green).
- **Do** sử dụng `text-wrap: balance` cho tiêu đề và `text-wrap: pretty` cho các đoạn văn dài để tối ưu hiển thị tiếng Việt.

### Don't:
- **Don't** sử dụng bóng đổ mờ nhạt (soft drop shadows) màu xám chung với đường viền mỏng 1px (ghost-card).
- **Don't** sử dụng viền bo góc quá vuông vức (nhỏ hơn 8px) hoặc quá nhọn, làm giảm đi tính chất Organic của dự án.
- **Don't** thiết kế các thẻ card có kích thước giống hệt nhau lặp đi lặp lại một cách nhàm chán (cliché card grids). Hãy sử dụng Bento Grid hoặc bố cục bất đối xứng để tạo nhịp điệu sinh động.
- **Don't** sử dụng text gradient màu xám đen kiểu SaaS template truyền thống. Hãy dùng màu Forest Deep nguyên bản hoặc gradient tự nhiên rực rỡ như `bloom-headline-accent` (vàng -> hồng -> xanh mint).