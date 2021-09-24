import { useEffect } from 'react'

// image/vnd.microsoft.icon The MIME type only works if the image is really an ICO file
// image/x-icon t also applies to bitmaps and GIFs
// Mainly for compatibility with non-ico files with the extension ico
const ImgTypeMap = {
  SVG: 'image/svg+xml',
  ICO: 'image/x-icon',
  GIF: 'image/gif',
  PNG: 'image/png',
}

type ImgTypes = keyof typeof ImgTypeMap

/**
 * Set or configure page favicon URL.
 */
export default function useFavicon(favUrl: string) {
  useEffect(() => {
    if (!favUrl) return

    const cutUrl = favUrl.split('.')
    const imgSuffix = cutUrl[cutUrl.length - 1].toLocaleUpperCase() as ImgTypes

    const link: HTMLLinkElement =
      document.querySelector("link[rel*='icon']") ||
      document.createElement('link')

    link.type = ImgTypeMap[imgSuffix]
    link.href = favUrl
    // Most browsers will only recognize the'icon' only IE will recognize the entire name'shortcut icon'
    link.rel = 'shortcut icon'

    document.getElementsByTagName('head')[0].appendChild(link)
  }, [favUrl])
}
