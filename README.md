# Electrode Native Maven CLI Container Publisher

[![Build Status][1]][2]

This publisher can be used to publish Android or iOS Electrode Native Containers to a local or remote Maven repository, using the `mvn` command.

This publisher is using the [deploy:deploy-file](https://maven.apache.org/plugins/maven-deploy-plugin/usage.html) Mojo of Maven. This means that this publisher can only publish a single file (`.zip` or `.jar` or any other single file).\
Therefore, it cannot actually be used to publish a full Container project structure as such, but can be used to publish Container that have been transformed in some way (for example on iOS you might want to create a Fat Binary Container using a transformer, and publish the resulting zipped fat binary artifact to Maven).

## Usage

### With `ern publish-container` CLI command

#### Required

- `--publisher/-p` : `maven-cli`
- `--platform` : `android` | `ios`
- `--url/-u` : Url of the target maven repository to publish the container to (`-Durl` of `mvn` command)
- `--config/-c` : A json string (or path to a json file) containing the following properties:
  - `repositoryId` : The Maven repository id (`-DrepositoryId` of `mvn` command)
  - `artifactId` : The Maven artifact id (`-DartifactId` of `mvn` command)
  - `filePath` : ocal path to the file to publish. Can be either absolute or relative to Container root (`-Dfile` of `mvn` command)
  - `groupId` : The Maven group id to be used for the Container (`-DgroupId` of `mvn` command)
  - `versionSuffix` [Optional] : Suffix to append to the version (for example `-SNAPSHOT` or `-RELEASE`)
  - `mavenCliPath` [Optional] : Absolute path to the 'mvn' command. Can be used in case the 'mvn' binary is not in PATH or to use a 'mvn' binary other that the one in PATH.
  - `opts` [Optional]: Space delimited [Maven CLI options](http://maven.apache.org/ref/3.1.0/maven-embedder/cli.html#) to pass to the 'mvn' command. For example `-X -e -q`.

#### Optional

- `--containerPath` : Path to the Container to publish.\
Defaults to the Electrode Native default Container Generation path (`~/.ern/containergen/out/[platform]` unless changed through config)

- `--containerVersion/-v` : Version of the Container to publish.\
Default to `1.0.0`

The `ern publish-container` CLI command can be used as follow to manually publish a Container using the maven publisher:

```sh
ern publish-container --containerPath [pathToContainer] -p maven-cli -v [containerVersion] -u [mavenRepoUrl] -e '{"repositoryId":"[repositoryId]", "artifactId":"[artifactId]", "groupId":"[groupId], "filePath":"[filePath]"}'
```

Instead of passing the whole configuration on the command line for `--extra/-e`, it is also possible to use a file path to a json file holding the configuration, or a path to a file stored in the Cauldron. Check out the [ern publish-container](https://native.electrode.io/cli-commands/publish-container) command documentation for more info.

### With Cauldron

Add to `pipeline`

```json
{
  "name": "ern-container-publisher-maven-cli",
  "url": "[mavenRepoUrl]",
  "extra": {
    "artifactId": "[artifactId]",
    "groupId" : "[groupIdVal]",
    "repositoryId":"[repositoryId]",
    "filePath":"[filePath]"
  }
}
```

### Programmatically

```js
import MavenCliPublisher from 'ern-container-publisher-maven-clis'
const publisher = new MavenCliPublisher()
publisher.publish(
  {
    /* Local file system path to the Container */
    containerPath: string
    /* Version of the Container. Maven artifact version */
    containerVersion: string
    /* Url of the maven repository. Default: maven local */
    url?: string
    /* Extra config specific to this publisher */
    extra?: {
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
  }
})
```

[1]: https://travis-ci.org/electrode-io/ern-container-publisher-maven-cli.svg?branch=master
[2]: https://travis-ci.org/electrode-io/ern-container-publisher-maven-cli
