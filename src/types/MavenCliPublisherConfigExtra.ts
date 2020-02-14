export interface MavenCliPublisherConfigExtra {
  /**
   * Maven repository id
   */
  repositoryId: string
  /**
   * Maven group id
   */
  groupId: string
  /**
   * Maven artifact id
   */
  artifactId: string
  /**
   * Local path to the file to publish
   * Can be either absolute or relative to Container root
   */
  filePath: string
  /**
   * Suffix to append to the version
   * For example '-SNAPSHOT' / '-RELEASE'
   */
  versionSuffix?: string
  /**
   * Absolute path to the 'mvn' command
   * Can be used in case the 'mvn' binary is not in PATH
   * or to use a 'mvn' binary other that the one in PATH
   */
  mavenCliPath?: string
  /**
   * Space delimited options to pass to the 'mvn' command
   * For example '-X -e -q'
   */
  opts?: string
}
