import { EXECUTE_WATERMARK } from '../constants';
import { getOrInitCommandMeta } from '../metadata/store';

interface ExecuteOptions {
  params?: string[];
}

export function Execute(): MethodDecorator;
export function Execute(params: string[]): MethodDecorator;
export function Execute(
  paramsOrOptions?: string[] | ExecuteOptions
): MethodDecorator {
  const params = Array.isArray(paramsOrOptions)
    ? paramsOrOptions
    : paramsOrOptions?.params ?? undefined;

  return (target: any, propertyKey: string | symbol) => {
    const ctor = target.constructor;

    const commandMeta = getOrInitCommandMeta(ctor);

    commandMeta.handlers.push({
      methodName: propertyKey.toString(),
      pattern: params,
      params: [],
    });

    Reflect.defineMetadata(EXECUTE_WATERMARK, true, ctor, propertyKey);
  };
}
