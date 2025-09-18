import type { Metadata } from 'next';
import { Container, Prose, Section } from '@/components/ds';
import { ThemeToggle } from '@/components/theme-toggle';

export const metadata: Metadata = {
  title: 'Work — Adriana Eka Prayudha',
  description: 'Case studies and detailed write-ups of selected work.',
};

export default function WorkLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Section className="py-16 sm:py-24">
      <Container className="max-w-3xl font-mono">
        <Prose isSpaced>
          <ThemeToggle />
          {children}
        </Prose>
      </Container>
    </Section>
  );
}
