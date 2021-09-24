/// <reference types="react" />
export interface DropAreaState {
    isHovering: boolean;
}
export interface DropProps {
    onDragOver: React.DragEventHandler;
    onDragEnter: React.DragEventHandler;
    onDragLeave: React.DragEventHandler;
    onDrop: React.DragEventHandler;
    onPaste: React.ClipboardEventHandler;
}
export interface DropAreaOptions {
    onFiles?: (files: File[], event?: React.DragEvent) => void;
    onUri?: (url: string, event?: React.DragEvent) => void;
    onDom?: (content: any, event?: React.DragEvent) => void;
    onText?: (text: string, event?: React.ClipboardEvent) => void;
}
/**
 * A pair of hooks to help you manage data transfer between drag and drop
 *
 * useDrop can be used alone to accept file, text or uri dropping.
 *
 * useDrag should be used along with useDrop.
 *
 * Paste into the drop area will also be treated as content drop.
 */
export default function useDrop(options?: DropAreaOptions): [DropProps, DropAreaState];
