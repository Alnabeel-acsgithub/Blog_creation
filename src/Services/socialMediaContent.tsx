import { SocialMediaPayload } from "../types";

export async function socialMediaContent(payload: SocialMediaPayload) {
  try {

    const response = await fetch("https://workflows.agilecyber.com/webhook/create_social_media_content_product", {
      method: "POST",  // or "GET" depending on your backend design
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
      throw new Error("API call failed: " + response.status);
    }
    const data = await response.json();
    return data[0]?.data || [];


    // Validate data structure
    // if (!data.ideas || !Array.isArray(data.ideas)) {
    //   throw new Error("Invalid response structure");
    // }

    // Return ideas directly for frontend usage
    // return data;

  } catch (error) {
    console.error("Error fetching blog ideas:", error);
    return [];
  }
}
