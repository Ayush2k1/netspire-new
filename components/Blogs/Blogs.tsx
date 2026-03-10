import BlogBox from "./BlogBox";

export default function Blogs({ blogs }: { blogs: any[] }) {
  return (
    <section className="section-padding min-h-screen ">
      <div className="grid grid-cols-1 950:grid-cols-2 gap-6 mx-auto max-w-container">
        {blogs?.length > 0 ? (
          blogs.map((blog, index) => <BlogBox blog={blog} key={index} />)
        ) : (
          <div className="text-md">No items found!</div>
        )}
      </div>
    </section>
  );
}
