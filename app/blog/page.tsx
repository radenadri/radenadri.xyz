import { BlogPosts } from 'app/components/posts'

export const metadata = {
  title: 'Journal',
  description: 'Read all my writings about things i\'m curious about.',
}

export default function Page() {
  return (
    <section>
      <h1 className="font-semibold text-2xl mb-8 tracking-tighter">my journals</h1>
      <BlogPosts />
    </section>
  )
}
