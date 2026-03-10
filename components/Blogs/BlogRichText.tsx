import BlogBox from "./BlogBox";

const BlogRichText = ({ data }: { data: { blogs: any } }) => {
  return (
    data?.blogs?.length > 0 && (
      <div className="grid 950:grid-cols-2 1250:grid-cols-1 1450:grid-cols-2 gap-3 my-10 800:my-14">
        {data.blogs.map((blog: any, key: number) => (
          <BlogBox key={key} blog={blog} />
        ))}
      </div>
    )
  );
};

export default BlogRichText;
