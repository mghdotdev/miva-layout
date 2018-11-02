import MivaLayoutComponentTree from './MivaLayoutComponentTree';
import cloneDeep from 'lodash.clonedeep';

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

	

	/* ================================ Private Methods ================================ */

	_createFlatComponentsList( components ) {

		/*return components.reduce(function( flat, component ) {

			return flat.concat( component, self._createFlatComponentsList( component.children ) );

		}, []);*/

		return components.reduce(( flat, component ) => {

			return flat.concat( components, this._createFlatComponentsList( component.children ) );

		}, []);

	}

	/* ================================ Special Methods ================================ */

	toJSON() {
		return this.components;
	}

};