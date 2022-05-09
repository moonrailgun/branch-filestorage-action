import fs from 'fs';
import { ActionInterface } from '../src/constants';
import { runCheckout, runSave } from '../src/lib';

const options: ActionInterface = {
  branch: 'test2',
  path: 'now',
  workspace: '.',
  // singleCommit: true,
  singleCommit: false,
};

async function testCheckout() {
  const status = await runCheckout(options);

  console.log('=====================');
  console.log('test result:');
  console.log(JSON.stringify(status));
}

async function testSave() {
  fs.writeFileSync('./now', Date.now().toString());
  const status = await runSave(options);

  console.log('=====================');
  console.log('test result:');
  console.log(JSON.stringify(status));
}

testCheckout();
// testSave();
