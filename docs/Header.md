# 📘 Tài liệu Chi tiết Component: Header (`Header.tsx`)

Tài liệu này cung cấp cái nhìn chi tiết và toàn diện về component **Header** (`components/layout/Header.tsx`) thuộc dự án **Beyond 8 Client**. Đây là một thanh điều hướng (Navbar) đa chức năng, được thiết kế với tính thẩm mỹ cao, hiệu ứng chuyển động mượt mà và tích hợp các module tìm kiếm, lọc dữ liệu nâng cao cùng hệ sinh thái cá nhân hóa người dùng.

---

## 📌 1. Tổng Quan (Overview)
Component `Header` đóng vai trò là xương sống cho giao diện người dùng trên mọi trang của Beyond 8. Các tính năng chính bao gồm:
*   **Floating Glassmorphic Effect**: Tự động thu nhỏ chiều rộng, bo tròn viền, làm mờ nền (backdrop-filter: blur) và nổi lên khi cuộn trang sử dụng Framer Motion.
*   **Menu Danh mục Đa cấp (`CategoryMenu`)**: Hiển thị danh mục khóa học cha và con với hiệu ứng chuyển động trượt ngang khi hover.
*   **Gợi ý Tìm kiếm thời gian thực (`SearchSuggestions`)**: Gọi API lấy danh sách khóa học khớp với từ khóa người dùng đang nhập.
*   **Bộ lọc Khoảng giá Nâng cao (`PriceFilterMenu`)**: Cho phép người dùng kéo slider chọn giá, nhập số tiền thủ công, chọn nhanh preset khoảng giá và hiển thị biểu đồ phân bổ khóa học theo giá (Price Distribution Area Chart).
*   **Trạng thái Xác thực & Vai trò (Authentication & Roles)**: Hiển thị giao diện khác nhau giữa khách vãng lai và học viên/giảng viên (Trang giảng viên, Đăng ký giảng viên).
*   **Hệ thống Avatar & Gói cước (VIP Subscription badging)**: Trang trí viền Avatar bằng dải màu gradient động (conic-gradient) và đính kèm huy hiệu dựa trên gói cước (Crown cho ULTRA, Gem cho PRO, Zap cho PLUS) kèm đèn báo online màu xanh nhấp nháy.
*   **Hệ thống giỏ hàng & thông báo**: Popup giỏ hàng nhanh khi hover và sidebar thông báo.

---

## 🏗️ 2. Kiến Trúc và Các Component Con (Subcomponents)

Để tối ưu hóa hiệu năng render và cấu trúc code sạch sẽ, component Header chứa 3 component phụ trợ nội bộ:

### A. Component `CategoryMenu` (Dòng 42 - 139)
Hiển thị danh sách các Categories và các Subcategories tương ứng.
*   **Đặc điểm nổi bật**:
    *   Bọc ngoài bởi `ScrollArea` để tránh tràn màn hình khi có nhiều danh mục.
    *   **Hiệu ứng Dịch chuyển Ngang (Horizontal Slide)**: Khi di chuột vào một danh mục cha có chứa danh mục con, menu cha sẽ tự động dịch chuyển sang bên trái 150px (`animate={{ x: hasSubmenu ? -150 : 0 }}`) để nhường không gian hiển thị danh mục con ở bên phải, tạo cảm giác trực quan và hiện đại.
    *   Sử dụng `AnimatePresence` của `framer-motion` để tạo hiệu ứng xuất hiện mịn màng của danh mục con.
*   **Props**:
    ```typescript
    interface CategoryMenuProps {
      Content: Category[] | undefined; // Dữ liệu danh mục từ API
      onSelect: (name: string) => void; // Hàm callback khi click chọn danh mục
      selected: string;                // Danh mục đang được chọn hiện tại
    }
    ```

### B. Component `SearchSuggestions` (Dòng 141 - 226)
Hộp gợi ý kết quả tìm kiếm nhanh xuất hiện ngay phía dưới thanh tìm kiếm khi người dùng nhập từ khóa.
*   **Đặc điểm nổi bật**:
    *   Sử dụng hook `useSearchCourses` lấy dữ liệu khóa học thời gian thực dựa trên từ khóa đã được debounce (`debouncedSearch`).
    *   Hiển thị trạng thái đang tìm kiếm (`isLoading`), trạng thái không có kết quả, hoặc danh sách khóa học kết quả.
    *   Mỗi thẻ kết quả có chứa: ảnh thumbnail (`SafeImage` + format URL `formatImageUrl`), tiêu đề khóa học, tên giảng viên và danh mục tương ứng.
    *   Sử dụng sự kiện `onMouseDown` thay vì `onClick` kèm theo `e.preventDefault()` để tránh làm mất focus của ô Input tìm kiếm trước khi sự kiện chọn gợi ý kịp kích hoạt.

