# personal-website

[![CI - Smoke tests](https://github.com/omarnurow-dotcom/personal-website/actions/workflows/ci.yml/badge.svg)](https://github.com/omarnurow-dotcom/personal-website/actions)

This repository contains the source for Omar's personal website (static HTML/CSS/JS).

The repository includes a GitHub Actions workflow that runs quick smoke tests on every push and pull request. The badge above shows the current status of that workflow.

To run the site locally:

```bash
python3 -m http.server 8000
# then open http://localhost:8000
```
