import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

const postsDirectory = path.join(process.cwd(), 'posts')

export function getSortedPostsData() {
  const allPostsData = getPostsData()
  sortGetPostsData(allPostsData)
  return allPostsData
}

export function getPostsData(){
  // /posts　配下のファイル名を取得する
  const fileNames = fs.readdirSync(postsDirectory)

  const allPostsData = fileNames.map(fileName => {
    // id を取得するためにファイル名から ".md" を削除する
    const id = fileName.replace(/\.md$/, '')

    // マークダウンファイルを文字列として読み取る
    const fullPath = path.join(postsDirectory, fileName)
    const fileContents = fs.readFileSync(fullPath, 'utf8')

    // 投稿のメタデータ部分を解析するために gray-matter を使う
    const matterResult = matter(fileContents)

    // データを id と合わせる
    return {
      id,
      ...matterResult.data
    }
  })
  return allPostsData
}

// 投稿を日付でソート
export function sortGetPostsData(Data){
    Data.sort((a, b) => {
        if (a.date < b.date) {
          return 1
        } else {
          return -1
        }
    })
}