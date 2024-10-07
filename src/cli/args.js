const parseArgs = () => {
  const rss_env = process.argv.slice(2);
  const argsMap = new Map();

  for (let i = 0; i < rss_env.length; i += 1) {
    const key = rss_env[i];
    const value = rss_env[i + 1];
    if (key.startsWith('--') && !value.startsWith('--')) {
      argsMap.set(key.slice(2), value);
      i += 1;
    }
  }
  const resultArr = Array.from(argsMap).map(([key, value]) => {
    return `${key} is ${value}`;
  });

  console.log(resultArr.join(', '));
};

parseArgs();
