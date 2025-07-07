// imageGeneration.ts

export async function socialMediaImage1(payload: object): Promise<string | null> {
    try {
        const response = await fetch("https://workflows.agilecyber.com/webhook/create_social_media_post_image_product", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(payload)
        });

        if (!response.ok) {
            throw new Error("API call failed: " + response.status);
        }

        const blob = await response.blob();

        // Convert Blob to Object URL for image preview
        const objectUrl = URL.createObjectURL(blob);
        return objectUrl;

    } catch (error) {
        console.error("Error fetching blog image:", error);
        return null;
    }
}

export async function socialMediaImage2(payload: object): Promise<string | null> {
    try {
        const response = await fetch("https://workflows.agilecyber.com/webhook/create_social_media_post_image2_product", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(payload)
        });

        if (!response.ok) {
            throw new Error("API call failed: " + response.status);
        }

        const blob = await response.blob();

        // Convert Blob to Object URL for image preview
        const objectUrl = URL.createObjectURL(blob);
        return objectUrl;

    } catch (error) {
        console.error("Error fetching blog image:", error);
        return null;
    }
}

export async function socialMediaImage3(payload: object): Promise<string | null> {
    try {
        const response = await fetch("https://workflows.agilecyber.com/webhook/create_social_media_post_image3_product", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(payload)
        });

        if (!response.ok) {
            throw new Error("API call failed: " + response.status);
        }

        const blob = await response.blob();

        // Convert Blob to Object URL for image preview
        const objectUrl = URL.createObjectURL(blob);
        return objectUrl;

    } catch (error) {
        console.error("Error fetching blog image:", error);
        return null;
    }
}

export async function socialMediaImage4(payload: object): Promise<string | null> {
    try {
        const response = await fetch("https://workflows.agilecyber.com/webhook/create_social_media_post_image4_product", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(payload)
        });

        if (!response.ok) {
            throw new Error("API call failed: " + response.status);
        }

        const blob = await response.blob();

        // Convert Blob to Object URL for image preview
        const objectUrl = URL.createObjectURL(blob);
        return objectUrl;

    } catch (error) {
        console.error("Error fetching blog image:", error);
        return null;
    }
}