var projectsJsonLink = "https://raw.githubusercontent.com/MarcoRob/marcorob.github.io/Develop/projects.json";

var Page = React.createClass({
  displayName: 'Page',

  getInitialState: function getInitialState() {
    return {
      tabs: ['Me', 'Skills', 'Projects', 'Contact'],
      filters: [{
        name: "all",
        checked: true
      }],
      setOpacity: false,
      projects: [],
      filteredProjects: [],
      socialChannels: [{
        name: 'github',
        iconClass: 'github',
        URL: "https://github.com/marcorob"
      }, {
        name: 'linkedin',
        iconClass: 'linkedin',
        URL: "https://www.linkedin.com/in/marcoantoniorob/"
      }]
    };
  },
  render: function render() {
    return React.createElement(
      'div',
      { className: 'page' },
      React.createElement(Tabs, { tabs: this.state.tabs }),
      React.createElement(
        'div',
        { className: 'pages' },
        React.createElement(Me, { getHeader: this.getHeader }),
        React.createElement(Skills, { getHeader: this.getHeader }),
        React.createElement(Projects, { getHeader: this.getHeader, projects: this.state.filteredProjects, filters: this.state.filters, handleFilterClick: this.handleFilterClick, setOpacity: this.state.setOpacity }),
        React.createElement(Contact, { getHeader: this.getHeader, socialChannels: this.state.socialChannels })
      ),
      React.createElement(Footer, null)
    );
  },
  handleFilterClick: function handleFilterClick(clickedIndex) {
    debugger;
    var filts = this.state.filters;
    filts[clickedIndex].checked = !filts[clickedIndex].checked;

    var optionNamedAll = filts.find(function (f) {
      return f.name == 'all';
    });

    if (filts[clickedIndex].name != 'all') {
      optionNamedAll.checked = false;
    } else {
      filts.forEach(function (f) {
        if (f.name != 'all') {
          f.checked = false;
        }
      });
    }

    var projects = this.state.projects;
    var filtered = getFilteredProjects(projects, filts.filter(function (f) {
      return f.checked;
    }));

    this.setState({
      filters: filts,
      filteredProjects: filtered,
      setOpacity: true
    });

    function getFilteredProjects(projects, filters) {
      projects.forEach(function (p) {
        return p.setOpacity = true;
      });
      if (filters.length == 0) return [];

      var filteredProjects = [];
      var OptionNamedAllIsNotChecked = !filters.find(function (f) {
        return f.name == 'all';
      });
      if (OptionNamedAllIsNotChecked) {
        filters.forEach(function (f) {
          projects.forEach(function (p) {
            if (p.tags.indexOf(f.name) != -1 && !filteredProjects.find(function (fp) {
              return fp.title == p.title;
            })) {
              filteredProjects.push(p);
            }
          });
        });
        return filteredProjects;
      }
      return projects;
    }
  },
  getHeader: function getHeader(tabName) {
    return React.createElement(
      'div',
      { className: 'header-title', id: 'header_' + tabName },
      React.createElement(
        'h2',
        null,
        tabName
      ),
      React.createElement('hr', null)
    );
  },
  componentDidMount: function componentDidMount() {
    var _this = this;

    $.get(projectsJsonLink, function (p) {
      var projects = JSON.parse(p);
      _this.setState({
        projects: projects,
        filteredProjects: projects
      });
    });
  }

});

var Tabs = React.createClass({
  displayName: 'Tabs',


  render: function render() {
    var _this2 = this;

    var tabs = this.props.tabs;
    return React.createElement(
      'div',
      { className: ' tab row' },
      React.createElement(
        'div',
        { className: 'col s12' },
        React.createElement(
          'ul',
          { className: 'tabs' },
          tabs.map(function (t, i) {
            return React.createElement(
              'li',
              { key: i, className: 'tab col s3' },
              React.createElement(
                'a',
                { href: '#tab' + t, onClick: _this2.scrollTo.bind(_this2, t) },
                t
              )
            );
          })
        )
      )
    );
  },
  scrollTo: function scrollTo(dest) {
    $('html, body').animate({
      scrollTop: $("#" + dest).offset().top - 65
    }, 1000);
  },
  componentDidMount: function componentDidMount() {
    function height(selector) {
      return $(selector).offset().top - window.innerHeight / 2;
    }

    function moveToTab(tabName) {
      $('ul.tabs').tabs('select_tab', 'tab' + tabName);
    }

    var previousTab;
    var tabs = this.props.tabs;

    $(window).scroll(function () {
      var currentHeight = $(document).scrollTop();
      var tabContentHeights = tabs.map(function (t) {
        return height('#' + t);
      });
      for (var i = tabs.length - 1; i >= 0; i--) {
        if (currentHeight > tabContentHeights[i]) {
          if (previousTab != tabs[i]) {
            moveToTab(tabs[i]);
            previousTab = tabs[i];
          }
          break;
        }
      }
    });
  }
});

