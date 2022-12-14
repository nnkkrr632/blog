import gql from 'graphql-tag';
import { provideApolloClient } from '@vue/apollo-composable';
import apolloClient from '@/plugins/apolloClient';
import type { HasPostsTag } from '../plugins/interfaces';

export const getTags = async () => {
  try {
    // 参照を持つタグを全取得
    // @see https://hygraph.com/docs/api-reference/content-api/filtering#reference
    const query = gql`
        query GetTags {
          tags(where: { posts_some: {} }) {
            slug
            name
            image {
              url(
                transformation: {
                  image: { resize: { width: 64, height: 64, fit: crop } }
                }
              )
            }
            posts {
              slug,
              title
            }
          }
        }
      `;
    // .vueファイル外でapolloClientを使うときはprovideApolloClientが必要
    provideApolloClient(apolloClient)
    const { data: { tags: unsortedTags } }: { data: { tags: HasPostsTag[] } } = await apolloClient.query({ query: query });

    // sliceしないとエラー
    const sortedTags = unsortedTags.slice().sort((a, b) => {
      // 優先度1:記事数降順
      const countOrder: number = b.posts.length - a.posts.length
      if (countOrder !== 0) {
        return countOrder;
      }
      // 優先度2:名前昇順
      return a.name.localeCompare(b.name);
    });
    return sortedTags;
  } catch (e) {
    // console.log('タグ一覧取得でエラー発生');
    // console.log(e);
  }
};

export const isToday = (date: string): Boolean => {
  const hyphenDate = date.replaceAll('-', '/')
  const today = new Date()
  const formatted = today
  .toLocaleDateString("ja-JP", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  })
  return formatted === hyphenDate;
}
