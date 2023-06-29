import { baseResponse } from "../utils"

export async function onRequestGet(context) {
    try {
        const { request, env } = context
        const { link_id } = context.params
        const result = await env.DB.prepare(`
            SELECT * FROM links WHERE links.id = ?;
        `).bind(link_id).first()
        const redirect_url = result.original_url
        if (redirect_url) {
            const headers = {
                location: redirect_url
            }
            return await baseResponse(301, undefined, headers)
        }
        return await baseResponse(404, { message: "not found" })
    } catch (error) {
        console.log(error.message);
        return baseResponse(500, {
            message: error.message,
            trace: error.stack
        })
    }
}