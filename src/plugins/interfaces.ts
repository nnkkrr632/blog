export interface Post {
  id: string;
  slug: string;
  postedAt: string;
  revisedAt: string;
  title: string;
  description: string;
  isShorts: boolean;
  image: Image;
  tags: Tag[];
  body: string;
}

export interface Image {
  id: string;
  url: string;
  // height: number;
  // width: number;
}

export interface Tag {
  slug: string;
  name: string;
  image: Image;
}

export interface CountedTag extends Tag {
  count: number;
}

export interface apiResponse<T> {
  contents: T[];
  totalCount: number;
  offset: number;
  limit: number;
}
