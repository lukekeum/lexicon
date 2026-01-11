import { OPTION_WATERMARK } from '../constants';
import { getOrInitHandlerMeta } from '../metadata/store';

export function Option(name: string): ParameterDecorator {
  return (
    target: Object,
    propertyKey: string | symbol | undefined,
    parameterIndex: number
  ) => {
    if (!propertyKey) {
      throw new Error('@Option cannot be used on constructor parameters');
    }

    const normalized = name.trim().toLowerCase();
    if (!normalized) throw new Error('@Option name is required');

    const ctor = target.constructor;
    const handlerMeta = getOrInitHandlerMeta(ctor, propertyKey.toString());

    const dup = handlerMeta.params.some(
      (p: any) => p.kind === 'option' && p.name === normalized
    );
    if (dup) {
      throw new Error(
        `Duplicate @Option("${normalized}") in ${ctor.name}.${String(
          propertyKey
        )}`
      );
    }

    handlerMeta.params.push({
      kind: 'option',
      index: parameterIndex,
      name: normalized,

      required: undefined,
      description: undefined,
      choices: undefined,
      autocomplete: undefined,
    });

    Reflect.defineMetadata(OPTION_WATERMARK, true, ctor, propertyKey);
  };
}
