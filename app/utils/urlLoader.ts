import { parseVercelId } from "~/utils/parse-vercel-id";
import { checkWebsiteStatus } from "~/utils/checkWebsiteStatus";
import { regions } from "~/regions";
import supabase from "~/provider/supabase";

export async function urlLoader(url: string, headers: Headers) {
  const theURL = new URL(url);
  const token = theURL.searchParams.get("token") || "";
  const parsedId = parseVercelId(headers.get("x-vercel-id"));

  if (
    token !== process.env.SUPABASE_UPDATE_TOKEN &&
    parsedId.computeRegion !== "dev1"
  ) {
    return new Response("Unauthorized", { status: 401 });
  }
  const supbasedata = await supabase.from("monitors").select("*");

  supbasedata?.data?.forEach(async (website) => {
    const websiteStatus = await checkWebsiteStatus(website.hostname);
    const status = websiteStatus === 200 ? 1 : 2;

    if (status !== website.status_code) {
      const region =
        Object.keys(regions).find(
          (key) => regions[key] === parsedId.computeRegion
        ) || "dev1";
      const updateData = {
        status_code: status,
        [region]: parsedId.computeRegion === region ? true : null,
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
    }
  });

  return `Hi from ${regions[parsedId.computeRegion]}!`;
}
