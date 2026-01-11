import { ARG_WATERMARK } from '../constants';
import { getOrInitHandlerMeta } from '../metadata/store';

interface ArgOptions {
  hint?: boolean;
  display?: string;
  description?: string;
}

export function Arg(arg: string, options?: ArgOptions): ParameterDecorator {
  const defaultOpts: Required<ArgOptions> = {
    hint: true,
    display: arg,
    description: '',
  };

  const opts: Required<ArgOptions> = { ...defaultOpts, ...options };

  return (
    target: any,
    propertyKey: string | symbol | undefined,
    parameterIndex: number
  ) => {
    if (!propertyKey) {
      throw new Error('@Arg cannot be used on constructor parameters');
    }

    const ctor = target.constructor;
    const handlerMeta = getOrInitHandlerMeta(ctor, propertyKey.toString());

    handlerMeta.params.push({
      kind: 'arg',
      index: parameterIndex,
      name: arg,
      hint: opts.hint,
      display: opts.display,
      description: opts.description,
    });

    Reflect.defineMetadata(ARG_WATERMARK, true, ctor, propertyKey);
  };
}
