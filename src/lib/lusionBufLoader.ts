import {
  BufferAttribute,
  BufferGeometry,
  Loader,
  type LoadingManager,
} from 'three'

type BufAttributeMeta = {
  id: string
  componentSize: number
  storageType: string
  needsPack?: boolean
  packedComponents?: { from: number; delta: number }[]
}

type BufMeta = {
  vertexCount: number
  indexCount: number
  attributes: BufAttributeMeta[]
  meshType?: string
  sceneData?: unknown
}

const STORAGE: Record<string, new (buffer: ArrayBuffer, byteOffset: number, length: number) => ArrayBufferView> = {
  Float32Array,
  Int16Array,
  Uint16Array,
  Int8Array,
  Uint8Array,
}

/** Parse Lusion's proprietary .buf geometry format (from hoisted.CJiXW_YI.js). */
export function parseLusionBuf(arrayBuffer: ArrayBuffer): BufferGeometry {
  const headerLen = new Uint32Array(arrayBuffer, 0, 1)[0]
  const jsonBytes = new Uint8Array(arrayBuffer, 4, headerLen)
  const meta = JSON.parse(String.fromCharCode(...jsonBytes)) as BufMeta

  const vertexCount = meta.vertexCount
  const indexCount = meta.indexCount
  let offset = 4 + headerLen

  const geometry = new BufferGeometry()

  for (const attr of meta.attributes) {
    const id = attr.id
    const count = id === 'indices' ? indexCount : vertexCount
    const componentSize = attr.componentSize
    const Storage = STORAGE[attr.storageType]
    if (!Storage) throw new Error(`Unknown storage type: ${attr.storageType}`)

    const raw = new Storage(arrayBuffer, offset, count * componentSize) as
      | Float32Array
      | Int16Array
      | Uint16Array
      | Int8Array
      | Uint8Array

    const bytesPerElement = (raw as { BYTES_PER_ELEMENT: number }).BYTES_PER_ELEMENT
    let data: BufferAttribute['array']

    if (attr.needsPack) {
      const packed = attr.packedComponents!
      const packLen = packed.length
      const isSignedInt = attr.storageType.indexOf('Int') === 0
      const maxVal = 1 << (bytesPerElement * 8)
      const signedOffset = isSignedInt ? maxVal * 0.5 : 0
      const invMax = 1 / maxVal
      const unpacked = new Float32Array(count * componentSize)
      let z = 0
      for (let v = 0; v < count; v++) {
        for (let j = 0; j < packLen; j++) {
          const pack = packed[j]
          unpacked[z] = ((raw[z] as number) + signedOffset) * invMax * pack.delta + pack.from
          z++
        }
      }
      data = unpacked
    } else {
      data = raw as BufferAttribute['array']
    }

    if (id === 'indices') {
      geometry.setIndex(new BufferAttribute(data, 1))
    } else {
      geometry.setAttribute(id, new BufferAttribute(data, componentSize))
    }

    offset += count * componentSize * bytesPerElement
  }

  return geometry
}

export class LusionBufLoader extends Loader {
  constructor(manager?: LoadingManager) {
    super(manager)
  }

  load(
    url: string,
    onLoad: (geometry: BufferGeometry) => void,
    _onProgress?: (event: ProgressEvent) => void,
    onError?: (error: unknown) => void,
  ) {
    fetch(this.path ? `${this.path}${url}` : url)
      .then((res) => {
        if (!res.ok) throw new Error(`Failed to load ${url}: ${res.status}`)
        return res.arrayBuffer()
      })
      .then((buf) => onLoad(parseLusionBuf(buf)))
      .catch((err) => onError?.(err))
  }
}

const loader = new LusionBufLoader()
const cache = new Map<string, Promise<BufferGeometry>>()

export function loadLusionBuf(url: string): Promise<BufferGeometry> {
  const existing = cache.get(url)
  if (existing) return existing

  const promise = new Promise<BufferGeometry>((resolve, reject) => {
    loader.load(url, resolve, undefined, reject)
  })
  cache.set(url, promise)
  return promise
}
