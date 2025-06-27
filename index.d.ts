declare module "bcryptjs" {
  export function genSaltSync(rounds?: number): string;
  export function hashSync(password: string, salt: string): string;
  export function compareSync(password: string, hash: string): boolean;
}

declare module "../constant/err.type" {
  export const userFormateError: {
    code: number;
    message: string;
    result: string;
  };
  export const userAlreadyExistError: {
    code: number;
    message: string;
    result: string;
  };
  export const userRegisterError: {
    code: number;
    message: string;
    result: string;
  };
  export const userNotExistError: {
    code: number;
    message: string;
    result: string;
  };
  export const invalidPasswordError: {
    code: number;
    message: string;
    result: string;
  };
  export const userLoginError: {
    code: number;
    message: string;
    result: string;
  };
}
