import MivaLayoutComponentTree from './MivaLayoutComponentTree';
import _camelCase from 'lodash/camelcase';
import _kababCase from 'lodash/kebabCase';
import _startCase from 'lodash/startCase';

export default class MivaLayoutComponent {

	constructor( component, orignalIndex, $instanceId ) {

		// validate component object type
		if ( typeof component != 'object' ) {
			throw new TypeError( '[MivaLayoutComponent] - "component" is not an object' );
		}

		// Standard properties
		this.active = component.active;
		this.id = component.id;
		this.code = component.code;
		this.componentId = component.component_id;
		this.componentImage = component.component.image;
		this.componentDescription = component.component.descrip;
		this.layoutId = component.layout_id;
		this.parentId = component.parent;
		this.name = component.name;
		this.type = component.component.code;
		this.typeName = component.component.name;
		this.typeTag = _kababCase( component.component.code );
		this.typeClass = _startCase( _camelCase( component.component.code ) );
		this.childrenCount = ( component.children_count == undefined ) ? 0 : component.children_count;
		this.index = orignalIndex;
		this.$instanceId = $instanceId;

		// special attributes structure
		this.attributes = this._createAttributesWithFormat( component.attributes, _camelCase );
		this.attributeProps = this._createAttributesWithFormat( component.attributes, _kababCase );

		// special children structure
		this.children = new MivaLayoutComponentTree( component.children, $instanceId );

		// copy unmodified component object into private property
		Object.defineProperty( this, '$component', {
			get: function() {
				return component;
			}
		});

		// define special "property" (function) to reference the layout instance 
		Object.defineProperty( this, '$layout', {
			get: function() {
				return MivaLayout.$instanceCache[ this.$instanceId ];
			}
		});

	}

	/* ================================ Public Getters ================================ */
	get currentIndex() {

		return this.siblings().findIndex(( component ) => {

			return ( component.id == this.id );

		});

	}

	/* ================================ Public Methods ================================ */

	parent() {

		return this.$layout.components.findById( this.parentId );

	}

	siblings() {

		return this.$layout.components.groupByParentId( this.parentId );

	}

	next() {

		return this.siblings().index( this.currentIndex + 1 );

	}

	previous() {

		return this.siblings().index( this.currentIndex - 1 );

	}

	isFirst() {

		return ( this.siblings().first() === this );

	}

	isLast() {

		return ( this.siblings().last() === this );

	}

	state() {

		return this.$layout.getComponentState( this[ this.$layout.options.componentIdentifier ] );

	}

	/* ================================ Private Methods ================================ */

	_createAttributesWithFormat( attributes, formatter ) {

		if ( typeof attributes == 'object' ) {

			return Object.keys( attributes ).reduce(( modifiedAttrs, attrKey ) => {

				let formattedAttrKey = formatter( attrKey ); 

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
