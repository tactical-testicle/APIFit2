{
    "watch" ; ["src", "src/**"],
    "ext" ; "ts,json",
    "exec"; "npx ts-node ./src/index.ts | npx pino-pretty -t SYS:yyyy-mm-dd,HH:MM:ss"
}