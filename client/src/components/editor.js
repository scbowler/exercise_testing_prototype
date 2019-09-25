import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Ace from 'react-ace';

const DEFAULT_EXT = 'language_tools';
const DEFAULT_HEIGHT = '500px';
const DEFAULT_MODE = 'javascript';
const DEFAULT_SNIPPETS = 'javascript';
const DEFAULT_THEME = 'tomorrow_night_bright';
const DEFAULT_WIDTH = '100%';

class Editor extends Component {
    constructor(props){
        super(props);

        this.defaultNameLength = 6;

        this.state = {
            ext: DEFAULT_EXT,
            mode: DEFAULT_MODE,
            name: this.props.name || this.generateName(),
            resourcesLoaded: false,
            snippets: DEFAULT_SNIPPETS,
            theme: DEFAULT_THEME
        };

        this.defaultResources = {
            ext: DEFAULT_EXT,
            mode: DEFAULT_MODE,
            snippets: DEFAULT_SNIPPETS,
            theme: DEFAULT_THEME
        };

        this.resources = {
            ext: [ 'language_tools' ],
            mode: [ 'javascript', 'html', 'css' ],
            snippets: [ 'javascript' ],
            theme: [ 'ambiance', 'chaos', 'chrome', 'clouds', 'clouds_midnight', 'cobalt', 'crimson_editor', 'dawn', 'dracula', 'dreamweaver', 'eclipse', 'github', 'gob', 'gruvbox', 'idle_fingers', 'iplastic', 'katzenmilch', 'kr_theme', 'kuroir', 'merbivore', 'merbivore_soft', 'mono_industrial', 'monokai', 'pastel_on_dark', 'solarized_dark', 'solarized_light', 'sqlserver', 'terminal', 'textmate', 'tomorrow', 'tomorrow_night', 'tomorrow_night_blue', 'tomorrow_night_bright', 'tomorrow_night_eighties', 'twilight', 'vibrant_ink', 'xcode' ]
        };

        this.resourceTypes = Object.keys(this.resources);

        this.loadResource = this.loadResource.bind(this);
    }

    componentDidMount(){
        this.loadEditorResources()
    }

    generateName(){
        const str = 'AaBbCcDdEeFfGgHhIiJjKkLlMmNnOoPpQqRrSsTtUuVvWwXxYyZz0123456789';
        let name = '';

        for(let c = 0; c < this.defaultNameLength; c++){
            name += str[Math.floor(Math.random() * str.length)];
        }

        return name;
    }

    async loadResource(type, resource) {
        const validTypes = this.resources[type] || null;

        if(validTypes){
            let resourceToLoad = this.defaultResources[type];

            if (validTypes.indexOf(resource) >= 0){
                resourceToLoad = resource;
            } else {
                console.warn(`Loading default resource: ${type}/${resourceToLoad}`);
            }

            this.setState({
                [type]: resourceToLoad
            });

            switch(type){
                case 'ext':
                    return import(`brace/ext/${resourceToLoad}`);
                case 'mode':
                    return import(`brace/mode/${resourceToLoad}`);
                case 'snippets':
                    return import(`brace/snippets/${resourceToLoad}`);
                case 'theme':
                    return import(`brace/theme/${resourceToLoad}`);
            }
        }

        throw new Error(`Unable to load "${type}/${resource}" resource, Invalid resource`);
    }

    async loadEditorResources(){
        try {
            await Promise.all(this.resourceTypes.map(r => this.loadResource(r, this.props[r])));

            this.setState({resourcesLoaded: true});
        } catch(err) {
            console.error('Error Loading Resources', err);
        }
    }

    render(){
        if(this.state.resourcesLoaded){
            const { editorProps, fontSize, height, onChange, readOnly, value, width } = this.props;
            const { mode, name, theme } = this.state;

            return <Ace
                mode={mode}
                theme={theme}
                onChange={onChange}
                name={name}
                fontSize={fontSize}
                height={height}
                width={width}
                value={value}
                readOnly={readOnly}
                enableBasicAutocompletion={true}
                enableLiveAutocompletion={true}
                editorProps={{
                    $blockScrolling: Infinity,
                    ...editorProps
                }}
            />
        }

        return <h1>Loading Code Editor...</h1>
    }
}

Editor.propTypes = {
    editorProps: PropTypes.object,
    ext: PropTypes.string,
    fontSize: PropTypes.number,
    height: PropTypes.string,
    mode: PropTypes.string,
    name: PropTypes.string,
    onChange: PropTypes.func,
    readOnly: PropTypes.bool,
    snippets: PropTypes.string,
    theme: PropTypes.string,
    value: PropTypes.string,
    width: PropTypes.string
}

Editor.defaultProps = {
    editorProps: {},
    ext: DEFAULT_EXT,
    fontSize: 14,
    height: DEFAULT_HEIGHT,
    mode: DEFAULT_MODE,
    name: null,
    onChange: null,
    readOnly: false,
    snippets: DEFAULT_SNIPPETS,
    theme: DEFAULT_THEME,
    value: '',
    width: DEFAULT_WIDTH
}

export default Editor;
