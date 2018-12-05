import { METADATA_DESING_TYPE } from './constant'

export function getMetadata(metaKey: string, context: any, propertyName?: string): any {
  const reflect: any = Reflect
  return reflect && reflect.getMetadata
    ? reflect.getMetadata(metaKey, context, propertyName)
    : undefined
}

export function getReflectType(context: any, propertyName?: string): any {
  return getMetadata(METADATA_DESING_TYPE, context, propertyName)
}

export function defineMetadata(metaKey: string, value: any, context: any) {
  const reflect: any = Reflect
  if (!reflect || !reflect.defineMetadata) return
  reflect.defineMetadata(metaKey, value, context)
}

export function mergeMetadata(metaKey: string, value: any, context: any, propertyName: string) {
  const previousMetadata = getMetadata(metaKey, context)
  const newMetadata = {
    ...previousMetadata,
    [propertyName]: value
  }
  defineMetadata(metaKey, newMetadata, context)
}
