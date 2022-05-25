## branch-filestorage-action

Save your file into github branch and checkout

Make your github repo as a file database.

Inspired by [JamesIves/github-pages-deploy-action](https://github.com/JamesIves/github-pages-deploy-action)


## Get Start

You can sample run actions before read file and update it.

And will auto update into branch when everything is completed.

```yaml
name: Tests

on:
  workflow_dispatch:

jobs:
  test:
    timeout-minutes: 60
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v2
    - name: Checkout date
      uses: moonrailgun/branch-filestorage-action@v1.2.2
      with:
        path: date
    - name: Read and show
      run: cat date
    - name: update date
      run: echo $(date) > date
```

## Params

For more detail, checkout [action.yaml](action.yaml)