var Me = React.createClass({
  displayName: 'Me',

  render: function render() {
    var arr = Array.apply(null, Array(15));
    return React.createElement(
      'div',
      { className: 'me', id: 'Me' },
      this.props.getHeader("Me"),
      React.createElement(
        'div',
        { className: 'row' },
        React.createElement(
          'div',
          { className: 'col m4 s11 myPhoto' },
          React.createElement('img', { src: 'https://avatars1.githubusercontent.com/u/10890612?s=460&v=4', alt: '', className: 'circle responsive-img' })
        )
      ),
      React.createElement(
        'div',
        { className: 'row title-container' },
        React.createElement(
          'div',
          { className: 'title' },
          React.createElement(
            'h4',
            null,
            'Marco Robles'
          ),
          React.createElement('hr', null),
          React.createElement(
            'h4',
            null,
            'Front End / Full Stack Developer'
          )
        )
      )
    );
  }
});

var Skills = React.createClass({
  displayName: 'Skills',

  render: function render() {
    var arr = Array.apply(null, Array(2));
    return React.createElement(
      'div',
      { className: 'Skills force-skills', id: 'Skills' },
      this.props.getHeader("Skills")
    );
  }
});

var Projects = React.createClass({
  displayName: 'Projects',

  handleFilterClick: function handleFilterClick(clickedIndex) {
    debugger;
    this.props.handleFilterClick(clickedIndex);
  },
  render: function render() {
    var _this3 = this;

    var cardStyle = {};
    var filtBtnStyle = {};

    if (this.props.setOpacity) {
      cardStyle.opacity = 1;
    }
    if (isMobileScreen()) {
      filtBtnStyle.minWidth = "100%";
    }
    return React.createElement(
      'div',
      { className: 'row', id: 'Projects' },
      this.props.getHeader("Projects"),
      React.createElement(
        'div',
        { className: 'projects-filter' },
        this.props.filters.map(function (f, i) {
          return React.createElement(
            'button',
            { style: filtBtnStyle, onClick: _this3.handleFilterClick.bind(_this3, i), className: "btn waves-effect waves-light cyan" + (f.checked ? "" : " lighten-4") },
            f.name,
            ' \xA0',
            React.createElement('i', { className: "fa  fa-" + (f.checked ? "check-circle" : "circle") })
          );
        })
      ),
      React.createElement(
        'div',
        { className: 'projects row' },
        React.createElement(
          'ul',
          { id: 'ProjectsList' },
          this.props.projects.map(function (x, i) {
            var item;
            if (i % 4 == 0) {
              item = React.createElement(
                'div',
                null,
                React.createElement('div', { className: 'row' }),
                React.createElement(
                  'li',
                  { style: cardStyle },
                  React.createElement(Card, { project: x, index: i })
                )
              );
            } else {
              item = React.createElement(
                'li',
                { style: cardStyle },
                React.createElement(Card, { project: x, index: i })
              );
            }

            return item;
          })
        )
      )
    );
  },

  componentDidMount: function componentDidMount() {
    var corrected = false;

    function correctCardDescHeights() {
      var cardContents = $('.card .card-content ');
      var maxHeights = [];
      var gridColumnCount = 4;

      cardContents.each(function (index) {
        var heightIndex = Math.floor(index / gridColumnCount);

        if (!($(this).height() < maxHeights[heightIndex])) {
          maxHeights[heightIndex] = $(this).height();
        }
      });

      cardContents.each(function (index) {
        var heightIndex = Math.floor(index / gridColumnCount);
        $(this).css('min-height', maxHeights[heightIndex] + 35); //padding
      });

      corrected = true;
    }
    var options = [{
      selector: '#ProjectsList',
      offset: 100,
      callback: function callback(el) {
        if (!corrected) correctCardDescHeights();
        Materialize.showStaggeredList($(el));
      }
    }];
    Materialize.scrollFire(options);
  }
});

