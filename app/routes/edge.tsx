import type { LoaderArgs } from "@vercel/remix";
import { urlLoader } from "~/utils/urlLoader";

const region = "kix1";

export const config = {
  runtime: "edge",
  regions: [region],
};

export async function loader({ request }: LoaderArgs) {
  return await urlLoader(request.url, request.headers);
}

export function headers() {
  return {
    "x-edge-region": region,
  };
}
