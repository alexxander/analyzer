import saxpath from 'saxpath';
import fs from 'fs';
import zlib from 'zlib';
import sax from 'sax';
import * as xml2js from 'xml2js';
import { Callback, Parser } from './Parser';

export type Entity = [string, string];

export abstract class DictParser<T> extends Parser<T> {
  private entities: Record<string, string> = {};

  protected constructor(
    private readonly path: string,
    private readonly entryPath: string
  ) {
    super();
  }

  async parse(onEntry: Callback<T>) {
    await this.loadEntities();
    await super.parse(onEntry);
  }

  private async loadEntities() {
    this.entities = Object.fromEntries(
      await new Promise<Entity[]>((resolve, reject) => {
        const stream = fs.createReadStream(this.path).pipe(zlib.createGunzip());

        stream.on('end', () => {
          resolve(entities);
        });
        stream.on('error', (err) => {
          reject(err);
        });

        let prevSuffix = '';
        const entities: Entity[] = [];
        stream.on('data', (chunk) => {
          const data = prevSuffix + chunk.toString();
          const lines = data.split('\n');
          prevSuffix = lines.pop()!;

          const chunkEntities: Entity[] = lines
            .filter((item) => item.startsWith('<!ENTITY'))
            .map((item) => {
              const m = item.match(/<!ENTITY ([a-zA-Z0-9_-]+) "(.*)">/)!;
              return [m[1], m[2]];
            });
          if (chunkEntities.length === 0) {
            resolve(entities);
            stream.destroy();
          }
          entities.push(...chunkEntities);
        });
      })
    );
  }

  protected async parseFile(
    onEntry: Callback<Record<string, any>>
  ): Promise<void> {
    return await new Promise<void>((resolve, reject) => {
      const saxStream = sax.createStream(false);
      const saxStreamer = new saxpath.SaXPath(saxStream, this.entryPath);
      const stream = fs.createReadStream(this.path, { highWaterMark: 500 });
      stream.pipe(zlib.createGunzip()).pipe(saxStream);

      let concurrentMatches = 0;
      saxStreamer.on('match', async (data: any) => {
        concurrentMatches++;

        if (!stream.isPaused()) stream.pause();
        try {
          const parser = new xml2js.Parser({ strict: false });
          await onEntry(await parser.parseStringPromise(data), null);
        } catch (e) {
          await onEntry(null, e as Error);
        }
        concurrentMatches--;
        if (stream.isPaused() && concurrentMatches === 0) stream.resume();
      });

      saxStream.on('end', () => {
        resolve();
      });
      saxStream.on('error', (err) => {
        reject(err);
      });
    });
  }

  protected parseEntities(entities: string[]) {
    const parseEntity = (entity: string) => {
      const code = entity.replace('∫', '&int;').replace(/[&;]/g, '');
      if (!this.entities[code])
        throw new Error(`Could not resolve entity "${entity}"`);

      return { code, value: this.entities[code] };
    };

    return entities?.map(parseEntity) ?? [];
  }
}
