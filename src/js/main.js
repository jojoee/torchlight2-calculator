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

var Build = {

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

function resetScope() {
  for (var key in Scope) {
    if (Scope.hasOwnProperty(key)) {
      Scope[key] = 0;
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

function init() {
  Build.heroClass();
  Build.heroStatus();
  Build.heroSkill();

  // start watch
  watch(Scope, function(prop, action, newValue) {
    var rec = getReactiveItem(prop);

    Bind.update(prop, Scope[prop]);

    if (rec) {
      updateReactiveItem(rec);
    }
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

  resetScope();
}

$.getJSON(location.href + 'asset/skill.json', function(data) {
  Skills = data;
  init();
});
