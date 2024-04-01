import Fetch from "./fetch";
import {currentUser} from '@clerk/nextjs/server'

// サーバサイド（Server Components / Route Handlers）からのリクエスト用
export const API = new Fetch(process.env.NEXT_PUBLIC_API_URL);
// クライアントサイド（Client Components）からのリクエスト用
export const BFF = new Fetch();

API.setRequestInterceptor(async (config) => {
  const user = await currentUser()
  config.headers = {
    ...config.headers,
    Authorization: `Bearer ${user?.id}`,
  };
  return config;
});
