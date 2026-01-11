export type ParamMeta = argMeta | ctxMeta | optionMeta;

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

interface optionMeta {
  kind: 'option';
  name: string;
  index: number;
  required?: boolean;
  description?: string;
  choices?: ChoiceItem[];
  autocomplete?: AutocompleteMeta;
}

export type ChoiceItem = {
  name: string;
  value: string | number;
};

export type AutocompleteMeta = {
  provider: new (...args: any[]) => any;
  method: string;
};

export interface CommandMeta {
  handlers: HandlerMeta[];
  prefixes: string[];
  type: 'slash' | 'text';
  description?: string;
}

type HandlerRouteMeta = {
  subcommand?: string;
};

type HandlerMeta = {
  methodName: string;
  params: ParamMeta[];
  route?: HandlerRouteMeta;
  pending?: PendingDecoratorMeta[];
};

export type PendingDecoratorMeta =
  | {
      kind: 'choice';
      index: number;
      choices: Array<
        string | number | { name: string; value: string | number }
      >;
    }
  | {
      kind: 'autocomplete';
      index: number;
      provider: new (...args: any[]) => any;
      method: string;
    };
