'use client'

import { useState, useEffect, Suspense } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { ChamBloomMotionProvider } from '@/app/(landing)/_components/layout'

interface LegalSection {
  id: string
  title: string
  content: string
  items?: string[]
  subsections?: {
    subtitle: string
    content: string
  }[]
}

interface LegalDoc {
  title: string
  lastUpdated: string
  introduction: string
  sections: LegalSection[]
}

// Dữ liệu nội dung "Chính sách bảo mật"
const privacyPolicy: LegalDoc = {
  title: 'Chính sách bảo mật của CHẠM Flora',
  lastUpdated: 'Cập nhật lần cuối: Tháng 6, 2026',
  introduction: 'Nhóm E.C.O phát triển và vận hành ứng dụng trò chơi di động CHẠM Flora. Chúng tôi luôn cam kết bảo mật những thông tin, dữ liệu cá nhân của Khách hàng một cách tốt nhất theo quy định của pháp luật. Vì vậy, CHẠM Flora xây dựng Chính sách Bảo vệ Dữ liệu cá nhân này để người chơi hiểu rõ hơn về mục đích, phạm vi thông tin mà chúng tôi xử lý dữ liệu cá nhân và các biện pháp chúng tôi áp dụng để bảo vệ thông tin và quyền lợi của người chơi đối với các hoạt động này.',
  sections: [
    {
      id: 'thu-thap-thong-tin',
      title: '1. Thông tin chúng tôi thu thập',
      content: 'Để cung cấp đầy đủ các tính năng trong trò chơi, chúng tôi có thể thu thập các loại dữ liệu sau:',
      items: [
        'Thông tin tài khoản: Tên người dùng (username), địa chỉ email, và mật khẩu đã mã hóa khi bạn tiến hành đăng ký tài khoản trên hệ thống.',
        'Dữ liệu tiến trình chơi game: Cấp độ tài khoản, số lượng hoa đã trồng, trạng thái kho đồ (vật phẩm, hạt seeds, phân bón), và lịch sử hoàn thành các phiên học tập (Focus Mode). Nội dung bạn gửi lên hệ thống như thiết kế vườn, bình luận hoặc phản hồi.',
        'Thông tin thu thập tự động: Khi bạn sử dụng trò chơi, chúng tôi có thể tự động thu thập một số thông tin như: loại thiết bị, hệ điều hành, địa chỉ IP, ngôn ngữ thiết bị, thời gian truy cập, thông tin tần suất sử dụng.'
      ]
    },
    {
      id: 'muc-dich-su-dung',
      title: '2. Mục đích sử dụng thông tin',
      content: 'Thông tin thu thập được dùng để quản lý tài khoản người chơi, đồng bộ dữ liệu để cung cấp các tính năng, gửi thông báo liên quan đến các hoạt động trong game và cải thiện phát triển chất lượng dịch vụ trong game. Phát hiện và ngăn chặn hành vi gian lận. Tuân thủ các yêu cầu pháp lý cần thiết.'
    },
    {
      id: 'chia-se-thong-tin',
      title: '3. Chia sẻ thông tin',
      content: 'CHẠM Flora không bán dữ liệu cá nhân của người dùng cho bất kỳ bên thứ ba nào. Chúng tôi chỉ có thể chia sẻ dữ liệu trong các trường hợp sau:',
      subsections: [
        {
          subtitle: 'Nhà cung cấp dịch vụ',
          content: 'Các đối tác hỗ trợ vận hành hệ thống như: dịch vụ lưu trữ dữ liệu, dịch vụ phân tích ứng dụng, dịch vụ gửi thông báo, dịch vụ xác thực tài khoản. Các đơn vị này chỉ được phép sử dụng dữ liệu trong phạm vi cần thiết để cung cấp dịch vụ cho CHẠM Flora.'
        },
        {
          subtitle: 'Yêu cầu pháp luật',
          content: 'Chúng tôi có thể tiết lộ thông tin nếu được yêu cầu by cơ quan nhà nước có thẩm quyền, tòa án, cơ quan thực thi pháp luật hoặc khi việc tiết lộ là cần thiết để bảo vệ quyền và lợi ích hợp pháp của CHẠM Flora.'
        }
      ]
    },
    {
      id: 'bao-mat-luu-tru',
      title: '4. Bảo mật & lưu trữ dữ liệu',
      content: 'Chúng tôi áp dụng các biện pháp kỹ thuật tiêu chuẩn để bảo vệ thông tin cá nhân khỏi các nguy cơ mất mát, lạm dụng hoặc truy cập trái phép. Tuy nhiên, không có phương thức truyền dữ liệu qua Internet nào là an toàn tuyệt đối, do đó chúng tôi không thể bảo đảm an ninh hoàn hảo.',
      items: [
        'Thông tin người dùng được lưu trữ trong khoảng thời gian cần thiết để cung cấp dịch vụ, duy trì tài khoản, tuân thủ nghĩa vụ pháp lý và giải quyết tranh chấp.',
        'Khi dữ liệu không còn cần thiết, chúng tôi sẽ xóa hoặc ẩn danh dữ liệu theo quy trình nội bộ.'
      ]
    },
    {
      id: 'quyen-nguoi-choi',
      title: '5. Quyền của người chơi',
      content: 'Chúng tôi tôn trọng quyền kiểm soát cá nhân đối với dữ liệu của bạn. Người chơi có các quyền sau thông qua cài đặt ứng dụng hoặc liên hệ trực tiếp với chúng tôi:',
      items: [
        'Truy cập và cập nhật: Bạn có quyền tự do xem và chỉnh sửa thông tin hồ sơ cá nhân (Tên hiển thị, mật khẩu) bất kỳ lúc nào ngay trong mục Quản lý Hồ sơ của ứng dụng.',
        'Yêu cầu xóa dữ liệu: Người chơi có thể gửi yêu cầu xóa tài khoản vĩnh viễn. Khi tài khoản bị xóa, toàn bộ thông tin cá nhân và tiến trình dữ liệu khu vườn ảo lưu trữ trên hệ thống máy chủ của chúng tôi sẽ được hủy bỏ hoàn toàn và không thể khôi phục.'
      ]
    },
    {
      id: 'thay-doi-chinh-sach',
      title: '6. Thay đổi chính sách bảo mật',
      content: 'Chúng tôi có thể cập nhật nội dung Chính sách Bảo mật này theo thời gian nhằm tối ưu hóa các tính năng mới hoặc tuân thủ các quy định pháp lý thay đổi. Mọi thay đổi sẽ được công bố trên website hoặc trong ứng dụng. Việc tiếp tục sử dụng CHẠM Flora sau khi Chính sách được cập nhật đồng nghĩa với việc bạn đồng ý với các điều chỉnh đó.'
    }
  ]
}

