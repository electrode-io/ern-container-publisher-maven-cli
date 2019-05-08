
import { MavenCliPublisherConfigExtra } from './MavenCliPublisherConfigExtra'

export interface MavenCliPublisherConfig {
  /**
   * Root local path to the Container to publish
   */
  containerPath: string
  /**
   * Version of the Container to publish
   */
  containerVersion: string
  /**
   * Url to publish the Container to
   */
  url?: string
  /**
   * Extra configuration specific to this publisher
   */
  extra?: MavenCliPublisherConfigExtra
}