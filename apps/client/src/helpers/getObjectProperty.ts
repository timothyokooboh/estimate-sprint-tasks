import get from 'lodash.get'

type LodashGetParamsType = Parameters<typeof get>
type LodashGetReturnType = ReturnType<typeof get>

export function getObjectProperty(
  object: LodashGetParamsType[0],
  path: LodashGetParamsType[1],
  defaultValue?: LodashGetParamsType[2]
): LodashGetReturnType {
  return get(object, path, defaultValue)
}
