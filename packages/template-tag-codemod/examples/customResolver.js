// Example custom resolver for pluma components
// This resolver handles the case where virtual components should be resolved to named imports

module.exports = async function customResolver(path, filename, resolve) {
  // Handle pluma components - resolve to named imports
  if (path.startsWith('@embroider/virtual/components/pluma-')) {
    // Extract the component name from the virtual path
    const componentName = path.replace('@embroider/virtual/components/', '');

    // Convert pluma-image to PlumaImage
    const pascalCaseName = componentName
      .split('-')
      .map(part => part.charAt(0).toUpperCase() + part.slice(1))
      .join('');

    return {
      specifier: '@customerio/pluma-components/ember',
      importedName: pascalCaseName
    };
  }

  // Return undefined for other paths to fall back to default behavior
  return undefined;
};
