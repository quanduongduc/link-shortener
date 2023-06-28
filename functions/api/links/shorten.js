import { baseResponse, generateUniqueId } from "../../utils"

export async function onRequestPost(context) {
    try {
        const { request, env } = context
        const { url } = await request.json()
        const id = generateUniqueId()
        const { success } = await env.DB.prepare("INSERT INTO links (id, original_url) VALUES (?, ?)"
        ).bind(id, url).run()

        if (success) {
            const payload = {
                message: "your link is ready to use",
                data: {
                    shorten_url: env.CF_PAGES_URL + '/' + id
                }
            }
            return await baseResponse(200, payload)
        }

        return await baseResponse(500, {
            message: "fail to create link, please try again"
        })
    } catch (error) {
        return await context.next(context)
    }
}