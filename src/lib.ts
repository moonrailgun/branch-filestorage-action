import {
  exportVariable,
  info,
  notice,
  setFailed,
  setOutput,
} from '@actions/core';
import { ActionInterface, Status } from './constants';
import { checkout, checkTargetBranchExist, cleanupJobs, save } from './git';
import { extractErrorMessage } from './utils';

/**
 * Checkout file from branch
 */
export async function runCheckout(options: ActionInterface) {
  let status: Status = Status.RUNNING;

  try {
    status = await checkout(options);

    if (status === Status.SUCCESS) {
      await cleanupJobs(options);
    }
  } catch (error) {
    status = Status.FAILED;

    setFailed(extractErrorMessage(error));
  } finally {
    if (status === Status.FAILED) {
      notice('Checkout file failed! ❌');
    } else if (status === Status.SUCCESS) {
      info('Checkout Completed successfully! ✅');
    } else {
      info('Exiting early… 📭');
    }

    exportVariable('storage_checkout_status', status);
    setOutput('storage-checkout-status', status);
  }
}

/**
 * Save file into branch
 */
export async function runSave(options: ActionInterface) {
  let status: Status = Status.RUNNING;

  try {
    status = await save(options);

    if (status === Status.SUCCESS) {
      await cleanupJobs(options);
    }
  } catch (error) {
    status = Status.FAILED;

    setFailed(extractErrorMessage(error));
  } finally {
    if (status === Status.FAILED) {
      notice('Save file failed! ❌');
    } else if (status === Status.SUCCESS) {
      info('Save Completed successfully! ✅');
    } else {
      info('Exiting early… 📭');
    }

    exportVariable('storage_save_status', status);
    setOutput('storage-save-status', status);
  }
}
