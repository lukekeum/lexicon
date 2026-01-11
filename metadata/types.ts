export type ParamMeta = argMeta | ctxMeta;

interface argMeta {
  kind: 'arg';
  index: number;
  name: string;
  hint: boolean;
  display?: string;
  description?: string;
}

interface ctxMeta {
  kind: 'ctx';
  index: number;
}

export interface HandlerMeta {
  methodName: string;
  pattern?: string[];
  params: ParamMeta[];
}

export interface CommandMeta {
  handlers: HandlerMeta[];
  prefixes: string[];
}
