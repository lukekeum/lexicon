import type { CommandMeta, HandlerMeta, ParamMeta } from './types';

function sortParams(params: ParamMeta[]): ParamMeta[] {
  return [...params].sort((a, b) => a.index - b.index);
}

function normalizeHandler(h: HandlerMeta): HandlerMeta {
  return {
    methodName: h.methodName,
    pattern: h.pattern ? [...h.pattern] : undefined,
    params: sortParams(h.params),
  };
}

export function commandMetaToJson(meta: CommandMeta) {
  return {
    prefixes: [...meta.prefixes],
    handlers: [...meta.handlers]
      .map(normalizeHandler)
      .sort((a, b) => a.methodName.localeCompare(b.methodName)),
  };
}
