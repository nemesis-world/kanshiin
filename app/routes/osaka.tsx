import type { LoaderArgs } from "@vercel/remix";
import { urlLoader } from "~/utils/urlLoader";

export const regionConfig = {
  region: "kix1",
  city: "Osaka",
};

export const config = {
  runtime: "edge",
  regions: ["kix1"],
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
