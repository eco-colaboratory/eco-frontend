/**
 * Single source of truth for CHẠM Flora landing copy.
 * Image placeholders — replace under /public/images/cham-bloom/ when assets arrive:
 *   hero-poster.webp, vision.webp, mission.webp, og-cover.webp
 */
export const HERO_VIDEO_URL =
  'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260330_153826_e9005cf7-a1c7-4c7d-886f-fea22d644a9c.mp4'

const unsplash = (id: string, w = 1200) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`

export type TierHighlight = 'base' | 'gold'

export interface ChamBloomContent {
  hero: {
    videoUrl: string
    posterSrc: string
    badge: string
    headline: [string, string]
    tagline: string
    primaryCta: string
    secondaryCta: string
    partnersPill: string
    partners: string[]
  }
  about: {
    label: string
    title: string
    intro: string
    cards: { icon: string; title: string; description: string }[]
  }
  vision: { title: string; body: string; imageSrc: string; imageAlt: string }
  mission: { title: string; body: string; imageSrc: string; imageAlt: string }
  coreIdea: {
    headline: string
    headlineGold: string
    steps: string[]
  }
  achievements: {
    label: string
    title: string
    items: { title: string; subtitle: string; badge: string }[]
  }
  roadmap: {
    label: string
    title: string
    items: { month: string; title: string; description: string }[]
  }
  tiers: { name: string; slug: string; teaser: string; highlight: TierHighlight }[]
  fundUsage: { title: string; bullets: string[] }
  valueProp: {
    label: string
    title: string
    intro: string
    cards: { title: string; description: string; bullets: string[] }[]
  }
  benefits: {
    label: string
    title: string
    tierNames: string[]
    rows: { label: string; cells: string[] }[]
  }
  benefitsNote: string
  contact: {
    title: string
    body: string
    cta: string
    email: string
    facebookUrl: string
    facebookLabel: string
    tiktokUrl: string
    tiktokLabel: string
    representative: string
    copyright: string
  }
}

export const CHAM_BLOOM_CONTENT: ChamBloomContent = {
  hero: {
    videoUrl: HERO_VIDEO_URL,
    posterSrc: unsplash('photo-1490750967868-88aa4486c946', 1920),
    badge: 'CHẠM Flora · Modern Eco Startup',
    headline: ['Gieo nên một khu vườn thật', 'từ những hành động xanh của Gen Z'],
    tagline: 'Nền tảng game hóa giúp học sinh, sinh viên chăm sóc vườn hoa ảo, xây dựng thói quen tích cực và cùng cộng đồng tạo nên những mầm xanh ngoài đời thật.',
    primaryCta: 'Trở thành nhà tài trợ',
    secondaryCta: 'Xem quyền lợi đồng hành',
    partnersPill: 'Hành trình phát triển thương hiệu CHẠM Flora',
    partners: ['Panasonic Gen G', 'FIP Startup', 'Gen Z', 'E.C.O'],
  },
  about: {
    label: 'Về dự án',
    title: 'CHẠM Flora là gì?',
    intro:
      'Không chỉ là một dự án môi trường đơn thuần, CHẠM Flora là một startup công nghệ xanh được game hóa, biến tương tác số thành giá trị bền vững ngoài đời thật.',
    cards: [
      {
        icon: 'gamepad',
        title: 'Nuôi dưỡng vườn ảo',
        description:
          'Chăm sóc và phát triển vườn hoa số của bạn thông qua các hoạt động tập trung Focus Mode và minigame thú vị.',
      },
      {
        icon: 'sparkles',
        title: 'Rèn thói quen xanh',
        description:
          'Biến việc học tập, sinh hoạt lành mạnh và hành động sinh thái nhỏ mỗi ngày thành một thói quen tự nhiên.',
      },
      {
        icon: 'users',
        title: 'Gắn kết cộng đồng',
        description:
          'Gặp gỡ và chia sẻ phong cách sống bền vững cùng hàng ngàn bạn trẻ Gen Z năng động có cùng tần số xanh.',
      },
      {
        icon: 'sprout',
        title: 'Kiến tạo mầm thật',
        description:
          'Đồng hành cùng nhà tài trợ biến những điểm số tích lũy ảo thành những vườn hoa xanh rực rỡ ngoài đời thật.',
      },
    ],
  },
  vision: {
    title: 'Tầm nhìn',
    body: 'Trở thành ứng dụng hàng đầu trong việc game hóa phong cách sống xanh cho Gen Z Việt Nam, kết nối hàng triệu hành động số nhỏ bé để tạo dựng một hệ sinh thái vườn thực ngoài đời, đồng hành lâu dài cùng các thương hiệu xanh.',
    imageSrc: '/assets/landing/vision.jpg',
    imageAlt: 'Vườn hoa phát sáng huyền ảo — tầm nhìn CHẠM Flora',
  },
  mission: {
    title: 'Sứ mệnh',
    body: 'Giúp Gen Z hình thành thói quen tích cực và thấu hiểu lối sống bền vững một cách tự nhiên thông qua gamification mượt mà, đồng thời trao quyền để người trẻ trực tiếp cùng doanh nghiệp bảo vệ môi trường.',
    imageSrc: '/assets/landing/mission.jpg',
    imageAlt: 'Mầm cây nhỏ lớn dần dưới nắng — sứ mệnh CHẠM Flora',
  },
  coreIdea: {
    headline: 'Vườn hoa ảo hôm nay,',
    headlineGold: 'vườn hoa thật ngày mai',
    steps: ['Chơi game ảo', 'Chạm kết nối', 'Gieo mầm thật'],
  },
  achievements: {
    label: 'Thành tích nổi bật',
    title: 'Được bảo chứng uy tín',
    items: [
      {
        title: 'Top 5 Đại sứ Gen G 2025',
        subtitle: 'Được tài trợ và bảo trợ bởi Panasonic Việt Nam',
        badge: 'Gen G 2025',
      },
      {
        title: 'Á quân FIP – Youth Startup',
        subtitle: 'Khẳng định tiềm năng của mô hình game hóa hành động xanh',
        badge: 'FIP 2025',
      },
    ],
  },
  roadmap: {
    label: 'Lộ trình phát triển',
    title: 'Hành trình launching 2026',
    items: [
      {
        month: 'Tháng 6',
        title: 'Beta Test',
        description: 'Ra mắt phiên bản thử nghiệm đầu tiên của game, khảo sát phản hồi từ nhóm người dùng Gen Z nòng cốt để tối ưu hóa trải nghiệm.',
      },
      {
        month: 'Tháng 7',
        title: 'Community Building',
        description: 'Xây dựng cộng đồng xanh năng động, triển khai các minigame và thử thách vệ tinh nhằm thu hút sự quan tâm trước sự kiện launching chính thức.',
      },
      {
        month: 'Tháng 8',
        title: 'Launching Campaign',
        description: 'Chính thức khởi động chiến dịch quy mô lớn, ra mắt phiên bản game hoàn chỉnh và quảng bá rộng rãi tới học sinh - sinh viên toàn thành phố.',
      },
      {
        month: 'Tháng 9',
        title: 'Sponsor Activities & Recap',
        description: 'Hiện thực hóa vườn hoa thật từ tích lũy của người chơi, bàn giao các hạng mục tài trợ, đo lường chỉ số truyền thông và phát hành Media Recap.',
      },
    ],
  },
  tiers: [
    { name: 'Đồng', slug: 'dong', teaser: '2.000.000 VNĐ', highlight: 'base' },
    { name: 'Bạc', slug: 'bac', teaser: '5.000.000 VNĐ', highlight: 'base' },
    { name: 'Vàng', slug: 'vang', teaser: '10.000.000 VNĐ', highlight: 'gold' },
    { name: 'Kim Cương', slug: 'kim-cuong', teaser: '20.000.000 VNĐ', highlight: 'gold' },
  ],
  fundUsage: {
    title: 'Phân bổ ngân sách',
    bullets: [
      'Phát triển hoàn thiện cơ chế gamification và giao diện game',
      'Thiết kế đồ họa, hình ảnh hoa, vườn và nhân vật',
      'Chuẩn bị cơ sở vật chất, đất trồng và hạt giống cho vườn hoa thật',
      'Chiến dịch truyền thông số: bài đăng fanpage, video TikTok, TVC launching',
      'Tổ chức sự kiện ra mắt và vận hành cộng đồng người dùng',
    ],
  },
  valueProp: {
    label: 'Giá trị đồng hành',
    title: 'Vì sao nhà tài trợ nên quan tâm?',
    intro:
      'Sponsor không chỉ là một logo hiển thị đơn điệu. Đồng hành cùng CHẠM Flora là giải pháp tối ưu giúp doanh nghiệp của bạn đạt được mục tiêu thương hiệu và cộng đồng.',
    cards: [
      {
        title: 'Tiếp cận tập trung Gen Z',
        description: 'Mở rộng mức độ nhận diện thương hiệu đối với tệp khán giả trẻ từ 16 - 24 tuổi.',
        bullets: ['Học sinh - sinh viên năng động', 'Tập trung cao tại khu vực TP.HCM', 'Thích công nghệ và xu hướng mới'],
      },
      {
        title: 'Gắn thương hiệu với giá trị tích cực',
        description: 'Xây dựng hình ảnh thương hiệu tiên phong, thân thiện và trách nhiệm.',
        bullets: ['Bảo vệ môi trường thực tế', 'Nâng cao sức khỏe tinh thần', 'Ứng dụng công nghệ giáo dục sáng tạo'],
      },
      {
        title: 'Đồng hành cùng chiến dịch lớn',
        description: 'Xuất hiện xuyên suốt các kênh thông tin lớn trong chiến dịch ra mắt sản phẩm.',
        bullets: ['Landing page dự án', 'Mạng xã hội & nội dung Viral', 'TVC quảng bá & Proposal đối ngoại'],
      },
      {
        title: 'Tạo dấu ấn CSR thật',
        description: 'Tạo dựng giá trị đóng góp thực tế cho xã hội có thể đo lường và tham quan.',
        bullets: ['Trực tiếp gieo trồng vườn hoa thật ngoài đời', 'Tạo tài nguyên sinh thái xanh cho thành phố', 'Có tư liệu truyền thông chân thực'],
      },
    ],
  },
  benefits: {
    label: 'Quyền lợi chi tiết',
    title: 'Bảng so sánh quyền lợi các gói tài trợ',
    tierNames: [
      'Đồng',
      'Bạc',
      'Vàng',
      'Kim Cương',
    ],
    rows: [
      // Quyền lợi truyền thông
      { label: 'Logo/tên thương hiệu trên landing page/proposal', cells: ['Bằng 1/2 logo dự án', 'Bằng 1/2 logo dự án', 'Bằng logo dự án', 'Bằng logo dự án'] },
      { label: 'Hashtag xuất hiện trong các bài đăng trên Fanpage', cells: ['1 hashtag', '1 hashtag', '1 hashtag', '2 hashtag'] },
      { label: 'Ghi nhận danh vị trên key visual và ấn phẩm truyền thông chính', cells: ['✓', '✓', '✓', '✓'] },
      { label: 'Quyền sử dụng danh vị đồng hành/tài trợ chính thức', cells: ['✓', '✓', '✓', '✓'] },
      { label: 'Cung cấp tư liệu truyền thông độc quyền để đơn vị đăng lại', cells: ['✓', '✓', '✓', '✓'] },
      { label: 'Bài đăng giới thiệu chung trên fanpage dự án', cells: ['✓', '✓', '✓', '✓'] },
      { label: 'Bài đăng cảm ơn chung kết thúc chiến dịch', cells: ['✓', '✓', '✓', '✓'] },
      { label: 'Bài đăng giới thiệu riêng về thương hiệu', cells: ['-', '✓', '✓', '✓'] },
      { label: 'Bài đăng cảm ơn riêng biệt', cells: ['-', '✓', '✓', '✓'] },
      { label: 'Tên thương hiệu xuất hiện trong TVC/video launch', cells: ['-', '✓', '✓', '✓'] },
      { label: 'Logo/tên thương hiệu trong toàn bộ video truyền thông', cells: ['-', '-', '✓', '✓'] },
      { label: 'Được mời tham dự trực tiếp buổi ra mắt / nghiệm thu vườn thật', cells: ['-', '-', '✓', '✓'] },
      { label: 'Bài truyền thông hỗ trợ NTT trên fanpage của dự án', cells: ['-', '-', '-', '✓'] },
      { label: 'Lồng ghép sản phẩm thương hiệu vào nội dung truyền thông sáng tạo', cells: ['-', '-', '1 nội dung', '2 nội dung'] },
      { label: 'Ưu tiên xuất hiện nổi bật tại vườn hoa thật ngoài đời', cells: ['-', '-', 'Được ghi nhận trên bảng thông tin chung tại vườn', 'Được vinh danh nổi bật trên bảng thông tin vườn, backdrop và ấn phẩm nghiệm thu'] },
      
      // Quyền lợi trong game ảo
      { label: 'Tên thương hiệu/sản phẩm xuất hiện trong game', cells: ['-', '-', '✓', '✓'] },
      { label: 'Thiết kế vật phẩm/hoa/decor mang dấu ấn thương hiệu', cells: ['-', '-', '✓', '✓'] },
      { label: 'Khu vực hoặc chuỗi nhiệm vụ đồng hành riêng trong game', cells: ['-', '-', '-', '✓'] },
      { label: 'Tích hợp voucher/quà tặng của thương hiệu làm phần thưởng game', cells: ['-', '-', '-', '✓'] },
      { label: 'Ưu tiên đồng hành cùng các hoạt động mở rộng của game trong tương lai', cells: ['-', '-', '-', '✓'] },
      { label: 'Mini challenge/sự kiện trong game mang tên thương hiệu', cells: ['-', '-', '-', 'Đồng hành & đặt tên 01 sự kiện'] },
    ],
  },
  benefitsNote: 'Các gói tài trợ bằng hiện vật hoặc bảo trợ truyền thông sẽ được thiết lập theo thỏa thuận hợp tác riêng giữa hai bên nhằm tối ưu hóa quyền lợi.',
  contact: {
    title: 'Cùng gieo hạt mầm đầu tiên với CHẠM Flora',
    body: 'Nếu doanh nghiệp của bạn đang tìm kiếm một dự án Gen Z, xanh, công nghệ và có câu chuyện cộng đồng rõ ràng, CHẠM Flora rất mong được đồng hành.',
    cta: 'Liên hệ ngay',
    email: 'thaolinhworkspace@gmail.com',
    facebookUrl: 'https://www.facebook.com/',
    facebookLabel: 'E.C.O - Green Tech Gamification',
    tiktokUrl: 'https://www.tiktok.com/',
    tiktokLabel: 'E.C.O Startup',
    representative: 'Nguyễn Thị Thảo Linh · Leader Project',
    copyright: `© ${new Date().getFullYear()} CHẠM Flora · Flow & Flora`,
  },
}
