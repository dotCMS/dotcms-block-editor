import {
    Editor,
    isNodeSelection,
    isTextSelection,
    posToDOMRect,
} from '@tiptap/core'
import { EditorState, Plugin, PluginKey } from 'prosemirror-state'
import { EditorView } from 'prosemirror-view'
import tippy, { Instance, Props } from 'tippy.js'

export interface BubbleMenuPluginProps {
    pluginKey: PluginKey | string,
    editor: Editor,
    element: HTMLElement,
    tippyOptions?: Partial<Props>,
    updateDelay?: number,
    shouldShow?: ((props: {
        editor: Editor,
        view: EditorView,
        state: EditorState,
        oldState?: EditorState,
        from: number,
        to: number,
    }) => boolean) | null,
}

export type BubbleMenuViewProps = BubbleMenuPluginProps & {
    view: EditorView,
}

export class CustomPluginView {
    public editor: Editor

    public element: HTMLElement

    public view: EditorView

    public preventHide = false

    public tippy: Instance | undefined

    public shouldShow: Exclude<BubbleMenuPluginProps['shouldShow'], null> = ({
        state,
    }) => {
        const { doc, selection } = state
        const { head } = selection;
        const isEmptyLine = doc.resolve(head).parent.content.size == 0

        return isEmptyLine;
    }

    constructor({
        editor,
        element,
        view,
        shouldShow,
    }: BubbleMenuViewProps) {
        this.editor = editor
        this.element = element
        this.view = view
        console.log("init")
        if (shouldShow) {
            this.shouldShow = shouldShow
        }

        // Detaches menu content from its current parent
        this.element.remove()
        this.element.style.visibility = 'visible'
    }

    createTooltip() {
        const { element: editorElement } = this.editor.options
        const editorIsAttached = !!editorElement.parentElement

        if (this.tippy || !editorIsAttached) {
            return
        }

        this.tippy = tippy(editorElement, {
            duration: 0,
            getReferenceClientRect: null,
            content: this.element,
            interactive: true,
            trigger: 'manual',
            placement: 'left',
            hideOnClick: 'toggle',
        })
    }

    update(view: EditorView, oldState: EditorState) {
        //  const { state } = view
        // const hasValidSelection = state.selection.$from.pos !== state.selection.$to.pos
        this.updateHandler(view, oldState)
    }

    updateHandler(view: EditorView, oldState: EditorState) {
        const { state } = view
        const { selection } = state

        this.createTooltip()

        // support for CellSelections
        const { ranges } = selection
        const from = Math.min(...ranges.map(range => range.$from.pos))
        const to = Math.max(...ranges.map(range => range.$to.pos))

        const shouldShow = this.shouldShow?.({
            editor: this.editor,
            view,
            state,
            oldState,
            from,
            to,
        })

        if (!shouldShow) {
            this.tippy?.hide()
            return
        }

        this.tippy?.setProps({
            getReferenceClientRect: (() => {
              return posToDOMRect(view, from, to)
            }),
          })
          this.tippy?.show()
    }

    destroy() {
        //
    }
}