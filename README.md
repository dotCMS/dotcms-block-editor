<img src="https://dotcms.com/dA/99fe3769-d649/256w/dotcms.png" title="dotcms java content management system">

# dotCMS Block Editor: Remote Extensions

[![Still from video presentation, click to view.](https://user-images.githubusercontent.com/102264829/226443396-a99338dd-0baa-49cc-8a35-c0dccdefe1d6.jpg)](https://www.youtube.com/watch?v=u5Lx1UZfCK8)

The Block Editor field in dotCMS is a rich content editor that allows you to create content in units called “blocks.” Every paragraph, image, code snippet, list, etc., is stored as a block capable of being edited, drag-and-drop reordered, transformed, or deleted.

By default, the Block Editor includes a variety of pre-defined block types — including Paragraphs, Headings, Lists, Images, Tables, and Contentlets. 
(For more information, [see the documentation](https://www.dotcms.com/docs/latest/block-editor).)

In **dotCMS 23.03** or later, you can also extend the capabilities of the Block Editor by creating extensions and including them in your dotCMS instance.

## Creating Remote Extensions

Follow these steps to expand the Block Editor's functionality by creating a new remote extension with a pre-generated example. 

1. Clone this repository
   
    ```
    git clone https://github.com/dotCMS/dotcms-block-editor.git
    ```

2. Install the required dependencies
    
    At the root of the workspace, run:
    
    ```
    npm install
    ```

3. Build the extensions
    
    Run the following command: 
    
    ```
    npx nx build custom-blocks 
    ```
    
    This will generate the `/dist/` folder with a compiled Javascript `custom-blocks.js` file inside, which contains the extensions defined in the `custom-blocks` project library.

4. Browse to `/dist/libs/custom-blocks`
    
    After running the previous command, it should generate a folder structure like the one below.
    
    <!--<img width="360" alt="image4" src="https://user-images.githubusercontent.com/3438705/221910014-847f4621-fdea-4e45-916d-41fa64499c64.png">-->
    <img width="360" alt="Example of directory containing output javascript." src="https://user-images.githubusercontent.com/102264829/225657912-d8bf0903-d07c-49fc-b0f7-917ec583e6b9.png">

    
And just like that, you have a first extension. Now you can upload it to your dotCMS instance.

## Adding the Extension to a dotCMS Block Editor Field

Take a look inside the `/dist/libs/custom-blocks` folder, and you'll see a compiled Javascript file, in this case named `custom-blocks.js`. 

(Its exact file name may differ as defined in the project files — specifically, in the `fileName` property in `/libs/{project}/vite.config.ts`. We recommend choosing a meaningful name!)

This file needs to be uploaded to a directory of your choice. Browse to that directory in the Site Browser — in this case, `/application/block-editor/extensions` — and then click the “Add” button.

![Screenshot of site browser with uploaded file.](https://user-images.githubusercontent.com/102264829/226002850-d90bf56c-d4b0-4f05-8b00-456bc76308d7.png)

Once the file is uploaded, go to the Block Editor field's settings within the Content Type, and browse to the tab displaying its field variables. Include the new variable `customBlocks` (case sensitive), which defines the remote extensions in use by the Block Editor. 

For its value, it requires a JSON object with the property `extensions`. Its value is an array of objects, each representing a new extension. At bare minimum, each object must have a `url`. For example:

```json
{
	"extensions": [{
		"url": "https://local.dotcms.site:8443/application/block-editor/extensions/custom-blocks.js"
	}]
}
```

When added, the result should resemble the image below, which uses the parameters above. 

![Screenshot 2023-03-17 at 3 28 03 PM](https://user-images.githubusercontent.com/102264829/226007546-f61468b2-289f-44b4-acb9-e09f6f9d9a55.png)

After setting this field variable, the Block Editor's behavior will change according to the extensions you've implemented. The example extension adds an "Add" button that creates a "Hello World" block, as seen below:

![Screenshot 2023-03-17 at 3 29 18 PM](https://user-images.githubusercontent.com/102264829/226009165-9501b6eb-e334-4fb8-be93-aea1881e0676.png)

### Adding the Extension as a Custom Block

Suppose, instead of a button, you'd prefer for your extension to be selectable from the list of blocks. This can be achieved with just a small modifiction to the JSON we added to the Block Editor field variable.

After the `url` property, add a property named `actions`. This consists of an array of objects. Each object has three properties.

| Property | Description |
|----------|-------------|
| `command` | The extension command being invoked at block selection |
| `menuLabel` | The label visible in the block list |
| `icon` | The name of the Material UI icon displayed in the block list | 

For example, if we replace the previous `customBlocks` JSON with this new value, including an `actions` array of a single object:

```json
{
	"extensions": [{
		"url": "https://local.dotcms.site:8443/application/block-editor/extensions/custom-blocks.js",
		"actions": [{
			"command": "addHelloWorld",
			"menuLabel": "Hello World",
			"icon": "javascript"
		}]
	}]
}
```

![Screenshot of field variables dialog again, with new value.](https://user-images.githubusercontent.com/102264829/226042015-13ebc9d7-eaed-41f6-b740-af7185ea9517.png)

... this results in a brand new block in the block list, based on the above specifications:

![Screenshot of new custom button inside the block list.](https://user-images.githubusercontent.com/102264829/226445118-2f772c6d-d634-48f8-a061-4517fe124a9b.png)

Clicking this block creates the same golden "Hello World" box as earlier, as it invokes the same `addHelloWorld` function.

#### Multiple Actions

In the event of a remote extension with multiple defined commands, adding multiple blocks is as simple as adding more objects to the `actions` array, e.g.:

```json
{
	"extensions": [{
		"url": "https://local.dotcms.site:8443/application/block-editor/extensions/custom-blocks.js",
		"actions": [{
			"command": "addHelloWorld",
			"menuLabel": "Custom Node",
			"icon": "javascript"
		}, {
			"command": "toggleHighlight",
			"menuLabel": "Highlight Custom",
			"icon": "highlight"
		}, {
			"command": "somethingElseEntirely",
			"menuLabel": "You Get The Idea",
			"icon": "add"
		}]
	}]
}
```

## Creating Your Own Custom Extensions

One of the strengths of [Tiptap](https://tiptap.dev/guide/custom-extensions#introduction) is its extensibility. You don’t have to depend purely on its provided tools or even existing extensions; rather, you can extend the editor to your own liking.

With custom extensions you can add new blocks and new functionalities on top of what already exists — even completely from scratch. Let’s start with a few common examples of how you can extend existing nodes, marks and extensions.

First, create an initial skeleton, in which you [create a Node](https://tiptap.dev/guide/custom-extensions/#create-a-node) that contains the basic functionality you're adding:

```js
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

Next, add commands that trigger the extension into the Block Editor. We'll be making use of the Tiptap [addCommands()](https://tiptap.dev/guide/custom-extensions/#commands) function:

```js
    addCommands() {
      return {
         addHelloWorld: () => ({ commands }) => {
            return  commands.insertContent({ type: this.name });
         }   
      }
    },
    
```

You can see code resembling the above in the Typescript source from the current project: `dotcms-block-editor/libs/custom-blocks/src/lib/custom-blocks.ts`.

Lastly, once the initial skeleton has been created, it needs to be added at the editor's initialization. To do this, add the Node you created to the editor's `extensions` array. This can be found in `dotcms-block-editor/apps/editor-playground/src/app/Tiptap.tsx`:

```js
  const editor = useEditor({
      extensions: [
        StarterKit,
        CustomNode
      ],
    })
  },
```

## Development Mode 

### Working in Development Mode in the Editor Playground

You can experiment with developing custom extensions within the playground inside the `libs` folder. In this way, you can add or edit code and it will update live, automatically. The results can be viewed via `localhost`, as in the images below.

![Screenshot of VSCode initializing the playground.](https://user-images.githubusercontent.com/3438705/221927152-26ea09d0-a78f-4f2e-b607-92557e2a709c.png)

### Running the Playground

Once the custom extension has been created and added in the Block Editor initialization, run the Block Editor playground using the following command:

```bash
npx run editor-playground:serve:development
```

![Screenshot of the playground output in a browser.](https://user-images.githubusercontent.com/3438705/221927998-0c2c2c9f-575a-47ee-ab81-45330e5ef1fd.png)

The playground automatically updates until the command is terminated, either through closing the terminal or using the standard break command keys — `^C`, `Ctrl+C`, etc.

When you're satisfied with the output, then you can rebuild your JS file and re-upload according to the above sections.

## FAQ

1. **What is a Block Editor, and how does it work?**
    
    The Block Editor is a tool for building rich text in WYSIWYG ("What You See Is What You Get") fashion. Per "rich text," it allows you to insert different kinds of content like images, videos, tables, code blocks and more into your text area. 
    
    Each new paragraph, table, etc., is stored as an element called a "block," which is a self-contained unit of pure JSON. This makes the Block Editor portable and highly tractable for use in both traditional (through a user interface) and headless (through an API) paradigms.

2. **What is ProseMirror?**
    
    [ProseMirror](https://prosemirror.net/) describes itself as "a toolkit for building rich-text editors on the web": 
    
    > ProseMirror tries to bridge the gap between editing explicit, unambiguous content like Markdown or XML, and classical WYSIWYG editors.
    > 
    > It does this by implementing a WYSIWYG-style editing interface for documents more constrained and structured than plain HTML. You can customize the shape and structure of the documents your editor creates, and tailor them to your application's needs.

3. **What is Tiptap?**
    
    [Tiptap](https://tiptap.dev/introduction/) is "a headless wrapper around ProseMirror":

    > Tiptap comes with sensible defaults, a lot of extensions and a friendly API to customize every aspect. It’s backed by a welcoming community, open source, and free.
    
    Tiptap does not provide a user interface, but offers robust tools for building your own. The Block Editor was built using these tools.

4. **What is Nx?**
    
    > Nx is a smart, fast and extensible build system with first class monorepo support and powerful integrations. As seen in the examples above, Nx is used to build remote extensions.
    
    For ease of working with [Nx](https://nx.dev/), we recommend installing the [Nx Console](https://marketplace.visualstudio.com/items?itemName=nrwl.angular-console) VS Code extension.

5. **Where can I find the Material UI Icons?**
    
    The Material UI Icons can be found [in Google Fonts](https://fonts.google.com/icons?icon.set=Material+Icons). Use the icon name as the value of the `icon` property in the `customBlocks` JSON. 
