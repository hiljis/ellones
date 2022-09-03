import './dropdownListItem.scss';

type DropdownListItemProps = {
	children: React.ReactNode | React.ReactNode[];
};

const DropdownListItem = (props: DropdownListItemProps) => {
	return <li className="dropdownListItem">{props.children}</li>;
};

export default DropdownListItem;