### C. Component `PriceFilterMenu` (Dòng 228 - 500)
Bộ lọc khoảng giá cao cấp, tích hợp đầy đủ tính năng như các sàn thương mại điện tử chuyên nghiệp.
*   **Đặc điểm nổi bật**:
    *   **Biểu đồ phân bổ giá (Price Distribution Area Chart)**: Sử dụng thư viện `recharts` (`AreaChart`, `Area`, `ResponsiveContainer`, `Tooltip`) để vẽ biểu đồ tần suất khóa học phân bổ theo giá, giúp người dùng dễ dàng định hình các mức giá phổ biến trong hệ thống.
    *   **Thanh trượt kép (Slider)**: Cho phép kéo chọn đồng thời mức giá tối thiểu và tối đa với bước nhảy là `100,000 VND`, giới hạn tối đa là `5,000,000 VND`.
    *   **Nhập số trực tiếp**: Người dùng có thể nhập số tiền vào 2 ô Input tối thiểu và tối đa, tự động định dạng dấu phân cách phần nghìn (`toLocaleString('vi-VN')`) và tự động chặn giới hạn giá hợp lệ.
    *   **Bộ lọc định sẵn (Presets)**: Các nút chọn nhanh khoảng giá thông dụng ("Dưới 1tr", "1-2tr", "2-3tr", "3-4tr", "4-5tr", "Tất cả") giúp thao tác nhanh trên thiết bị di động.
    *   **Nút hành động**: "Xóa tất cả" để reset bộ lọc và "Áp dụng" để kích hoạt tìm kiếm theo khoảng giá đã chọn.

---

## ✨ 3. Các Tính Năng Premium & Hiệu Ứng Nổi Bật

### 🌊 Dynamic Floating Glassmorphic Navbar (Hiệu ứng cuộn thông minh)
Header sử dụng Framer Motion để lắng nghe sự kiện cuộn trang `scrollY` và thay đổi style động:
```typescript
const { scrollY } = useScroll({
  target: headerRef,
  offset: ["start start", "end start"],
});

useMotionValueEvent(scrollY, "change", (latest) => {
  if (latest > 100) {
    setIsScrolled(true);
  } else {
    setIsScrolled(false);
  }
});
```
*   **Trạng thái bình thường (Chưa cuộn)**: Chiều rộng 100%, background trong suốt, hiển thị 3 cột chuẩn (`grid grid-cols-3`).
*   **Trạng thái đã cuộn (> 100px)**: Co chiều rộng lại còn **75%** (`width: "75%"`), hạ thấp xuống **20px** (`y: 20`), bo tròn tối đa (`rounded-full`), bật mờ nền `backdrop-filter: blur(10px)` màu trắng trong suốt `bg-white/80` và đổ bóng mềm mại cao cấp (`box-shadow` nhiều lớp). Hiệu ứng chuyển động mượt mà nhờ spring physics (`stiffness: 200, damping: 50`).

### 👑 Premium Subscription Badging (Avatar & Gói cước thành viên)
Thiết kế cá nhân hóa cao cấp dựa trên gói cước của học viên (`subscription?.subscriptionPlan?.code`):
*   **Viền Gradient Conic theo cấp độ**:
    *   `ULTRA`: Conic gradient 7 sắc cầu vồng rực rỡ (`conic-gradient(from 0deg, #ff0000, #ffa500, #ffff00, #008000, #0000ff, #4b0082, #ee82ee, #ff0000)`).
    *   `PRO`: Dải màu gradient Google cao cấp.
    *   `STANDARD` / `PLUS`: Dải màu gradient xanh lam/xanh lục trẻ trung.
*   **Huy hiệu đính kèm Avatar**:
    *   ULTRA: Icon `Crown` màu vàng hoàng kim.
    *   PRO: Icon `Gem` màu xanh lam.
    *   BASIC/PLUS: Icon `Zap` màu tím năng lượng.
*   **Active Indicator**: Đốm xanh lá nhấp nháy (`animate-ping`) góc dưới Avatar báo hiệu tài khoản đang trực tuyến/hoạt động.

