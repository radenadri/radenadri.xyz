import type { MDXComponents } from 'mdx/types';
import { AnimatedElement, AnimatedText } from '@/components/animated-element';
import Image from 'next/image';

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    // Headings (word-split animation)
    h1: (props: React.ComponentProps<'h1'>) => (
      <AnimatedText as="h1" start="top bottom" end="bottom top" {...props}>
        {props.children}
      </AnimatedText>
    ),
    h2: (props: React.ComponentProps<'h2'>) => (
      <AnimatedText as="h2" {...props}>
        {props.children}
      </AnimatedText>
    ),
    h3: (props: React.ComponentProps<'h3'>) => (
      <AnimatedText as="h3" {...props}>
        {props.children}
      </AnimatedText>
    ),
    h4: (props: React.ComponentProps<'h4'>) => (
      <AnimatedText as="h4" {...props}>
        {props.children}
      </AnimatedText>
    ),

    // Paragraphs: fade in to avoid stripping inline markup (links, code)
    p: ({ children, ...props }: React.ComponentProps<'p'>) => (
      <AnimatedText as="span" {...props}>
        {children}
      </AnimatedText>
    ),

    blockquote: ({
      children,
      ...props
    }: React.ComponentProps<'blockquote'>) => (
      <AnimatedElement animation="slideUp">
        <blockquote {...props}>{children}</blockquote>
      </AnimatedElement>
    ),

    // Lists: stagger children for a nice cascade
    ul: ({ children, ...props }: React.ComponentProps<'ul'>) => (
      <AnimatedElement animation="stagger">
        <ul {...props}>{children}</ul>
      </AnimatedElement>
    ),

    ol: ({ children, ...props }: React.ComponentProps<'ol'>) => (
      <AnimatedElement animation="stagger">
        <ol {...props}>{children}</ol>
      </AnimatedElement>
    ),

    img: (props: React.ImgHTMLAttributes<HTMLImageElement>) => {
      const { src, alt = '', className } = props;
      if (!src) return null;
      const width =
        Number((props as unknown as { width?: number | string }).width) || 1200;
      const height =
        Number((props as unknown as { height?: number | string }).height) ||
        630;

      const imageSrc = src as React.ComponentProps<typeof Image>['src'];
      return (
        <AnimatedElement animation="fadeIn" delay={0.1}>
          <Image
            src={imageSrc}
            alt={alt}
            width={width}
            height={height}
            sizes="100vw"
            className={className}
            priority={false}
          />
        </AnimatedElement>
      );
    },

    // Pass through others unchanged by default
    ...components,
  };
}
