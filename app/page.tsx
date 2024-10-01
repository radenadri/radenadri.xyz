import { BlogPosts } from "app/components/posts";

export default function Page() {
  return (
    <section>
      <h1 className="mb-8 text-2xl font-semibold tracking-tighter">
        hello, welcome to Adrian space 🧑🏻‍🚀
      </h1>
      <p className="mb-4">
        {`My name is Adriana Eka Prayudha, 
        enthusiastic developer with a passion for creating engaging digital experiences.
        Currently working as a full stack developer specializing in web development and also doing mobile development with flutter.`}
      </p>
      <div className="my-8">
        <BlogPosts />
      </div>
    </section>
  );
}
