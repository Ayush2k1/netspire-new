
const Blog = ({ data }:{data: any}) => {
  return (
    <section className="section-padding">
          <div className="max-w-container mx-auto">
            <h1 className="text-3xl">{data?.title}</h1>
          </div>
    </section>
  )
}

export default Blog