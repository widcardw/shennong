export default defineEventHandler(async (event) => {
    const body = await readBody(event)
    // console.log(body)
    // some processors
    return {
        status: 'ok',
        code: 200,
        name: body.name as string,
        time: Date.now(),
    }
})