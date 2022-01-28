/**
 * External dependencies
 */
import { find } from "lodash";

/**
 * WordPress dependencies
 */
import { __, isRTL } from "@wordpress/i18n";
import { ToolbarGroup } from "@wordpress/components";

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
	position: "bottom right",
	isAlternate: true,
};

function ButtonDropdownUI({
	value,
	onChange,
	optionControls,
	title = __("Button Dropdown"),
	describedBy = __("A list of options to select from"),
	isCollapsed = true,
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

	return "toolbar" === placement ? (
		<ToolbarGroup
			icon={setIcon()}
			label={describedBy}
			popoverProps={PopoverProps}
			controls={optionControls.map((control) => {
				const { currentOption } = control;
				const isActive = value === currentOption;

				return {
					...control,
					isActive,
					role: isCollapsed ? "menuitemradio" : undefined,
					onClick: applyOrUnset(currentOption),
				};
			})}
		/>
	) : (
		<fieldset className="block-editor-hooks__flex-layout-justification-controls">
			<legend>{__(`${describedBy}`)}</legend>
			<div>
				{optionControls.map(({ icon, listStyle, title }) => {
					return (
						<Button
							key={listStyle}
							label={__(title)}
							icon={icon}
							isPressed={listStyle === value}
							onClick={applyOrUnset(listStyle)}
						/>
					);
				})}
			</div>
		</fieldset>
	);
}

export default ButtonDropdownUI;
