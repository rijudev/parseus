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

export function cloneObject(obj: any) {
  if (Array.isArray(obj)) {
    return [...obj]
  }

  if (typeof obj === 'object') {
    return {
      ...obj
    }
  }

  return obj
}
