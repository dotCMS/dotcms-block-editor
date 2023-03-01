<img src="https://dotcms.com/dA/99fe3769-d649/256w/dotcms.png" title="dotcms java content management system">



# dotCMS Block Editor

The Block Editor field in dotCMS is a rich content editor that allows you to create your content as building blocks. Every element inside your editor is a block that you can add, edit, drag, and drop to reorder and delete.

dotCMS by default ships with specific series of blocks like Paragraph, Headings, List, Images, Table and some others. 
[More information](https://www.dotcms.com/docs/latest/block-editor)

You can extend the capabilities of the block editor by creating one or more extensions and including it in your dotCMS instance.



## How to create remote extensions

This is a walkthrough of how to expand the Block Editor functionality by creating new  remote extensions with the pre-generated extension example. 

1. Clone this repository 

```
git clone https://github.com/dotCMS/dotcms-block-editor.git
```

2. Install dependencies

At the root of the workspace, run:

```
npm install
```

3. Build extensions

Run the following command: 

```
npx nx build custom-blocks 
```

This will generate the dist folder with the `index.js` inside, which contains all the extensions defined in the custom-blocks folder.

4. Get the file in `dist/libs/custom-blocks`

After running the previous command, it should generate a folder structure like the one below.


<img width="311" alt="image4" src="https://user-images.githubusercontent.com/3438705/221910014-847f4621-fdea-4e45-916d-41fa64499c64.png">

And that is, you have your first extension, now you can upload it to your dotCMS instance.


## How to add the extension to a dotCMS block editor field?

After the index.js has been generated, it needs to be uploaded to the file directory by clicking on “Add” button; we do recommend renaming the file to something meaningful like in our example, customBlocks.js


![image5](https://user-images.githubusercontent.com/3438705/221911288-8ab460ee-0729-4225-9f33-e28032658476.png)

Once the file is uploaded, go to the Block editor field variables and include the new variable **customBlocks** (It needs to be called this way) that will be picked up by the dotCMS Block editor to read from there any new custom variables, as displayed in the image below we do send a JSON file with the parameters to define where to find the custom extensions options. 


![image2](https://user-images.githubusercontent.com/3438705/221912074-2d45050c-3cff-4b56-bd36-41a0e6c67db4.png)


After adding into dotCMS you should see the examples displayed below.

![image3](https://user-images.githubusercontent.com/3438705/221912365-50251293-0b23-439b-ae26-aece15ec75f3.png)


## How to create my own custom extensions?

By building custom extensions, you can add new blocks and new functionalities, on top of what already exists or from scratch. 
The GitHub repository `dotcms-block-editor` contains examples for building extensions, nodes and marks. 


Create the initial skeleton, as the following example shows:

```Javascript
import { Node } from '@tiptap/core'
const CustomNode = Node.create({
  name: 'customNode',
  // Your code goes here, for example:
  addNodeView() {
    return () => {
        const dom = document.createElement('div');
        dom.contentEditable = 'false';
        const label = document.createElement('label');
        dom.append(label);
        return { dom };
    };
  },
})
```


2. It is possible to add commands which triggers the extension into the Block Editor:

```Javascript
    addCommands() {
      return {
         addHelloWorld: () => ({ commands }) => {
          return  commands.insertContent({ type: this.name });
         }   
      }
    },
    
 ```
 
 
 3. Once the initial skeleton has been created, it needs to be added on the Editor initialization: 

``` Javascript
  const editor = useEditor({
      extensions: [
        StarterKit,
        CustomNode
      ],
    })
  },
```

## How to structure the JSON file with the custom extension parameters?


1. Create an array with all the extensions and  the path for the file generated in the dist folder and uploaded into dotCMS and put it in the **URL** property.
2. Add in the actions array every extension, mark or node created inside the file defines the **URL** property.
3. **Name**  property should be the name for the extension in the extension definition.
4. **MenuLabel** property is the one used to display in the context menu inside the block editor that triggers these actions.
5. **Icon** property is the material-ui icon name that will be displayed in the context menu as well.

```JSON
{
	"extensions": [{
		"url": "http://localhost:8080/application/customBlocks.js",
		"actions": [{
			"name": "CustomExtension",
			"command": "insertProduct",
			"menuLabel": "Custom Extension",
			"icon": "javascript"
		}, {
			"name": "HighlightCustom",
			"command": "toggleHighlight",
			"menuLabel": "Highlight Custom",
			"icon": "highlight"
		}, {
			"name": "CustomNode",
			"command": "addHelloWorld",
			"menuLabel": "Custom Node",
			"icon": "javascript"
		}]
	}]
}
```


# Development mode 

## How to work in development mode within the editor playground?

Then it is possible to play around with new custom extensions within the playground inside the libs folder. Add the code, and it will be automatically refreshed in the browser.


![image6](https://user-images.githubusercontent.com/3438705/221927152-26ea09d0-a78f-4f2e-b607-92557e2a709c.png)

## How to run the playground?

Once the custom extension has been created and added in the Block editor initialization, there is a Block Editor playground to see the new extensions.


```Javascript
npx run editor-playground:serve:development
```

![image1](https://user-images.githubusercontent.com/3438705/221927998-0c2c2c9f-575a-47ee-ab81-45330e5ef1fd.png)


## FAQ

1. What is a block editor, and how does it work?

Block Editor is a toolkit for building rich text WYSIWYG ("What You See Is What You Get"), as part of the rich content it allows you to insert different kinds of content like images, videos, tables, code blocks and others into your text area. 

2. What is ProseMirror?

ProseMirror tries to bridge the gap between editing explicit, unambiguous content like Markdown or XML, and classical WYSIWYG editors.
It does this by implementing a WYSIWYG-style editing interface for documents more constrained and structured than plain HTML. it can customize the shape and structure of the documents your editor creates, and tailor them to your application's needs.

3. What is Tiptap?

Tiptap gives full control over every single aspect of the text editor experience. It’s customizable, comes with a ton of extensions, is open source and has extensive documentation. 

4. Nx for building

Nx is a smart, fast and extensible build system with first class monorepo support and powerful integrations.
We recommend installing the Visual Code extension, Nx Console

5. Where to find the Material UI Icons?

Material UI Icons can be found here: https://fonts.google.com/icons and add the icon name in the JSON file property. 

