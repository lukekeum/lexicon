import { getOrInitHandlerMeta } from '../metadata/store';

export function SubCommand(name: string): MethodDecorator {
  if (!name || typeof name !== 'string') {
    throw new Error('@SubCommand requires a subcommand name');
  }

  const normalized = name.trim().toLowerCase();

  return (
    target: Object,
    propertyKey: string | symbol,
    descriptor: PropertyDescriptor
  ) => {
    const ctor = target.constructor;
    const handlerMeta = getOrInitHandlerMeta(ctor, propertyKey.toString());

    handlerMeta.route ??= {};
    handlerMeta.route.subcommand = normalized;
  };
}
