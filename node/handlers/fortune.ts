export async function getFortuneCookie(ctx: Context) {
  const data = await ctx.clients.customMasterData.getFortuneCookies()
  const random = Math.floor(Math.random() * data.length)
  const cookie = data[random]?.CookieFortune

  ctx.status = 200
  ctx.body = {
    fortune: cookie,
  }
}
