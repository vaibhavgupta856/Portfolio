/** Local copies of Lusion tunnel assets (public/lusion-assets) */
export const LUSION = {
  models: {
    astronautAnimations: '/lusion-assets/models/tunnels/astronaut_animations.buf',
    astronautInAnimation: '/lusion-assets/models/tunnels/astronaut_in_animation.buf',
    astronautOutAnimation: '/lusion-assets/models/tunnels/astronaut_out_animation.buf',
    astronautHelmet: '/lusion-assets/models/tunnels/astronaut_helmet.buf',
    astronautHelmetGlass: '/lusion-assets/models/tunnels/astronaut_helmet_glass.buf',
    astronautGloveShoes: '/lusion-assets/models/tunnels/astronaut_glove_shoes.buf',
    astronautWearpack: '/lusion-assets/models/tunnels/astronaut_wearpack.buf',
    brokenGlass: '/lusion-assets/models/tunnels/broken_glass.buf',
    brokenGlassAnimation: '/lusion-assets/models/tunnels/broken_glass_animation.buf',
    diamond: '/lusion-assets/models/tunnels/diamond.buf',
    earthCard: '/lusion-assets/models/tunnels/earth_card.buf',
    tunnelBlockBase: '/lusion-assets/models/tunnels/tunnel_block_base.buf',
    tunnelBlockWall: '/lusion-assets/models/tunnels/tunnel_block_wall.buf',
  },
  textures: {
    face: '/lusion-assets/textures/tunnels/astronaut/face.png',
    earthLandscape: '/lusion-assets/textures/tunnels/earth_landscape.jpg',
    earth: '/lusion-assets/textures/tunnels/earth.webp',
    whiteMatcap: '/lusion-assets/textures/tunnels/white_matcap.jpg',
    whiteBlock: '/lusion-assets/textures/tunnels/white_block.webp',
    blueNoise: '/lusion-assets/textures/LDR_RGB1_0.png',
    desktop: '/lusion-assets/textures/tunnels/desktop.png',
    tablet: '/lusion-assets/textures/tunnels/tablet.png',
    astronaut: {
      helmet: {
        arm: '/lusion-assets/textures/tunnels/astronaut/astronaut_helmet_arm.webp',
        base: '/lusion-assets/textures/tunnels/astronaut/astronaut_helmet_base.webp',
        nor: '/lusion-assets/textures/tunnels/astronaut/astronaut_helmet_nor.webp',
      },
      glove_shoes: {
        arm: '/lusion-assets/textures/tunnels/astronaut/astronaut_glove_shoes_arm.webp',
        base: '/lusion-assets/textures/tunnels/astronaut/astronaut_glove_shoes_base.webp',
        nor: '/lusion-assets/textures/tunnels/astronaut/astronaut_glove_shoes_nor.webp',
      },
      wearpack: {
        arm: '/lusion-assets/textures/tunnels/astronaut/astronaut_wearpack_arm.webp',
        base: '/lusion-assets/textures/tunnels/astronaut/astronaut_wearpack_base.webp',
        nor: '/lusion-assets/textures/tunnels/astronaut/astronaut_wearpack_nor.webp',
      },
    },
  },
} as const

export type LusionAstronautPart = keyof typeof LUSION.textures.astronaut
