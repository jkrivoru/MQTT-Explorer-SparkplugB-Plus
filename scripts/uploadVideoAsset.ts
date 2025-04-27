#!node_modules/.bin/ts-node
import axios from 'axios'
import * as fs from 'fs'
import * as path from 'path'
import * as mime from 'mime'

const githubToken = process.env.GH_TOKEN

async function tagUrl(tag: string): Promise<string | undefined> {
  const response = await axios.get(
    `https://github.com/jkrivoru/MQTT-Explorer-SparkplugB-Plus/releases?access_token=${githubToken}`
  )
  const tagRelease = response.data.find((release: any) => release.tag_name === tag)

  return tagRelease ? cleanUploadUrl(tagRelease.upload_url) : undefined
}

async function createDraft(tag: string) {
  console.log('create draft')

  const response = await axios({
    method: 'post',
    url: `https://github.com/jkrivoru/MQTT-Explorer-SparkplugB-Plus/releases?access_token=${githubToken}`,
    data: {
      tag_name: tag,
      name: tag.slice(1),
      draft: true,
    },
  })
  // @ts-ignore
  return cleanUploadUrl(response.data.upload_url)
}

function cleanUploadUrl(url: string): string | undefined {
  const match = url.match(/(.*){/)
  return match ? match[1] : undefined
}

async function uploadAsset() {
  const tag: string | undefined = process.env.GIT_TAG
  const files = process.argv.slice(2)

  if (!tag || files.length === 0) {
    console.log('Nothing to do')
    return
  }

  let uploadUrl: string | undefined
  try {
    uploadUrl = await tagUrl(tag)
    if (!uploadUrl) {
      console.log('tag does not exist')
      try {
        uploadUrl = await createDraft(tag)
      } catch (error) {
        console.error('failed to create draft', (error as Error).stack)
        process.exit(1)
      }
    }
  } catch (error) {
    console.error('failed to find tag release', (error as Error).stack)
    process.exit(1)
  }

  if (uploadUrl) {
    console.log(uploadUrl)
    for (const file of files) {
      console.log('uploading file', file)
      await uploadFile(uploadUrl, file)
      console.log('upload completed')
    }
  }
}

async function uploadFile(uploadUrl: string, file: string) {
  const data = fs.readFileSync(file)
  const mimeType = mime.getType(path.extname(file))

  // @ts-ignore
  return axios({
    data,
    method: 'post',
    url: `${uploadUrl}?name=${path.basename(file)}&access_token=${githubToken}`,
    headers: {
      'Content-Type': mimeType,
    },
  })
}

uploadAsset()
