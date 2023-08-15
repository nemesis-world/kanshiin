import type { LoaderArgs } from "@vercel/remix";
import { urlLoader } from "~/utils/urlLoader";

export const regionConfig = {
  region: "sfo1",
  city: "San Francisco",
};

export const config = {
  runtime: "edge",
  regions: ["sfo1"],
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
