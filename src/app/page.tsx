import { Container, Main, Section, Prose } from '@/components/ds';
import { AnimatedElement, AnimatedText } from '@/components/animated-element';
import { BackToTop } from '@/components/back-to-top';

export default function Home() {
  return (
    <Main className="min-h-screen font-mono">
      <Section className="py-16 sm:py-24">
        <Container className="max-w-2xl">
          <Prose isSpaced>
            {/* Header */}
            <AnimatedElement animation="fadeIn" duration={1.2}>
              <div className="mb-16">
                <AnimatedText className="text-2xl font-medium mb-2">
                  Adriana Eka Prayudha
                </AnimatedText>
                <AnimatedElement animation="fadeIn" delay={0.3}>
                  <p className="text-base text-muted-foreground">
                    Frontend Developer based in Bandung, Indonesia
                  </p>
                </AnimatedElement>
              </div>
            </AnimatedElement>

            {/* About */}
            <AnimatedElement animation="slideUp" delay={0.2}>
              <div className="mb-20">
                <AnimatedText className="text-base leading-relaxed mb-6">
                  Currently, I'm a Frontend Developer at Pentacode, building the
                  future of online business frameworks for over 2 product
                  designers at Pentacode. "Effective design is not a matter of
                  taste but of understanding."
                </AnimatedText>
                <AnimatedText className="text-base leading-relaxed" delay={0.2}>
                  I've received my Bachelor of Design from the University of
                  Washington with a focus on Interaction Design.
                </AnimatedText>

                <AnimatedElement animation="stagger" delay={0.4}>
                  <div className="flex gap-6 mt-8 text-sm">
                    <a
                      href="mailto:radenadriep@gmail.com"
                      className="text-muted-foreground hover:text-foreground transition-colors"
                    >
                      EMAIL
                    </a>
                    <a
                      href="https://linkedin.com/in/radenadri"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-muted-foreground hover:text-foreground transition-colors"
                    >
                      LINKEDIN
                    </a>
                  </div>
                </AnimatedElement>
              </div>
            </AnimatedElement>

            {/* Projects */}
            <div className="space-y-20">
              {/* Project 1 - Biofarma RME */}
              <AnimatedElement animation="slideUp" delay={0.1}>
                <div>
                  <div className="mb-8">
                    <div className="bg-muted/30 rounded-2xl p-8 flex items-center justify-center aspect-[4/5] max-w-sm mx-auto hover:scale-105 transition-transform duration-500 ease-out">
                      <div className="bg-black rounded-[2.5rem] p-2 w-64 h-[520px] flex items-center justify-center">
                        <div className="bg-white rounded-[2rem] w-full h-full flex items-center justify-center relative overflow-hidden">
                          <div className="absolute top-6 left-1/2 transform -translate-x-1/2 w-20 h-6 bg-black rounded-full"></div>
                          <div className="text-center p-8">
                            <div className="text-2xl font-bold mb-4 text-gray-900">
                              BIOFARMA
                            </div>
                            <div className="text-sm text-gray-600">
                              Electronic Medical Records
                            </div>
                            <div className="mt-8 space-y-3">
                              <div className="h-3 bg-gray-200 rounded"></div>
                              <div className="h-3 bg-gray-200 rounded w-3/4"></div>
                              <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div>
                    <AnimatedText className="text-lg font-medium mb-2">
                      2022 — 2024
                    </AnimatedText>
                    <AnimatedText
                      className="text-base font-medium mb-3"
                      delay={0.1}
                    >
                      Staff Product Designer at Biofarma
                    </AnimatedText>
                    <AnimatedText
                      className="text-sm text-muted-foreground leading-relaxed"
                      delay={0.2}
                    >
                      Worked on a handful of projects including a full redesign
                      of the web platform for clinicians, and working closely
                      with the product organization.
                    </AnimatedText>
                  </div>
                </div>
              </AnimatedElement>

              {/* Project 2 - POS Properti */}
              <AnimatedElement animation="slideUp" delay={0.2}>
                <div>
                  <div className="mb-8">
                    <div className="bg-muted/30 rounded-2xl p-8 flex items-center justify-center aspect-[4/5] max-w-sm mx-auto hover:scale-105 transition-transform duration-500 ease-out">
                      <div className="bg-black rounded-[2.5rem] p-2 w-64 h-[520px] flex items-center justify-center">
                        <div className="bg-white rounded-[2rem] w-full h-full flex items-center justify-center relative overflow-hidden">
                          <div className="absolute top-6 left-1/2 transform -translate-x-1/2 w-20 h-6 bg-black rounded-full"></div>
                          <div className="text-center p-8">
                            <div className="text-xl font-bold mb-4 text-gray-900">
                              POS PROPERTI
                            </div>
                            <div className="text-sm text-gray-600 mb-8">
                              Property Management System
                            </div>
                            <div className="space-y-4">
                              <div className="bg-blue-100 p-4 rounded-lg">
                                <div className="text-xs text-blue-800">
                                  Dashboard
                                </div>
                              </div>
                              <div className="bg-green-100 p-4 rounded-lg">
                                <div className="text-xs text-green-800">
                                  Analytics
                                </div>
                              </div>
                              <div className="bg-orange-100 p-4 rounded-lg">
                                <div className="text-xs text-orange-800">
                                  Reports
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div>
                    <AnimatedText className="text-lg font-medium mb-2">
                      2021 — 2022
                    </AnimatedText>
                    <AnimatedText
                      className="text-base font-medium mb-3"
                      delay={0.1}
                    >
                      Lead Product Designer at Properti
                    </AnimatedText>
                    <AnimatedText
                      className="text-sm text-muted-foreground leading-relaxed"
                      delay={0.2}
                    >
                      Designed experiences and created systems for a
                      point-of-sale website builder. Launched on Product Hunt in
                      March 2023.
                    </AnimatedText>
                  </div>
                </div>
              </AnimatedElement>

              {/* Project 3 - StarBP */}
              <AnimatedElement animation="slideUp" delay={0.3}>
                <div>
                  <div className="mb-8">
                    <div className="bg-muted/30 rounded-2xl p-8 flex items-center justify-center aspect-[4/5] max-w-sm mx-auto hover:scale-105 transition-transform duration-500 ease-out">
                      <div className="bg-black rounded-[2.5rem] p-2 w-64 h-[520px] flex items-center justify-center">
                        <div className="bg-white rounded-[2rem] w-full h-full flex items-center justify-center relative overflow-hidden">
                          <div className="absolute top-6 left-1/2 transform -translate-x-1/2 w-20 h-6 bg-black rounded-full"></div>
                          <div className="p-8">
                            <div className="text-xl font-bold mb-2 text-gray-900">
                              STARBP
                            </div>
                            <div className="text-sm text-gray-600 mb-8">
                              Business Process Management
                            </div>
                            <div className="space-y-3">
                              <div className="flex items-center gap-3">
                                <div className="w-8 h-8 bg-gray-200 rounded-full"></div>
                                <div className="flex-1">
                                  <div className="h-2 bg-gray-200 rounded mb-1"></div>
                                  <div className="h-2 bg-gray-200 rounded w-2/3"></div>
                                </div>
                              </div>
                              <div className="flex items-center gap-3">
                                <div className="w-8 h-8 bg-blue-200 rounded-full"></div>
                                <div className="flex-1">
                                  <div className="h-2 bg-gray-200 rounded mb-1"></div>
                                  <div className="h-2 bg-gray-200 rounded w-3/4"></div>
                                </div>
                              </div>
                              <div className="flex items-center gap-3">
                                <div className="w-8 h-8 bg-green-200 rounded-full"></div>
                                <div className="flex-1">
                                  <div className="h-2 bg-gray-200 rounded mb-1"></div>
                                  <div className="h-2 bg-gray-200 rounded w-1/2"></div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div>
                    <AnimatedText className="text-lg font-medium mb-2">
                      2020 — 2021
                    </AnimatedText>
                    <AnimatedText
                      className="text-base font-medium mb-3"
                      delay={0.1}
                    >
                      Product Designer at StarBP
                    </AnimatedText>
                    <AnimatedText
                      className="text-sm text-muted-foreground leading-relaxed"
                      delay={0.2}
                    >
                      First product designer hire. Designed the foundations,
                      interactions, and systems for the entire business process
                      management platform.
                    </AnimatedText>
                  </div>
                </div>
              </AnimatedElement>
            </div>

            {/* Footer */}
            <AnimatedElement animation="fadeIn" delay={0.5}>
              <div className="mt-32 pt-8 border-t text-center">
                <BackToTop />
              </div>
            </AnimatedElement>
          </Prose>
        </Container>
      </Section>
    </Main>
  );
}
