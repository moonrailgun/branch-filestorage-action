import { getBooleanInput, getInput } from '@actions/core';
import { isNullOrUndefined, stripProtocolFromUrl } from './utils';
import * as github from '@actions/github';

const { repository } = github.context.payload;

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

  /** The hostname of which the GitHub Workflow is being run on, ie: github.com */
  hostname?: string;

  /** The repository path, for example JamesIves/github-pages-deploy-action. */
  repositoryName?: string;

  /**
   * Keep history only one commit
   */
  singleCommit?: boolean;

  /** Defines an SSH private key that can be used during deployment. This can also be set to true to use SSH deployment endpoints if you've already configured the SSH client outside of this package. */
  sshKey?: string | boolean | null;
}

export const action: ActionInterface = {
  branch: getInput('branch'),
  path: getInput('path'),
  token: getInput('token'),
  workspace: getInput('workspace') || process.env.GITHUB_WORKSPACE || '.',
  repositoryName: !isNullOrUndefined(getInput('repository-name'))
    ? getInput('repository-name')
    : repository && repository.full_name
    ? repository.full_name
    : process.env.GITHUB_REPOSITORY,
  singleCommit: !isNullOrUndefined(getInput('single-commit'))
    ? getInput('single-commit').toLowerCase() === 'true'
    : false,
  hostname: process.env.GITHUB_SERVER_URL
    ? stripProtocolFromUrl(process.env.GITHUB_SERVER_URL)
    : 'github.com',
  sshKey: isNullOrUndefined(getInput('ssh-key'))
    ? false
    : !isNullOrUndefined(getInput('ssh-key')) &&
      getInput('ssh-key').toLowerCase() === 'true'
    ? true
    : getInput('ssh-key'),
};

/** Status codes for the action. */
export enum Status {
  SUCCESS = 'success',
  FAILED = 'failed',
  SKIPPED = 'skipped',
  RUNNING = 'running',
}
