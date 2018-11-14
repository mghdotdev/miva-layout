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

	createState( defaultComponentStateData ) {

		// validate defaultComponentStateData
		let defaultComponentStateDataFactory = ( typeof defaultComponentStateData == 'function' ) ?
			defaultComponentStateData :
			() => {
				return ( typeof defaultComponentStateData == 'object') ? cloneDeep( defaultComponentStateData ) : defaultComponentStateData;
			};

		this.defaultState = this._createDefaultState( defaultComponentStateDataFactory );
		this.state = this.defaultState;

	}

	mergeState( stateObject, conflictResolutionFn ) {

		/* if ( typeof conflictResolutionFn != 'function' ) {
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

		} */

	}

	getComponentState( componentId ) {

		return this.state[ componentId ]?.data;

	}

	/* ================================ Private Methods ================================ */

	/**
	 * Create a "flat" list of component objects. Used to recursively loop through all components in a layout irrespective of nesting.
	 * @param  {Object<MivaLayoutComponentTree>} components - A <MivaLayoutComponentTree> instance with nested components via the "children" property.
	 * @return {Object<Array>} - The "flattened" list of components.
	 */
	_createFlatComponentsList( components ) {

		return components.reduce(( flat, component ) => {

			return flat.concat( component, this._createFlatComponentsList( component.children ) );

		}, []);

	}


	_createDefaultState( defaultComponentStateDataFactory ) {

		if ( typeof defaultComponentStateDataFactory !== 'function' ) {
			throw new TypeError( '[MivaLayout] - "defaultComponentStateFactory" is not a function' );
		}

		return this.$components.reduce(( defaultStateAccumulator, component ) => {

			return {
				...defaultStateAccumulator,
				[ component.id ]: {
					_attributes: { ...component.attributes },
					data: defaultComponentStateDataFactory( component )
				}
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