### 🛒 Giỏ hàng & Thông báo thời gian thực
*   **Giỏ hàng (`ShoppingCart`)**: Tích hợp số lượng sản phẩm bằng badge màu gradient (Magenta -> Purple). Hover vào nút giỏ hàng sẽ mở popup xem nhanh danh sách khóa học trong giỏ (`CartPopover`) mà không cần chuyển trang.
*   **Thông báo (`Bell`)**: Hiển thị chấm đỏ thông báo chưa đọc. Nhấp chọn sẽ mở Sidebar thông báo trượt ra (`StudentNotificationPanel`).

---

## 🔄 4. Luồng Dữ Liệu (Data Flow) & Hooks

Để xử lý các logic phức tạp, component Header tích hợp hệ sinh thái React hooks & React Query mạnh mẽ:

| Hook / Service | Mục Đích |
| :--- | :--- |
| `useAuth()` | Kiểm tra người dùng đã đăng nhập chưa (`isAuthenticated`). |
| `useUserProfile()` | Lấy thông tin cá nhân (`userProfile`, `isLoading`), phân quyền dựa trên `userProfile.roles`. |
| `useSubscription()` | Xác định gói cước hiện tại của người dùng để tùy biến giao diện Avatar VIP. |
| `instructorRegistrationService.checkApply()` | Gọi API kiểm tra xem người dùng đã được phê duyệt làm Giảng viên hay chưa để hiển thị nút "Trang giảng viên" hoặc "Đăng ký giảng viên". |
| `useCategory()` | Lấy danh sách danh mục phục vụ cho bộ lọc danh mục. |
| `useSearchCourses()` | Tìm kiếm khóa học nhanh theo từ khóa `searchQuery`. |
| `useDebounce()` | Hoãn kích hoạt tìm kiếm 500ms khi người dùng gõ phím để tránh spam API liên tục. |
| `useGetCart()` | Lấy danh sách sản phẩm trong giỏ hàng để cập nhật số lượng ở Badge giỏ hàng. |
| `useStudentNotificationStatus()` | Kiểm tra số lượng thông báo chưa đọc của học viên. |
| `useIsMobile()` | Xác định kích thước màn hình để thay đổi bố cục linh hoạt giữa Desktop và Mobile. |

---

## 🛠️ 5. Hướng Dẫn Tích Hợp & Sử Dụng

### Thư viện phụ thuộc (Dependencies)
Hãy đảm bảo dự án của bạn đã cài đặt các thư viện sau:
```bash
npm install lucide-react framer-motion recharts @tanstack/react-query
```

### Các Component UI liên quan (Shadcn UI)
Component Header sử dụng các khối UI dùng chung tại thư mục `components/ui/`:
*   `Button` (`components/ui/button.tsx`)
*   `Input` (`components/ui/input.tsx`)
*   `ScrollArea` (`components/ui/scroll-area.tsx`)
*   `DropdownMenu` (`components/ui/dropdown-menu.tsx`)
*   `Avatar` (`components/ui/avatar.tsx`)
*   `Skeleton` (`components/ui/skeleton.tsx`)
*   `Slider` (`components/ui/slider.tsx`)

### Tích hợp vào Layout chính
Import và sử dụng component `Header` trong file layout chính của ứng dụng:
```tsx
import { Header } from "@/components/layout/Header";

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">{children}</main>
    </div>
  );
}
```

---

## 📝 6. Hướng Dẫn Phát Triển & Bảo Trì Code

Khi chỉnh sửa code trong file `Header.tsx`, nhà phát triển cần lưu ý:
1.  **Quản lý Import**: Loại bỏ triệt để các phần import không sử dụng để tối ưu hóa dung lượng bundle của Next.js.
2.  **Khử trùng lặp Tìm kiếm (Debouncing)**: Luôn sử dụng biến `debouncedSearch` thay vì `searchQuery` khi truyền vào gợi ý tìm kiếm để tránh gửi hàng chục request API trùng lặp.
3.  **Tương tác Click chuột ngoài dropdown**: Thuộc tính `modal={false}` trên các component `DropdownMenu` giúp người dùng có thể thao tác click chuột ra ngoài để đóng menu một cách tự nhiên mà không gây khóa scroll hay khóa tương tác trang web.
4.  **Tương thích Mobile**: Khi bổ sung các chức năng hoặc nút mới trên Header, hãy bọc chúng trong điều kiện `!isMobile` hoặc định nghĩa giao diện thu gọn tương ứng trong Dropdown Menu chính của phiên bản di động để tránh phá vỡ giao diện.

---
*Tài liệu được biên soạn chi tiết dựa trên mã nguồn thực tế của dự án Beyond 8.*
