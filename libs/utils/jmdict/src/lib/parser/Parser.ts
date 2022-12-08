export type Callback<T> = (
  value: T | null,
  error: Error | null
) => Promise<void>;

export abstract class Parser<T> {
  protected async initialize(): Promise<void> {}
  protected abstract parseEntry(entry: any): T;

  async parse(onEntry: Callback<T>) {
    await this.initialize();
    await this.parseFile(async (entry, error) => {
      if (error || !entry) return onEntry(null, error);

      try {
        await onEntry(this.parseEntry(entry), null);
      } catch (e) {
        await onEntry(null, e as Error);
      }
    });
  }

  protected abstract parseFile(
    onEntry: Callback<Record<string, any>>
  ): Promise<void>;
}
