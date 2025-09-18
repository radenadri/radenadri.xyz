declare module '*.mdx' {
  // The default export is a React component
  const MDXComponent: (props: any) => JSX.Element;
  export default MDXComponent;
}
