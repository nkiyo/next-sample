"use client";

type Data = {
  now: string;
}

import Image from "next/image";
import { useEffect, useState } from "react";
import { Amplify } from 'aws-amplify';
import awsExports from './aws-exports'
import { Authenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';

// 参考: https://docs.aws.amazon.com/ja_jp/prescriptive-guidance/latest/patterns/authenticate-react-app-users-cognito-amplify-ui.html
Amplify.configure({...awsExports})

export default function Home() {
  const [data, setData] = useState<Data | null>(null);

  useEffect(() => {
    console.log("hoge")

    const fetchData = async () => {
      try {
        const res = await fetch("/api/workflow/execute");

        if (!res.ok) {
          throw new Error(`HTTP error: ${res.status}`);
        }

        const json = await res.json();
        setData(json);
        console.log(json.now);
      } catch (e) {
        console.error("データの取得に失敗しました");
      }
    }

    fetchData();
  }, []);

  return (
    <Authenticator>
      {({ signOut, user}) => (
      <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
        <main className="flex min-h-screen w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start">
          </main>
          <p>Welcome {user?.username}</p>
          <button onClick={signOut}>Sign out</button> 
          <div className="flex flex-col items-center gap-6 text-center sm:items-start sm:text-left">
            ほげほげ {data?.now}
          </div>
      </div>
      )}
    </Authenticator>
  );
}
