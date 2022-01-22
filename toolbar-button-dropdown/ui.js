/**
 * External dependencies
 */
import { find } from 'lodash';

/**
 * WordPress dependencies
 */
import { __, isRTL } from '@wordpress/i18n';
import { DropdownMenu, ToolbarGroup } from '@wordpress/components';

// const DEFAULT_LIST_CONTROLS = [
// 	{
// 		icon: formatListBullets,
// 		title: __('Unordered list'),
// 		listStyle: 'ul',
// 	},
// 	{
// 		icon: formatListNumbered,
// 		title: __('Ordered List'),
// 		listStyle: 'ol',
// 	},
// 	{
// 		icon: menu,
// 		title: __('No marker'),
// 		listStyle: 'none',
// 	},
// ];

const POPOVER_PROPS = {
	position: 'bottom right',
	isAlternate: true,
};

function ButtonDropdownUI({
	value,
	onChange,
	optionControls,
	label = __('Button Dropdown'),
	describedBy = __('A list of options to select from'),
	isCollapsed = true,
	isToolbar = true,
	isToolbarButton = true,
	PopoverProps = POPOVER_PROPS,
}) {
	function applyOrUnset(currentOption) {
		return () => onChange(value === currentOption ? undefined : currentOption);
	}

	const activeSelection = find(
		listControls,
		(control) => control.currentOption === value,
	);

	function setIcon() {
		if (activeSelection) return activeSelection.icon;
	}

	const UIComponent = isToolbar ? ToolbarGroup : DropdownMenu;
	const extraProps = isToolbar ? { isCollapsed } : { isToolbarButton };

	return (
		<UIComponent
			icon={setIcon()}
			label={label}
			toggleProps={{ describedBy }}
			popoverProps={PopoverProps}
			controls={listControls.map((control) => {
				const { currentOption } = control;
				const isActive = value === currentOption;

				return {
					...control,
					isActive,
					role: isCollapsed ? 'menuitemradio' : undefined,
					onClick: applyOrUnset(currentOption),
				};
			})}
			{...extraProps}
		/>
	);
}

export default ButtonDropdownUI;
