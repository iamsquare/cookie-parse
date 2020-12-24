export interface ParsedCookie {
  name: string;
  value: string;
  domain: string;
  crossDomain: boolean;
  path: string;
  httpOnly: boolean;
  https: boolean;
  expire: number;
}
