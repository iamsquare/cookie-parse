/**
 * ParsedCookie interface
 */
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

/**
 * SplitString function options interface
 * @internal
 */
export interface SplitStringOptions {
  skipTrim?: boolean;
  skipFilter?: boolean;
}