var Card = React.createClass({
  displayName: 'Card',

  render: function render() {
    var project = this.props.project;

    return React.createElement(
      'div',
      { className: 'col s12 l3 m6' },
      React.createElement(
        'div',
        { className: 'card  ' },
        React.createElement(
          'div',
          { className: 'card-image' },
          React.createElement('img', { src: project.imageURL })
        ),
        React.createElement(
          'div',
          { className: 'card-content' },
          React.createElement(
            'span',
            { className: 'card-title' },
            this.props.index + 1 + '. ',
            ' ',
            project.title,
            ' '
          ),
          React.createElement('br', null),
          project.tags.map(function (t) {
            return React.createElement(
              'a',
              { className: 'chip', target: '_blank', href: "https://www.google.ge/#q=" + t },
              t
            );
          }),
          React.createElement(
            'p',
            null,
            project.description
          )
        ),
        React.createElement(
          'div',
          { className: 'card-action' },
          project.links.map(function (l) {
            return React.createElement(
              'a',
              { href: l.HREF, target: '_blank' },
              l.name
            );
          })
        )
      )
    );
  }
});

var Contact = React.createClass({
  displayName: 'Contact',

  render: function render() {
    return React.createElement(
      'div',
      { className: 'Contact', id: 'Contact' },
      this.props.getHeader("Contact"),
      React.createElement(
        'div',
        { className: 'row icon-wrappers-container' },
        React.createElement(
          'div',
          { className: 'centered-icons' },
          this.props.socialChannels.map(function (ch) {
            return React.createElement(
              'div',
              { className: 'col s1 social-icons-wrapper center-align' },
              ' ',
              React.createElement(
                'a',
                { className: ch.iconClass, 'data-name': ch.name,
                  href: ch.URL, target: '_blank' },
                React.createElement('i', { className: 'fa fa-' + ch.iconClass })
              )
            );
          })
        )
      ),
      'Companies tend to prefer cv\'s, over personal websites,so  ',
      React.createElement(
        'a',
        { target: '_blank', href: 'https://drive.google.com/file/d/172d7zo8iPTYutZr67R6oOyc94yW4ZwuS/view?usp=sharing' },
        ' I am putting my resume here '
      )
    );
  },

  componentDidMount: function componentDidMount() {
    $('.parallax').parallax();
  }
});

var Footer = React.createClass({
  displayName: 'Footer',

  render: function render() {
    return React.createElement('div',null)
  }
});

ReactDOM.render(React.createElement(Page, null), document.getElementById('content'));

