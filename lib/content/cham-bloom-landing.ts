/**
 * Single source of truth for CHẠM Bloom landing copy.
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
    cards: { icon: 'gamepad' | 'flower' | 'sprout'; title: string; description: string }[]
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
  tiers: { name: string; slug: string; teaser: string; highlight: TierHighlight }[]
  fundUsage: { title: string; bullets: string[] }
  valueProp: { title: string; intro: string; bullets: string[] }
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
    representative: string
    copyright: string
  }
}

export const CHAM_BLOOM_CONTENT: ChamBloomContent = {
  hero: {
    videoUrl: HERO_VIDEO_URL,
    posterSrc: unsplash('photo-1490750967868-88aa4486c946', 1920),
    badge: 'CHẠM Bloom · Flow & Flora',
    headline: ['Cùng CHẠM Bloom biến vườn hoa ảo', 'thành vườn hoa thật'],
    tagline: 'Mỗi chạm là 1 hạt mầm cho tương lai.',
    primaryCta: 'Trở thành nhà tài trợ',
    secondaryCta: 'Xem tầm nhìn ↓',
    partnersPill: 'Hành trình từ E.C.O/C.H.A.M đến CHẠM Bloom',
    partners: ['Panasonic Gen G', 'FIP Startup', 'Gen Z', 'E.C.O'],
  },
  about: {
    label: 'Về chúng tôi',
    title: 'CHẠM Bloom là gì?',
    intro:
      'CHẠM Bloom là game hóa hành động xanh dành cho Gen Z — trồng hoa, chăm cây, hoàn thành nhiệm vụ và nuôi dưỡng một khu vườn ảo, hướng tới vườn hoa thật ngoài đời.',
    cards: [
      {
        icon: 'gamepad',
        title: 'Game giáo dục',
        description:
          'Trồng hoa, nhiệm vụ hằng ngày, Focus Mode học tập — mỗi thao tác giúp khu vườn lớn lên.',
      },
      {
        icon: 'flower',
        title: 'Trải nghiệm ảo',
        description:
          'Trang trí khu vườn, chăm hoa trong game — biểu tượng cho hạt mầm xanh ngoài đời thật.',
      },
      {
        icon: 'sprout',
        title: 'Tác động thật',
        description:
          'Cùng nhà tài trợ và cộng đồng, biến vườn ảo thành không gian xanh có thể ghé thăm.',
      },
    ],
  },
  vision: {
    title: 'Tầm nhìn',
    body: 'CHẠM Bloom hướng tới nền tảng game hóa hành động xanh cho Gen Z, nơi tương tác số kết nối giá trị tích cực ngoài đời — mô hình vườn hoa ảo và vườn hoa thật cùng doanh nghiệp, trường học và tổ chức.',
    imageSrc: unsplash('photo-1465146633011-14f8e0781093'),
    imageAlt: 'Vườn hoa xanh tươi — tầm nhìn CHẠM Bloom',
  },
  mission: {
    title: 'Sứ mệnh',
    body: 'Giúp Gen Z tiếp cận lối sống xanh nhẹ nhàng, gần gũi — biến chăm hoa, học tập và cộng đồng thành hành trình gieo mầm xanh thật cho tương lai.',
    imageSrc: unsplash('photo-1416879595882-3373a0480b5b'),
    imageAlt: 'Chậu cây xanh — sứ mệnh CHẠM Bloom',
  },
  coreIdea: {
    headline: 'Vườn hoa ảo hôm nay,',
    headlineGold: 'vườn hoa thật ngày mai',
    steps: ['Chơi game', 'Chạm hoa', 'Trồng thật'],
  },
  achievements: {
    label: 'Thành tích',
    title: 'Được công nhận',
    items: [
      {
        title: 'Top 5 Đại sứ Gen G 2025',
        subtitle: 'Panasonic Việt Nam · E.C.O/C.H.A.M',
        badge: 'Gen G 2025',
      },
      {
        title: 'Á quân FIP – Youth Startup',
        subtitle: 'Game hóa hành động xanh & tác động cộng đồng',
        badge: 'FIP 2025',
      },
    ],
  },
  tiers: [
    { name: 'Đơn vị đồng hành', slug: 'dong-hanh', teaser: 'Đồng hành chiến lược', highlight: 'gold' },
    { name: 'Bảo trợ truyền thông', slug: 'bao-tro-tt', teaser: 'Lan tỏa thương hiệu', highlight: 'gold' },
    { name: 'Hạt Mầm', slug: 'hat-mam', teaser: 'Gieo mầm đầu tiên', highlight: 'base' },
    { name: 'Mầm Xanh', slug: 'mam-xanh', teaser: 'Nuôi dưỡng sản phẩm', highlight: 'base' },
    { name: 'Vườn Xanh', slug: 'vuon-xanh', teaser: 'Mở rộng cộng đồng', highlight: 'base' },
    { name: 'Nở Xanh', slug: 'no-xanh', teaser: 'Vườn hoa thật ngoài đời', highlight: 'gold' },
  ],
  fundUsage: {
    title: 'Phân bổ quỹ',
    bullets: [
      'Phát triển và hoàn thiện sản phẩm game',
      'Thiết kế visual, nhân vật, hoa và khu vườn trong game',
      'Nội dung truyền thông: bài viết, ảnh, video ngắn, TVC launch',
      'Landing page, proposal và ấn phẩm tài trợ',
      'Beta test, feedback và cộng đồng người dùng đầu tiên',
      'Chuẩn bị kết nối vườn hoa ảo với vườn hoa thật',
    ],
  },
  valueProp: {
    title: 'Tại sao đồng hành cùng CHẠM Bloom?',
    intro:
      'Không chỉ tài trợ một dự án — cùng gieo khu vườn có thật, tiếp cận Gen Z 16–24 tuổi và gắn thương hiệu với sống xanh, giáo dục và công nghệ.',
    bullets: [
      'Tiếp cận học sinh – sinh viên Gen Z tại TP.HCM và vùng lân cận',
      'Gắn hình ảnh với sống xanh, giáo dục, wellness và bền vững',
      'Đồng hành giai đoạn launching sản phẩm game hóa cộng đồng',
      'Ghi nhận trên landing, proposal, video/TVC và recap campaign',
    ],
  },
  benefits: {
    label: 'Quyền lợi',
    title: 'Quyền lợi đồng hành',
    tierNames: [
      'Đồng hành',
      'Bảo trợ TT',
      'Hạt Mầm',
      'Mầm Xanh',
      'Vườn Xanh',
      'Nở Xanh',
    ],
    rows: [
      { label: 'Logo trên landing', cells: ['✓', '✓', '✓', '✓', '✓', '✓'] },
      { label: 'Bài cảm ơn / CSR', cells: ['✓', '✓', '✓', '—', '—', '—'] },
      { label: 'Video / TVC', cells: ['✓', '✓', '—', '—', '—', '✓'] },
      { label: 'Sự kiện launching', cells: ['✓', '✓', '✓', '✓', '—', '✓'] },
      { label: 'Vườn hoa thật', cells: ['✓', '—', '—', '—', '✓', '✓'] },
      { label: 'Báo cáo recap', cells: ['✓', '✓', '✓', '✓', '✓', '✓'] },
    ],
  },
  benefitsNote:
    'Bảng quyền lợi chi tiết đang được cập nhật. Liên hệ để nhận hồ sơ tài trợ đầy đủ.',
  contact: {
    title: 'Sẵn sàng trồng vườn cùng chúng tôi?',
    body: 'Giai đoạn launching tháng 6 – tháng 9/2026. Trao đổi hình thức tài trợ và cách thương hiệu cùng gieo vườn hoa thật.',
    cta: 'Liên hệ ngay',
    email: 'thaolinhworkspace@gmail.com',
    facebookUrl: 'https://www.facebook.com/',
    facebookLabel: 'E.C.O - Green Tech Gamification',
    representative: 'Nguyễn Thị Thảo Linh · Leader Project',
    copyright: `© ${new Date().getFullYear()} CHẠM Bloom · Flow & Flora`,
  },
}
