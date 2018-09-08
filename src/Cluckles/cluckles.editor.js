import SassBridge from './preprocessorbridge/sassbridge';
import LessBridge from './preprocessorbridge/lessbridge';

import { Processor } from './processor';
import { Export } from './export';
import { Import } from './import';

/**
* ClucklesEditor class holds the modifications to the less theme using sub classes
* which hold information about the modifications, for each different part of the theme.
* Such as branding, base colors, navbar, etc etc. These modifications can then be
* retrieved or applied to the current page.
*
* @class ClucklesEditor
*
* Generic Options:
* - scope:         {string} The CSS Selector to prefix the Compiled CSS selectors with.
* - delay:         {Number} Milliseconds delay between refresh updates (Default: 750).
* - undoSize:      {Number} Number of items to keep in the Undo history (Default: 10)
* - embedSelector: {string} Will set this element to the height of the editor, if editor is in an embedded object.
*
* @param {Object} less The Global less object.
*
* @property {Export} export Manages the Theme exporting.
* @property {Typography} typography Holds modifications to the Typography component.
* @property {Misc} misc Holds miscellaneous modifications to Bootstrap.
* @property {Table} table Holds modifications to the Table component.
* @property {Breadcrumb} breadcrumb Holds modifications to the Breadcrumb component.
* @property {Dropdown} dropdown Holds modifications to the Dropdown component.
* @property {Tooltip} tooltip Holds modifications to the Tooltip component.
* @property {Popover} popover Holds modifications to the Popover component.
* @property {Thumbnail} thumbnail Holds modifications to the Thumbnail component.
* @property {Badge} badge Holds modifications to the Badge component.
* @property {Carousel} carousel Holds modifications to the Carousel component.
* @property {Code} carousel Holds modifications to the Code component.
* @property {Blockquote} blockquote Holds modifications to the Blockquote component.
* @property {Modal} modal Holds modifications to the Modal component.
* @property {Jumbotron} jumbotron Hold modifications to the Jumbotron component.
* @property {GrayScale} grayScale Holds the modifications to the base gray colors of the Theme.
* @property {Nav} navs Holds the modifications to the Nav Components.
* @property {Tab} tab Holds the modifications to the Tab Components.
* @property {Pill} pill Holds the modifications to the Pill Components.
* @property {Pagination} pagination Holds the modifications to the Pagination Components.
* @property {Pager} pager Holds the modifications to the Pager Components.
* @property {Form} form Holds the modifications to the Form Components.
* @property {BrandModifier} branding Holds the changes to the Branding colors of the Theme.
* @property {Label} label Holds the changes to the Label Components.
* @property {PanelBase} panelBase Holds the changes to the General Panel styling of Panel Components.
* @property {NavbarBase} navbarBase Holds the changes to the General Navbar styling of Navbar Components.
* @property {ButtonBase} buttonBase Holds the changes to the General Button styling of Button Components.
* @property {Object} navbar Holds Navbar instances which control the styling of Navbar Components.
* @property {Object} buttons Holds Button instances which control the styling of Button Components.
* @property {Object} formStates Holds FormState instances which control the styling of various components, (Alerts/Panels).
* @property {ListGroup} listGroup Holds the changes to the ListGroup component.
* @property {object} modifiers Holds all of the Modifications to the whole theme.
*
* @returns {ClucklesEditor}
*/
class ClucklesEditor {
  constructor(options) {
    this.options = options;
    this.sassBridge = new SassBridge();
    this.lessBridge = new LessBridge();

    this.preProcessorBridges = {
      'sass': this.sassBridge,
      'less': this.lessBridge
    };

    this.activePreProcessorBridgeName = 'sass';

  /**
   * Monitors the refreshing of the less files, enables it to be blocked for x duration between refreshes. To avoid crashing the brower :).
   *
   * @property disabled   {Boolean} If disabled set to true, not refreshing, delaying, and applying modifications will be disabled.
   * @property canRefresh {Boolean} Tracks whether or not another refresh can be performed. (true = can refresh, false = cant refresh).
   * @property canDelay   {Boolean} Tracks whether or not a refresh can be Delayed (and added to the Queue). (true = can delay, false = cant delay).
   *
   * @property delay {Number} Milliseconds delay between refresh updates (Default: 750).
   */
  this.refreshMonitor     = {
      disabled:   false,
      canRefresh: true,
      canDelay:   true,
      delay:      options.delay || 750
  };

  // this.misc               = new Misc(this);
  // Component vars
  // this.typography         = new Typography(this);
  // this.table              = new Table(this);
  // this.breadcrumb         = new Breadcrumb(this);
  // this.dropdown           = new Dropdown(this);
  // this.tooltip            = new Tooltip(this);
  // this.popover            = new Popover(this);
  // this.thumbnail          = new Thumbnail(this);
  // this.badge              = new Badge(this);
  // this.carousel           = new Carousel(this);
  // this.code               = new Code(this);
  // this.blockquote         = new Blockquote(this);
  // this.modal              = new Modal(this);
  // this.jumbotron          = new Jumbotron(this);
  // this.grayScale          = new GrayScale(this);
  // this.nav                = new Nav(this);
  // this.tab                = new Tab(this);
  // this.pill               = new Pill(this);
  // this.pagination         = new Pagination(this);
  // this.pager              = new Pager(this);
  // this.form               = new Form(this);
  this.branding           = new BrandModifier(this);
  // this.label              = new Label(this);
  // this.panelBase          = new PanelBase(this);
  // this.navbarBase         = new NavbarBase(this);
  // this.buttonBase         = new ButtonBase(this);
  // this.navbar = {
  //     'default':            new Navbar(this),
  //     'inverse':            new Navbar(this, 'inverse')
  // };
  // this.buttons = {
  //     'default':            new Button(this, 'default'),
  //     'primary':            new Button(this, 'primary'),
  //     'success':            new Button(this, 'success'),
  //     'info':               new Button(this, 'info'),
  //     'warning':            new Button(this, 'warning'),
  //     'danger':             new Button(this, 'danger')
  // };
  // this.formStates = {
  //     'default':            new FormState(this, 'default'),
  //     'primary':            new FormState(this, 'primary'),
  //     'success':            new FormState(this, 'success'),
  //     'info':               new FormState(this, 'info'),
  //     'warning':            new FormState(this, 'warning'),
  //     'danger':             new FormState(this, 'danger')
  // };
  // this.listGroup          = new ListGroup(this);

  this.components = [
      // this.misc,
      // this.typography,
      // this.table,
      // this.breadcrumb,
      // this.dropdown,
      // this.tooltip,
      // this.popover,
      // this.thumbnail,
      // this.badge,
      // this.carousel,
      // this.code,
      // this.blockquote,
      // this.modal,
      // this.jumbotron,
      // this.grayScale,
      // this.nav,
      // this.tab,
      // this.pill,
      // this.pagination,
      // this.pager,
      // this.form,
      this.branding,
      // this.label,
      // this.panelBase,
      // this.navbarBase,
      // this.buttonBase,
      // this.navbar.default,
      // this.navbar.inverse,
      // this.buttons.default,
      // this.buttons.primary,
      // this.buttons.success,
      // this.buttons.info,
      // this.buttons.warning,
      // this.buttons.danger,
      // this.formStates.default,
      // this.formStates.primary,
      // this.formStates.success,
      // this.formStates.info,
      // this.formStates.warning,
      // this.formStates.danger,
      // this.listGroup
  ];

  window.addEventListener('ClucklesFrameworkModuleLoaded', function (e) {
      console.log('hrere');
      e.stopPropagation();

      this.components.concat(e.detail.module.components);
      console.log(this.components);
  }, false);

  // All modifier vars
  this.modifiers      = {};

  // Undo/Redo stacks
//        this.undoButton     = docContext.querySelector('*[data-cluckles-options="undo"]');
//        this.redoButton     = docContext.querySelector('*[data-cluckles-options="redo"]');
  this.undoStack      = [];
  this.redoStack      = [];
  this.canTrackUndo   = true;

  this.processor      = new Processor(this, options);

  // Import/Export Management
  this.export         = new Export(this, options.export);
  this.import         = new Import(this, this.processor, options.theme);

  // Configure the Options toolbar
  this.setupToolbar();
  this.setupLocationHashes();

  // Disable the Undo and Redo buttons by default (will re enable when something is changed)
//        if (this.undoButton) {
//            this.undoButton.setAttribute('disabled', 'disabled');
//        }

//        if (this.redoButton) {
//            this.redoButton.setAttribute('disabled', 'disabled');
//        }

//        this.setupEmbed();
  }

/**
* Gets the Currently Active PreProcessor Bridge which can be used to compile the modifiers
* into a theme.
*
* Throws an Exception if the active preprocessor bridge name, is not a configured bridge.
*
* @return object The currently active PreProcessor Bridge.
*/
getActivePreProcessorBridge() {
  if (this.preProcessorBridges.hasOwnProperty(this.activePreProcessorBridgeName)) {
      return this.preProcessorBridges[this.activePreProcessorBridgeName];
  } else {
      throw new Exception('Cluckles could not get non configured PreProcessorBridge "' + this.activePreProcessorBridgeName  + '"');
  }
};

/**
* Refreshes all the Custom styles by triggering change event against each one.
*
* @returns {undefined}
*/
refreshCustomStyles(modifiers) {
  this.applyModifications(modifiers, true);

  var styleInputs = this.import.customStyleInputs.Less;

  styleInputs.forEach((styleInput) => {
    styleInput.dispatchEvent(new Event('change'));
  });
};

/**
* Get the Modifications which have been stored.
*
* @returns {Object}
*/
getModifiers() {
  var grayScale   = this.grayScale,
      navbar      = this.navbar,
      buttons     = this.buttons,
      formStates  = this.formStates,
      modifiers   = this.modifiers;

  // Make sure we always have the vars property as a minimum
  if (!modifiers.hasOwnProperty('vars')) {
      modifiers.vars = {};
  }

  // Gray Base
  Object.keys(grayScale).forEach(function (style) {
      if (grayScale[style].color !== null) {
          if (style === 'gray') {
              modifiers.vars['@gray'] = grayScale[style].color;
          } else {
              modifiers.vars['@gray-' + style] = grayScale[style].color;
          }
      }
  });

  // Navbars
  // Itterate over the object to extract modifications for both styles of Navbar's
  Object.keys(navbar).forEach(function (style) {
      var navbarStyle = navbar[style];

      this.extractModifications(modifiers, navbarStyle);
  }, this);

  // FormStates
  // Itterate over the object to extract modifications for each styles of FormState's
  Object.keys(formStates).forEach(function (style) {
      var formStatesStyle = formStates[style];

      this.extractModifications(modifiers, formStatesStyle);
  }, this);

  // Buttons
  // Itterate over the object to extract modifications for each styles of Button
  Object.keys(buttons).forEach(function (style) {
      var buttonsStyle = buttons[style];

      this.extractModifications(modifiers, buttonsStyle);
  }, this);

  // Typography
  this.extractModifications(modifiers, this.typography);

  // Panel Base
  this.extractModifications(modifiers, this.panelBase);

  // Table
  this.extractModifications(modifiers, this.table);

  // Navbar Base
  this.extractModifications(modifiers, this.navbarBase);

  // Button Base
  this.extractModifications(modifiers, this.buttonBase);

  // Misc
  this.extractModifications(modifiers, this.misc);

  // Nav
  this.extractModifications(modifiers, this.nav);

  // Tab
  this.extractModifications(modifiers, this.tab);

  // Pill
  this.extractModifications(modifiers, this.pill);

  // Pagination
  this.extractModifications(modifiers, this.pagination);

  // Pager
  this.extractModifications(modifiers, this.pager);

  // Form
  this.extractModifications(modifiers, this.form);

  // Branding
  this.extractModifications(modifiers, this.branding);

  // Label
  this.extractModifications(modifiers, this.label);

  // Breadcrumb
  this.extractModifications(modifiers, this.breadcrumb);

  // Dropdown
  this.extractModifications(modifiers, this.dropdown);

  // Tooltip
  this.extractModifications(modifiers, this.tooltip);

  // Popover
  this.extractModifications(modifiers, this.popover);

  // Thumbnail
  this.extractModifications(modifiers, this.thumbnail);

  // Badge
  this.extractModifications(modifiers, this.badge);

  // Carousel
  this.extractModifications(modifiers, this.carousel);

  // Code
  this.extractModifications(modifiers, this.code);

  // Blockquote
  this.extractModifications(modifiers, this.blockquote);

  // Modal
  this.extractModifications(modifiers, this.modal);

  // Jumbotron
  this.extractModifications(modifiers, this.jumbotron);

  // List Group
  this.extractModifications(modifiers, this.listGroup);

  return modifiers;
};

/**
* Extracts the Modifications for the particular style/component by using
* ThemeModifier.prototype.getModifications() and adds them to ClucklesEditor.modifications.
*
* @param {Object} modifiers All of the modifications to the theme.
* @param {Obejct} modifiersType The object which holds the modifications for a particular style/components.
*
* @returns {undefined}
*/
extractModifications(modifiers, modifiersType) {
  var modifiersOfType = modifiersType.getModifications();

  Object.keys(modifiersOfType).forEach(function (modifier) {
      var modifierObject = modifiersOfType[modifier];

      modifiers.vars[modifierObject.variable] = modifierObject.value;
  });
};

/**
* Turns the Modifications to the Theme into JSON.
*
* @returns {String}
*/
getJSON () {
  return JSON.stringify(this.getModifiers());
};

/**
* Applies the modification, or makes the refreshMonitor queue a single update
* in x milliseconds from now, controlled by this.refreshMonitor.delay.
*
* @returns {undefined}
*/
queueModifications() {
  if (this.refreshMonitor.disabled) { return; }

  var customStylesPresent = this.import.customLess.length > 0;

  // If an update is allowed right now, apply the modifications,
  // and refresh the custom styles, which allows the custom styles to update vars
  if (this.refreshMonitor.canRefresh === true) {
      if (customStylesPresent) {
          this.refreshCustomStyles();
      } else {
          this.applyModifications();
      }

      // Set the state to not ready for more updates yet
      this.refreshMonitor.canRefresh = false;

      if (this.refreshMonitor.canDelay === true) {
          // Set a timeout to allow updates again after x time (refreshMonitor.rate)
          // and apply the modifications that were pending (also refreshes custom styles)
          setTimeout(() => {
              if (customStylesPresent) {
                  this.refreshCustomStyles();
              } else {
                  this.applyModifications();
              }

              // Allow updates again
              this.refreshMonitor.canRefresh = true;
          }, this.refreshMonitor.delay);
      }
  }
};

/**
* Applies the Modifications to the Less Theme.
*
* @returns {undefined}
*/
applyModifications (modifications, reload) {
  if (this.refreshMonitor.disabled) { return; }

  var preProcessorBridge = this.getActivePreProcessorBridge();
  // Allow the function to accept custom modifications
  var modifiers = modifications || this.getModifiers();

  // Set the Variables in the Output
  this.setVariablesOutput(modifiers.vars);

  // Find the Calculated modifier values, will replace @variables with
  // their parent values, and perform any calculations to consolidate,
  // to single values e.g. floor((@grid-gutter-width / 2)) -> floor(15px)
  modifiers = this.processor.calculateModifierValues(modifiers.vars);

  preProcessorBridge.apply(modifiers, reload);
};

/**
* Sets the Variables which are displayed in the Variables Output field to the modifiers passed in.
*
* @param {object} modifiers The modifiers to display in the Variables Output field.
*
* @returns {undefined}
*/
setVariablesOutput(modifiers) {
  // Update the Variables output to display the variables being applied
  docContext.querySelector('*[data-cluckles="variables"]').innerHTML = this.processor.transformToVariables(modifiers);
};

/**
* Stores the Most up to date set of Modifiers in the Undo Stack.
*
* @returns {undefined}
*/
pushUndoStack() {
  // If we cant track the state, such as when undo/redoing
  if (this.canTrackUndo === false) { return; }

  var undo                = this.undoStack,
      clonedModifiers     = {},
      originalModifiers   = this.modifiers;

  // We have performed a new action, so we invalidate the ability to redo previous
  // undo's, so reset the redo stack
  this.redoStack = [];

  // If the Stack has 10 or more items
  if (undo.length > (this.options.undoSize - 1 || 9)) {
      // Remove the first item (oldest) from stack
      undo.shift();
  }

  // Now clone the existing modifiers (this.modifiers)
  clonedModifiers = Object.keys(this.modifiers).reduce(function (clone, variable) {
      clone[variable] = originalModifiers[variable];
      return clone;
  }, clonedModifiers);

  // Now push the clone (newest item) to the Stack (undoStack)
  undo.push(clonedModifiers);

  if (this.undoButton && this.undoButton.hasAttribute('disabled')) {
      this.undoButton.removeAttribute('disabled');
  }
};

/**
* Updates the Cluckles modifiers with the newest item from either
* the undo or redo stacks, depending on direction.
*
* @param {string} direction The direction to pull modifiers from (undo/redo(
*
* @returns {undefined}
*/
applyModificationRevision(direction) {
  var stack           = direction === 'undo' ? this.undoStack     : this.redoStack,
      stackButton     = direction === 'undo' ? this.undoButton    : this.redoButton,
      altStack        = direction === 'undo' ? this.redoStack     : this.undoStack,
      altStackButton  = direction === 'undo' ? this.redoButton    : this.undoButton,
      poppedStack;

  // Disable the Undo button if there is nothing to undo
  if (stackButton && stack.length <= 1) {
      stackButton.setAttribute('disabled', 'disabled');
  }

  // If the undo/redo stacks are empty, dont continue
  if (stack.length === 0) {
      return;
  }

  // Disallow modifications to be tracked/applied automatically
  this.canTrackUndo               = false;
  this.refreshMonitor.disabled    = true;

  // Reset the Modifiers and Components
  this.modifiers = {};
  this.resetComponents();

  // Pop the newest item of the top of the stacj
  poppedStack = stack.pop();

  // If we are undoing, we want to load the second to last item in the stack (last item already popped)
  if (direction === 'undo') {
      this.import.loadComponentModifiers(stack[stack.length - 1]);
  } else {
      // If we are redoing, we want to load the item we popped
      this.import.loadComponentModifiers(poppedStack);
  }

  // Move the newest items from one stack to the other
  altStack.push(poppedStack);

  // Allow modifications to be tracked/applied automatically
  this.canTrackUndo               = true;
  this.refreshMonitor.disabled    = false;

  // Now apply the modifications to update the UI (will also set modifiers again)
  this.applyModifications();

  // Now enable the altStackButton, effectively toggling the Undo/Redo buttons,
  // depending on which one has items in their stack
  if (altStackButton && altStackButton.hasAttribute('disabled')) {
      altStackButton.removeAttribute('disabled');
  }
};

/**
* Undo's modifications which have been applied and moved the newest modifications
* to the redoStack.
*
* @returns {undefined}
*/
undo() {
  this.applyModificationRevision('undo');
};

/**
* Redo modifications that were pushed into the redoStack after applying an undo.
*
* @returns {undefined}
*/
redo() {
  this.applyModificationRevision('redo');
};

/**
* Resets the current Theme to the Bootstrap default (or whatever .less file the browser
* has loaded e.g. <link type="text/css" href="../less/bootstrap.less" rel="stylesheet/less" />)
* including any modifications which have been stored, and resets the editor inputs.
*
* @returns {undefined}
*/
resetToDefault() {
  // Remove all stored modifications
  this.modifiers = {};
  this.undoStack = [];
  this.redoStack = [];

  // Disable the Undo and Redo buttons when resetting to Default
  if (this.undoButton && !this.undoButton.hasAttribute('disabled')) {
      this.undoButton.setAttribute('disabled', 'disabled');
  }

  if (this.redoButton && !this.redoButton.hasAttribute('disabled')) {
      this.redoButton.setAttribute('disabled', 'disabled');
  }

  // Reset the Custom Styles and Theme Metadata
  this.import.resetCustomStyles();
  this.import.resetMeta();

  // Reset all the Components
  this.resetComponents();

  // Now make less modify blank changes, resetting the Theme
  this.applyModifications(null, true);
};

/**
* Resets the Modifiers loaded into Cluckles and loads the modifiers passed
* in.
*
* @param {object} modifiers The modifiers to load.
*
* @returns {undefined}
*/
resetFromModifiers(modifiers) {
  // Copy the current undoStack
  var currentUndoStack = this.undoStack.slice(0);

  // Reset to the Defaults, so we dont get weird hangover between the theme
  // and new modifications
  this.resetToDefault();

  // Disallow modifications to be tracked/applied automatically
  this.canTrackUndo    = false;

  // Now import the theme modifiers (from the theme.json file { theme: 'theme.json' })
  // It will automatically apply this
  this.import.handleThemeImport(modifiers);

  // Restore the undoStack (resetToDefault clears the stacks)
  this.undoStack = currentUndoStack;
  // Push the modifiers from the Theme onto the undo stack
  this.pushUndoStack();

  // Allow modifications to be tracked/applied automatically
  this.canTrackUndo = true;
};

/**
* Resets the current Theme to the Theme which was imported by providing the
* theme.src option (including resetting the components/subscribers).
*
* @returns {undefined}
*/
resetToTheme() {
  this.resetFromModifiers(this.import.themeModifiers);
};

/**
* Reset all of the Components and their Subscribers.
*
* @returns {undefined}
*/
resetComponents() {
  // Disable modification queuing
  this.refreshMonitor.canRefresh = false;

  this.components.forEach((component) => {
      if (component instanceof ThemeModifier) {
          component.resetModifiers();
      }
  });

  // Allow modification queuing
  this.refreshMonitor.canRefresh = true;
};

/**
* Sets up the Location Hashes so that clicking on buttons/links will jump the page content
* to that location on the page.
*
* @returns {undefined}
*/
setupLocationHashes() {
  var locationHashedElements = [].slice.call(docContext.querySelectorAll('*[data-cluckles-location]'));

  locationHashedElements.forEach(function (toHash) {
      toHash.addEventListener('click', function () {
          window.location.hash = null; // Clear the existing hash
          window.location.hash = this.dataset.clucklesLocation; // Now jump to the location defined by the data attribute
      });
  });
};

setupToolbar() {
  var resetButton         = docContext.querySelector('*[data-cluckles-options="reset"]'),
      resetThemeButton    = docContext.querySelector('*[data-cluckles-options="reset-theme"]');

  if (resetButton) {
      resetButton.addEventListener('click', this.resetToDefault.bind(this), false);
  }

  if (resetThemeButton) {
      resetThemeButton.addEventListener('click', this.resetToTheme.bind(this), false);
  }

  if (this.undoButton) {
      this.undoButton.addEventListener('click', this.undo.bind(this), false);
  }

  if (this.redoButton) {
      this.redoButton.addEventListener('click', this.redo.bind(this), false);
  }
};

/**
* Sets up the window onresize event if the `embedSelector` option was provided
* and this cluckles instance is inside of an embedded object.
*
* @returns {undefined}
*/
setupEmbed() {
  // If we have provided an embedSelector, we are assuming that the ClucklesEditor is
  // inside an embeded object, so we need the parent element to be set the same height
  // as the BODY of the embedded document
  // if not in context of an emded, window.parent will be the same as window
  if (this.options && this.options.hasOwnProperty('embedSelector') && window.parent !== window) {
      window.onresize = function () {
          // Window.parent = parent window which contains the embedded document
          // then get the Document (parent document) and find our embeded object
          // Then style the parent node (which ur emdeded object is a direct descendant)
          docContext.querySelector(this.options.embedSelector).parentNode.style.height = window.document.body.clientHeight + 'px';
      }.bind(this);

      // Set timeout hack to make it fire once everything is loaded
      // so we dont get the iframe being slighly too short
      setTimeout(function () {
          // Fire event after setup, to initially set the height
          window.dispatchEvent(new Event('resize'));
      }, 0);

      // Also add a ready event for the current DOM, so that we make sure once everything is loaded
      // we are setting the correct height
      docContext.addEventListener('DOMContentLoaded', function () {
          window.dispatchEvent(new Event('resize'));
      });
  }
};
}

export default ClucklesEditor;
