import { baseResponse, generateUniqueId, isValidAlias, isValidUrl } from "../../utils"

export async function onRequestPost(context) {
    try {
        const { request, env } = context
        const { url, alias } = await request.json()
        if (!isValidUrl(url)) {
            return baseResponse(403, {
                message: "invalid url, pls try again"
            })
        }

        if (!isValidAlias(alias)) {
            return baseResponse(403, {
                message: "invalid alias, pls try again"
            })
        }
        console.log(url, alias);

        let id = generateUniqueId()
        if (alias) {
            id = alias
        }
        const { success } = await env.DB.prepare("INSERT INTO links (id, original_url) VALUES (?, ?)"
        ).bind(id, url).run()

        if (success) {
            const payload = {
                message: "your link is ready to use",
                data: {
                    shortenUrl: env.CF_PAGES_URL + '/' + id
                }
            }
            return baseResponse(200, payload)
        }

        return baseResponse(500, {
            message: "fail to create link, please try again"
        })
    } catch (error) {
        console.log(error.message);
        return baseResponse(500, {
            error: err.message,
            trace: err.stack
        })
    }
}