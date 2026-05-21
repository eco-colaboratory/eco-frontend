import { buildPageMetadata } from '@/lib/seo/metadata'
import {
  AboutSection,
  AchievementsSection,
  BenefitsSection,
  ChamBloomMotionProvider,
  ContactSection,
  CoreIdeaSection,
  HeroSection,
  Navbar,
  SponsorshipSection,
  ValuePropSection,
  RoadmapSection,
} from '@/app/(landing)/_components/cham-bloom'
import { PageJsonLd } from '@/app/(landing)/_components/layout/page-json-ld'

export const metadata = buildPageMetadata({
  title: 'CHẠM Flora | Landing page tài trợ chiến dịch xanh cho Gen Z',
  description:
    'CHẠM Flora là dự án game hóa hành động xanh dành cho Gen Z, kết nối thương hiệu và cộng đồng qua vườn hoa ảo, điểm xanh và hiện thực hóa sân vườn thật. Trang tài trợ chính thức cho giai đoạn ra mắt 2026.',
  path: '/',
})

export default function HomePage() {
  return (
    <ChamBloomMotionProvider>
      <main className="cham-bloom-page overflow-x-hidden">
        <PageJsonLd />
        <Navbar />
        <HeroSection />
        <AboutSection />
        {/* <CoreIdeaSection /> */}
        <AchievementsSection />
        <RoadmapSection />
        <SponsorshipSection />
        <ValuePropSection />
        <BenefitsSection />
        <ContactSection />
      </main>
    </ChamBloomMotionProvider>
  )
}
