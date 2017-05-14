# torchlight2-calculator
[![Build Status](https://travis-ci.org/jojoee/torchlight2-calculator.svg)](https://travis-ci.org/jojoee/torchlight2-calculator)

Torchlight2 calculator

## Note
- Level: `100`
- Fame: `Unattainable`
- Stat points: `535`
- Skill points: `133`

## Note (dev)
- Template prefix: `xh`
- 2 way data binding design
- Reactive design
- Maximum skill points: `133`, [ref 1](http://gaming.stackexchange.com/questions/85455/maximum-number-of-skill-points-you-can-have-in-torchlight-2)
- `caches` for `ServiceWorker`
- `localforage` for `Scope` data

## Issue
```
Scope only
- have 1 deep level
- store number type (need to start with -1)
```

## Browser compatibility
- Chrome 52+

## Update
- [ ] Coverage
- [x] Support PWA (Progressive web app)
- [x] Browser compatibility
- [ ] Unit test
- [ ] E2E test
- [x] Lint
- [ ] Demo page on `gh-pages` branch
- [ ] Preset build
- [ ] Screenshot
- [ ] `min` and `max` attr of each prop (reactive)
- [ ] Update realtime (currently using `setInterval` approach from [Watch.JS](https://github.com/melanke/Watch.JS))
- [ ] Ribbon
- [ ] Query string for class / stat / skill
- [ ] Responsive
- [ ] Fix all hacks
- [ ] `manifest.json`
- [ ] Update `skill.json`
- [ ] Replace `bootstrap-grid` css with some source instead of github raw content
- [ ] Firebase integration (login / add new build)
- [ ] Implement [GoogleChrome/lighthouse](https://github.com/GoogleChrome/lighthouse)
- [ ] Implement `promise` into all
- [ ] Fetch hero builds from server
- [ ] Icon
- [ ] Icon meta

## Getting Started (dev)
1. Install Node.js
2. Install global: `npm run install -g bower yarn`
3. Install dependency: `yarn && bower install`
4. Start: `yarn run build.watch`

## Cli
```
Build: `yarn run build`
Test: `yarn run test`
```

## Reference
- Inspired + asset + data
  - [ralrom/tl2-calculator](https://github.com/ralrom/tl2-calculator)
  - [TIDBI - Torchlight II Skill Calculator](https://tidbi.ru/eng/berserker.php)
  - [Berserker Skills - Torchlight II Wiki Guide - IGN](http://www.ign.com/wikis/torchlight-2/Berserker_Skills)
- Starter project: [jojoee/gulp-starter](https://github.com/jojoee/gulp-starter)
- Template engine: [mustache](http://mustache.github.io/)
