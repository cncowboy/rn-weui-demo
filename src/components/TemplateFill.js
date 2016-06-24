export let TemplateFill = () => {
  let newT = {};
  for (let i = 1, template = arguments[0]; i < arguments.length; i++) {
    let source = arguments[i];
    for (let k in template) {
      newT[k] = source[k] || template[k];
    }
  }
  return newT;
};
