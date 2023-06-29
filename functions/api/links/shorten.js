import { FIXED_ID_LENGTH, alphabet, baseResponse, isValidAlias, isValidUrl } from "../../utils"
import { customAlphabet } from "nanoid"

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
        const nano = customAlphabet(alphabet, FIXED_ID_LENGTH)
        let id = nano()
        if (alias) {
            id = alias
        }
        const { success } = await env.DB.prepare("INSERT INTO links (id, original_url) VALUES (?, ?)"
        ).bind(id, url).run()

        if (success) {
            // need to store id -> original_url in KV here
            const kv = env.UrlById
            await kv.put(id, url)
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
            error: error.message,
            trace: error.stack
        })
    }
}