import MivaLayoutComponent from './MivaLayoutComponent';

export default class MivaLayoutComponentTree extends Array {

	constructor( components, $instanceId ) {

		let list = [];

		if ( Array.isArray( components ) ) {

			list = components.reduce(( components, component, currentIndex ) => {

				return components.concat(
					( component instanceof MivaLayoutComponent ) ?
						component :
						new MivaLayoutComponent(
							component,
							currentIndex,
							$instanceId
						)
				);

			}, []);

		}

		super( ...list );

		return this;

	}

	/* ================================ Public Methods ================================ */

	moveComponent( fromIndex, toIndex ) {
		this.splice( toIndex, 0, this.splice( fromIndex, 1 )[0] );
		return this;
	}

	index( index ) {

		return this[ index ];

	}

	first() {

		return this[ 0 ];

	}

	last() {

		return this[ this.length - 1 ];

	}

	recurse( callback, listProperty = 'children' ) {

		return this.map(function( component ) {

			let result = callback( component );

			return { result, ...component[ listProperty ].recurse( callback ) };

		});

	}

	findById( id, deep ) {

		// format id to a number
		id = parseInt( id );

		if ( isNaN( id ) && typeof id != 'number' ) {
			throw new TypeError( '[MivaLayoutComponentTree] - "id" is not a number' );
		}

		return this._findBy( 'id', id, deep );

	}

	groupByComponentId( componentId, deep ) {

		if ( typeof componentId != 'number' ) {
			throw new TypeError( '[MivaLayoutComponentTree] - "componentId" is not a number' );
		}

		return this._groupBy( 'componentId', componentId, deep );
		
	}

	groupByParentId( parentId, deep ) {

		if ( typeof parentId != 'number' ) {
			throw new TypeError( '[MivaLayoutComponentTree] - "parentId" is not a number' );
		}

		return this._groupBy( 'parentId', parentId, deep );
		
	}

	groupByType( type, deep ) {

		if ( typeof type != 'number' && typeof type != 'string' ) {
			throw new TypeError( '[MivaLayoutComponentTree] - "type" is not a number or string' );
		}

		return this._groupBy( 'type', type, deep );

	}

	groupByTypeName( typeName, deep ) {

		if ( typeof typeName != 'number' && typeof typeName != 'string' ) {
			throw new TypeError( '[MivaLayoutComponentTree] - "typeName" is not a number or string' );
		}

		return this._groupBy( 'typeName', typeName, deep );

	}

	groupByName( name, deep ) {

		if ( typeof name != 'number' && typeof name != 'string' ) {
			throw new TypeError( '[MivaLayoutComponentTree] - "name" is not a number or string' );
		}

		return this._groupBy( 'name', name, deep );

	}

	findByAttribute( key, value, deep ) {

		if ( typeof name != 'number' && typeof name != 'string' ) {
			throw new TypeError( '[MivaLayoutComponentTree] - "key" is not a number or string' );
		}

		return this._findByAttributeRecursion( key, value, this, deep );

	}

	groupByAttribute( key, value, deep ) {

		if ( typeof name != 'number' && typeof name != 'string' ) {
			throw new TypeError( '[MivaLayoutComponentTree] - "key" is not a number or string' );
		}

		return this._groupByAttributeRecursion( key, value, this, deep );

	}

	/*groupByParent( component, groupKey, groupVal ) {

		if ( !component instanceof MivaLayoutComponent ) {
			throw new TypeError( '[MivaLayoutComponentTree] - "component" is not an instance of "MivaLayoutComponent"' );
		}
		if ( groupKey == undefined ) {
			throw new TypeError( '[MivaLayoutComponentTree] - "groupKey" is undefined' );
		}
		if ( groupVal == 'undefined' ) {
			throw new TypeError( '[MivaLayoutComponentTree] - "groupVal" is undefined' );
		}

		let group = [];
		let parentComponent = component;

		while ( parentComponent != undefined ) {

			if ( parentComponent[ groupKey ] == groupVal ) {
				group.push( parentComponent );
			}

			parentComponent = this.findById( parentComponent.parentId );

		}

		return new MivaLayoutComponentTree( group );

	}

	groupByParentAttribute( component, groupKey, groupVal ) {

		if ( !component instanceof MivaLayoutComponent ) {
			throw new TypeError( '[MivaLayoutComponentTree] - "component" is not an instance of "MivaLayoutComponent"' );
		}
		if ( groupKey == undefined ) {
			throw new TypeError( '[MivaLayoutComponentTree] - "groupKey" is undefined' );
		}
		if ( groupVal == 'undefined' ) {
			throw new TypeError( '[MivaLayoutComponentTree] - "groupVal" is undefined' );
		}

		let group = [];
		let parentComponent = component;

		while ( parentComponent != undefined ) {

			if ( parentComponent.attributes[ groupKey ] == groupVal ) {
				group.push( parentComponent );
			}

			parentComponent = this.findById( parentComponent.parentId );

		}

		return new MivaLayoutComponentTree( group );

	}*/

	/* ================================ Private Methods ================================ */

	_groupByAttributeRecursion( groupKey, groupVal, components, deep = false ) {

		return components.reduce(( groupedComponents, currentComponent ) => {

			return groupedComponents.concat(
				( currentComponent.attributes && currentComponent.attributes[ groupKey ] == groupVal ) ? currentComponent : [],
				( deep ) ? this._groupByAttributeRecursion( groupKey, groupVal, currentComponent.children ) : []
			);

		}, []);

	}

	_findByAttributeRecursion( findKey, findVal, components, deep = false ) {

		for (let i = 0; i < components.length; i++) {

			if ( components[ i ].attributes && components[ i ].attributes[ findKey ] == findVal ) {

				return components[ i ];

			}
			else if ( components[ i ].childrenCount && deep ) {

				let found = this._findByAttributeRecursion( findKey, findVal, components[ i ].children );

				if ( found != undefined ) {
					return found;
				}

			}

		}

		return undefined;

	}

	_findBy( findKey, findVal, deep ) {

		if ( findKey == undefined ) {
			throw new TypeError( '[MivaLayoutComponentTree] - "findKey" is undefined' );
		}
		if ( findVal == 'undefined' ) {
			throw new TypeError( '[MivaLayoutComponentTree] - "findVal" is undefined' );
		}

		return this._findByRecursion( findKey, findVal, this, deep );

	}

	_findByRecursion( findKey, findVal, components, deep = true ) {

		for (let i = 0; i < components.length; i++) {

			if ( components[ i ][ findKey ] == findVal ) {

				return components[ i ];

			}
			else if ( components[ i ].childrenCount && deep ) {

				let found = this._findByRecursion( findKey, findVal, components[ i ].children );

				if ( found != undefined ) {
					return found;
				}

			}

		}

		return undefined;

	}

	_groupBy( groupKey, groupVal, deep ) {

		if ( groupKey == undefined ) {
			throw new TypeError( '[MivaLayoutComponentTree] - "groupKey" is undefined' );
		}
		if ( groupVal == 'undefined' ) {
			throw new TypeError( '[MivaLayoutComponentTree] - "groupVal" is undefined' );
		}

		let group = this._groupByRecursion( groupKey, groupVal, this, deep );

		return new MivaLayoutComponentTree( group );

	}

	_groupByRecursion( groupKey, groupVal, components, deep = true ) {

		return components.reduce(( groupedComponents, currentComponent ) => {

			return groupedComponents.concat(
				( currentComponent[ groupKey ] == groupVal ) ? currentComponent : [],
				( deep ) ? this._groupByRecursion( groupKey, groupVal, currentComponent.children ) : []
			);

		}, []);

	}

};