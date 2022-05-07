import { save } from '../src/git';
import fs from 'fs';

(async () => {
  fs.writeFileSync('./now', Date.now().toString());
  const status = await save({
    branch: 'test1',
    path: 'now',
    workspace: '.',
    singleCommit: true,
  });

  console.log('=====================');
  console.log('test result:');
  console.log(JSON.stringify(status));
})();
