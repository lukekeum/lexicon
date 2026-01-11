import { getOrInitHandlerMeta } from '../metadata/store';

export function Autocomplete(
  provider: new (...args: any[]) => any,
  method: string
): ParameterDecorator {
  if (!provider || !method) {
    throw new Error('@Autocomplete requires a provider and method name');
  }

  return (
    target: Object,
    propertyKey: string | symbol | undefined,
    parameterIndex: number
  ) => {
    if (!propertyKey) {
      throw new Error('@Autocomplete cannot be used on constructor parameters');
    }

    const ctor = target.constructor;
    const handlerMeta = getOrInitHandlerMeta(ctor, propertyKey.toString());

    handlerMeta.pending ??= [];
    handlerMeta.pending.push({
      kind: 'autocomplete',
      index: parameterIndex,
      provider,
      method,
    });
  };
}