// Dữ liệu nội dung "Điều khoản sử dụng"
const termsOfService: LegalDoc = {
  title: 'Điều khoản và Điều kiện sử dụng CHẠM Flora',
  lastUpdated: 'Cập nhật lần cuối: Tháng 6, 2026',
  introduction: 'Chào mừng bạn đến với CHẠM Flora, nền tảng GreenTech kết hợp trò chơi chăm sóc vườn hoa ảo, hoạt động học tập tập trung (Focus Mode) và các chương trình cộng đồng hướng đến lối sống xanh. Ứng dụng của chúng tôi hướng đến việc kết nối hành động số trong game với tác động môi trường ngoài đời thực. Bằng việc tải xuống, cài đặt và sử dụng ứng dụng CHẠM Flora, bạn đồng ý tuân thủ các Điều khoản và Điều kiện dưới đây. Nếu bạn không đồng ý với bất kỳ nội dung nào trong Điều khoản này, vui lòng không sử dụng dịch vụ của chúng tôi.',
  sections: [
    {
      id: 'trach-nhiem-nguoi-choi',
      title: '1. Tài khoản & trách nhiệm của người chơi',
      content: 'Bạn có trách nhiệm tuân thủ các quy định pháp luật hiện hành tại quốc gia hoặc khu vực nơi bạn sử dụng dịch vụ. Đồng thời đáp ứng các điều kiện sau:',
      items: [
        'Độ tuổi: Bạn phải đủ 13 tuổi trở lên để sử dụng CHẠM Flora. Nếu bạn dưới độ tuổi quy định, vui lòng đảm bảo rằng cha mẹ hoặc người giám hộ hợp pháp của bạn đã đọc và đồng ý với các điều khoản này.',
        'Bảo mật: Bạn chịu trách nhiệm hoàn toàn về việc bảo vệ thông tin đăng nhập của mình. Không chia sẻ tài khoản cho bất kỳ ai khác. Mọi hoạt động diễn ra dưới tài khoản của bạn sẽ do bạn chịu trách nhiệm.',
        'Quyền chấm dứt: CHẠM Flora có quyền đình chỉ hoặc khóa tài khoản vĩnh viễn nếu phát hiện hành vi gian lận, sử dụng phần mềm thứ ba can thiệp vào trò chơi (hack/cheat), hoặc vi phạm nghiêm trọng các điều khoản này.'
      ]
    },
    {
      id: 'tai-khoan-bao-mat',
      title: '2. Tài khoản và Bảo mật',
      content: 'Người chơi cần đăng ký tài khoản để lưu trữ dữ liệu khu vườn và tiến trình cá nhân. Khi đăng ký tài khoản, bạn đồng ý rằng:',
      items: [
        'Thông tin cung cấp là chính xác và đầy đủ.',
        'Không sử dụng thông tin giả mạo hoặc thông tin của người khác.',
        'Người chơi có trách nhiệm bảo mật thông tin đăng nhập của mình. Mọi hoạt động phát sinh từ tài khoản của bạn sẽ do bạn chịu trách nhiệm.',
        'CHẠM Flora có quyền đình chỉ, cấm hoặc xóa vĩnh viễn các tài khoản vi phạm chính sách của hệ thống nếu phát hiện hành vi vi phạm Điều khoản sử dụng hoặc có dấu hiệu gian lận.'
      ]
    },
    {
      id: 'vat-pham-tai-san-ao',
      title: '3. Vật phẩm và tài sản ảo trong game',
      content: 'Tất cả các vật phẩm và tài sản ảo trong CHẠM Flora (tiền tệ trong game như Vàng, Kim cương; vật phẩm ảo như Hạt giống, Đồ trang trí) thuộc quyền sở hữu trí tuệ của CHẠM Flora. Chúng tôi cấp quyền sử dụng có giới hạn cho bạn và cam kết:',
      items: [
        'Tài sản ảo không có giá trị quy đổi thành tiền thật ngoài đời thực và không được phép mua bán, chuyển nhượng bên ngoài trò chơi.',
        'CHẠM Flora có quyền điều chỉnh, thay đổi hoặc ngừng cung cấp bất kỳ vật phẩm, tính năng hoặc cơ chế trò chơi nào nhằm đảm bảo tính cân bằng và cải thiện trải nghiệm tổng thể của cộng đồng.'
      ]
    },
    {
      id: 'thanh-toan-giao-dich',
      title: '4. Thanh toán và giao dịch',
      content: 'Một số vật phẩm hoặc dịch vụ gia tăng trong CHẠM Flora yêu cầu thanh toán bằng tiền thật. Mọi giao dịch mua hàng sẽ được xử lý qua các cổng thanh toán chính thức được tích hợp sẵn. Khi thực hiện giao dịch, bạn xác nhận:',
      items: [
        'Mọi thông tin thanh toán cung cấp là hợp lệ, chính xác.',
        'Giá sản phẩm ảo hoặc dịch vụ có thể thay đổi tùy thuộc vào chính sách vận hành của từng giai đoạn.',
        'Các giao dịch đã hoàn tất thường sẽ không được hoàn tiền, ngoại trừ các trường hợp được quy định bởi pháp luật bảo vệ người tiêu dùng hoặc chính sách hoàn tiền của nền tảng phân phối (Google Play / App Store).',
        'CHẠM Flora có quyền từ chối hoặc hủy bỏ giao dịch nếu phát hiện dấu hiệu gian lận hoặc vi phạm chính sách thanh toán.'
      ]
    },
    {
      id: 'quy-tac-ung-xu',
      title: '5. Quy tắc ứng xử của người dùng',
      content: 'Khi tham gia vào cộng đồng CHẠM Flora, bạn cam kết không thực hiện các hành vi sau:',
      items: [
        'Sử dụng phần mềm gian lận, bot, script hoặc các công cụ tự động để can thiệp vào trò chơi.',
        'Khai thác lỗi (exploit bug) hệ thống nhằm trục lợi cá nhân hoặc tạo lợi thế không công bằng.',
        'Mua bán, chuyển nhượng hoặc trao đổi tài khoản trò chơi trái phép.',
        'Phát tán mã độc, virus hoặc các phần mềm gây hại cho hệ thống máy chủ và thiết bị của người chơi khác.',
        'Đăng tải các nội dung vi phạm pháp luật, xúc phạm, quấy rối hoặc gây ảnh hưởng tiêu cực đến cộng đồng lành mạnh của dự án.',
        'Mạo danh cá nhân, tổ chức hoặc đại diện chính thức của CHẠM Flora.'
      ]
    },
    {
      id: 'quyen-truy-cap-thiet-bi',
      title: '6. Quyền truy cập thiết bị',
      content: 'Để cung cấp đầy đủ các tính năng (như đồng bộ thời gian trồng cây thực tế, thông báo nhắc nhở chăm sóc cây), ứng dụng có thể yêu cầu một số quyền truy cập trên thiết bị di động của bạn bao gồm: Kết nối Internet, Thông báo đẩy, Lưu trữ dữ liệu, Định vị GPS (khi cần tham gia sự kiện xanh tại địa phương) và hoạt động nền. Bạn có quyền từ chối cấp quyền, tuy nhiên điều này có thể hạn chế một phần trải nghiệm ứng dụng.',
    },
    {
      id: 'so-huu-tri-tue',
      title: '7. Quyền sở hữu trí tuệ',
      content: 'Toàn bộ nội dung của CHẠM Flora bao gồm: tên ứng dụng, logo thương hiệu, giao diện người dùng (UI), hình ảnh đồ họa, âm thanh, nội dung văn bản, thiết kế trò chơi và mã nguồn đều thuộc quyền sở hữu độc quyền của CHẠM Flora hoặc các bên cấp phép hợp pháp. Người dùng không được sao chép, sử dụng hoặc khai thác thương mại các nội dung này khi chưa có sự đồng ý rõ ràng bằng văn bản từ chúng tôi.'
    },
    {
      id: 'tam-ngung-cham-dut',
      title: '8. Tạm ngừng hoặc chấm dứt tài khoản',
      content: 'CHẠM Flora có quyền tạm ngừng hoặc chấm dứt quyền truy cập dịch vụ của bạn mà không cần báo trước nếu phát hiện hành vi vi phạm nghiêm trọng Điều khoản sử dụng, gian lận hệ thống, hoặc theo yêu cầu hợp pháp của cơ quan chức năng. Khi tài khoản bị chấm dứt, mọi dữ liệu tiến trình chơi và vật phẩm ảo sẽ bị hủy bỏ mà không phát sinh nghĩa vụ bồi thường nào.'
    },
    {
      id: 'cap-nhat-dieu-khoan',
      title: '9. Cập nhật dịch vụ và điều khoản',
      content: 'Chúng tôi có quyền sửa đổi các điều khoản dịch vụ này, điều chỉnh các chỉ số gameplay (như thời gian chờ cooldown, mức kinh nghiệm nhận được) nhằm tối ưu trải nghiệm và duy trì sự cân bằng của trò chơi. Các phiên bản cập nhật sẽ được thông báo chính thức trên website hoặc trong ứng dụng. Việc bạn tiếp tục sử dụng ứng dụng sau khi cập nhật đồng nghĩa với việc bạn đồng ý với các điều khoản mới.'
    }
  ]
}

