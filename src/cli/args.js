const parseArgs = () => {
  const args = process.argv;
  const res = [];
  for (let i = 2; i < args.length; i += 2) {
    res.push(`${args[i].slice(2)} is ${args[i + 1]}`);
  }
  console.log(res.join(', '));
};

parseArgs();
