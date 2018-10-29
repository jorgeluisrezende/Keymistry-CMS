import React, { Component } from 'react';
import { IndentStyle } from './indent';
import imageHandler from './uploadImages.module';
import { ImageDrop } from 'quill-image-drop-module'
import ImageResize from 'quill-image-resize-module'

import './editor.css';

export default class index extends Component {

  componentDidMount() {
    const Quill = window.Quill;
    const Size = Quill.import('attributors/style/size');
    Size.whitelist = ['14px', '16px', '20px', '35px'];
    Quill.register(Size, true);
    Quill.register(IndentStyle, true);
    Quill.register('modules/imageDrop', ImageDrop)
    Quill.register('modules/imageResize', ImageResize)
    Quill.register(Quill.import('attributors/style/direction'), true);
    Quill.register(Quill.import('attributors/style/font'),true)
    Quill.register(Quill.import('attributors/style/align'), true);
    Quill.register(Quill.import('attributors/style/background'), true);
    Quill.register(Quill.import('attributors/style/color'), true);
 
    const toolbarOptions = [
      [{ 'font': [] }],
      [{ 'size': ['14px','16px','20px', '35px'] }],  // custom dropdown
      ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
      ['blockquote'],
      ['link'],
      ['image'],
      [{ 'list': 'ordered'}, { 'list': 'bullet' }],
      [{ 'script': 'sub'}, { 'script': 'super' }],      // superscript/subscript
      [{ 'indent': '-1'}, { 'indent': '+1' }],          // outdent/indent        
      [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
      [{ 'align': [] }],
      ['clean']                  
    ];

    const options = {
      modules:{
        toolbar: {
          container: toolbarOptions,
          handlers:{ 
            image: imageHandler
          }
        },
        imageDrop: true,
        imageResize: {
          displayStyles: {
            backgroundColor: 'black',
            color: 'white'
          },
          modules: [ 'Resize', 'DisplaySize', 'Toolbar' ]
        }
      },
      placeholder: 'Compose an epic post here...',
      theme: 'snow'
    };

    window.editor = new Quill(this.refs.editor, options);
  }
  
  render() {
    return (
      <div id="editor">
        <div id="toolbar"></div>
        <div ref="editor"></div>
      </div> 
    )
  }
}
