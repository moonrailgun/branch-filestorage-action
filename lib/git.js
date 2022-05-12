"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.cleanupJobs = exports.save = exports.checkout = exports.checkTargetBranchExist = void 0;
const core_1 = require("@actions/core");
const constants_1 = require("./constants");
const utils_1 = require("./utils");
const once_1 = __importDefault(require("lodash/once"));
const io_1 = require("@actions/io");
const fs_extra_1 = __importDefault(require("fs-extra"));
const path_1 = __importDefault(require("path"));
const authorName = 'filestorage-action';
const authorEmail = 'filestorage-action@users.noreply.github.com';
const gitAuthor = `${authorName} <${authorEmail}>`;
const init = (0, once_1.default)((options) => __awaiter(void 0, void 0, void 0, function* () {
    (0, core_1.info)('Start check branch');
    try {
        yield (0, utils_1.execute)(`git config --global --add safe.directory "${options.workspace}"`, options.workspace);
    }
    catch (_a) {
        (0, core_1.info)('Unable to set workspace as a safe directory…');
    }
    yield (0, utils_1.execute)(`git config core.ignorecase false`, options.workspace);
}));
/**
 * check storage branch exist
 */
function checkTargetBranchExist(options) {
    return __awaiter(this, void 0, void 0, function* () {
        const repositoryPath = (0, utils_1.generateRepositoryPath)(options);
        return Boolean((yield (0, utils_1.execute)(`git ls-remote --heads ${repositoryPath} refs/heads/${options.branch}`, options.workspace)).stdout);
    });
}
exports.checkTargetBranchExist = checkTargetBranchExist;
const temporaryStorageDirectory = '.branch-filestorage-action-temp';
function checkout(options) {
    return __awaiter(this, void 0, void 0, function* () {
        yield init(options);
        const branchExists = yield checkTargetBranchExist(options);
        if (!branchExists) {
            (0, core_1.info)('Target branch has not been create, skipped');
            return constants_1.Status.SKIPPED;
        }
        yield generateWorktree(options, branchExists);
        try {
            yield (0, utils_1.execute)(`cp -f ${temporaryStorageDirectory}/${options.path} ${options.path}`, options.workspace);
            return constants_1.Status.SUCCESS;
        }
        catch (err) {
            console.error(err);
            return constants_1.Status.SKIPPED;
        }
    });
}
exports.checkout = checkout;
/**
 * Save file into worktree
 */
function save(options) {
    return __awaiter(this, void 0, void 0, function* () {
        yield init(options);
        const branchExists = yield checkTargetBranchExist(options);
        yield generateWorktree(options, branchExists);
        // await execute(
        //   `cp -f ${options.path} ${temporaryStorageDirectory}/${options.path}`,
        //   options.workspace
        // );
        yield fs_extra_1.default.copy(path_1.default.resolve(options.workspace, options.path), path_1.default.resolve(options.workspace, temporaryStorageDirectory, `./${options.path}`), {
            overwrite: true,
            recursive: true,
        });
        if (options.singleCommit) {
            yield (0, utils_1.execute)(`git add --all .`, `${options.workspace}/${temporaryStorageDirectory}`);
        }
        // Use git status to check if we have something to commit.
        // Special case is singleCommit with existing history, when
        // we're really interested if the diff against the upstream branch
        // changed.
        const checkGitStatus = branchExists && options.singleCommit
            ? `git diff origin/${options.branch}`
            : `git status --porcelain`;
        (0, core_1.info)(`Checking if there are files to commit…`);
        const hasFilesToCommit = Boolean((yield (0, utils_1.execute)(checkGitStatus, `${options.workspace}/${temporaryStorageDirectory}`, true // This output is always silenced due to the large output it creates.
        )).stdout);
        if (!options.singleCommit && !hasFilesToCommit) {
            // No file changed
            return constants_1.Status.SKIPPED;
        }
        // Commits to GitHub.
        yield (0, utils_1.execute)(`git add --all .`, `${options.workspace}/${temporaryStorageDirectory}`);
        yield (0, utils_1.execute)(`git commit -m "update filestorage at ${new Date().toISOString()}" --quiet --no-verify --author="${gitAuthor}"`, `${options.workspace}/${temporaryStorageDirectory}`);
        (0, core_1.info)(`Force-pushing changes...`);
        yield (0, utils_1.execute)(`git push --force origin ${options.branch}`, `${options.workspace}/${temporaryStorageDirectory}`);
        (0, core_1.info)(`Changes committed to the ${options.branch} branch… 📦`);
        return constants_1.Status.SUCCESS;
    });
}
exports.save = save;
/**
 * clean jobs
 */
function cleanupJobs(options) {
    return __awaiter(this, void 0, void 0, function* () {
        yield (0, utils_1.execute)(`chmod -R +rw ${temporaryStorageDirectory}`, options.workspace);
        yield (0, utils_1.execute)(`git worktree remove ${temporaryStorageDirectory} --force`, options.workspace);
        yield (0, utils_1.execute)(`git branch -D ${options.branch}`, options.workspace);
        yield (0, io_1.rmRF)(temporaryStorageDirectory);
    });
}
exports.cleanupJobs = cleanupJobs;
/**
 * generate worktree
 */
function generateWorktree(options, branchExists) {
    return __awaiter(this, void 0, void 0, function* () {
        (0, core_1.info)('Creating worktree…');
        if (branchExists) {
            yield (0, utils_1.execute)(`git fetch --no-recurse-submodules --depth=1 origin ${options.branch}`, options.workspace);
        }
        yield (0, utils_1.execute)(`git worktree add --no-checkout --detach ${temporaryStorageDirectory}`, options.workspace);
        const checkout = new GitCheckout(options.branch);
        if (branchExists) {
            // There's existing data on the branch to check out
            checkout.commitish = `origin/${options.branch}`;
        }
        if (!branchExists ||
            (options.singleCommit && options.branch !== process.env.GITHUB_REF_NAME)) {
            /* Create a new history if we don't have the branch, or if we want to reset it.
              If the ref name is the same as the branch name, do not attempt to create an orphan of it. */
            checkout.orphan = true;
        }
        yield (0, utils_1.execute)(checkout.toString(), `${options.workspace}/${temporaryStorageDirectory}`);
        yield (0, utils_1.execute)(`git config user.name "${authorName}"`, `${options.workspace}/${temporaryStorageDirectory}`);
        yield (0, utils_1.execute)(`git config user.email "${authorEmail}"`, `${options.workspace}/${temporaryStorageDirectory}`);
        if (!branchExists) {
            (0, core_1.info)(`Created the ${options.branch} branch… 🔧`);
            // Our index is in HEAD state, reset
            yield (0, utils_1.execute)('git reset --hard', `${options.workspace}/${temporaryStorageDirectory}`);
            if (!options.singleCommit) {
                // New history isn't singleCommit, create empty initial commit
                yield (0, utils_1.execute)(`git commit --no-verify --allow-empty -m "Initial ${options.branch} commit" --author="${gitAuthor}"`, `${options.workspace}/${temporaryStorageDirectory}`);
            }
        }
    });
}
class GitCheckout {
    constructor(branch) {
        this.orphan = false;
        this.commitish = null;
        this.branch = branch;
    }
    toString() {
        return [
            'git',
            'checkout',
            this.orphan ? '--orphan' : '-B',
            this.branch,
            this.commitish || '',
        ].join(' ');
    }
}
