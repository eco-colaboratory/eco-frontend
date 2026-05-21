# Theme Màu Và Phong Cách Thiết Kế Của Dự Án (E.C.O / Forest)

Dựa trên phân tích mã nguồn và các thành phần UI của dự án, dưới đây là tổng hợp chi tiết về hệ thống theme màu sắc và phong cách thiết kế, phù hợp với định hướng về sinh thái xanh, rừng và thiên nhiên.

## 1. Màu Chủ Đạo (Primary Color)
Màu nhấn chính xuyên suốt toàn bộ dự án đóng vai trò thu hút sự chú ý trong các nút bấm (buttons), trạng thái loading, và các đoạn text quan trọng:

*   **Màu Cam/Nâu Đất (Earthy Orange)**: 
    *   **HEX:** `#D68C45`
    *   **Ý nghĩa:** Tượng trưng cho màu của đất, gỗ, thân cây, mang lại cảm giác ấm áp, tự nhiên nhưng không quá chói.
    *   **Sử dụng phổ biến trong source code:**
        *   Text nổi bật: `text-[#d68c45]` (ví dụ: chữ "VỚI E.C.O" hoặc tiêu đề "About Us").
        *   Viền và Loading: `border-t-[#d68c45]`, focus inputs `focus:border-[#D68C45]`.
        *   Buttons: Nền `bg-[#d68c45]` khi hover đổi thành nền trong suốt `hover:bg-transparent hover:text-[#d68c45]`.

## 2. Màu Nền (Background Colors)
Dự án sử dụng đa dạng các lớp layer làm nền để tạo chiều sâu và độ tương phản:

*   **Màu Kem Trầm (Sand/Beige)**: 
    *   **HEX:** `#C2BDB7`
    *   **Sử dụng:** `bg-[#C2BDB7]` ở các phần section lớn (VD: `BecomeSponsor`), tạo background dịu mắt giúp nội dung nổi bật.
*   **Màu Đen Ám Ghi (Dark/Charcoal)**:
    *   **HEX:** `#1a1a1a`
    *   **Sử dụng:** Dùng trong các card (ConnectCard) hoặc hộp thoại làm nền chính lấy sự tương phản `bg-[#1a1a1a]`.
*   **Hiệu Ứng Nền Trong Suốt (Glassmorphism)**: 
    *   **Tailwind:** `bg-white/10 backdrop-blur-lg`
    *   **Sử dụng:** Phối hợp cùng viền trắng (`border-white`), sử dụng rất nhiều ở trang Chủ (`HomePage`) để làm nổi bật thông tin trên ảnh nền thiên nhiên.

## 3. Các Màu Trung Tính & UI (Neutral Colors - Tailwind UI)
Hệ thống sử dụng linh hoạt các dải màu xám để phân cấp text và border:

*   **White (#ffffff) & Black (#000000)**: Chữ tiêu đề chính (hiệu ứng bóng đổ), các nút bấm cứng cáp (`bg-black text-white`).
*   **Grays (`text-gray-200` 👉 `text-gray-700`)**:
    *   `text-gray-700 / text-gray-500`: Dùng cho đoạn văn (paragraphs) đọc dài, nhãn inputs trong popup hòm thư.
    *   `text-gray-300 / text-gray-400`: Dùng cho Social links, mô tả nhỏ (sub-text).
*   **Borders (`border-gray-300` / `#e5e7eb`)**: Phân chia giao diện và thanh form.
*   **Alert/Badge (`bg-red-600`)**: Số thông báo hoặc nhãn nổi bật cần sự chú ý lớn.

## 4. Hệ Thống Gradient (Gradients)
Gradients được ứng dụng vào font chữ, làm điểm nhấn tự nhiên tinh tế:

*   **Gradient Kim Loại Mờ & Lá Cây (Đoạn Read More)**:
    *   **CSS:** `linear-gradient(90deg, #616161 0%, #928C86 50%, #0b521ba0 100%)`
    *   Hiệu ứng chuyển từ Xám (#616161) sang Xám bạc (#928C86) và dải cuối là xanh Rừng rêu trong suốt (#0b521ba0). Kết hợp thành text-gradient rất ấn tượng.
*   **Gradient Trắng - Nâu Đất - Trắng**:
    *   **CSS:** `linear-gradient(90deg, white 0%, #d68c45 50%, white 100%)`
    *   Dùng để nhấn nhá tiêu đề ở phần giới thiệu, tạo độ lấp lánh và tập trung vào trung tâm đoạn text chữ.

## 5. Typography Đi Kèm (Fonts)
Design System này thiết lập rất rõ về Phông chữ để đẩy bật hệ thống màu.
*   **Montserrat**: Được set làm font chữ mặc định của thẻ `body`. Có độ bo tròn và geometric hoàn hảo, tạo cảm giác sang trọng, cứng cáp nhưng thân thiện (Rất hợp với tổ chức phi chính phủ/dự án xanh).
*   **Inter**: Tích hợp làm font dự phòng, tối ưu hóa mức độ dễ đọc trên màn hình điện thoại.

---
**Tổng kết:** 
Tone màu chủ đạo của dự án toát lên tinh thần của **Thiên Nhiên và Quỹ Hoạt Động (Ecology / NPO)**. Với sự kết đôi giữa màu **Nâu Đất (#D68C45)** và các hiệu ứng **Kính trong suốt (Glassmorphism)**, điểm thêm các dải **Gradient Xanh rêu/Khói**, hệ thống theme mang tới cảm giác chân thực của núi rừng, hướng người dùng về các trải nghiệm hoạt động vì môi trường một cách trực quan nhất.
