/**
 * @typedef {Object} OpenerConfig
 * @property {boolean} open=false - is content opened by default?
 * @property {string} openClass='open' - custom class on trigger element when opened
 * @property {string} openFunction='fade' - slide|fade
 * @property {string} tab='' - name of set of tabs
 * @property {boolean} closeOnClick=true - close opened content on second click on the trigger element
 * @property {boolean} closeOnBlur=true - close opened content on click outside of content
 */

/**
 * Simple module for opening/closing content. Can be used for simple show of content, a popup or tabs.
 *
 * All of the {@link OpenerConfig} properties can be overriden via data-attributes (with camel case converted into hyphens)
 *
 * Every opener is found through .opener class, but can be also added programmatically with addOpener function
 *
 * One trigger can have multiple targets and one target can have multiple triggers.
 *
 * Tabs act differently, by default they cannot be closed on blur or click (unlike default values in {@link OpenerConfig})
 *
 * @module {Openers} Openers
 * @example <caption>Simple use case</caption>
 * <a href="#content" class="opener">toggle</a>
 * <p id="content" style="display:none">toggling content</p>
 * @example <caption>Custom declarative config</caption>
 * <span
 * 		data-target="#content"
 * 		class="opener"
 * 		data-open="true"
 * 		data-close-on-blur="false"
 * 		data-open-function="fade"
 * >toggle</span>
 * <p id="content" style="display:none">toggling content</p>
 * @example <caption>Tabs with first tab open</caption>
 * <ul>
 *     <li><a href="#content1" class="opener" data-tab="test" data-open="true">tab 1</a></li>
 *     <li><a href="#content2" class="opener" data-tab="test">tab 2</a></li>
 * </ul>
 * <div id="content1">tab content 1</div>
 * <div id="content2" style="display:none">tab content 2</div>
 */

/**
 * CSS selector for opener's triggers
 * @default
 * @type {string}
 */
var selector = '.opener';
/**
 * All of configuration objects extended by $node element (the trigger)
 * @type {OpenerConfig[]}
 */
var openers = [];
/**
 * Default configuration object
 * @type {OpenerConfig}
 */
var config = {
	open: false,
	openClass: 'open',
	openFunction: 'slide',
	tab: '',
	closeOnClick: true,
	closeOnBlur: false,
};
/**
 * Registers trigger for toggling content
 * @param {jQuery} $node - trigger element
 * @param {OpenerConfig} [configuration] - custom config
 */
var addOpener = function ($node, configuration) {
	var targetsQuery = configuration && configuration.target ? configuration.target : ($node.data('target') ? $node.data('target') : $node[0].hash),
		$targets = $(targetsQuery);

	if ($targets.length) {
		var opener = $.extend(true, {}, config),
			openerConfig = {
				$node: $node,
				$targets: $targets,
				targetsSelector: targetsQuery,
			},
			dataAttributesConfig = _getConfigFromDataAttributes($node, config);

		$.extend(opener, configuration, dataAttributesConfig, openerConfig);

		// sets special behavior for tab opener if not defined (tab cannot be closed on click or blur)
		if (opener.tab) {
			if (typeof dataAttributesConfig.closeOnClick === 'undefined' && (!configuration || typeof configuration.closeOnClick === 'undefined')) {
				opener.closeOnClick = false;
			}
			if (typeof dataAttributesConfig.closeOnBlur === 'undefined' && (!configuration || typeof configuration.closeOnBlur === 'undefined')) {
				opener.closeOnBlur = false;
			}
		}

		openers.push(opener);

		var touchClick = false;
		$node.on({
			'click.opener': function (e) { _openerClick(e, opener) },
			'touchstart.opener': function () { touchClick = true },
			'touchmove.opener': function () { touchClick = false },
			'touchend.opener': function (e) {
				if (touchClick) {
					_openerClick(e, opener);
					touchClick = false;
				}
			},
		})

		// update openers content accordingly
		_changeState(opener.open, opener, true);
	}
	else {
		console.log('Opener doesn\'t have any targets', $node);
	}
};
/**
 * Connects click & touch events and initializes all triggers (from selector)
 * @param {OpenerConfig} config - custom config
 */
var init = function (config) {
	_bindBodyClick();

	$(selector).each(function () {
		addOpener($(this), config)
	});
};
/**
 * Closes opener's content
 * @param {jQuery} $node - trigger element
 * @fires jQuery~'opener.closing'
 * @fires jQuery~'opener.closed'
 */
var closeOpener = function ($node) {
	openers.forEach(function (opener) {
		if (opener.$node.is($node)) {
			_changeState(false, opener);
		}
	});
};
/**
 * Closes all active openers
 * @param {boolean} [immediately] - close them without animation
 */
var closeAllOpeners = function (immediately) {
	openers.forEach(function (opener) {
		if (opener.open) {
			_changeState(false, opener, immediately);
		}
	});
};
/**
 * Close all active tabs of a single set
 * @param {string} tab - name of tab
 */