function LeafIcon({ className = 'w-4 h-4' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 3.5 1 9.8a7 7 0 0 1-13.4 3.2" />
      <path d="M19 2c-2.26 4.33-5.27 7.14-8 10" />
    </svg>
  )
}

function ArrowLeftIcon({ className = 'w-4 h-4' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <line x1="19" y1="12" x2="5" y2="12" />
      <polyline points="12 19 5 12 12 5" />
    </svg>
  )
}

function LegalPageContent() {
  const searchParams = useSearchParams()
  const router = useRouter()

  // Lấy giá trị tab từ URL parameter ?tab=... mặc định là 'terms'
  const activeTab = searchParams.get('tab') === 'privacy' ? 'privacy' : 'terms'
  const activeContent = activeTab === 'privacy' ? privacyPolicy : termsOfService

  // State hỗ trợ scroll để đánh dấu mục đang đọc (active section) trong TOC
  const [activeSection, setActiveSection] = useState<string>('')

  // Chuyển đổi tab bằng cách cập nhật URL query parameter
  const handleTabChange = (tab: 'terms' | 'privacy') => {
    router.push(`/term?tab=${tab}`)
  }

  // Theo dõi vị trí scroll để highlight mục lục tương ứng
  useEffect(() => {
    const sectionIds = activeContent.sections.map((s) => s.id)
    
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 160 // offset header
      
      // Tìm section hiện tại đang hiển thị trong viewport
      let currentSection = ''
      for (const id of sectionIds) {
        const el = document.getElementById(id)
        if (el) {
          const top = el.offsetTop
          const height = el.offsetHeight
          if (scrollPosition >= top && scrollPosition < top + height) {
            currentSection = id
            break
          }
        }
      }
      
      if (currentSection) {
        setActiveSection(currentSection)
      }
    }

    window.addEventListener('scroll', handleScroll)
    // Run initial check
    handleScroll()

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [activeContent])

  // Hàm cuộn mượt đến section cụ thể
  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault()
    const el = document.getElementById(id)
    if (el) {
      const offset = 110 // Khoảng cách chừa lại phía trên cho Header
      const bodyRect = document.body.getBoundingClientRect().top
      const elementRect = el.getBoundingClientRect().top
      const elementPosition = elementRect - bodyRect
      const offsetPosition = elementPosition - offset

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      })
      setActiveSection(id)
    }
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
      {/* Hero Title */}
      <div className="text-center mb-10 md:mb-14">
        <span className="bloom-tag-chip mb-3">Tài nguyên dự án</span>
        <h2 className="font-display font-black text-3xl sm:text-4xl md:text-5xl text-bloom-green-deep bloom-text-shadow leading-tight uppercase">
          Điều khoản &amp; Chính sách
        </h2>
      </div>

      {/* Tabs Switcher dạng 3D Button đặc trưng CHẠM Flora */}
      <div className="flex justify-center gap-4 mb-10 md:mb-14">
        <button
          type="button"
          onClick={() => handleTabChange('terms')}
          className={`bloom-btn-3d px-6 py-3 text-xs sm:text-sm w-44 sm:w-52 ${
            activeTab === 'terms'
              ? 'bloom-btn-3d-primary'
              : 'bloom-btn-3d-outline'
          }`}
        >
          Điều khoản sử dụng
        </button>
        <button
          type="button"
          onClick={() => handleTabChange('privacy')}
          className={`bloom-btn-3d px-6 py-3 text-xs sm:text-sm w-44 sm:w-52 ${
            activeTab === 'privacy'
              ? 'bloom-btn-3d-primary'
              : 'bloom-btn-3d-outline'
          }`}
        >
          Chính sách bảo mật
        </button>
      </div>

      {/* Bố cục chính */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* CỘT 1: SIDEBAR MỤC LỤC (Table of Contents) - Chỉ hiện trên Desktop */}
        <div className="hidden lg:block lg:col-span-4">
          <aside className="sticky top-28 bg-[#fffdf8] border-[2.5px] border-bloom-green-deep rounded-3xl p-6 shadow-[4px_4px_0px_#4f3516]">
            <h2 className="font-display font-black text-sm text-bloom-green-deep uppercase tracking-wider mb-4 border-b-[1.5px] border-bloom-green-deep/15 pb-2">
              Mục lục tài liệu
            </h2>
            <nav className="space-y-1">
              {activeContent.sections.map((sec) => {
                const isActive = activeSection === sec.id
                return (
                  <a
                    key={sec.id}
                    href={`#${sec.id}`}
                    onClick={(e) => scrollToSection(e, sec.id)}
                    className={`block py-2 px-3 rounded-xl text-xs font-semibold tracking-wide transition-all border border-transparent ${
                      isActive
                        ? 'bg-bloom-green-mid/10 border-bloom-green-deep/15 text-bloom-green-deep pl-4'
                        : 'text-bloom-green-deep/60 hover:bg-bloom-green-light/40 hover:text-bloom-green-deep hover:pl-4'
                    }`}
                  >
                    <span className="flex items-center gap-2">
                      {isActive && <LeafIcon className="w-3.5 h-3.5 text-bloom-accent-mint shrink-0" />}
                      <span className="truncate">{sec.title}</span>
                    </span>
                  </a>
                )
              })}
            </nav>
            <div className="mt-6 pt-4 border-t-[1.5px] border-bloom-green-deep/15 text-[10px] text-bloom-green-deep/50 text-center font-light">
              {activeContent.lastUpdated}
            </div>
          </aside>
        </div>

        {/* MỤC LỤC TRÊN DI ĐỘNG (Ngang, Cuộn ngang) */}
        <div className="block lg:hidden w-full overflow-x-auto pb-4 mb-2 -mt-4 scrollbar-none">
          <div className="flex gap-2.5 px-1 min-w-max">
            {activeContent.sections.map((sec) => {
              const isActive = activeSection === sec.id
              return (
                <a
                  key={sec.id}
                  href={`#${sec.id}`}
                  onClick={(e) => scrollToSection(e, sec.id)}
                  className={`inline-flex items-center gap-1.5 py-2 px-4 rounded-full border text-[11px] font-bold tracking-wide whitespace-nowrap transition-all ${
                    isActive
                      ? 'bg-bloom-green-mid border-bloom-green-deep text-bloom-green-deep shadow-[2px_2px_0px_#4f3516]'
                      : 'bg-white border-bloom-green-deep/20 text-bloom-green-deep/60'
                  }`}
                >
                  {isActive && <LeafIcon className="w-3.5 h-3.5 text-bloom-green-deep" />}
                  {sec.title.split('.')[1]?.trim() || sec.title}
                </a>
              )
            })}
          </div>
        </div>

        {/* CỘT 2: NỘI DUNG CHÍNH (Bọc trong bloom-card-3d lớn) */}
        <main className="lg:col-span-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.25 }}
              className="bloom-card-3d bg-[#fffdf8] p-6 sm:p-8 md:p-10"
            >
              <div className="border-b-[2px] border-bloom-green-deep/15 pb-6 mb-6">
                <span className="text-[10px] uppercase font-bold tracking-widest text-bloom-green-deep/50 block mb-1">
                  Văn bản chính thức
                </span>
                <h2 className="font-display font-black text-xl sm:text-2xl md:text-3xl text-bloom-green-deep leading-tight">
                  {activeContent.title}
                </h2>
                <div className="mt-2 text-[11px] text-bloom-green-deep/50 font-medium">
                  {activeContent.lastUpdated}
                </div>
              </div>

              {/* Phần giới thiệu */}
              <p className="text-sm font-light text-bloom-green-deep/85 leading-relaxed mb-8 bg-bloom-green-light/45 border-l-[3.5px] border-bloom-green-mid pl-4 py-2.5 rounded-r-xl">
                {activeContent.introduction}
              </p>

              {/* Danh sách các phần chính */}
              <div className="space-y-10 md:space-y-12">
                {activeContent.sections.map((sec) => (
                  <section
                    key={sec.id}
                    id={sec.id}
                    className="scroll-mt-32 transition-colors duration-300 group"
                  >
                    <h3 className="font-display font-black text-base sm:text-lg text-bloom-green-deep mb-4 flex items-center gap-2 pb-1 border-b border-bloom-green-deep/10">
                      <span className="size-2 rounded-full bg-bloom-accent-mint shrink-0 group-hover:scale-125 transition-transform" />
                      {sec.title}
                    </h3>
                    
                    <p className="text-sm text-bloom-green-deep/80 leading-relaxed mb-4 font-light">
                      {sec.content}
                    </p>

                    {/* Render mảng items dạng bullet points nếu có */}
                    {sec.items && sec.items.length > 0 && (
                      <ul className="space-y-3.5 pl-1.5">
                        {sec.items.map((item, idx) => {
                          // Nếu có định dạng "Tiêu đề: Nội dung", làm nổi bật tiêu đề
                          const parts = item.split(': ')
                          const hasHeading = parts.length > 1
                          return (
                            <li key={idx} className="flex items-start gap-3 text-xs sm:text-sm text-bloom-green-deep/80 leading-relaxed">
                              <span className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-bloom-green-mid/10 text-bloom-green-mid border border-bloom-green-deep/10">
                                <LeafIcon className="w-2.5 h-2.5 text-bloom-accent-mint" />
                              </span>
                              <span className="font-light">
                                {hasHeading ? (
                                  <>
                                    <strong className="font-bold text-bloom-green-deep">{parts[0]}:</strong>{' '}
                                    {parts.slice(1).join(': ')}
                                  </>
                                ) : (
                                  item
                                )}
                              </span>
                            </li>
                          )
                        })}
                      </ul>
                    )}

                    {/* Render subsections nếu có (như trong Chia sẻ thông tin) */}
                    {sec.subsections && sec.subsections.length > 0 && (
                      <div className="space-y-5 mt-4">
                        {sec.subsections.map((sub, subIdx) => (
                          <div
                            key={subIdx}
                            className="bg-[#fffdf8] border-[1.5px] border-bloom-green-deep/15 rounded-2xl p-4 shadow-sm"
                          >
                            <h4 className="font-display font-extrabold text-xs sm:text-sm text-bloom-green-deep mb-2 flex items-center gap-1.5">
                              <span className="h-1.5 w-1.5 rounded-full bg-bloom-petal" />
                              {sub.subtitle}
                            </h4>
                            <p className="text-xs sm:text-sm text-bloom-green-deep/75 leading-relaxed font-light">
                              {sub.content}
                            </p>
                          </div>
                        ))}
                      </div>
                    )}
                  </section>
                ))}
              </div>

              {/* Footer cam kết pháp lý cuối trang */}
              <div className="mt-12 pt-8 border-t-[2px] border-bloom-green-deep/15 text-center text-xs text-bloom-green-deep/50 font-light">
                Mọi thắc mắc liên quan đến chính sách và điều khoản, vui lòng gửi email về:{' '}
                <a
                  href="mailto:contact@chamflora.vn"
                  className="font-bold text-bloom-green-deep hover:text-bloom-accent-mint underline transition-colors"
                >
                  contact@chamflora.vn
                </a>
              </div>
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
    </div>
  )
}

