import type { LoaderArgs } from "@vercel/remix";
import { urlLoader } from "~/utils/urlLoader";

export const config = {
  runtime: "edge",
  regions: ["kix1"],
};

export async function loader({ request }: LoaderArgs) {
  return await urlLoader(request.url, request.headers);
}

export function headers() {
  return {
    "x-edge-region": "kix1",
    "x-edge-city": "Osaka",
  };
}
