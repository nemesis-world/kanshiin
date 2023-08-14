import { useLoaderData } from "@remix-run/react";
import type { LoaderArgs, V2_MetaFunction } from "@vercel/remix";
import supabase from "~/provider/supabase";

export const meta: V2_MetaFunction = () => [{ title: "Kanshi - 監視" }];

export async function loader({ request }: LoaderArgs) {
  const supbasedata = await supabase.from("monitors").select("*");

  return {
    supbasedata,
    date: new Date().toISOString(),
  };
}

export default function Index() {
  const { supbasedata } = useLoaderData<typeof loader>();

  const websites = supbasedata?.data?.map((website, i) => {
    let ping;

    switch (website.status_code) {
      case 1:
        ping = (
          <>
            <span className="animate-ping absolute inline-flex h-4 w-4 rounded-full -top-2 -right-2 bg-green-600 opacity-75"></span>
            <span className="absolute inline-flex h-4 w-4 rounded-full -top-2 -right-2 bg-green-600 opacity-75"></span>
          </>
        );
        break;
      case 2:
        ping = (
          <>
            <span className="animate-ping absolute inline-flex h-4 w-4 rounded-full -top-2 -right-2 bg-red-500 opacity-75"></span>
            <span className="absolute inline-flex h-4 w-4 rounded-full -top-2 -right-2 bg-red-500 opacity-75"></span>
          </>
        );
        break;
      case 3:
        ping = (
          <>
            <span className="animate-ping absolute inline-flex h-4 w-4 rounded-full -top-2 -right-2 bg-cyan-500 opacity-75"></span>
            <span className="absolute inline-flex h-4 w-4 rounded-full -top-2 -right-2 bg-cyan-400 opacity-75"></span>
          </>
        );
        break;
    }

    return (
      <div key={i} className="p-4 border rounded-md shadow-sm relative">
        {ping}
        <h2 className="text-lg">{website.name}</h2>
        <p className="mb-4">{website.hostname}</p>
        <div className="grid grid-cols-3">
          <p>🇯🇵 {website.kix1 ? "up" : "down"}</p>
          <p>🇺🇸 {website.sfo1 ? "up" : "down"}</p>
          <p>🇮🇪 {website.dub1 ? "up" : "down"}</p>
        </div>
      </div>
    );
  });

  return (
    <section className="container mx-auto py-12">
      <h1 className="font-bold text-3xl text-center mb-12">Kanshi - 監視</h1>
      <div className="grid grid-cols-4 gap-4">{websites}</div>
    </section>
  );
}