var closeOpenerTabs = function (tab) {
	openers.forEach(function (opener) {
		if (opener.open && opener.tab == tab) {
			_changeState(false, opener, true);
		}
	});
};
/**
 * Opens opener
 * @param {jQuery} $node - trigger element
 * @fires jQuery~'opener.opening'
 * @fires jQuery~'opener.opened'
 */
var openOpener = function ($node) {
	openers.forEach(function (opener) {
		if (opener.$node.is($node)) {
			_changeState(true, opener);
		}
	});
};
/**
 * Unbinds click & touch event, reattaches them and reinitialize all triggers
 */
var recover = function () {
	openers = [];
	_unbindOpeners();
	init();
};

/**
 * Search given element for config keys defined as data-attributes. Camel case in config keys is transformed into hyphens
 * @param $node
 * @param config
 * @return {object}
 * @private
 */
function _getConfigFromDataAttributes($node, config) {
	var output = {};

	function _convertCamelToDash(string) {
		return string.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
	}

	Object.keys(config).forEach(function (key) {
		var data = $node.data(_convertCamelToDash(key));
		if (typeof data != 'undefined') {
			output[key] = data;
		}
	});

	return output;
};

/**
 * Animates given opener according to its open property (shows or hides it) and triggers openers events
 * @param opener
 * @param open
 * @private
 */
function _animatrix(opener, open) {
	switch (opener.openFunction) {
		case 'slide':
			open ? opener.$targets.slideDown(triggers) : opener.$targets.slideUp(triggers);
			break;
		default:
			open ? opener.$targets.fadeIn(triggers) : opener.$targets.fadeOut(triggers);
	}

	function triggers() {
		if (open) {
			opener.$node.trigger('opener.opened', opener);
			opener.$targets.trigger('opener.opened', opener);
		}
		else {
			opener.$node.trigger('opener.closed', opener);
			opener.$targets.trigger('opener.closed', opener);
		}
	}
};

/**
 * Function to call if user clicked anywhere but active opener's content. This closes all active openers
 * @param e
 * @private
 */
function _bodyClick(e) {
	openers.forEach(function (opener) {
		if (opener.open && opener.closeOnBlur && !$(e.target).parents(opener.targetsSelector).length) {
			_changeState(false, opener);
		}
	});
};

/**
 * Change state of opener
 * @param open
 * @param opener
 * @param immediately
 * @private
 */
function _changeState(open, opener, immediately) {
	if (open) {
		_open(opener, immediately);
	}
	else {
		_close(opener, immediately);
	}
	_notifyOpenersOfStateChange(opener);
};

/**
 * Close opener
 * @param opener
 * @param immediately
 * @private
 */
function _close(opener, immediately) {
	opener.$node.removeClass(opener.openClass).trigger('opener.closing', opener);
	opener.$targets.trigger('opener.closing', opener);
	opener.open = false;
	if (immediately) {
		opener.$targets.hide().trigger('opener.closed', opener);
	}
	else {
		_animatrix(opener, false)
	}
};

/**
 * Handles closing opened Openers when user click/touch screen elsewhere
 * @private
 */
function _bindBodyClick() {
	var touchClick = false;

	$(document).on({
		'click.openers': function (e) { _bodyClick(e) },
		'touchstart.openers': function () { touchClick = true },
		'touchmove.openers': function () { touchClick = false },
		'touchend.openers': function (e) {
			if (touchClick) {
				_bodyClick(e);
				touchClick = false;
			}
		},
	});
};

/**
 * Destroys events for all openers
 * @private
 */
function _unbindOpeners() {
	openers.forEach(function (opener) {
		opener.$node.off('.opener');
	});
	$(document).off('.openers');
};

/**
 * If there is more than one trigger for opener content, then when one is triggered, others are set to be changed the same way (opened, closed)
 * @param changedOpener
 * @private
 */
function _notifyOpenersOfStateChange(changedOpener) {
	openers.forEach(function (opener) {
		if (opener.targetsSelector == changedOpener.targetsSelector && opener.open != changedOpener.open) {
			_changeState(changedOpener.open, opener)
		}
	});
};

/**
 * When clicked on opener's trigger
 * @param e
 * @param opener
 * @private
 */
function _openerClick(e, opener) {
	e.preventDefault();
	e.stopPropagation();	//we don't want to trigger _bodyClick function, because it would close opener immediately

	if (opener.open) {
		if (opener.closeOnClick) {
			_changeState(false, opener);
		}
	}
	else {
		if (opener.tab) {
			closeOpenerTabs(opener.tab);
		}
		_changeState(true, opener);
	}
};

/**
 * Opens an opener
 * @param opener
 * @param immediately
 * @private
 */
function _open(opener, immediately) {
	opener.$node.addClass(opener.openClass).trigger('opener.opening', opener);
	opener.$targets.trigger('opener.opening', opener);
	opener.open = true;
	if (immediately) {
		opener.$targets.show().trigger('opener.opened', opener);
	}
	else {
		_animatrix(opener, true)
	}
};

export default {
	addOpener,
	recover,
	openOpener,
	closeOpenerTabs,
	closeAllOpeners,
	closeOpener,
	init,
}