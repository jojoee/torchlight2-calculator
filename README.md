# torchlight2-calculator
[![Build Status](https://travis-ci.org/jojoee/torchlight2-calculator.svg)](https://travis-ci.org/jojoee/torchlight2-calculator)

Torchlight2 calculator

## Note
- Level: 100
- Fame: Unattainable
- Stat points: 535
- Skill points: 133

## Note (dev)
- Xbind prefix: x
- Xbind-input prefix: xi
- Template prefix: xh
- 2 way data binding design
- Reactive design

## Issue
```
`Scope` only
- have 1 deep level
- store number type (need to start with -1)
```

## Update
- [ ] Coverage
- [ ] Support PWA (Progressive web app)
- [ ] Browser compatibility testing
- [ ] Unit test
- [ ] E2E test
- [ ] Demo page on `gh-pages` branch
- [ ] Preset build
- [ ] Screenshot
- [ ] Ribbon
- [ ] Query string for class / stat / skill
- [ ] Responsive
- [ ] Fix all hacks
- [ ] Recheck `skill.json`
- [ ] Replace `bootstrap-grid` css with some source instead of github raw content
- Firebase integration
  - [ ] Login
  - [ ] User can support own build

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
- Inspired and asset from: [ralrom/tl2-calculator](https://github.com/ralrom/tl2-calculator)
- Starter project: [jojoee/gulp-starter](https://github.com/jojoee/gulp-starter)
- Template engine: [mustache](http://mustache.github.io/)
