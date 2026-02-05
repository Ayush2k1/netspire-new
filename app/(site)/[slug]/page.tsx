import { defineQuery } from 'next-sanity'
import { sanityFetch } from '@/sanity/live'
import Blog from '@/components/BlogComps/Blog';

const query = defineQuery(
  `*[_type == "post" && slug.current == $slug][0]{title}`,
)

export default async function Page({
  params
}: {
  params: Promise<{slug: string}>;
}) {

const { data } = await sanityFetch({
      query,
      params,
});


return  <Blog data={data} />
}