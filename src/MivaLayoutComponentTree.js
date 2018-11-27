import MivaLayoutComponent from './MivaLayoutComponent';

export default class MivaLayoutComponentTree extends Array {

	constructor( components ) {

		let list = [];

		if ( Array.isArray( components ) ) {

			list = components.reduce(( components, component ) => {

				return components.concat( new MivaLayoutComponent( component ) );

			}, []);

		}

		super( ...list );

		return this;

	}

	/* ================================ Public Methods ================================ */

	id( id ) {

		// format id to a number
		id = parseInt( id );

		if ( isNaN( id ) && typeof id != 'number' ) {
			throw new TypeError( '[MivaLayoutComponentTree] - "id" is not a number' );
		}

		return this._findBy( 'id', id, deep );

	}

	componentId( componentId ) {

		if ( typeof componentId != 'number' ) {
			throw new TypeError( '[MivaLayoutComponentTree] - "componentId" is not a number' );
		}

		return this._groupBy( 'componentId', componentId, deep );
		
	}

	type( type ) {

		if ( typeof type != 'number' && typeof type != 'string' ) {
			throw new TypeError( '[MivaLayoutComponentTree] - "type" is not a number or string' );
		}

		return this._groupBy( 'type', type, deep );

	}

	typeName( typeName ) {

		if ( typeof typeName != 'number' && typeof typeName != 'string' ) {
			throw new TypeError( '[MivaLayoutComponentTree] - "typeName" is not a number or string' );
		}

		return this._groupBy( 'typeName', typeName, deep );

	}

	name( name ) {

		if ( typeof name != 'number' && typeof name != 'string' ) {
			throw new TypeError( '[MivaLayoutComponentTree] - "name" is not a number or string' );
		}

		return this._groupBy( 'name', name );

	}

	/* ================================ Private Methods ================================ */

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

		let result = this._groupByRecursion( groupKey, groupVal, this, deep );

		return ( result.length > 0 ) ? result : undefined;

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