import gql from 'graphql-tag';
import { provideApolloClient } from '@vue/apollo-composable';
import apolloClient from '@/plugins/apolloClient';
//共通型
import type { HasPostsTag } from '../plugins/interfaces';

export const getTags = async () => {
    try {
      // 参照を持つタグを全取得
      const query = gql`
        query GetTags {
          tags(where: { posts_some: {} }) {
            slug
            name
            image {
              url(
                transformation: {
                  image: { resize: { width: 100, height: 100, fit: crop } }
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
      const { data: { tags: unsortedTags } }: { data: { tags: HasPostsTag[]}} = await apolloClient.query({ query: query });
  
      // sliceしないとエラーになる。
      const sortedTags = unsortedTags.slice().sort( (a,b) => {
        // 優先度1:記事数降順
        const countOrder: number = b.posts.length - a.posts.length
        if(countOrder !== 0 ) {
          return countOrder;
        }
        // 優先度2:名前昇順
        return a.name.localeCompare(b.name);
      });
      return sortedTags;
    } catch (e) {
      console.log('エラー発生');
      console.log(e);
    }
  };
  