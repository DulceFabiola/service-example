import { json } from 'co-body'

export async function bodyParser(ctx: Context, next: () => Promise<any>) {
  try {
    const body = await json(ctx.req)

    ctx.state.body = body
  } catch (err) {
    ctx.status = 400
    ctx.body = { message: 'Error al parsear el cuerpo JSON' }

    return
  }

  await next()
}
