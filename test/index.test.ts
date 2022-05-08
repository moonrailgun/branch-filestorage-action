import { save, cleanupJobs } from '../src/git';
import fs from 'fs';
import { ActionInterface } from '../src/constants';

(async () => {
  fs.writeFileSync('./now', Date.now().toString());
  const options: ActionInterface = {
    branch: 'test2',
    path: 'now',
    workspace: '.',
    // singleCommit: true,
    singleCommit: false,
  };
  const status = await save(options);

  await cleanupJobs(options);

  console.log('=====================');
  console.log('test result:');
  console.log(JSON.stringify(status));
})();
