import { Editor, posToDOMRect } from '@tiptap/core';
import { EditorState, Plugin, PluginKey } from 'prosemirror-state';
import { EditorView } from 'prosemirror-view';
import {
  computePosition,
  flip,
  offset,
  shift,
  type VirtualElement,
} from '@floating-ui/dom';

export interface CustomPluginProps {
  pluginKey: PluginKey | string;
  editor: Editor;
  element: HTMLElement;
  updateDelay?: number;
  shouldShow?:
    | ((props: {
        editor: Editor;
        view: EditorView;
        state: EditorState;
        oldState?: EditorState;
        from: number;
        to: number;
      }) => boolean)
    | null;
}

export type CustomPluginViewProps = CustomPluginProps & {
  view: EditorView;
};

export class CustomPluginView {
  public editor: Editor;

  public element: HTMLElement;

  public view: EditorView;

  private isMounted = false;

  public shouldShow: Exclude<CustomPluginProps['shouldShow'], null> = ({
    state,
  }) => {
    const { doc, selection } = state;
    const { head } = selection;
    const isEmptyLine = doc.resolve(head).parent.content.size == 0;

    return isEmptyLine;
  };

  constructor({ editor, element, view, shouldShow }: CustomPluginViewProps) {
    this.editor = editor;
    this.element = element;
    this.view = view;
    if (shouldShow) {
      this.shouldShow = shouldShow;
    }

    // The floating element is positioned by Floating UI, so it must be
    // absolutely positioned and start hidden until the first show().
    this.element.remove();
    this.element.style.position = 'absolute';
    this.element.style.visibility = 'visible';
    this.element.style.display = 'none';
  }

  // Append the floating element to the editor's document once it is attached.
  private mount() {
    // TipTap v3 widened `options.element` to a union
    // (Element | { mount: HTMLElement } | ((editor) => void) | null).
    // This editor is always mounted from a plain DOM element, so narrow it back.
    const editorElement = this.editor.options.element as HTMLElement;
    if (this.isMounted || !editorElement?.parentElement) {
      return;
    }

    (editorElement.ownerDocument.body ?? document.body).appendChild(
      this.element
    );
    this.isMounted = true;
  }

  private hide() {
    this.element.style.display = 'none';
  }

  // Position the floating element next to the current selection using a
  // virtual reference backed by the ProseMirror selection rect.
  private show(from: number, to: number) {
    const reference: VirtualElement = {
      getBoundingClientRect: () => posToDOMRect(this.view, from, to),
    };

    this.element.style.display = '';

    computePosition(reference, this.element, {
      placement: 'left',
      middleware: [offset(8), flip(), shift({ padding: 8 })],
    }).then(({ x, y }) => {
      Object.assign(this.element.style, {
        left: `${x}px`,
        top: `${y}px`,
      });
    });
  }

  update(view: EditorView, oldState: EditorState) {
    this.updateHandler(view, oldState);
  }

  updateHandler(view: EditorView, oldState: EditorState) {
    const { state } = view;
    const { selection } = state;

    this.mount();

    // support for CellSelections
    const { ranges } = selection;
    const from = Math.min(...ranges.map((range) => range.$from.pos));
    const to = Math.max(...ranges.map((range) => range.$to.pos));

    const shouldShow = this.shouldShow?.({
      editor: this.editor,
      view,
      state,
      oldState,
      from,
      to,
    });

    if (!shouldShow) {
      this.hide();
      return;
    }

    this.show(from, to);
  }

  destroy() {
    this.element.remove();
  }
}
