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

		if ( typeof id != 'number' ) {
			throw new TypeError( '[MivaLayoutComponentTree] - "id" is not a number' );
		}

		return this._findBy( 'id', id );

	}

	componentId( componentId ) {

		if ( typeof componentId != 'number' ) {
			throw new TypeError( '[MivaLayoutComponentTree] - "componentId" is not a number' );
		}

		return this._groupBy( 'componentId', componentId );
		
	}

	type( type ) {

		if ( typeof type != 'number' && typeof type != 'string' ) {
			throw new TypeError( '[MivaLayoutComponentTree] - "type" is not a number or string' );
		}

		return this._groupBy( 'type', type );

	}

	typeName( typeName ) {

		if ( typeof typeName != 'number' && typeof typeName != 'string' ) {
			throw new TypeError( '[MivaLayoutComponentTree] - "typeName" is not a number or string' );
		}

		return this._groupBy( 'typeName', typeName );

	}

	/* ================================ Private Methods ================================ */

	_findBy( findKey, findVal ) {

		if ( findKey == undefined ) {
			throw new TypeError( '[MivaLayoutComponentTree] - "findKey" is undefined' );
		}
		if ( findVal == 'undefined' ) {
			throw new TypeError( '[MivaLayoutComponentTree] - "findVal" is undefined' );
		}

		return this._findByRecursion( findKey, findVal, this );

	}

	_findByRecursion( findKey, findVal, components ) {

		for (let i = 0; i < components.length; i++) {

			if ( components[ i ][ findKey ] == findVal ) {

				return components[ i ];

			}
			else if ( components[ i ].childrenCount ) {

				let found = this._findByRecursion( findKey, findVal, components[ i ].children );

				if ( found != undefined ) {
					return found;
				}

			}

		}

	}

	_groupBy( groupKey, groupVal ) {

		if ( groupKey == undefined ) {
			throw new TypeError( '[MivaLayoutComponentTree] - "groupKey" is undefined' );
		}
		if ( groupVal == 'undefined' ) {
			throw new TypeError( '[MivaLayoutComponentTree] - "groupVal" is undefined' );
		}

		return this._groupByRecursion( groupKey, groupVal, this );

	}

	_groupByRecursion( groupKey, groupVal, components ) {

		return components.reduce(( groupedComponents, currentComponent ) => {

			return groupedComponents.concat(
				( currentComponent[ groupKey ] == groupVal ) ? currentComponent : [],
				this._groupByRecursion( groupKey, groupVal, currentComponent.children )
			);

		}, []);

	}
	

};