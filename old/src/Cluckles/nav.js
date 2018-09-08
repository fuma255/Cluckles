    /**
     * Allows modifications of the Nav Components in Bootstrap.
     * 
	 * @class Nav
	 * @extends ThemeModifier
	 * 
	 * @param {ClucklesEditor} editor instance which manages the less modifications.
     * 
     * @property {object} linkPadding               The @nav-link-padding variable which controls the Link Padding of the Nav Component.
     * @property {object} linkHoverBg               The @nav-link-hover-bg variable which controls the Link Hover Color of the Nav Component.
     * @property {object} linkDisabledColor         The @nav-disabled-link-color variable which controls the Disabled Link Color of the Nav Component.
     * @property {object} linkDisabledHoverColor    The @nav-disabled-link-hover-color variable which controls the Disabled Link Hover Color of the Nav Component.
     * 
     * @returns {Nav}
     */
    var Nav = function (editor) {
        ThemeModifier.call(this, editor); // Call parent constructor

        this.subscriberDataAttribute = 'data-cluckles-nav';

        // Configure the Modifiers
        this.linkPadding = {
            variable:           '@nav-link-padding',
            subscribeProperty:  'link-padding',
            suffixUnit:         true,
            changeFn:           this.setLinkPadding.bind(this),
            subscribers:        [],
			_value:             null
        };
        this.linkHoverBg = {
            variable:           '@nav-link-hover-bg',
            subscribeProperty:  'link-hover-bg',
            changeFn:           this.setLinkHoverBackgroundColor.bind(this),
            subscribers:        [],
			_value:             null
        };
        this.linkDisabledColor = {
            variable:           '@nav-disabled-link-color',
            subscribeProperty:  'link-disabled-color',
            changeFn:           this.setLinkDisabledColor.bind(this),
            subscribers:        [],
			_value:             null
        };
        this.linkDisabledHoverColor = {
            variable:           '@nav-disabled-link-hover-color',
            subscribeProperty:  'link-disabled-hover-color',
            changeFn:           this.setLinkDisabledHoverColor.bind(this),
            subscribers:        [],
			_value:             null
        };
        
        // Configure the modifiers so they can be extracted easier
        this.modifiers = {
            linkPadding:            this.linkPadding,
            linkHoverBg:            this.linkHoverBg,
            linkDisabledColor:      this.linkDisabledColor,
            linkDisabledHoverColor: this.linkDisabledHoverColor
        };

        this.setupDataBinding();
    };

    // Inherit from parent Prototype and preserve constructor
    Nav.prototype               = Object.create(ThemeModifier.prototype);
    Nav.prototype.constructor   = Nav;

    /**
     * Gets the Link Padding of the Nav Components.
     * 
     * @returns {String}
     */
    Nav.prototype.getLinkPadding = function () {
        return this.modifiers.linkPadding.value;
    };
    
    /**
     * Sets the Link Padding of the Nav Components.
     * 
     * @param {string} linkPadding The Nav Link Padding to set.
     * @param {string} unit        The CSS measurement unit to suffix to the value.
     * 
     * @returns {undefined}
     */
    Nav.prototype.setLinkPadding = function (linkPadding, unit) {
        if (unit !== undefined) { this.modifiers.linkPadding.unit = unit; }

        this.modifiers.linkPadding.value = linkPadding;
    };

	/**
	 * Gets the the Link Hover Background of the Nav Components.
	 * 
	 * @returns {string}
	 */
	Nav.prototype.getLinkHoverBackgroundColor = function () {
		return this.modifiers.linkHoverBg.value;
	};
	
	/**
	 * Sets the Link Hover Background of the Nav Components.
	 * 
	 * @param {string} linkHoverBg The Nav Link Hover Background Color to set.
	 * 
	 * @returns {undefined}
	 */
	Nav.prototype.setLinkHoverBackgroundColor = function (linkHoverBackgroundColor) {
		this.modifiers.linkHoverBg.value = linkHoverBackgroundColor;
	};

    /**
	 * Gets the Link Disabled Color of the Nav Components.
	 * 
	 * @returns {string}
	 */
	Nav.prototype.getLinkDisabledColor = function () {
		return this.modifiers.linkDisabledColor.value;
	};
	
	/**
	 * Sets the Link Disabled Color of the Nav Components.
	 * 
	 * @param {string} linkDisabledColor The Nav Link Disabled Color to set.
	 * 
	 * @returns {undefined}
	 */
	Nav.prototype.setLinkDisabledColor = function (linkDisabledColor) {
		this.modifiers.linkDisabledColor.value = linkDisabledColor;
	};

	/**
	 * Gets the Link Disabled Hover Color of the Nav Components.
	 * 
	 * @returns {string}
	 */
	Nav.prototype.getLinkDisabledHoverColor = function () {
		return this.modifiers.linkDisabledHoverColor.value;
	};
	
	/**
	 * Sets the Link Disabled Hover Color of the Nav Components.
	 * 
	 * @param {string} linkDisabledHoverColor The Nav Link Disabled Hover Color to set.
	 * 
	 * @returns {undefined}
	 */
	Nav.prototype.setLinkDisabledHoverColor = function (linkDisabledHoverColor) {
		this.modifiers.linkDisabledHoverColor.value = linkDisabledHoverColor;
	};