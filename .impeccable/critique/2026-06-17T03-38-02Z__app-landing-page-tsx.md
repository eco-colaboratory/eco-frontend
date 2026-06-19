---
target: Landing Page
total_score: 36
p0_count: 0
p1_count: 1
timestamp: 2026-06-17T03-38-02Z
slug: app-landing-page-tsx
---
# Design Critique: CHẠM Flora Landing Page

Đánh giá chi tiết trải nghiệm giao diện người dùng (UX/UI) của Landing Page **CHẠM Flora**, kết nối thương hiệu xanh và cộng đồng Gen Z.

## Design Health Score

Dưới đây là điểm số đánh giá dựa trên 10 nguyên lý Usability Heuristics của Jakob Nielsen:

| # | Heuristic | Score | Key Issue |
|---|-----------|-------|-----------|
| 1 | Visibility of System Status | 3/4 | Mở rộng bảng quyền lợi có animation, tuy nhiên chưa có chỉ báo trạng thái rõ ràng khi tải tài liệu PDF proposal (nút proposal tải trực tiếp không có feedback tải). |
| 2 | Match System / Real World | 4/4 | Ngôn ngữ tự nhiên, thân thiện và gần gũi với Gen Z. Biểu tượng bông hoa, mầm xanh ánh xạ tốt với hành động môi trường thực tế. |
| 3 | User Control and Freedom | 4/4 | Người dùng dễ dàng đóng/mở bảng so sánh quyền lợi đầy đủ và chuyển tab di động một cách nhanh chóng. |
| 4 | Consistency and Standards | 4/4 | Rất nhất quán với phong cách Neo-brutalism 3D. Các nút bấm, viền và bóng đổ cứng màu Forest Deep (#4f3516) tuân thủ Named Rules xuất sắc. |
| 5 | Error Prevention | 4/4 | Cung cấp sẵn nút bấm "Sao chép email" để ngăn ngừa lỗi nhập sai địa chỉ email khi liên hệ đại diện dự án. |
| 6 | Recognition Rather Than Recall | 4/4 | Danh sách các bước Core Idea được minh họa rõ ràng bằng các biểu tượng đi kèm nhãn văn bản. Navbar rõ nét. |
| 7 | Flexibility and Efficiency | 3/4 | Chưa hỗ trợ phím tắt bàn phím hoặc điều hướng nhanh bằng phím cho nhóm người dùng chuyên nghiệp (Alex). |
| 8 | Aesthetic and Minimalist Design | 3/4 | Thiết kế 3D rất bắt mắt, sinh động. Tuy nhiên, việc sử dụng các hạt sparks particles chuyển động giật (Tailwind bounce) và đường SVG dẫn từ CDN ngoài làm giảm bớt tính tinh gọn, sạch sẽ của code. |
| 9 | Error Recovery | 3/4 | Toast thông báo sao chép email hiển thị rõ ràng, giúp người dùng nhận biết hành động thành công hoặc khắc phục nhanh nếu sao chép lỗi. |
| 10 | Help and Documentation | 4/4 | Cung cấp liên kết Proposal PDF trực quan, dễ tải, cùng thông tin liên hệ chi tiết và các kênh mạng xã hội ở chân trang. |
| **Total** | | **36/40** | **Excellent (Xuất sắc)** |

---

## Anti-Patterns Verdict

**Giao diện có trông giống AI tạo ra không?**
- **Đánh giá thủ công (LLM)**: Không. CHẠM Flora có bản sắc Neo-brutalism 3D cực kỳ rõ ràng, vượt xa các template SaaS đơn điệu màu xám ấm (cream default). Phong cách đung đưa hữu cơ mang tính độc bản cao và định hình cá tính thương hiệu rõ rệt. Tuy nhiên, việc sử dụng trực tiếp các class chuyển động mặc định như `animate-bounce` và hình ảnh kết nối từ CDN ngoài (`cdn.rareblocks.xyz`) là những chi tiết nhỏ mang vết tích của mã nguồn tham khảo (AI slop).
- **Deterministic scan (Trình quét tự động)**: Trình quét đã phát hiện **1 lỗi cảnh báo**:
  - `bounce-easing`: Sử dụng hiệu ứng `animate-bounce` tại [contact-section.tsx](file:///e:/TVu/git-repo/eco-frontend/app/(landing)/_components/cham-bloom/contact-section.tsx) dòng 107 và 109. Đây là chuyển động thô sơ, giật cục và không tuân thủ easing curve tự nhiên (ease-out-quint hoặc float).
- **Visual overlays (Lớp phủ trực quan)**: Do môi trường chạy tuần tự không hỗ trợ spawn_agent, lớp phủ trực quan trên trình duyệt không được hiển thị trực tiếp. Nhưng kết quả trình quét CLI đã định vị chính xác lỗi thiết kế.

---

## Overall Impression

CHẠM Flora mang lại ấn tượng thị giác cực kỳ mạnh mẽ, vui tươi và tràn đầy sức sống xanh (Eco-Vibrancy). Phong cách 3D Neo-brutalism kết hợp viền Forest Deep 2.5px mang tính nhất quán tuyệt vời. Giao diện thân thiện và thu hút đối với cả Gen Z lẫn các doanh nghiệp tài trợ nhờ thông tin phân cấp rõ ràng và bảng quyền lợi thông minh. Cơ hội lớn nhất là loại bỏ các chuyển động mặc định giật cục và nội bộ hóa các tài nguyên SVG bên ngoài để đạt chất lượng sản xuất hoàn hảo.

---

## What's Working

1. **Neo-brutalism 3D nhất quán**: Các Named Rules như *The Forest Border Rule* và *The Hard-Shadow Rule* được triển khai hoàn chỉnh. Các nút bấm có chiều sâu xúc giác co giãn chân thực khi tương tác (hover và active dịch chuyển translateY).
2. **Mobile UX của bảng so sánh**: Việc chuyển đổi từ một bảng so sánh desktop cồng kềnh sang dạng Tab-based trên di động giúp giảm tải nhận thức (Cognitive Load) tối đa cho Casey (Distracted Mobile User), giữ giao diện luôn gọn gàng.
3. **Typography đậm nét**: Sử dụng font chữ Be Vietnam Pro hỗ trợ tiếng Việt hoàn hảo, kết hợp Named Rule *The Balanced Headline Rule* giúp các tiêu đề không bị mồ côi chữ trên di động.

---

## Priority Issues

### [P1] Bounce Easing giật cục ở Contact Section
- **Tại sao nó quan trọng**: Hiệu ứng `animate-bounce` của Tailwind sử dụng spring thô sơ làm các hạt bụi trang trí chuyển động giật cục, rẻ tiền, gây mất tập trung và không đồng điệu với chuyển động đung đưa mượt mà (`animate-bloom-float`) ở các phần khác.
- **Cách khắc phục**: Thay thế `animate-bounce` bằng hiệu ứng float mượt hoặc pulse nhẹ nhàng với easing curve tự nhiên (`ease-out-quad` hoặc `animate-pulse` tùy chỉnh).
- **Gợi ý lệnh**: `$impeccable animate`

### [P2] Sử dụng SVG kết nối ngoài từ CDN Rareblocks
- **Tại sao nó quan trọng**: Curved dotted line ở [core-idea-section.tsx](file:///e:/TVu/git-repo/eco-frontend/app/(landing)/_components/cham-bloom/core-idea-section.tsx) dòng 55 đang tải trực tiếp từ URL bên ngoài (`https://cdn.rareblocks.xyz/...`). Điều này làm chậm thời gian tải trang, tăng nguy cơ lỗi 404 nếu CDN gặp sự cố và tạo cảm giác không chuyên nghiệp.
- **Cách khắc phục**: Tải tệp SVG này về lưu trữ trong thư mục `public/assets/landing/` hoặc chuyển nó thành mã SVG inline trực tiếp trong React component.
- **Gợi ý lệnh**: `$impeccable polish` hoặc `$impeccable distill`

### [P2] Thiếu chỉ báo trạng thái tải Proposal PDF
- **Tại sao nó quan trọng**: Nút proposal tải trực tiếp file PDF 17MB từ thư mục public. Trên kết nối di động chậm (Casey), người dùng click vào và không thấy phản hồi gì trong vài giây đầu, dẫn đến việc click liên tục hoặc nghĩ liên kết bị hỏng.
- **Cách khắc phục**: Thêm thuộc tính `download` và xem xét tích hợp loading spinner mini hoặc mở link proposal ở một tab mới (`target="_blank"`) để trình duyệt tự xử lý thanh tiến trình tải.
- **Gợi ý lệnh**: `$impeccable harden`

---

## Persona Red Flags

### Jordan (First-Timer)
- **Hành vi**: Jordan đọc kỹ hướng dẫn và dễ bị bối rối bởi các thuật ngữ viết tắt hoặc bảng so sánh dài.
- **Red Flag**: Khi Jordan mới truy cập và chưa mở rộng bảng so sánh quyền lợi, nút bấm "Xem so sánh quyền lợi đầy đủ" có biểu tượng mũi tên hơi nhỏ. Jordan có thể bỏ lỡ bảng so sánh này và chỉ thấy 4 thẻ tóm tắt chung chung, từ đó thiếu thông tin chi tiết để quyết định tài trợ.

### Casey (Distracted Mobile User)
- **Hành vi**: Sử dụng điện thoại bằng một tay trên đường đi, kết nối mạng không ổn định.
- **Red Flag**: Kích thước tệp Proposal PDF quá lớn (17MB) sẽ làm Casey nản lòng khi tải bằng 3G/4G trên điện thoại. Casey có thể hủy tải giữa chừng.

### Riley (Stress Tester)
- **Hành vi**: Riley cố gắng tìm kiếm các liên kết bị lỗi hoặc các nút bấm không có phản hồi.
- **Red Flag**: Việc copy email bằng nút bấm trên mobile hoạt động tốt nhưng nếu click trực tiếp vào nút CTA "Đồng hành cùng dự án" (`mailto:` link) mà thiết bị di động không cài đặt ứng dụng email mặc định, trình duyệt sẽ không có phản hồi gì hoặc hiển thị thông báo lỗi hệ thống, gây đứt quãng trải nghiệm.

---

## Minor Observations

- Tiêu đề phụ (eyebrow label) như "Đồng hành cùng dự án" ở Contact Section có khoảng cách hơi khít với tiêu đề chính H2. Nên tăng `margin-top` lên một chút để tạo nhịp thở tốt hơn cho giao diện.
- Footer liên kết chính sách bảo mật và điều khoản sử dụng hiện tại chỉ là link rỗng `#`. Riley có thể đánh giá đây là điểm thiếu tin cậy đối với một trang tài trợ doanh nghiệp.

---

## Questions to Consider

- Chúng ta có nên tối ưu hóa tệp Proposal PDF từ 17MB xuống dưới 3MB để giảm thời gian tải trên thiết bị di động không?
- Chúng ta có nên thay thế link `mailto:` mặc định bằng một form đăng ký hợp tác nhanh (Modal Form) ngay trên Landing page để tăng tỷ lệ chuyển đổi và tránh phụ thuộc vào app email của thiết bị không?
