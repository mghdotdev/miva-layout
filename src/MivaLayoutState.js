import MivaLayout from './MivaLayout';

export default class MivaLayoutState {

	constructor( layout, defaultComponentState ) {

		// validate layout
		if ( !(layout instanceof MivaLayout) ) {
			throw new Error( '[MivaLayoutState] - layout is not an instance of MivaLayout' );
		}

		// validate defaultComponentState
		var defaultComponentStateFactory = ( typeof defaultComponentState == 'function' ) ?
			defaultComponentState :
			function() {
				return ( typeof defaultComponentState == 'object') ? Object.assign( {}, defaultComponentState ) : defaultComponentState;
			};
		
		this.$components = layout.$components;
		this.defaultState = this._createDefaultState( defaultComponentStateFactory );

	}

	_createDefaultState( defaultComponentStateFactory ) {

		return this.$components.reduce(function( defaultState, component ) {

			return {
				...defaultState,
				[ component.id ]: {
					type: component.type,
					attributes: { ...component.attributes },
					data: defaultComponentStateFactory( component )
				}
			};

		}, {});

	}

	mergeState( stateObject, conflictResolutionFn ) {

		var self = this;

		if ( typeof conflictResolutionFn != 'function' ) {
			conflictResolutionFn = function( arg ) { return arg; };
		}

		self.state = Object.keys( self.defaultState ).map(function( key ) {

			var defaultComponentState = self.defaultState[ key ];
			var savedComponentState = stateObject[ key ];

			// console.log( defaultComponentState, savedComponentState );

			/*var defaultComponentState = self.defaultState[ component.id ];
			var savedState = stateObject[ component.id ];

			if ( savedState == undefined ) {

				return { ...defaultComponentState };

			}

			// check if attributes are the same
			if ( defaultComponentState.attributes ) {

			}*/

			/*return {
				type: defaultComponentState.type,
				attributes: defaultComponentState.attributes,
				data: conflictResolutionFn( savedState, defaultComponentState, component );
			};*/

		});

	}

}