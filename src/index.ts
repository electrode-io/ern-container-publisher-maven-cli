import { ContainerPublisher } from 'ern-container-publisher'
import { shell, childProcess, log, NativePlatform } from 'ern-core'
const { execp } = childProcess
import {MavenCliPublisherConfig, MavenCliPublisherConfigExtra} from './types'

export default class MavenCliPublisher implements ContainerPublisher {
  get name(): string {
    return 'maven-cli'
  }

  get platforms(): NativePlatform[] {
    return ['android', 'ios']
  }

  public async publish(config: MavenCliPublisherConfig): Promise<any> {
    this.validateConfig(config)
    try {
      log.info('[=== Starting publication with maven-cli ===]')
      shell.pushd(config.containerPath)
      const cmd = this.buildCommand(config)
      log.debug(`Running ${cmd}`)
      await execp(cmd)
      log.info('[=== Completed maven-cli publication of the Container ===]')
      log.info(`[Published to : ${this.publicationUrl(config)}`)
    } finally {
      shell.popd()
    }
  }

  public publicationUrl(config: MavenCliPublisherConfig) {
    const extraConfig: MavenCliPublisherConfigExtra = config.extra!
    let url = config.url
    url += `/${extraConfig.groupId.replace(/\./g, '/')}`
    url += `/${extraConfig.artifactId}`
    url += `/${config.containerVersion}${extraConfig.versionSuffix || ''}`
    return url
  }

  public buildCommand(config: MavenCliPublisherConfig) {
    const extraConfig: MavenCliPublisherConfigExtra = config.extra!
    let cmd = extraConfig.mavenCliPath || 'mvn'
    cmd += ` deploy:deploy-file`
    cmd += ` ${extraConfig.opts || ''}`
    cmd += ` -Durl=${config.url}`
    cmd += ` -DrepositoryId=${extraConfig.repositoryId}`
    cmd += ` -DgroupId=${extraConfig.groupId}`
    cmd += ` -DartifactId=${extraConfig.artifactId}`
    cmd += ` -Dversion=${config.containerVersion}${extraConfig.versionSuffix || ''}`
    cmd += ` -Dfile=${extraConfig.filePath}`
    return cmd
  }

  public validateConfig(config: MavenCliPublisherConfig) {
    if (!config.url) {
      throw new Error('Missing url')
    }
    if (!config.extra) {
      throw new Error('No extra config provided')
    }
    if (!config.extra.repositoryId) {
      throw new Error('Missing extra.repositoryId')
    }
    if (!config.extra.groupId) {
      throw new Error('Missing extra.groupId')
    }
    if (!config.extra.artifactId) {
      throw new Error('Missing extra.artifactId')
    }
    if (!config.extra.filePath) {
      throw new Error('Missing extra.filePath')
    }
  }
}
