import { Container, Main, Section, Prose } from '@/components/ds';
import { AnimatedElement, AnimatedText } from '@/components/animated-element';
import { BackToTop } from '@/components/back-to-top';
import experiments from '@/data/experiments';
import { ThemeToggle } from '@/components/theme-toggle';
import Image from 'next/image';
import works from '@/data/works';
import experiences from '@/data/experiences';

export default function Home() {
  return (
    <Main className="min-h-screen font-mono">
      <ThemeToggle />
      <Section className="py-16 sm:py-24">
        <Container className="max-w-6xl">
          <Prose isSpaced>
            {/* Hero */}
            <div className="mb-14 md:flex md:justify-between md:flex-row-reverse">
              <div>
                <Image
                  src="/avatar.png"
                  unoptimized
                  height={250}
                  width={250}
                  alt="Avatar"
                  className="!border-0 h-[100px] w-[100px] md:h-[250px] md:w-[250px]"
                />
              </div>
              <div>
                <AnimatedElement animation="fadeIn" duration={1.1}>
                  <h1 className="text-4xl sm:text-5xl font-semibold leading-tight tracking-tight">
                    <AnimatedText as="span" className="block">
                      Adriana
                    </AnimatedText>
                    <br />
                    <AnimatedText as="span" className="block">
                      Eka Prayudha
                    </AnimatedText>
                  </h1>
                </AnimatedElement>
                <AnimatedElement animation="fadeIn" delay={0.2}>
                  <AnimatedText
                    as="p"
                    className="block mt-4 max-w-xl text-base text-muted-foreground"
                  >
                    Enthusiastic developer with a passion for creating engaging
                    digital, love to creating a usable web applications to solve
                    the business problems.
                  </AnimatedText>
                </AnimatedElement>

                {/* Social icons */}
                <AnimatedElement animation="stagger" delay={0.35}>
                  <div className="mt-6 flex items-center gap-4">
                    <a href="mailto:radenadriep@gmail.com" aria-label="Email">
                      EMAIL
                    </a>
                    <a
                      href="https://github.com/radenadri"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="GitHub"
                    >
                      GITHUB
                    </a>
                    <a
                      href="https://linkedin.com/in/radenadri"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="LinkedIn"
                    >
                      LINKEDIN
                    </a>
                    <a
                      href="https://cv.radenadri.xyz"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Resume"
                    >
                      RESUME
                    </a>
                  </div>
                </AnimatedElement>
              </div>
            </div>

            {/* Selected Works */}
            <AnimatedText
              as="h2"
              className="block mt-2 mb-6 text-xl font-semibold"
            >
              Selected Works
            </AnimatedText>
            <AnimatedElement animation="stagger" delay={0.5}>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
                {works.map((work) => (
                  <a
                    key={work.slug}
                    href={`/work/${work.slug}`}
                    className="group block rounded-md overflow-hidden"
                  >
                    <div className="flex flex-col gap-2">
                      <div className="aspect-[3/4] relative">
                        <Image
                          src={work.coverImage}
                          alt={work.title}
                          unoptimized
                          fill
                          className="object-cover !m-0"
                        />
                      </div>
                      <div className="flex flex-col gap-0">
                        <AnimatedText
                          as="h6"
                          className="block text-lg font-semibold"
                        >
                          {work.title} ↗
                        </AnimatedText>
                      </div>
                    </div>
                  </a>
                ))}
              </div>
            </AnimatedElement>

            {/* Working Experience */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div>
                <AnimatedText as="h2" className="block text-xl font-semibold">
                  Working Experience
                </AnimatedText>
              </div>
              <div className="space-y-8">
                {experiences.map((experience) => (
                  <div
                    className="flex flex-col items-start gap-2"
                    key={experience.company}
                  >
                    <a
                      href={experience.links}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block text-sm font-medium underline"
                    >
                      {experience.company}
                    </a>
                    <AnimatedText
                      as="p"
                      className="block text-sm text-muted-foreground"
                    >
                      {experience.position}
                    </AnimatedText>
                    <AnimatedText
                      as="small"
                      className="block text-xs text-muted-foreground"
                    >
                      {experience.duration}
                    </AnimatedText>
                    <AnimatedElement animation="stagger" delay={0.2}>
                      {experience.jobDescription.map((jobDescription) => (
                        <AnimatedText
                          key={jobDescription}
                          as="li"
                          className="block text-sm text-muted-foreground !pl-0"
                        >
                          - {jobDescription}
                        </AnimatedText>
                      ))}
                    </AnimatedElement>
                  </div>
                ))}
              </div>
            </div>

            {/* Experiments */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mt-16">
              <div>
                <AnimatedText as="h2" className="block text-xl font-semibold">
                  Experiments
                </AnimatedText>
              </div>
              <div className="space-y-8">
                {experiments.map((experiment) => (
                  <div
                    className="flex items-start gap-2"
                    key={experiment.title}
                  >
                    <div>
                      <AnimatedText as="span" className="mt-1">
                        {experiment.icon}
                      </AnimatedText>
                    </div>
                    <div>
                      <AnimatedText
                        as="p"
                        className="block text-sm font-medium"
                      >
                        {experiment.title}
                      </AnimatedText>
                      <AnimatedText
                        as="p"
                        className="block text-sm text-muted-foreground"
                      >
                        {experiment.description}
                      </AnimatedText>
                      <AnimatedElement
                        animation="fadeIn"
                        delay={0.2}
                        className="block text-sm text-muted-foreground"
                      >
                        <a
                          className="underline"
                          href={experiment.link}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          Check it out ↗
                        </a>
                      </AnimatedElement>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Footer */}
            <AnimatedElement
              animation="fadeIn"
              delay={0.2}
              start="top bottom"
              end="bottom top"
            >
              <div className="mt-32 pt-8 border-t text-center flex flex-col gap-2 sm:flex-row sm:justify-between">
                <small>© 2025 / Adriana Eka Prayudha</small>
                <AnimatedElement
                  animation="fadeIn"
                  delay={0.2}
                  start="top bottom"
                  end="bottom top"
                >
                  <BackToTop />
                </AnimatedElement>
              </div>
            </AnimatedElement>
          </Prose>
        </Container>
      </Section>
    </Main>
  );
}
