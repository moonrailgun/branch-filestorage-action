import { exec } from '@actions/exec';
import buffer from 'buffer';

export const extractErrorMessage = (error: unknown): string => {
  return error instanceof Error
    ? error.message
    : typeof error == 'string'
    ? error
    : JSON.stringify(error);
};

/* Utility function that checks to see if a value is undefined or not.
  If allowEmptyString is passed the parameter is allowed to contain an empty string as a valid parameter. */
export const isNullOrUndefined = (value: unknown): boolean =>
  typeof value === 'undefined' || value === null || value === '';

interface ExecuteOutput {
  stdout: string;
  stderr: string;
}

const output: ExecuteOutput = { stdout: '', stderr: '' };

/** Wrapper around the GitHub toolkit exec command which returns the output.
 * Also allows you to easily toggle the current working directory.
 *
 * @param {string} cmd - The command to execute.
 * @param {string} cwd - The current working directory.
 * @param {boolean} silent - Determines if the in/out should be silenced or not.
 * @param {boolean} ignoreReturnCode - Determines whether to throw an error
 * on a non-zero exit status or to leave implementation up to the caller.
 */
export async function execute(
  cmd: string,
  cwd: string,
  silent = false,
  ignoreReturnCode = false
): Promise<ExecuteOutput> {
  output.stdout = '';
  output.stderr = '';

  await exec(cmd, [], {
    // Silences the input unless the INPUT_DEBUG flag is set.
    silent,
    cwd,
    listeners: { stdout, stderr },
    ignoreReturnCode,
  });

  return Promise.resolve(output);
}

function stdout(data: Buffer | string): void {
  const dataString = data.toString().trim();
  if (
    output.stdout.length + dataString.length <
    buffer.constants.MAX_STRING_LENGTH
  ) {
    output.stdout += dataString;
  }
}

function stderr(data: Buffer | string): void {
  const dataString = data.toString().trim();
  if (
    output.stderr.length + dataString.length <
    buffer.constants.MAX_STRING_LENGTH
  ) {
    output.stderr += dataString;
  }
}
