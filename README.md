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


