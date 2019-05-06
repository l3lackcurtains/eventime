// auto importing console bug fix

declare module "console" {
  export = typeof import("console");
}
