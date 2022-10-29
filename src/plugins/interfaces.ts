export interface Post {
  id: string;
  slug: string;
  postedAt: string;
  revisedAt: string;
  title: string;
  description: string;
  isShorts: boolean;
  image: Image;
  markdown: string;
  tags: Tag[];
  left?: string;
  right?: string;
}

export interface Image {
  id: string;
  url: string;
}

export interface Tag {
  slug: string;
  name: string;
  image: Image;
}

export interface HasPostsTag extends Tag {
  posts: { slug: string, title: string }[]
}