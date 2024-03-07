import * as glob from "glob";
import camelCase from "camelcase";

const functionFiles = glob.sync('./api/**/*.f.js', { cwd: __dirname, ignore: './node_modules/**'});

for (let i = 0; i < functionFiles.length; i++) {
  const functionFile = functionFiles[i];

  const functionName = camelCase(
    functionFile.split('.').slice(0, -2).join().split('/').join('-')
  ); 

  if (!process.env.FUNCTION_NAME || process.env.FUNCTION_NAME === functionName) {
    const module = require(functionName);
    exports[functionName] = module.default || module;
  }
}
