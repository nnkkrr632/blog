// import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import './assets/main.css'
import './style.css'


//@see https://v4.apollo.vuejs.org/guide-composable/setup.html#_1-install-vue-apollo-composable
//アポロクライアントを読み込み
import apolloClient  from './plugins/apolloClient'
import { createApp, provide, h } from 'vue'
import { DefaultApolloClient } from '@vue/apollo-composable'

// const app = createApp(App)
const app = createApp({
    setup () {
      provide(DefaultApolloClient, apolloClient)
    },
  
    render: () => h(App),
  })

app.use(router)

app.mount('#app')
