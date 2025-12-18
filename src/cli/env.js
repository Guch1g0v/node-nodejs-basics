const parseEnv = () => {
  const prefix = 'RSS_';
  const envVarsWithPrefix = Object.entries(process.env)
    .filter(([key]) => key.startsWith(prefix));
  const formattedEnvPairsStr = envVarsWithPrefix
    .map(([key, value]) => `${key}=${value}`).join(';');
    
  console.log(formattedEnvPairsStr);
};

parseEnv();
