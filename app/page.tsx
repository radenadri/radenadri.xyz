import { BlogPosts } from 'app/components/posts'

export default function Page() {
  return (
    <section>
      <h1 className="mb-8 text-2xl font-semibold tracking-tighter">
        hello, welcome to Adrian space 🧑🏻‍🚀
      </h1>
      <p className="mb-4">
        {`My name is Adriana Eka Prayudha, 
        enthusiastic developer with a passion for creating engaging digital experiences.
        Currently working as a flutter developer, i came from web development especially laravel 
        so i'm also having an interest with web development.`}
      </p>
      <div className="my-8">
        <BlogPosts />
      </div>
    </section>
  )
}
