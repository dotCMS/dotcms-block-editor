// src/Tiptap.jsx
import { useEditor, EditorContent } from '@tiptap/react'

import StarterKit from '@tiptap/starter-kit'
import { CustomNode } from '@dotcms-block-editor/custom-blocks'
import { useEffect } from 'react'

const Tiptap = () => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      CustomNode
    ],
  })

  return (
    <div className="editor-container">
      <EditorContent editor={editor} />
      <button
        onClick={() => editor?.chain().addHelloWorld().run()}
      >Click Me</button>
    </div>
  )
}

export default Tiptap