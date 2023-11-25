const trace = (tracePrefix: string, ...args: any[]) => {
  const stringifiedLog = args.reduce((prevLog, currLog) => {
    let logStr = "";
    try {
      logStr = JSON.stringify(currLog);
    } catch (err) {
      // pass
    } finally {
      return logStr ? `${prevLog}\t${logStr}` : prevLog;
    }
  }, "");
  console.log(tracePrefix, JSON.stringify(args));
};

const traceStoreAction = (...msg: any[]) => {
  trace("STORE_ACTION", msg);
};

const traceCallback = (...msg: any[]) => {
  trace("CALLBACK", msg);
};

export { traceStoreAction, traceCallback };
