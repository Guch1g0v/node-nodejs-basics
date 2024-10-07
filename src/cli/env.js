const parseEnv = () => {
  const rss_env = Object.keys(process.env).filter((env) => env.startsWith('RSS_'));
  const resultArr = rss_env.map((key) => {
    return `${key}=${process.env[key]}`;
  });
  console.log(resultArr.join('; '));
};

parseEnv();
