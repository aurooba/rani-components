/**
 * Modify the hierarchical taxonomy selector to be a dropdown
 */

import { decode } from 'html-entities';
import { useSelect, useDispatch } from '@wordpress/data';
import { store as coreStore } from '@wordpress/core-data';
import { SelectControl } from '@wordpress/components';
import { store as editorStore } from '@wordpress/editor';

const DEFAULT_QUERY = {
	per_page: -1,
	orderby: 'name',
	order: 'asc',
	_fields: 'id,name,parent',
	context: 'view',
};

export const TaxonomyDropdown = (slug) => {
	const { editPost } = useDispatch(editorStore);
	const { terms, availableTerms, taxonomy } = useSelect((select) => {
		const { getTaxonomy, getEntityRecords } = select(coreStore);
		const { getEditedPostAttribute } = select(editorStore);
		const taxonomy = getTaxonomy(slug.slug);

		return {
			terms: taxonomy ? getEditedPostAttribute(taxonomy.rest_base) : [],
			availableTerms: getEntityRecords('taxonomy', slug.slug, DEFAULT_QUERY),
			taxonomy: taxonomy,
		};
	});
	const onChange = (val) => {
		const termId = parseInt(val, 10);
		editPost({ [taxonomy.rest_base]: [termId] });
	};
	return (
		availableTerms && (
			<SelectControl
				onChange={onChange}
				value={terms[0]}
				options={availableTerms.map((term) => {
					const termname = decode(term.name);
					return {
						value: term.id,
						label: termname,
					};
				})}
			/>
		)
	);
};
