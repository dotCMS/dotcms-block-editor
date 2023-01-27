// src/Tiptap.jsx
import { useEditor, EditorContent } from '@tiptap/react'

import StarterKit from '@tiptap/starter-kit'
import { CustomNode } from '@dotcms-block-editor/custom-blocks'

const Tiptap = () => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      CustomNode
    ],
    content: '<p>Hello World!</p><hellow-world></hellow-world>',
  })

  return (
    <div className="editor-container">
      <EditorContent editor={editor} />
    </div>
  )
}

export default Tiptap