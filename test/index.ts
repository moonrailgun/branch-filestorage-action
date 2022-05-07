import { checkTargetBranchExist } from '../src/git';

checkTargetBranchExist({
  branch: 'master',
  path: 'README.md',
  workspace: '.',
});
