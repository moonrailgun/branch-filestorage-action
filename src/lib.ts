import {
  exportVariable,
  info,
  notice,
  setFailed,
  setOutput,
} from '@actions/core';
import { ActionInterface, Status } from './constants';
import { extractErrorMessage } from './utils';

/**
 * Checkout file from branch
 */
export function checkout(options: ActionInterface) {
  let status: Status = Status.RUNNING;

  try {
    //

    status = Status.SUCCESS;
  } catch (error) {
    status = Status.FAILED;

    setFailed(extractErrorMessage(error));
  } finally {
    if (status === Status.FAILED) {
      notice('Save file failed! ❌');
    } else if (status === Status.SUCCESS) {
      info('Completed successfully! ✅');
    } else {
      info('Not found those file. Exiting early… 📭');
    }

    exportVariable('storage_status', status);
    setOutput('storage-status', status);
  }
}

/**
 * Save file into branch
 */
export function save(options: ActionInterface) {
  //
}
