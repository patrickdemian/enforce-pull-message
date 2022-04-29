# enforce-pull-message

Currently:
* Enforces an asana link
* Has override just in case of fire with "FIRE" in description

How?
Create a .github/workflows/main.yml with the following:

```yml
name: Check if description has Asana link or FIRE

on: 
  pull_request:
    types: [opened, reopened, synchronize, edited]

jobs:
  build:
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v3
      - name: Use Node.js v16.x
        uses: actions/setup-node@v1
        with:
          node-version: 16.x
      - name: Run enforcement
        uses: patrickdemian/enforce-pull-message@v1.0.1
```