---
layout: ../../layouts/BlogPost.astro
title: Resolving Next.js Image optimization error on Netlify
date: 2022-08-08
description: See how i handle the Next.js Image optimization error in Netlify
---
Next.js uses the next/image image component, which complements the `<img>` HTML component.
This makes Next.js more suitable for modern website ecosystems.

The reason is, these components can resize images according to the configuration set by the browser.
The image size becomes more responsive to the device used to open the website.

But it's a bit problematic when you deploy Next.js to Netlify, an error will appear which is
triggered by the image optimization performed during the build process.

This happen because the next/image component cannot optimize the image at build time
but when the image is on demand. Take a look at the error below :

```plaintext
Error: Image Optimization using Next.js' default loader is not compatible with 'next export'
```

What i do for now to get rid of the error is to opt-out the image optimization process by adding
the custom loader for `next/image`.

In your `next.config` file, set the loader to `"custom"`

```js
module.exports = {
  images: {
    loader: 'custom',
  },
}
```

And then do this in the `Image.jsx` component

```jsx
import NextImage from 'next/image'

// opt-out of image optimization, no-op
const customLoader = ({ src }) => {
  return src
}

// You can use this image component anywhere you need in whole project
export default function Image(props) {
  return <NextImage {...props} loader={customLoader} />
}
```

And voila! You can deploy it on Netlify!
