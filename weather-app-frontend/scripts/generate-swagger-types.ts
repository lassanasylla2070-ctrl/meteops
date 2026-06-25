import { config } from 'dotenv';
import { promises } from 'fs';
import { generateApi } from 'swagger-typescript-api';
config({ path: '.env.development' });

const { REACT_APP_API_URL } = process.env;

(async () => {
  const url = REACT_APP_API_URL?.slice(0, REACT_APP_API_URL.length - 3) + '-json';
  const sourceFile = await generateApi({
    name: 'api-types.ts',
    url,
    generateClient: false,
  });
  await promises.writeFile('src/types/api-types.ts', sourceFile);
})();
