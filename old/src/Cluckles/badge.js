	/**
	 * Allows modification of the Badge component in Bootstrap.
	 * 
	 * @class Badge
	 * @extends ThemeModifier
	 * 
	 * @param {ClucklesEditor} editor instance which manages the less modifications.
	 * 
	 * @property {object} color             The @badge-color variable which controls the Color of the Badge Component.
	 * @property {object} linkHoverColor    The @badge-link-hover-color variable which controls the Link Hover Color of the Badge Component.
	 * @property {object} bg                The @badge-bg variable which controls the Background Color of the Badge Component.
	 * @property {object} activeColor       The @badge-active-color variable which controls the Active Color of the Badge Component.
	 * @property {object} activeBg          The @badge-active-bg variable which controls the Active Background Color of the Badge Component.
	 * @property {object} fontWeight        The @badge-font-weight variable which controls the Font Weight of the Badge Component.
	 * @property {object} lineHeight        The @badge-line-height variable which controls the Line Height of the Badge Component.
	 * @property {object} borderRadius      The @badge-border-radius variable which controls the Border Radius of the Badge Component.
	 * 
	 * @returns {Badge}
	 */
	var Badge = function (editor) {
		ThemeModifier.call(this, editor); // Call parent constructor

        this.subscriberDataAttribute = 'data-cluckles-badge';

        // Configure the Modifiers
		this.color = {
			variable:           '@badge-color',
            subscribeProperty:  'color',
            changeFn:           this.setColor.bind(this),
            subscribers:        [],
			_value:             null
		};
        this.linkHoverColor = {
			variable:           '@badge-link-hover-color',
            subscribeProperty:  'link-hover-color',
            changeFn:           this.setLinkHoverColor.bind(this),
            subscribers:        [],
			_value:             null
		};
        this.bg = {
			variable:           '@badge-bg',
            subscribeProperty:  'bg',
            changeFn:           this.setBackgroundColor.bind(this),
            subscribers:        [],
			_value:             null
        };
		this.activeColor = {
			variable:           '@badge-active-color',
            subscribeProperty:  'active-color',
            changeFn:           this.setActiveColor.bind(this),
            subscribers:        [],
			_value:             null
		};
		this.activeBg = {
			variable:           '@badge-active-bg',
            subscribeProperty:  'active-bg-color',
            changeFn:           this.setActiveBackgroundColor.bind(this),
            subscribers:        [],
			_value:             null
		};
		this.fontWeight = {
			variable:           '@badge-font-weight',
            subscribeProperty:  'font-weight',
            changeFn:           this.setFontWeight.bind(this),
            subscribers:        [],
			_value:             null
		};
		this.lineHeight = {
			variable:           '@badge-line-height',
            subscribeProperty:  'line-height',
            changeFn:           this.setLineHeight.bind(this),
            subscribers:        [],
			_value:             null
		};
		this.borderRadius = {
			variable:           '@badge-border-radius',
            subscribeProperty:  'border-radius',
            suffixUnit:         true,
            changeFn:           this.setBorderRadius.bind(this),
            subscribers:        [],
			_value:             null
		};
		
        // Configure the modifiers so they can be extracted easier
        this.modifiers = {
            color:          this.color,
            linkHoverColor: this.linkHoverColor,
            bg:             this.bg,
            activeColor:    this.activeColor,
            activeBg:       this.activeBg,
            fontWeight:     this.fontWeight,
            lineHeight:     this.lineHeight,
            borderRadius:   this.borderRadius
        };

        this.setupDataBinding();
	};
	
	// Inherit from parent Prototype and preserve constructor
	Badge.prototype             = Object.create(ThemeModifier.prototype);
	Badge.prototype.constructor = Badge;

    /**
	 * Gets the Color of the Badge Component.
	 * 
	 * @returns {string}
	 */
	Badge.prototype.getColor = function () {
		return this.modifiers.color.value;
	};

	/**
	 * Sets the Color of the Badge Component.
	 * 
	 * @param {string} color The Badge Color to set.
	 * 
	 * @returns {undefined}
	 */
	Badge.prototype.setColor = function (color) {
		this.modifiers.color.value = color;
	};

    /**
	 * Gets the Link Hover Color of the Badge Component.
	 * 
	 * @returns {string}
	 */
	Badge.prototype.getLinkHoverColor = function () {
		return this.modifiers.linkHoverColor.value;
	};
	
	/**
	 * Sets the Link Hover Color of the Badge Component.
	 * 
	 * @param {string} linkHoverColor The Badge Link Hover Color to set.
	 * 
	 * @returns {undefined}
	 */
	Badge.prototype.setLinkHoverColor = function (linkHoverColor) {
		this.modifiers.linkHoverColor.value = linkHoverColor;
	};

	/**
	 * Gets the Background Color of the Badge Component.
	 * 
	 * @returns {String}
	 */
	Badge.prototype.getBackgroundColor = function () {
		return this.modifiers.bg.value;
	};

	/**
	 * Sets the Background Color of the Badge Component.
	 * 
	 * @param {string} backgroundColor The Badge Background Color to set.
	 * 
	 * @returns {undefined}
	 */
	Badge.prototype.setBackgroundColor = function (backgroundColor) {
		this.modifiers.bg.value = backgroundColor;
	};

	/**
	 * Gets the Active Color of the Badge Component.
	 * 
	 * @returns {string}
	 */
	Badge.prototype.getActiveColor = function () {
		return this.modifiers.activeColor.value;
	};

	/**
	 * Sets the Active Color of the Badge Component.
	 * 
	 * @param {string} activeColor The Badge Active Color to set.
	 * 
	 * @returns {undefined}
	 */
	Badge.prototype.setActiveColor = function (activeColor) {
		this.modifiers.activeColor.value = activeColor;
    };

	/**
	 * Gets the Active Background Color of the Badge Component.
	 * 
	 * @returns {string}
	 */
	Badge.prototype.getActiveBackgroundColor = function () {
		return this.modifiers.activeBg.value;
	};

	/**
	 * Sets the Active BackgroundColor of the Badge Component.
	 * 
	 * @param {string} activeBackgroundColor The Badge Active Background Color to set.
	 * 
	 * @returns {undefined}
	 */
	Badge.prototype.setActiveBackgroundColor = function (activeBackgroundColor) {
		this.modifiers.activeBg.value = activeBackgroundColor;
    };

    /**
     * Gets the Font Weight of the Badge Component.
     * 
     * @returns {string}
     */
    Badge.prototype.getFontWeight = function () {
        return this.modifiers.fontWeight.value;
    };

    /**
     * Sets the Font Weight of the Badge Component.
     * 
     * @param {string} fontWeight The Badge Font Weight to set.
     * 
     * @returns {undefined}
     */
    Badge.prototype.setFontWeight = function (fontWeight) {
        this.modifiers.fontWeight.value = fontWeight;
    };

    /**
     * Gets the Line Height of the Badge Component.
     * 
     * @returns {string}
     */
    Badge.prototype.getLineHeight = function () {
        return this.modifiers.lineHeight.value;
    };

    /**
     * Sets the Line Height of the Badge Component.
     * 
     * @param {string} lineHeight The Badge Line Height to set.
     * 
     * @returns {undefined}
     */
    Badge.prototype.setLineHeight = function (lineHeight) {
        this.modifiers.lineHeight.value = lineHeight;
    };

    /**
     * Gets the Border Radius of the Badge Component.
     * 
     * @returns {string}
     */
    Badge.prototype.getBorderRadius = function () {
        return this.modifiers.borderRadius.value;
    };

    /**
     * Sets the Border Radius of the Badge Component.
     * 
     * @param {string} borderRadius The Badge Border Radius to set.
     * @param {string} unit         The CSS measurement unit to suffix to the value.
     * 
     * @returns {undefined}
     */
    Badge.prototype.setBorderRadius = function (borderRadius, unit) {
        if (unit !== undefined) { this.modifiers.borderRadius.unit = unit; }

        this.modifiers.borderRadius.value = borderRadius;
    };