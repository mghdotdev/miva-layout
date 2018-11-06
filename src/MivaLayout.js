import MivaLayoutComponentTree from './MivaLayoutComponentTree';
import cloneDeep from 'lodash.clonedeep';
import isEqual from 'lodash.isequal';
import identity from 'lodash.identity';

export default class MivaLayout {

	constructor( layout ) {

		// validate layout object type
		if ( !Array.isArray( layout ) ) {
			throw new TypeError( '[MivaLayout] - "layout" is not an array'  );
		}

		// assign layout argument to private property
		this.$layout = cloneDeep( layout );

		// create finalized components structure
		this.components = new MivaLayoutComponentTree( layout );

		// create flat version
		this.$components = this._createFlatComponentsList( this.components );

	}

	/* ================================ Public Methods ================================ */

	createState( defaultComponentState ) {

		// validate defaultComponentState
		let defaultComponentStateFactory = ( typeof defaultComponentState == 'function' ) ?
			defaultComponentState :
			() => {
				return ( typeof defaultComponentState == 'object') ? cloneDeep( defaultComponentState ) : defaultComponentState;
			};

		this.defaultState = this._createDefaultState( defaultComponentStateFactory );
		this.state = this.defaultState;

	}

	mergeState( stateObject, conflictResolutionFn ) {

		if ( typeof conflictResolutionFn != 'function' ) {
			conflictResolutionFn = identity;
		}

		for ( let componentId in this.state ) {

			let activeComponentState = this.state[ componentId ];
			let passedComponentState = stateObject[ componentId ];

			// validate format for state object parts
			if (
				isEqual( activeComponentState, passedComponentState ) ||
				( typeof passedComponentState !== 'object' )
			)
			{
				continue;
			}

			this.state[ componentId ] = Object.assign(
				{},
				activeComponentState,
				conflictResolutionFn( passedComponentState, activeComponentState, this.components.id( componentId ) )
			);

		}

	}

	/* ================================ Private Methods ================================ */

	/**
	 * Create a "flat" list of component objects. Used to recursively loop through all components in a layout irrespective of nesting.
	 * @param  {Object<MivaLayoutComponentTree>} components - A <MivaLayoutComponentTree> instance with nested components via the "children" property.
	 * @return {Object<Array>} - The "flattened" list of components.
	 */
	_createFlatComponentsList( components ) {

		return components.reduce(( flat, component ) => {

			return flat.concat( components, this._createFlatComponentsList( component.children ) );

		}, []);

	}


	_createDefaultState( defaultComponentStateFactory ) {

		if ( typeof defaultComponentStateFactory !== 'function' ) {
			throw new TypeError( '[MivaLayout] - "defaultComponentStateFactory" is not a function' );
		}

		return this.$components.reduce(( defaultState, component ) => {

			return {
				...defaultState,
				[ component.id ]: defaultComponentStateFactory( component )
			};

		}, {});

	}

	/* ================================ Special Methods ================================ */

	/**
	 * Customize JSON stringify output for the <MivaLayout> instance
	 * @return {Object<Array>}
	 */
	toJSON() {

		return this.components;

	}

};