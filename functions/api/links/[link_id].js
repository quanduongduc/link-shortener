import { baseResponse } from "../../utils"

export async function onRequestGet(context) {
    try {
        const { request, env } = context
        const link_id = context.params.link_id;
        const { results } = await env.DB.prepare("SELECT * FROM links WHERE links.id = ? LIMIT 1").bind(link_id).all()
        if (results[0]) {
            const headers = {
                location: results[0].original_url
            }
            return await baseResponse(301, undefined, headers)
        }
        return await baseResponse(500, "fail to create link, please try again")
    } catch (error) {
        return await context.next()
    }
}