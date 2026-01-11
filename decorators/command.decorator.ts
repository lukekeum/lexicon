import { COMMAND_WATERMARK, COMMAND_METADATA } from '../constants';
import { getOrInitCommandMeta } from '../metadata/store';

interface CommandOptions {
  prefix: string | string[];
  //TODO: Add more options ex) add type of command (slash or message)
}

export function Command(prefix: string): ClassDecorator;
export function Command(prefix: string[]): ClassDecorator;
export function Command(
  prefixOrOptions: string | string[] | CommandOptions
): ClassDecorator {
  if (!prefixOrOptions) {
    throw new Error('Prefix is required');
  }

  const options: CommandOptions =
    typeof prefixOrOptions === 'string' || Array.isArray(prefixOrOptions)
      ? { prefix: prefixOrOptions }
      : prefixOrOptions;

  const prefixes = Array.isArray(options.prefix)
    ? options.prefix
    : [options.prefix];

  return (target: Function) => {
    Reflect.defineMetadata(COMMAND_WATERMARK, true, target);

    const meta = getOrInitCommandMeta(target);

    meta.prefixes = prefixes;
    Reflect.defineMetadata(COMMAND_METADATA, meta, target);
  };
}
