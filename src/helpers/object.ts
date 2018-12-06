/**
 * Converts the targetKey field into a readyonly field into context.
 * @param {any} context
 * @param {string} propertyName
 */
export function setReadOnly(context: any, propertyName: string) {
  const readOnlyPropertyname = '_' + propertyName
  const getter = () => {
    return context[readOnlyPropertyname]
  }
  const setter = (newValue: any) => {
    if (context[readOnlyPropertyname]) return
    context[readOnlyPropertyname] = newValue
  }

  // Delete property.
  if (delete context[propertyName]) {
    // Create new property with getter and setter
    Object.defineProperty(context, propertyName, {
      get: getter,
      set: setter,
      enumerable: true,
      configurable: true
    })
  }
}

/**
 * Clone the target object if it's any array or an object.
 * If the value is a primitive type it will returned as is.
 * @param {unknown} obj
 */
export function cloneObject<T extends object>(obj: T): T {
  if (Array.isArray(obj)) {
    return [...obj] as T
  }

  if (typeof obj === 'object') {
    return {
      ...(obj as any)
    }
  }

  return obj
}
