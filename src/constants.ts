import { getInput } from '@actions/core';

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

  singleCommit?: boolean;
}

export const action: ActionInterface = {
  branch: getInput('branch'),
  path: getInput('path'),
  token: getInput('token'),
  workspace: getInput('workspace') || process.env.GITHUB_WORKSPACE || '.',
};

/** Status codes for the action. */
export enum Status {
  SUCCESS = 'success',
  FAILED = 'failed',
  SKIPPED = 'skipped',
  RUNNING = 'running',
}
