import type { LoaderArgs } from "@vercel/remix";
import { urlLoader } from "~/utils/urlLoader";

export const regionConfig = {
  region: "dub1",
  city: "Dublin",
};

export const config = {
  runtime: "edge",
  regions: ["dub1"],
};

export async function loader({ request }: LoaderArgs) {
  return await urlLoader(request.url, request.headers, regionConfig);
}

export function headers() {
  return {
    "x-edge-region": regionConfig.region,
    "x-edge-city": regionConfig.city,
  };
}
