import MavenCliPublisher from '../src'
import { expect } from 'chai'
import 'mocha'
import sinon from 'sinon'
import * as core from 'ern-core'
import { MavenCliPublisherConfig } from '../src/types';


describe('MavenCliPublisher', () => {
  describe('name', () => {
    it('should return maven-cli', () => {
      const sut = new MavenCliPublisher()
      expect(sut.name).eql('maven-cli')
    })
  }) 

  describe('platforms', () => {
    it('should return ios and android', () => {
      const sut = new MavenCliPublisher()
      expect(sut.platforms).deep.equal(['android', 'ios'])
    })
  }) 

  describe('publicationUrl', () => {
    it('should build the correct publication url', () => {
      const sut = new MavenCliPublisher()
      const url = sut.publicationUrl({
        containerPath: '/path/to/container',
        url: 'https://repository.foo.com/content/repositories/releases',
        containerVersion: '1.0.0',
        extra: {
          groupId: 'com.foo',
          artifactId: 'bar',
          versionSuffix: '-RELEASE',
          filePath: '/Users/foo/artifact.zip',
          repositoryId: 'releases'
        }
      })
      expect(url).eql('https://repository.foo.com/content/repositories/releases/com/foo/bar/1.0.0-RELEASE')
    })
  })

  describe('validateConfig', () => {
    it('should throw if config is missing url', () => {
      const sut = new MavenCliPublisher()
      expect(() => sut.validateConfig({
        containerPath: '/path/to/container',
        containerVersion: '1.0.0',
        extra: {
          groupId: 'com.foo',
          artifactId: 'bar',
          versionSuffix: '-RELEASE',
          filePath: '/Users/foo/artifact.zip',
          repositoryId: 'releases'
        }
      })).to.throw()
    })

    it('should throw if config is missing extra', () => {
      const sut = new MavenCliPublisher()
      expect(() => sut.validateConfig({
        containerPath: '/path/to/container',
        containerVersion: '1.0.0',
        url: 'https://repository.foo.com/content/repositories/releases'
      })).to.throw()
    })

    it('should throw if config is missing extra.repositoryId', () => {
      const sut = new MavenCliPublisher()
      expect(() => sut.validateConfig({
        containerPath: '/path/to/container',
        containerVersion: '1.0.0',
        url: 'https://repository.foo.com/content/repositories/releases',
        extra: {
          groupId: 'com.foo',
          artifactId: 'bar',
          versionSuffix: '-RELEASE',
          filePath: '/Users/foo/artifact.zip'
        }
      } as MavenCliPublisherConfig)).to.throw()
    })

    it('should throw if config is missing extra.groupId', () => {
      const sut = new MavenCliPublisher()
      expect(() => sut.validateConfig({
        containerPath: '/path/to/container',
        containerVersion: '1.0.0',
        url: 'https://repository.foo.com/content/repositories/releases',
        extra: {
          repositoryId: 'releases',
          artifactId: 'bar',
          versionSuffix: '-RELEASE',
          filePath: '/Users/foo/artifact.zip'
        }
      } as MavenCliPublisherConfig)).to.throw()
    })

    it('should throw if config is missing extra.artifactId', () => {
      const sut = new MavenCliPublisher()
      expect(() => sut.validateConfig({
        containerPath: '/path/to/container',
        containerVersion: '1.0.0',
        url: 'https://repository.foo.com/content/repositories/releases',
        extra: {
          repositoryId: 'releases',
          groupId: 'com.foo',
          versionSuffix: '-RELEASE',
          filePath: '/Users/foo/artifact.zip'
        }
      } as MavenCliPublisherConfig)).to.throw()
    })

    it('should throw if config is missing extra.filePath', () => {
      const sut = new MavenCliPublisher()
      expect(() => sut.validateConfig({
        containerPath: '/path/to/container',
        containerVersion: '1.0.0',
        url: 'https://repository.foo.com/content/repositories/releases',
        extra: {
          repositoryId: 'releases',
          groupId: 'com.foo',
          versionSuffix: '-RELEASE',
          artifactId: 'bar',
        }
      } as MavenCliPublisherConfig)).to.throw()
    })
  })
})