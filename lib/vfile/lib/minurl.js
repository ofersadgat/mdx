/**
 * Checks if a value has the shape of a WHATWG URL object.
 *
 * Using a symbol or instanceof would not be able to recognize URL objects
 * coming from other implementations (e.g. in Electron), so instead we are
 * checking some well known properties for a lack of a better test.
 *
 * We use `href` and `protocol` as they are the only properties that are
 * easy to retrieve and calculate due to the lazy nature of the getters.
 *
 * We check for auth attribute to distinguish legacy url instance with
 * WHATWG URL instance.
 *
 * @param {unknown} fileUrlOrPath
 *   File path or URL.
 * @returns {fileUrlOrPath is URL}
 *   Whether it’s a URL.
 */
// From: <https://github.com/nodejs/node/blob/6a3403c/lib/internal/url.js#L720>
export function isUrl(fileUrlOrPath) {
  return Boolean(
    fileUrlOrPath !== null &&
      typeof fileUrlOrPath === 'object' &&
      'href' in fileUrlOrPath &&
      fileUrlOrPath.href &&
      'protocol' in fileUrlOrPath &&
      fileUrlOrPath.protocol &&
      // @ts-expect-error: indexing is fine.
      fileUrlOrPath.auth === undefined
  )
}

/**
 * @param {URL | string} path
 *   File URL.
 * @returns {string}
 *   File URL.
 */
export function urlToPath(path) {
  if (typeof path === 'string') {
    path = new URL(path)
  } else if (!isUrl(path)) {
    /** @type {NodeJS.ErrnoException} */
    const error = new TypeError(
      'The "path" argument must be of type string or an instance of URL. Received `' +
        path +
        '`'
    )
    error.code = 'ERR_INVALID_ARG_TYPE'
    throw error
  }

  if (path.protocol !== 'file:') {
    /** @type {NodeJS.ErrnoException} */
    const error = new TypeError('The URL must be of scheme file')
    error.code = 'ERR_INVALID_URL_SCHEME'
    throw error
  }

  return getPathFromURLPosix(path)
}

/**
 * Get a path from a POSIX URL.
 *
 * @param {URL} url
 *   URL.
 * @returns {string}
 *   File path.
 */
function getPathFromURLPosix(url) {
  if (url.hostname !== '') {
    /** @type {NodeJS.ErrnoException} */
    const error = new TypeError(
      'File URL host must be "localhost" or empty on darwin'
    )
    error.code = 'ERR_INVALID_FILE_URL_HOST'
    throw error
  }

  const pathname = url.pathname
  let index = -1

  while (++index < pathname.length) {
    if (
      pathname.codePointAt(index) === 37 /* `%` */ &&
      pathname.codePointAt(index + 1) === 50 /* `2` */
    ) {
      const third = pathname.codePointAt(index + 2)
      if (third === 70 /* `F` */ || third === 102 /* `f` */) {
        /** @type {NodeJS.ErrnoException} */
        const error = new TypeError(
          'File URL path must not include encoded / characters'
        )
        error.code = 'ERR_INVALID_FILE_URL_PATH'
        throw error
      }
    }
  }

  return decodeURIComponent(pathname)
}
