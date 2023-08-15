import type { LoaderArgs } from "@vercel/remix";
import { checkWebsiteStatus } from "~/utils/checkWebsiteStatus";
import supabase from "~/provider/supabase";

export const regionConfig = {
  region: "dev1",
  city: "Localhost",
};

export const config = {
  runtime: "edge",
  regions: ["dev1"],
};

export async function loader({ request }: LoaderArgs) {
  const supbasedata = await supabase.from("monitors").select("*");

  supbasedata?.data?.forEach(async (website) => {
    const websiteStatus = await checkWebsiteStatus(website.hostname);
    const status = websiteStatus === 200 ? 1 : 2;

    const region = regionConfig.region;

    const updateData = {
      status_code: status,
      [region]: status === 1 ? true : false,
    };

    const query = supabase
      .from("monitors")
      .update(updateData)
      .eq("id", website.id)
      .select();

    const { data, error } = await query;

    if (error) {
      console.log(error);
    } else {
      console.log(data);
    }
  });

  return new Response("OK");
}

export function headers() {
  return {
    "x-edge-region": regionConfig.region,
    "x-edge-city": regionConfig.city,
  };
}
