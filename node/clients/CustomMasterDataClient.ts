import { JanusClient } from '@vtex/api'

export default class CustomMasterDataClient extends JanusClient {
  public async getFortuneCookies() {
    const appKey = this.context.settings.VTEX_APP_KEY
    const appToken = this.context.settings.VTEX_APP_TOKEN

    return this.http.get(`/api/dataentities/CF/search`, {
      baseURL: `http://${this.context.account}.vtexcommercestable.com.br`,

      headers: {
        'x-vtex-api-appkey': appKey,
        'x-vtex-api-apptoken': appToken,
      },
      params: {
        _size: 20,
        _fields: 'CookieFortune',
      },
    })
  }
}
