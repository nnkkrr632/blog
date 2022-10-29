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
                  image: { resize: { width: 200, height: 200, fit: crop } }
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
      const response = await apolloClient.query({ query: query });
      console.log('★★タグ一覧用取得');
      console.log(response);
      const unsortedTags: HasPostsTag[] = response.data.tags;
      console.log('unsortedTags',unsortedTags);
  
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
      console.log('ソート完了↓');
      console.log(sortedTags)
      return sortedTags;
    } catch (e) {
      console.log('エラー発生');
      console.log(e);
    }
  };
  