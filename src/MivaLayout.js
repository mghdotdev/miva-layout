import MivaLayoutComponentTree from './MivaLayoutComponentTree';
import _cloneDeep from 'lodash/clonedeep';
import _pull from 'lodash/pull';
import objectHash from 'object-hash';

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

	mergeState( stateObject ) {

		if ( stateObject == undefined || typeof stateObject != 'object' ) {
			return console.warn( '[MivaLayout] - "stateObject" is not an object' );
		}

		let state = {};

		for ( let componentId in this.state ) {

			let activeComponentState = this.state[ componentId ];
			let passedComponentState = stateObject[ componentId ];

			if ( passedComponentState && activeComponentState && activeComponentState.__attributes__ !== passedComponentState.__attributes__ ) {

				state[ componentId ] = Object.assign(
					{},
					passedComponentState,
					activeComponentState
				);

				continue;

			}

			state[ componentId ] = Object.assign(
				{},
				activeComponentState,
				passedComponentState
			);

		}

		this.state = _cloneDeep( state );

	}

	getComponentState( componentId ) {

		return this.state[ componentId ];

	}

	setComponentState( componentId, stateObject ) {

		return this.state[ componentId ] = stateObject;

	}

	syncState( components ) {

		if ( !Array.isArray( components ) && !(components instanceof MivaLayoutComponentTree) ) {
			throw new TypeError( '[MivaLayout] - "components" is not an array or instance of "MivaLayoutComponentTree"'  );
		}

		if ( components.length == 0 ) {
			throw new Error( '[MivaLayout] - "components" does not have sufficient length' );
		}

		var keyState = this.getComponentState( components[ 0 ].id );

		for ( let component of components ) {
			
			this.setComponentState( component.id, keyState );

		}

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

		return this.$components.reduce(( defaultStateAccumulator, component ) => {

			return {
				...defaultStateAccumulator,
				[ component.id ]: {
					...defaultComponentStateDataFactory( component ),
					__attributes__: objectHash( component.attributes )
				}
			};

		}, {});

	}

	_findConfigComponent( componentTree ) {

		if ( !(componentTree instanceof MivaLayoutComponentTree) ) {
			throw new TypeError( '[MivaLayout] - "componentTree" is not a MivaLayoutComponentTree instance' );
		}

		let configComponent = componentTree.groupByType( this.options.configComponentCode );

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