import { baseResponse } from "../../utils"

export async function onRequestGet(context) {
    try {
        const { request, env } = context
        const link_id = context.params.link_id;
        const { results } = env.DB.prepare(`
            SELECT TOP 1 links.id FROM links WHERE links.id = ?;
        `).bind(link_id)
        if (results) {
            const headers = {
                location: results.original_url
            }
            return await baseResponse(301, undefined, headers)
        }
        return await baseResponse(500, "fail to create link, please try again")
    } catch (error) {
        return await context.next()
    }
}