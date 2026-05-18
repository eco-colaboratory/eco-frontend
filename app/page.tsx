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
  PageJsonLd,
  SponsorshipSection,
  ValuePropSection,
  VisionMissionSection,
} from '@/app/(landing)/_components/cham-bloom'

export const metadata = buildPageMetadata({
  title: 'CHẠM Bloom — Biến vườn hoa ảo thành vườn hoa thật',
  description:
    'Trang tài trợ chính thức CHẠM Bloom — game hóa hành động xanh cho Gen Z. Giai đoạn launching tháng 6–9/2026.',
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
        <VisionMissionSection />
        <CoreIdeaSection />
        <AchievementsSection />
        <SponsorshipSection />
        <ValuePropSection />
        <BenefitsSection />
        <ContactSection />
      </main>
    </ChamBloomMotionProvider>
  )
}
