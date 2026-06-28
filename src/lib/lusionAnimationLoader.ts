import { Loader, type LoadingManager } from 'three'
import type { LusionAnimationAtlas } from './lusionAstronautAnimation'
import { loadLusionLoopAnimation } from './lusionAstronautAnimation'

export class LusionAnimationLoader extends Loader {
  constructor(manager?: LoadingManager) {
    super(manager)
  }

  load(
    url: string,
    onLoad: (atlas: LusionAnimationAtlas) => void,
    _onProgress?: (event: ProgressEvent) => void,
    onError?: (error: unknown) => void,
  ) {
    loadLusionLoopAnimation(this.path ? `${this.path}${url}` : url)
      .then(onLoad)
      .catch((err) => onError?.(err))
  }
}
