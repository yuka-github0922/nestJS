import { ApolloClient, createHttpLink, InMemoryCache } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";

// graphQLの宛先を指定 ApolloLinkクラスのインスタンス
const httpLink  = createHttpLink({
  uri: 'http://localhost:3000/graphql'
});

// tokenをHttpヘッダーに追加する
// 第一引数は使わないので_で省略
// prevContextは数珠つなぎとなったひとつ前のLink
const authLink = setContext((_, prevContext) => {
  const token = localStorage.getItem("token");
  return {
    headers: {
      ...prevContext.headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink), // ここでHTTPリンクとAuthリンクを結合
  cache: new InMemoryCache(), //apolloクライアントのキャッシュ機能を有効化
});

export default client;