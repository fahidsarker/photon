import { compress, decompress } from "shrink-string"
import { encode, decode } from 'urlencode';
export const compressCodeForUrl = async (code: string) => {
    return encode(await compress(code));
}

export const decompressCodeFromUrl = async (code: string) => {
    return await decompress(decode(code));
}