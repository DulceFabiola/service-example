import { IOClients } from '@vtex/api'

import Status from './status'
import CustomMasterDataClient from './CustomMasterDataClient'

export class Clients extends IOClients {
  public get status() {
    return this.getOrSet('status', Status)
  }

  public get customMasterData() {
    return this.getOrSet('customMasterData', CustomMasterDataClient)
  }
}
