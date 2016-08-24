var $ = require('jquery');
$.fn.transition = require('semantic-ui-transition');
$.fn.dropdown = require('semantic-ui-dropdown');

//
var actions = {
  'clone':           require('./task/clone-origin.md'),
  'link-upstream':   require('./task/link-upstream.md'),
  'list-remotes':    require('./task/list-remotes.md'),
  'create-branch':   require('./task/create-branch.md'),
  'checkout-branch': require('./task/checkout-branch.md'),
  'stage-files':     require('./task/stage-files.md'),
  'cancel-changes':  require('./task/cancel-changes.md'),
  'commit-staged':   require('./task/commit-added.md'),
  'commit-all':      require('./task/commit-all.md'),
  'push-commits':    require('./task/push-commits.md'),
  'pull-request':    require('./task/pull-request.md')
};

var getFormData = function() {
  return {
    origin: $('.js--origin-url').val(),
    upstream: $('.js--upstream-url').val(),
    branchName: $('.js--branch-name').val(),
    action: location.hash.substr(1)
  };
};

var getAllData = function() {
  var formData = getFormData();
  var md;
  var studentName;
  var repoName;

  var RE_REPO_URL = /github\.com[\/:]([-\w]+)\/([-\w]+)/;
  var sshOrigin, sshUpstream;

  md = RE_REPO_URL.exec(formData.origin);
  console.log(md);

  if(md) {
    studentName = md[1];
    repoName = md[2];

    sshOrigin = 'git@github.com:' + studentName + '/' + repoName + '.git';
    sshUpstream = 'git@github.com:htmlacademy-javascript/' + repoName + '.git';
  }

  return Object.assign({}, formData, {
    student: {
      name: studentName,
      id: ""
    },
    project: {
      name: repoName
    },
    ssh: {
      origin: sshOrigin,
      upstream: sshUpstream
    }
  });
}

var storeFormData = function(data) {
  localStorage.setItem('form-data', JSON.stringify({
    action: data.action,
    origin: data.origin,
    branchName: data.branchName
  }));
};

var loadFormData = function() {
  var data = {};

  try {
    data = JSON.parse(localStorage.getItem('form-data'));
  } catch(err) {
  }

  data = data ? data : {};

  $('.js--origin-url').val(data.origin || 'https://github.com/anonymous-raccoon/99999-code-and-magick.git');
  $('.js--branch-name').val(data.branchName || 'hello-branch');
  $('.js--action').val(data.action);
};

$(function() {
  loadFormData();

  $('.ui.dropdown').dropdown();

  $('.js--submit').click(function() {
    var action = $('.js--action').val();

    if(window.location.hash === '#' + action) {
      displayHint();
    } else {
      window.location.hash = action;
    }
  });

  var displayHint = function() {
    var action = location.hash.substr(1);
    var data = getAllData();

    var template = actions[action];

    if(template) {
      $('.js--display').show().html(template(data));
    } else {
      $('.js--display').hide();
    }

    storeFormData(getFormData());
  };

  window.addEventListener('hashchange', displayHint);

  displayHint();
});
