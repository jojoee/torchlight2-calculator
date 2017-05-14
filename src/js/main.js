var Skills;

// app store
var Scope = {

  // stat
  statStrength: -1,
  statDexterity: -1,
  statFocus: -1,
  statVitality: -1,

  // skill
  skillP1N1: -1,
  skillP1N2: -1,
  skillP1N3: -1,
  skillP1N4: -1,
  skillP1N5: -1,
  skillP1N6: -1,
  skillP1N7: -1,
  skillP1N8: -1,
  skillP1N9: -1,
  skillP1N10: -1,

  // reactive items
  stat: -1,
  skill: -1,
};

var ReactiveItems = [
  'stat',
  'skill',
];

// hero builds
var Builds = [

];

var Config = {
  store: {
    prefix: 'tl2key-',
  },
};
[
  'scope',
].forEach(function(key) {
  Config.store[key] = Config.store.prefix + key;
});

/*================================================================ Watch
*/

var Bind = {

  update: function(name, data) {
    var $eles = $('[xbind="' + name + '"]'),
      n = $eles.length,
      i = 0;

    if (n) {
      for (i = 0; i < n; i++) {
        // hack
        $eles[i].value = data;
        $eles[i].innerHTML = data;
      }
    }
  }
};

function resetScope(val) {
  for (var key in Scope) {
    if (Scope.hasOwnProperty(key)) {
      Scope[key] = val;
    }
  }
}

/**
 * Assign value into Scope variable
 * "tmp" variable have to has same structure as Scope
 * 
 * @param {Object} tmp
 */
function assignScope(tmp) {
  for (var key in tmp) {
    if (tmp.hasOwnProperty(key)) {
      Scope[key] = tmp[key];
    }
  }
}

function updateScopeInputUi() {
  for (var key in Scope) {
    if (Scope.hasOwnProperty(key)) {
      var data = Scope[key],
        $ele = $('[xbind-input=' + key + ']');
      $ele.val(data);
    }
  }
}

/**
 * @example
 * retruns stat
 * statStrength
 * @example
 * retruns stat
 * statDexterity
 * @todo implement break
 * @param {string} prop
 * @returns {string}
 */
function getReactiveItem(prop) {
  var result = '',
    n = ReactiveItems.length,
    i = 0;

  for (i = 0; i < n; i++) {
    var rec = ReactiveItems[i];

    if (prop.length > rec.length &&
      prop.indexOf(rec) === 0) {
      result = rec;
    }
  }

  return result;
}

/**
 * @param {string} rec
 */
function updateReactiveItem(rec) {
  var result = 0;

  for (var prop in Scope) {
    if (Scope.hasOwnProperty(prop)) {
      if (prop.length > rec.length &&
        prop.indexOf(rec) === 0) {
        result += parseInt(Scope[prop]);
      }
    }
  }

  Scope[rec] = result;
}

/*================================================================ Template
*/

var Template = {

  render: function(templateSelector, items, targetSelector) {
    var source = $(templateSelector).html(),
      targetEle = $(targetSelector),
      html = '';

    items.forEach(function(item) {
      html += Mustache.render(source, item);
    });

    targetEle.html(html);
  },

  heroClass: function() {
    var items = [
      {
        id: 'berserker',
        name: 'Berserker',
      },
      {
        id: 'embermage',
        name: 'Embermage',
      },
      {
        id: 'engineer',
        name: 'Engineer',
      },
      {
        id: 'outlander',
        name: 'Outlander',
      },
    ];

    this.render('#xhhero-class', items, '#hero-switcher .classes');
  },

  heroStatus: function() {
    var items = [
      {
        id: 'strength',
        name: 'Strength',
        xbind: 'statStrength',
      },
      {
        id: 'dexterity',
        name: 'Dexterity',
        xbind: 'statDexterity',
      },
      {
        id: 'focus',
        name: 'Focus',
        xbind: 'statFocus',
      },
      {
        id: 'vitality',
        name: 'Vitality',
        xbind: 'statVitality',
      },
    ];

    this.render('#xhhero-status', items, '#hero-stat .statuses');
  },

  /**
   * @todo complete it
   */
  heroSkill: function() {
    var items = [
      {
        id: 'eviscerate',
        name: 'Eviscerate',
        xbind: 'skillP1N1',
      },
      {
        id: 'howl',
        name: 'Howl',
        xbind: 'skillP1N2',
      }
    ];

    this.render('#xhhero-skill', items, '#hero-skill .skills');
  }
};

/*================================================================ App
*/

/**
 * Getch hero builds from server
 * 
 * @todo complete it
 * @param {function} cb 
 */
function getHeroBuilds(cb) {
  // 1. Get data from cache

  // 2. Fetch new

  cb();
}

function init() {
  Template.heroClass();
  Template.heroStatus();
  Template.heroSkill();

  // start watch
  watch(Scope, function(prop, action, newValue) {
    var rec = getReactiveItem(prop);

    Bind.update(prop, Scope[prop]);    
    if (rec) {
      updateReactiveItem(rec);
    }

    localforage.setItem(Config.store.scope, Scope, function(err) {
      if (err) {
        console.log(err);
      }
    });
  });

  // watch input
  var inputs = $('[xbind-input]'),
    nInputs = inputs.length,
    i = 0;
  if (nInputs) {
    for (i = 0; i < nInputs; i++) {
      var $ele = $(inputs[i]);
      $ele.change(function() {
        var value = $(this).val(),
          dataBindProp = $(this).attr('xbind-input');

        Scope[dataBindProp] = value;
      });
    }
  }

  localforage.getItem(Config.store.scope, function(err, value) {
    if (err) {
      console.log(err);
    }

    // mark1
    // due to we set -1
    // we run this function to
    // force update UI on init state
    // console.log(value);
    if (value) {
      // need to re-assign
      // instead of "Scope = value"
      assignScope(value);
      updateScopeInputUi();
    } else {
      resetScope(0);
    }
  });
}

$.getJSON(location.origin + '/asset/skill.json', function(data) {
  Skills = data;

  // need to assign value for "watch"
  // and have to be -1 cause mark1
  resetScope(-1);
  getHeroBuilds(function() {
    init();
  });
});

// serviceWorker
if ('serviceWorker' in navigator) {
  navigator.serviceWorker
    .register('/src/js/service-worker.js')
    .then(function() {
      console.log('Service Worker Registered');
    });
}
