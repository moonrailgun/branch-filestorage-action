import { info } from '@actions/core';
import { ActionInterface } from './constants';
import { execute } from './utils';
import { once } from 'lodash-es';

const init = once(async (options: ActionInterface) => {
  info('Start check branch');

  try {
    await execute(
      `git config --global --add safe.directory "${options.workspace}"`,
      options.workspace
    );
  } catch {
    info('Unable to set workspace as a safe directory…');
  }

  await execute(`git config user.name "filestorage-action"`, options.workspace);

  await execute(
    `git config user.email "filestorage-action@@users.noreply.github.com"`,
    options.workspace
  );

  await execute(`git config core.ignorecase false`, options.workspace);
});

export async function checkTargetBranchExist(options: ActionInterface) {
  // TODO
  console.log((await execute('git', options.workspace)).stdout);
}

/**
 * check storage branch exist
 */
export function checkout(options: ActionInterface) {
  // TODO
  // init(options);
}
