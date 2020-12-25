export interface ParsedCookie {
  name: string;
  value: string;
  domain?: string;
  crossDomain?: boolean;
  path?: string;
  httpOnly?: boolean;
  secure?: boolean;
  https?: boolean;
  expires?: number;
  maxAge?: number;
  sameSite?: string;
  extension?: string[];
}
