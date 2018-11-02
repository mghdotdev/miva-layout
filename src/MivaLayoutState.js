import MivaLayout from './MivaLayout';
import isEqual from 'lodash.isequal';
import cloneDeep from 'lodash.clonedeep';
import identity from 'lodash.identity';

export default class MivaLayoutState {

	constructor( layout, defaultComponentState ) {

		// validate layout
		if ( !(layout instanceof MivaLayout) ) {
			throw new Error( '[MivaLayoutState] - layout is not an instance of MivaLayout' );
		}

		// validate defaultComponentState
		let defaultComponentStateFactory = ( typeof defaultComponentState == 'function' ) ?
			defaultComponentState :
			() => {
				return ( typeof defaultComponentState == 'object') ? cloneDeep( defaultComponentState ) : defaultComponentState;
			};
		
		this.$components = layout.$components;
		this.defaultState = this._createDefaultState( defaultComponentStateFactory );
		this.state = this.defaultState;

	}

	/* ================================ Public Methods ================================ */

	mergeState( stateObject, conflictResolutionFn ) {

		if ( typeof conflictResolutionFn != 'function' ) {
			conflictResolutionFn = identity;
		}

		this.state = Object.keys( this.state ).map(( key ) => {

			let activeComponentState = this.state[ key ];
			let componentState = stateObject[ key ];

			// validate format for state object parts
			if (
				isEqual( activeComponentState, componentState ) ||
				( typeof componentState !== 'object' )
			)
			{
				return activeComponentState;
			}

			// console.log( componentState, activeComponentState );

			// compare attributes
			var activeComponentStateAttributeKeys = Object.keys( activeComponentState.attributes );

			console.log( activeComponentStateAttributeKeys );

			/*return {
				type: activeComponentState.type,
				attributes: { ...activeComponentState },
				data: conflictResolutionFn( activeComponentState, componentState,  )
			}*/

		});

	}

	/* ================================ Private Methods ================================ */

	_createDefaultState( defaultComponentStateFactory ) {

		return this.$components.reduce(( defaultState, component ) => {

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

}