import { htmlTagNames } from 'html-tag-names';

export default function defaultRenaming(
  name: string,
  kind: 'component' | 'helper' | 'modifier' | 'ambiguous-component-or-helper'
): string | null {
  // Strip off @ namespacing
  let parts = name.split('@');
  if (parts.length > 1) {
    name = capitalize(parts[parts.length - 1]);
  }

  // Handle :: namespacing - special case for Pluma components
  parts = name.split('::');
  if (parts.length > 1) {
    // For Pluma components, preserve the full name instead of stripping
    if (kind === 'component' && parts[0].startsWith('Pluma')) {
      // Convert PlumaPopover::Trigger to PlumaPopoverTrigger
      name = parts.join('');
    } else {
      // Default behavior: use only the last part
      name = parts[parts.length - 1];
    }
  }

  if (htmlTagNames.includes(name) && kind === 'component') {
    name = name + '_';
  }

  if (kind === 'component') {
    name = capitalize(name);
  }

  return name;
}

function capitalize(s: string): string {
  return s[0].toUpperCase() + s.slice(1);
}
