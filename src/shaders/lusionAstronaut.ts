export const lusionAstronautVertex = /* glsl */ `
#define BONE_COUNT 53

uniform sampler2D u_animationPositionTexture;
uniform sampler2D u_animationOrientTexture;
uniform vec2 u_animationTextureSize;
uniform vec3 u_frameBlend;

attribute vec2 boneIndices;
attribute vec2 boneWeights;
attribute vec4 tangent;
attribute float ao;

varying vec2 v_uv;
varying vec3 v_worldNormal;
varying vec3 v_viewPosition;
varying float v_ao;

vec3 qrotate(vec4 q, vec3 v) {
  return v + 2.0 * cross(q.xyz, cross(q.xyz, v) + q.w * v);
}

vec4 boneDataToUV(vec4 dataOffset) {
  return vec4(
    (floor(mod(dataOffset.xy, u_animationTextureSize.x)) + 0.5),
    floor(dataOffset.xy / u_animationTextureSize.x) + 0.5,
    (floor(mod(dataOffset.zw, u_animationTextureSize.x)) + 0.5),
    floor(dataOffset.zw / u_animationTextureSize.x) + 0.5
  ).xzyw / u_animationTextureSize.xyxy;
}

void computeTransform(inout vec3 pos, inout vec3 nor, vec4 uvBone12) {
  vec3 bonePos1 = texture2D(u_animationPositionTexture, uvBone12.xy).xyz;
  vec3 bonePos2 = texture2D(u_animationPositionTexture, uvBone12.zw).xyz;
  vec4 boneOrient1 = texture2D(u_animationOrientTexture, uvBone12.xy);
  vec4 boneOrient2 = texture2D(u_animationOrientTexture, uvBone12.zw);
  pos = (qrotate(boneOrient1, pos) + bonePos1) * boneWeights.x
      + (qrotate(boneOrient2, pos) + bonePos2) * boneWeights.y;
  nor = normalize(
    qrotate(boneOrient1, nor) * boneWeights.x +
    qrotate(boneOrient2, nor) * boneWeights.y
  );
}

void computeFrameTransform(inout vec3 pos, inout vec3 nor, vec3 frameBlend) {
  vec4 dataOffset = boneIndices.xyxy + frameBlend.xxyy * float(BONE_COUNT) + 0.5;
  vec4 uvBone12 = boneDataToUV(dataOffset);

  vec3 fromPos = pos;
  vec3 fromNor = nor;
  computeTransform(fromPos, fromNor, uvBone12);

  vec3 toPos = pos;
  vec3 toNor = nor;
  computeTransform(toPos, toNor, uvBone12);

  pos = mix(fromPos, toPos, frameBlend.z);
  nor = mix(fromNor, toNor, frameBlend.z);
}

void main() {
  v_uv = uv;
  v_ao = ao;

  vec3 pos = position;
  vec3 nor = normal;
  computeFrameTransform(pos, nor, u_frameBlend);

  vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
  gl_Position = projectionMatrix * mvPosition;
  v_viewPosition = -mvPosition.xyz;
  v_worldNormal = normalize(normalMatrix * nor);
}
`

export const lusionAstronautFragment = /* glsl */ `
uniform sampler2D u_map;
uniform sampler2D u_normalMap;
uniform sampler2D u_aoMap;
uniform vec3 u_color;

varying vec2 v_uv;
varying vec3 v_worldNormal;
varying vec3 v_viewPosition;
varying float v_ao;

void main() {
  vec3 albedo = texture2D(u_map, v_uv).rgb * u_color;
  vec3 aoSample = texture2D(u_aoMap, v_uv).rgb;
  albedo *= mix(1.0, aoSample.r, 0.65) * mix(1.0, v_ao, 0.35);

  vec3 normalSample = texture2D(u_normalMap, v_uv).xyz * 2.0 - 1.0;
  vec3 N = normalize(v_worldNormal + normalSample * 0.35);
  vec3 V = normalize(v_viewPosition);
  vec3 L = normalize(vec3(0.4, 0.8, 0.5));
  float diff = max(dot(N, L), 0.0);
  float rim = pow(1.0 - max(dot(N, V), 0.0), 2.5);

  vec3 color = albedo * (0.35 + diff * 0.85) + rim * vec3(0.45, 0.55, 1.0) * 0.25;
  gl_FragColor = vec4(color, 1.0);
}
`

export const lusionHelmetGlassVertex = lusionAstronautVertex

export const lusionHelmetGlassFragment = /* glsl */ `
varying vec3 v_viewPosition;
varying vec3 v_worldNormal;

void main() {
  vec3 V = normalize(v_viewPosition);
  vec3 N = normalize(v_worldNormal);
  float fresnel = pow(1.0 - max(dot(N, V), 0.0), 2.0);
  vec3 color = mix(vec3(0.55, 0.85, 1.0), vec3(0.9, 0.95, 1.0), fresnel);
  gl_FragColor = vec4(color, 0.22 + fresnel * 0.35);
}
`
