export const isDevMode = (currentEnv: string | undefined = process.env.NODE_ENV) => ["development", "test"].includes(currentEnv?.toLowerCase() ?? "production");
export const isProdMode = (currentEnv: string | undefined = process.env.NODE_ENV) => !isDevMode(currentEnv)
