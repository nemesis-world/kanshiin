import { parseVercelId } from "~/utils/parse-vercel-id";
import { checkWebsiteStatus } from "~/utils/checkWebsiteStatus";
import { regions } from "~/regions";
import supabase from "~/provider/supabase";

export async function urlLoader(url: string, headers: Headers) {
  const theURL = new URL(url);
  const token = theURL.searchParams.get("token") || "";
  const parsedId = parseVercelId(headers.get("x-vercel-id"));
  console.log(parsedId);

  if (
    token !== process.env.SUPABASE_UPDATE_TOKEN &&
    parsedId.proxyRegion !== "dev1"
  ) {
    return new Response("Unauthorized", { status: 401 });
  }
  const supbasedata = await supabase.from("monitors").select("*");

  supbasedata?.data?.forEach(async (website) => {
    const websiteStatus = await checkWebsiteStatus(website.hostname);

    const status = websiteStatus === 200 ? 1 : 2;
    if (status !== website.status_code) {
      const { error } = await supabase
        .from("monitors")
        .update({
          status_code: status,
        })
        .eq("id", website.id)
        .select();

      if (error) {
        console.log(error);
      }
    }
  });

  return `Hi from ${regions[parsedId.computeRegion]}!`;
}
