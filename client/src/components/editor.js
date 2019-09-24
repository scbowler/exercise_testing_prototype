import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Ace from 'react-ace';

const DEFAULT_EXT = 'language_tools';
const DEFAULT_MODE = 'javascript';
const DEFAULT_SNIPPETS = 'javascript';
const DEFAULT_THEME = 'tomorrow_night_bright';


class Editor extends Component {
    constructor(props){
        super(props);

        this.state = {
            resourcesLoaded: false
        }

        this.resources = {
            ext: [ 'language_tools' ],
            mode: [ 'javascript', 'html', 'css' ],
            snippets: [ 'javascript' ],
            theme: [ 'ambiance', 'chaos', 'chrome', 'clouds', 'clouds_midnight', 'cobalt', 'crimson_editor', 'dawn', 'dracula', 'dreamweaver', 'eclipse', 'github', 'gob', 'gruvbox', 'idle_fingers', 'iplastic', 'katzenmilch', 'kr_theme', 'kuroir', 'merbivore', 'merbivore_soft', 'mono_industrial', 'monokai', 'pastel_on_dark', 'solarized_dark', 'solarized_light', 'sqlserver', 'terminal', 'textmate', 'tomorrow', 'tomorrow_night', 'tomorrow_night_blue', 'tomorrow_night_bright', 'tomorrow_night_eighties', 'twilight', 'vibrant_ink', 'xcode' ]
        }

        this.resourceTypes = Object.keys(this.resources);

        console.log('Resource Types:', this.resourceTypes);

        this.loadResource = this.loadResource.bind(this);
    }

    componentDidMount(){
        this.loadEditorResources()
    }

    async loadResource(type, resource) {
        const validTypes = this.resources[type] || null;

        if(validTypes && validTypes.indexOf(resource) >= 0){
            switch(type){
                case 'ext':
                    return import(`brace/ext/${resource}`);
                case 'mode':
                    return import(`brace/mode/${resource}`);
                case 'snippets':
                    return import(`brace/snippets/${resource}`);
                case 'theme':
                    return import(`brace/theme/${resource}`)
            }
        }

        throw new Error(`Unable to load "${type}/${resource}" resource, Invalid resource`);
    }

    async loadEditorResources(){
        try {
            await Promise.all(this.resourceTypes.map(r => this.loadResource(r, this.props[r])));

            this.setState({resourcesLoaded: true});
        } catch(err) {
            console.log('Error Loading Resources', err);
        }
    }

    render(){
        if(this.state.resourcesLoaded){
            return <Ace
                mode="javascript"
                theme={this.props.theme}
                
                name="test_editor"
                height="162px"
                width="100%"
                enableBasicAutocompletion={true}
                enableLiveAutocompletion={true}
                editorProps={{
                    $blockScrolling: Infinity
                }}
            />
        }

        return <h1>Loading...</h1>
    }
}

Editor.defaultProps = {
    ext: DEFAULT_EXT,
    mode: DEFAULT_MODE,
    snippets: DEFAULT_SNIPPETS,
    theme: DEFAULT_THEME
}

export default Editor;
