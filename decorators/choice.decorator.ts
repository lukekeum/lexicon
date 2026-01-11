import { getOrInitHandlerMeta } from '../metadata/store';

type ChoiceInput = string | number | { name: string; value: string | number };

export function Choice(choices: ChoiceInput[]): ParameterDecorator {
  if (!Array.isArray(choices) || choices.length === 0) {
    throw new Error('@Choice requires a non-empty array');
  }

  const normalized = choices.map((c) =>
    typeof c === 'string' || typeof c === 'number'
      ? { name: String(c), value: c }
      : c
  );

  return (target, propertyKey, parameterIndex) => {
    if (!propertyKey) {
      throw new Error('@Choice cannot be used on constructor parameters');
    }

    const ctor = target.constructor;
    const handlerMeta = getOrInitHandlerMeta(ctor, propertyKey.toString());

    handlerMeta.pending ??= [];
    handlerMeta.pending.push({
      kind: 'choice',
      index: parameterIndex,
      choices: normalized,
    });
  };
}
