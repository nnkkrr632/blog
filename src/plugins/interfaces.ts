export interface Post {
  slug: string;
  postedAt: string;
  revisedAt?: string;
  title: string;
  description: string;
  isShorts: boolean;
  image: Image;
  markdown: string;
  tags: Tag[];
}

export interface Image {
  url: string;
}

export interface Tag {
  slug: string;
  name: string;
  image: Image;
}

export interface HasPostsTag extends Tag {
  posts: { slug: string }[]
}

export interface HeadParams {
  title: string;
  description: string;
  imageUrl?: string;
}