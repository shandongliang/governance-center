import React, { Component } from 'react';
import RichTextEditor from './../../../component/RichTextEditor/RichTextEditor.js';
import './index.less';

export default class EditorDemo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            controls: [
                'headings', 'font-size', 'line-height', 'letter-spacing', 'separator',
                'text-color', 'bold', 'italic', 'underline', 'strike-through', 'separator',
                'text-indent', 'text-align', 'separator',
                'superscript', 'subscript', 'remove-styles', 'separator',
                'list-ul', 'list-ol', 'blockquote', 'code', 'separator',
                'media', 'table', 'link', 'hr', 'separator',
                'undo', 'redo', 'clear',
            ],
            excludeControls: ['undo', 'redo', 'clear'],
        }
    }



    render() {
        const fontSizes = [
            80, 90, 100, 110
        ]
        const lineHeights = [1, 1.2, 1.5, 1.75, 2, 2.5, 3, 4, 6]
        return <RichTextEditor
                fetchUrl='/gencode/createTestUser'
                fetchParam={{
                    testUser: {
                        testName: 'htmlContent'
                    }
                }}
                readOnly={false}
                controls={this.state.controls}
                excludeControls={this.state.excludeControls}
                fontSizes={fontSizes}
                lineHeights={lineHeights}
                contentStyle={{ height: 400, boxShadow: 'inset 0 1px 3px rgba(0,0,0,.1)' }}
                contentClassName="editor-content"
                controlBarClassName=""
                controlBarStyle={{}}
            />
    }
}
