import { COMMAND_METADATA } from '../constants';
import type { CommandMeta, HandlerMeta } from './types';

export function getOrInitCommandMeta(ctor: Function): CommandMeta {
  let meta = Reflect.getMetadata(COMMAND_METADATA, ctor) as
    | CommandMeta
    | undefined;

  if (!meta) {
    meta = { handlers: [], prefixes: [] };
    Reflect.defineMetadata(COMMAND_METADATA, meta, ctor);
  }

  return meta;
}

export function getOrInitHandlerMeta(
  ctor: Function,
  methodName: string
): HandlerMeta {
  const commandMeta = getOrInitCommandMeta(ctor);

  let handler = commandMeta.handlers.find((h) => h.methodName === methodName);

  if (!handler) {
    handler = {
      methodName,
      pattern: undefined,
      params: [],
    };
    commandMeta.handlers.push(handler);
  }

  return handler;
}

export function getCommandMeta(ctor: Function): CommandMeta | undefined {
  return Reflect.getMetadata(COMMAND_METADATA, ctor) as CommandMeta | undefined;
}
