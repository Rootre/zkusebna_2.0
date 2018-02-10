
/**
 * This module serves for material design and provides correct classes on .form-field wrapper to reflect state of the input
 * @module {Forms} Forms
 */

/**
 * Holds all form objects with its fields and listens for changes
 * @type {Array.<Object>}
 * @property {jQuery} Array[].$form - form object
 * @property {jQuery} Array[].$fields - all fields within a form
 */
let forms = []

/**
 * Classes types
 * @type {Object.<string, string>}
 * @property {string} filled='filled' - when the input field is filled
 */
let classes = {
	filled: 'filled',
}

/**
 * CSS selectors for various
 * @type {Object.<string>}
 * @property {string} form='form' - forms
 * @property {string} field='.form-field' - form field usually holds one or more form elements
 * @property {string} inputs='input,select,textarea' - which input should be watched for changes
 */
let selectors = {
	form: 'form',
	field: '.form-field',
	inputs: 'input,select,textarea',
}

/**
 * Gets all form fields and start listening to changes on inputs to add .filled class if needed
 */
const init = () => {
	forms = []

	_assemble()
	_connect()
}

/**
 * Goes through all forms and pushes every form with all its fields into the forms variable
 * @private
 */
const _assemble = () => {
	$(selectors.form).each(function() {
		forms.push({
			$form: $(this),
			$fields: $(this).find(selectors.field)
		});
	})
}

/**
 * Starts listening to changes and blurs of defined inputs
 * @private
 */
const _connect = () => {
	forms.forEach(function (form) {
		if (form.$fields.length) {
			form.$fields.find(selectors.inputs).each(function () {
				_setInputClass($(this));
				$(this).on('change blur', function () { _setInputClass($(this)) });
			})
		}
	})
}

/**
 * Checks input for value or placeholder and sets .filled class accordingly
 * @param {jQuery} $input - input element
 * @private
 */
const _setInputClass = ($input) => {
	var value = $input.val(),
		$field = $input.parents(selectors.field);

	if (value || !value && $input.attr('placeholder')) {
		$field.addClass(classes.filled);
	}
	else {
		$field.removeClass(classes.filled);
	}
}

export default {
	init
}