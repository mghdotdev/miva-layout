import MivaLayoutComponentTree from './MivaLayoutComponentTree';
import camelCase from 'lodash.camelCase';

export default class MivaLayoutComponent {

	constructor( component ) {

		var self = this;

		// validate component object type
		if ( typeof component != 'object' ) {
			throw new TypeError( '[MivaLayoutComponent] - "component" is not an object' );
		}

		// Standard properties
		self.active = component.active;
		self.id = component.id;
		self.componentId = component.component_id;
		self.componentImage = component.component.image;
		self.componentDescription = component.component.descrip;
		self.layoutId = component.layout_id;
		self.parentId = component.parent;
		self.name = component.name;
		self.type = component.component.code;
		self.typeName = component.component.name;
		self.childrenCount = ( component.children_count == undefined ) ? 0 : component.children_count;

		// special attributes structure
		self.attributes = self._createAttributes( component.attributes );

		// special children structure
		self.children = new MivaLayoutComponentTree( component.children );

	}

	_createAttributes( attributes ) {

		var self = this;

		if ( typeof attributes == 'object' ) {

			return Object.keys( attributes ).reduce(function( modifiedAttrs, attrKey ) {

				var formattedAttrKey = camelCase( attrKey ); 

				return {
					...modifiedAttrs,
					[ formattedAttrKey ]: self._formatAttributeValue( attributes[ attrKey ] )
				};

			}, {});

		}

		return {};

	}

	_formatAttributeValue( attribute ) {

		var self = this;

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
