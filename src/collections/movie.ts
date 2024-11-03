import { CollectionConfig, FieldHook } from 'payload'

const format = (val: string): string =>
  val
    .replace(/ /g, '-')
    .replace(/[^\w-/]+/g, '')
    .toLowerCase()

// 用來生成 URL 的字串「簡短、易讀且 SEO 友好的字串」，例如： Dune Part Two -> dune-part-two
const formatSlug =
  (fallback: string): FieldHook =>
  ({ value, originalDoc, data }) => {
    if (typeof value === 'string') {
      return format(value)
    }
    const fallbackData = data?.[fallback] || originalDoc?.[fallback]

    if (fallbackData && typeof fallbackData === 'string') {
      return format(fallbackData)
    }

    return value
  }

export const MoviesCollection: CollectionConfig = {
  slug: 'movies',
  admin: {
    useAsTitle: 'name',
  },
  access: {
    create: () => true,
    read: () => true,
  },
  // 必填欄位 fields，用來定義上稿內容的欄位
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      name: 'url',
      type: 'text',
      required: true,
    },
    {
      name: 'votes',
      type: 'number',
      required: true,
    },
    {
      name: 'poster',
      type: 'upload',
      relationTo: 'media', // type: 'upload' 時，relationTo 必填
      required: true,
    },
    {
      name: 'overview',
      type: 'text',
      required: true,
    },
    {
      name: 'tagline',
      type: 'text',
      required: true,
    },
    {
      name: 'generes', // 可以有多個 generes 欄位(?)
      type: 'array', // 定義 secondary table，在資料庫中關聯兩張表
      fields: [{ name: 'name', type: 'text' }], // type: 'array', 就必須在定義底下的 feilds
      required: true,
    },
    {
      name: 'slug', // slug 是在 CMS 會使用的字，欄位使用 "slug" 意味著這個欄位專門用來生成或存儲該項目的網址別名，slug 欄位的內容一般是唯一的，以確保每個內容都有專屬的網址。
      label: 'Slug',
      type: 'text',
      admin: {
        position: 'sidebar',
      },
      hooks: {
        beforeValidate: [formatSlug('name')],
      },
    },
  ],
}