export default function LegalPage() {
  return (
    <ChamBloomMotionProvider>
      <main className="cham-bloom-page min-h-screen bg-bloom-cream text-bloom-green-deep font-sans pb-20">
        {/* Header Tối Giản */}
        <header className="w-full border-b-[2.5px] border-bloom-green-deep bg-white/70 backdrop-blur-md px-4 sm:px-6 py-4 sticky top-0 z-40">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2 hover:scale-[1.02] transition-transform">
              <Image
                src="/assets/logo/CHAM-Flora.png"
                alt="CHẠM Flora Logo"
                width={120}
                height={40}
                className="h-[32px] sm:h-[38px] w-auto shrink-0 object-contain"
                priority
              />
            </Link>
            <Link
              href="/"
              className="bloom-btn-3d bloom-btn-3d-outline px-4 sm:px-5 py-2 text-xs"
            >
              Về trang chủ
            </Link>
          </div>
        </header>

        {/* Suspense Wrapper cho phần tử dùng useSearchParams */}
        <Suspense
          fallback={
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-bloom-green-mid border-t-transparent"></div>
              <p className="mt-4 text-sm text-bloom-green-deep/60">Đang tải nội dung điều khoản...</p>
            </div>
          }
        >
          <LegalPageContent />
        </Suspense>
      </main>
    </ChamBloomMotionProvider>
  )
}
