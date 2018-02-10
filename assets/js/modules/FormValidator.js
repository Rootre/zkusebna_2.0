import validate from 'validate.js'

import {is_eng} from '../settings'

validate.options = {
	fullMessages: false,
};
validate.validators.email.options = {
	message: is_eng ? 'Incorrect email' : 'Nesprávný email',
};
validate.validators.length.options = {
	tooShort: is_eng ? 'At least %{count} characters' : 'Minimálně %{count} znaky',
};
validate.validators.format.options = {
	message: is_eng ? 'Incorrect format' : 'Nesprávný formát',
};

/**
 * Validators works with validate.js (https://validatejs.org) and build constraints from data attributes set for each form input.
 * Validators are set inside data-validate attribute (space separated), and more specific options are set inside data-validate-[validator] attribute, as JSON
 */
function FormValidator($form) {
	this.classes = {
		error: 'field-error',
		success: 'field-success',
		messageError: 'error',
	};
	this.selectors = {
		inputGroup: '.form-field',
		inputs: "input[data-validate], select[data-validate], textarea[data-validate]",
	};
	this.$form = $form;
	this.$formInputs = $(this.selectors.inputs, $form);
}
/**
 * Starts watching form submit and input changes
 */
FormValidator.prototype.watch = function () {
	if (typeof validate !== 'function') {
		return console.log('validate is not a function');
	}
	if (!this.$form.length || this.$form[0].tagName !== "FORM") {
		return console.log('$form is not a jQuery form object', this.$form);
	}

	var self = this;
	this.$form.off('.formvalidator').on('submit.formvalidator', function (e) {
		self._handleFormSubmit(e);
	});
	this.$formInputs.off('.inputvalidator').on('blur.inputvalidator change.inputvalidator', function () {
		self._handleInputChange($(this));
	});
};
/**
 * Generates error for input group
 * @param $inputGroup
 * @param error
 * @private
 */
FormValidator.prototype._addError = function ($inputGroup, error) {
	$('<p/>', {
		class: this.classes.messageError + ' helper',
		text: error,
		style: 'display:none'
	}).appendTo($inputGroup).fadeIn();
};
/**
 * Loops through $inputs and from data-validate attribute builds constraints object
 * @param $inputs
 * @returns {}
 * @private
 */
FormValidator.prototype._getAllConstraints = function ($inputs) {
	var self = this,
		constraints = {};

	$inputs.each(function () {
		var rules = self._getConstraints($(this));

		if (Object.keys(rules).length) {
			constraints[this.name] = rules;
		}
	});

	return constraints;
};
FormValidator.prototype._getConstraints = function ($input) {
	var validations = $input.data('validate'),
		constraints = {};

	if (validations) {
		validations.split(' ').forEach(function (validation) {
			var customValidation = $input.data('validate-' + validation);

			constraints[validation] = !!customValidation ? customValidation : true;
		})
	}

	return constraints;
};
FormValidator.prototype._destroy = function () {
	this.$form.off('submit.formvalidator');
	this.$formInputs.off('blur.inputvalidator change.inputvalidator');
};
/**
 * Fires when form is submitted
 * @param e Event
 * @private
 */
FormValidator.prototype._handleFormSubmit = function (e) {
	// validate the form against the constraints
	var errors = this._getAllErrors();

	// we update the form to reflect the results only when there are errors
	if (errors) {
		e.preventDefault();
		// focus on first input with error
		this.$formInputs.filter('[name='+Object.keys(errors)[0]+']').focus();
		this._showErrors(errors || {});
	}
};
/**
 * Fires when form input is changed
 * @param $input
 * @private
 */
FormValidator.prototype._handleInputChange = function ($input) {
	var errors = validate.single($input.val(), this._getConstraints($input));

	this._evaluateInput($input, errors);
};
/**
 * Returns all errors in form
 */
FormValidator.prototype._getAllErrors = function () {
	var attributes = {};

	this.$formInputs.each(function () {
		attributes[this.name] = $(this).val();
	});

	return validate(attributes, this._getAllConstraints(this.$formInputs));
};
/**
 * Reinitialize validator
 */
FormValidator.prototype._reinit = function () {
	this.$formInputs = $(this.selectors.inputs, this.$form);
	this.watch();
};
FormValidator.prototype._removeErrors = function () {
	var self = this;
	this.$form.find('.' + this.classes.messageError).each(function () {
		self._resetFormGroup($(this).parent());
	});
};
/**
 * Removes error message and classes from $inputGroup
 * @param $inputGroup
 * @private
 */
FormValidator.prototype._resetFormGroup = function ($inputGroup) {
	// Remove the success and error classes
	$inputGroup.removeClass(this.classes.success + ' ' + this.classes.error);
	// and remove any old messages
	$inputGroup.find('.' + this.classes.messageError).remove();
};
/**
 * Loops through $formInputs and shows error for each input
 * @param errors
 * @private
 */
FormValidator.prototype._showErrors = function (errors) {
	var self = this;
	// We loop through all the inputs and show the errors for that input
	this.$formInputs.each(function () {
		// Since the errors can be null if no errors were found we need to handle that
		self._evaluateInput($(this), errors && errors[this.name]);
	});
};
/**
 * Shows errors for $input, if there are any
 * @param $input
 * @param errors
 * @private
 */
FormValidator.prototype._evaluateInput = function ($input, errors) {
	var $inputGroup = $input.parents(this.selectors.inputGroup).first(),
		self = this;
	// First we remove any old messages and resets the classes
	this._resetFormGroup($inputGroup);
	// If we have errors
	if (errors) {
		// we first mark the group is having errors
		$inputGroup.addClass(this.classes.error);
		// we show only first error
		self._addError($inputGroup, errors[0]);
	} else {
		// otherwise we simply mark it as success
		$inputGroup.addClass(this.classes.success);
	}
};

// module for dynamic changing of input's validation rules
export const EditValidation = {
	alter: function ($input, validation) {
		var dataValidate = [];

		for (var key in validation) {
			if (validation.hasOwnProperty(key)) {
				dataValidate.push(key);
				if (typeof(validation[key]) === "object") {
					$input.data('validate-' + key, validation[key]);
				}
			}
		}
		$input.data('validate', dataValidate.join(' '));
	}
};

export default FormValidator