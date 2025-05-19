export async function getFortuneCookie(ctx: Context) {
  const data = await ctx.clients.customMasterData.getFortuneCookies()

  ctx.status = 200
  ctx.body = {
    fortune: data,
  }
}

export async function createFortuneCookie(ctx: Context) {
  const body = ctx.state.body as { CookieFortune?: string }

  if (!body?.CookieFortune || typeof body.CookieFortune !== 'string') {
    ctx.status = 400
    ctx.body = {
      message: 'El campo "CookieFortune" es requerido y debe ser un string.',
    }

    return
  }

  try {
    await ctx.clients.customMasterData.createFortuneCookie({
      CookieFortune: body.CookieFortune,
    })

    ctx.status = 201
    ctx.body = { message: 'Galleta creada exitosamente.' }
  } catch (err) {
    console.error('Error al guardar galleta:', err)
    ctx.status = 500
    ctx.body = { message: 'Se ha producido un error al guardar la galleta.' }
  }
}

export async function deleteFortuneCookie(ctx: Context) {
  const { id } = ctx.vtex.route.params as { id?: string }

  if (!id) {
    ctx.status = 400
    ctx.body = { message: 'El parámetro id es requerido' }

    return
  }

  try {
    await ctx.clients.customMasterData.deleteFortuneCookie(id)
    ctx.status = 200
    ctx.body = { message: 'Galleta eliminada exitosamente' }
  } catch (err) {
    console.error('Error eliminando galleta:', err)
    ctx.status = 500
    ctx.body = { message: 'Se ha producido un error al eliminar la galleta.' }
  }
}
