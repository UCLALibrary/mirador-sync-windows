var MiradorSynchronizedWindows = {

    locales: {
        en: {
            translation: {
                'mainMenuButtonTooltip': 'Create, delete, and manage synchronized window groups.',
                'mainMenuButtonText': 'Synchronized Windows',

                'windowDropdownTooltip': 'Assign this window to a synchronized window group.',
                'windowDropdownItemText': '(no group)'
            }
        }
    },

    templates: {

        mainMenu: Mirador.Handlebars.compile([
            '<li>',
              '<a href="javascript:;" class="toggle-synchronized-window-groups mainmenu-button" title="{{t "mainMenuButtonTooltip"}}">',
                '<span class="fa fa-lock fa-lg fa-fw"></span> {{t "mainMenuButtonText"}}',
              '</a>',
            '</li>'
        ].join('')),

        window: Mirador.Handlebars.compile([
            '<a href="javascript:;" class="mirador-btn mirador-icon-synchronized-window-groups mirador-tooltip" title="{{t "windowDropdownTooltip"}}">',
              '<i class="fa fa-lock fa-lg fa-fw"></i>',
              '<i class="fa fa-caret-down"></i>',
              '<ul class="dropdown synchronized-window-groups">',
                '<li class="no-lock remove-from-synchronized-window-group"><i class="fa fa-ban fa-lg fa-fw"></i> {{t "windowDropdownItemText"}}</li>',
              '</ul>',
            '</a>',
        ].join(''))
    },

    init: function() {
        var self = this;

        i18next.on('initialized', function() {
            for (var locale in self.locales) {
                // add translations from each locale
                var ns = 'translation';
                i18next.addResourceBundle(locale, ns, self.locales[locale][ns], true, true);
            };
        });

        /*
         * Mirador.MainMenu
         */
        (function($) {

            var bindEvents = $.MainMenu.prototype.bindEvents,
                init = $.MainMenu.prototype.init;

            $.MainMenu.prototype.bindEvents = function() {
                var _this = this;
                bindEvents.apply(this, arguments);

                // TODO: all Mirador module templates should be available as a string instead of a compiled template, so that the template property can be extended
                // but it's not, so we have to worry about the order of these two statements
                this.element.find('.mirador-main-menu').prepend(self.templates.mainMenu());

                this.element.find('.toggle-synchronized-window-groups').on('click', function() {
                    _this.eventEmitter.publish('TOGGLE_SYNCHRONIZED_WINDOW_GROUPS_PANEL');
                    //remove active class from other buttons
                    _this.element.find('.synchronized-window-groups').removeClass('active');
                    if (jQuery(this).hasClass('active')) {
                        jQuery(this).removeClass('active');
                    } else {
                        jQuery(this).addClass('active');
                    }
                });
            }; 
        })(Mirador);

        /*
         * Mirador.Viewer
         */
        (function($) {
            var setupViewer = $.Viewer.prototype.setupViewer,
                listenForActions = $.Viewer.prototype.listenForActions;

            $.Viewer.prototype.setupViewer = function() {
                var _this = this;
                setupViewer.apply(this, arguments);

                this.synchronizedWindowGroupsPanel = new $.SynchronizedWindowsPanel({
                    appendTo: this.element.find('.mirador-viewer'),
                    state: this.state,
                    eventEmitter: this.eventEmitter
                });
            };

            $.Viewer.prototype.listenForActions = function() {
                var _this = this;
                listenForActions.apply(this, arguments);

                this.eventEmitter.subscribe('TOGGLE_SYNCHRONIZED_WINDOW_GROUPS_PANEL', function(event) {
                    _this.toggleSynchronizedWindowGroupsPanel();
                });
            };

            /*
             * TODO: document
             */
            $.Viewer.prototype.toggleSynchronizedWindowGroupsPanel = function() {
                this.toggleOverlay('synchronizedWindowGroupsPanelVisible');
                // TODO: do we need to do refresh every time?
                jQuery('#synchronized-window-groups-accordion').accordion('refresh');
            };
        })(Mirador);

        /*
         * Mirador.BookView
         * Mirador.ImageView
         */
        (function($) {

            ['BookView', 'ImageView'].forEach(function(viewType) {
                var bindEvents = $[viewType].prototype.bindEvents,
                    createOpenSeadragonInstance = $[viewType].prototype.createOpenSeadragonInstance;

                $[viewType].prototype.bindEvents = function() {
                    var _this = this;
                    bindEvents.apply(this, arguments);

                    this.element.on({
                        mouseenter: function() {
                            _this.leading = true;
                        },
                        mouseleave: function() {
                            _this.leading = false;
                        }
                    });

                    this.element.find('.mirador-osd-next').on('click', function() {
                        if (_this.leading) {
                        }
                    });
                    this.element.find('.mirador-osd-previous').on('click', function() {
                        if (_this.leading) {
                        }
                    });
                    this.element.find('.mirador-osd-go-home').on('click', function() {
                        if (_this.leading) {
                        }
                    });
                    this.element.find('.mirador-osd-up').on('click', function() {
                        if (_this.leading) {
                        }
                    });
                    this.element.find('.mirador-osd-right').on('click', function() {
                        if (_this.leading) {
                        }
                    });
                    this.element.find('.mirador-osd-down').on('click', function() {
                        if (_this.leading) {
                        }
                    });
                    this.element.find('.mirador-osd-left').on('click', function() {
                        if (_this.leading) {
                        }
                    });
                    this.element.find('.mirador-osd-zoom-in').on('click', function() {
                        if (_this.leading) {
                        }
                    });
                    this.element.find('.mirador-osd-zoom-out').on('click', function() {
                        if (_this.leading) {
                        }
                    });
                    this.element.find('.mirador-osd-rotate-right').on('click', function() {
                        if (_this.leading) {
                            _this.eventEmitter.publish('syncWindowRotation', {viewObj: _this, value: 90});
                        }
                    });
                    this.element.find('.mirador-osd-rotate-left').on('click', function() {
                        if (_this.leading) {
                            _this.eventEmitter.publish('syncWindowRotation', {viewObj: _this, value: -90});
                        }
                    });
                    this.element.find('.mirador-osd-brightness-slider').on('slide', function(event, ui){
                        if (_this.leading) {
                            _this.eventEmitter.publish('syncWindowBrightness', {viewObj: _this, value: ui.value});
                        }
                    });
                    this.element.find('.mirador-osd-contrast-slider').on('slide', function(event, ui) {
                        if (_this.leading) {
                            _this.eventEmitter.publish('syncWindowContrast', {viewObj: _this, value: ui.value});
                        }
                    });
                    this.element.find('.mirador-osd-saturation-slider').on('slide', function(event, ui){
                        if (_this.leading) {
                            _this.eventEmitter.publish('syncWindowSaturate', {viewObj: _this, value: ui.value});
                        }
                    });
                    this.element.find('.mirador-osd-grayscale').on('click', function() {
                        if (_this.leading) {
                            _this.eventEmitter.publish('syncWindowGrayscale', _this);
                        }
                    });
                    this.element.find('.mirador-osd-invert').on('click', function() {
                        if (_this.leading) {
                            _this.eventEmitter.publish('syncWindowInvert', _this);
                        }
                    });
                    // TODO: implement mirror
                    this.element.find('.mirador-osd-mirror').on('click', function() {
                        if (_this.leading) {
                            _this.eventEmitter.publish('syncWindowMirror', _this);
                        }
                    });
                    this.element.find('.mirador-osd-reset').on('click', function() {
                        if (_this.leading) {
                            _this.eventEmitter.publish('syncWindowReset', _this);
                        }
                    });
                };

                
                /*
                 * Applies a CSS filter according to specified behavior.
                 *
                 * @param {jQuery | String} elt
                 *   Either a jQuery object or a CSS selector string
                 * @param {String} behavior
                 * @param {Number} val
                 */
                $[viewType].prototype.applyCSSFilter = function(elt, key, val) {
                  switch(key) {

                    // toggle button controls
                    case 'grayscale':
                    case 'invert':
                      if (jQuery(elt).hasClass('selected')) {
                        this.filterValues[key] = key + '(0%)';
                        jQuery(elt).removeClass('selected');
                      } else {
                        this.filterValues[key] = key + '(100%)';
                        jQuery(elt).addClass('selected');
                      }
                      break;

                    // slider controls
                    case 'brightness':
                    case 'contrast':
                    case 'saturate':
                      this.filterValues[key] = key + '(' + val + '%)';
                      jQuery(elt).find('.percent').text(val + '%');
                      break;

                    default:
                      // should never get here
                      break;
                  }
                  this.setFilterCSS();
                };

                $[viewType].prototype.osdRotate = function(degrees) {
                  var osd = this.osd;
                  if (osd) {
                    var currentRotation = osd.viewport.getRotation();
                    osd.viewport.setRotation(currentRotation + degrees);
                  }
                };
                //set the original values for all of the CSS filter options
                $[viewType].prototype.filterValues = {
                  "brightness" : "brightness(100%)",
                  "contrast" : "contrast(100%)",
                  "saturate" : "saturate(100%)",
                  "grayscale" : "grayscale(0%)",
                  "invert" : "invert(0%)"
                };

                $[viewType].prototype.setFilterCSS = function() {
                  var _this = this,
                  filterCSS = jQuery.map(_this.filterValues, function(value, key) { return value; }).join(" "),
                  osdCanvas = jQuery(_this.osd.drawer.canvas);
                  osdCanvas.css({
                    'filter'         : filterCSS,
                    '-webkit-filter' : filterCSS,
                    '-moz-filter'    : filterCSS,
                    '-o-filter'      : filterCSS,
                    '-ms-filter'     : filterCSS
                  });
                };
                $[viewType].prototype.resetImageManipulationControls = function() {
                    //reset rotation
                    if (this.osd) {
                        this.osd.viewport.setRotation(0);
                    }

                    //reset brightness
                    this.filterValues.brightness = "brightness(100%)";
                    this.element.find('.mirador-osd-brightness-slider').slider('option','value',100);
                    this.element.find('.mirador-osd-brightness-slider').find('.percent').text(100 + '%');

                    //reset contrast
                    this.filterValues.contrast = "contrast(100%)";
                    this.element.find('.mirador-osd-contrast-slider').slider('option','value',100);
                    this.element.find('.mirador-osd-contrast-slider').find('.percent').text(100 + '%');

                    //reset saturation
                    this.filterValues.saturate = "saturate(100%)";
                    this.element.find('.mirador-osd-saturation-slider').slider('option','value',100);
                    this.element.find('.mirador-osd-saturation-slider').find('.percent').text(100 + '%');

                    //reset grayscale
                    this.filterValues.grayscale = "grayscale(0%)";
                    this.element.find('.mirador-osd-grayscale').removeClass('selected');

                    //reset color inversion
                    this.filterValues.invert = "invert(0%)";
                    this.element.find('.mirador-osd-invert').removeClass('selected');

                    this.setFilterCSS();
                };

                // Instead of doing this, want to be able to pass osd handlers to osd
                // e.g., a param called handlers:
                // { 'open': function() {}, 'pan': [function() {}, function() {}] }

                $[viewType].prototype.createOpenSeadragonInstance = function(imageUrl) {
      var infoJsonUrl = imageUrl + '/info.json',
      uniqueID = $.genUUID(),
      osdID = 'mirador-osd-' + uniqueID,
      infoJson,
      _this = this;

      this.element.find('.' + this.osdCls).remove();

      jQuery.getJSON(infoJsonUrl).done(function (infoJson, status, jqXHR) {
        _this.elemOsd =
          jQuery('<div/>')
        .addClass(_this.osdCls)
        .attr('id', osdID)
        .appendTo(_this.element);

        _this.osd = $.OpenSeadragon({
          'id':           osdID,
          'tileSources':  infoJson,
          'uniqueID' : uniqueID
        });

        _this.osd.addHandler('zoom', $.debounce(function(){
          var point = { 
            'x': -10000000,
            'y': -10000000
          };
          _this.eventEmitter.publish('updateTooltips.' + _this.windowId, [point, point]);
        }, 30));

        _this.osd.addHandler('zoom', function(){
          // tell sync window controller to move any synchronized views
          if (_this.leading) {
            _this.eventEmitter.publish('syncWindowZoom', _this);
          }
        });
        _this.osd.addHandler('pan', $.debounce(function(){
          var point = { 
            'x': -10000000,
            'y': -10000000
          };
          _this.eventEmitter.publish('updateTooltips.' + _this.windowId, [point, point]);
        }, 30));

        _this.osd.addHandler('pan', function(){
          // tell sync window controller to move any synchronized views
          if (_this.leading) {
            _this.eventEmitter.publish('syncWindowPan', _this);
          }
        });
        _this.osd.addHandler('open', function(){
          _this.eventEmitter.publish('osdOpen.'+_this.windowId);
          if (_this.osdOptions.osdBounds) {
            var rect = new OpenSeadragon.Rect(_this.osdOptions.osdBounds.x, _this.osdOptions.osdBounds.y, _this.osdOptions.osdBounds.width, _this.osdOptions.osdBounds.height);
            _this.osd.viewport.fitBounds(rect, true);
          } else {
            // else reset bounds for this image
            _this.setBounds();
          }

          if (_this.boundsToFocusOnNextOpen) {
            _this.eventEmitter.publish('fitBounds.' + _this.windowId, _this.boundsToFocusOnNextOpen);
            _this.boundsToFocusOnNextOpen = null;
          }

          _this.addAnnotationsLayer(_this.elemAnno);

          // get the state before resetting it so we can get back to that state
          var originalState = _this.hud.annoState.current;
          var selected = _this.element.find('.mirador-osd-edit-mode.selected');
          var shape = null;
          if (selected) {
            shape = selected.find('.material-icons').html();
          }
          if (originalState === 'none') {
            _this.hud.annoState.startup();
          } else if (originalState === 'off' || _this.annotationState === 'off') {
            //original state is off, so don't need to do anything
          } else {
            _this.hud.annoState.displayOff();
          }

          if (originalState === 'pointer' || _this.annotationState === 'on') {
            _this.hud.annoState.displayOn();
          } else if (originalState === 'shape') {
            _this.hud.annoState.displayOn();
            _this.hud.annoState.chooseShape(shape);
          } else {
            //original state is off, so don't need to do anything
          }

          _this.osd.addHandler('zoom', $.debounce(function() {
            _this.setBounds();
          }, 500));

          _this.osd.addHandler('pan', $.debounce(function(){
            _this.setBounds();
          }, 500));
        });

            });
            };
            });
        })(Mirador);

        /*
         * Mirador.Workspace
         */
        (function($) {
            // Pass the following to the constructor, or initialized it some way in a property
            // EXTEND THE INIT METHOD, this is the easiest way
            var init = $.Workspace.prototype.init;

            $.Workspace.prototype.init = function() {
                var _this = this;
                init.apply(this, arguments);

                this.synchronizedWindowController = new $.SynchronizedWindowsController({
                    state: this.state,
                    eventEmitter: this.eventEmitter
                })
            };
        })(Mirador);


        /*
         * Mirador.Window
         */
        (function($) {

            var init = $.Window.prototype.init,
                listenForActions = $.Window.prototype.listenForActions,
                bindEvents = $.Window.prototype.bindEvents;

            $.Window.prototype.init = function() {
                var _this = this;

                init.apply(this, arguments);

                this.eventEmitter.publish('windowReadyForSynchronizedWindowGroups');
            };

            $.Window.prototype.listenForActions = function() {
                var _this = this;
                listenForActions.apply(this, arguments);

                _this.events.push(_this.eventEmitter.subscribe('SET_CURRENT_CANVAS_ID.' + this.id, function(event, canvasID) {
                    if (_this.leading) {
                        _this.eventEmitter.publish('syncWindowNavigationControls', {
                            viewObj: _this.focusModules[_this.currentImageMode],
                            value: canvasID
                        });
                    }
                }));
                /*
                 * Calls the D3 rendering method to dynamically add li's.
                 */
                _this.events.push(_this.eventEmitter.subscribe('updateSynchronizedWindowGroupMenus', function(event, data) {
                    _this.renderSynchronizedWindowGroupMenu(data.keys);
                }));

                /*
                 * Activates the li with innerHTML that matches the given synchronizedWindowGroup, inside of the window whose
                 * viewobject has the given windowId
                 *
                 * @param {Object} data Contains:
                 *     groupId {string} The name of the window group
                 */
                _this.events.push(_this.eventEmitter.subscribe('activateSynchronizedWindowGroupMenuItem.' + _this.id, function(event, groupId) {
                    // check if this window has the window id
                    // if so, set the li with the innerHTML that has groupId
                    _this.element.find('.add-to-synchronized-window-group').each(function(i, e) {
                        if (e.innerHTML === groupId) {
                            jQuery(this).parent().children('.add-to-synchronized-window-group').removeClass('current-group');
                            jQuery(this).addClass('current-group');
                        }
                    });
                }));
            };

            $.Window.prototype.bindEvents = function() {
                var _this = this;
                bindEvents.apply(this, arguments);
                // prevent infinite looping with synchronized window zoom/pan
                this.element.on({
                    mouseenter: function() {
                        _this.leading = true;
                    },
                    mouseleave: function() {
                        _this.leading = false;
                    }
                });

                // need to prepend the template before we register events on it
                this.element.find('.window-manifest-navigation').prepend(self.templates.window());

                // onclick event to add the window to the selected synchronized window group
                this.element.find('.add-to-synchronized-window-group').on('click', function(event) {
                    _this.addToSynchronizedWindowGroup(this);
                });

                // onclick event to remove the window from its synchronized window group
                this.element.find('.remove-from-synchronized-window-group').on('click', function(event) {
                    _this.removeFromSynchronizedWindowGroup(this);
                });

                // show/hide synchronized window group menu (window-level)
                this.element.find('.mirador-icon-synchronized-window-groups').off('mouseenter').on('mouseenter', function() {
                    _this.element.find('.synchronized-window-groups').stop().slideFadeToggle(300);
                }).off('mouseleave').on('mouseleave', function() {
                    _this.element.find('.synchronized-window-groups').stop().slideFadeToggle(300);
                });
            };
            
    $.Window.prototype.addToSynchronizedWindowGroup = function(elt, replacing) {
      var lg;
      if (replacing === true) {
        lg = jQuery(elt).parent().children('.add-to-synchronized-window-group.current-group').text();

        // if no lg, do nothing
        if (lg === '') {
          return;
        }
      }
      else {
        lg = jQuery(elt).text();
      }
      this.eventEmitter.publish('addToSynchronizedWindowGroup', {viewObj: this.focusModules[this.currentImageMode], synchronizedWindowGroup: lg});
      jQuery(elt).parent().children('.add-to-synchronized-window-group').removeClass('current-group');
      jQuery(elt).addClass('current-group');
    };

    $.Window.prototype.removeFromSynchronizedWindowGroup = function(elt) {
      var viewObj = this.focusModules[this.currentImageMode];
      if (viewObj !== null) {
        this.eventEmitter.publish('removeFromSynchronizedWindowGroup', {'viewObj': viewObj});
        jQuery(elt).parent().children('.add-to-synchronized-window-group').removeClass('current-group');
      }
    };

    /*
     * Use D3 to dynamically render the window-level synchronized window group menu.
     *
     * @param {Array} synchronizedWindowGroupNames An array of strings that represent the synchronized window group names
     */
    $.Window.prototype.renderSynchronizedWindowGroupMenu = function(synchronizedWindowGroupNames) {
      // each menu in the window should get a dropdown with items in the 'data' array
      var _this = this,
      synchronizedWindowGroups = d3.select(this.element[0]).select('.synchronized-window-groups').selectAll('.synchronized-window-groups-item')
        .data(synchronizedWindowGroupNames, function(d) { return d; });
      synchronizedWindowGroups.enter().append('li')
        .classed({'synchronized-window-groups-item': true, 'add-to-synchronized-window-group': true})
        .text(function(d) { return d; })
        .on('click', function() {
          _this.addToSynchronizedWindowGroup(this);
        });
      synchronizedWindowGroups.exit().remove();
    };
        })(Mirador);
    }
};

$(document).ready(function() {
    MiradorSynchronizedWindows.init();
});
