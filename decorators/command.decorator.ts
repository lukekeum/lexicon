import { COMMAND_WATERMARK, COMMAND_METADATA } from '../constants';
import { getOrInitCommandMeta } from '../metadata/store';

type SlashCommand = {
  type?: 'slash';
  prefix: string;
  description: string;
};

type TextCommand = {
  type: 'text';
  prefix: string | string[];
  description?: string;
};

type CommandOptions = SlashCommand | TextCommand;

export function Command(prefix: string): ClassDecorator;
export function Command(prefix: string[]): ClassDecorator;
export function Command(options: CommandOptions): ClassDecorator;
export function Command(
  prefixOrOptions: string | string[] | CommandOptions
): ClassDecorator {
  if (!prefixOrOptions) throw new Error('Prefix is required');

  let options: CommandOptions;

  if (typeof prefixOrOptions === 'string') {
    options = { type: 'slash', prefix: prefixOrOptions, description: '' };
  } else if (Array.isArray(prefixOrOptions)) {
    if (prefixOrOptions.length === 0) throw new Error('Prefix is required');
    options = { type: 'text', prefix: prefixOrOptions };
  } else {
    options = prefixOrOptions;
  }

  const type = options.type ?? 'slash';
  const prefixes = Array.isArray(options.prefix)
    ? options.prefix
    : [options.prefix];
  const description =
    'description' in options ? options.description : options.description ?? '';

  if (type === 'slash' && prefixes.length !== 1) {
    throw new Error('Slash command must have a single prefix/name');
  }

  return (target: Function) => {
    Reflect.defineMetadata(COMMAND_WATERMARK, true, target);

    const meta = getOrInitCommandMeta(target);
    meta.prefixes = prefixes;
    meta.type = type;
    meta.description = description;
    Reflect.defineMetadata(COMMAND_METADATA, meta, target);
  };
}
