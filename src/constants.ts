import { getBooleanInput, getInput } from '@actions/core';
import { isNullOrUndefined } from './utils';

export interface ActionInterface {
  /**
   * The branch that the action should deploy to.
   *
   * @default "actions/filedb
   */
  branch: string;

  /**
   * File or Folder path for storage
   */
  path: string;

  /**
   * Token for github
   */
  token?: string;

  /**
   * The folder where your deployment project lives.
   */
  workspace: string;

  /**
   * Keep history only one commit
   */
  singleCommit?: boolean;
}

export const action: ActionInterface = {
  branch: getInput('branch'),
  path: getInput('path'),
  token: getInput('token'),
  workspace: getInput('workspace') || process.env.GITHUB_WORKSPACE || '.',
  singleCommit: !isNullOrUndefined(getInput('single-commit'))
    ? getInput('single-commit').toLowerCase() === 'true'
    : false,
};

/** Status codes for the action. */
export enum Status {
  SUCCESS = 'success',
  FAILED = 'failed',
  SKIPPED = 'skipped',
  RUNNING = 'running',
}
