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
  sponsorshipCategories: { title: string; contribution: string; description: string }[]
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
    rows: Array<
      | { kind: 'section'; label: string }
      | { kind: 'row'; label: string; cells: string[] }
    >
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
    youtubeUrl: string
    youtubeLabel: string
    representative: string
    copyright: string
  }
}

export const CHAM_BLOOM_CONTENT: ChamBloomContent = {
  hero: {
    videoUrl: HERO_VIDEO_URL,
    posterSrc: unsplash('photo-1490750967868-88aa4486c946', 1920),
    badge: 'CHẠM Flora · Trải nghiệm sống xanh của thế hệ mới',
    headline: ['Gieo nên một khu vườn thật', 'từ những hành động xanh của Gen Z'],
    tagline: 'Nền tảng game hóa giúp học sinh, sinh viên chăm sóc vườn hoa ảo, xây dựng thói quen tích cực và cùng cộng đồng tạo nên những mầm xanh ngoài đời thật.',
    primaryCta: 'Trở thành nhà tài trợ',
    secondaryCta: 'Xem quyền lợi đồng hành',
    partnersPill: 'Hành trình phát triển thương hiệu CHẠM Flora',
    partners: ['Panasonic Gen G', 'FIP Startup', 'Gen Z', 'CHẠM'],
  },
  about: {
    label: 'Về dự án',
    title: 'CHẠM Flora là gì?',
    intro:
      'Tiếp nối tinh thần CHẠM, CHẠM Flora là trò chơi chăm sóc vườn hoa ảo đồng hành cùng học sinh, sinh viên trên hành trình rèn luyện lối sống bền vững.',
    cards: [
      {
        icon: 'gamepad',
        title: 'Nuôi dưỡng vườn ảo',
        description:
          'Chăm sóc và phát triển vườn hoa số của bạn thông qua các hoạt động trong game như tưới nước, chăm hoa, hoàn thành nhiệm vụ.',
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
    body: 'Hướng đến trở thành nền tảng game hóa hành động xanh cho Gen Z, kết nối những tương tác trong thế giới số với các giá trị tích cực ngoài đời thật thông qua mô hình “vườn hoa ảo – vườn hoa thật”.',
    imageSrc: '/assets/landing/vision.jpg',
    imageAlt: 'Vườn hoa phát sáng huyền ảo — tầm nhìn CHẠM Flora',
  },
  mission: {
    title: 'Sứ mệnh',
    body: 'Giúp Gen Z xây dựng lối sống bền vững và thói quen tích cực một cách nhẹ nhàng, gần gũi thông qua trải nghiệm game hóa, nơi mỗi hành động nhỏ đều góp phần kiến tạo giá trị thật cho cộng đồng.',
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
    title: 'Nền tảng uy tín cho giai đoạn phát triển tiếp theo:',
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
    title: 'Hành trình triển khai 2026',
    items: [
      {
        month: 'Tháng 6',
        title: 'Thử nghiệm phiên bản đầu',
        description: 'Ra mắt phiên bản thử nghiệm đầu tiên của game, khảo sát phản hồi từ nhóm người dùng Gen Z nòng cốt để tối ưu trải nghiệm.',
      },
      {
        month: 'Tháng 7',
        title: 'Xây dựng cộng đồng',
        description: 'Phát triển cộng đồng sống xanh năng động, triển khai các minigame và thử thách vệ tinh nhằm thu hút sự quan tâm trước giai đoạn ra mắt chính thức.',
      },
      {
        month: 'Tháng 8',
        title: 'Khởi động chiến dịch',
        description: 'Chính thức triển khai chiến dịch quy mô lớn, ra mắt phiên bản hoàn chỉnh và quảng bá rộng rãi đến học sinh – sinh viên toàn thành phố.',
      },
      {
        month: 'Tháng 9',
        title: 'Hoạt động đồng hành & tổng kết',
        description: 'Hiện thực hóa vườn hoa thật từ thành quả tích lũy của người chơi, triển khai các quyền lợi tài trợ, đo lường hiệu quả truyền thông và phát hành báo cáo tổng kết.',
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
      'Phát triển hoàn thiện cơ chế và giao diện game',
      'Thiết kế đồ họa, hình ảnh hoa, vườn và nhân vật',
      'Chuẩn bị cơ sở vật chất, đất trồng và hạt giống cho vườn hoa thật',
      'Chiến dịch truyền thông số: bài đăng fanpage, video TikTok, TVC launching',
      'Tổ chức sự kiện ra mắt và vận hành cộng đồng người dùng',
    ],
  },
  sponsorshipCategories: [
    {
      title: 'Đơn vị hợp tác',
      contribution: 'Theo thỏa thuận',
      description:
        'Là các đơn vị cùng CHẠM Flora phối hợp triển khai nội dung, hoạt động, chuyên môn, địa điểm, nhân sự hoặc các nguồn lực khác để phát triển dự án.',
    },
    {
      title: 'Đơn vị đồng hành',
      contribution: 'Theo thỏa thuận',
      description:
        'Là các đơn vị đồng hành cùng dự án ở mức cơ bản, hỗ trợ CHẠM Flora trong quá trình phát triển game, truyền thông hoặc lan tỏa tinh thần sống xanh đến Gen Z.',
    },
    {
      title: 'Đơn vị bảo trợ truyền thông',
      contribution: 'Hỗ trợ truyền thông',
      description:
        'Hỗ trợ lan tỏa thông tin dự án thông qua bài đăng, chia sẻ, truyền thông cộng đồng hoặc kết nối người dùng đến với CHẠM Flora.',
    },
    {
      title: 'Nhà tài trợ Đồng',
      contribution: '2.000.000 VNĐ',
      description:
        'Gói tài trợ khởi đầu, giúp dự án có thêm nguồn lực để sản xuất nội dung truyền thông, hoàn thiện một phần visual/game asset và duy trì hoạt động truyền thông trong giai đoạn launching.',
    },
    {
      title: 'Nhà tài trợ Bạc',
      contribution: '5.000.000 VNĐ',
      description:
        'Gói tài trợ hỗ trợ dự án trong việc phát triển nội dung truyền thông, beta test, sản xuất video ngắn, ấn phẩm visual và các hoạt động tương tác cộng đồng.',
    },
    {
      title: 'Nhà tài trợ Vàng',
      contribution: '10.000.000 VNĐ',
      description:
        'Gói tài trợ quan trọng, đồng hành cùng CHẠM Flora trong giai đoạn launching, hỗ trợ phát triển sản phẩm game, truyền thông, beta test và chuẩn bị cho hành trình kết nối vườn hoa ảo – vườn hoa thật.',
    },
    {
      title: 'Nhà tài trợ Kim Cương',
      contribution: '20.000.000 VNĐ',
      description:
        'Gói tài trợ cao nhất, dành cho đơn vị muốn trở thành đối tác nổi bật của CHẠM Flora trong hành trình phát triển game, truyền thông launch và đồng hành cùng định hướng biến vườn hoa ảo trong game thành vườn hoa thật ngoài đời.',
    },
  ],
  valueProp: {
    label: 'Giá trị đồng hành',
    title: 'Vì sao nhà tài trợ nên quan tâm?',
    intro:
      'Đồng hành cùng CHẠM Flora không chỉ là câu chuyện hiển thị logo đơn điệu. Đây là giải pháp tối ưu giúp thương hiệu kết nối sâu sắc với thế hệ trẻ và kiến tạo các giá trị cộng đồng thực chất.',
    cards: [
      {
        title: 'Tiếp cận trực tiếp thế hệ trẻ (Gen Z)',
        description: 'Mở rộng mức độ nhận diện thương hiệu đối với tệp khán giả trẻ từ 16 - 24 tuổi.',
        bullets: ['Học sinh - sinh viên năng động', 'Tập trung cao tại khu vực TP.HCM', 'Thích công nghệ và xu hướng mới'],
      },
      {
        title: 'Nâng tầm thương hiệu xanh',
        description: 'Xây dựng hình ảnh thương hiệu tiên phong, thân thiện và trách nhiệm.',
        bullets: ['Bảo vệ môi trường thực tế', 'Nâng cao sức khỏe tinh thần', 'Ứng dụng công nghệ giáo dục sáng tạo'],
      },
      {
        title: 'Độ phủ truyền thông đa kênh',
        description: 'Xuất hiện xuyên suốt các kênh thông tin lớn trong chiến dịch ra mắt sản phẩm.',
        bullets: ['Landing page dự án', 'Mạng xã hội & nội dung Viral', 'TVC quảng bá & Proposal đối ngoại'],
      },
      {
        title: 'Dấu ấn CSR xanh thực tế',
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
      { kind: 'section', label: 'Quyền lợi truyền thông' },
      { kind: 'row', label: 'Logo/tên thương hiệu trên landing page/proposal', cells: ['Bằng 1/2 logo dự án', 'Bằng 1/2 logo dự án', 'Bằng logo dự án', 'Bằng logo dự án'] },
      { kind: 'row', label: 'Hashtag xuất hiện trong các bài đăng trên Fanpage', cells: ['1 hashtag', '1 hashtag', '1 hashtag', '2 hashtag'] },
      { kind: 'row', label: 'Ghi nhận danh vị trên landing page/proposal/key visual/ấn phẩm truyền thông', cells: ['✓', '✓', '✓', '✓'] },
      { kind: 'row', label: 'Quyền sử dụng danh vị đồng hành/tài trợ', cells: ['✓', '✓', '✓', '✓'] },
      { kind: 'row', label: 'Cung cấp tư liệu truyền thông để đơn vị đăng lại', cells: ['✓', '✓', '✓', '✓'] },
      { kind: 'row', label: 'Bài đăng giới thiệu chung', cells: ['✓', '✓', '✓', '✓'] },
      { kind: 'row', label: 'Bài đăng cảm ơn chung', cells: ['✓', '✓', '✓', '✓'] },
      { kind: 'row', label: 'Bài đăng giới thiệu riêng', cells: ['-', '✓', '✓', '✓'] },
      { kind: 'row', label: 'Bài đăng cảm ơn riêng', cells: ['-', '✓', '✓', '✓'] },
      { kind: 'row', label: 'Tên thương hiệu xuất hiện trong TVC/video launch', cells: ['-', '✓', '✓', '✓'] },
      { kind: 'row', label: 'Logo/tên thương hiệu trong các video truyền thông', cells: ['-', '-', '✓', '✓'] },
      { kind: 'row', label: 'Tài liệu quảng bá của NTT được hỗ trợ truyền thông trên fanpage của dự án', cells: ['-', '-', '-', '✓'] },
      { kind: 'row', label: 'Sản phẩm thương hiệu được lồng ghép vào nội dung truyền thông', cells: ['-', '-', '1 nội dung', '2 nội dung'] },
      { kind: 'section', label: 'Quyền lợi xuất hiện trong sản phẩm game' },
      { kind: 'row', label: 'Tên thương hiệu/sản phẩm xuất hiện trong game', cells: ['-', '-', '✓', '✓'] },
      { kind: 'row', label: 'Thiết kế vật phẩm/hoa/decor mang dấu ấn thương hiệu', cells: ['-', '-', '✓', '✓'] },
      { kind: 'row', label: 'Khu vực thương hiệu riêng hoặc nhiệm vụ đồng hành riêng trong game', cells: ['-', '-', '-', '✓'] },
      { kind: 'row', label: 'Voucher/quà tặng/thông điệp thương hiệu tích hợp trong hoạt động game', cells: ['-', '-', '-', '✓'] },
      { kind: 'row', label: 'Ưu tiên đồng hành các hoạt động mở rộng của game trong tương lai', cells: ['-', '-', '-', '✓'] },
      { kind: 'row', label: 'Mini challenge/sự kiện trong game mang tên thương hiệu', cells: ['-', '-', '-', '✓'] },
      { kind: 'section', label: 'Quyền lợi tại workshop' },
      { kind: 'row', label: 'Đặt standee tại workshop', cells: ['-', '-', '1 standee', '2 standee'] },
      { kind: 'row', label: 'Sản phẩm/quà tặng được đưa vào phần quà workshop', cells: ['✓', '✓', '✓', '✓'] },
      { kind: 'row', label: 'Nhắc tên trong phần cảm ơn tại workshop', cells: ['✓', '✓', '✓', '✓'] },
      { kind: 'row', label: 'Nhận bộ tư liệu workshop để đăng lại', cells: ['✓', '✓', '✓', '✓'] },
      { kind: 'row', label: 'Logo trên standee/ấn phẩm offline chung', cells: ['-', '-', '✓', '✓'] },
      { kind: 'row', label: 'Đặt tài liệu/quà tặng tại bàn check-in', cells: ['-', '-', '✓', '✓'] },
      { kind: 'row', label: 'Đại diện thương hiệu phát biểu ngắn', cells: ['-', '-', '-', '✓'] },
      { kind: 'row', label: 'Gian hàng/khu vực trải nghiệm thương hiệu', cells: ['-', '-', '-', '✓'] },
    ],
  },
  benefitsNote: 'Các gói tài trợ bằng hiện vật hoặc bảo trợ truyền thông sẽ được thiết lập theo thỏa thuận hợp tác riêng giữa hai bên nhằm tối ưu hóa quyền lợi.',
  contact: {
    title: 'Cùng gieo hạt mầm đầu tiên với CHẠM Flora',
    body: 'Nếu doanh nghiệp của bạn đang tìm kiếm một dự án Gen Z, xanh, công nghệ và có câu chuyện cộng đồng rõ ràng, CHẠM Flora rất mong được đồng hành.',
    cta: 'Liên hệ ngay',
    email: 'treesforfuture.eco@gmail.com',
    facebookUrl: 'https://www.facebook.com/profile.php?id=61581382018162',
    facebookLabel: 'E.C.O - Green Tech Gamification',
    tiktokUrl: 'https://www.tiktok.com/@chamflora.eco',
    tiktokLabel: 'E.C.O Startup',
    youtubeUrl: 'https://www.youtube.com/@e.c.o-greentechgamification',
    youtubeLabel: 'E.C.O - Green Tech Gamification',
    representative: 'Nguyễn Thị Thảo Linh · Leader Project',
    copyright: `© ${new Date().getFullYear()} CHẠM Flora · Flow & Flora`,
  },
}
