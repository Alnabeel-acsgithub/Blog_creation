// api/generateBlogIdeas.js

export async function fetchBlogIdeas(payload:any) {
  try {
    console.log(payload,"pppppppp");
    
    const response = await fetch("https://workflows.agilecyber.com/webhook/blog_ideas_form_submit", {
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
    return data


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
