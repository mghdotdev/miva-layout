import MivaLayoutComponent from './MivaLayoutComponent';

export default class MivaLayoutComponentTree extends Array {

	constructor( components ) {

		var list = [];

		if ( Array.isArray( components ) ) {

			list = components.reduce(function( components, component ) {

				return components.concat( new MivaLayoutComponent( component ) );

			}, []);

		}

		super( ...list );

		return this;

	}

	/* ================================ Public Methods ================================ */

	id( id ) {

		var self = this;

		if ( typeof id != 'number' ) {
			throw new TypeError( '[MivaLayoutComponentTree] - "id" is not a number' );
		}

		return self._findBy( 'id', id );

	}

	componentId( componentId ) {

		var self = this;

		if ( typeof componentId != 'number' ) {
			throw new TypeError( '[MivaLayoutComponentTree] - "componentId" is not a number' );
		}

		return self._groupBy( 'componentId', componentId );
		
	}

	type( type ) {

		var self = this;

		if ( typeof type != 'number' && typeof type != 'string' ) {
			throw new TypeError( '[MivaLayoutComponentTree] - "type" is not a number or string' );
		}

		return self._groupBy( 'type', type );

	}

	typeName( typeName ) {

		var self = this;

		if ( typeof typeName != 'number' && typeof typeName != 'string' ) {
			throw new TypeError( '[MivaLayoutComponentTree] - "typeName" is not a number or string' );
		}

		return self._groupBy( 'typeName', typeName );

	}



	/* ================================ Private Methods ================================ */

	_findBy( findKey, findVal ) {

		var self = this;

		if ( findKey == undefined ) {
			throw new TypeError( '[MivaLayoutComponentTree] - "findKey" is undefined' );
		}
		if ( findVal == 'undefined' ) {
			throw new TypeError( '[MivaLayoutComponentTree] - "findVal" is undefined' );
		}

		return self._findByRecursion( findKey, findVal, self );

	}

	_findByRecursion( findKey, findVal, components ) {

		var self = this;

		for (var i = 0; i < components.length; i++) {

			if ( components[ i ][ findKey ] == findVal ) {

				return components[ i ];

			}
			else if ( components[ i ].childrenCount ) {

				var found = self._findByRecursion( findKey, findVal, components[ i ].children );

				if ( found != undefined ) {
					return found;
				}

			}

		}

	}

	_groupBy( groupKey, groupVal ) {

		var self = this;

		if ( groupKey == undefined ) {
			throw new TypeError( '[MivaLayoutComponentTree] - "groupKey" is undefined' );
		}
		if ( groupVal == 'undefined' ) {
			throw new TypeError( '[MivaLayoutComponentTree] - "groupVal" is undefined' );
		}

		return self._groupByRecursion( groupKey, groupVal, self );

	}

	_groupByRecursion( groupKey, groupVal, components ) {

		var self = this;

		return components.reduce(function( groupedComponents, currentComponent ) {

			return groupedComponents.concat(
				( currentComponent[ groupKey ] == groupVal ) ? currentComponent : [],
				self._groupByRecursion( groupKey, groupVal, currentComponent.children )
			);

		}, []);

	}
	

};