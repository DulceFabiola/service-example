import { JanusClient } from '@vtex/api'

export default class CustomMasterDataClient extends JanusClient {
  private appKey = this.context.settings.VTEX_APP_KEY
  private appToken = this.context.settings.VTEX_APP_TOKEN
  private baseURL = `http://${this.context.account}.vtexcommercestable.com.br`

  public async getFortuneCookies() {
    return this.http.get(`/api/dataentities/CF/search`, {
      baseURL: this.baseURL,
      headers: {
        'x-vtex-api-appkey': this.appKey,
        'x-vtex-api-apptoken': this.appToken,
      },
      params: {
        _size: 100,
        _fields: 'id,CookieFortune',
      },
    })
  }

  public async createFortuneCookie(cookie: { CookieFortune: string }) {
    return this.http.post(`/api/dataentities/CF/documents`, cookie, {
      baseURL: this.baseURL,
      headers: {
        'x-vtex-api-appkey': this.appKey,
        'x-vtex-api-apptoken': this.appToken,
        'Content-Type': 'application/json',
      },
    })
  }

  public async deleteFortuneCookie(id: string) {
    return this.http.delete(`/api/dataentities/CF/documents/${id}`, {
      baseURL: this.baseURL,
      headers: {
        'x-vtex-api-appkey': this.appKey,
        'x-vtex-api-apptoken': this.appToken,
      },
    })
  }
}
