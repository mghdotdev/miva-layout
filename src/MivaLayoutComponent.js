import MivaLayoutComponentTree from './MivaLayoutComponentTree';
import camelCase from 'lodash.camelCase';

export default class MivaLayoutComponent {

	constructor( component ) {

		// validate component object type
		if ( typeof component != 'object' ) {
			throw new TypeError( '[MivaLayoutComponent] - "component" is not an object' );
		}

		// Standard properties
		this.active = component.active;
		this.id = component.id;
		this.componentId = component.component_id;
		this.componentImage = component.component.image;
		this.componentDescription = component.component.descrip;
		this.layoutId = component.layout_id;
		this.parentId = component.parent;
		this.name = component.name;
		this.type = component.component.code;
		this.typeName = component.component.name;
		this.childrenCount = ( component.children_count == undefined ) ? 0 : component.children_count;

		// special attributes structure
		this.attributes = this._createAttributes( component.attributes );

		// special children structure
		this.children = new MivaLayoutComponentTree( component.children );

	}

	/* ================================ Public Methods ================================ */

	/* ================================ Private Methods ================================ */

	_createAttributes( attributes ) {

		if ( typeof attributes == 'object' ) {

			return Object.keys( attributes ).reduce((modifiedAttrs, attrKey ) => {

				let formattedAttrKey = camelCase( attrKey ); 

				return {
					...modifiedAttrs,
					[ formattedAttrKey ]: this._formatAttributeValue( attributes[ attrKey ] )
				};

			}, {});

		}

		return {};

	}

	_formatAttributeValue( attribute ) {

		if (
			(attribute.value == '') ||
			(
				(attribute.value == ':id=0') &&
				(attribute.product != undefined)
			)
			||
			(
				(attribute.value == ':id=0') &&
				(attribute.category != undefined)
			)
		) {

			return null;

		}
		else {

			if ( attribute.product != undefined ) {

				return attribute.product;

			}

			if ( attribute.category != undefined ) {

				return attribute.category;

			}

			return attribute.value;

		}

	}

}
