export type PageParams = Promise<{ locale: string }>;
export type SlugPageParams = Promise<{ locale: string; slug: string }>;

export type PageProps = { params: PageParams };
export type SlugPageProps = { params: SlugPageParams };
