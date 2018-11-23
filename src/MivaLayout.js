import MivaLayoutComponentTree from './MivaLayoutComponentTree';
import _cloneDeep from 'lodash.clonedeep';
import _isEqual from 'lodash.isequal';
import _identity from 'lodash.identity';
import _pull from 'lodash.pull';

const defaultOptions = {
	configComponentCode: 'config',
	exposeFullConfigComponent: false,
	pullConfigComponent: true,
	suppressWarnings: false
};

export default class MivaLayout {

	constructor( layout, options = {} ) {

		// validate layout object type
		if ( !Array.isArray( layout ) ) {
			throw new TypeError( '[MivaLayout] - "layout" is not an array'  );
		}

		// assign options
		this.options = Object.assign( {}, defaultOptions, options );

		// assign layout argument to private property
		this.$layout = _cloneDeep( layout );

		// create finalized components structure
		this.components = new MivaLayoutComponentTree( layout );

		// find "config" component - remove from tree if found
		this.config = this._findConfigComponent( this.components );

		// create flat version
		this.$components = this._createFlatComponentsList( this.components );

	}

	/* ================================ Public Methods ================================ */

	createState( defaultComponentStateData ) {

		// validate defaultComponentStateData
		let defaultComponentStateDataFactory = ( typeof defaultComponentStateData == 'function' ) ?
			defaultComponentStateData :
			() => {
				return ( typeof defaultComponentStateData == 'object') ? _cloneDeep( defaultComponentStateData ) : defaultComponentStateData;
			};

		this.defaultState = this._createDefaultState( defaultComponentStateDataFactory );
		this.state = this.defaultState;

	}

	mergeState( stateObject, conflictResolutionFn ) {

		 if ( typeof conflictResolutionFn != 'function' ) {
			conflictResolutionFn = _identity;
		}

		for ( let componentId in this.state ) {

			let activeComponentState = this.state[ componentId ];
			let passedComponentState = stateObject[ componentId ];

			console.log( activeComponentState, passedComponentState );

			/*// validate format for state object parts
			if (
				_isEqual( activeComponentState, passedComponentState ) ||
				( typeof passedComponentState !== 'object' )
			)
			{
				continue;
			}

			this.state[ componentId ] = Object.assign(
				{},
				activeComponentState,
				conflictResolutionFn( passedComponentState, activeComponentState, this.components.id( componentId ) )
			);*/

		} 

	}

	getComponentState( componentId ) {

		return this.state[ componentId ]?.data;

	}

	exportState( pretty ) {

		return JSON.stringify( this.state, null, ( pretty ) ? '\t' : '' );

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
					__attributes__: { ...component.attributes },
					data: defaultComponentStateDataFactory( component )
				}
			};

		}, {});

	}

	_findConfigComponent( componentTree ) {

		if ( !(componentTree instanceof MivaLayoutComponentTree) ) {
			throw new TypeError( '[MivaLayout] - "componentTree" is not a MivaLayoutComponentTree instance' );
		}

		let configComponent = componentTree.type( this.options.configComponentCode );

		if ( configComponent != undefined ) {

			if ( this.options.pullConfigComponent ) {

				_pull( componentTree, configComponent[ 0 ] );

			}

			return ( this.options.exposeFullConfigComponent ) ? configComponent[ 0 ] : configComponent[ 0 ].attributes;

		}

		if ( !this.options.suppressWarnings ) {
			console.warn( `[MivaLayout] - unable to find configuration component "${ this.options.configComponentCode }"` );
		}

		return {};

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