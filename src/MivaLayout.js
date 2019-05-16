import MivaLayoutComponentTree from './MivaLayoutComponentTree';
import MivaLayoutComponent from './MivaLayoutComponent';
import _cloneDeep from 'lodash/clonedeep';
import _pull from 'lodash/pull';
import _uniqueId from 'lodash/uniqueid';
import objectHash from 'object-hash';

const defaultOptions = {
	settingsComponentCode: 'settings',
	exposeFullSettingsComponent: false,
	pullSettingsComponent: true,
	suppressWarnings: false,
	componentIdentifier: 'code'
};

const MivaLayout = class MivaLayout {

	constructor( layout, options = {} ) {

		// validate layout object type
		if ( !Array.isArray( layout ) ) {
			throw new TypeError( '[MivaLayout] - "layout" is not an array'  );
		}

		// assign options
		this.options = Object.assign( {}, defaultOptions, options );

		// assign layout argument to private property
		this.$layout = _cloneDeep( layout );

		// create an instance id
		this.$instanceId = _uniqueId( 'ml-' );

		// copy into the $instanceCache
		MivaLayout.$instanceCache[ this.$instanceId ] = this;

		// create finalized components structure
		this.components = new MivaLayoutComponentTree( layout, this.$instanceId );

		// create flat version
		this.$components = this._createFlatComponentsList( this.components );

		// find "settings" component - remove from tree if found
		this.settings = this._findSettingsComponent( this.components );

	}

	/* ================================ Public Methods ================================ */

	createStore( defaultComponentStateData ) {

		// validate defaultComponentStateData
		let defaultComponentStateDataFactory = ( typeof defaultComponentStateData == 'function' ) ?
			defaultComponentStateData :
			() => {
				return ( typeof defaultComponentStateData == 'object') ? _cloneDeep( defaultComponentStateData ) : defaultComponentStateData;
			};

		this.store = this._createStore( defaultComponentStateDataFactory );

		return this;

	}

	mergeStore( storeObject, componentIdentifierMap ) {

		if ( storeObject == undefined || typeof storeObject != 'object' ) {
			return console.warn( '[MivaLayout] - "storeObject" is not an object' );
		}

		let store = {};

		for ( let componentIdentifier in this.store ) {

			let activeComponentState = this.store[ componentIdentifier ];
			let passedComponentState = storeObject[ componentIdentifier ];

			// find within map if exists and passed state is undefined
			if ( componentIdentifierMap != undefined && passedComponentState == undefined ) {

				let foundComponentIdentiferMap = componentIdentifierMap[ componentIdentifier ];

				if ( foundComponentIdentiferMap != undefined ) {

					if ( !Array.isArray( foundComponentIdentiferMap ) ) {
						throw new TypeError( '[MivaLayout] - Match found for "componentIdentifierMap" is not an array' );
					}

					let foundComponentState = foundComponentIdentiferMap.find(function( oldComponentIdentifer ) {
						return Object.keys( storeObject ).find(function( storeObjectKey ) {
							return ( storeObjectKey == oldComponentIdentifer );
						});
					});

					passedComponentState = storeObject[ foundComponentState ];

				}

			}

			if ( passedComponentState && activeComponentState && activeComponentState.__attributes__ !== passedComponentState.__attributes__ ) {

				store[ componentIdentifier ] = Object.assign(
					{},
					passedComponentState,
					activeComponentState
				);

				continue;

			}

			store[ componentIdentifier ] = Object.assign(
				{},
				activeComponentState,
				passedComponentState
			);

		}

		this.store = _cloneDeep( store );

		return this;

	}

	getComponentState( componentIdentifier ) {

		return this.store && this.store[ componentIdentifier ];

	}

	setComponentState( componentIdentifier, componentState ) {

		return this.store[ componentIdentifier ] = componentState;

	}

	syncComponentStates( components ) {

		if ( !Array.isArray( components ) && !(components instanceof MivaLayoutComponentTree) ) {
			throw new TypeError( '[MivaLayout] - "components" is not an array or instance of "MivaLayoutComponentTree"' );
		}

		if ( components.length == 0 ) {
			throw new Error( '[MivaLayout] - "components" does not have sufficient length' );
		}

		var keyState = this.getComponentState( components.first()[ this.options.componentIdentifier ] );

		for ( let component of components ) {
			
			this.setComponentState( component[ this.options.componentIdentifier ], keyState );

		}

		return this;

	}

	exportStore( pretty ) {

		return JSON.stringify( this.store, null, ( pretty ) ? '\t' : '' );

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


	_createStore( defaultComponentStateDataFactory ) {

		return this.$components.reduce(( defaultStateAccumulator, component ) => {

			return {
				...defaultStateAccumulator,
				[ component[ this.options.componentIdentifier ] ]: {
					...defaultComponentStateDataFactory( component ),
					__attributes__: objectHash( component.attributes )
				}
			};

		}, {});

	}

	_findSettingsComponent( componentTree ) {

		if ( !(componentTree instanceof MivaLayoutComponentTree) ) {
			throw new TypeError( '[MivaLayout] - "componentTree" is not a MivaLayoutComponentTree instance' );
		}

		let settingsComponent = componentTree.groupByType( this.options.settingsComponentCode ).first();

		if ( settingsComponent != undefined ) {

			if ( this.options.pullSettingsComponent ) {

				_pull( componentTree, settingsComponent );

			}

			return ( this.options.exposeFullSettingsComponent ) ? settingsComponent : { ...settingsComponent.attributes, $componentIdentifier: settingsComponent[ this.options.componentIdentifier ] };

		}

		if ( !this.options.suppressWarnings ) {
			console.warn( `[MivaLayout] - unable to find "settings" component "${ this.options.settingsComponentCode }"` );
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

/* ================================ Static Properties ================================ */

MivaLayout.Component = MivaLayoutComponent;

MivaLayout.ComponentTree = MivaLayoutComponentTree;

MivaLayout.$instanceCache = [];

/* ================================ Static Methods ================================ */

MivaLayout.getInstance = function( instanceId ) {

	return MivaLayout.$instanceCache[ instanceId ];

};

/* ================================ Export ================================ */

export default MivaLayout;