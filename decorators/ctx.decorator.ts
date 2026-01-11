import { CTX_WATERMARK } from '../constants';
import { getOrInitHandlerMeta } from '../metadata/store';

export function Ctx(): ParameterDecorator {
  return (
    target: Object,
    propertyKey: string | symbol | undefined,
    parameterIndex: number
  ) => {
    if (!propertyKey) {
      throw new Error('@Ctx cannot be used on constructor parameters');
    }

    const ctor = target.constructor;
    const handlerMeta = getOrInitHandlerMeta(ctor, propertyKey.toString());

    handlerMeta.params.push({
      kind: 'ctx',
      index: parameterIndex,
    });

    Reflect.defineMetadata(CTX_WATERMARK, true, ctor, propertyKey);
  };
}
