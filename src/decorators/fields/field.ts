import { IFieldOptions, FieldType } from '../options/field-options'
import { PARSEUS_META_KEY } from '../../helpers/constant'
import { getReflectType, mergeMetadata } from '../../helpers/metadata'
import { setReadOnly } from '../../helpers/object'

function getType(reflectType: Function): FieldType {
  if (reflectType === Array) {
    return 'array'
  } else {
    return typeof reflectType === 'function'
      ? ((typeof reflectType()).toLowerCase() as FieldType)
      : 'string'
  }
}

export function Field(options?: IFieldOptions): Function {
  return function(context: any, propertyName: string, descriptor: TypedPropertyDescriptor<any>) {
    const opts: IFieldOptions = { ...options }
    const reflectType = getReflectType(context, propertyName)

    if (!opts.factory) {
      opts.factory = reflectType
    }

    if (!opts.type) {
      opts.type = getType(reflectType)
    }

    if (!opts.name) {
      opts.name = propertyName
    }

    if (opts.type === 'array' && !opts.default) {
      opts.default = []
    }

    if (opts.readOnly) {
      setReadOnly(context, propertyName)
    }

    mergeMetadata(PARSEUS_META_KEY, opts, context, propertyName)
  }
}
