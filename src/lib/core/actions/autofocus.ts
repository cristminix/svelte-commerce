/**
 * Focuses an element when it's mounted, for elements that only exist once a user
 * action (opening a search modal, revealing a filter search box) has already
 * moved focus deliberately. The plain HTML `autofocus` attribute trips Svelte's
 * a11y_autofocus warning even in these legitimate cases, so use `use:autofocus`
 * instead — same behavior, no warning.
 *
 * Usage:
 *   <input use:autofocus />
 */
export function autofocus(node: HTMLElement) {
	node.focus()
}

export default autofocus