function drawSkillsForce(data) {
  var container = '.force-skills';
  var width = window.innerWidth - 20;
  var height = window.innerHeight - 140;
  var isMobile = isMobileScreen();
  var rectWidth = 55;
  var rectHeight = 20;
  var maxRadius = 30;
  var catFontSize = 10;
  var skillFontSize = 11;
  var techTextDisplayProgress = 101;
  var linkDistance = 40;
  var charge = -150;
  var gravity = 0.1;
  var borderRadius = 4;

  var skillConditions = {
    RapidlyImproving: {
      key: "RapidlyImproving",
      name: 'Improving Rapidly',
      color: "#FDD525"
    },
    Improving: {
      key: "Improving",
      name: 'Improving ',
      color: "#0CC8F4"
    },
    Planned: {
      key: "Planned",
      name: 'Planned to learn ',
      color: "#E1E2A9"
    },
    Abandoned: {
      key: "Abandoned",
      name: 'Abandoned',
      color: "#ed6fc3"
    },
    init: function init() {
      this.array = [this.RapidlyImproving, this.Improving, this.Planned, this.Abandoned];
      return this;
    }
  }.init();

  if (!isMobile) {
    borderRadius = 8;
    techTextDisplayProgress = 50;
    rectWidth = 110;
    rectHeight = 40;
    maxRadius = 60;
    catFontSize = 20;
    linkDistance = 80;
    charge = -300;
    gravity = 0.1;
  }

  var svg = d3.select(container).append('svg').attr("viewBox", "0 0 " + width + " " + height).attr("preserveAspectRatio", "xMidYMid meet");

  var force = d3.layout.force();

  force.size([width, height]);
  force.charge(charge);
  force.linkDistance(linkDistance);
  force.links(data.links);
  force.nodes(data.nodes);
  force.gravity(gravity);

  var radiusScale = d3.scale.linear().domain([0, 100]).range([10, maxRadius]);
  var distanceScale = d3.scale.linear().domain([0, 100]).range([linkDistance, 80]);

  var categoryNodesData = data.nodes.filter(function (v) {
    return v.type == 'Category';
  });

  var technologyNodesData = data.nodes.filter(function (v) {
    return v.type == 'Technology';
  });

  technologyNodesData.forEach(function (v) {
    v.skillCondition = skillConditions[v.status];
    v.experienceText = getReadableExperience(v.experience);
  });

  function getReadableExperience(e) {
    switch (e.type) {
      case "static":
        return moment.duration(e.previous).humanize();
      case "ongoing":
        {
          var currentDate = new Date();
          var milliseconds = currentDate.getTime();
          var result = moment.duration(milliseconds - e.start + e.previous).humanize();
          return result;
        }
      default:
        console.log('something wrong in getReadableExperience');
    }
  }
  //############################## LEGEND  ########################################

  skillConditions.array.forEach(function (v, i) {
    svg.append('rect').attr('y', 10 + i * 40).attr('x', 15).attr('width', 30).attr('height', 30).attr('stroke', '#ccd9ff').attr('stroke-width', '5px').attr('fill', v.color);

    svg.append('text').text(v.name).style('font-size', catFontSize).attr('y', 24 + i * 40).attr('x', 55).attr("dy", ".35em").style('cursor', 'context-menu').style('font-family', 'Roboto').attr('fill', '#42a5f5').attr('height', '100px');
  });

  //########################### drawing

  var links = svg.selectAll('.link').data(data.links).enter().append('line').attr('class', 'link ').attr('stroke', 'gray');

  var grad = svg.selectAll('.grads').data(technologyNodesData).enter().append("defs").append("linearGradient").attr("id", function (d, i) {
    return "grad" + i;
  }).attr("x1", "0%").attr("x2", "0%").attr("y1", function (d) {
    return 100 - d.progressPercent + '%';
  }).attr("y2", "0%");
  grad.append("stop").attr("offset", "3%").attr("stop-color", function (d) {
    return d.skillCondition.color;
  });

  grad.append("stop").attr("offset", "0%").style("stop-color", "white");
  //skillFontSize
  var techGroup = svg.selectAll('.tech-group').data(technologyNodesData).enter().append('g').attr('class', 'tech-group');

  var technologyNodes = techGroup.append('circle').attr('class', 'techNode Node').attr('r', function (d) {
    return radiusScale(d.progressPercent);
  }).style('cursor', 'pointer').attr('stroke', '#ccd9ff').attr('stroke-width', '5px').attr("fill", function (d, i) {
    return "url(#grad" + i + ")";
  }).call(force.drag);

  var techText = techGroup.append('text').style('font-size', skillFontSize).style('text-anchor', 'middle').style('font-family', 'Roboto').attr("dy", ".35em").style('cursor', 'pointer').style('font-weight', 'bold').attr('fill', 'white').attr("transform", "translate(40,10)").call(force.drag).text(function (d) {
    if (d.progressPercent >= techTextDisplayProgress) return d.shortName;
  });

  var categoryNodeGroups = svg.selectAll('.catNode').data(categoryNodesData).enter().append('g').attr('class', 'catNode');

  var categoryNodes = categoryNodeGroups.append('rect').style('cursor', 'pointer').attr('stroke', '#42a5f5').attr('stroke-width', '3px').attr('fill', 'white').attr('rx', borderRadius).attr('width', rectWidth + 'px').attr('height', rectHeight + 'px').call(force.drag);

  var categoryTexts = categoryNodeGroups.append("text").attr('class', 'catText ').style('font-size', catFontSize).style('font-family', 'Roboto').attr("dy", ".35em").style('cursor', 'pointer').style('font-weight', 'bold').attr('fill', '#42a5f5').call(force.drag).text(function (d) {
    return d.name;
  });

  force.start();

  //##################################  TOOLTIP  ##################################################
  function progress(params) {
    return '<div >' + '<table>' + '<tr><td>Experience</td><th>' + params.experience + '</th></tr>' + '<tr><td>Status</td><th>' + params.skillStatus + ' </th></tr>' + '<tr><td>Knowledge</td><th>' + params.absoluteValue + ' %</th></tr>' + '</table>' + '<div class="progress">' + '<div class="determinate ' + params.class + '"  style="width:' + params.relativeValue + '%">' + '</div>' + '</div>' + '</div>';
  }

  var tooltip = d3.select('body').append('div').attr('class', 'customTooltip');
  //dwada
  tooltip.append('div').attr('class', 'skills-label');
  tooltip.append('div').attr('class', 'skills-progress');
  tooltip.append('div').attr('class', 'skills-story').style('text-align', 'left').style('text-indent', "20px");

  function tooltipHoverHandler(d) {

    var title = d.name;
    tooltip.select('.skills-label').html("<b>" + title + "</b>");
    tooltip.select('.skills-story').html(d.experience.story);

    tooltip.select('.skills-progress').html(progress({
      progressLabel: d.name,
      relativeValue: d.progressPercent,
      absoluteValue: d.progressPercent,
      class: d.skillCondition.key,
      experience: d.experienceText,
      skillStatus: d.skillCondition.name
    }));

    tooltip.selectAll('.progress').style('margin-bottom', '5px');

    tooltip.selectAll('h6').style('margin-bottom', '5px').style('text-align', 'left');

    tooltip.transition().duration(200).style("opacity", "1").style('display', 'block');
    d3.select(this).select('circle').attr('stroke-width', 10).attr("stroke", "#ccd9ff");
  }

  function tooltipOutHandler() {
    tooltip.transition().duration(200).style('opacity', '0').style('display', 'none');
    d3.select(this).select('circle').attr('stroke-width', 5);
  }

  techGroup.on('mouseover', tooltipHoverHandler);

  techGroup.on('mouseout', tooltipOutHandler);

  techGroup.on("mousemove", function (d) {
    tooltip.style('top', d3.event.pageY - 130 + 'px').style('left', d3.event.pageX + 20 + 'px');
  });

  force.on('tick', function () {

    technologyNodes.attr('cx', function (d) {
      return d.x = Math.max(radiusScale(d.progressPercent), Math.min(width - radiusScale(d.progressPercent), d.x));
    }).attr('cy', function (d) {
      return d.y = Math.max(radiusScale(d.progressPercent), Math.min(height - radiusScale(d.progressPercent), d.y));
    });

    categoryNodes.attr('x', function (d) {
      if (d.x - rectWidth / 2 < 0) return 0;
      if (d.x + rectWidth / 2 > width) return width - rectWidth;
      return d.x - rectWidth / 2;
    }).attr('y', function (d) {
      //return d.y - rectHeight / 2;

      if (d.y - rectHeight / 2 < 0) return 0;
      if (d.y + rectHeight / 2 > height) return height - rectHeight;
      return d.y - rectHeight / 2;
    });

    categoryTexts.attr('x', function (d) {
      if (d.x - rectWidth / 2.4 < 0) return 0;
      if (d.x + rectWidth / 2.6 > width) return width - rectWidth;
      return d.x - rectWidth / 2.4;
    }).attr('y', function (d) {
      // return d.y;
      if (d.y - rectHeight / 2 < 0) return rectHeight / 2;
      if (d.y + rectHeight / 2 > height) return height - rectHeight / 2;
      return d.y;
    });

    techText.attr('x', function (d) {
      if (d.x - rectWidth / 2.4 < 0) return 0;
      if (d.x + rectWidth / 2.6 > width) return width - rectWidth;
      return d.x - rectWidth / 2.4;
    }).attr('y', function (d) {
      // return d.y;
      if (d.y - rectHeight / 2 < 0) return rectHeight / 2;
      if (d.y + rectHeight / 2 > height) return height - rectHeight / 2;
      return d.y;
    });

    links.attr('x1', function (d) {
      if (d.source.x < 0) return 0;
      if (d.source.x > width) return width;
      return d.source.x;
    }).attr('y1', function (d) {
      if (d.source.y < 0) return 0;
      if (d.source.y > height) return height;
      return d.source.y;
    }).attr('x2', function (d) {
      if (d.target.x < 0) return 0;
      if (d.target.x > width) return width;
      return d.target.x;
    }).attr('y2', function (d) {
      if (d.target.y < 0) return 0;
      if (d.target.y > height) return height;
      return d.target.y;
    });
  });
}

d3.json("https://raw.githubusercontent.com/MarcoRob/marcorob.github.io/Develop/skills.json", function (data) {

  drawSkillsForce(data);
});

function isMobileScreen() {
  return window.innerWidth < 420;
}