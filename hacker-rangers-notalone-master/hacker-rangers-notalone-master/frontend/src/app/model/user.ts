export interface User {
  readonly name: string;
  readonly email: string;
  readonly status: 'alive' | 'deceased';
  readonly tags: readonly string[];
}
